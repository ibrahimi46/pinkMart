import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders, orderItems, products, cart as CartsTable, cartItems as CartItemsTable, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {  sendEmail, sendOrderEmail } from "@/app/lib/email";




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});


export async function POST(req: NextRequest) {
    const rawBody = Buffer.from(await req.arrayBuffer()); 
    const sig = req.headers.get("stripe-signature")!;

    try {
        const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
        if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    const existingOrder = await db.select().from(orders).where(eq(orders.stripeSessionId, session.id));

    if (existingOrder.length > 0) {
        return NextResponse.json({received: true}, {status: 200})
    }
    
    const metadata = session.metadata!;
    
    const order = await db.insert(orders).values({
        userId: parseInt(metadata.userId),
        totalAmount: metadata.finalCheckoutPrice,
        deliveryDate: new Date(metadata.selectedDeliveryDate),
        deliveryAddressId: parseInt(metadata.selectedAddressId),
        stripeSessionId: session.id,
    }).returning();

    type OrderItem = {
        id: number;
        name: string;
        quantity: number;
        priceAtPurchase: number;
        imageUrl?: string;
        
    };

    const emailOrderItems: OrderItem[] = [];
    const cartItems = JSON.parse(metadata.cartItems);
    const orderId = order[0].id;    
    
    for (const item of cartItems){
        await db.insert(orderItems).values({
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.currentPrice
        })
        
        await db.update(products).set({
        stock: sql`GREATEST(${products.stock} - ${item.quantity}, 0)`
        }).where(eq(products.id, item.productId));

        const [product] = await db.select({name: products.name, imageUrl: products.imageUrl}).from(products).where(eq(item.productId, products.id));

        emailOrderItems.push({
            id: item.productId,
            name: product.name,
            quantity: item.quantity,
            priceAtPurchase: item.currentPrice,
            imageUrl: product.imageUrl || undefined,
         
        });
    }


    // we send an email on successfull insertion
    const [user] = await db.select({fullName: users.fullName, email: users.email}).from(users).where(eq(users.id, parseInt(metadata.userId)))
        await sendOrderEmail(user.email!, {
    orderId,
    fullName: user.fullName,
    totalAmount: parseInt(metadata.finalCheckoutPrice),
    status: "Pending",
    deliveryDate: metadata.selectedDeliveryDate,
    items: emailOrderItems,
    });

    const [userCart] = await db.select().from(CartsTable).where(eq(CartsTable.user_id, parseInt(metadata.userId))).limit(1);

    if (userCart) {
        await db.delete(CartItemsTable).where(eq(CartItemsTable.cartId, userCart.id));
        await db.delete(CartsTable).where(eq(CartsTable.user_id, parseInt(metadata.userId)));

            
      }


      return NextResponse.json({ received: true });

       
        }
        return NextResponse.json({received: true});
    } catch (err) {
        console.error(err)
            return NextResponse.json({ error: err }, { status: 400 });
        }
}