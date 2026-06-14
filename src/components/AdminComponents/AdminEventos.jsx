import { useState, useRef } from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminEventos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { data, addEvento } = useAdmin();

  const MAX_IMG = 500 * 1024;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_IMG) {
      alert("La imagen es muy grande. Máximo 500KB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !eventDate) return;
    try {
      addEvento({
        title: title.trim(),
        description: description.trim(),
        eventDate,
        location: location.trim(),
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
        image,
      });
      setTitle("");
      setDescription("");
      setEventDate("");
      setLocation("");
      setLat("");
      setLng("");
      clearImage();
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
          <label className="block text-white mb-1">Imagen (opcional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-pink-700 file:text-white hover:file:bg-pink-800 cursor-pointer"
          />
          {imagePreview && (
            <div className="relative mt-2 inline-block">
              <img src={imagePreview} alt="vista previa" className="h-28 rounded-lg object-cover" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-700 text-white w-6 h-6 rounded-full text-sm hover:bg-red-800"
              >
                ✕
              </button>
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
              placeholder="Ej: Galería Central"
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white mb-1">Latitud (mapa)</label>
            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Ej: 19.4326"
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Longitud (mapa)</label>
            <input
              type="number"
              step="any"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="Ej: -99.1332"
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Crear Evento
        </button>
      </form>

      {data.eventos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl text-white font-bold">Eventos creados</h3>
          {data.eventos.map((e) => (
            <div
              key={e.id}
              className="bg-purple-950/50 rounded-xl p-4 border border-purple-800"
            >
              {e.image && (
                <img src={e.image} alt={e.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              )}
              <p className="text-white font-bold text-lg">{e.title}</p>
              <p className="text-gray-400 text-sm mt-1">{e.description}</p>
              <p className="text-gray-500 text-xs mt-2">
                {e.eventDate} {e.location && `| ${e.location}`} | Creado: {e.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventos;
