const ProfileChapters = ({ sales }) => (
  <section>
    <h2 className="font-titulos text-2xl text-white mb-4">Ventas de capítulos ({sales.length})</h2>
    {sales.length === 0 ? (
      <p className="text-gray-500">No has recibido ventas de capítulos aún.</p>
    ) : (
      <div className="space-y-3">
        {sales.map((s, i) => (
          <div
            key={i}
            className="bg-purple-950 rounded-xl p-4 border border-purple-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-bold text-sm">
                  {s.artworkTitle} — {s.chapterTitle || `Capítulo ${s.chapterNum}`}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Comprado por {s.buyerName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-pink-400 font-bold">${s.amount.toLocaleString()}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(s.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default ProfileChapters;
