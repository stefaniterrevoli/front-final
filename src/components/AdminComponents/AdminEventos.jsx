import { useState, useEffect } from "react";
import api from "../../services/api";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadEventos = async () => {
    try {
      const res = await api.get("/events");
      const list = res.data.events || res.data;
      setEventos(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Error cargando eventos:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventos();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setEventDate("");
    setLocation("");
    setRegion("");
    setImageUrl("");
  };

  const startEdit = (ev) => {
    setEditingId(ev.eventId || ev.event_id);
    setTitle(ev.title || "");
    setDescription(ev.description || "");
    setEventDate(formatDateForInput(ev.eventDate || ev.event_date));
    setLocation(ev.commune || "");
    setRegion(ev.region || "");
    setImageUrl((ev.imageUrl || ev.image_url) || "");
  };

  const geocodeLocation = async (loc) => {
    if (!loc.trim()) return { lat: null, lng: null };
    try {
      const params = new URLSearchParams({
        q: `${loc}, Región Metropolitana, Chile`,
        format: "json",
        limit: 1,
        countrycodes: "cl",
      });
      const res = await fetch(`${NOMINATIM_URL}?${params}`, {
        headers: { "User-Agent": "creAtiva/1.0" },
      });
      const data = await res.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        // Validar que esté dentro de la Región Metropolitana (~33.0 a ~34.0 lat, ~70.5 a ~71.5 lng)
        if (lat >= -34.2 && lat <= -33.0 && lng >= -71.2 && lng <= -70.4) {
          return { lat, lng };
        }
      }
    } catch (e) {
      console.error("Error geocodificando:", e);
    }
    return { lat: null, lng: null };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !eventDate || !region.trim()) return;

    setGeocoding(true);
    const coords = await geocodeLocation(location);
    setGeocoding(false);

    if (coords.lat === null || coords.lng === null) {
      alert("No se pudo determinar la ubicación. Intenta con un nombre más específico.");
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      const userId = storedUser.userId;
      const body = {
        title: title.trim(),
        description: description.trim(),
        latitude: coords.lat,
        longitude: coords.lng,
        region: region.trim(),
        commune: location.trim(),
        eventDate: `${eventDate}T12:00:00`,
        status: "activo",
        imageUrl: imageUrl.trim() || null,
      };

      if (editingId) {
        await api.put(`/events/admin/${editingId}`, body);
      } else {
        await api.post("/events", { ...body, userId });
      }

      resetForm();
      await loadEventos();
    } catch (err) {
      console.error("Error al guardar evento:", err);
      alert("Ocurrió un error al guardar el evento.");
    }
  };

  const handleDelete = async (ev) => {
    const id = ev.eventId || ev.event_id;
    if (!window.confirm("¿Eliminar este evento?")) return;
    try {
      await api.delete(`/events/admin/${id}`);
      await loadEventos();
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      alert("Ocurrió un error al eliminar el evento.");
    }
  };

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">{editingId ? "Editar Evento" : "Crear Evento"}</h2>
      {editingId && (
        <button onClick={resetForm} className="text-gray-400 hover:text-white text-sm mb-4 transition-colors">
          ← Cancelar edición
        </button>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-purple-950 rounded-xl p-6 border border-purple-800 mb-10"
      >
        <div className="mb-4">
          <label className="block text-white mb-1">Título del evento</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">URL de imagen (opcional)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
          {imageUrl && (
            <div className="relative mt-2 inline-block">
              <img src={imageUrl} alt="vista previa" className="h-28 rounded-lg object-cover" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white mb-1">Fecha</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Ubicación</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Santiago, Chile"
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
            />
            <p className="text-gray-500 text-xs mt-1">
              La ubicación se geocodifica automáticamente al crear el evento.
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Región</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Ej: Región Metropolitana"
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>
        <button
          type="submit"
          disabled={geocoding}
          className="bg-pink-700 hover:bg-pink-800 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {geocoding ? "Geocodificando..." : editingId ? "Actualizar Evento" : "Crear Evento"}
        </button>
      </form>

      {!loading && eventos.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl text-white font-bold">Eventos creados</h3>
          {(eventos || []).map((e) => (
            <div
              key={e.eventId || e.event_id}
              className="bg-purple-950/50 rounded-xl p-4 border border-purple-800"
            >
              {(e.imageUrl || e.image_url) && (
                <img src={e.imageUrl || e.image_url} alt={e.title} className="w-full h-32 object-cover mb-2" />
              )}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base sm:text-lg break-words">{e.title}</p>
                  <p className="text-gray-400 text-sm mt-1 break-words">{e.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {e.eventDate ? new Date(e.eventDate).toLocaleDateString() : e.event_date ? new Date(e.event_date).toLocaleDateString() : ""}
                    {(e.commune || e.region) && ` | ${e.commune || ""}${e.region ? `, ${e.region}` : ""}`}
                  </p>
                </div>
                <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                  <button onClick={() => startEdit(e)} className="text-pink-400 hover:text-pink-300 text-xs font-bold transition-colors">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(e)} className="text-red-400 hover:text-red-300 text-xs font-bold transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <p className="text-gray-400 text-center mt-6">No hay eventos creados aún.</p>
      )}
    </div>
  );
};

export default AdminEventos;
