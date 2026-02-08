"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleLogout() {
    await signOut();
    router.push("/authentication");
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-xl font-bold text-zinc-900">
          NextNotes
        </Link>
        {session && (
          <button
            onClick={handleLogout}
            className="cursor-pointer text-sm text-zinc-600 hover:text-zinc-900"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
