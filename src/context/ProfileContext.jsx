import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";

const STORAGE_KEY = "creativa_users";
const SESSION_KEY = "creativa_user";
const SUBS_KEY = "creativa_subs";
const DONS_KEY = "creativa_donations";

function loadJSON(key, fallback = []) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();

  const [avatar, setAvatar] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
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

  useEffect(() => {
    if (!user?.userId) return;
    const fetchProfile = async () => {
      try {
        const userRes = await api.get(`/users/${user.userId}`);
        const u = userRes.data;
        setProfileName(u.name || "");
        setProfileUsername(u.email?.split("@")[0] || "");

        try {
          const cRes = await api.get(`/creators/${user.userId}`);
          setProfileBio(cRes.data.biography || "");
          setProfileUsername(cRes.data.artisticName || u.email?.split("@")[0] || "");
        } catch {}
      } catch {}
    };
    fetchProfile();
  }, [user?.userId]);

  const updateAvatar = (dataUrl) => {
    setAvatar(dataUrl);
    try {
      const stored = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
      stored.avatar = dataUrl;
      localStorage.setItem(SESSION_KEY, JSON.stringify(stored));

      const users = loadJSON(STORAGE_KEY);
      const idx = users.findIndex((u) => u.email === stored.email);
      if (idx !== -1) {
        users[idx].avatar = dataUrl;
        saveJSON(STORAGE_KEY, users);
      }
    } catch {}
  };

  const updateProfile = async (fields) => {
    if (fields.name !== undefined) setProfileName(fields.name);
    if (fields.username !== undefined) setProfileUsername(fields.username);
    if (fields.bio !== undefined) setProfileBio(fields.bio);

    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
      if (fields.name !== undefined) session.name = fields.name;
      if (fields.username !== undefined) session.username = fields.username;
      if (fields.bio !== undefined) session.bio = fields.bio;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));

      if (user?.userId) {
        try {
          await api.put(`/creators/${user.userId}`, {
            artisticName: fields.username || profileUsername,
            biography: fields.bio || profileBio,
            socialMedia: "",
          });
        } catch {
          await api.post("/creators", {
            userId: user.userId,
            artisticName: fields.username || profileUsername,
            biography: fields.bio || profileBio,
            socialMedia: "",
          });
        }
      }
    } catch {}
  };

  const profileData = useMemo(() => {
    const obras = loadJSON("creativa_obras", []).filter(
      (o) => o.artistEmail === user?.email
    );
    const subs = loadJSON(SUBS_KEY).filter((s) => s.creatorId === user?.id);
    const donations = loadJSON(DONS_KEY).filter(
      (d) => d.creatorId === user?.id
    );
    const allSubs = loadJSON(SUBS_KEY);
    const subscriberCount = allSubs.filter(
      (s) => String(s.creatorId) === String(user?.id)
    ).length;

    const content = obras.map((o) => ({
      id: o.id,
      title: o.title,
      image: o.image,
      date: o.date,
      type: "image",
    }));

    const stats = {
      obras: obras.length,
      seguidores: subscriberCount,
      siguiendo: 0,
    };

    return { stats, subs, donations, content, obras };
  }, [user?.email, user?.id]);

  const name = profileName || user?.name || "Usuario";
  const username = profileUsername || user?.email?.split("@")[0] || "usuario";
  const bio = profileBio || "";

  return (
    <ProfileContext.Provider
      value={{
        name,
        username,
        avatar,
        bio,
        stats: profileData.stats,
        subs: profileData.subs,
        donations: profileData.donations,
        content: profileData.content,
        updateAvatar,
        updateProfile,
      }}
    >
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
