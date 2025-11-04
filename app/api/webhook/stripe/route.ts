import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders, orderItems, products, cart as CartsTable, cartItems as CartItemsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  console.log('=== WEBHOOK CALLED ===', new Date().toISOString());
    const rawBody = Buffer.from(await req.arrayBuffer()); 
    const sig = req.headers.get("stripe-signature")!;

    try {
        const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
        if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    console.log('Processing session:', session.id); // ADD THIS
    
    console.log(session.id)
    
    const existingOrder = await db.select().from(orders).where(eq(orders.stripeSessionId, session.id));
    console.log(existingOrder);
    
    console.log('Existing orders found:', existingOrder.length); // ADD THIS
    
    if (existingOrder.length > 0) {
        console.log('Duplicate detected, skipping'); // ADD THIS
        return NextResponse.json({received: true}, {status: 200})
    }
    
    const metadata = session.metadata!;
    
    console.log('Creating new order for session:', session.id); // ADD THIS
    
    const order = await db.insert(orders).values({
        userId: parseInt(metadata.userId),
        totalAmount: metadata.finalCheckoutPrice,
        deliveryDate: new Date(metadata.selectedDeliveryDate),
        deliveryAddressId: parseInt(metadata.selectedAddressId),
        stripeSessionId: session.id, // Make sure this is here
    }).returning();
    
    console.log('Order created:', order[0].id, 'with session:', order[0].stripeSessionId); // ADD THIS

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
            }

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