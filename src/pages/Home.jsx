import Carousel from "../components/Carousel";
/*import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";*/

const Home = () => {
  return (
    <section className="min-h-screen bg-black text-white font-textos">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Carousel />
      </div>
      <div className="text-center px-4">
        <h2 className="font-titulos text-6xl mb-4">
          Bienvenido a <span className="text-pink-700">creAtiva</span>
        </h2>
        <p className="text-lg text-gray-400">
          Un sitio donde puedes explorar eventos, conocer a artistas locales y
          nuevas obras dentro de esta industria emergente en nuestra comunidad
          latinoamericana.
        </p>
      </div>
    </section>
  );
};

export default Home;
