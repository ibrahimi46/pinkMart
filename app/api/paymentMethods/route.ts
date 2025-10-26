import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/db";
import { paymentMethods } from "@/db/schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";


export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing header"}, {status: 401})
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        if (!token || !decoded) return NextResponse.json({error: "Missing token"}, {status: 401})

        const methods = await db.select({
            id: paymentMethods.id,
            type: paymentMethods.type,
            provider: paymentMethods.provider,
            cardNumber: paymentMethods.cardNumber,
            expiryDate: paymentMethods.expiryDate,
            isDefault: paymentMethods.isDefault
        }).from(paymentMethods).where(eq(paymentMethods.userId, decoded.userId))

        return NextResponse.json(methods, {status: 200})
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Error fetching payment methods", err}, {status: 400})
    }
}

export async function POST(req:NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing header"}, {status: 401})
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        if (!token || !decoded)  return NextResponse.json({error: "Missing token"}, {status: 401})

        const {type, provider, cardNumber, expiryDate, cvv, isDefault} = await req.json()
        if (!type || !provider || !cardNumber || !expiryDate || !cvv) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

        await db.insert(paymentMethods).values({
            userId: decoded?.userId,
            type, provider, cardNumber, expiryDate, cvv, isDefault: isDefault ?? false
        })

        return NextResponse.json({success: true}, {status: 200})


    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Error adding payment method", err}, {status: 400})
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, isAdmin: boolean };
        if (!token || !decoded) return NextResponse.json({ error: "Missing token" }, { status: 401 });

        const id = parseInt(params.id);
        await db.delete(paymentMethods).where(and(eq(paymentMethods.id, id), eq(paymentMethods.userId, decoded.userId)))
      

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error deleting payment method", err }, { status: 400 });
    }
}