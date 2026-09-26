import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../mock/mock";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const go = (i) => setIndex((i + heroSlides.length) % heroSlides.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    timer.current = setInterval(() => setIndex((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-[var(--ink)]">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className={`h-full w-full object-cover ${i === index ? "kenburns" : ""}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

          <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6">
            {i === index && (
              <div className="hero-anim max-w-2xl text-white">
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">
                  <span className="h-px w-10 bg-[var(--brand)]" /> {slide.kicker}
                </span>
                <h1 className="font-display mt-4 text-5xl font-extrabold uppercase leading-[0.95] md:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
                  {slide.text}
                </p>
                <div>
                  <Link to={slide.cta} className="btn-brand mt-8 inline-flex items-center gap-3 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
                    Read More <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button onClick={prev} aria-label="Previous"
        className="absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/40 p-3 text-white transition-colors hover:bg-[var(--brand)] hover:border-[var(--brand)] md:flex">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={next} aria-label="Next"
        className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/40 p-3 text-white transition-colors hover:bg-[var(--brand)] hover:border-[var(--brand)] md:flex">
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-[var(--brand)]" : "w-2.5 bg-white/50 hover:bg-white"}`} />
        ))}
      </div>
    </section>
  );
}
