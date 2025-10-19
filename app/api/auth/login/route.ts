import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import {  users as usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
    try {
        const {email, phone, password} = await req.json();
        const users = await db.select(
            {
                id: usersTable.id,
                fullName: usersTable.fullName,
                password: usersTable.password,
                email: usersTable.email,
                phone: usersTable.phone,
                isAdmin: usersTable.isAdmin
            }
        ).from(usersTable).where(email ? eq(usersTable.email, email) : eq(usersTable.phone, phone));
        const user = users[0];
        if (!user) return NextResponse.json({error: "No user found"}, {status: 404})
            if (!user.password) return NextResponse.json({error: "use google login"}, {status: 401})
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return NextResponse.json({error: "Invalid Credentials"}, {status: 401})

        const token = jwt.sign(
            {userId: user.id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET!,
            {expiresIn: "7d"}
        )

        
        return NextResponse.json({success: true, token})
        
    }
    catch(error) {
        console.error(error)
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}