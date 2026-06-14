import { useAdmin } from "../../context/AdminContext";

const AdminReports = () => {
  const { data, resolveReport } = useAdmin();
  const pending = data.reports.filter((r) => r.status === "pending");

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">
        Reportes de Comentarios
      </h2>
      {pending.length === 0 ? (
        <p className="text-gray-400">No hay reportes pendientes.</p>
      ) : (
        <div className="space-y-4">
          {pending.map((r) => (
            <div
              key={r.id}
              className="bg-purple-950 rounded-xl p-4 border border-purple-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white font-bold mb-1">{r.obra}</p>
                  <p className="text-gray-300 italic">"{r.comment}"</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Reportado por: {r.reportedBy} | Autor: {r.author} | {r.date}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => resolveReport(r.id, "hidden")}
                    className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Ocultar
                  </button>
                  <button
                    onClick={() => resolveReport(r.id, "dismissed")}
                    className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Descartar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
