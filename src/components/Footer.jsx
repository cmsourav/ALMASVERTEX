import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { company, services, medicalCategories } from "../mock/mock";

const socialIcon = { facebook: Facebook, twitter: Twitter, linkedin: Linkedin, instagram: Instagram };

export default function Footer() {
  return (
    <footer className="bg-white text-[var(--ink-soft)] border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div>
              <img
                src="/logo.png"
                alt="Almasvertex logo"
                loading="lazy"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)]">
              Delivering top-notch construction, contracting and medical supply solutions across the Kingdom — with precision, integrity and an unwavering focus on safety.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {company.socials.map((s) => {
                const Icon = socialIcon[s.name];
                return (
                  <a key={s.name} href={s.url} aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-[var(--ink)] hover:bg-[var(--brand)] hover:text-white hover:border-[var(--brand)] transition-all">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--ink)]">Company</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-3 text-sm">
              {[["Home", "/"], ["About Us", "/about"], ["Medical Division", "/about-medical"], ["Company Profile", "/company-profile"], ["Careers", "/career"], ["Contact", "/contact"]].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors font-medium">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contracting Services (all 7) */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--ink)]">Contracting</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors font-medium">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Products (all 10) */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--ink)]">Medical Products</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-3 text-sm">
              {medicalCategories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors font-medium">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--ink)]">Get In Touch</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-4 text-sm text-[var(--ink-soft)]">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" /> {company.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />
                <span className="flex flex-col">
                  {company.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-[var(--ink)] hover:underline">{p}</a>)}
                </span>
              </li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" /> <a href={`mailto:${company.email}`} className="hover:text-[var(--ink)] hover:underline">{company.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-[var(--ink-soft)] font-medium">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
