"use client";

import { FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRequestReset(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");
    setResetLink("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/request-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reset password");
        return;
      }

      setMessage(data.message);

      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reset password.");
        return;
      }

      setMessage(data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================
     PASSWORD RESET FORM
  ========================================== */

  if (token) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-center text-[#0B1F4D]">
            Create New Password
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-8">
            Enter a new password for your admin account.
          </p>

          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B1F4D] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 disabled:opacity-50"
            >
              {loading
                ? "Updating Password..."
                : "Update Password"}
            </button>

          </form>
        </div>
      </main>
    );
  }

  /* ==========================================
     REQUEST RESET LINK FORM
  ========================================== */

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-[#0B1F4D]">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your admin email address to reset your password.
        </p>

        <form
          onSubmit={handleRequestReset}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1F4D] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 disabled:opacity-50"
          >
            {loading
              ? "Generating Reset Link..."
              : "Generate Reset Link"}
          </button>

        </form>

        {resetLink && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">

            <p className="text-sm font-semibold text-[#0B1F4D] mb-2">
              Password Reset Link
            </p>

            <a
              href={resetLink}
              className="text-blue-600 text-sm break-all underline"
            >
              {resetLink}
            </a>

            <p className="text-xs text-gray-500 mt-3">
              This development link expires in 30 minutes.
            </p>

          </div>
        )}

      </div>
    </main>
  );
}