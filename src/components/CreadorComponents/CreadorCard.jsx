import { useState } from "react";
import DonatePopup from "./DonatePopup";

const Avatar = ({ name, avatar }) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border-2 border-pink-700"
      />
    );
  }
  return (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-700 to-purple-700 flex items-center justify-center text-3xl font-bold text-white">
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
};

const CreadorCard = ({ creator, isSubbed, onSubscribe, onUnsubscribe, onDonate, currentUser }) => {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
      <div className="bg-purple-950 rounded-xl p-6 border border-purple-800 hover:border-pink-700 transition-all text-center">
        <div className="flex justify-center mb-4">
          <Avatar name={creator.name} avatar={creator.avatar} />
        </div>
        <h3 className="text-white font-bold text-xl">{creator.name}</h3>
        <p className="text-gray-400 text-sm">{creator.email}</p>

        <div className="mt-4 flex flex-col gap-2">
          {isSubbed ? (
            <>
              <button
                onClick={() => onUnsubscribe(creator.id)}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-lg text-sm transition-colors"
              >
                Suscrito - Cancelar
              </button>
              <button
                onClick={() => setShowDonate(true)}
                className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 rounded-lg text-sm transition-colors"
              >
                Donar
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => onSubscribe(creator.id, 2000)}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-2 rounded-lg text-sm transition-colors"
              >
                $2.000/mes
              </button>
              <button
                onClick={() => onSubscribe(creator.id, 5000)}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-2 rounded-lg text-sm transition-colors"
              >
                $5.000/mes
              </button>
            </div>
          )}
        </div>
      </div>

      {showDonate && (
        <DonatePopup
          creator={creator}
          onClose={() => setShowDonate(false)}
          onDonate={(amount, message) => {
            onDonate(creator.id, amount, message);
            setShowDonate(false);
          }}
        />
      )}
    </>
  );
};

export default CreadorCard;
