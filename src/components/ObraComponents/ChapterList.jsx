import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import BuyChapterPopup from "./BuyChapterPopup";

const PURCHASED_KEY = "purchased_chapters";
const SALES_KEY = "chapter_sales";

const getPurchased = () => {
  try {
    return JSON.parse(localStorage.getItem(PURCHASED_KEY) || "{}");
  } catch {
    return {};
  }
};

const markPurchased = (artworkId, chapterNum) => {
  const data = getPurchased();
  if (!data[artworkId]) data[artworkId] = [];
  if (!data[artworkId].includes(chapterNum)) data[artworkId].push(chapterNum);
  localStorage.setItem(PURCHASED_KEY, JSON.stringify(data));
};

const isPurchased = (artworkId, chapterNum) => {
  const data = getPurchased();
  return data[artworkId]?.includes(chapterNum) || false;
};

const recordSale = (artworkId, artworkTitle, chapterNum, chapterTitle, buyer) => {
  try {
    const sales = JSON.parse(localStorage.getItem(SALES_KEY) || "[]");
    sales.push({
      artworkId,
      artworkTitle,
      chapterNum,
      chapterTitle: chapterTitle || `Capítulo ${chapterNum}`,
      buyerName: buyer?.name || buyer?.email || "Anónimo",
      buyerEmail: buyer?.email || "",
      amount: 2000,
      date: new Date().toISOString(),
    });
    localStorage.setItem(SALES_KEY, JSON.stringify(sales));
  } catch {}
};

const ChapterList = ({ artworkId, artworkTitle, images }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [buyTarget, setBuyTarget] = useState(null);

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

  const { user } = useAuth();

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
            const isFree = chNum === 1;
            const unlocked = isFree || isPurchased(artworkId, chNum);
            return (
              <div
                key={ch.chapterId || ch.chapter_id}
                className={`relative aspect-square rounded-lg overflow-hidden border bg-black/50 group ${
                  unlocked ? "border-purple-700" : "border-gray-700 cursor-pointer"
                }`}
                onClick={() => {
                  if (!unlocked) setBuyTarget(ch);
                }}
              >
                {chImage ? (
                  <img
                    src={chImage}
                    alt={`Cap. ${chNum}`}
                    className={`w-full h-full object-cover ${!unlocked ? "blur-sm" : ""}`}
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-sm font-bold ${unlocked ? "text-gray-600" : "text-gray-700"}`}>
                    #{chNum}
                  </div>
                )}
                {!unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
                  <p className="text-white text-[10px] font-bold truncate leading-tight">
                    Cap. {chNum} {isFree ? "· Gratis" : !unlocked ? "· $2.000" : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {buyTarget && (
        <BuyChapterPopup
          chapterTitle={`Capítulo ${buyTarget.chapterNumber || buyTarget.chapter_number}${buyTarget.title ? ` - ${buyTarget.title}` : ""}`}
          onClose={() => setBuyTarget(null)}
          onBuy={() => {
            const chNum = buyTarget.chapterNumber || buyTarget.chapter_number;
            markPurchased(artworkId, chNum);
            recordSale(artworkId, artworkTitle, chNum, buyTarget.title || "", user);
            setBuyTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default ChapterList;
