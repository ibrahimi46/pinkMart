import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products as productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({error: "Missing token"}, {status: 401})
        }

        const token = authHeader.split(" ")[1];
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        } catch(err) {
            return NextResponse.json({error: "Invalid token", err}, {status: 401})
        }

        if (!decoded.isAdmin) {
            return NextResponse.json({error: "Unauthorized"}, {status: 403})
        }

        const {id} = await params;
        await db.delete(productsTable).where(eq(productsTable.id, parseInt(id)))
        return NextResponse.json({success: true, message: "Product deleted"});
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({error: "Error occured"}, {status: 500})
    }
}