import { useState } from "react";
import ProfileImage from "./ProfileImage";

const ProfileHeader = ({ name, username, bio, avatar, onAvatarChange, onUpdateProfile }) => {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name, username, bio });

  const handleEdit = (field) => {
    setForm({ name, username, bio });
    setEditing(field);
  };

  const handleSave = () => {
    onUpdateProfile(form);
    setEditing(null);
  };

  const handleCancel = () => {
    setForm({ name, username, bio });
    setEditing(null);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
      <ProfileImage name={name} avatar={avatar} onAvatarChange={onAvatarChange} />
      <div className="text-center md:text-left flex-1">
        {editing === "name" ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-black text-white text-3xl font-titulos border border-pink-700 rounded px-2 py-1 w-full max-w-xs"
              autoFocus
            />
            <button onClick={handleSave} className="text-green-500 hover:text-green-400 text-xl">✓</button>
            <button onClick={handleCancel} className="text-red-500 hover:text-red-400 text-xl">✕</button>
          </div>
        ) : (
          <h1
            className="font-titulos text-4xl text-white cursor-pointer hover:text-pink-700 transition-colors inline"
            onClick={() => handleEdit("name")}
          >
            {name} <span className="text-sm text-gray-500 ml-1">✎</span>
          </h1>
        )}

        {editing === "username" ? (
          <div className="flex gap-2 items-center mt-1">
            <span className="text-purple-400">@</span>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="bg-black text-purple-400 border border-pink-700 rounded px-2 py-1 w-full max-w-xs"
              autoFocus
            />
            <button onClick={handleSave} className="text-green-500 hover:text-green-400">✓</button>
            <button onClick={handleCancel} className="text-red-500 hover:text-red-400">✕</button>
          </div>
        ) : (
          <p
            className="text-purple-400 text-lg cursor-pointer hover:text-pink-700 transition-colors"
            onClick={() => handleEdit("username")}
          >
            @{username} <span className="text-sm text-gray-500">✎</span>
          </p>
        )}

        {editing === "bio" ? (
          <div className="flex gap-2 items-start mt-2">
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="bg-black text-gray-400 border border-pink-700 rounded px-2 py-1 w-full max-w-md resize-none"
              rows={3}
              autoFocus
            />
            <div className="flex gap-1 mt-1">
              <button onClick={handleSave} className="text-green-500 hover:text-green-400">✓</button>
              <button onClick={handleCancel} className="text-red-500 hover:text-red-400">✕</button>
            </div>
          </div>
        ) : (
          <p
            className="text-gray-400 mt-2 max-w-md cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => handleEdit("bio")}
          >
            {bio || "Añadir biografía..."} <span className="text-sm text-gray-600">✎</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
