import { useState } from "react";
import { EventosProvider, useEventos } from "../context/EventosContext";
import EventoCard from "../components/EventoComponents/EventoCard";
import EventoPopup from "../components/EventoComponents/EventoPopup";

const EventosContent = () => {
  const [selected, setSelected] = useState(null);
  const { eventos } = useEventos();

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-titulos text-5xl mb-8">Eventos</h1>

        {eventos.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay eventos próximos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((e) => (
              <EventoCard key={e.id} evento={e} onClick={setSelected} />
            ))}
          </div>
        )}

        {selected && (
          <EventoPopup evento={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </section>
  );
};

const EventosPage = () => (
  <EventosProvider>
    <EventosContent />
  </EventosProvider>
);

export default EventosPage;
