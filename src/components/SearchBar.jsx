import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const toStr = (v) => (v || "").toString().toLowerCase();

function searchAll(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  const results = [];

  try {
    const admin = JSON.parse(localStorage.getItem("creativa_admin_data") || "{}");
    (admin.eventos || []).forEach((e) => {
      if (toStr(e.title).includes(q) || toStr(e.description).includes(q) || toStr(e.location).includes(q))
        results.push({ ...e, _type: "Evento", _route: "/eventos" });
    });
    (admin.noticias || []).forEach((n) => {
      if (toStr(n.title).includes(q) || toStr(n.content).includes(q))
        results.push({ ...n, _type: "Noticia", _route: "/noticias" });
    });
  } catch {}

  try {
    const obras = JSON.parse(localStorage.getItem("creativa_obras") || "[]");
    obras.forEach((o) => {
      if (toStr(o.title).includes(q) || toStr(o.artistName).includes(q) || toStr(o.description).includes(q))
        results.push({ ...o, _type: "Obra", _route: "/obras" });
    });
  } catch {}

  try {
    const users = JSON.parse(localStorage.getItem("creativa_users") || "[]");
    users.forEach((u) => {
      if (toStr(u.name).includes(q) || toStr(u.email).includes(q))
        results.push({ name: u.name, email: u.email, avatar: u.avatar, _type: "Creador", _route: "/creadores" });
    });
  } catch {}

  return results.slice(0, 8);
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    const res = searchAll(v);
    setResults(res);
    setOpen(v.trim().length > 0);
  };

  const handleSelect = (item) => {
    setQuery("");
    setOpen(false);
    navigate(item._route);
  };

  const typeColors = {
    Evento: "text-amber-400",
    Noticia: "text-green-400",
    Obra: "text-pink-400",
    Creador: "text-blue-400",
  };

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      <div className="flex items-center bg-black border border-purple-700 rounded-lg px-3 py-2 focus-within:border-pink-700 transition-colors">
        <HiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar..."
          className="bg-transparent text-white text-sm w-full focus:outline-none"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-purple-950 border border-purple-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
          {results.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-purple-800 transition-colors border-b border-purple-800 last:border-0"
            >
              <p className="text-white font-bold text-sm truncate">
                {item.title || item.name}
              </p>
              <p className={`text-xs ${typeColors[item._type] || "text-gray-400"}`}>
                {item._type}
                {item.artistName && ` · ${item.artistName}`}
                {item.location && ` · ${item.location}`}
              </p>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-purple-950 border border-purple-700 rounded-xl shadow-2xl z-50 p-4 text-center text-gray-400 text-sm">
          Sin resultados para "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
