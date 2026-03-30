import { MdPinDrop } from "react-icons/md";
import { IoNavigateOutline } from "react-icons/io5";

export default function MapEmbed() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Avenida+Francisco+Sá+1854,Fortaleza,CE,Brasil";

  return (
    <section className="bg-surface-container-low py-20 mt-4">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="space-y-4 flex justify-center flex-col">
          <span className="text-primary font-label text-xs font-black uppercase tracking-[0.1em] text-center">
            Onde encontrar
          </span>
          <h2 className="text-4xl font-headline font-extrabold text-on-surface text-center">
            Localização
          </h2>
           <div className="relative group">
          <div className="absolute -inset-4 bg-primary-container/10 rounded-[2rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest">
            <iframe
              title="Localização do evento"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Avenida+Francisco+Sá+1854,Fortaleza,CE,Brasil&output=embed"
            />
          </div>
        </div>
          <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MdPinDrop className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-bold text-on-surface">Av. Francisco Sá, 1854 - Lobby</p>
              <p className="text-sm text-on-surface-variant">Francisco Philomeno Residence · Fortaleza, CE</p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 h-14 bg-on-surface text-inverse-on-surface rounded-xl font-bold font-label transition-transform hover:scale-105 active:scale-95 justify-center"
          >
            <IoNavigateOutline size={20} />
            Abrir no GPS
          </a>
        </div>

      </div>
    </section>
  );
}
