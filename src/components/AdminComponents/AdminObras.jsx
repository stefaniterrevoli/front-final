import { useAdmin } from "../../context/AdminContext";

const AdminObras = () => {
  const { data, approveObra, rejectObra } = useAdmin();
  const pending = data.obras.filter((o) => o.status === "pending");
  const resolved = data.obras.filter((o) => o.status !== "pending");

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">
        Aprobación de Obras
      </h2>

      {pending.length === 0 ? (
        <p className="text-gray-400 mb-8">No hay obras pendientes de revisión.</p>
      ) : (
        <div className="space-y-4 mb-10">
          <h3 className="text-xl text-yellow-400 font-bold">Pendientes</h3>
          {pending.map((o) => (
            <div
              key={o.id}
              className="bg-purple-950 rounded-xl p-4 border border-purple-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">{o.title}</p>
                  <p className="text-gray-400 text-sm">
                    {o.author} | {o.date}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => approveObra(o.id)}
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-lg transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => rejectObra(o.id)}
                    className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-lg transition-colors"
                  >
                    ✗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl text-gray-400 font-bold">Historial</h3>
          {resolved.map((o) => (
            <div
              key={o.id}
              className="bg-purple-950/50 rounded-xl p-3 border border-purple-800/50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold">{o.title}</p>
                  <p className="text-gray-500 text-sm">{o.author}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded ${
                    o.status === "approved"
                      ? "bg-green-800 text-green-300"
                      : "bg-red-800 text-red-300"
                  }`}
                >
                  {o.status === "approved" ? "Aprobada" : "Rechazada"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminObras;
