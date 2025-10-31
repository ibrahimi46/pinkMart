import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users as usersTable, orders as ordersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 401});

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean};
    } catch(error) {
      console.error(error);
      return NextResponse.json({error: "Invalid token"}, {status: 401});
    }

    if (!decoded.isAdmin) {
      return NextResponse.json({error: "Unauthorized"}, {status: 403});
    }

    const userId = (await params).id;
    
    const user = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        phone: usersTable.phone,
        isAdmin: usersTable.isAdmin,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .then(rows => rows[0]);

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    const orders = await db
      .select({
        id: ordersTable.id,
        totalAmount: ordersTable.totalAmount,
        status: ordersTable.status,
        createdAt: ordersTable.createdAt,
      })
      .from(ordersTable)
      .where(eq(ordersTable.userId, userId))
      .orderBy(ordersTable.createdAt);

    return NextResponse.json({ user: { ...user, orders } });
  }
  catch(error) {
    console.error(error);
    return NextResponse.json({error: "An error occured"}, {status: 500});
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 401});

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean};
    } catch(error) {
      console.error(error);
      return NextResponse.json({error: "Invalid token"}, {status: 401});
    }

    if (!decoded.isAdmin) {
      return NextResponse.json({error: "Unauthorized"}, {status: 403});
    }

    const userId = parseInt(params.id);
    const { isAdmin } = await req.json();

    const updatedUser = await db
      .update(usersTable)
      .set({ isAdmin })
      .where(eq(usersTable.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    return NextResponse.json({ user: updatedUser[0] });
  }
  catch(error) {
    console.error(error);
    return NextResponse.json({error: "An error occured"}, {status: 500});
  }
}