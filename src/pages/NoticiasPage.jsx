import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STORAGE_KEY = "creativa_admin_data";

function loadNoticias() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return data.noticias || [];
  } catch {
    return [];
  }
}

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState(loadNoticias);
  const [popupNews, setPopupNews] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openNews) {
      setPopupNews(location.state.openNews);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  useEffect(() => {
    const handler = () => setNoticias(loadNoticias());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  if (noticias.length === 0) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center font-textos">
        <p className="text-gray-500 text-xl">No hay noticias aún</p>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-black text-white py-12 px-4 md:px-8 font-textos">
        <h2 className="font-titulos text-4xl md:text-5xl text-center mb-12">
          Noticias
        </h2>
        <div className="max-w-4xl mx-auto space-y-10">
          {noticias.map((n) => (
            <article
              key={n.id}
              className="bg-purple-950/40 rounded-2xl border border-purple-800 overflow-hidden"
            >
              {n.image && (
                <div className="w-full h-64 md:h-80 overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 md:p-8 space-y-4">
                <h3 className="font-titulos text-2xl md:text-3xl text-white">
                  {n.title}
                </h3>
                <p className="text-gray-500 text-sm">{n.date}</p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {n.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {popupNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setPopupNews(null)} />
          <div className="relative bg-purple-950 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-700 shadow-2xl">
            <button
              onClick={() => setPopupNews(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
            >
              ✕
            </button>

            {popupNews.image && (
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={popupNews.image}
                  alt={popupNews.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <h2 className="font-titulos text-2xl sm:text-3xl text-white mb-2 break-words">
                {popupNews.title}
              </h2>
              {popupNews.date && (
                <p className="text-gray-500 text-sm mb-4">{popupNews.date}</p>
              )}
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {popupNews.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticiasPage;
