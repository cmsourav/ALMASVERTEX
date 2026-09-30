import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Phone, X, Info } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import MedicalCategoryNav from "../components/MedicalCategoryNav";
import MedicalProductCard from "../components/MedicalProductCard";
import { medicalCategories, company } from "../mock/mock";

export default function MedicalCategory({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  const category = medicalCategories.find((c) => c.slug === slug);
  const [detail, setDetail] = useState(null);

  if (!category) return <Navigate to="/about-medical" replace />;

  const related = medicalCategories.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <div>
      <Seo
        title={`${category.name} | ALMAS VERTEX Medical`}
        description={`${category.description} ALMAS VERTEX Medical Division — professional B2B medical supplies in Ad-Dammam, Saudi Arabia.`}
      />
      <PageBanner
        title={category.name}
        crumbs={[{ label: "Medical", to: "/about-medical" }, { label: category.name }]}
        image={category.image}
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Cross navigation */}
          <Reveal>
            <MedicalCategoryNav activeSlug={slug} />
          </Reveal>

          {/* Intro */}
          <Reveal className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <img src={category.image} alt={category.name} className="h-[360px] w-full object-cover" />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Medical Catalogue</span>
              <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">{category.name}</h1>
              <p className="mt-4 text-lg font-medium text-[var(--ink)]">{category.description}</p>
              <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{category.longDescription}</p>
              <Link to="/contact" className="btn-brand mt-7 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
                Enquire About This Range <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Product grid */}
          <div className="mt-16">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Product Range</span>
                <h2 className="font-display mt-2 text-3xl font-bold uppercase text-[var(--ink)] md:text-4xl">Products In {category.name}</h2>
              </div>
            </Reveal>
            <Reveal className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm text-[var(--ink-soft)] ring-1 ring-blue-100">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
              <span>Sample catalogue shown. Contact us for the full product list, models and specifications.</span>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90}>
                  <MedicalProductCard product={p} onView={setDetail} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Enquiry CTA */}
          <Reveal className="mt-16 overflow-hidden rounded-2xl bg-[var(--ink)] p-8 text-white md:p-12">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand)]"><Phone className="h-7 w-7" /></span>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase md:text-3xl">Need A Quote Or Product Details?</h3>
                  <p className="mt-1 text-gray-400">Talk to our medical team about {category.name.toLowerCase()} availability and specifications.</p>
                  <div className="mt-2 text-sm font-semibold">{company.phones.join("  \u00b7  ")}</div>
                </div>
              </div>
              <Link to="/contact" className="btn-brand inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Related categories */}
          <div className="mt-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold uppercase text-[var(--ink)]">Related Medical Categories</h2>
              <span className="mt-2 block h-1 w-12 bg-[var(--brand)]" />
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 4) * 80}>
                  <Link to={`/${c.slug}`} className="svc-card group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="h-36 overflow-hidden">
                      <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between p-5">
                      <h3 className="font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{c.name}</h3>
                      <ArrowRight className="h-4 w-4 text-[var(--brand)]" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      {detail && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDetail(null)} />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button onClick={() => setDetail(null)} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 hover:text-[var(--brand)]"><X className="h-5 w-5" /></button>
            <img src={detail.image} alt={detail.name} className="h-56 w-full object-cover" />
            <div className="p-7">
              <h3 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">{detail.name}</h3>
              {detail.productCode && <div className="mt-1 text-sm font-medium text-[var(--ink-soft)]">{detail.productCode}</div>}
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {detail.description || `Part of our ${category.name} range. Contact our medical team for full specifications, available models and lead times.`}
              </p>
              <Link to="/contact" onClick={() => setDetail(null)} className="btn-brand mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide">
                Enquire Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
