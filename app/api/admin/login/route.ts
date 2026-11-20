import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

import { prisma } from "@/lib/prisma";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const secretKey = new TextEncoder().encode(secret);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = body.username?.trim();
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json(
        {
          error: "Username and password are required.",
        },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          error: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        {
          error: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      adminId: admin.id,
      username: admin.username,
      email: admin.email,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secretKey);

    const response = NextResponse.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong during login.",
      },
      { status: 500 }
    );
  }
}

