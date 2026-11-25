
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";


const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function POST(request: Request) {
  try {
    // Only logged-in admins can upload images.
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select an image." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP and GIF images are allowed." },
        { status: 400 }
      );
    }

   

    // Convert the uploaded image into bytes.
    const imageBytes = new Uint8Array(await file.arrayBuffer());

    // Save the image directly in MySQL.
    const uploadedImage = await prisma.uploadedImage.create({
      data: {
        fileName: file.name,
        mimeType: file.type,
        data: imageBytes,
      },
    });

    // Return the image URL to the existing admin form.
    return NextResponse.json({
      message: "Image saved successfully.",
      image: `/api/images/${uploadedImage.id}`,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 500 }
    );
  }
}
