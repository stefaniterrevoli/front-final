const Card = ({ label, list }) => (
  <div className="border border-green-500 p-4">
    <h2 className="font-titulos text-xl text-green-400 mb-3">{label} ({list.length})</h2>
    {list.length === 0 ? (
      <p className="text-gray-500 text-sm">Sin datos.</p>
    ) : (
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {list.map((f) => (
          <div key={f.follower_id || f.followerId} className="border-b border-green-500/30 pb-1">
            <p className="text-white text-sm font-bold">{f.name || f.user_name || f.artistic_name || f.artisticName || `#${f.user_id || f.creator_id}`}</p>
            <p className="text-gray-400 text-xs">
              Desde {new Date(f.follow_date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProfileSubs = ({ followers, following }) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Card label="Seguidores" list={followers} />
    <Card label="Siguiendo" list={following} />
  </section>
);

export default ProfileSubs;
