import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Clock, Loader2 } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { company } from "../mock/mock";
import { useToast } from "../hooks/use-toast";
import { emailjs, serviceId, contactTemplateId, isEmailConfigured } from "../lib/emailjs";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const submit = async (e) => {
    e.preventDefault();

    if (!isEmailConfigured) {
      toast({
        variant: "destructive",
        title: "Email not configured yet",
        description: "Add your EmailJS keys in frontend/.env to enable message sending.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await emailjs.send(serviceId, contactTemplateId, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });
      toast({ title: "Message sent", description: `Thanks ${form.name}! Our team will get back to you shortly.` });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Could not send message",
        description: "Something went wrong. Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cards = [
    { icon: MapPin, title: "Our Address", lines: [company.address] },
    { icon: Phone, title: "Phone", lines: company.phones },
    { icon: Mail, title: "Email", lines: [company.email] },
    { icon: Clock, title: "Working Hours", lines: [company.hours] },
  ];

  return (
    <div>
      <Seo
        title="Contact Us | ALMAS VERTEX"
        description="Get in touch with ALMAS VERTEX in Ad-Dammam, Saudi Arabia. Contact our contracting and medical divisions for quotes, projects and enquiries."
      />
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} image="https://images.unsplash.com/photo-1511454493857-0a29f2c023c7" />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="group h-full rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
                    <c.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-bold uppercase text-[var(--ink)]">{c.title}</h3>
                  <div className="mt-2 space-y-1 text-sm text-[var(--ink-soft)]">
                    {c.lines.map((l) => <div key={l}>{l}</div>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal variant="left">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Get In Touch</span>
              <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">We Love To Hear From You</h2>
              <p className="mt-4 text-[var(--ink-soft)]">ALMAS VERTEX is conveniently located in Dammam. We welcome visits from clients and partners to discuss projects, collaborations or inquiries.</p>
              <form onSubmit={submit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                </div>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={5} className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                <button type="submit" disabled={submitting} className="btn-brand inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-semibold uppercase tracking-wide disabled:opacity-70">
                  {submitting ? <>Sending <Loader2 className="h-4 w-4 animate-spin" /></> : <>Submit Now <Send className="h-4 w-4" /></>}
                </button>
              </form>
            </Reveal>

            <Reveal variant="right" className="overflow-hidden rounded-2xl ring-1 ring-gray-100">
              <iframe
                title="ALMAS VERTEX location"
                src="https://www.google.com/maps?q=Dammam%20Saudi%20Arabia&output=embed"
                className="h-full min-h-[480px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
