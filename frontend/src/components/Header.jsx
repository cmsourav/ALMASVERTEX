import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram,
  ChevronDown, Menu, X, Gem, ArrowRight,
} from "lucide-react";
import { company, services } from "../mock/mock";

const socialIcon = { facebook: Facebook, twitter: Twitter, linkedin: Linkedin, instagram: Instagram };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mAbout, setMAbout] = useState(false);
  const [mSectors, setMSectors] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const Logo = (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand)] shadow-lg shadow-red-600/30">
        <Gem className="h-6 w-6 text-white" strokeWidth={2.2} />
      </span>
      <span className="font-display text-2xl font-extrabold leading-none tracking-wide">
        <span className="text-[var(--ink)]">ALMAS</span>
        <span className="text-[var(--brand)]">VERTEX</span>
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="hidden md:block bg-[var(--ink)] text-gray-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4 text-[var(--brand)]" /> {company.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--brand)]" /> {company.shortAddress}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--brand)]" /> {company.hours}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {company.socials.map((s) => {
              const Icon = socialIcon[s.name];
              return (
                <a key={s.name} href={s.url} aria-label={s.name}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--brand)] transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`w-full bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {Logo}

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-[15px]">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active text-[var(--brand)]" : "text-[var(--ink)]"} hover:text-[var(--brand)] transition-colors`}>Home</NavLink>

            {/* About dropdown */}
            <div className="group relative">
              <button className="nav-link flex items-center gap-1 text-[var(--ink)] hover:text-[var(--brand)] transition-colors">
                About <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full pt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                <div className="w-60 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-2xl">
                  <Link to="/about" className="dropdown-item block px-5 py-2.5 text-[var(--ink-soft)]">About Us</Link>
                  <Link to="/about-medical" className="dropdown-item block px-5 py-2.5 text-[var(--ink-soft)]">Medical Division</Link>
                </div>
              </div>
            </div>

            {/* Business Sectors dropdown */}
            <div className="group relative">
              <button className="nav-link flex items-center gap-1 text-[var(--ink)] hover:text-[var(--brand)] transition-colors">
                Business Sectors <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full pt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                <div className="w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-2xl">
                  {services.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="dropdown-item block px-5 py-2.5 text-[var(--ink-soft)]">{s.title}</Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/career" className={({ isActive }) => `nav-link ${isActive ? "active text-[var(--brand)]" : "text-[var(--ink)]"} hover:text-[var(--brand)] transition-colors`}>Career</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active text-[var(--brand)]" : "text-[var(--ink)]"} hover:text-[var(--brand)] transition-colors`}>Contact</NavLink>
          </nav>

          <div className="hidden lg:block">
            <Link to="/contact" className="btn-brand inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide">
              Company Profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-[var(--ink)]" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between border-b px-5 py-4">
            {Logo}
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex flex-col px-5 py-4 text-[15px] font-medium">
            <Link to="/" className="border-b py-3">Home</Link>

            <button onClick={() => setMAbout((v) => !v)} className="flex items-center justify-between border-b py-3">
              About <ChevronDown className={`h-4 w-4 transition-transform ${mAbout ? "rotate-180" : ""}`} />
            </button>
            {mAbout && (
              <div className="flex flex-col bg-gray-50">
                <Link to="/about" className="border-b py-2.5 pl-4 text-[var(--ink-soft)]">About Us</Link>
                <Link to="/about-medical" className="border-b py-2.5 pl-4 text-[var(--ink-soft)]">Medical Division</Link>
              </div>
            )}

            <button onClick={() => setMSectors((v) => !v)} className="flex items-center justify-between border-b py-3">
              Business Sectors <ChevronDown className={`h-4 w-4 transition-transform ${mSectors ? "rotate-180" : ""}`} />
            </button>
            {mSectors && (
              <div className="flex flex-col bg-gray-50">
                {services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="border-b py-2.5 pl-4 text-[var(--ink-soft)]">{s.title}</Link>
                ))}
              </div>
            )}

            <Link to="/career" className="border-b py-3">Career</Link>
            <Link to="/contact" className="border-b py-3">Contact</Link>
            <Link to="/contact" className="btn-brand mt-5 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase">
              Company Profile <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
