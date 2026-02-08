import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewNoteForm } from "@/app/components/NewNoteForm";

export default async function NewNotePage() {
  const session = await getSession();
  if (!session) redirect("/authentication");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">New Note</h1>
      <NewNoteForm />
    </main>
  );
}
