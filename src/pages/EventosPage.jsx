import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EventosProvider, useEventos } from "../context/EventosContext";
import EventoCard from "../components/EventoComponents/EventoCard";
import EventoPopup from "../components/EventoComponents/EventoPopup";

const EventosContent = () => {
  const [selected, setSelected] = useState(null);
  const { eventos } = useEventos();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openEvent) {
      setSelected(location.state.openEvent);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-titulos text-3xl sm:text-5xl mb-8">Eventos</h1>

        {eventos.length === 0 && !selected ? (
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
