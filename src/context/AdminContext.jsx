import { createContext, useContext, useState } from "react";

const AdminContext = createContext();
const STORAGE_KEY = "creativa_admin_data";

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const defaultData = {
  reports: [
    {
      id: 1,
      comment: "Este creador no sabe dibujar, pésimo trabajo",
      reportedBy: "usuario_01",
      author: "artista_23",
      obra: "Atardecer digital",
      date: "12 Jun 2026",
      status: "pending",
    },
    {
      id: 2,
      comment: "Contenido ofensivo e inapropiado",
      reportedBy: "moderador_01",
      author: "usuario_45",
      obra: "Retrato abstracto",
      date: "11 Jun 2026",
      status: "pending",
    },
    {
      id: 3,
      comment: "Spam - publicidad no permitida",
      reportedBy: "usuario_12",
      author: "cuenta_99",
      obra: "Sin título",
      date: "10 Jun 2026",
      status: "pending",
    },
  ],
  obras: [
    {
      id: 1,
      title: "Explosión de colores",
      author: "María G.",
      date: "13 Jun 2026",
      status: "pending",
    },
    {
      id: 2,
      title: "El vacío digital",
      author: "Carlos R.",
      date: "12 Jun 2026",
      status: "pending",
    },
    {
      id: 3,
      title: "Retrato en óleo",
      author: "Lucía M.",
      date: "11 Jun 2026",
      status: "pending",
    },
  ],
  noticias: [],
  eventos: [],
};

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return clone(defaultData);
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error guardando en localStorage:", e);
  }
}

export function AdminProvider({ children }) {
  const [data, setData] = useState(loadData);

  const update = (updater) => {
    setData((prev) => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  };

  const resolveReport = (id, action) =>
    update((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === id ? { ...r, status: action } : r,
      ),
    }));

  const approveObra = (id) =>
    update((prev) => ({
      ...prev,
      obras: prev.obras.map((o) =>
        o.id === id ? { ...o, status: "approved" } : o,
      ),
    }));

  const rejectObra = (id) =>
    update((prev) => ({
      ...prev,
      obras: prev.obras.map((o) =>
        o.id === id ? { ...o, status: "rejected" } : o,
      ),
    }));

  const addNoticia = (noticia) =>
    update((prev) => ({
      ...prev,
      noticias: [
        { id: Date.now(), date: new Date().toLocaleDateString(), ...noticia },
        ...prev.noticias,
      ],
    }));

  const addEvento = (evento) =>
    update((prev) => ({
      ...prev,
      eventos: [
        { id: Date.now(), date: new Date().toLocaleDateString(), ...evento },
        ...prev.eventos,
      ],
    }));

  return (
    <AdminContext.Provider
      value={{ data, resolveReport, approveObra, rejectObra, addNoticia, addEvento }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

export default AdminContext;
