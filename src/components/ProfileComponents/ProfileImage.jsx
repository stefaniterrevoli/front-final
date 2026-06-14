import { useRef } from "react";

const ProfileImage = ({ name, avatar, onAvatarChange }) => {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      alert("Máximo 500KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onAvatarChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  if (avatar) {
    return (
      <div className="relative group">
        <img
          src={avatar}
          alt={name}
          className="w-28 h-28 rounded-full object-cover border-2 border-pink-700 shadow-lg cursor-pointer"
          onClick={() => inputRef.current?.click()}
        />
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-pink-700 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Cambiar
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div
        className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-700 to-purple-700 flex items-center justify-center text-5xl font-bold text-white shadow-lg cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        {name?.charAt(0)?.toUpperCase() || "?"}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-0 right-0 bg-pink-700 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        +
      </button>
    </div>
  );
};

export default ProfileImage;
