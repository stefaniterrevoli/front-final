import { useState } from "react";

const MAX_CHAPTERS = 6;
const MAX_TITLE = 200;
const MAX_DESC = 500;

const emptyChapters = () =>
  Array.from({ length: MAX_CHAPTERS }, (_, i) => ({
    title: `Capítulo ${i + 1}`,
    imageUrl: "",
  }));

const ProfileContent = ({ obras, addArtwork, updateArtwork, reloadProfile }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [artTitle, setArtTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState(emptyChapters());

  const overLimit = description.length > MAX_DESC || artTitle.length > MAX_TITLE;

  const resetForm = () => {
    setArtTitle("");
    setDescription("");
    setChapters(emptyChapters());
    setShowUpload(false);
    setEditingId(null);
    setEditingStatus(null);
  };

  const startEdit = (artwork) => {
    const imgs = artwork.images || [];
    setEditingId(artwork.artwork_id || artwork.artworkId);
    setEditingStatus(artwork.status || "publicada");
    setArtTitle(artwork.title || "");
    setDescription(artwork.description || "");
    setChapters(
      imgs.length > 0
        ? imgs.map((url, i) => ({ title: `Capítulo ${i + 1}`, imageUrl: url }))
        : emptyChapters()
    );
    setShowUpload(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artTitle.trim() || !description.trim() || overLimit) return;
    const filled = chapters.filter((ch) => ch.imageUrl.trim() !== "");
    if (filled.length === 0) return;
    if (editingId) {
      updateArtwork(editingId, {
        title: artTitle.trim(),
        description: description.trim(),
        status: editingStatus,
        chapters: filled.map((ch) => ({
          title: ch.title.trim() || `Capítulo`,
          imageUrl: ch.imageUrl.trim(),
        })),
      });
    } else {
      addArtwork({
        title: artTitle.trim(),
        description: description.trim(),
        chapters: filled.map((ch) => ({
          title: ch.title.trim() || `Capítulo`,
          imageUrl: ch.imageUrl.trim(),
        })),
      });
    }
    resetForm();
  };

  const updateChapter = (index, field, value) => {
    const next = [...chapters];
    next[index] = { ...next[index], [field]: value };
    setChapters(next);
  };

  const filledCount = chapters.filter((ch) => ch.imageUrl.trim() !== "").length;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-titulos text-2xl text-white">Obras subidas ({obras.length})</h2>
        <button
          onClick={() => { resetForm(); setShowUpload(!showUpload); }}
          className="bg-pink-700 hover:bg-pink-800 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {editingId ? "Cancelar" : "+ Subir obra"}
        </button>
      </div>

      {showUpload && (
        <form
          onSubmit={handleSubmit}
          className="bg-purple-950 rounded-xl p-6 border border-purple-700 mb-6"
        >
          <div className="mb-4">
            <label className="block text-white mb-1">Título de la obra</label>
            <input
              type="text"
              value={artTitle}
              onChange={(e) => setArtTitle(e.target.value)}
              maxLength={MAX_TITLE}
              required
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
            />
            <p className={`text-xs mt-1 ${artTitle.length > MAX_TITLE ? 'text-red-400' : 'text-gray-500'}`}>
              {artTitle.length}/{MAX_TITLE}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              maxLength={MAX_DESC + 50}
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
            />
            <p className={`text-xs mt-1 ${description.length > MAX_DESC ? 'text-red-400' : 'text-gray-500'}`}>
              {description.length}/{MAX_DESC}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">
              Capítulos ({filledCount}/{MAX_CHAPTERS} — completa al menos 1)
            </label>
            <div className="space-y-3">
              {chapters.map((ch, i) => (
                <div
                  key={i}
                  className="bg-black/30 rounded-lg p-3 border border-purple-800"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-sm font-bold w-8">
                      #{i + 1}
                    </span>
                    <input
                      type="text"
                      value={ch.title}
                      onChange={(e) => updateChapter(i, "title", e.target.value)}
                      maxLength={200}
                      placeholder="Título del capítulo"
                      className="flex-1 p-2 rounded bg-black text-white text-sm border border-purple-700 focus:outline-none focus:border-pink-700"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={ch.imageUrl}
                      onChange={(e) => updateChapter(i, "imageUrl", e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="flex-1 p-2 rounded bg-black text-white text-sm border border-purple-700 focus:outline-none focus:border-pink-700"
                    />
                    {ch.imageUrl && (
                      <img
                        src={ch.imageUrl}
                        alt={`preview cap ${i + 1}`}
                        className="h-10 w-10 rounded object-cover border border-purple-700 flex-shrink-0"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={filledCount === 0}
            className="w-full bg-pink-700 hover:bg-pink-800 disabled:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {editingId ? `Actualizar obra (${filledCount} capítulo${filledCount !== 1 ? "s" : ""})` : `Publicar obra (${filledCount} capítulo${filledCount !== 1 ? "s" : ""})`}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {obras.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center py-8">
            Aún no has subido obras.
          </p>
        ) : (
          obras.map((item) => {
            const itemId = item.artwork_id || item.artworkId;
            const images = item.images || [];
            return (
              <div
                key={itemId}
                className="bg-purple-950 rounded-xl overflow-hidden border border-purple-800 hover:border-pink-700 transition-colors"
              >
                {images.length > 0 ? (
                  <img
                    src={images[0]}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center text-4xl">
                    🎨
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-bold break-words">{item.title}</p>
                      <p className="text-gray-400 text-sm">
                        {item.publication_date ? new Date(item.publication_date).toLocaleDateString() : ""}
                        {images.length > 1 && ` | ${images.length} imágenes`}
                      </p>
                      <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 ${
                        item.status === "publicada" ? "bg-green-700 text-green-200" :
                        item.status === "rechazada" ? "bg-red-700 text-red-200" :
                        "bg-yellow-700 text-yellow-200"
                      }`}>
                        {item.status === "publicada" ? "Publicada" :
                         item.status === "rechazada" ? "Rechazada" :
                         "Pendiente"}
                      </span>
                    </div>
                    <button
                      onClick={() => startEdit(item)}
                      className="text-pink-400 hover:text-pink-300 text-xs font-bold ml-2 transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ProfileContent;
