import { useState, useEffect } from "react";
import api from "../../services/api";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      const res = await api.get("/reports");
      const list = res.data.reports || res.data;
      setReports(Array.isArray(list) ? list : []);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleResolve = async (reportId, status) => {
    try {
      await api.put("/reports", { reportId, reportStatus: status });
      await loadReports();
    } catch (e) {
      console.error("Error al resolver reporte:", e);
    }
  };

  const pending = reports.filter((r) => (r.report_status || r.reportStatus) === "pendiente");
  const resolved = reports.filter((r) => (r.report_status || r.reportStatus) !== "pendiente");

  if (loading) return <p className="text-gray-400">Cargando reportes...</p>;

  return (
    <div>
      <h2 className="font-titulos text-3xl text-white mb-6">
        Reportes de Comentarios
      </h2>

      {pending.length === 0 ? (
        <p className="text-gray-400 mb-8">No hay reportes pendientes.</p>
      ) : (
        <div className="space-y-4 mb-10">
          <h3 className="text-xl text-yellow-400 font-bold">
            Pendientes ({pending.length})
          </h3>
          {pending.map((r) => {
            const rid = r.report_id || r.reportId;
            const status = r.report_status || r.reportStatus;
            return (
              <div
                key={rid}
                className="bg-purple-950 p-4 border border-purple-800"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-300 italic">"{r.comment_contents || r.contents}"</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Reportado por: {r.reporter_name || r.reporterName || "Desconocido"}
                      {r.report_date ? ` | ${new Date(r.report_date).toLocaleDateString()}` : ""}
                      {r.reason ? ` | Razón: ${r.reason}` : ""}
                      {status ? ` | Estado: ${status}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleResolve(rid, "publicada")}
                      className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 text-sm transition-colors"
                    >
                      ✓ Aprobar
                    </button>
                    <button
                      onClick={() => handleResolve(rid, "rechazada")}
                      className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 text-sm transition-colors"
                    >
                      ✗ Rechazar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl text-gray-400 font-bold">
            Historial ({resolved.length})
          </h3>
          {resolved.map((r) => {
            const rid = r.report_id || r.reportId;
            const status = r.report_status || r.reportStatus;
            return (
              <div
                key={rid}
                className="bg-purple-950/50 p-3 border border-purple-800/50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-300 italic text-sm">"{r.comment_contents || r.contents}"</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {r.reporter_name || r.reporterName ? `Reportado por: ${r.reporter_name || r.reporterName}` : ""}
                    </p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 ${
                      status === "publicada"
                        ? "bg-green-800 text-green-300"
                        : "bg-red-800 text-red-300"
                    }`}
                  >
                    {status === "publicada" ? "Aprobado" : "Rechazado"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
