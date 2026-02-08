"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/components/Header";
import { TipTapEditor } from "@/app/components/TipTapEditor";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object>({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content_json: content }),
      });

      if (res.status === 401) {
        router.push("/authentication");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create note");
        return;
      }

      const note = await res.json();
      router.push(`/notes/${note.id}`);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold">New Note</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Content
            </label>
            <div className="mt-1">
              <TipTapEditor onUpdate={setContent} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Note"}
          </button>
        </form>
      </main>
    </>
  );
}
