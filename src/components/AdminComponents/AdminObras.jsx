import { useState, useEffect } from "react";
import api from "../../services/api";

const AdminObras = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArtworks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/artworks/admin/all");
      setArtworks(res.data.artworks || []);
    } catch {
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const handleStatus = async (artworkId, status) => {
    try {
      await api.put(`/artworks/admin/${artworkId}`, { status });
      await loadArtworks();
    } catch (e) {
      console.error("Error al actualizar estado de obra:", e);
    }
  };

  const pending = artworks.filter((a) => a.status === "pendiente");
  const resolved = artworks.filter((a) => a.status === "publicada" || a.status === "rechazada");

  if (loading) return <p className="text-gray-400">Cargando obras...</p>;

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">
        Aprobación de Obras
      </h2>

      {pending.length === 0 ? (
        <p className="text-gray-400 mb-8">No hay obras pendientes de revisión.</p>
      ) : (
        <div className="space-y-4 mb-10">
          <h3 className="text-xl text-yellow-400 font-bold">
            Pendientes ({pending.length})
          </h3>
          {pending.map((o) => (
            <div
              key={o.artwork_id}
              className="bg-purple-950 p-4 border border-purple-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">{o.title}</p>
                  <p className="text-gray-400 text-sm">
                    {o.artist_name || o.user_name} |{" "}
                    {o.publication_date
                      ? new Date(o.publication_date).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatus(o.artwork_id, "publicada")}
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 text-lg transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleStatus(o.artwork_id, "rechazada")}
                    className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 text-lg transition-colors"
                  >
                    ✗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl text-gray-400 font-bold">
            Historial ({resolved.length})
          </h3>
          {resolved.map((o) => (
            <div
              key={o.artwork_id}
              className="bg-purple-950/50 p-3 border border-purple-800/50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold">{o.title}</p>
                  <p className="text-gray-500 text-sm">{o.artist_name || o.user_name}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 ${
                    o.status === "publicada"
                      ? "bg-green-800 text-green-300"
                      : "bg-red-800 text-red-300"
                  }`}
                >
                  {o.status === "publicada" ? "Aprobada" : "Rechazada"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminObras;
