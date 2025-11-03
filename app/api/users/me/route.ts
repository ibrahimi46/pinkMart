import { NextRequest, NextResponse } from "next/server";
import { users as usersTable } from "@/db/schema";
import { db } from "@/db";
import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const authHeader =  req.headers.get("authorization");
                if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 401})
        
                const token = authHeader.split(" ")[1];
        
                let decoded;
                try {
                    decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
                }
                catch(error) {
                    console.error(error);
                    return NextResponse.json({error: "Invalid token"}, {status: 401})
                }

                const user = await db.select({
                id: usersTable.id,
                fullName: usersTable.fullName,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin,
                createdAt: usersTable.createdAt,
                image: usersTable.image,
            }).from(usersTable).where(eq(usersTable.id, decoded.userId));
            return NextResponse.json({user: user[0]})

                
    } catch(err) {
        return NextResponse.json({error: err}, {status: 404})
    }
}

