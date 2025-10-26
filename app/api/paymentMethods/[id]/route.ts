import { NextRequest, NextResponse } from "next/server";
import { paymentMethods } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import jwt from "jsonwebtoken"


export async function DELETE(req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, isAdmin: boolean };
        if (!token || !decoded) return NextResponse.json({ error: "Missing token" }, { status: 401 });

        const { id: paramId } = await params;
        const id = parseInt(paramId); 
        await db.delete(paymentMethods).where(and(eq(paymentMethods.id, id), eq(paymentMethods.userId, decoded.userId)))
      

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error deleting payment method", err }, { status: 400 });
    }
}