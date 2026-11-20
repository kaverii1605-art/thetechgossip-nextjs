import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Only logged-in admins can upload images.
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Please log in as an admin." },
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

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Please select a JPG, PNG, WEBP or GIF image." },
        { status: 400 }
      );
    }

    // Limit image size to 5 MB.
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size must be 5 MB or less." },
        { status: 400 }
      );
    }

    const extensionByType: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif",
    };

    const filename =
      crypto.randomUUID() + extensionByType[file.type];

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    await mkdir(uploadDirectory, { recursive: true });

    const bytes = await file.arrayBuffer();

    await writeFile(
      path.join(uploadDirectory, filename),
      Buffer.from(bytes)
    );

    return NextResponse.json({
      message: "Image uploaded successfully.",
      image: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload image." },
      { status: 500 }
    );
  }
}