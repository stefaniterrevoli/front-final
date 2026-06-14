import { MapContainer, TileLayer, Marker, Popup as MapPopup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const EventoPopup = ({ evento, onClose }) => {
  const hasCoords = evento.lat && evento.lng;

  if (!evento) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-purple-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
        >
          ✕
        </button>

        <div className="h-56 bg-gradient-to-br from-amber-800 to-red-900 flex items-center justify-center text-7xl">
          {evento.image ? (
            <img src={evento.image} alt={evento.title} className="w-full h-full object-cover" />
          ) : (
            <span>📅</span>
          )}
        </div>

        <div className="p-6">
          <h2 className="font-titulos text-3xl text-white mb-2">{evento.title}</h2>
          <p className="text-amber-400 text-sm mb-1">
            {evento.eventDate} {evento.location && `| ${evento.location}`}
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">{evento.description}</p>

          {hasCoords && (
            <div className="mt-6">
              <h3 className="text-white font-bold mb-2">Ubicación</h3>
              <div className="h-56 rounded-xl overflow-hidden border border-purple-700">
                <MapContainer
                  center={[evento.lat, evento.lng]}
                  zoom={14}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[evento.lat, evento.lng]} icon={icon}>
                    <MapPopup>{evento.title}</MapPopup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventoPopup;
