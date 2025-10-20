import { pgTable, serial, text, numeric, timestamp, boolean } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    category: text("category").notNull(),
    price: numeric("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
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