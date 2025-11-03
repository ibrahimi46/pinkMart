import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/db"
import { products } from "@/db/schema"
import { inArray } from "drizzle-orm"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2025-10-29.clover"})

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedAt: string;
  currentPrice: number;
  oldPrice?: string;
}

export async function POST(req: NextRequest) {
    const { cartItems } : {cartItems: CartItem[]} = await req.json();

    const productsTable = await db.select().from(products).where(inArray(products.id, cartItems.map(item => item.id)))
    
    const line_items = cartItems.map((item) => {
        const product = productsTable.find(p => p.id === item.productId);
        return {
            price_data: {
            currency: "usd",
            product_data: {name: product?.name || "Unknown Product"},
            unit_amount: Math.round(item.currentPrice * 100)
        },
        quantity: item.quantity
        }
        
    })


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL!,
        cancel_url: process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL!,
    })


    return NextResponse.json({url : session.url}, {status: 200, headers: {"Content-Type": "application/json"}})
}