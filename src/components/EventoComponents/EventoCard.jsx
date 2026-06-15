const EventoCard = ({ evento, onClick }) => {
  return (
    <div
      className="bg-black rounded-xl overflow-hidden border border-purple-800 hover:border-pink-700 transition-all cursor-pointer group"
      onClick={() => onClick(evento)}
    >
      <div className="h-40 bg-gradient-to-br from-amber-800 to-red-900 flex items-center justify-center text-5xl">
        {evento.imageUrl ? (
          <img
            src={evento.imageUrl}
            alt={evento.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span></span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-titulos text-yellow-400 font-bold text-lg">
          {evento.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
          {evento.description}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>{evento.date}</span>
          {evento.commune && <span>| {evento.commune}</span>}
        </div>
      </div>
    </div>
  );
};

export default EventoCard;
