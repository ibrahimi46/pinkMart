import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cart as CartTable, cartItems as CartItemsTable, products } from "@/db/schema";
import jwt from "jsonwebtoken"
import {eq, and} from "drizzle-orm";


export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({error: "Missing token"}, {status:400})

    const token = authHeader.split(" ")[1];
    let decoded;

    if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean};
    }

    if (!decoded || !decoded.userId) {
      return NextResponse.json({error: "Invalid token"}, {status: 401});
    }

    const cartItems = await req.json();
    const {productId, quantity} = cartItems;

    const cart = await db.select().from(CartTable).where(eq(CartTable.user_id, decoded?.userId))
    let cartId;
    if (!cart.length) {
        const newCart = await db.insert(CartTable).values({user_id: decoded?.userId}).returning();
         cartId = newCart[0].id;
    } else {
         cartId = cart[0].id;
    }


    // check if product exists in the cart

    const existingItem = await db.select().from(CartItemsTable).where(and(eq(CartItemsTable.cartId, cartId), eq(CartItemsTable.productId, productId)))

    // add or update
    
    if (existingItem.length) {
        
        await db.update(CartItemsTable).set({quantity: String(Number(existingItem[0].quantity) + Number(quantity))}).where(eq(CartItemsTable.id, existingItem[0].id))
    } else {
        const product = await db
        .select({ currentPrice: products.currentPrice })
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (!product.length) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const price = (product[0].currentPrice);
        await db.insert(CartItemsTable).values({cartId, productId, quantity, price})
    }



    return NextResponse.json({ success: true, message: "Cart updated successfully" });
    } catch(err) {
        console.error(err);
        return NextResponse.json({error: "An error occured"}, {status:500})
    }
}

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing token"}, {status:400})
        const token = authHeader.split(" ")[1];
        let decoded;
        if (token) {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        }


        // check if user has a cart 
        if (!decoded || !decoded.userId) {
            return NextResponse.json({error: "Invalid token"}, {status: 401});
        }
        const cart = await db.select().from(CartTable).where(eq(CartTable.user_id, decoded?.userId));
        const userCart = cart[0];
        if (!cart.length) {
            return NextResponse.json({items: []})
        }


        // fetch cart 

        const cartProducts = await db.select({
            id: CartItemsTable.id,
            cartId: CartItemsTable.cartId,
            productId: CartItemsTable.productId,
            quantity: CartItemsTable.quantity,
            price: products.currentPrice
        }).from(CartItemsTable).innerJoin(products, eq(products.id, CartItemsTable.productId)).where(eq(CartItemsTable.cartId, userCart.id));
        return NextResponse.json({items: cartProducts}, {status: 200})


    }
    catch (err) {
        console.error(err);
        return NextResponse.json({error: "an error occured"}, {status: 500})
    }

}

export async function PUT(req:NextRequest) {
   try {
 const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 401})

    const token = authHeader.split(" ")[1];
    let decoded;
    if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number};
    }
    if (!decoded) return;

    const cart = await db.select().from(CartTable).where(eq(CartTable.user_id, decoded?.userId))
    const userCart = cart[0];
    const {productId, quantity} = await req.json();

    await db.update(CartItemsTable).set({quantity}).where(and(eq(CartItemsTable.cartId, userCart.id), eq(CartItemsTable.productId, productId)))
    return NextResponse.json({ success: true, message: "Quantity updated" });

   } catch(err) {
    console.error(err);
    return NextResponse.json({error: "Failed to update cart"}, {status: 400})
   }
}


export async function DELETE(req:NextRequest) {
   try {
 const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 401})

    const token = authHeader.split(" ")[1];
    let decoded;
    if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number};
    }

    if (!decoded) return;
    const cart = await db.select().from(CartTable).where(eq(CartTable.user_id, decoded?.userId))
    const userCart = cart[0];

    const {productId} = await req.json();
    await db.delete(CartItemsTable).where(and(eq(CartItemsTable.cartId, userCart.id), eq(CartItemsTable.productId, productId)))
    return NextResponse.json({ success: true, message: "Item Deleted Successfully!" });

   } catch(err) {
    console.error(err);
    return NextResponse.json({error: "Failed to delete item."}, {status: 400})
   }
}