import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users as usersTable } from "@/db/schema";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
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

        const users = await db.select({
            id: usersTable.id,
            fullName: usersTable.fullName,
            email: usersTable.email,
            phone: usersTable.phone,
            isAdmin: usersTable.isAdmin,
            createdAt: usersTable.createdAt,
        }).from(usersTable);

        return NextResponse.json({users});
    }
    catch(error) {
        console.error(error);
        return NextResponse.json({error: "An error occured"}, {status: 500});
    }
}