import React, { useEffect, useState } from "react";

const STRIPES = 5;

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1800;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * 100);
      setCount(value);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setExit(true);
          // Wait for stripe animation (STRIPES * 80ms stagger + 700ms duration)
          setTimeout(onComplete, STRIPES * 80 + 750);
        }, 350);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div className={`ls-root${exit ? " ls-root--exit" : ""}`} aria-label="Loading" role="status">

      {/* Staggered stripe panels */}
      {Array.from({ length: STRIPES }).map((_, i) => (
        <div
          key={i}
          className={`ls-stripe${exit ? " ls-stripe--exit" : ""}`}
          style={{
            top: `${(i / STRIPES) * 100}%`,
            height: `${100 / STRIPES}%`,
            "--delay": `${i * 0.08}s`,
            "--origin": i % 2 === 0 ? "top" : "bottom",
          }}
        />
      ))}

      {/* Centered content layer */}
      <div className={`ls-body${exit ? " ls-body--exit" : ""}`}>

        {/* Logo */}
        <div className="ls-logo-box">
          <img src="/logo.png" alt="Almasvertex" className="ls-img" />
        </div>

        {/* Divider */}
        <div className="ls-divider">
          <span className="ls-divider-fill" style={{ width: `${count}%` }} />
        </div>

        {/* Counter */}
        <div className="ls-counter-row">
          <span className="ls-counter-num">
            {String(count).padStart(2, "0")}
          </span>
          <span className="ls-counter-sym">%</span>
        </div>

        {/* Label */}
        <p className="ls-label">Loading Experience</p>
      </div>
    </div>
  );
}
