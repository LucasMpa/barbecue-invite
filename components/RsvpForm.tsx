"use client";

import { useState } from "react";
import type { Rsvp } from "@/lib/sheets";

type Props = {
  onConfirm: (rsvps: Rsvp[], going: number, notGoing: number) => void;
};

export default function RsvpForm({ onConfirm }: Props) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!name.trim() || attending === null) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), attending }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao confirmar presença");
        return;
      }

      onConfirm(data.rsvps, data.going, data.notGoing);
      setDone(true);
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-2">{attending ? "🎉" : "😢"}</div>
        <p className="font-semibold text-lg text-on-surface">
          {attending ? "Só o show! Te espero aqui." : "Mó Paia!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider font-label">
          Seu Nome
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
          className="w-full rounded-xl text-on-surface border border-outline-variant bg-surface-container-lowest focus:border-primary h-14 px-4 text-base transition-colors outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider font-label">
          Sua Resposta
        </p>
        <div
          className="flex items-stretch justify-center rounded-xl p-1.5 gap-1"
          style={{ background: "rgba(233,226,210,0.5)" }}
        >
          <button
            type="button"
            onClick={() => setAttending(true)}
            className="flex flex-1 flex-col items-center justify-center rounded-lg px-3 py-3 text-sm font-bold font-label transition-all cursor-pointer gap-2"
            style={{
              background: attending === true ? "#ffffff" : "transparent",
              color: attending === true ? "#7d5800" : "#514532",
              boxShadow: attending === true ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
            }}
          >
            <img src="https://i.pinimg.com/736x/c7/ce/55/c7ce555396506cd3b4053792419e7fab.jpg" alt="" className="w-22 h-22 object-cover" />
            Vou com certeza!
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className="flex flex-1 flex-col items-center justify-center rounded-lg px-3 py-3 text-sm font-bold font-label transition-all cursor-pointer gap-2"
            style={{
              background: attending === false ? "#ffffff" : "transparent",
              color: attending === false ? "#bb152c" : "#514532",
              boxShadow: attending === false ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
            }}
          >
            <img src="https://media.tenor.com/rj5_xH1aXf4AAAAe/perdeu-aura-aura.png" alt="" className="w-22 h-22 object-cover" />
            Vou ver e te aviso
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-error">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !name.trim() || attending === null}
        className="w-full cursor-pointer flex items-center justify-center rounded-xl h-14 text-white text-base font-bold shadow-md transition-all hover:shadow-lg disabled:opacity-40 font-label"
        style={{ background: "linear-gradient(135deg, #7d5800 0%, #ffb703 100%)" }}
      >
        {loading ? "Enviando..." : "Confirmar Agora"}
      </button>
    </div>
  );
}
