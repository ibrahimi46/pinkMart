import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { orders as OrderTable, orderItems as OrderItemsTable, products, addresses, paymentMethods } from "@/db/schema";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return NextResponse.json({error: "Missing header"}, {status: 401})
        
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number, isAdmin: boolean}
        } catch (err) {
            console.error(err);
            return NextResponse.json({error: "Invalid token"}, {status: 401})
}
        if (!decoded) return NextResponse.json({error: "Missing token"}, {status: 401})

        const latestOrder = await db
            .select({
                id: OrderTable.id,
                deliveryDate: OrderTable.deliveryDate,
                totalAmount: OrderTable.totalAmount,
                status: OrderTable.status,
                paymentProvider: paymentMethods.provider,
                cardNumber: paymentMethods.cardNumber,
                aptNumber: addresses.aptNumber,
                streetAddress: addresses.streetAddress,
                city: addresses.city,
                zipCode: addresses.zipCode,
            })
            .from(OrderTable)
            .leftJoin(paymentMethods, eq(paymentMethods.id, OrderTable.paymentMethodId))
            .leftJoin(addresses, eq(addresses.id, OrderTable.deliveryAddressId))
            .where(eq(OrderTable.userId, decoded.userId))
            .orderBy(desc(OrderTable.createdAt))
            .limit(1)
            .then(res => res[0]);

        if (!latestOrder) return NextResponse.json({error: "No order found"}, {status: 404});

        const items = await db
            .select({
                id: products.id,
                name: products.name,
                quantity: OrderItemsTable.quantity,
                priceAtPurchase: OrderItemsTable.priceAtPurchase,
                imageUrl: products.imageUrl,
            })
            .from(OrderItemsTable)
            .innerJoin(products, eq(OrderItemsTable.productId, products.id))
            .where(eq(OrderItemsTable.orderId, latestOrder.id));

        return NextResponse.json({
            orderId: latestOrder.id,
            deliveryDate: latestOrder.deliveryDate,
            totalAmount: latestOrder.totalAmount,
            status: latestOrder.status,
            paymentProvider: latestOrder.paymentProvider,
            cardNumber: latestOrder.cardNumber,
            deliveryAddress: {
                aptNumber: latestOrder.aptNumber,
                streetAddress: latestOrder.streetAddress,
                city: latestOrder.city,
                zipCode: latestOrder.zipCode,
            },
            items: items
        }, {status: 200});

    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to fetch latest order"}, {status: 400})
    }
}