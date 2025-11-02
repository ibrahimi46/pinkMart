import { relations } from "drizzle-orm";
import { pgTable, serial, text, numeric, timestamp, boolean, integer, varchar, primaryKey } from "drizzle-orm/pg-core";

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
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Next Auth Tables for Google sign in

export const accounts = pgTable("account", {
  userId: text("userId")
    .notNull()
    .references(() => nextAuthUsers.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({
    columns: [account.provider, account.providerAccountId],
  }),
}))

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => nextAuthUsers.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (vt) => ({
  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}))

// NextAuth user table 
export const nextAuthUsers = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})


export const cart = pgTable("cart", {
    id: serial("id").primaryKey().notNull(),
    user_id: integer("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})


export const cartItems = pgTable("cartItems", {
    id: serial("id").primaryKey().notNull(),
    cartId: integer("cart_id").notNull(),
    productId: integer("product_id").notNull(),
    quantity: numeric("quantity").default("0").notNull(),
    addedAt: timestamp("added_at").defaultNow().notNull(),
    price: numeric("price"),
})

export const orders = pgTable("orders", {
    id : serial("id").primaryKey().notNull(),
    userId: integer("user_id").notNull(),
    totalAmount: numeric("total_amount").default("0").notNull(),
    status: text("status").default("pending").notNull(),
    deliveryDate: timestamp("delivery_date"),
    createdAt: timestamp("created_at").notNull().defaultNow()
})

export const orderItems = pgTable("orderItems", {
    id: serial("order_item").primaryKey().notNull(),
    orderId: integer("order_id").notNull(),
    productId: integer("product_id").notNull(),
    quantity: integer("quantity").notNull().default(0),
    priceAtPurchase: numeric("price_at_purchase").notNull(),
})


export const paymentMethods = pgTable("paymentMethods", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    type: varchar("type").notNull(),          
    provider: varchar("provider").notNull(),  
    cardNumber: varchar("card_number").notNull(),
    expiryDate: varchar("expiry_date").notNull(), 
    cvv: varchar("cvv").notNull(),
    isDefault: boolean("is_default").default(false),
    createdAt: timestamp("created_at").defaultNow(),
})


export const addresses = pgTable("addresses", {
    id: serial("id").primaryKey(),
    userId: serial("user_id").notNull(),
    type: varchar("type", {length: 50}).notNull(),
    streetAddress: text("street_address").notNull(),
    city: varchar("city", {length: 100}).notNull(),
    aptNumber: varchar("apt_number", {length: 50}),
    zipCode: varchar("zip_code", {length: 20}).notNull(),
    isDefault: boolean("is_default").notNull(),
    createdAt: varchar("created_at", {length: 50}).default(new Date().toISOString())
})

// Relations

export const orderRelations = relations(orders, ({many, one}) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id]
    }), 
    items: many(orderItems)
}))


export const orderItemRelations = relations(orderItems, ({one}) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id]
    }), 
    products: one(products, {
        fields: [orderItems.productId],
        references: [products.id]
    })
    
}))