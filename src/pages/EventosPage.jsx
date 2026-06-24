import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EventosProvider, useEventos } from "../context/EventosContext";
import EventoCard from "../components/EventoComponents/EventoCard";
import EventoPopup from "../components/EventoComponents/EventoPopup";

const COMUNAS_RM = [
  "Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina",
  "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba",
  "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja",
  "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo",
  "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa",
  "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén",
  "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal",
  "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo",
  "San Miguel", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura",
];

const EventosContent = () => {
  const [selected, setSelected] = useState(null);
  const [filterComuna, setFilterComuna] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { eventos } = useEventos();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openEvent) {
      setSelected(location.state.openEvent);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const filtered = useMemo(() => {
    return eventos.filter((e) => {
      if (filterComuna && e.commune !== filterComuna) return false;
      if (dateFrom && e.date) {
        const d = new Date(e.date.split("/").reverse().join("-"));
        const from = new Date(dateFrom);
        if (d < from) return false;
      }
      if (dateTo && e.date) {
        const d = new Date(e.date.split("/").reverse().join("-"));
        const to = new Date(dateTo);
        if (d > to) return false;
      }
      return true;
    });
  }, [eventos, filterComuna, dateFrom, dateTo]);

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-titulos text-3xl sm:text-5xl mb-8">Eventos</h1>

        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-purple-950/50 border border-purple-800">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Comuna</label>
            <select
              value={filterComuna}
              onChange={(e) => setFilterComuna(e.target.value)}
              className="bg-black text-white border border-purple-700 p-2 text-sm focus:outline-none focus:border-pink-700"
            >
              <option value="">Todas las comunas</option>
              {COMUNAS_RM.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Desde</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              min="2026-01-01"
              max="2026-12-31"
              className="bg-black text-white border border-purple-700 p-2 text-sm focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Hasta</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              min="2026-01-01"
              max="2026-12-31"
              className="bg-black text-white border border-purple-700 p-2 text-sm focus:outline-none focus:border-pink-700"
            />
          </div>
          {(filterComuna || dateFrom || dateTo) && (
            <div className="flex items-end">
              <button
                onClick={() => { setFilterComuna(""); setDateFrom(""); setDateTo(""); }}
                className="text-xs text-gray-400 hover:text-white underline pb-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay eventos próximos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e) => (
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
