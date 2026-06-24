import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const ObrasContext = createContext();

export function ObrasProvider({ children }) {
  const [obras, setObras] = useState([]);

  const loadObras = async () => {
    try {
      const response = await api.get("/artworks");
      const list = response.data.artworks || response.data;
      const mapped = (Array.isArray(list) ? list : []).map((o) => ({
        id: o.artwork_id,
        artworkId: o.artwork_id,
        title: o.title,
        description: o.description,
        artworkType: o.artwork_type,
        genre: o.artwork_type && o.artwork_type !== "obra" ? o.artwork_type : "",
        image: Array.isArray(o.images) && o.images.length > 0 ? o.images[0] : "",
        images: typeof o.images === 'string' ? JSON.parse(o.images) : (o.images || []),
        artistName: o.artist_name || "",
        artistEmail: o.artist_email || "",
        creatorId: o.creator_id,
        date: o.publication_date
          ? new Date(o.publication_date).toLocaleDateString()
          : "",
        likes: [],
        comments: [],
      }));
      setObras(mapped);
    } catch (error) {
      console.error("Error loading artworks:", error);
    }
  };

  useEffect(() => {
    loadObras();
  }, []);

  const addObra = async (obra) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userData = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      const userRes = await api.get(`/creators/${userData.userId}`);
      const creatorId = userRes.data.creatorId || userRes.data.creator_id;

      await api.post("/artworks", {
        creatorId,
        title: obra.title,
        description: obra.description,
        artworkType: obra.artworkType || "obra",
        publicationDate: new Date().toISOString(),
        status: "publicada",
        images: obra.image ? [obra.image] : [],
      });
      await loadObras();
    } catch (error) {
      console.error("Error adding artwork:", error);
    }
  };

  const toggleLike = async (obraId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const userData = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      await api.post("/reactions", {
        artworkId: obraId,
        userId: userData.userId,
        reactionType: "like",
        reactionDate: new Date().toISOString(),
      });
      await loadObras();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addComment = async (obraId, comment) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userData = JSON.parse(localStorage.getItem("creativa_user") || "{}");

      await api.post("/comments", {
        userId: userData.userId,
        artworkId: obraId,
        chapterId: 5000,
        contents: comment.text,
      });
      await loadObras();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const fetchComments = async (artworkId) => {
    try {
      const res = await api.get(`/comments/artworks/${artworkId}`);
      return res.data.comments || res.data;
    } catch {
      return [];
    }
  };

  const fetchReactions = async (artworkId) => {
    try {
      const res = await api.get(`/reactions/artworks/${artworkId}`);
      return res.data.reactions || res.data;
    } catch {
      return [];
    }
  };

  return (
    <ObrasContext.Provider value={{ obras, addObra, toggleLike, addComment, loadObras, fetchComments, fetchReactions }}>
      {children}
    </ObrasContext.Provider>
  );
}

export function useObras() {
  const ctx = useContext(ObrasContext);
  if (!ctx) throw new Error("useObras must be used within ObrasProvider");
  return ctx;
}

export default ObrasContext;
