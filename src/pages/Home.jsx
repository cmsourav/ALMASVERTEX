import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Target, Compass, Quote } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import StatsBar from "../components/StatsBar";
import Reveal from "../components/Reveal";
import { services, medical, testimonials } from "../mock/mock";

export default function Home() {
  return (
    <div>
      <HeroSlider />

      {/* Who we are */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal variant="left" className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1652303518379-c0ef1c9fb2b1?w=960&q=80&auto=format&fit=crop" alt="Almasvertex team" loading="lazy" className="h-[480px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden rounded-xl bg-[var(--brand)] px-8 py-6 text-white shadow-2xl md:block">
              <div className="font-display text-5xl font-extrabold">18+</div>
              <div className="text-sm uppercase tracking-wide">Years of Excellence</div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Welcome to Almasvertex</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">
              Who We Are: A Commitment to Excellence
            </h2>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">
              At Almasvertex, we are committed to delivering top-notch construction and contracting solutions tailored to meet the diverse needs of our clients.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              With years of experience in the industry, we specialise in high-quality human resource management, material supplies, equipment rental, scaffolding, civil construction and backfilling materials. Our skilled team ensures every project is executed with precision, integrity and a focus on safety.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Quality Assurance", "Certified Experts", "On-Time Delivery", "Sustainable Practices"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-[var(--ink)]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]"><ArrowRight className="h-3.5 w-3.5" /></span>
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-brand mt-9 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Our Purpose</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Vision of Empowerment, Mission of Inspiration</h2>
            <p className="mt-4 text-[var(--ink-soft)]">Driven by a vision of progress and a mission of excellence, we are committed to shaping a brighter future through innovation, collaboration and dedication.</p>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[{ icon: Compass, title: "Our Vision", text: "To be the leading provider of comprehensive construction and contracting solutions in the region — recognised for excellence, innovation and delivering projects that exceed client expectations." },
              { icon: Target, title: "Our Mission", text: "To deliver exceptional value through quality workmanship, reliable services and sustainable practices. We foster long-term partnerships by understanding and exceeding our clients' expectations." }].map((c, i) => (
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

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">What We Do</span>
              <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Our Services</h2>
            </div>
            <p className="max-w-md text-[var(--ink-soft)]">A single, trusted partner for every stage of your project — from manpower and materials to civil construction and equipment.</p>
          </Reveal>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <Link to={`/services/${s.slug}`} className="svc-card group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl font-bold uppercase text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">Learn More <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Medical division */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">About Company</span>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-[var(--ink)] md:text-5xl">Delivering Care Through Reliable Medical Solutions</h2>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">{medical.intro}</p>
            <Link to="/about-medical" className="btn-brand mt-8 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide">
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal variant="right" className="grid grid-cols-2 gap-4">
            {medical.categories.map((c, i) => (
              <div key={c.name} className={`overflow-hidden rounded-2xl ${i % 2 === 1 ? "mt-8" : ""}`}>
                <img src={c.image} alt={c.name} loading="lazy" className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Testimonials</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">What Our Clients Say</h2>
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Quote className="h-10 w-10 text-[var(--brand)]/25" />
                  <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{t.text}</p>
                  <div className="mt-6 flex items-center gap-4 border-t pt-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand)] font-display text-xl font-bold text-white">{t.name.charAt(0)}</span>
                    <div>
                      <div className="font-semibold text-[var(--ink)]">{t.name}</div>
                      <div className="text-sm text-[var(--ink-soft)]">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[var(--brand)] py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-center text-white md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">Ready To Build Something Great?</h2>
            <p className="mt-3 max-w-2xl text-white/90">Partner with Almasvertex for reliable, safe and high-quality construction solutions across the Kingdom.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--brand)] transition-transform duration-300 hover:-translate-y-1">
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
