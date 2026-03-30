import { BsCalendarEvent, BsClock } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[580px] flex-col items-center justify-center gap-8 p-6 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(30,28,18,0.3) 0%, rgba(30,28,18,0.72) 100%), url("https://i.pinimg.com/736x/4e/82/67/4e8267ccfc04301b0002da787f64cbeb.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 text-center z-10 max-w-xl">
        <h1 className="text-white text-5xl sm:text-7xl font-black leading-tight tracking-tight font-headline">
          Churrascada
        </h1>

        <div className="flex flex-col items-center gap-2 mt-1">
          <p className="text-white text-lg font-medium flex items-center gap-2 font-body">
            <BsCalendarEvent size={18} />
            4 de Abril · Sábado
          </p>
          <p className="text-white/90 text-base flex items-center gap-2 font-body">
            <BsClock size={16} />
            A partir das 14h00
          </p>
          <p className="text-white/80 text-base flex items-center gap-2 font-body">
            <IoLocationSharp size={18} />
            Av. Francisco Sá, 1854 - Lobby
          </p>
          <p className="text-white/60 text-sm font-body">
            Francisco Philomeno Residence · Fortaleza, CE
          </p>
        </div>
      </div>

      <a
        href="#rsvp"
        className="flex min-w-[220px] items-center justify-center rounded-xl h-14 px-8 text-white text-base font-bold shadow-xl z-10 transition-transform hover:scale-105 active:scale-95 font-label"
        style={{ background: "linear-gradient(135deg, #7d5800 0%, #ffb703 100%)" }}
      >
        Confirmar Presença
      </a>
    </section>
  );
}
