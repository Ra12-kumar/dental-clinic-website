import { clinic } from "../config/clinic.js";

export const whatsappUrl = (message) =>
  `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const generalMessage = `Hello ${clinic.doctor}, I would like to request a dental consultation. Please share the available appointment timings.`;
export const serviceMessage = (title) =>
  `Hello ${clinic.doctor}, I would like to enquire about ${title}. Please share more details and available timings.`;
export const emergencyMessage = `Hello ${clinic.doctor}, I have an urgent dental concern. When is the earliest time I can be seen?`;

export const phoneHref = `tel:+${clinic.phoneCountryCode}${clinic.phone.replace(/\D/g, "")}`;
export const phoneDisplay = `+${clinic.phoneCountryCode} ${clinic.phone}`;
export const location = `${clinic.city}, ${clinic.region}`;
export const fullAddress = [clinic.address, clinic.city, clinic.region, clinic.postalCode, clinic.country]
  .filter(Boolean)
  .join(", ");

/** Only allow https links from configuration. */
export const safeUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};
