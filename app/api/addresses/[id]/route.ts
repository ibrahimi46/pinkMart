import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { addresses } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, isAdmin: boolean };
        if (!token || !decoded) return NextResponse.json({ error: "Missing token" }, { status: 401 });

        const { id: paramId } = await params;
        const id = Number(paramId);
       await db.delete(addresses).where(and(eq(addresses.id, id), eq(addresses.userId, decoded.userId)))

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error deleting address", err }, { status: 400 });
    }
}