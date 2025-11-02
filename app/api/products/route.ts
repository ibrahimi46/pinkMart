import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"
import { products as productsTable}  from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"


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


export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return NextResponse.json({error: "Missing token"}, {status: 400})

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
    } catch (err) {
        return NextResponse.json({error: "error"}, {status: 400})
    }


    if (!decoded.isAdmin) {
        return NextResponse.json({error: "Unauthorized - Admin only"}, {status: 403})
    }

    const { name, category, description, price, stock, image_url } = await req.json();

    if (!name || !category || !description || !price || !stock || !image_url) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    
    const newProduct = await db.insert(productsTable).values({
      name,
      category,
      description,
      price: price.toString(),
      stock,
      imageUrl: image_url
    }).returning();
    return NextResponse.json({ product: newProduct[0] }, { status: 201 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
