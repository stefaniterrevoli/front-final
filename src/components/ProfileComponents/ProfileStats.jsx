const ProfileStats = ({ stats }) => {
  const items = [
    { label: "Obras", value: stats.obras },
    { label: "Seguidores", value: stats.seguidores },
    { label: "Siguiendo", value: stats.siguiendo },
  ];

  return (
    <div className="flex justify-center gap-10 mb-10">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <p className="text-3xl font-bold text-white">{item.value}</p>
          <p className="text-gray-400 text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
