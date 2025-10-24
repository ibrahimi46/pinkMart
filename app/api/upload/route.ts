import {v2 as cloudinary} from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({error: "Please select a file"}, {status: 400})
        }
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const dataURI = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "products"
        })

        return NextResponse.json({success: "Image uploaded", imageUrl: result.secure_url}, {status: 200})
    }
    catch(err) {
        console.error(err);
        return NextResponse.json({error: "Failed to upload!"}, {status: 500})
    }
}