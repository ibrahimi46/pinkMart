import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { orders as OrderTable, orderItems as OrderItemsTable, cart as CartsTable, cartItems as CartItemsTable, products } from "@/db/schema";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing header"}, {status: 401})
        
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        } catch (err) {
            console.error(err);
        }

        if (!decoded) return NextResponse.json({error: "Missing token"}, {status: 401})

        const {finalCheckoutPrice, selectedDeliveryDate, cartItems} = await req.json();

        if (!cartItems.length) return NextResponse.json({error: "cart is empty"}, {status: 400});

        const order = await db.insert(OrderTable).values({
            userId: decoded.userId,
            totalAmount: finalCheckoutPrice,
            deliveryDate: new Date(selectedDeliveryDate)

        }).returning();

        const orderId = order[0].id;

        for (const item of cartItems) {
            await db.insert(OrderItemsTable).values({
                orderId: orderId,
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.currentPrice
                
            })

            await db.update(products).set({
                stock: sql`GREATEST(${products.stock} - ${item.quantity}, 0)`
            }).where(eq(products.id, item.productId))
        }


        const [userCart] = await db.select().from(CartsTable).where(eq(CartsTable.user_id, decoded.userId)).limit(1);
        

        if (userCart) {
            await db.delete(CartItemsTable).where(eq(CartItemsTable.cartId, userCart.id))
            await db.delete(CartsTable).where(eq(CartsTable.user_id, decoded.userId))
        }
       

        return NextResponse.json({success: true, orderId: orderId}, {status: 200})

    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to place order"}, {status: 500})
    }
}

export async function GET(req:NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing header"}, {status: 401})
        
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        } catch (err) {
            console.error(err);
        }

        if (!decoded) return NextResponse.json({error: "Missing token"}, {status: 401})

      
        const result = await db.select({
            id: OrderTable.id,
            userId: OrderTable.userId,
            totalAmount: OrderTable.totalAmount,
            status: OrderTable.status,
            deliveryDate: OrderTable.deliveryDate,
            createdAt: OrderTable.createdAt,
            itemCount: sql<number>`COUNT(${OrderItemsTable.id})`.as("itemCount"),
        }).from(OrderTable).leftJoin(OrderItemsTable, eq(OrderTable.id, OrderItemsTable.orderId)).where(eq(OrderTable.userId, decoded.userId)).groupBy(OrderTable.id);
        
        if (result) return NextResponse.json({result: result}, {status:200});

    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to fetch orders"}, {status: 400})
    }
}