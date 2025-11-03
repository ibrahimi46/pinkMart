import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";
import { orders as OrderTable, orderItems as OrderItemsTable, users } from "@/db/schema";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; isAdmin: boolean };
    } catch (err) {
      console.error(err);
    }

    if (!decoded || !decoded.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const result = await db
      .select({
        id: OrderTable.id,
        userId: OrderTable.userId,
        fullName: users.fullName,
        totalAmount: OrderTable.totalAmount,
        status: OrderTable.status,
        deliveryDate: OrderTable.deliveryDate,
        createdAt: OrderTable.createdAt,
        itemCount: sql<number>`COUNT(${OrderItemsTable.id})`.as("itemCount"),
      })
      .from(OrderTable)
      .leftJoin(OrderItemsTable, eq(OrderTable.id, OrderItemsTable.orderId))
      .leftJoin(users, eq(users.id, OrderTable.userId))
      .groupBy(OrderTable.id, users.fullName);

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch admin orders" }, { status: 500 });
  }
}