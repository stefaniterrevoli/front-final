import { useState } from "react";
import { ObrasProvider, useObras } from "../context/ObrasContext";
import { useAuth } from "../context/AuthContext";
import ObraCard from "../components/ObraComponents/ObraCard";
import ObraPopup from "../components/ObraComponents/ObraPopup";

const ObrasContent = () => {
  const [selectedObra, setSelectedObra] = useState(null);
  const { obras, toggleLike } = useObras();
  const { user } = useAuth();

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-titulos text-3xl sm:text-5xl">Obras</h1>
        </div>

        {obras.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay obras aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {obras.map((obra) => (
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
