const ProfileSubs = ({ subs }) => {
  return (
    <section>
      <h2 className="font-titulos text-2xl text-white mb-4">Suscripciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subs.map((sub) => (
          <div
            key={sub.id}
            className="bg-purple-950 rounded-xl p-4 border border-purple-800"
          >
            <p className="text-white font-bold text-lg">{sub.plan}</p>
            <p className="text-pink-700 text-2xl font-bold">${sub.price}/mes</p>
            <p className="text-gray-400 text-sm">Desde {sub.since}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileSubs;
