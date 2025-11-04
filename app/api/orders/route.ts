import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { orders as OrderTable, orderItems as OrderItemsTable } from "@/db/schema";

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
            deliveryAddressId: OrderTable.deliveryAddressId,
            itemCount: sql<number>`COUNT(${OrderItemsTable.id})`.as("itemCount"),
        }).from(OrderTable).leftJoin(OrderItemsTable, eq(OrderTable.id, OrderItemsTable.orderId)).where(eq(OrderTable.userId, decoded.userId)).groupBy(OrderTable.id);
        
        if (result) return NextResponse.json({result: result}, {status:200});

    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to fetch orders"}, {status: 400})
    }
}