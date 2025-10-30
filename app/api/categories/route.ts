import { db } from "@/db";
import { products } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await db.selectDistinct({category: products.category}).from(products);
        
        const categories = res.map((item) => item.category);
        if(categories) return NextResponse.json(categories)

    } catch (err) {
        return NextResponse.json({error: err}, {status: 400})
    }
}