import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Users, HardHat, Award } from "lucide-react";
import { stats } from "../mock/mock";

const iconMap = { CheckCircle2, Users, HardHat, Award };

function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] py-16">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center text-white">
          <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">Reaching New Heights, Celebrating Achievements</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">Follow our journey as we hit new milestones and celebrate every success along the way.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.label} className="group flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand)] transition-all duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </span>
                <div className="font-display mt-5 text-5xl font-extrabold text-white">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm uppercase tracking-wide text-gray-400">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
