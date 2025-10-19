import { drizzle } from "drizzle-orm/singlestore";
import { Client } from "pg";

const client = new Client({
    connectionString: process.env.DATABASE_URL!
})

await client.connect();

export const db = drizzle(client);