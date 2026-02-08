import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Notes</h1>
        <p className="mt-4 text-zinc-600">
          A simple note-taking app with rich text editing and public sharing
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/authentication?tab=login"
            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/authentication?tab=signup"
            className="rounded-md border border-blue-600 px-6 py-2 text-blue-600 hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
