import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"
import { products as productsTable}  from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"


export async function POST(req:NextRequest) {
    try {

        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 404})
        
        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean};
        } catch(error) {
            console.error(error)
            return NextResponse.json({error: "Invalid token"}, {status: 401})
        }

        if (!decoded.isAdmin) {
            return NextResponse.json({error: "Unauthorised to add product"}, {status: 401})
        } else {
            const {name, description, category, price, stock, image_url} = await req.json();

        if (!name || !category || !price) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400})
        }

        await db.insert(productsTable).values({
            name,
            category,
            description, 
            price,
            stock: stock || 0,
            imageUrl: image_url || null
        })

        return NextResponse.json({success: true, message: "Product added!"})
        }

        
    }
    catch(error) {
        console.error(error)
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}



export async function GET(req: NextRequest) {
    try {
        const category = req.nextUrl.searchParams.get("category");
        let products;

        if (category) {
            products = await db.select().from(productsTable).where(eq(productsTable.category, category))
        }
        else {
            products = await db.select().from(productsTable);
        }
        return NextResponse.json({products})

    }
    catch(error) {
        console.error(error);
        return NextResponse.json({error: "An error occured"}, {status: 500})
    }
}

