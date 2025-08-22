import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const results = await cloudinary.search
      .expression("folder:ftd/gallery")
      .sort_by("public_id", "asc")
      .max_results(50)
      .execute();

    return NextResponse.json(results.resources);
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load images" },
      { status: 500 },
    );
  }
}
