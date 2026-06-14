import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, isAdmin, logout } = useAuth();

  const links = [
    { name: "Home", to: "/" },
    { name: "Eventos", to: "/eventos" },
    { name: "Noticias", to: "/noticias" },
    { name: "Obras", to: "/obras" },
    { name: "Creadores", to: "/creadores" },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-purple-950 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6 pt-24 font-textos text-lg">
          <div className="md:hidden">
            <SearchBar />
          </div>
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className="hover:text-pink-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-purple-700" />
          {user ? (
            <>
              <Link
                to="/perfil"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-pink-700 transition-colors"
              >
                Perfil
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className="hover:text-pink-700 transition-colors"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                }}
                className="text-left hover:text-pink-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setSidebarOpen(false)}
              className="hover:text-pink-700 transition-colors"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
