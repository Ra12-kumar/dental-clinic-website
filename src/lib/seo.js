// Per-page metadata, shared by the browser and the build-time prerender.
import { clinic } from "../config/clinic.js";
import { services } from "../data/services.js";
import { articles } from "../data/content.js";
import { images, imageUrl } from "../data/images.js";
import { safeUrl } from "./links.js";

const { city, practice, doctor } = clinic;
export const siteUrl = clinic.siteUrl.replace(/\/+$/, "");

const page = (path, title, description, image = images.consultation) => ({
  path, title, description, image: imageUrl(image.id, 1200),
});

export const pages = [
  page("/", `Dentist in ${city} | Dental Clinic – ${practice}`, `Looking for a dentist in ${city}? ${practice} offers dental care including teeth whitening, root canal and implants. Request an appointment on WhatsApp.`),
  page("/services", `Dental Services in ${city} | ${practice}`, `Dental services in ${city}: cleaning, whitening, root canal, implants, braces, crowns, dentures, children's dentistry and more.`, images.operatory),
  ...services.map((s) => page(`/treatments/${s.slug}`, `${s.title} in ${city} | ${practice}`, `${s.title} in ${city}: ${s.summary} Learn what to expect and enquire with ${doctor}.`, s.image)),
  page("/articles", `Dental Health Articles | ${practice}`, `General dental health articles and treatment guides from ${practice} in ${city}.`, images.toothbrushes),
  ...articles.map((a) => page(`/articles/${a.slug}`, `${a.title} | ${practice}`, a.intro, a.image)),
  page("/privacy", `Privacy Policy | ${practice}`, `How enquiry details are handled on the ${practice} website.`),
  page("/disclaimer", `Medical Disclaimer | ${practice}`, `Medical disclaimer for the ${practice} website.`),
];

const notFound = { ...page("/404", `Page not found | ${practice}`, "The page you requested could not be found."), noindex: true };

export const getMeta = (pathname) =>
  pages.find((p) => p.path === (pathname.replace(/\/+$/, "") || "/")) || notFound;

export function structuredData() {
  const sameAs = Object.values(clinic.social).map(safeUrl).filter(Boolean);
  const openingHours = clinic.hours.map((h) => h.schema).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: practice,
    telephone: `+${clinic.phoneCountryCode}${clinic.phone}`,
    address: {
      "@type": "PostalAddress",
      ...(clinic.address && { streetAddress: clinic.address }),
      ...(clinic.postalCode && { postalCode: clinic.postalCode }),
      addressLocality: city,
      addressRegion: clinic.region,
      addressCountry: "IN",
    },
    areaServed: city,
    ...(siteUrl && { url: siteUrl, "@id": `${siteUrl}/#clinic` }),
    ...(clinic.email && { email: clinic.email }),
    ...(openingHours.length > 0 && { openingHours }),
    ...(sameAs.length > 0 && { sameAs }),
  };
  // Escape "<" so the JSON cannot close its own <script> tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** [attribute, key, content] for every meta tag a page needs. */
export function metaTags(meta) {
  const url = siteUrl ? `${siteUrl}${meta.path}` : "";
  return {
    canonical: meta.noindex ? "" : url,
    tags: [
      ["name", "description", meta.description],
      ["name", "robots", meta.noindex ? "noindex" : "index, follow"],
      ["property", "og:type", "website"],
      ["property", "og:site_name", practice],
      ["property", "og:locale", "en_IN"],
      ["property", "og:title", meta.title],
      ["property", "og:description", meta.description],
      ["property", "og:image", meta.image],
      ...(url ? [["property", "og:url", url]] : []),
      ["name", "twitter:card", "summary_large_image"],
    ],
  };
}

export function applyMeta(meta) {
  document.title = meta.title;
  const { tags, canonical } = metaTags(meta);
  const upsert = (selector, create) => document.head.querySelector(selector) || document.head.appendChild(create());
  for (const [attr, key, content] of tags) {
    upsert(`meta[${attr}="${key}"]`, () => {
      const el = document.createElement("meta");
      el.setAttribute(attr, key);
      return el;
    }).setAttribute("content", content);
  }
  if (!canonical) document.head.querySelector('link[rel="canonical"]')?.remove();
  else upsert('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" })).href = canonical;
}
