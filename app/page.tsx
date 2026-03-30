import HeroSection from "@/components/HeroSection";
import RsvpSection from "@/components/RsvpSection";
import ItemsList from "@/components/ItemsList";
import WhatToBring from "@/components/WhatToBring";
import MapEmbed from "@/components/MapEmbed";
import { getRsvps, getItems } from "@/lib/sheets";
import { getWeather } from "@/lib/weather";
import { GiBarbecue } from "react-icons/gi";
import { MdMusicNote, MdLocalBar } from "react-icons/md";

export const revalidate = 60;

export default async function Home() {
  const [rsvps, items, weather] = await Promise.all([
    getRsvps(),
    getItems(),
    getWeather(),
  ]);

  const going = rsvps.filter((r) => r.attending).length;
  const notGoing = rsvps.filter((r) => !r.attending).length;

  return (
    <main className="bg-background min-h-screen">
      <div className="sticky top-0 z-50 w-full py-2.5 px-4 flex items-center gap-2 text-sm font-medium font-label text-white" style={{ background: "#7d5800" }}>
        <GiBarbecue size={18} />
        Churrascada - 4 de Abril · Fortaleza
      </div>

      <HeroSection />

      <RsvpSection
        initialRsvps={rsvps}
        initialGoing={going}
        initialNotGoing={notGoing}
        weatherData={weather}
      />

      <div className="w-full h-px max-w-5xl mx-auto bg-outline-variant/30" />

      <WhatToBring />

      <ItemsList initialItems={items} />

      <MapEmbed />

      <footer className="py-12 px-4 text-center bg-background">
        <div className="flex justify-center gap-8 mb-6">
          <GiBarbecue className="text-outline-variant text-4xl" />
          <MdMusicNote className="text-outline-variant text-4xl" />
          <MdLocalBar className="text-outline-variant text-4xl" />
        </div>
      </footer>
    </main>
  );
}
