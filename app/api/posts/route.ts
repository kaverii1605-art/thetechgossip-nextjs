import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { getAdminSession } from "@/lib/auth";

// GET - Fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.error("GET /api/posts error:", error);

    return Response.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}

// POST - Create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      heading,
      subHeading,
      content,
      image,
      category,
      author,
      featured,
      published,
    } = body;

    // Required fields
    if (!heading || !subHeading || !content || !category) {
      return NextResponse.json(
        {
          error: "Heading, sub heading, content and category are required",
        },
        { status: 400 },
      );
    }

    // Create slug automatically
    const slug =
      heading
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now();

    // Create post
    const post = await prisma.post.create({
      data: {
        heading,
        subHeading,
        slug,
        content,
        image: image || null,
        category,
        author: author || null,
        featured: featured ?? false,
        published: published ?? true,
      },
    });

    return NextResponse.json(post, {
      status: 201,
    });
  } catch (error) {
    console.error("POST posts error:", error);

    return NextResponse.json(
      {
        error: "Failed to create post",
      },
      { status: 500 },
    );
  }
}
