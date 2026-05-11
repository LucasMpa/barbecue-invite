export default function TestPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-on-background">
      <section className="mx-auto flex max-w-3xl flex-col gap-6">
        <p className="font-label text-sm font-bold uppercase tracking-wide text-primary">
          Rota de teste
        </p>

        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-8 shadow-sm">
          <h1 className="font-headline text-4xl font-black leading-tight text-on-surface sm:text-5xl">
            Página /test
          </h1>
        </div>
      </section>
    </main>
  );
}
