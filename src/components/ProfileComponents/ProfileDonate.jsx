const ProfileDonate = ({ donations }) => (
  <section>
    <h2 className="font-titulos text-2xl text-white mb-4">Donaciones ({donations.length})</h2>
    {donations.length === 0 ? (
      <p className="text-gray-500">No has recibido donaciones aún.</p>
    ) : (
      <div className="space-y-3">
        {donations.map((d) => (
          <div
            key={d.donation_id || d.donationId}
            className="bg-purple-950 rounded-xl p-4 border border-purple-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-bold">
                  {d.donor_name || d.donorName || `Usuario #${d.donor_user_id}`}
                </p>
                {d.message && (
                  <p className="text-gray-300 text-sm italic mt-1">"{d.message}"</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-pink-400 font-bold">${Number(d.amount).toFixed(2)}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(d.donation_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default ProfileDonate;
