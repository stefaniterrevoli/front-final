const HeartOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const HeartSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001Z" />
  </svg>
);

const ObraCard = ({ obra, onClick, onLike, currentUser }) => {
  const liked = obra.likes?.includes(currentUser);

  return (
    <div
      className="bg-yellow-150 rounded-xl overflow-hidden border border-purple-800 hover:border-pink-700 transition-all cursor-pointer group"
      onClick={() => onClick(obra)}
    >
      <div className="h-40 sm:h-48 bg-gradient-to-br from-purple-800 to-pink-900 flex items-center justify-center text-4xl sm:text-6xl">
        {obra.image ? (
          <img
            src={obra.image}
            alt={obra.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>🎨</span>
        )}
      </div>
      <div className="p-4">
        <h3 className=" font-titulos text-yellow-400 font-bold text-lg">
          {obra.title}
        </h3>
        <p className="text-gray-400 text-sm">por {obra.artistName}</p>
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(obra.id, currentUser);
            }}
            className="flex items-center gap-1 text-sm"
          >
            {liked ? (
              <HeartSolid />
            ) : (
              <span className="text-gray-400 group-hover:text-pink-500">
                <HeartOutline />
              </span>
            )}
            <span className="text-gray-400">{obra.likes?.length || 0}</span>
          </button>
          <span className="text-gray-500 text-xs">
            {obra.comments?.length || 0} comentarios
          </span>
        </div>
      </div>
    </div>
  );
};

export default ObraCard;
