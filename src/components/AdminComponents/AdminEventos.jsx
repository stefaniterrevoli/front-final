import { useState, useEffect } from "react";
import api from "../../services/api";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadEventos = async () => {
    try {
      const res = await api.get("/events");
      setEventos(res.data);
    } catch (e) {
      console.error("Error cargando eventos:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventos();
  }, []);

  const geocodeLocation = async (loc) => {
    if (!loc.trim()) return { lat: null, lng: null };
    try {
      const params = new URLSearchParams({
        q: loc,
        format: "json",
        limit: 1,
      });
      const res = await fetch(`${NOMINATIM_URL}?${params}`, {
        headers: { "User-Agent": "creAtiva/1.0" },
      });
      const data = await res.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (e) {
      console.error("Error geocodificando:", e);
    }
    return { lat: null, lng: null };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !eventDate) return;

    setGeocoding(true);
    const coords = await geocodeLocation(location);
    setGeocoding(false);

    try {
      const storedUser = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      const userId = storedUser.user_id;

      await api.post("/events", {
        userId,
        title: title.trim(),
        description: description.trim(),
        latitude: coords.lat,
        longitude: coords.lng,
        commune: location.trim(),
        eventDate: `${eventDate}T12:00:00`,
        status: "activo",
        imageUrl: imageUrl.trim() || null,
      });

      setTitle("");
      setDescription("");
      setEventDate("");
      setLocation("");
      setImageUrl("");

      await loadEventos();
    } catch (err) {
      console.error("Error al crear evento:", err);
      alert("Ocurrió un error al crear el evento.");
    }
  };

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">Crear Evento</h2>

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
        <button
          type="submit"
          disabled={geocoding}
          className="bg-pink-700 hover:bg-pink-800 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {geocoding ? "Geocodificando..." : "Crear Evento"}
        </button>
      </form>

      {!loading && eventos.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl text-white font-bold">Eventos creados</h3>
          {eventos.map((e) => (
            <div
              key={e.event_id}
              className="bg-purple-950/50 rounded-xl p-4 border border-purple-800"
            >
              {e.image_url && (
                <img src={e.image_url} alt={e.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              )}
              <p className="text-white font-bold text-lg">{e.title}</p>
              <p className="text-gray-400 text-sm mt-1">{e.description}</p>
              <p className="text-gray-500 text-xs mt-2">
                {e.event_date ? new Date(e.event_date).toLocaleDateString() : ""}
                {e.commune && ` | ${e.commune}`}
              </p>
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
