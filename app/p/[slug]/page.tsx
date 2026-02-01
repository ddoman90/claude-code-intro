export default async function PublicNote({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">Public Note</h1>
        <p className="mt-4 text-zinc-600">Viewing: {slug}</p>
      </main>
    </div>
  );
}
