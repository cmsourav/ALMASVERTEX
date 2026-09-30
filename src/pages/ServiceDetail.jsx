import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check, Phone, Sparkles, Layers, Target } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { services, company, serviceExtras, equipmentItems, temporaryFacilityItems } from "../mock/mock";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/" replace />;

  const extras = serviceExtras[slug] || {};
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);
  const isEquipment = slug === "equipment-rental";
  const isTempFacilities = slug === "temporary-facilities";
  const offeredEquipment = equipmentItems.filter((e) => e.offered);
  const offeredFacilities = temporaryFacilityItems.filter((f) => f.offered);

  return (
    <div>
      <Seo
        title={`${service.title} | ALMAS VERTEX Contracting`}
        description={`${service.short} ALMAS VERTEX — construction & contracting solutions in Ad-Dammam, Saudi Arabia.`}
      />
      <PageBanner
        title={service.title}
        crumbs={[{ label: "Business Sectors" }, { label: service.title }]}
        image={service.image}
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_340px]">
          {/* Main */}
          <div>
            <Reveal className="overflow-hidden rounded-2xl">
              <img src={service.image} alt={service.title} className="h-[420px] w-full object-cover" />
            </Reveal>
            <Reveal>
              <span className="mt-10 block text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Service Details</span>
              <h1 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)]">{service.title}</h1>
              <p className="mt-5 leading-relaxed text-[var(--ink-soft)]">{service.intro}</p>
              <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{service.body}</p>
            </Reveal>

            {/* Capabilities & Applications */}
            {(extras.capabilities || extras.applications) && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {extras.capabilities && (
                  <Reveal>
                    <div className="h-full rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand)] text-white"><Layers className="h-5 w-5" /></span>
                        <h3 className="font-display text-xl font-bold uppercase text-[var(--ink)]">Capabilities</h3>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {extras.capabilities.map((c) => (
                          <li key={c} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
                {extras.applications && (
                  <Reveal delay={100}>
                    <div className="h-full rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand)] text-white"><Target className="h-5 w-5" /></span>
                        <h3 className="font-display text-xl font-bold uppercase text-[var(--ink)]">Applications</h3>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {extras.applications.map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" /> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
              </div>
            )}

            {/* Highlights */}
            {extras.highlights && (
              <Reveal className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {extras.highlights.map((h) => (
                  <div key={h} className="flex flex-col items-center gap-2 rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100">
                    <Sparkles className="h-6 w-6 text-[var(--brand)]" />
                    <span className="text-sm font-semibold text-[var(--ink)]">{h}</span>
                  </div>
                ))}
              </Reveal>
            )}

            {/* Material Supply trading list */}
            {service.trading && (
              <Reveal className="mt-10">
                <h2 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">Trading Includes Supplying:</h2>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.trading.map((t) => (
                    <div key={t} className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 ring-1 ring-gray-100">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand)] text-white"><Check className="h-3.5 w-3.5" /></span>
                      <span className="text-sm font-medium text-[var(--ink)]">{t}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {service.products && (
              <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
                {service.products.map((p, i) => (
                  <Reveal key={p.name} delay={(i % 3) * 90}>
                    <div className="svc-card group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                      <div className="h-36 overflow-hidden">
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="px-4 py-3 text-center text-sm font-semibold text-[var(--ink)]">{p.name}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Equipment / Fleet section */}
            {isEquipment && (
              <div className="mt-14">
                <Reveal>
                  <h2 className="font-display text-3xl font-bold uppercase text-[var(--ink)]">Our Equipment & Fleet</h2>
                  <span className="mt-2 block h-1 w-12 bg-[var(--brand)]" />
                  <p className="mt-4 max-w-2xl text-sm text-[var(--ink-soft)]">A representative range of machinery and vehicles available for rental. Contact us to confirm availability and current models.</p>
                </Reveal>
                <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
                  {offeredEquipment.map((e, i) => (
                    <Reveal key={e.id} delay={(i % 3) * 70}>
                      <div className="svc-card group h-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                        <div className="h-32 overflow-hidden sm:h-36">
                          <img src={e.image} alt={e.name} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-bold uppercase text-[var(--ink)]">{e.name}</h3>
                          {e.description && <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{e.description}</p>}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Temporary Facilities section */}
            {isTempFacilities && (
              <div className="mt-14">
                <Reveal>
                  <h2 className="font-display text-3xl font-bold uppercase text-[var(--ink)]">Facility Types We Offer</h2>
                  <span className="mt-2 block h-1 w-12 bg-[var(--brand)]" />
                  <p className="mt-4 max-w-2xl text-sm text-[var(--ink-soft)]">Fully serviced temporary facilities to keep your site running. Contact us to discuss specifications and quantities.</p>
                </Reveal>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {offeredFacilities.map((f, i) => (
                    <Reveal key={f.id} delay={(i % 2) * 100}>
                      <div className="svc-card group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                        <div className="h-48 overflow-hidden">
                          <img src={f.image} alt={f.name} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-display text-xl font-bold uppercase text-[var(--ink)]">{f.name}</h3>
                          {f.description && <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{f.description}</p>}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {!service.products && service.gallery && (
              <div className="mt-14">
                <Reveal>
                  <h2 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">Gallery</h2>
                  <span className="mt-2 block h-1 w-12 bg-[var(--brand)]" />
                </Reveal>
                <div className="mt-6 grid grid-cols-2 gap-5">
                  {service.gallery.map((g, i) => (
                    <Reveal key={i} delay={i * 100} className="overflow-hidden rounded-xl">
                      <img src={g} alt={`${service.title} ${i + 1}`} className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110" />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Related services */}
            <div className="mt-16">
              <Reveal>
                <h2 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">Related Services</h2>
                <span className="mt-2 block h-1 w-12 bg-[var(--brand)]" />
              </Reveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 90}>
                    <Link to={`/services/${r.slug}`} className="svc-card group block h-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                      <div className="h-32 overflow-hidden">
                        <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <span className="text-sm font-bold uppercase text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{r.title}</span>
                        <ArrowRight className="h-4 w-4 text-[var(--brand)]" />
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
              <h2 className="font-display text-xl font-bold uppercase text-[var(--ink)]">All Services</h2>
              <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
              <ul className="mt-5 space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${s.slug === slug ? "bg-[var(--brand)] text-white" : "bg-white text-[var(--ink)] ring-1 ring-gray-100 hover:bg-[var(--brand)] hover:text-white"}`}>
                      {s.title} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl bg-[var(--ink)] p-8 text-center text-white">
              <Phone className="mx-auto h-10 w-10 text-[var(--brand)]" />
              <h3 className="font-display mt-4 text-2xl font-bold uppercase">Need Assistance?</h3>
              <p className="mt-2 text-sm text-gray-400">Talk to our team about your project requirements.</p>
              <div className="mt-4 space-y-1 font-semibold">
                {company.phones.map((p) => <div key={p}>{p}</div>)}
              </div>
              <Link to="/contact" className="btn-brand mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase">
                Get A Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
