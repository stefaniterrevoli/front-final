import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-textos">
      <form
        onSubmit={handleSubmit}
        className="bg-purple-950 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="font-titulos text-4xl mb-6 text-center">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 rounded transition-colors"
        >
          Ingresar
        </button>

        <p className="mt-4 text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-pink-700 hover:underline">
            Registrarse
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
