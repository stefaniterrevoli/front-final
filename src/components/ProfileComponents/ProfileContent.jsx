import { useState } from "react";
import { useObras } from "../../context/ObrasContext";
import { useAuth } from "../../context/AuthContext";

const ProfileContent = ({ content }) => {
  const [showUpload, setShowUpload] = useState(false);
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
    setTitle("");
    setDescription("");
    setImageUrl("");
    setShowUpload(false);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-titulos text-2xl text-white">Contenido</h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-pink-700 hover:bg-pink-800 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Subir imagen
        </button>
      </div>

      {showUpload && (
        <form
          onSubmit={handleSubmit}
          className="bg-purple-950 rounded-xl p-6 border border-purple-700 mb-6"
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
            <label className="block text-white mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
            />
          </div>
          <div className="mb-4">
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
                <img src={imageUrl} alt="preview" className="h-28 rounded-lg object-cover" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Publicar
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center py-8">
            Aún no has subido contenido.
          </p>
        ) : (
          content.map((item) => (
            <div
              key={item.id}
              className="bg-purple-950 rounded-xl overflow-hidden border border-purple-800 hover:border-pink-700 transition-colors"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center text-4xl">
                  🖼
                </div>
              )}
              <div className="p-4">
                <p className="text-white font-bold">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProfileContent;
