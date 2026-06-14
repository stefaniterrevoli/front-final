import { useState, useRef } from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminNoticias = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { data, addNoticia } = useAdmin();

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
    if (!title.trim() || !content.trim()) return;
    try {
      addNoticia({ title: title.trim(), content: content.trim(), image });
      setTitle("");
      setContent("");
      clearImage();
    } catch (err) {
      console.error("Error al crear noticia:", err);
      alert("Ocurrió un error al crear la noticia.");
    }
  };

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">Publicar Noticia</h2>

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
          Publicar
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
                <img src={n.image} alt={n.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              )}
              <p className="text-white font-bold text-lg">{n.title}</p>
              <p className="text-gray-400 text-sm mt-1">{n.content}</p>
              <p className="text-gray-600 text-xs mt-2">{n.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNoticias;
