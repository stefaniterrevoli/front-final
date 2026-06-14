import { createContext, useContext, useState } from "react";

const ADMIN_KEY = "creativa_admin_data";
const EventosContext = createContext();

function load() {
  try {
    const stored = localStorage.getItem(ADMIN_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.eventos || [];
    }
  } catch {}
  return [];
}

export function EventosProvider({ children }) {
  const [eventos, setEventos] = useState(load);

  const refresh = () => setEventos(load());

  return (
    <EventosContext.Provider value={{ eventos, refresh }}>
      {children}
    </EventosContext.Provider>
  );
}

export function useEventos() {
  const ctx = useContext(EventosContext);
  if (!ctx) throw new Error("useEventos must be used within EventosProvider");
  return ctx;
}

export default EventosContext;
