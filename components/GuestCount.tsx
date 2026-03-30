"use client";

type Props = {
  going: number;
  notGoing: number;
};

export default function GuestCount({ going, notGoing }: Props) {
  return (
    <div className="flex gap-4 justify-center mt-2">
      <div
        className="rounded-xl px-5 py-3 text-center min-w-[90px]"
        style={{ background: "var(--secondary)", color: "#fff" }}
      >
        <div className="text-2xl font-bold">{going}</div>
        <div className="text-xs font-medium opacity-90">confirmados</div>
      </div>
      <div
        className="rounded-xl px-5 py-3 text-center min-w-[90px]"
        style={{ background: "#ccc", color: "var(--text)" }}
      >
        <div className="text-2xl font-bold">{notGoing}</div>
        <div className="text-xs font-medium opacity-70">não vão</div>
      </div>
    </div>
  );
}
