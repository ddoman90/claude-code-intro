import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">Landing Page</h1>
        <p className="mt-4 text-zinc-600">Welcome to the Notes App</p>
        <nav className="mt-8">
          <ul className="list-disc list-inside text-left inline-block">
            <li><Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/notes/1" className="text-blue-600 hover:underline">Note Editor</Link></li>
            <li><Link href="/p/example" className="text-blue-600 hover:underline">Public Note</Link></li>
            <li><Link href="/authentication" className="text-blue-600 hover:underline">Authentication</Link></li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
