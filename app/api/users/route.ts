import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users as usersTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";


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
    catch(error: any) {
        if (error.message.includes("duplicate key")) {
            return NextResponse.json({error: "Email already exists"}, {status: 400})
        }
        console.error(error);
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}



export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const user = id ?
        await db.select({
                id: usersTable.id,
                fullName: usersTable.fullName,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin,
                createdAt: usersTable.createdAt,
            }).from(usersTable).where(eq(usersTable.id, Number(id)))
         : await db.select({
                id: usersTable.id,
                fullName: usersTable.fullName,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin,
                createdAt: usersTable.createdAt,
            }).from(usersTable);
        return NextResponse.json({user})
    }
    catch(error) {
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}