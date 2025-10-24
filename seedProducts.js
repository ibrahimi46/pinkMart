import "dotenv/config";
import pkg from "pg";
import { faker } from "@faker-js/faker";
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL, // or paste directly
});

const categories = [
  "bread",
  "cheese",
  "drinks",
  "apple",
  "cake",
  "snacks",
  "watermelon",
  "candy",
  "carrot",
  "vegetables",
  "cans",
];

// Function to generate Unsplash image URLs per category
function getImageForCategory(category) {
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(category)}`;
}

async function seed() {
  await client.connect();
  console.log("�� Seeding 100 products into the database...");

  for (let i = 0; i < 100; i++) {
    const category = faker.helpers.arrayElement(categories);
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const price = faker.commerce.price({ min: 1, max: 50, dec: 2 });
    const stock = faker.number.int({ min: 5, max: 100 });
    const image_url = getImageForCategory(category);

    await client.query(
      `INSERT INTO products (name, description, category, price, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, description, category, price, stock, image_url]
    );
  }

  await client.end();
  console.log("✅ Successfully inserted 100 products!");
}

seed().catch((err) => {
  console.error("❌ Error seeding data:", err);
  client.end();
});
