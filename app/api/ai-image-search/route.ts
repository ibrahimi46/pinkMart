import { db } from "@/db";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const PYTHON_AI_SERVICE_URL = "http://127.0.0.1:5001/get-vector";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "No image found" }, { status: 400 });
    }

    const imageFile = new FormData();
    imageFile.append("image", image);

    // send image to Flask service for vector extraction
    const res = await fetch(PYTHON_AI_SERVICE_URL, {
      method: "POST",
      body: imageFile,
    });

    if (!res.ok) {
      console.error("AI service error", await res.text());
      return NextResponse.json({ error: "AI failed to process image" }, { status: 500 });
    }

    const data = (await res.json()) as { vector: number[] };

    if (!data?.vector) {
      return NextResponse.json(
        { error: "AI service did not return a valid vector" },
        { status: 500 }
      );
    }

    const vectorString = `[${data.vector.join(",")}]`;

    // query similar products based on vector distance only (no category filter)
    const results = await db.execute(sql`
      SELECT 
        id,
        name,
        category,
        current_price AS "currentPrice",
        old_price AS "oldPrice",
        stock,
        image_url AS "imageUrl",
        image_vector <-> ${sql.raw(`'${vectorString}'::vector`)} AS distance
      FROM products
      ORDER BY distance
      LIMIT 10
    `);

    if (results.rows.length === 0) {
      return NextResponse.json({ products: [] }, { status: 404 });
    }

    return NextResponse.json({ products: results.rows }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred", details: err }, { status: 500 });
  }
}
