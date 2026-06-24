import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import api from "../services/api";

const toStr = (v) => (v || "").toString().toLowerCase();

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [cached, setCached] = useState({ creators: [], artworks: [] });
  const loaded = useRef(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const fetchData = async () => {
      try {
        const [cr, aw] = await Promise.all([
          api.get("/creators"),
          api.get("/artworks"),
        ]);
        setCached({
          creators: cr.data.creators || [],
          artworks: aw.data.artworks || [],
        });
      } catch {}
    };
    fetchData();
  }, []);

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
    if (!v.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = v.toLowerCase();

    const groups = { Evento: [], Noticia: [], Obra: [], Creador: [] };

    try {
      const admin = JSON.parse(localStorage.getItem("creativa_admin_data") || "{}");
      (admin.eventos || []).forEach((ev) => {
        if (toStr(ev.title).includes(q) || toStr(ev.description).includes(q) || toStr(ev.location).includes(q))
          groups.Evento.push({ ...ev, _type: "Evento", _route: "/eventos", _sortKey: toStr(ev.title) });
      });
      (admin.noticias || []).forEach((n) => {
        if (toStr(n.title).includes(q) || toStr(n.content).includes(q))
          groups.Noticia.push({ ...n, _type: "Noticia", _route: "/noticias", _sortKey: toStr(n.title) });
      });
    } catch {}

    cached.artworks.forEach((o) => {
      if (toStr(o.title).includes(q) || toStr(o.artist_name || o.artisticName || o.artistName).includes(q) || toStr(o.description).includes(q))
        groups.Obra.push({ ...o, _type: "Obra", _route: "/obras", _sortKey: toStr(o.title) });
    });

    cached.creators.forEach((c) => {
      const name = c.artistic_name || c.artisticName || c.name;
      if (toStr(name).includes(q) || toStr(c.email).includes(q))
        groups.Creador.push({
          name,
          email: c.email,
          avatar: c.image_url || null,
          artisticName: name,
          _type: "Creador",
          _route: "/creadores",
          _sortKey: toStr(name),
        });
    });

    // Sort alphabetically within each group
    Object.values(groups).forEach((arr) => arr.sort((a, b) => a._sortKey.localeCompare(b._sortKey)));

    // Flatten with headers, max 8 results
    const flat = [];
    const order = ["Evento", "Noticia", "Obra", "Creador"];
    for (const cat of order) {
      if (groups[cat].length > 0) {
        flat.push({ _type: "_header", label: cat });
        for (const item of groups[cat]) {
          flat.push(item);
          if (flat.length >= 9) break; // 1 header + 8 items max
        }
        if (flat.length >= 9) break;
      }
    }

    setResults(flat.slice(0, 9));
    setOpen(true);
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
          {results.map((item, i) =>
            item._type === "_header" ? (
              <div
                key={`header-${i}`}
                className="px-4 pt-3 pb-1 text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                {item.label === "Evento" && "📅"} {item.label === "Noticia" && "📰"} {item.label === "Obra" && "🎨"} {item.label === "Creador" && "👤"} {item.label}
              </div>
            ) : (
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
                  {item.artist_name && ` · ${item.artist_name}`}
                  {item.location && ` · ${item.location}`}
                </p>
              </button>
            )
          )}
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
