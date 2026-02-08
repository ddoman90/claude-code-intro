import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createNote } from "@/lib/notes";
import { z } from "zod";

const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content_json: z.record(z.string(), z.unknown()),
});

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const result = createNoteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    );
  }

  const { title, content_json } = result.data;
  const noteId = createNote(session.user.id, title, JSON.stringify(content_json));

  return NextResponse.json({ id: noteId }, { status: 201 });
}
