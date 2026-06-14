import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const ObrasContext = createContext();

export function ObrasProvider({ children }) {
  const [obras, setObras] = useState([]);

  const loadObras = async () => {
    try {
      const response = await api.get("/artworks");
      const mapped = response.data.map((o) => ({
        id: o.artwork_id,
        artworkId: o.artwork_id,
        title: o.title,
        description: o.description,
        image: o.image_url ? `http://localhost:3000${o.image_url}` : "",
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
      const creatorId = userRes.data.creatorId;

      await api.post("/artworks", {
        creatorId,
        title: obra.title,
        description: obra.description,
        artworkType: obra.artworkType || "obra",
        imageUrl: obra.image || null,
      });
      await loadObras();
    } catch (error) {
      console.error("Error adding artwork:", error);
    }
  };

  const toggleLike = async (obraId, userId) => {
    console.log("Like toggled - backend pending implementation");
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

  return (
    <ObrasContext.Provider value={{ obras, addObra, toggleLike, addComment, loadObras }}>
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
