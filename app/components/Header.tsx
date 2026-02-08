import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center px-4">
        <Link href="/dashboard" className="text-xl font-bold text-zinc-900">
          NextNotes
        </Link>
      </div>
    </header>
  );
}
