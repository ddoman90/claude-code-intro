import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NoteEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/authentication");

  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">Note Editor</h1>
        <p className="mt-4 text-zinc-600">Editing note: {id}</p>
      </main>
    </div>
  );
}
