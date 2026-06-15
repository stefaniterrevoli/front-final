import { useState } from "react";

const MAX_NAME = 250;
const MAX_BIO = 500;
const MAX_SOCIAL = 50;

const BecomeCreatorModal = ({ onClose, onSubmit }) => {
  const [artisticName, setArtisticName] = useState("");
  const [biography, setBiography] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const overLimit = artisticName.length > MAX_NAME || biography.length > MAX_BIO || socialMedia.length > MAX_SOCIAL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artisticName.trim()) {
      setError("El nombre artístico es obligatorio");
      return;
    }
    if (overLimit) {
      setError("Uno o más campos superan el límite de caracteres");
      return;
    }
    setLoading(true);
    try {
      await onSubmit(artisticName.trim(), biography.trim(), socialMedia.trim());
      onClose();
    } catch {
      setError("Error al crear perfil. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
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

        <h2 className="font-titulos text-3xl text-white mb-6">
          ¡Conviértete en Creador!
        </h2>

        {error && (
          <p className="bg-red-600 text-white p-3 rounded mb-4 text-sm">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-white mb-1">
            Nombre artístico <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={artisticName}
            onChange={(e) => setArtisticName(e.target.value)}
            maxLength={MAX_NAME + 20}
            placeholder="Ej: StefiDraw"
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
          <p className={`text-xs mt-1 ${artisticName.length > MAX_NAME ? 'text-red-400' : 'text-gray-500'}`}>
            {artisticName.length}/{MAX_NAME}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Redes sociales (opcional)</label>
          <input
            type="text"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            maxLength={MAX_SOCIAL + 10}
            placeholder="Ej: @stefidraw"
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
          <p className={`text-xs mt-1 ${socialMedia.length > MAX_SOCIAL ? 'text-red-400' : 'text-gray-500'}`}>
            {socialMedia.length}/{MAX_SOCIAL}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">Biografía (opcional)</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            maxLength={MAX_BIO + 50}
            placeholder="Cuéntanos sobre ti..."
            rows={4}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
          />
          <p className={`text-xs mt-1 ${biography.length > MAX_BIO ? 'text-red-400' : 'text-gray-500'}`}>
            {biography.length}/{MAX_BIO}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-700 hover:bg-pink-800 disabled:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          {loading ? "Creando..." : "Ser Creador"}
        </button>
      </form>
    </div>
  );
};

export default BecomeCreatorModal;
