import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Target, ShieldCheck } from "lucide-react";
import PageBanner from "../components/PageBanner";
import StatsBar from "../components/StatsBar";
import Reveal from "../components/Reveal";
import { whyChoose } from "../mock/mock";

export default function About() {
  return (
    <div>
      <PageBanner title="About Us" crumbs={[{ label: "About Us" }]} image="https://images.unsplash.com/photo-1597390838451-9d4001598e12" />

      {/* Intro */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal variant="left" className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" alt="Almasvertex" className="h-[460px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-xl bg-white px-6 py-5 shadow-2xl ring-1 ring-gray-100 md:flex">
              <ShieldCheck className="h-10 w-10 text-[var(--brand)]" />
              <div>
                <div className="font-display text-xl font-bold text-[var(--ink)]">Safety First</div>
                <div className="text-sm text-[var(--ink-soft)]">Certified & Compliant</div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">About Almasvertex</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">Leaders In Construction Solutions</h2>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">
              At Almasvertex, we are dedicated to providing exceptional construction and contracting solutions tailored to meet the diverse needs of our clients. With extensive experience in the industry, we have established a strong reputation for delivering high-quality services — including material supply, equipment rental, scaffolding, civil construction, backfilling materials and temporary facilities.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              We prioritise sustainability and environmentally responsible practices. By incorporating eco-friendly methods and materials, we not only reduce our environmental impact but also provide innovative solutions that add value to our clients' projects.
            </p>
            <Link to="/contact" className="btn-brand mt-8 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Our Key Points</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Why Choose Us</h2>
            <p className="mt-5 leading-relaxed text-[var(--ink-soft)]">
              We understand that choosing the right contractor is crucial for the success of your project. Our unwavering commitment to quality, safety and client satisfaction sets us apart. With a skilled team and comprehensive services, we tailor solutions to your unique needs.
            </p>
            <div className="mt-8 space-y-4">
              {whyChoose.map((w, i) => (
                <Reveal key={w.title} delay={i * 90}>
                  <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-transform duration-300 hover:translate-x-1.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)] font-display font-bold text-white">{i + 1}</span>
                    <div>
                      <h4 className="font-semibold text-[var(--ink)]">{w.title}</h4>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">{w.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" className="overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77" alt="Why choose Almasvertex" className="h-[640px] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <StatsBar />

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Our Purpose</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Vision Of Empowerment, Mission Of Inspiration</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[{ icon: Compass, title: "Our Vision", text: "To be the leading provider of comprehensive construction and contracting solutions in the region, recognised for our commitment to excellence, innovation and delivering projects that exceed client expectations." },
            { icon: Target, title: "Our Mission", text: "To deliver exceptional value to our clients through quality workmanship, reliable services and sustainable practices. We aim to foster long-term partnerships by understanding and exceeding expectations." }].map((c, i) => (
              <Reveal key={c.title} delay={i * 120} variant={i === 0 ? "left" : "right"}>
                <div className="group h-full rounded-2xl bg-white p-9 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand)] text-white"><c.icon className="h-7 w-7" /></span>
                  <h3 className="font-display mt-6 text-2xl font-bold uppercase text-[var(--ink)]">{c.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
