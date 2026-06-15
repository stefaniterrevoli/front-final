import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [password, setPassword] = useState("");
  const [commune, setCommune] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
    if (!commune.trim()) return "La comuna es obligatoria.";
    if (!phone.trim()) return "El teléfono es obligatorio.";
    if (!address.trim()) return "La dirección es obligatoria.";
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
        name,
        lastname: apellido,
        email,
        born: Number(birthYear),
        password,
        commune: commune.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
      navigate("/");
    } catch (err) {
      const backendMsg = err.response?.data?.error || err.response?.data?.message;
      setError(backendMsg || "Error al registrarse. Revisa los campos e intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-textos flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-purple-950 p-6 w-full max-w-sm"
        >
          <h2 className="font-titulos text-3xl mb-5 text-center">
            Crear Cuenta
          </h2>

          {error && (
            <p className="bg-red-600 text-white p-2 mb-3 text-center text-sm">
              {error}
            </p>
          )}

          <div className="mb-3">
            <label className="block mb-1 text-sm">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm">Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block mb-1 text-sm">Año de nacimiento</label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="Ej: 1998"
                min="1900"
                max={currentYear}
                required
                className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Comuna</label>
              <input
                type="text"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                placeholder="Ej: Providencia"
                required
                className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block mb-1 text-sm">
                Teléfono <span className="text-gray-400 text-xs">+569...</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56912345678"
                minLength={8}
                maxLength={15}
                required
                className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Dirección</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Av. Providencia 1247"
                required
                className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-1 text-sm">
              Contraseña <span className="text-gray-400 text-xs">(mín. 6)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full p-2.5 bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-2.5 transition-colors"
          >
            Registrarse
          </button>

          <p className="mt-4 text-center text-gray-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-pink-700 hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-10 bg-gradient-to-br from-purple-900 to-pink-900">
        <img
          src="/creativa.jpeg"
          alt="creAtiva"
          className="w-full max-w-md object-cover mb-8"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <h2 className="font-titulos text-3xl text-white text-center mb-4">
          Regístrate para tener una experiencia completa!
        </h2>
        <p className="text-white/80 text-base text-center max-w-md leading-relaxed">
          La exposición de contenidos de creadores artísticos independientes que permita monetizar sus obras e interactuar con el público objetivo dentro de la ciudad de Santiago.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
