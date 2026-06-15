import { useState, useEffect } from "react";
import api from "../../services/api";

const AdminChapters = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [title, setTitle] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("0");
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArtworks = async () => {
    try {
      const res = await api.get("/artworks");
      const list = res.data.artworks || res.data;
      setArtworks(Array.isArray(list) ? list : []);
    } catch {
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadChapters = async (artworkId) => {
    try {
      const res = await api.get(`/chapters/artworks/${artworkId}`);
      const list = res.data.chapters || res.data;
      setChapters(Array.isArray(list) ? list : []);
    } catch {
      setChapters([]);
    }
  };

  const handleSelectArtwork = (e) => {
    const id = e.target.value;
    setSelectedArtwork(id);
    if (id) loadChapters(id);
    else setChapters([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedArtwork || !chapterNumber || !title.trim()) return;

    try {
      await api.post("/chapters", {
        artworkId: Number(selectedArtwork),
        chapterNumber: Number(chapterNumber),
        title: title.trim(),
        publicationDate: new Date().toISOString(),
        isPaid,
        price: isPaid ? Number(price) : 0,
      });
      setChapterNumber("");
      setTitle("");
      setIsPaid(false);
      setPrice("0");
      await loadChapters(selectedArtwork);
    } catch (err) {
      console.error("Error al crear capítulo:", err);
      alert("Ocurrió un error al crear el capítulo.");
    }
  };

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">Administrar Capítulos</h2>

      <div className="bg-purple-950 rounded-xl p-6 border border-purple-800 mb-10">
        <div className="mb-4">
          <label className="block text-white mb-1">Seleccionar obra</label>
          <select
            value={selectedArtwork}
            onChange={handleSelectArtwork}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          >
            <option value="">-- Selecciona una obra --</option>
            {artworks.map((a) => (
              <option key={a.artwork_id || a.artworkId} value={a.artwork_id || a.artworkId}>
                {(a.artwork_id || a.artworkId)} - {a.title}
              </option>
            ))}
          </select>
        </div>

        {selectedArtwork && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-white font-bold text-lg">Agregar Capítulo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-1">Número de capítulo</label>
                <input
                  type="number"
                  min="1"
                  value={chapterNumber}
                  onChange={(e) => setChapterNumber(e.target.value)}
                  required
                  className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
                />
              </div>
              <div>
                <label className="block text-white mb-1">Título del capítulo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="accent-pink-700"
                />
                Capítulo de pago
              </label>
              {isPaid && (
                <div className="flex-1 max-w-xs">
                  <label className="block text-white mb-1">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              Agregar Capítulo
            </button>
          </form>
        )}
      </div>

      {chapters.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl text-white font-bold">Capítulos existentes</h3>
          {chapters.map((ch) => (
            <div
              key={ch.chapter_id || ch.chapterId}
              className="bg-purple-950/50 rounded-xl p-4 border border-purple-800"
            >
              <p className="text-white font-bold">
                Cap. {ch.chapter_number || ch.chapterNumber}: {ch.title}
              </p>
              <p className="text-gray-400 text-sm">
                {(ch.is_paid || ch.isPaid) ? `$${ch.price || ch.price || 0}` : "Gratis"}
                {" | "}
                {ch.publication_date ? new Date(ch.publication_date).toLocaleDateString() : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminChapters;