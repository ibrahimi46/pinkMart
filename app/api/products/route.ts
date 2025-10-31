import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"
import { products as productsTable}  from "@/db/schema";
import { eq } from "drizzle-orm";


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

