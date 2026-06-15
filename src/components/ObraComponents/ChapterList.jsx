import { useState, useEffect } from "react";
import api from "../../services/api";

const ChapterList = ({ artworkId, images }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  const loadChapters = async () => {
    try {
      const res = await api.get(`/chapters/artworks/${artworkId}`);
      const list = res.data.chapters || res.data;
      setChapters(Array.isArray(list) ? list : []);
    } catch (err) {
      if (err.response?.status === 401) {
        setAuthError(true);
      }
      setChapters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (artworkId) loadChapters();
  }, [artworkId]);

  if (loading) return <p className="text-gray-500 text-sm">Cargando capítulos...</p>;

  return (
    <div className="border-t border-purple-800 pt-4 mt-4">
      <h3 className="text-white font-bold mb-3">
        Capítulos
      </h3>
      {authError ? (
        <p className="text-gray-500 text-sm">Inicia sesión para ver los capítulos.</p>
      ) : chapters.length === 0 ? (
        <p className="text-gray-500 text-sm">Sin capítulos aún.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {chapters.map((ch) => {
            const chImage =
              images && images[(ch.chapterNumber || ch.chapter_number) - 1]
                ? images[(ch.chapterNumber || ch.chapter_number) - 1]
                : null;
            const chNum = ch.chapterNumber || ch.chapter_number;
            return (
              <div
                key={ch.chapterId || ch.chapter_id}
                className="relative aspect-square rounded-lg overflow-hidden border border-purple-700 bg-black/50 group"
              >
                {chImage ? (
                  <img
                    src={chImage}
                    alt={`Cap. ${chNum}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm font-bold">
                    #{chNum}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
                  <p className="text-white text-[10px] font-bold truncate leading-tight">
                    Cap. {chNum}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChapterList;
