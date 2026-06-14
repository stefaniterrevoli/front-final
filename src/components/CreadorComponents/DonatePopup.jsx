import { useState } from "react";

const DonatePopup = ({ creator, onClose, onDonate }) => {
  const [amount, setAmount] = useState(null);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const handleDonate = () => {
    if (!amount) return;
    onDonate(amount, message.trim());
    setDone(true);
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <div className="relative bg-purple-950 rounded-2xl max-w-md w-full p-8 text-center border border-purple-700 shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-titulos text-3xl text-white mb-2">
            ¡Gracias por apoyar a {creator.name}!
          </h2>
          <p className="text-gray-400 mb-6">
            Tu contribución de ${amount.toLocaleString()} ayuda a seguir creando contenido.
          </p>
          <button
            onClick={onClose}
            className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-8 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-purple-950 rounded-2xl max-w-md w-full p-6 border border-purple-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        <h2 className="font-titulos text-2xl text-white mb-6">
          Donar a {creator.name}
        </h2>

        <p className="text-gray-400 mb-4">Selecciona el monto:</p>
        <div className="flex gap-3 mb-6">
          {[2000, 5000].map((m) => (
            <button
              key={m}
              onClick={() => setAmount(m)}
              className={`flex-1 py-3 rounded-lg font-bold text-lg transition-colors ${
                amount === m
                  ? "bg-pink-700 text-white"
                  : "bg-purple-800 text-gray-300 hover:bg-purple-700"
              }`}
            >
              ${m.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">Mensaje (opcional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deja un mensaje de apoyo..."
            rows={3}
            className="w-full p-3 rounded bg-black text-white border border-purple-700 focus:outline-none focus:border-pink-700 resize-none"
          />
        </div>

        <button
          onClick={handleDonate}
          disabled={!amount}
          className={`w-full font-bold py-3 rounded-lg transition-colors ${
            amount
              ? "bg-pink-700 hover:bg-pink-800 text-white"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Donar ${amount?.toLocaleString() || ""}
        </button>
      </div>
    </div>
  );
};

export default DonatePopup;
