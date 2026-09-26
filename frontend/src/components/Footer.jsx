import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Gem, ArrowRight } from "lucide-react";
import { company, services, medicalCategories } from "../mock/mock";

const socialIcon = { facebook: Facebook, twitter: Twitter, linkedin: Linkedin, instagram: Instagram };

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-gray-400">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand)]">
                <Gem className="h-6 w-6 text-white" strokeWidth={2.2} />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-wide">
                <span className="text-white">ALMAS</span><span className="text-[var(--brand)]">VERTEX</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed">
              Delivering top-notch construction, contracting and medical supply solutions across the Kingdom — with precision, integrity and an unwavering focus on safety.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {company.socials.map((s) => {
                const Icon = socialIcon[s.name];
                return (
                  <a key={s.name} href={s.url} aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--brand)] transition-colors">
                    <Icon className="h-4 w-4 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-white">Company</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-3 text-sm">
              {[["Home", "/"], ["About Us", "/about"], ["Medical Division", "/about-medical"], ["Company Profile", "/company-profile"], ["Careers", "/career"], ["Contact", "/contact"]].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="inline-flex items-center gap-2 hover:text-[var(--brand)] transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contracting Services (all 7) */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-white">Contracting</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 hover:text-[var(--brand)] transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Products (all 10) */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-white">Medical Products</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-3 text-sm">
              {medicalCategories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="inline-flex items-center gap-2 hover:text-[var(--brand)] transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" /> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl font-bold uppercase tracking-wide text-white">Get In Touch</h4>
            <span className="mt-2 block h-1 w-10 bg-[var(--brand)]" />
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" /> {company.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />
                <span className="flex flex-col">
                  {company.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-white">{p}</a>)}
                </span>
              </li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" /> <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
