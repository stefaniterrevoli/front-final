const ProfileDonate = ({ donations }) => {
  return (
    <section>
      <h2 className="font-titulos text-2xl text-white mb-4">Donaciones</h2>
      <div className="space-y-3">
        {donations.map((d) => (
          <div
            key={d.id}
            className="bg-purple-950 rounded-xl p-4 border border-purple-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-bold">{d.from}</p>
                <p className="text-gray-400 text-sm">{d.message}</p>
              </div>
              <div className="text-right">
                <p className="text-pink-700 font-bold text-lg">${d.amount}</p>
                <p className="text-gray-500 text-xs">{d.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileDonate;
