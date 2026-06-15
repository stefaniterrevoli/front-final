import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminNoticias = () => {
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { data, addNoticia, editNoticia, deleteNoticia } = useAdmin();

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  const startEdit = (n) => {
    setEditingId(n.id);
    setTitle(n.title || "");
    setContent(n.content || "");
    setImageUrl(n.image || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      if (editingId) {
        editNoticia(editingId, { title: title.trim(), content: content.trim(), image: imageUrl.trim() });
      } else {
        addNoticia({ title: title.trim(), content: content.trim(), image: imageUrl.trim() });
      }
      resetForm();
    } catch (err) {
      console.error("Error al guardar noticia:", err);
      alert("Ocurrió un error al guardar la noticia.");
    }
  };

  const handleDelete = (n) => {
    if (!window.confirm("¿Eliminar esta noticia?")) return;
    deleteNoticia(n.id);
  };

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">{editingId ? "Editar Noticia" : "Publicar Noticia"}</h2>
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
          <label className="block text-white mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
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
        <div className="mb-4">
          <label className="block text-white mb-1">Contenido</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {editingId ? "Actualizar" : "Publicar"}
        </button>
      </form>

      {data.noticias.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl text-white font-bold">Noticias publicadas</h3>
          {data.noticias.map((n) => (
            <div
              key={n.id}
              className="bg-purple-950/50 rounded-xl p-4 border border-purple-800"
            >
              {n.image && (
                <img src={n.image} alt={n.title} className="w-full h-32 object-cover mb-2" />
              )}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base sm:text-lg break-words">{n.title}</p>
                  <p className="text-gray-400 text-sm mt-1 break-words">{n.content}</p>
                  <p className="text-gray-600 text-xs mt-2">{n.date}</p>
                </div>
                <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                  <button onClick={() => startEdit(n)} className="text-pink-400 hover:text-pink-300 text-xs font-bold transition-colors">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(n)} className="text-red-400 hover:text-red-300 text-xs font-bold transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNoticias;
