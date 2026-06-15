import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import CreadorCard from "../components/CreadorComponents/CreadorCard";
import { CreadoresProvider, useCreadores } from "../context/CreadoresContext";
import { useAuth } from "../context/AuthContext";

const HomeCreators = () => {
  const { creators, isSubscribed, subscribe, unsubscribe, donate } = useCreadores();
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

  if (creators.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="font-titulos text-3xl sm:text-5xl mb-4 text-center">Creadores</h2>
      <p className="text-gray-400 text-sm sm:text-base text-center max-w-2xl mx-auto mb-6">
        Conoce a los artistas y creadores que forman parte de creAtiva. Síguelos, apoya su trabajo y descubre nuevas obras.
      </p>
      <hr className="border-purple-700 mb-8" />
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
    </div>
  );
};

const Home = () => {
  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Carousel />
      </div>
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h2 className="font-titulos text-3xl sm:text-4xl md:text-6xl mb-4">
          Bienvenido a <span className="text-pink-700">creAtiva</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-400">
          Un sitio donde puedes explorar eventos, conocer a artistas locales y
          nuevas obras dentro de esta industria emergente en nuestra comunidad
          latinoamericana.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-yellow-400 p-6 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30">
          <h3 className="font-titulos text-xl sm:text-2xl text-purple-900 font-bold mb-2">Explora Obras</h3>
          <p className="text-purple-900 text-sm sm:text-base leading-relaxed">
            Descubre ilustraciones, pinturas y arte digital de creadores emergentes latinoamericanos. Cada obra cuenta con múltiples capítulos e imágenes.
          </p>
        </div>
        <div className="bg-yellow-400 p-6 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30">
          <h3 className="font-titulos text-xl sm:text-2xl text-purple-900 font-bold mb-2">Eventos Culturales</h3>
          <p className="text-purple-900 text-sm sm:text-base leading-relaxed">
            Mantente al día con exposiciones, talleres y encuentros artísticos. Geolocalización y mapa interactivo para encontrar eventos cercanos.
          </p>
        </div>
        <div className="bg-yellow-400 p-6 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30">
          <h3 className="font-titulos text-xl sm:text-2xl text-purple-900 font-bold mb-2">Creadores</h3>
          <p className="text-purple-900 text-sm sm:text-base leading-relaxed">
            Conoce a los talentos detrás de cada obra, síguelos, recibe su contenido y apoya su trabajo mediante donaciones.
          </p>
        </div>
        <div className="bg-yellow-400 p-6 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30">
          <h3 className="font-titulos text-xl sm:text-2xl text-purple-900 font-bold mb-2">Comunidad</h3>
          <p className="text-purple-900 text-sm sm:text-base leading-relaxed">
            Interactúa con likes y comentarios en las obras, forma parte de una red creativa que valora y difunde el arte local.
          </p>
        </div>
        <div className="bg-yellow-400 p-6 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30">
          <h3 className="font-titulos text-xl sm:text-2xl text-purple-900 font-bold mb-2">Noticias</h3>
          <p className="text-purple-900 text-sm sm:text-base leading-relaxed">
            Entérate de las últimas novedades, convocatorias y lanzamientos dentro de la plataforma y la escena artística.
          </p>
        </div>
        <div className="bg-yellow-400 p-6 transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30">
          <h3 className="font-titulos text-xl sm:text-2xl text-purple-900 font-bold mb-2">Suscripciones</h3>
          <p className="text-purple-900 text-sm sm:text-base leading-relaxed">
            Suscríbete a tus creadores favoritos para seguir su trayectoria y recibe actualizaciones cuando publiquen nuevo contenido.
          </p>
        </div>
      </div>

      <CreadoresProvider>
        <HomeCreators />
      </CreadoresProvider>
    </section>
  );
};

export default Home;
