"use client";

import { useState } from "react";
import { MdCelebration } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import RsvpForm from "./RsvpForm";
import type { Rsvp } from "@/lib/sheets";
import type { WeatherData } from "@/lib/weather";

type Props = {
  initialRsvps: Rsvp[];
  initialGoing: number;
  initialNotGoing: number;
  weatherData: WeatherData | null;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_COLORS = [
  "bg-primary-container text-on-primary-container",
  "bg-secondary-fixed text-on-secondary-fixed",
  "bg-tertiary-fixed text-on-tertiary-fixed",
  "bg-primary-fixed text-on-primary-fixed",
];

export default function RsvpSection({ initialRsvps, initialGoing, initialNotGoing, weatherData }: Props) {
  const [rsvps, setRsvps] = useState<Rsvp[]>(initialRsvps);
  const [going, setGoing] = useState(initialGoing);
  const [notGoing, setNotGoing] = useState(initialNotGoing);

  function handleConfirm(updatedRsvps: Rsvp[], g: number, ng: number) {
    setRsvps(updatedRsvps);
    setGoing(g);
    setNotGoing(ng);
  }

  const goingList = rsvps.filter((r) => r.attending);
  const notGoingList = rsvps.filter((r) => !r.attending);
  const avatarGuests = goingList.slice(0, 3);
  const remainder = going - avatarGuests.length;

  return (
    <section id="rsvp" className="max-w-6xl mx-auto w-full px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <div className="bg-surface-container-low rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MdCelebration className="text-primary text-3xl" />
            <h3 className="text-2xl font-headline font-extrabold text-on-surface">
              Bora?
            </h3>
          </div>
          <RsvpForm onConfirm={handleConfirm} />
        </div>

        <div className="flex flex-col gap-6">

          <div className="bg-surface-container-high rounded-3xl p-8 flex flex-col items-center text-center">
            <span className="text-primary-fixed-dim font-headline font-black text-7xl mb-1 leading-none">
              {going}
            </span>
            <p className="text-on-surface font-headline font-bold text-xl uppercase tracking-widest">
              Confirmados
            </p>

            {avatarGuests.length > 0 && (
              <div className="flex -space-x-3 mt-4">
                {avatarGuests.map((r, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-surface-container-high flex items-center justify-center text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  >
                    {getInitials(r.name)}
                  </div>
                ))}
                {remainder > 0 && (
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-primary-container flex items-center justify-center text-xs font-bold text-on-primary-container">
                    +{remainder}
                  </div>
                )}
              </div>
            )}

            {(goingList.length > 0 || notGoingList.length > 0) && (
              <div className="mt-5 w-full rounded-2xl overflow-hidden bg-surface-container-lowest text-left">
                {goingList.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-label font-bold uppercase tracking-wider bg-primary-container text-on-primary-container">
                      Vão ({goingList.length})
                    </div>
                    <ul>
                      {goingList.map((r, i) => (
                        <li key={i} className="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/20 last:border-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-container flex-shrink-0" />
                          <span className="text-sm text-on-surface font-medium">{r.name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {notGoingList.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-label font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant border-t border-outline-variant/20">
                      Não vão ({notGoingList.length})
                    </div>
                    <ul>
                      {notGoingList.map((r, i) => (
                        <li key={i} className="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/20 last:border-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline flex-shrink-0" />
                          <span className="text-sm text-on-surface-variant">{r.name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 flex items-center justify-between border border-outline-variant/20">
            {weatherData ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{weatherData.emoji}</span>
                  <div>
                    <p className="text-on-surface font-headline font-extrabold text-2xl">
                      {weatherData.tempMax}°C
                    </p>
                    <p className="text-on-surface-variant text-sm">{weatherData.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-on-surface-variant font-label text-xs font-bold uppercase">
                    Previsão
                  </p>
                  <p className="text-on-surface font-bold text-sm">4 de Abril</p>
                  <p className="text-on-surface-variant text-xs">Fortaleza, CE</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 text-on-surface-variant">
                <IoSunnyOutline size={28} />
                <span className="text-sm">Previsão indisponível</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
