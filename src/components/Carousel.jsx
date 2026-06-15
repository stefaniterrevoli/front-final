import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MAX_SLIDES = 5;

function parseDate(val) {
  if (!val) return 0;
  const d = new Date(val);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

function getSlides() {
  try {
    const raw = localStorage.getItem("creativa_admin_data");
    if (!raw) return [];
    const data = JSON.parse(raw);

    const newsSlides = (data.noticias || []).map((n) => ({
      type: "news",
      id: n.id,
      title: n.title,
      subtitle: n.content,
      image: n.image,
      gradient: "from-green-900 via-emerald-800 to-teal-900",
      _sortDate: parseDate(n.date),
      data: {
        id: n.id,
        title: n.title,
        content: n.content,
        image: n.image,
        date: n.date,
      },
    }));

    const eventSlides = (data.eventos || []).map((e) => ({
      type: "event",
      id: e.id,
      title: e.title,
      subtitle: `${e.description}${e.location ? ` — ${e.location}` : ""}${e.date || e.eventDate ? ` | ${e.date || e.eventDate}` : ""}`,
      image: e.image,
      gradient: "from-amber-900 via-orange-800 to-red-900",
      _sortDate: parseDate(e.date || e.eventDate),
      data: {
        id: e.id,
        title: e.title,
        description: e.description,
        imageUrl: e.image,
        date: e.date || e.eventDate,
        commune: e.location,
      },
    }));

    const all = [...newsSlides, ...eventSlides];
    all.sort((a, b) => b._sortDate - a._sortDate);
    return all.slice(0, MAX_SLIDES);
  } catch {
    return [];
  }
}

const Carousel = () => {
  const [slides, setSlides] = useState(getSlides);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const pauseTimer = useRef(null);

  useEffect(() => {
    const handler = () => setSlides(getSlides());
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
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const handleMouseEnter = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    setPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 3000);
  };

  const handleSlideClick = (slide) => {
    if (slide.type === "event") {
      navigate("/eventos", { state: { openEvent: slide.data } });
    } else if (slide.type === "news") {
      navigate("/noticias", { state: { openNews: slide.data } });
    }
  };

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-[70vh] overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, i) => (
        <div
          key={`${slide.type}-${slide.id}`}
          onClick={() => handleSlideClick(slide)}
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
            <h2 className="font-titulos text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-4 drop-shadow-lg px-2">
              {slide.title}
            </h2>
            <p className="font-textos text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg max-w-3xl mx-auto px-4">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors z-20"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors z-20"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
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
