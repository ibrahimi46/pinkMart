import { NextRequest, NextResponse } from "next/server";
import { sendUpdateStatusEmail } from "@/app/lib/email";

export async function POST(req: NextRequest) {
  const { userEmail, orderData } = await req.json();

  try {
    await sendUpdateStatusEmail(userEmail, orderData);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}