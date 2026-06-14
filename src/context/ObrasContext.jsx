import { createContext, useContext, useState } from "react";

const ObrasContext = createContext();
const STORAGE_KEY = "creativa_obras";

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const defaultObras = [
  {
    id: 1,
    title: "Atardecer digital",
    description:
      "Una obra que captura la calidez del atardecer en un estilo digital vibrante.",
    image: "",
    artistName: "María G.",
    artistEmail: "maria@test.com",
    date: "Jun 2026",
    likes: ["usuario_1", "usuario_2"],
    comments: [
      {
        id: 1,
        userName: "Carlos",
        text: "Hermosos colores!",
        date: "10 Jun 2026",
      },
      {
        id: 2,
        userName: "Ana",
        text: "Me encanta la composición",
        date: "11 Jun 2026",
      },
    ],
  },
  {
    id: 2,
    title: "El vacío digital",
    description:
      "Exploración conceptual del espacio negativo en el arte digital.",
    image: "",
    artistName: "Carlos R.",
    artistEmail: "carlos@test.com",
    date: "May 2026",
    likes: ["usuario_1"],
    comments: [
      { id: 3, userName: "Lucía", text: "Muy profundo", date: "8 Jun 2026" },
    ],
  },
  {
    id: 3,
    title: "Retrato en óleo",
    description: "Retrato clásico al óleo con técnicas mixtas contemporáneas.",
    image: "",
    artistName: "Lucía M.",
    artistEmail: "lucia@test.com",
    date: "Abr 2026",
    likes: [],
    comments: [],
  },
  {
    id: 4,
    title: "Explosión de colores",
    description:
      "Una explosión de color y movimiento que representa la energía creativa.",
    image: "",
    artistName: "Pedro A.",
    artistEmail: "pedro@test.com",
    date: "Abr 2026",
    likes: ["usuario_3"],
    comments: [
      { id: 4, userName: "María", text: "Espectacular!", date: "5 Abr 2026" },
    ],
  },
];

function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return clone(defaultObras);
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error guardando obras:", e);
  }
}

export function ObrasProvider({ children }) {
  const [obras, setObras] = useState(load);

  const addObra = (obra) => {
    setObras((prev) => {
      const next = [
        {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          likes: [],
          comments: [],
          ...obra,
        },
        ...prev,
      ];
      save(next);
      return next;
    });
  };

  const toggleLike = (obraId, userId) => {
    setObras((prev) => {
      const next = prev.map((o) => {
        if (o.id !== obraId) return o;
        const has = o.likes.includes(userId);
        return {
          ...o,
          likes: has
            ? o.likes.filter((id) => id !== userId)
            : [...o.likes, userId],
        };
      });
      save(next);
      return next;
    });
  };

  const addComment = (obraId, comment) => {
    setObras((prev) => {
      const next = prev.map((o) => {
        if (o.id !== obraId) return o;
        return {
          ...o,
          comments: [...o.comments, { id: Date.now(), ...comment }],
        };
      });
      save(next);
      return next;
    });
  };

  return (
    <ObrasContext.Provider value={{ obras, addObra, toggleLike, addComment }}>
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
