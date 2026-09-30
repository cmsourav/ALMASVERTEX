import React, { useEffect, useState, useCallback, useRef } from "react";

const SECTORS = [
  {
    id: "01",
    code: "CONTRACTING",
    sub: "Civil · Scaffolding · MEP",
    threshold: 0,
    endThreshold: 35,
    status: "Validating structural safety & scaffolding frameworks",
  },
  {
    id: "02",
    code: "MATERIAL SUPPLY",
    sub: "Piping · Valves · Industrial Fittings",
    threshold: 36,
    endThreshold: 72,
    status: "Loading industrial supply inventory & ISO specifications",
  },
  {
    id: "03",
    code: "MEDICAL SERVICES",
    sub: "Diagnostic · Surgical · Hospital Tech",
    threshold: 73,
    endThreshold: 100,
    status: "Synchronizing medical equipment & healthcare solutions",
  },
];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setExit(true);
    setTimeout(() => {
      onComplete?.();
    }, 900);
  }, [onComplete]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    let raf;
    const start = performance.now();
    const duration = 1500; // Refined 1.5s progression

    function tick(now) {
      if (completedRef.current) return;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Precision cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * 100);
      setCount(value);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(finish, 260);
      }
    }

    raf = requestAnimationFrame(tick);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finish]);

  // Radius for SVG progress
  const radius = 96;
  const circumference = 2 * Math.PI * radius; // ~603.18
  const strokeDashoffset = circumference - (circumference * count) / 100;

  // Active sector determination
  const activeSector =
    SECTORS.find((s) => count >= s.threshold && count <= s.endThreshold) || SECTORS[2];

  // Laser beacon coordinates along circular track
  const angleRad = ((count / 100) * 360 - 90) * (Math.PI / 180);
  const beaconX = 120 + radius * Math.cos(angleRad);
  const beaconY = 120 + radius * Math.sin(angleRad);

  return (
    <div
      className={`ls-root ${exit ? "ls-root--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Almasvertex platform"
    >
      {/* Monolithic Left & Right Sliding Gates */}
      <div className="ls-gate-left" />
      <div className="ls-gate-right" />

      {/* Atmospheric center ambient aura */}
      <div className="ls-ambient-glow" />

      {/* Foreground Stage Container */}
      <div className="ls-stage">
        {/* --- Top Zone: Brand Telemetry & Skip --- */}
        <header className="w-full flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#B8922A] animate-pulse" />
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.2em] font-bold text-white uppercase">
                ALMAS VERTEX
              </span>
              <span className="text-[0.62rem] tracking-[0.24em] text-white/40 uppercase font-mono">
                KINGDOM OF SAUDI ARABIA · EST
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={finish}
            className="ls-skip-btn"
            aria-label="Skip to main site"
          >
            <span>Skip Intro</span>
            <span className="text-white/35 font-mono text-[0.6rem]">[Esc]</span>
          </button>
        </header>

        {/* --- Center Zone: Precision Radial Compass Dial --- */}
        <main className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
          {/* Circular HUD Dial */}
          <div className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] flex items-center justify-center">
            {/* Corner CAD brackets around the dial box */}
            <span className="ls-corner-bracket ls-corner-bracket--tl" />
            <span className="ls-corner-bracket ls-corner-bracket--tr" />
            <span className="ls-corner-bracket ls-corner-bracket--bl" />
            <span className="ls-corner-bracket ls-corner-bracket--br" />

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 240 240"
              fill="none"
            >
              <defs>
                <linearGradient id="goldLaserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9A7820" />
                  <stop offset="60%" stopColor="#B8922A" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>
                <radialGradient id="centerDialAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1B2E52" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#070E1A" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Central radial shade */}
              <circle cx="120" cy="120" r="105" fill="url(#centerDialAura)" />

              {/* Outer compass rotating calibration track */}
              <circle
                cx="120"
                cy="120"
                r="110"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="2 6"
                className="ls-spin-slow"
              />

              {/* Secondary reverse micro-ticks */}
              <circle
                cx="120"
                cy="120"
                r="82"
                stroke="rgba(184, 146, 42, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="ls-spin-reverse"
              />

              {/* Base background track for the progress circle */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2.5"
              />

              {/* Active Sweeping Circular Progress Stroke */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke="url(#goldLaserGradient)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 120 120)"
                style={{
                  transition: "stroke-dashoffset 0.04s linear",
                  filter: "drop-shadow(0 0 6px rgba(184, 146, 42, 0.6))",
                }}
              />

              {/* Glowing leading head on the circular laser */}
              {count > 0 && count < 100 && (
                <circle
                  cx={beaconX}
                  cy={beaconY}
                  r="4"
                  fill="#FFFBEB"
                  style={{
                    filter: "drop-shadow(0 0 8px #FDE68A)",
                  }}
                />
              )}

              {/* 4 Cardinal surveying ticks */}
              <line x1="120" y1="6" x2="120" y2="16" stroke="#B8922A" strokeWidth="1.5" />
              <line x1="120" y1="224" x2="120" y2="234" stroke="#B8922A" strokeWidth="1.5" />
              <line x1="6" y1="120" x2="16" y2="120" stroke="#B8922A" strokeWidth="1.5" />
              <line x1="224" y1="120" x2="234" y2="120" stroke="#B8922A" strokeWidth="1.5" />
            </svg>

            {/* Core Emblem & Percentage Inside Dial */}
            <div className="flex flex-col items-center justify-center text-center z-10 px-4">
              <div className="relative mb-2">
                <img
                  src="/logo.png"
                  alt="Almasvertex"
                  className="w-11 h-11 sm:w-13 sm:h-13 object-contain filter drop-shadow-[0_4px_18px_rgba(184,146,42,0.5)]"
                />
              </div>

              {/* Tabular Precision Percentage */}
              <div className="flex items-baseline justify-center">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-wider tabular-nums leading-none">
                  {String(count).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-semibold text-[#B8922A] ml-0.5">%</span>
              </div>

              <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.24em] font-mono text-white/40 uppercase mt-1">
                SYSTEM LOAD
              </span>
            </div>
          </div>

          {/* Current Live Verification Stage */}
          <div className="mt-6 sm:mt-8 max-w-md w-full text-center px-4">
            <p className="text-[0.68rem] sm:text-[0.74rem] tracking-[0.16em] font-medium text-[#EAD8A4] uppercase transition-all duration-300">
              {activeSector.status}
            </p>
          </div>

          {/* --- Triad Capability Pillars (Contracting · Supply · Medical) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-xl w-full mt-6 px-2">
            {SECTORS.map((sec) => {
              const isActive = activeSector.id === sec.id;
              const isPast = count > sec.endThreshold;
              return (
                <div
                  key={sec.id}
                  className={`relative p-3 rounded border transition-all duration-300 ${isActive
                    ? "bg-[#1B2E52]/40 border-[#B8922A]/60 shadow-[0_4px_20px_rgba(184,146,42,0.2)]"
                    : isPast
                      ? "bg-white/[0.02] border-white/10 opacity-70"
                      : "bg-transparent border-white/5 opacity-40"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[0.6rem] text-[#B8922A] font-semibold">
                      {sec.id}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive
                        ? "bg-[#F5DE94] animate-ping"
                        : isPast
                          ? "bg-[#B8922A]"
                          : "bg-white/20"
                        }`}
                    />
                  </div>
                  <h4 className="font-display text-xs font-bold tracking-wider text-white uppercase">
                    {sec.code}
                  </h4>
                  <p className="text-[0.58rem] tracking-wider text-white/50 truncate mt-0.5">
                    {sec.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </main>

        {/* --- Bottom Zone: Engineering Stamp & Coordinates --- */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-white/10 text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] text-white/40 uppercase font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span>COORDINATES: 26°25'N 50°05'E</span>
            <span aria-hidden="true">·</span>
            <span>EASTERN PROVINCE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#B8922A] font-semibold">ISO 9001:2015</span>
            <span aria-hidden="true">·</span>
            <span>ALMASVERTEX CERTIFIED</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
