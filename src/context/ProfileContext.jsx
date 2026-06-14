import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

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

  const updateAvatar = (dataUrl) => {
    setAvatar(dataUrl);
    try {
      const stored = JSON.parse(localStorage.getItem("creativa_user") || "{}");
      stored.avatar = dataUrl;
      localStorage.setItem("creativa_user", JSON.stringify(stored));

      const users = JSON.parse(localStorage.getItem("creativa_users") || "[]");
      const idx = users.findIndex((u) => u.email === stored.email);
      if (idx !== -1) {
        users[idx].avatar = dataUrl;
        localStorage.setItem("creativa_users", JSON.stringify(users));
      }
    } catch {}
  };

  const name = user?.name || "Usuario";
  const username = user?.email?.split("@")[0] || "usuario";
  const bio = "Creador de contenido en creAtiva.";
  const stats = { obras: 0, seguidores: 0, siguiendo: 0 };
  const subs = [];
  const donations = [];
  const content = [];

  return (
    <ProfileContext.Provider
      value={{ name, username, avatar, bio, stats, subs, donations, content, updateAvatar }}
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
