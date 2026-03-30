"use client";

import { useState } from "react";
import { MdOutlineRestaurant } from "react-icons/md";
import type { Item } from "@/lib/sheets";

type Props = {
  initialItems: Item[];
};

export default function ItemsList({ initialItems }: Props) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [personName, setPersonName] = useState("");
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!personName.trim() || !item.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personName: personName.trim(), item: item.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao salvar");
        return;
      }

      setItems(data.items);
      setItem("");
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto w-full px-4 py-16">
      <div className="text-center mb-10">
        <span className="text-primary font-label text-xs font-black uppercase tracking-[0.2em]">
          Organização COLETIVA hein!?
        </span>
        <h2 className="text-4xl font-headline font-extrabold text-on-surface mt-2">
          O que você vai levar?
        </h2>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <div className="bg-surface-container-low rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider font-label">
              Seu nome
            </p>
            <input
              type="text"
              placeholder="Ex: Lorem ipsum"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              maxLength={60}
              className="w-full rounded-xl text-on-surface border border-outline-variant bg-surface-container-lowest focus:border-primary h-14 px-4 text-base transition-colors outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider font-label">
              O que você vai trazer
            </p>
            <input
              type="text"
              placeholder="Ex: carne, carvão, sobremesa..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
              maxLength={80}
              className="w-full rounded-xl text-on-surface border border-outline-variant bg-surface-container-lowest focus:border-primary h-14 px-4 text-base transition-colors outline-none"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !personName.trim() || !item.trim()}
            className="w-full cursor-pointer flex items-center justify-center rounded-xl h-14 text-white text-base font-bold shadow-md transition-all hover:shadow-lg disabled:opacity-40 font-label"
            style={{ background: "linear-gradient(135deg, #7d5800 0%, #ffb703 100%)" }}
          >
            {loading ? "Salvando..." : "Adicionar"}
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="bg-surface-container-low p-5 rounded-2xl border border-transparent hover:border-primary-container/40 transition-all group"
            >
              <div className="w-11 h-11 rounded-full bg-primary-container/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MdOutlineRestaurant className="text-primary text-xl" />
              </div>
              <p className="font-headline font-bold text-on-surface text-base">{it.personName}</p>
              <p className="text-on-surface-variant text-sm mt-1">{it.item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-on-surface-variant text-sm">
          Ninguém adicionou nada ainda. Seja o primeiro!
        </p>
      )}
    </section>
  );
}
