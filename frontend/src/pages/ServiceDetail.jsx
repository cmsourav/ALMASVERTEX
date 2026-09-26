import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check, Phone } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { services, company } from "../mock/mock";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/" replace />;

  return (
    <div>
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
              <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)]">{service.title}</h2>
              <p className="mt-5 leading-relaxed text-[var(--ink-soft)]">{service.intro}</p>
              <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{service.body}</p>
            </Reveal>

            {service.trading && (
              <Reveal className="mt-10">
                <h3 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">Trading Includes Supplying:</h3>
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

            {!service.products && service.gallery && (
              <div className="mt-10 grid grid-cols-2 gap-5">
                {service.gallery.map((g, i) => (
                  <Reveal key={i} delay={i * 100} className="overflow-hidden rounded-xl">
                    <img src={g} alt={`${service.title} ${i + 1}`} className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110" />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
              <h3 className="font-display text-xl font-bold uppercase text-[var(--ink)]">All Services</h3>
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
              <h4 className="font-display mt-4 text-2xl font-bold uppercase">Need Assistance?</h4>
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
