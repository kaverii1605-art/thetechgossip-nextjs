"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetupPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create admin");
        setLoading(false);
        return;
      }

      setSuccess("Admin account created successfully!");

      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Create Admin Account</h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Create your Tech Gossip administrator account.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password again"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
          )}

          {success && (
            <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "#1a3d9c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
