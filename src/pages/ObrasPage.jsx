import { useState, useMemo } from "react";
import { ObrasProvider, useObras } from "../context/ObrasContext";
import { useAuth } from "../context/AuthContext";
import ObraCard from "../components/ObraComponents/ObraCard";
import ObraPopup from "../components/ObraComponents/ObraPopup";

const GENRES = ["Romance", "Aventura", "Acción", "Fantasía", "Paranormal", "Ciencia Ficción", "Drama", "Comedia", "Terror", "Poesía", "Otro"];

const ObrasContent = () => {
  const [selectedObra, setSelectedObra] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { obras, toggleLike } = useObras();
  const { user } = useAuth();

  const filteredObras = useMemo(() => {
    if (!selectedGenre) return obras;
    return obras.filter((o) => o.genre === selectedGenre);
  }, [obras, selectedGenre]);

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-titulos text-3xl sm:text-5xl">Obras</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
              !selectedGenre
                ? "bg-pink-700 text-white"
                : "bg-purple-900 text-gray-300 hover:bg-purple-800"
            }`}
          >
            Todas
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                selectedGenre === g
                  ? "bg-pink-700 text-white"
                  : "bg-purple-900 text-gray-300 hover:bg-purple-800"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {filteredObras.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay obras{selectedGenre ? ` de ${selectedGenre}` : ""} aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredObras.map((obra) => (
              <ObraCard
                key={obra.id}
                obra={obra}
                onClick={setSelectedObra}
                onLike={toggleLike}
                currentUser={user?.email}
              />
            ))}
          </div>
        )}

        {selectedObra && (
          <ObraPopup
            obra={selectedObra}
            onClose={() => setSelectedObra(null)}
          />
        )}
      </div>
    </section>
  );
};

const ObrasPage = () => (
  <ObrasProvider>
    <ObrasContent />
  </ObrasProvider>
);

export default ObrasPage;
