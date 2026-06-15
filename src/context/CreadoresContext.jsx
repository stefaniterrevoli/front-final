import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const CreadoresContext = createContext();

export function CreadoresProvider({ children }) {
  const [creators, setCreators] = useState([]);

  const loadCreators = async () => {
    try {
      const response = await api.get("/creators");
      const list = response.data.creators || response.data;
      const creatorsList = (Array.isArray(list) ? list : []).map((c) => ({
        creatorId: c.creator_id || c.creatorId,
        userId: c.user_id || c.userId,
        name: c.artistic_name || c.artisticName,
        email: c.email || "",
        avatar: c.image_url || null,
        artisticName: c.artistic_name || c.artisticName,
        biography: c.biography || "",
        socialMedia: c.social_media || c.socialMedia || "",
        totalFollowers: c.total_followers || c.totalFollowers || 0,
      }));
      setCreators(creatorsList);
    } catch (error) {
      console.error("Error loading creators:", error);
    }
  };

  useEffect(() => {
    loadCreators();
  }, []);

  const isSubscribed = async (userId, creatorId) => {
    try {
      const res = await api.get(`/followers/check?userId=${userId}&creatorId=${creatorId}`);
      return res.data.following;
    } catch {
      return false;
    }
  };

  const subscribe = async (userId, creatorId) => {
    try {
      await api.post("/followers", { userId, creatorId });
      loadCreators();
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const unsubscribe = async (userId, creatorId) => {
    try {
      await api.delete(`/followers/${creatorId}`);
      loadCreators();
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  const donate = async (donorUserId, creatorId, amount, message) => {
    try {
      await api.post("/donations", { donorUserId, creatorId, amount, message });
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  const subscriberCount = (creatorId) => {
    const c = creators.find((cr) => cr.creatorId === creatorId);
    return c?.totalFollowers || 0;
  };

  return (
    <CreadoresContext.Provider
      value={{ creators, isSubscribed, subscribe, unsubscribe, donate, subscriberCount, loadCreators }}
    >
      {children}
    </CreadoresContext.Provider>
  );
}

export function useCreadores() {
  const ctx = useContext(CreadoresContext);
  if (!ctx) throw new Error("useCreadores must be used within CreadoresProvider");
  return ctx;
}

export default CreadoresContext;
