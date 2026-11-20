import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const secretKey = new TextEncoder().encode(secret);

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secretKey);

    return payload;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}