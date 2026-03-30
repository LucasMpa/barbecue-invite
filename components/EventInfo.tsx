export default function EventInfo() {
  return (
    <section className="py-12 px-4 text-center">
      <h1
        className="text-4xl font-bold mb-2"
        style={{ color: "var(--secondary)" }}
      >
        Churrasco
      </h1>
      <p className="text-lg mb-8" style={{ color: "var(--text)" }}>
        Sábado, 4 de abril de 2026
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
        <div
          className="flex-1 rounded-2xl p-5"
          style={{ background: "var(--primary)", color: "var(--text)" }}
        >
          <div className="text-3xl mb-1">📅</div>
          <div className="font-semibold text-sm uppercase tracking-wide opacity-70">
            Data
          </div>
          <div className="font-bold text-lg">04 de Abril</div>
          <div className="text-sm mt-1">Sábado</div>
        </div>

        <div
          className="flex-1 rounded-2xl p-5"
          style={{ background: "var(--primary)", color: "var(--text)" }}
        >
          <div className="text-3xl mb-1">🕑</div>
          <div className="font-semibold text-sm uppercase tracking-wide opacity-70">
            Horário
          </div>
          <div className="font-bold text-lg">14h00</div>
          <div className="text-sm mt-1">em diante</div>
        </div>

        <div
          className="flex-1 rounded-2xl p-5"
          style={{ background: "var(--primary)", color: "var(--text)" }}
        >
          <div className="text-3xl mb-1">📍</div>
          <div className="font-semibold text-sm uppercase tracking-wide opacity-70">
            Local
          </div>
          <div className="font-bold text-base leading-tight">
            Av. Francisco Sá, 1854
          </div>
          <div className="text-sm mt-1">Lobby — Francisco Philomeno Residence</div>
        </div>
      </div>
    </section>
  );
}
