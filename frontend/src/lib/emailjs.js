import emailjs from "@emailjs/browser";

const {
  REACT_APP_EMAILJS_PUBLIC_KEY: publicKey,
  REACT_APP_EMAILJS_SERVICE_ID: serviceId,
  REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID: contactTemplateId,
  REACT_APP_EMAILJS_CAREER_TEMPLATE_ID: careerTemplateId,
} = process.env;

// True only when every required EmailJS value is present.
export const isEmailConfigured = Boolean(
  publicKey && serviceId && contactTemplateId && careerTemplateId
);

// Initialise once (safe no-op if key is missing).
if (publicKey) {
  emailjs.init({ publicKey });
}

export { emailjs, serviceId, contactTemplateId, careerTemplateId };
