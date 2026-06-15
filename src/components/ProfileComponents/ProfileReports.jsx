import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const ProfileReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/reports/users/${user.userId}`);
        // The API returns { reports: [...], result: {...} }
        // When empty, reports might be undefined or an empty array
        setReports(res.data.reports || []);
      } catch {
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) return <p className="text-gray-500 text-sm">Cargando reportes...</p>;

  if (reports.length === 0) return null;

  return (
    <div className="border border-green-800 p-4">
      <h3 className="text-white font-bold mb-4">Mis Reportes</h3>
      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.reportId} className="bg-black/30 p-3 border border-green-900">
            <p className="text-gray-300 text-sm italic">"{r.commentContents || r.comment_contents}"</p>
            <p className="text-gray-500 text-xs mt-1">
              {r.reportDate ? new Date(r.reportDate || r.report_date).toLocaleDateString() : ""}
              {r.reason ? ` | Motivo: ${r.reason}` : ""}
            </p>
            <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 ${
              r.reportStatus === "publicada" ? "bg-green-700 text-green-200" :
              r.reportStatus === "rechazada" ? "bg-red-700 text-red-200" :
              "bg-yellow-700 text-yellow-200"
            }`}>
              {r.reportStatus === "publicada" ? "Aprobado" :
               r.reportStatus === "rechazada" ? "Rechazado" :
               "Pendiente"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileReports;
