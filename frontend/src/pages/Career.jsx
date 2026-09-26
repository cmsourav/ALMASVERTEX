import React, { useState } from "react";
import { MapPin, Briefcase, Building2, ArrowRight, X } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { careers } from "../mock/mock";
import { useToast } from "../hooks/use-toast";

export default function Career() {
  const [active, setActive] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();
    toast({ title: "Application submitted", description: `Thank you ${form.name}, we'll review your application for ${active.title}.` });
    setActive(null);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div>
      <PageBanner title="Career" crumbs={[{ label: "Career" }]} image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Join Our Team</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Build Your Career With Us</h2>
            <p className="mt-4 text-[var(--ink-soft)]">We're always looking for talented, safety-focused professionals to help us deliver excellence across the Kingdom.</p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {careers.map((job, i) => (
              <Reveal key={job.title} delay={(i % 2) * 100}>
                <div className="group flex flex-col justify-between rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-bold uppercase text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{job.title}</h3>
                      <span className="rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">{job.type}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-[var(--ink-soft)]">
                      <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[var(--brand)]" /> {job.dept}</span>
                      <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--brand)]" /> {job.location}</span>
                      <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[var(--brand)]" /> {job.type}</span>
                    </div>
                  </div>
                  <button onClick={() => setActive(job)} className="btn-brand mt-6 inline-flex w-max items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apply modal */}
      {active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setActive(null)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
            <button onClick={() => setActive(null)} className="absolute right-5 top-5 text-gray-400 hover:text-[var(--brand)]"><X className="h-6 w-6" /></button>
            <h3 className="font-display text-3xl font-bold uppercase text-[var(--ink)]">Apply: {active.title}</h3>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{active.dept} · {active.location}</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" />
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email Address" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" />
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Cover message (optional)" rows={3} className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" />
              <button type="submit" className="btn-brand w-full rounded-md px-6 py-3.5 text-sm font-semibold uppercase tracking-wide">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
