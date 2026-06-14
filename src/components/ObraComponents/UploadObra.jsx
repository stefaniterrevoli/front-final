import { useState } from "react";
import { useObras } from "../../context/ObrasContext";
import { useAuth } from "../../context/AuthContext";

const UploadObra = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { addObra } = useObras();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addObra({
      title: title.trim(),
      description: description.trim(),
      image: imageUrl.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-purple-950 rounded-2xl max-w-lg w-full p-6 border border-purple-700 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        <h2 className="font-titulos text-3xl text-white mb-6">Subir Obra</h2>

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
          <label className="block text-white mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">URL de la imagen</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
          {imageUrl && (
            <div className="relative mt-2 inline-block">
              <img
                src={imageUrl}
                alt="vista previa"
                className="h-28 rounded-lg object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Publicar Obra
        </button>
      </form>
    </div>
  );
};

export default UploadObra;
