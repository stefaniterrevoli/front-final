import { useEffect, useState } from "react";
import { CreadoresProvider, useCreadores } from "../context/CreadoresContext";
import { useAuth } from "../context/AuthContext";
import CreadorCard from "../components/CreadorComponents/CreadorCard";

const CreadoresContent = () => {
  const { creators, isSubscribed, subscribe, unsubscribe, donate } =
    useCreadores();
  const { user } = useAuth();
  const [subStatus, setSubStatus] = useState({});

  useEffect(() => {
    if (!user?.userId) return;
    const check = async () => {
      const map = {};
      for (const c of creators) {
        try {
          map[c.creatorId] = await isSubscribed(user.userId, c.creatorId);
        } catch {
          map[c.creatorId] = false;
        }
      }
      setSubStatus(map);
    };
    check();
  }, [creators, user?.userId, isSubscribed]);

  const handleSubscribe = async (creatorId) => {
    if (!user?.userId) return;
    await subscribe(user.userId, creatorId);
    setSubStatus((prev) => ({ ...prev, [creatorId]: true }));
  };

  const handleUnsubscribe = async (creatorId) => {
    if (!user?.userId) return;
    await unsubscribe(user.userId, creatorId);
    setSubStatus((prev) => ({ ...prev, [creatorId]: false }));
  };

  const handleDonate = (creatorId, amount, message) => {
    if (!user?.userId) return;
    donate(user.userId, creatorId, amount, message);
  };

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-titulos text-3xl sm:text-5xl mb-8">Creadores</h1>

        {creators.length === 0 ? (
          <p className="text-gray-400 text-center py-20">
            No hay creadores registrados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((c) => (
              <CreadorCard
                key={c.creatorId}
                creator={c}
                isSubbed={subStatus[c.creatorId] || false}
                onSubscribe={handleSubscribe}
                onUnsubscribe={handleUnsubscribe}
                onDonate={handleDonate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CreadoresPage = () => (
  <CreadoresProvider>
    <CreadoresContent />
  </CreadoresProvider>
);

export default CreadoresPage;
