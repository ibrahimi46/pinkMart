import { pgTable, serial, text, numeric, timestamp, boolean } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    category: text("category").notNull(),
    price: numeric("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    stock: numeric("stock").default("0").notNull(),
    imageUrl: text("image_url"),
})


export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").unique(),
    password: text("password"),
    googleId: text("google_id"),
    phone: text("phone").unique(),
    isAdmin: boolean("is_admin").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const cart = pgTable("cart", {
    id: serial("id").primaryKey().notNull(),
    user_id: numeric("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})


export const cartItems = pgTable("cartItems", {
    id: serial("id").primaryKey().notNull(),
    cartId: numeric("cart_id").notNull(),
    productId: numeric("product_id").notNull(),
    quantity: numeric("quantity").default("0").notNull(),
    addedAt: timestamp("added_at").defaultNow().notNull()

})