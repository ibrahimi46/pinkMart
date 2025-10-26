import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/db";
import { orders as OrderTable, orderItems as OrderItemsTable, cartItems, cart } from "@/db/schema";

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

        const {cartTotal, selectedDeliveryDate, cartItems} = await req.json();

        if (!cartItems.length) return NextResponse.json({error: "cart is empty"}, {status: 400});

        const order = await db.insert(OrderTable).values({
            userId: decoded.userId,
            totalAmount: cartTotal,
            deliveryDate: selectedDeliveryDate

        }).returning();

        const orderId = order[0].id;

        for (const item of cartItems) {
            await db.insert(OrderItemsTable).values({
                orderId: orderId,
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.price
                
            })
        }

        return NextResponse.json({success: true, orderId: orderId}, {status: 200})

    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to place order"}, {status: 500})
    }
}