import React, { useRef, useState } from "react";
import { MapPin, Briefcase, Building2, ArrowRight, UploadCloud, FileText, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { careers, company } from "../mock/mock";
import { useToast } from "../hooks/use-toast";
import { emailjs, serviceId, careerTemplateId, isEmailConfigured } from "../lib/emailjs";

const ACCEPTED = [".pdf", ".doc", ".docx"];
const MAX_BYTES = 5 * 1024 * 1024;

export default function Career() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", cover_letter: "" });
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);
  const { toast } = useToast();

  const applyFor = (title) => {
    setForm((f) => ({ ...f, position: title }));
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateFile = (f) => {
    if (!f) return "Please attach your resume / CV.";
    const ext = "." + f.name.split(".").pop().toLowerCase();
    if (!ACCEPTED.includes(ext)) return "Unsupported file type. Use PDF, DOC or DOCX.";
    if (f.size > MAX_BYTES) return "File is too large. Maximum size is 5MB.";
    if (f.size === 0) return "The selected file appears to be empty.";
    return "";
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) { setFileName(""); setFileError(""); return; }
    const err = validateFile(f);
    setFileError(err);
    setFileName(err ? "" : f.name);
    if (err && fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0] || null;
    const err = validateFile(file);
    if (err) { setFileError(err); return; }

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
      await emailjs.sendForm(serviceId, careerTemplateId, formRef.current);
      toast({ title: "Application submitted", description: `Thank you ${form.name}, we'll review your application and be in touch.` });
      setForm({ name: "", email: "", phone: "", position: "", cover_letter: "" });
      setFileName("");
      setFileError("");
      formRef.current?.reset();
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
        title="Careers | Almasvertex"
        description="Join Almasvertex. Explore open roles across our contracting and medical divisions in Ad-Dammam, Saudi Arabia and apply online with your resume."
      />
      <PageBanner title="Career" crumbs={[{ label: "Career" }]} image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" />

      {/* Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Join Our Team</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Join Our Team At Almasvertex</h2>
            <p className="mt-6 leading-relaxed text-[var(--ink-soft)]">
              At Almasvertex, we believe our success is driven by our talented and dedicated team. We are always on the lookout for passionate individuals who are eager to contribute to our mission of delivering exceptional construction, contracting and medical supply solutions. Whether you are an experienced professional or just starting out, we offer a dynamic environment that fosters growth, collaboration and innovation.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
              Joining Almasvertex means becoming part of a community that values hard work, integrity and excellence. We offer competitive packages, benefits and genuine opportunities for advancement. If you are ready to take the next step and make a meaningful impact, explore our current openings and apply today. Together, we can build a brighter future.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Current openings */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Opportunities</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Current Openings</h2>
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
                  <button onClick={() => applyFor(job.title)} className="btn-brand mt-6 inline-flex w-max items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section ref={formSectionRef} className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand)]">Apply Online</span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase text-[var(--ink)] md:text-5xl">Submit Your Application</h2>
            <p className="mt-4 text-[var(--ink-soft)]">Fill in your details, attach your CV and our team will get back to you.</p>
          </Reveal>

          <Reveal className="mt-10">
            <form ref={formRef} onSubmit={submit} encType="multipart/form-data" className="space-y-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email Address" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
                <input required name="position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position Applying For" className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />
              </div>

              {/* Resume upload (attached via EmailJS) */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept={ACCEPTED.join(",")}
                  onChange={onFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                {!fileName ? (
                  <label
                    htmlFor="resume-upload"
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-7 text-center transition-colors ${fileError ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-[var(--brand)] hover:bg-gray-50"}`}
                  >
                    <UploadCloud className="h-7 w-7 text-[var(--brand)]" />
                    <span className="text-sm font-medium text-[var(--ink)]">Upload Resume / CV</span>
                    <span className="text-xs text-[var(--ink-soft)]">PDF, DOC or DOCX · Max 5MB</span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText className="h-6 w-6 shrink-0 text-[var(--brand)]" />
                      <div className="truncate text-sm font-medium text-[var(--ink)]">{fileName}</div>
                    </div>
                    <label htmlFor="resume-upload" className="shrink-0 cursor-pointer text-xs font-semibold text-[var(--brand)] hover:underline">Replace</label>
                  </div>
                )}
                {fileError && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" /> {fileError}
                  </p>
                )}
                {fileName && !fileError && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Resume attached
                  </p>
                )}
              </div>

              <textarea name="cover_letter" value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} placeholder="Cover message (optional)" rows={4} className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[var(--brand)]" />

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
