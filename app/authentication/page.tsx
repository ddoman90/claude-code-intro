"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { z } from "zod";
import { signIn, signUp } from "@/lib/auth-client";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await signUp.email({ email, password, name: email.split("@")[0] });
        if (error) {
          setError(error.message ?? "Signup failed");
          return;
        }
      } else {
        const { error } = await signIn.email({ email, password });
        if (error) {
          setError(error.message ?? "Login failed");
          return;
        }
      }
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-3xl font-bold text-center mb-8">
        {mode === "signup" ? "Create Account" : "Sign In"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <a href="/authentication?mode=login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <a href="/authentication?mode=signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </>
        )}
      </p>
    </div>
  );
}

export default function Authentication() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  );
}
