import { useState } from "react";

const ProfileImage = ({ name, avatar, onAvatarChange }) => {
  const [urlInput, setUrlInput] = useState("");

  const handleUrl = () => {
    if (!urlInput.trim()) return;
    onAvatarChange(urlInput.trim());
    setUrlInput("");
  };

  if (avatar) {
    return (
      <div className="relative group">
        <img
          src={avatar}
          alt={name}
          className="w-28 h-28 rounded-full object-cover border-2 border-pink-700 shadow-lg"
        />
        <div className="mt-2 flex gap-1">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="URL de nueva imagen"
            className="w-full p-1 rounded bg-black text-white text-xs border border-purple-700 focus:outline-none focus:border-pink-700"
          />
          <button
            onClick={handleUrl}
            className="bg-pink-700 hover:bg-pink-800 text-white text-xs px-2 py-1 rounded transition-colors"
          >
            Cambiar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-700 to-purple-700 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
        {name?.charAt(0)?.toUpperCase() || "?"}
      </div>
      <div className="mt-2 flex gap-1">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="URL de avatar"
          className="w-full p-1 rounded bg-black text-white text-xs border border-purple-700 focus:outline-none focus:border-pink-700"
        />
        <button
          onClick={handleUrl}
          className="bg-pink-700 hover:bg-pink-800 text-white text-xs px-2 py-1 rounded transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
