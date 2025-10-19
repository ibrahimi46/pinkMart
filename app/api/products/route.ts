import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"
import { products as productsTable}  from "@/db/schema";
import { eq } from "drizzle-orm";


export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const {name, description, category, price} = body;

        if (!name || !category || !price) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400})
        }

        await db.insert(productsTable).values({
            name,
            category,
            description, 
            price
        })

        return NextResponse.json({success: true, message: "Product added!"})
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

