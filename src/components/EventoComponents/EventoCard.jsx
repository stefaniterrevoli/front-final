const EventoCard = ({ evento, onClick }) => {
  return (
    <div
      className="bg-purple-950 rounded-xl overflow-hidden border border-purple-800 hover:border-pink-700 transition-all cursor-pointer group"
      onClick={() => onClick(evento)}
    >
      <div className="h-40 bg-gradient-to-br from-amber-800 to-red-900 flex items-center justify-center text-5xl">
        {evento.image ? (
          <img src={evento.image} alt={evento.title} className="w-full h-full object-cover" />
        ) : (
          <span>📅</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-lg">{evento.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{evento.description}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>{evento.eventDate}</span>
          {evento.location && <span>| {evento.location}</span>}
        </div>
      </div>
    </div>
  );
};

export default EventoCard;
