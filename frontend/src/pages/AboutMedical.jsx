import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, ShieldCheck, Stethoscope, Syringe } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { medical } from "../mock/mock";

const catIcons = [Stethoscope, Syringe, ShieldCheck, HeartPulse];

export default function AboutMedical() {
  return (
    <div>
      <PageBanner title="Medical Division" crumbs={[{ label: "About", to: "/about" }, { label: "Medical Division" }]} image={medical.hero} />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">About Company</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">Delivering Care Through Reliable Medical Solutions</h2>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">{medical.intro}</p>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{medical.body}</p>
            <Link to="/contact" className="btn-brand mt-8 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
              Enquire Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal variant="right" className="overflow-hidden rounded-2xl">
            <img src={medical.hero} alt="Medical solutions" className="h-[520px] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Product Range</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">What We Supply</h2>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {medical.categories.map((c, i) => {
              const Icon = catIcons[i % catIcons.length];
              return (
                <Reveal key={c.name} delay={i * 100}>
                  <div className="svc-card group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="h-44 overflow-hidden">
                      <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex items-center gap-3 p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]"><Icon className="h-5 w-5" /></span>
                      <h3 className="font-semibold text-[var(--ink)]">{c.name}</h3>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
