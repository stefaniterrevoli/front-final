import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import ChapterList from "./ChapterList";

const HeartOutline = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const HeartSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001Z" />
  </svg>
);

const ObraPopup = ({ obra, onClose, onLike, onComment }) => {
  const [commentText, setCommentText] = useState("");
  const [contextMenu, setContextMenu] = useState(null);

  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!obra?.id) return;
    setLoadingData(true);
    const [cRes, rRes] = await Promise.all([
      api.get(`/comments/artworks/${obra.id}`).catch(() => ({ data: { comments: [] } })),
      api.get(`/reactions/artworks/${obra.id}`).catch(() => ({ data: { reactions: [] } })),
    ]);
    const rawComments = cRes.data.comments || cRes.data;
    setComments(Array.isArray(rawComments) ? rawComments : []);
    const rawReactions = rRes.data.reactions || rRes.data;
    setReactions(Array.isArray(rawReactions) ? rawReactions : []);
    setLoadingData(false);
  }, [obra?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const likes = reactions.filter((r) => r.reactionType === "like");
  const liked = likes.some((r) => r.userId === user?.userId);

  const handleContext = (e, c) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, comment: c });
  };

  const handleReport = async () => {
    if (!contextMenu || !user) return;
    const reason = prompt("Describe el motivo del reporte:");
    if (!reason || !reason.trim()) return;
    try {
      await api.post("/reports", {
        commentId: contextMenu.comment.commentId,
        userId: user.userId,
        reportStatus: "pendiente",
        reason: reason.trim(),
        reportDate: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Error al reportar:", e);
    }
    setContextMenu(null);
    alert("Comentario reportado al administrador.");
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    try {
      await api.post("/comments", {
        userId: user.userId,
        artworkId: obra.id,
        chapterId: 5000,
        contents: commentText.trim(),
      });
      setCommentText("");
      await fetchData();
    } catch (err) {
      console.error("Error al enviar comentario:", err);
    }
  };

  const handleLike = async () => {
    if (!user) return;
    try {
      await api.post("/reactions", {
        artworkId: obra.id,
        userId: user.userId,
        reactionType: "like",
        reactionDate: new Date().toISOString(),
      });
      await fetchData();
    } catch (err) {
      console.error("Error al dar like:", err);
    }
  };

  if (!obra) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-purple-950 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
        >
          ✕
        </button>

        <div className="h-48 sm:h-64 bg-gradient-to-br from-purple-800 to-pink-900 flex items-center justify-center text-6xl sm:text-8xl">
          {obra.image ? (
            <img src={obra.image} alt={obra.title} className="w-full h-full object-cover" />
          ) : (
            <span>🎨</span>
          )}
        </div>

        <div className="p-6">
          <h2 className="font-titulos text-2xl sm:text-3xl text-white mb-2 break-words">{obra.title}</h2>
          <p className="text-pink-400 text-sm mb-4">por {obra.artistName}</p>
          <p className="text-gray-300 mb-6">{obra.description}</p>

          {obra.images?.length > 1 && (
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3">Galería</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {obra.images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`${obra.title} ${i + 1}`}
                    className="h-24 w-24 object-cover border border-purple-700 flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          )}

          <ChapterList artworkId={obra.id} images={obra.images || []} />

          <div className="flex items-center gap-2 mb-6">
            <button onClick={handleLike} className="flex items-center gap-1">
              {liked ? <HeartSolid /> : <span className="text-gray-400 hover:text-pink-500"><HeartOutline /></span>}
            </button>
            <span className="text-gray-400">{likes.length} reacciones</span>
          </div>

          <div className="border-t border-purple-800 pt-4">
            <h3 className="text-white font-bold mb-3">Comentarios</h3>
            {loadingData ? (
              <p className="text-gray-500 text-sm mb-4">Cargando...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">Sin comentarios aún.</p>
            ) : (
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {comments.map((c) => (
                  <div
                    key={c.commentId}
                    onContextMenu={(e) => handleContext(e, c)}
                    className="bg-black/30 p-3 cursor-default"
                  >
                    <p className="text-white font-bold text-sm">{c.userName || `Usuario #${c.userId}`}</p>
                    <p className="text-gray-300 text-sm">{c.content}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {user && (
              <form onSubmit={handleComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="flex-1 p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
                />
                <button type="submit" className="bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 text-sm font-bold transition-colors">
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {contextMenu && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setContextMenu(null)} />
          <div
            className="fixed z-[70] bg-purple-900 border border-purple-600 shadow-xl py-1"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={handleReport}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-800 transition-colors"
            >
              🚩 Reportar comentario
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ObraPopup;