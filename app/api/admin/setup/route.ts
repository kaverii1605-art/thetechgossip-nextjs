import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = body.username?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "Username, email and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          error: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findFirst();

    if (existingAdmin) {
      return NextResponse.json(
        {
          error: "Admin account already exists.",
        },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    return NextResponse.json({
      message: "Admin account created successfully.",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while creating the admin.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}