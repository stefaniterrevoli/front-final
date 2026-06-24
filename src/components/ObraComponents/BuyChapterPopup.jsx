import { useState } from "react";

const BuyChapterPopup = ({ chapterTitle, onClose, onBuy }) => {
  const [done, setDone] = useState(false);

  const handleBuy = () => {
    onBuy();
    setDone(true);
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <div className="relative bg-purple-950 rounded-2xl max-w-md w-full p-8 text-center border border-purple-700 shadow-2xl">
          <div className="text-6xl mb-4">🔓</div>
          <h2 className="font-titulos text-3xl text-white mb-2">
            ¡Capítulo adquirido!
          </h2>
          <p className="text-gray-400 mb-6">
            Ya puedes acceder a {chapterTitle}.
          </p>
          <button
            onClick={onClose}
            className="bg-green-700 hover:bg-pink-800 text-white font-bold py-2 px-8 rounded-lg transition-colors"
          >
            Ver capítulo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-purple-950 rounded-2xl max-w-md w-full p-6 border border-purple-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        <h2 className="font-titulos text-2xl text-white mb-2">
          Adquirir capítulo
        </h2>
        <p className="text-gray-400 mb-6">
          {chapterTitle}
        </p>

        <p className="text-gray-500 text-xs mb-4 italic">* Simulación de pago</p>

        <p className="text-gray-400 mb-4">Precio:</p>
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleBuy}
            className="w-full py-3 rounded-lg font-bold text-lg transition-colors bg-pink-700 hover:bg-pink-800 text-white"
          >
            $2.000
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyChapterPopup;
