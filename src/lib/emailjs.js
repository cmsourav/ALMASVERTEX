import emailjs from "@emailjs/browser";

const publicKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_EMAILJS_PUBLIC_KEY);
const serviceId =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_SERVICE_ID) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_EMAILJS_SERVICE_ID);
const contactTemplateId =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_CONTACT_TEMPLATE_ID) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID);
const careerTemplateId =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_CAREER_TEMPLATE_ID) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_EMAILJS_CAREER_TEMPLATE_ID);

// True only when every required EmailJS value is present.
export const isEmailConfigured = Boolean(
  publicKey && serviceId && contactTemplateId && careerTemplateId
);

// Initialise once (safe no-op if key is missing).
if (publicKey) {
  emailjs.init({ publicKey });
}

export { emailjs, serviceId, contactTemplateId, careerTemplateId };
