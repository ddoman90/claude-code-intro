"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/authentication");
  }

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer text-sm text-zinc-600 hover:text-zinc-900"
    >
      Logout
    </button>
  );
}
