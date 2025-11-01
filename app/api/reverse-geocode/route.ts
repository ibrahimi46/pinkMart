import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const lat = url.searchParams.get("lat");
    const lng = url.searchParams.get("lng");
    if (!lat || !lng) {
        return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
    }

    try {
        const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en&email=${process.env.EMAIL}`

    );
    const data = await response.json();
    return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Failed to fetch address"}, {status: 400})
    }
}