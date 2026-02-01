# CLAUDE.md

We are building the app described in @SPEC.MD. Read that file for general architectural tasks or double-check the exact database structure, tech stack or architecture.

Keep your files extremely consince and focus on conveying the key information. No unnecessary fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start development server (Next.js with hot reload)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Runtime:** Bun
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS 4
- **Auth:** better-auth (email/password)
- **Rich Text:** TipTap (StarterKit)
- **Database:** SQLite via Bun's SQLite client
- **Validation:** Zod

## Architecture

This is a note-taking web app with authentication and public sharing.

**Application Layers:**
- **Presentation:** Next.js pages/components with TailwindCSS, TipTap editor
- **API:** REST endpoints under `/api/notes` for CRUD operations
- **Data Access:** Raw SQL via Bun SQLite (`lib/db.ts`, `lib/notes.ts`)

**Key Routes:**
- `/` - Landing page
- `/dashboard` - Authenticated user's note list
- `/notes/[id]` - Note editor (authenticated)
- `/p/[slug]` - Public read-only note view

**Database:**
- SQLite file at `data/app.db`
- Tables: `user`, `session`, `account`, `verification` (better-auth), `notes` (app data)
- Notes store TipTap content as JSON in `content_json` column

## Path Alias

`@/*` maps to the project root (configured in tsconfig.json).
