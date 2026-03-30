const LAT = -3.7319;
const LON = -38.5267;
const EVENT_DATE = "2026-04-04";

const WMO_CODES: Record<number, { label: string; emoji: string }> = {
  0: { label: "Céu limpo", emoji: "☀️" },
  1: { label: "Predominantemente limpo", emoji: "🌤️" },
  2: { label: "Parcialmente nublado", emoji: "⛅" },
  3: { label: "Nublado", emoji: "☁️" },
  45: { label: "Névoa", emoji: "🌫️" },
  48: { label: "Névoa com geada", emoji: "🌫️" },
  51: { label: "Chuvisco leve", emoji: "🌦️" },
  53: { label: "Chuvisco moderado", emoji: "🌦️" },
  55: { label: "Chuvisco intenso", emoji: "🌧️" },
  61: { label: "Chuva leve", emoji: "🌧️" },
  63: { label: "Chuva moderada", emoji: "🌧️" },
  65: { label: "Chuva forte", emoji: "🌧️" },
  80: { label: "Pancadas leves", emoji: "🌦️" },
  81: { label: "Pancadas moderadas", emoji: "🌧️" },
  82: { label: "Pancadas fortes", emoji: "⛈️" },
  95: { label: "Tempestade", emoji: "⛈️" },
  96: { label: "Tempestade com granizo", emoji: "⛈️" },
  99: { label: "Tempestade com granizo forte", emoji: "⛈️" },
};

export type WeatherData = {
  tempMax: number;
  tempMin: number;
  precipitation: number;
  label: string;
  emoji: string;
};

export async function getWeather(): Promise<WeatherData | null> {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(LAT));
    url.searchParams.set("longitude", String(LON));
    url.searchParams.set(
      "daily",
      "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode"
    );
    url.searchParams.set("timezone", "America/Fortaleza");
    url.searchParams.set("start_date", EVENT_DATE);
    url.searchParams.set("end_date", EVENT_DATE);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const daily = data.daily;

    if (!daily?.time?.length) return null;

    const code: number = daily.weathercode[0];
    const wmo = WMO_CODES[code] ?? { label: "Tempo variável", emoji: "🌡️" };

    return {
      tempMax: Math.round(daily.temperature_2m_max[0]),
      tempMin: Math.round(daily.temperature_2m_min[0]),
      precipitation: daily.precipitation_sum[0],
      label: wmo.label,
      emoji: wmo.emoji,
    };
  } catch {
    return null;
  }
}
