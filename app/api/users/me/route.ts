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
            
            return NextResponse.json({user: user[0]}, {status: 200})

                
    } catch(err) {
        return NextResponse.json({error: err}, {status: 404})
    }
}


export async function PATCH(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
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

        // my logic i take email and phone
        // then i check if 

        const {email, phone, fullName} = await req.json();

        const updateData: {email?: string | null, phone?: string | null, fullName?: string} = {};
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (fullName) updateData.fullName = fullName;

        const updatedUser = await db.update(usersTable).set(updateData).where(eq(usersTable.id, decoded.userId)).returning();

        if (updatedUser.length === 0) {
            return NextResponse.json({error: "User not found"}, {status: 401})
        }

        return NextResponse.json({user: updatedUser[0]}, {status: 200})
    } catch(err: unknown) {
        const error = err as { code?: string; message?: string; constraint?: string };
        if (error?.code === "23505" || error?.message?.includes("duplicate key")) {
            if (error?.constraint === "users_phone_unique") {
                return NextResponse.json({error: "Phone number already exists"}, {status: 400});
            }
            if (error?.constraint === "users_email_unique") {
                return NextResponse.json({error: "Email already exists"}, {status: 400});
            }
            return NextResponse.json({error: "This value already exists"}, {status: 400});
        }
        console.error(err);
        return NextResponse.json({error: "An error occurred"}, {status: 500})
    }
}