import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { medical, medicalCategories } from "../mock/mock";

export default function AboutMedical() {
  return (
    <div>
      <Seo
        title="Medical Division | ALMAS VERTEX Medical Supplies"
        description="ALMAS VERTEX Medical Division — a professional B2B distributor of medical devices, equipment, surgical supplies and PPE across Saudi Arabia. Explore our full medical catalogue."
      />
      <PageBanner title="Medical Division" crumbs={[{ label: "About", to: "/about" }, { label: "Medical Division" }]} image={medical.hero} />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">About Company</span>
            <h1 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">Delivering Care Through Reliable Medical Solutions</h1>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">{medical.intro}</p>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{medical.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#catalogue" className="btn-brand inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
                View Catalogue <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border-2 border-[var(--ink)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-[var(--ink)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
                Enquire Now
              </Link>
            </div>
          </Reveal>
          <Reveal variant="right" className="overflow-hidden rounded-2xl">
            <img src={medical.hero} alt="Almasvertex medical supplies" className="h-[520px] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Full 10-category catalogue */}
      <section id="catalogue" className="scroll-mt-24 bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Medical Catalogue</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Explore Our Product Categories</h2>
            <p className="mt-4 text-[var(--ink-soft)]">Browse the complete ALMAS VERTEX medical catalogue. Each category has its own dedicated page with a full product range.</p>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {medicalCategories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 90}>
                <Link to={`/${c.slug}`} className="svc-card group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative h-52 overflow-hidden">
                    <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold uppercase text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{c.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">View Products <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
