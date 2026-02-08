import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/authentication");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Notes</h1>
          <Link
            href="/notes/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            New Note
          </Link>
        </div>
        <p className="mt-4 text-zinc-600">Welcome, {session.user.name}</p>
      </main>
    </>
  );
}
