import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "No admin account was found with this email address." },
        { status: 404 }
      );
    }

    // Generate a secure password-reset token.
    const resetToken = crypto.randomBytes(32).toString("hex");

    // The reset link will expire after 30 minutes.
    const resetTokenExpiry = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Create the reset link.
    const appUrl =
      process.env.APP_URL || new URL(request.url).origin;

    const resetLink =
      `${appUrl}/admin/reset-password?token=${resetToken}`;

    // Send the reset email using Resend.
    const { error } = await resend.emails.send({
      from: "TheTechGossip <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your TheTechGossip Admin Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #333;">
          <h2 style="color: #0B1F4D;">Reset Your Password</h2>

          <p>
            We received a request to reset your
            TheTechGossip admin password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <p style="margin: 30px 0;">
            <a
              href="${resetLink}"
              style="display: inline-block; background: #0B1F4D; color: #ffffff; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;"
            >
              Reset Password
            </a>
          </p>

          <p>
            This link expires in 30 minutes.
          </p>

          <p>
            If you did not request a password reset,
            you can ignore this email.
          </p>

          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;" />

          <p style="font-size: 12px; color: #777;">
            TheTechGossip Admin Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);

      return NextResponse.json(
        { error: "Could not send the reset email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Password reset link has been sent to your email address.",
    });
  } catch (error) {
    console.error("Request reset error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while requesting the password reset.",
      },
      { status: 500 }
    );
  }
}