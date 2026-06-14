import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const validate = () => {
    if (!name.trim()) return "El nombre es obligatorio.";
    if (!apellido.trim()) return "El apellido es obligatorio.";
    if (!email.trim()) return "El correo electrónico es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "El formato del correo electrónico no es válido.";
    if (!birthYear) return "El año de nacimiento es obligatorio.";
    const year = Number(birthYear);
    if (!Number.isInteger(year) || year < 1900 || year > currentYear)
      return "El año de nacimiento no es válido.";
    if (currentYear - year < 18)
      return "Debes ser mayor de 18 años para registrarte.";
    if (!password) return "La contraseña es obligatoria.";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register({
        username: email,
        email,
        name,
        lastname: apellido,
        born: Number(birthYear),
        password,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al registrarse. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-textos">
      <form
        onSubmit={handleSubmit}
        className="bg-purple-950 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="font-titulos text-4xl mb-6 text-center">
          Crear Cuenta
        </h2>

        {error && (
          <p className="bg-red-600 text-white p-3 rounded mb-4 text-center text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Año de nacimiento</label>
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            placeholder="Ej: 1998"
            min="1900"
            max={currentYear}
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
          Registrarse
        </button>

        <p className="mt-4 text-center text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-pink-700 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
