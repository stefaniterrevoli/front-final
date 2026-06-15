import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const EventosContext = createContext();

export function EventosProvider({ children }) {
  const [eventos, setEventos] = useState([]);

  const loadEventos = async () => {
    try {
      const response = await api.get("/events");
      const list = response.data.events || response.data;
      const mapped = (Array.isArray(list) ? list : []).map((e) => ({
        id: e.eventId || e.event_id,
        title: e.title,
        description: e.description,
        latitude: e.latitude,
        longitude: e.longitude,
        region: e.region,
        commune: e.commune,
        imageUrl: e.imageUrl || e.image_url,
        date: e.eventDate ? new Date(e.eventDate).toLocaleDateString() : e.event_date ? new Date(e.event_date).toLocaleDateString() : "",
        status: e.status,
      }));
      setEventos(mapped);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  useEffect(() => {
    loadEventos();
  }, []);

  const refresh = () => loadEventos();

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
