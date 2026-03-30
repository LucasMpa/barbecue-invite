import { getWeather } from "@/lib/weather";

export default async function Weather() {
  const weather = await getWeather();

  return (
    <section className="px-4 pb-12">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-xl font-bold mb-4 text-center"
          style={{ color: "var(--text)" }}
        >
          Previsão do tempo
        </h2>
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--primary)" }}
        >
          {weather ? (
            <>
              <div className="text-5xl mb-2">{weather.emoji}</div>
              <div className="text-xl font-bold" style={{ color: "var(--text)" }}>
                {weather.label}
              </div>
              <div
                className="mt-3 flex justify-center gap-6 text-lg font-semibold"
                style={{ color: "var(--text)" }}
              >
                <span>↑ {weather.tempMax}°C</span>
                <span>↓ {weather.tempMin}°C</span>
                {weather.precipitation > 0 && (
                  <span>💧 {weather.precipitation} mm</span>
                )}
              </div>
              <p className="text-xs mt-3 opacity-60" style={{ color: "var(--text)" }}>
                Previsão para 4 de abril em Fortaleza · atualiza a cada hora
              </p>
            </>
          ) : (
            <p style={{ color: "var(--text)" }} className="opacity-70">
              Previsão indisponível no momento
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
