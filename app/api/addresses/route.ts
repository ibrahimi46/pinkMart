import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, isAdmin: boolean };
        if (!token || !decoded) return NextResponse.json({ error: "Missing token" }, { status: 401 });

        const userAddresses = await db.select({
            type: addresses.type,
            streetAddress: addresses.streetAddress,
            aptNumber: addresses.aptNumber,
            zipCode: addresses.zipCode,
            city: addresses.city,
            isDefault: addresses.isDefault
        }).from(addresses).where(eq(addresses.userId, decoded.userId));

        return NextResponse.json({ addresses: userAddresses }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error fetching addresses", err }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({ error: "Missing header" }, { status: 401 });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, isAdmin: boolean };
        if (!token || !decoded) return NextResponse.json({ error: "Missing token" }, { status: 401 });

        const { type, streetAddress, city, aptNumber, zipCode, isDefault } = await req.json();
        if (!type || !streetAddress || !city || !zipCode ) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (isDefault) {
            await db.update(addresses).set({
                isDefault: false
            }).where(eq(addresses.userId, decoded?.userId))
        }

        await db.insert(addresses).values({
            userId: decoded?.userId,
            type: capitalizeFirst(type), streetAddress: capitalizeFirst(streetAddress), city: capitalizeFirst(city), aptNumber, zipCode, isDefault
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error adding address", err }, { status: 400 });
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
       await db.delete(addresses).where(and(eq(addresses.id, id), eq(addresses.userId, decoded.userId)))

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error deleting address", err }, { status: 400 });
    }
}