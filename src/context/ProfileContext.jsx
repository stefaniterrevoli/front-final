import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();

  const [avatar, setAvatar] = useState(() => {
    try {
      const stored = localStorage.getItem("creativa_user");
      if (stored) {
        const u = JSON.parse(stored);
        return u.avatar || null;
      }
    } catch {}
    return null;
  });

  const [profileName, setProfileName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [creatorId, setCreatorId] = useState(null);
  const [userArtworks, setUserArtworks] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [donations, setDonations] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [chapterSales, setChapterSales] = useState([]);

  const fetchProfile = useCallback(async () => {
    if (!user?.userId) return;
    try {
      const userRes = await api.get(`/users/${user.userId}`);
      const u = userRes.data;
      setProfileName(u.name || "");
      setProfileUsername(u.email?.split("@")[0] || "");
      if (u.imageUrl) setAvatar(u.imageUrl);

      try {
        const cRes = await api.get(`/creators/${user.userId}`);
        const c = cRes.data;
        setIsCreator(true);
        setProfileBio(c.biography || "");
        setProfileUsername(c.artisticName || u.email?.split("@")[0] || "");
        const cId = c.creatorId || c.creator_id;
        setCreatorId(cId);

        if (cId) {
          const [artRes, folRes, donRes] = await Promise.all([
            api.get(`/artworks/creator/${cId}`).catch(() => ({ data: { artworks: [] } })),
            api.get(`/followers/creator/${cId}`).catch(() => ({ data: { followers: [] } })),
            api.get(`/donations/creator/${cId}`).catch(() => ({ data: { donations: [] } })),
          ]);

          const artworks = Array.isArray(artRes.data.artworks || artRes.data) ? (artRes.data.artworks || artRes.data) : [];
          setUserArtworks(artworks);
          setFollowers(Array.isArray(folRes.data.followers) ? folRes.data.followers : []);
          setDonations(Array.isArray(donRes.data.donations) ? donRes.data.donations : []);

          const reactionRes = await Promise.all(
            artworks.map((a) =>
              api.get(`/reactions/artworks/${a.artworkId || a.artwork_id}`).catch(() => ({ data: { reactions: [] } }))
            )
          );
          const total = reactionRes.reduce((sum, r) => {
            const list = r.data.reactions || r.data;
            const likes = Array.isArray(list) ? list.filter((re) => re.reactionType === "like").length : 0;
            return sum + likes;
          }, 0);
          setTotalLikes(total);
        }
      } catch {
        setIsCreator(false);
        setCreatorId(null);
        setUserArtworks([]);
        setFollowers([]);
        setDonations([]);
      }

      const sales = JSON.parse(localStorage.getItem("chapter_sales") || "[]");
      setChapterSales(sales);

      try {
        const folRes = await api.get(`/followers/user/${user.userId}`);
        setFollowing(Array.isArray(folRes.data.following) ? folRes.data.following : []);
      } catch {
        setFollowing([]);
      }
    } catch {}
  }, [user?.userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateAvatar = async (dataUrl) => {
    setAvatar(dataUrl);
    try {
      await api.put(`/users/${user.userId}`, { imageUrl: dataUrl });
      const stored = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      stored.avatar = dataUrl;
      localStorage.setItem("creativa_user", JSON.stringify(stored));
    } catch {}
  };

  const updateProfile = async (fields) => {
    if (fields.name !== undefined) setProfileName(fields.name);
    if (fields.username !== undefined) setProfileUsername(fields.username);
    if (fields.bio !== undefined) setProfileBio(fields.bio);

    try {
      const session = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      if (fields.name !== undefined) session.name = fields.name;
      if (fields.username !== undefined) session.username = fields.username;
      if (fields.bio !== undefined) session.bio = fields.bio;
      localStorage.setItem("creativa_user", JSON.stringify(session));

      if (user?.userId) {
        try {
          await api.put(`/creators/${user.userId}`, {
            artisticName: fields.username || profileUsername,
            biography: fields.bio || profileBio,
            socialMedia: "",
          });
        } catch {
          if (fields.username) {
            await api.post("/creators", {
              userId: user.userId,
              artisticName: fields.username,
              biography: fields.bio || "",
              socialMedia: "",
            });
          }
        }
        fetchProfile();
      }
    } catch {}
  };

  const createCreatorProfile = async (artisticName, biography, socialMedia) => {
    try {
      await api.post("/creators", {
        userId: user.userId,
        artisticName,
        biography: biography || "",
        socialMedia: socialMedia || "",
      });
      await fetchProfile();
    } catch (error) {
      console.error("Error creating creator profile:", error);
      throw error;
    }
  };

  const addArtwork = async (artworkData) => {
    try {
      let cId = creatorId;
      if (!cId) {
        const cRes = await api.get(`/creators/${user.userId}`);
        cId = cRes.data.creatorId || cRes.data.creator_id;
        setCreatorId(cId);
      }

      const images = (artworkData.chapters || []).map((ch) => ch.imageUrl);
      const pubDate = new Date().toISOString();

      const artRes = await api.post("/artworks", {
        creatorId: cId,
        title: artworkData.title,
        description: artworkData.description,
        artworkType: artworkData.genre || "obra",
        publicationDate: pubDate,
        status: "pendiente",
        images,
      });

      const newArtworkId = artRes.data.artworkId;

      for (let i = 0; i < (artworkData.chapters || []).length; i++) {
        const ch = artworkData.chapters[i];
        await api.post("/chapters", {
          artworkId: newArtworkId,
          chapterNumber: i + 1,
          title: ch.title || `Capítulo ${i + 1}`,
          publicationDate: pubDate,
          isPaid: false,
          price: 0,
        });
      }

      await fetchProfile();
    } catch (error) {
      console.error("Error adding artwork:", error);
    }
  };

  const updateArtwork = async (artworkId, artworkData) => {
    try {
      const images = (artworkData.chapters || []).map((ch) => ch.imageUrl);
      const pubDate = new Date().toISOString();

      const currentStatus = artworkData.status || "publicada";
      await api.put(`/artworks/${artworkId}`, {
        title: artworkData.title,
        description: artworkData.description,
        artworkType: artworkData.genre || "obra",
        publicationDate: pubDate,
        status: currentStatus,
        images,
      });

      const chaptersRes = await api.get(`/chapters/artworks/${artworkId}`).catch(() => ({ data: { chapters: [] } }));
      const existingChapters = chaptersRes.data.chapters || [];
      for (const ch of existingChapters) {
        await api.delete(`/chapters/${ch.chapterId || ch.chapter_id}`).catch(() => {});
      }

      for (let i = 0; i < (artworkData.chapters || []).length; i++) {
        const ch = artworkData.chapters[i];
        await api.post("/chapters", {
          artworkId,
          chapterNumber: i + 1,
          title: ch.title || `Capítulo ${i + 1}`,
          publicationDate: pubDate,
          isPaid: false,
          price: 0,
        });
      }

      await fetchProfile();
    } catch (error) {
      console.error("Error updating artwork:", error);
    }
  };

  const value = useMemo(() => ({
    isCreator,
    name: profileName || user?.name || "Usuario",
    username: profileUsername || user?.email?.split("@")[0] || "usuario",
    avatar,
    bio: profileBio || "",
    obras: userArtworks,
    followers,
    following,
    donations,
    totalLikes,
    chapterSales,
    updateAvatar,
    updateProfile,
    createCreatorProfile,
    addArtwork,
    updateArtwork,
    reloadProfile: fetchProfile,
  }), [isCreator, profileName, profileUsername, avatar, profileBio, user, userArtworks, followers, following, donations, totalLikes, chapterSales, creatorId, fetchProfile]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};

export default ProfileContext;
