import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Reusable page banner with breadcrumb.
export default function PageBanner({ title, crumbs = [], image }) {
  return (
    <section className="relative flex h-[42vh] min-h-[320px] items-center overflow-hidden bg-[var(--ink)]">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover kenburns" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <h1 className="font-display text-5xl font-extrabold uppercase text-white md:text-6xl">{title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
          <Link to="/" className="hover:text-[var(--brand)]">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" />
              {c.to ? <Link to={c.to} className="hover:text-[var(--brand)]">{c.label}</Link> : <span className="text-[var(--brand)]">{c.label}</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
