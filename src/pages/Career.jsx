import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { company } from "../mock/mock";
import { useToast } from "../hooks/use-toast";
import { emailjs, serviceId, careerTemplateId, isEmailConfigured } from "../lib/emailjs";

export default function Career() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", cover_letter: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const submit = async (e) => {
    e.preventDefault();

    if (!isEmailConfigured) {
      toast({
        variant: "destructive",
        title: "Email not configured yet",
        description: "Add your EmailJS keys in frontend/.env to enable applications.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await emailjs.send(serviceId, careerTemplateId, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        cover_letter: form.cover_letter,
      });
      toast({ title: "Application submitted", description: `Thank you ${form.name}, we'll review your application and be in touch.` });
      setForm({ name: "", email: "", phone: "", position: "", cover_letter: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "We couldn't submit your application. Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Seo
        title="Careers | ALMAS VERTEX"
        description="Join ALMAS VERTEX. Apply online to join our contracting and medical divisions in Ad-Dammam, Saudi Arabia."
      />
      <PageBanner title="Career" crumbs={[{ label: "Career" }]} image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" />

      {/* Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Join Our Team</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Join Our Team At ALMAS VERTEX</h2>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">
              At ALMAS VERTEX, we believe our success is driven by our talented and dedicated team. We are always on the lookout for passionate individuals who are eager to contribute to our mission of delivering exceptional construction, contracting and medical supply solutions. Whether you are an experienced professional or just starting out, we offer a dynamic environment that fosters growth, collaboration and innovation.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              Joining ALMAS VERTEX means becoming part of a community that values hard work, integrity and excellence. We offer competitive packages, benefits and genuine opportunities for advancement. If you are ready to take the next step and make a meaningful impact, apply today. Together, we can build a brighter future.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Application form */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Apply Online</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Submit Your Application</h2>
            <p className="mt-4 text-[var(--ink-soft)]">Fill in your details and our team will get back to you.</p>
          </Reveal>

          <Reveal className="mt-10">
            <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email Address" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                <input required name="position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position Applying For" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
              </div>

              <textarea name="cover_letter" value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} placeholder="Cover message (optional)" rows={5} className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />

              <button type="submit" disabled={submitting} className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 text-sm font-semibold uppercase tracking-wide disabled:opacity-70">
                {submitting ? <>Submitting <Loader2 className="h-4 w-4 animate-spin" /></> : <>Submit Application <Send className="h-4 w-4" /></>}
              </button>
              <p className="text-center text-xs text-[var(--ink-soft)]">
                Or email your CV directly to <a href={`mailto:${company.email}`} className="font-medium text-[var(--brand)] hover:underline">{company.email}</a>
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
