"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapEditorProps {
  content?: object;
  onUpdate: (content: object) => void;
}

export function TipTapEditor({ content, onUpdate }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getJSON());
    },
  });

  return (
    <EditorContent
      editor={editor}
      className="min-h-[200px] w-full rounded-md border border-zinc-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500"
    />
  );
}
