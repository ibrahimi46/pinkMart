import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users as usersTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"


export async function POST(req: NextRequest) {
    const signUp = await req.json();
    const {email, password, fullName, phone} = signUp;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {

        if (!password || !fullName) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400})
        }

        await db.insert(usersTable).values({
            email: email || null, password: hashedPassword, fullName, phone: phone || null
        })
        return NextResponse.json({success: "User added!"}, {status: 201})

    }
    catch(error: unknown) {
        if (error instanceof Error) {
            if (error.message.includes("duplicate key")) {
            return NextResponse.json({error: "Email already exists"}, {status: 400})
        }
        }
        console.error(error);
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");

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


        let user;

        if (id) {

            user =     await db.select({
                id: usersTable.id,
                fullName: usersTable.fullName,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin,
                createdAt: usersTable.createdAt,
            }).from(usersTable).where(eq(usersTable.id, Number(id)))
        } else if (decoded.isAdmin) {
            user = await db.select({
                id: usersTable.id,
                fullName: usersTable.fullName,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin,
                createdAt: usersTable.createdAt,
            }).from(usersTable);
        } else {
            user = await db.select({
                id: usersTable.id,
                fullName: usersTable.fullName,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin,
                createdAt: usersTable.createdAt,
            }).from(usersTable).where(eq(usersTable.id, decoded.userId));
        }
         
        return NextResponse.json({user})
    }
    catch(error) {
        console.error(error)
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}