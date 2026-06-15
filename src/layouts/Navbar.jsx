import React from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, isAdmin, logout } = useAuth();

  const links = [
    { name: "Home", to: "/" },
    { name: "Eventos", to: "/eventos" },
    { name: "Noticias", to: "/noticias" },
    { name: "Obras", to: "/obras" },
    { name: "Creadores", to: "/creadores" },
  ];

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-titulos text-3xl sm:text-5xl font-bold text-white">
          <span className="normal-case">cre</span>
          <span className="text-green-400 uppercase">A</span>
          <span className="normal-case">tiva</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-textos text-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-pink-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <SearchBar />

          {user ? (
            <>
              <Link
                to="/perfil"
                className="hover:text-pink-700 transition-colors"
              >
                Perfil
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hover:text-pink-700 transition-colors"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="hover:text-pink-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded transition-colors"
            >
              Ingresar
            </Link>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {sidebarOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
