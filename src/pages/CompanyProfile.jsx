import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Building2, HeartPulse, ShieldCheck, FileText } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { useToast } from "../hooks/use-toast";
import { companyProfile, company, services, medicalCategories } from "../mock/mock";

const sectionIcons = [Building2, HeartPulse, ShieldCheck];

export default function CompanyProfile() {
  const { toast } = useToast();

  const handleDownload = (e) => {
    if (!companyProfile.pdfUrl) {
      e.preventDefault();
      toast({
        title: "Company profile coming soon",
        description: "The official Almasvertex company profile PDF will be available here shortly.",
      });
    }
  };

  return (
    <div>
      <Seo
        title="Company Profile | Almasvertex"
        description="Download or view the Almasvertex company profile — a diversified contracting and medical supplies group serving the Kingdom of Saudi Arabia."
      />
      <PageBanner title="Company Profile" crumbs={[{ label: "Company Profile" }]} image="https://images.unsplash.com/photo-1597390838451-9d4001598e12" />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-14 lg:grid-cols-[1fr_360px]">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Who We Are</span>
              <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">{companyProfile.headline}</h1>
              <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">{companyProfile.intro}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {companyProfile.sections.map((s, i) => {
                  const Icon = sectionIcons[i % sectionIcons.length];
                  return (
                    <div key={s.title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)] text-white"><Icon className="h-6 w-6" /></span>
                      <h3 className="font-display mt-5 text-xl font-bold uppercase text-[var(--ink)]">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Sectors overview */}
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">Contracting Sectors</h3>
                  <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
                  <ul className="mt-4 space-y-2 text-sm">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--brand)]">
                          <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[var(--ink)]">Medical Categories</h3>
                  <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
                  <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    {medicalCategories.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/${c.slug}`} className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--brand)]">
                          <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Sidebar: download + facts */}
            <Reveal variant="right" className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-[var(--ink)] p-8 text-center text-white">
                <FileText className="mx-auto h-12 w-12 text-[var(--brand)]" />
                <h3 className="font-display mt-4 text-2xl font-bold uppercase">Download Profile</h3>
                <p className="mt-2 text-sm text-gray-400">Get the complete Almasvertex company profile document.</p>
                <a
                  href={companyProfile.pdfUrl || "#"}
                  onClick={handleDownload}
                  target={companyProfile.pdfUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  download={companyProfile.pdfUrl ? true : undefined}
                  className="btn-brand mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold uppercase tracking-wide"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </a>
                {!companyProfile.pdfUrl && (
                  <p className="mt-3 text-xs text-gray-500">PDF will be available soon.</p>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h4 className="font-display text-lg font-bold uppercase text-[var(--ink)]">At A Glance</h4>
                <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
                <dl className="mt-4 space-y-3">
                  {companyProfile.highlights.map((h) => (
                    <div key={h.label} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <dt className="text-sm text-[var(--ink-soft)]">{h.label}</dt>
                      <dd className="text-sm font-semibold text-[var(--ink)]">{h.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 text-sm text-[var(--ink-soft)]">{company.address}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
