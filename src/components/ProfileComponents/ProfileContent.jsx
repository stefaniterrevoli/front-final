const ProfileContent = ({ content }) => {
  return (
    <section>
      <h2 className="font-titulos text-2xl text-white mb-4">Contenido</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content.map((item) => (
          <div
            key={item.id}
            className="bg-purple-950 rounded-xl p-6 border border-purple-800 text-center hover:border-pink-700 transition-colors"
          >
            <p className="text-3xl mb-2">{item.type === "image" ? "" : ""}</p>
            <p className="text-white font-bold">{item.title}</p>
            <p className="text-gray-400 text-sm">{item.date}</p>
            <span className="inline-block mt-2 text-xs bg-purple-700 text-white px-2 py-1 rounded">
              {item.type === "image" ? "Imagen" : "Video"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileContent;
