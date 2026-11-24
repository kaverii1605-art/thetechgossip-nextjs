
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Check admin login
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { error: "Please log in as an admin." },
        { status: 401 }
      );
    }

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_URL) {
      return NextResponse.json(
        { error: "Cloudinary is not configured." },
        { status: 500 }
      );
    }

    // Get uploaded image
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select an image." },
        { status: 400 }
      );
    }

    // Allowed image formats
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Please select a JPG, PNG, WEBP or GIF image.",
        },
        { status: 400 }
      );
    }

    // Maximum image size: 5 MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size must be 5 MB or less." },
        { status: 400 }
      );
    }

    // Convert image into a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "thetechgossip/news",
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
          },
          (error, uploadedImage) => {
            if (error) {
              reject(error);
              return;
            }

            if (!uploadedImage) {
              reject(new Error("Cloudinary returned no image."));
              return;
            }

            resolve({
              secure_url: uploadedImage.secure_url,
            });
          }
        );

        uploadStream.end(buffer);
      }
    );

    return NextResponse.json({
      message: "Image uploaded successfully.",
      image: result.secure_url,
    });
  } catch (error) {
  console.error("Cloudinary image upload error:", error);

  const message =
    error instanceof Error
      ? error.message
      : "Unknown upload error";

  return NextResponse.json(
    {
      error: message,
    },
    { status: 500 }
  );
}
}
