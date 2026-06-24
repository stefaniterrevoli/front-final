import { useState } from "react";
import { AdminProvider } from "../context/AdminContext";
import AdminReports from "../components/AdminComponents/AdminReports";
import AdminObras from "../components/AdminComponents/AdminObras";
import AdminNoticias from "../components/AdminComponents/AdminNoticias";
import AdminEventos from "../components/AdminComponents/AdminEventos";
const tabs = [
  { id: "reportes", label: "Reportes", icon: "" },
  { id: "obras", label: "Obras", icon: "" },
  { id: "noticias", label: "Noticias", icon: "" },
  { id: "eventos", label: "Eventos", icon: "" },
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState("reportes");

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="font-titulos text-3xl sm:text-5xl text-white mb-8">
          Panel de Administración
        </h1>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-pink-700 text-white"
                  : "bg-purple-950 text-gray-400 hover:text-white hover:bg-purple-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "reportes" && <AdminReports />}
        {activeTab === "obras" && <AdminObras />}
        {activeTab === "noticias" && <AdminNoticias />}
        {activeTab === "eventos" && <AdminEventos />}
      </div>
    </section>
  );
};

const AdminPage = () => (
  <AdminProvider>
    <AdminContent />
  </AdminProvider>
);

export default AdminPage;
