import { useState, useEffect, useCallback } from "react";

const defaultSlides = [
  {
    title: "Bienvenido a creAtiva",
    subtitle: "Descubre un mundo de creatividad",
    gradient: "from-purple-900 via-purple-800 to-pink-900",
  },
  {
    title: "Eventos Únicos",
    subtitle: "Explora eventos culturales y artísticos",
    gradient: "from-blue-900 via-indigo-800 to-purple-900",
  },
  {
    title: "Creadores",
    subtitle: "Conoce a los talentos detrás de cada obra",
    gradient: "from-pink-900 via-rose-800 to-purple-900",
  },
];

function getAdminSlides() {
  try {
    const raw = localStorage.getItem("creativa_admin_data");
    if (!raw) return [];
    const data = JSON.parse(raw);

    const newsSlides = (data.noticias || []).map((n) => ({
      title: n.title,
      subtitle: n.content,
      image: n.image,
      gradient: "from-green-900 via-emerald-800 to-teal-900",
    }));

    const eventSlides = (data.eventos || []).map((e) => ({
      title: e.title,
      subtitle: `${e.description}${e.location ? ` — ${e.location}` : ""}${e.eventDate ? ` | ${e.eventDate}` : ""}`,
      image: e.image,
      gradient: "from-amber-900 via-orange-800 to-red-900",
    }));

    return [...newsSlides, ...eventSlides];
  } catch {
    return [];
  }
}

const Carousel = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setSlides([...defaultSlides, ...getAdminSlides()]);
    const handler = () => setSlides([...defaultSlides, ...getAdminSlides()]);
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-2xl">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={
            slide.image
              ? {
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          <div
            className={`absolute inset-0 ${
              slide.image ? "bg-black/50" : `bg-gradient-to-br ${slide.gradient}`
            }`}
          />
          <div className="relative text-center px-4 z-10">
            <h2 className="font-titulos text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="font-textos text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-3xl mx-auto">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors z-20"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors z-20"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
