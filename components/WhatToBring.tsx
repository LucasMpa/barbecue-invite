import { GiMeat } from "react-icons/gi";
import { MdSportsBar, MdLocalDrink, MdBakeryDining } from "react-icons/md";

const cards = [
  {
    icon: <GiMeat size={28} />,
    title: "Carnes",
    description: "Quanto mais variedade, melhor. Se quiser algo diferente, traz pra somar!",
    iconBg: "#fd860320",
    iconColor: "#934b00",
  },
  {
    icon: <MdSportsBar size={28} />,
    title: "Bebidas",
    description: "Cada um traz o que for beber.",
    iconBg: "#ffb70320",
    iconColor: "#7d5800",
  },
  {
    icon: <MdLocalDrink size={28} />,
    title: "Refri e Suco",
    description: "Vai ter opções sem álcool, mas contribuições são bem-vindas.",
    iconBg: "#934b0015",
    iconColor: "#934b00",
  },
  {
    icon: <MdBakeryDining size={28} />,
    title: "Acompanhamentos",
    description: "Pão de alho e farofa estão garantidos. Se quiser levar algo a mais, manda ver.",
    iconBg: "#bb152c15",
    iconColor: "#bb152c",
  },
];

export default function WhatToBring() {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-14 gap-4">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface">
          O que trazer?
        </h2>
        <p className="text-on-surface-variant text-lg font-body max-w-xl">
          A ideia é que o churrasco seja colaborativo.
          Traga o que conseguir pra ajudar a compor o rolê.
        </p>
         <div
          className="px-4 py-2 rounded-full font-label text-xs font-bold tracking-widest uppercase"
          style={{ background: "#bb152c18", color: "#bb152c" }}
        >
          Cada um ajuda um pouco
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group p-8 rounded-3xl border transition-colors flex flex-col items-center text-center"
            style={{ borderColor: "#d5c4ac50" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors"
              style={{ background: card.iconBg, color: card.iconColor }}
            >
              {card.icon}
            </div>
            <h4 className="font-headline font-bold text-xl text-on-surface mb-2">
              {card.title}
            </h4>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
