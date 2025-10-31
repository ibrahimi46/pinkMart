import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { orders as OrderTable } from "@/db/schema";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; isAdmin: boolean };

    if (!decoded.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const id = (await params).id;
    const order = await db.select().from(OrderTable).where(eq(OrderTable.id, Number(id)));
    if (!order.length) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json({ order: order[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; isAdmin: boolean };

    if (!decoded.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { status } = await req.json();
    await db.update(OrderTable).set({ status }).where(eq(OrderTable.id, Number(params.id)));

    return NextResponse.json({ success: "Order status updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}