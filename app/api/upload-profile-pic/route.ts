import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({error: "Missing Authorization header"}, {status: 400})
        }

        const token = authHeader.split(" ")[1];

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean};
        } catch (err) {
            return NextResponse.json({error: "Missing token", err}, {status: 400})
        }


        const {imageUrl} = await req.json();

        await db.update(users).set({
            image: imageUrl
        }).where(eq(users.id, decoded.userId))

        return NextResponse.json({success: "Successfully updated pfp"}, {status: 200})

    } catch (err) {
        return NextResponse.json({error: err}, {status: 400})
    }
}