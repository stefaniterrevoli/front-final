import { CreadoresProvider, useCreadores } from "../context/CreadoresContext";
import { useAuth } from "../context/AuthContext";
import CreadorCard from "../components/CreadorComponents/CreadorCard";

const CreadoresContent = () => {
  const { creators, isSubscribed, subscribe, unsubscribe, donate } = useCreadores();
  const { user } = useAuth();

  const handleSubscribe = (creatorId, amount) => {
    if (!user) return;
    subscribe(user.email, creatorId, amount);
  };

  const handleUnsubscribe = (creatorId) => {
    if (!user) return;
    unsubscribe(user.email, creatorId);
  };

  const handleDonate = (creatorId, amount, message) => {
    if (!user) return;
    donate(user.email, creatorId, amount, message);
  };

  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-titulos text-5xl mb-8">Creadores</h1>

        {creators.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay creadores registrados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((c) => (
              <CreadorCard
                key={c.id}
                creator={c}
                isSubbed={isSubscribed(user?.email, c.id)}
                onSubscribe={handleSubscribe}
                onUnsubscribe={handleUnsubscribe}
                onDonate={handleDonate}
                currentUser={user?.email}
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
