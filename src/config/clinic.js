/**
 * CLINIC SETTINGS: edit this file to update the website.
 *
 * Only add details the clinic has confirmed. Anything left as "" or [] is
 * handled gracefully on the site (nothing is invented). After editing, run
 * `npm run build` again.
 */
export const clinic = {
  doctor: "Dr. Kalvinder",
  practice: "Dr. Kalvinder Dental Care",
  city: "Hisar",
  region: "Haryana",
  country: "India",

  // Your live domain without a trailing slash, e.g. "https://www.example.com".
  // Needed for canonical URLs, social previews and sitemap.xml.
  siteUrl: "",

  // Phone as displayed, and WhatsApp number as country code + number, digits only.
  phone: "7988351175",
  phoneCountryCode: "91",
  whatsapp: "917988351175",
  email: "",

  experience: "8 years",
  qualifications: "", // e.g. "BDS, MDS (…)"
  registration: "", // Dental Council registration number

  address: "", // Street address, e.g. "Shop 1, … Road"
  postalCode: "",
  // Google Maps: Share > Embed a map > copy only the src="…" URL.
  // If left empty and `address` is set, a map is generated from the address.
  mapEmbedUrl: "",

  // Opening hours, e.g. [{ days: "Monday – Saturday", time: "10:00 AM – 7:00 PM",
  //   schema: "Mo-Sa 10:00-19:00" }]  (`schema` is optional, used by Google)
  hours: [],

  social: {
    instagram: "", // https://www.instagram.com/your_profile
    facebook: "", // https://www.facebook.com/your_page
  },

  // Set to false to remove the free-consultation mention.
  freeConsultationNote: true,

  // Emergency enquiry block. Do not claim 24/7 cover unless it is true.
  emergencyNote:
    "For severe tooth pain, a broken or knocked-out tooth, or swelling, call or message the clinic to ask about the earliest available time.",
};

/**
 * Doctors shown under "Our Dental Specialists".
 * `photo`: put a real photograph in /public/images and use "/images/name.jpg".
 */
export const specialists = [
  {
    name: "Dr. Kalvinder",
    role: "Dental professional",
    experience: "8 years of experience",
    qualifications: clinic.qualifications,
    registration: clinic.registration,
    photo: "",
    bio: "Takes time to understand your concerns, explain possible options and help you make informed decisions about your dental care.",
  },
];

/**
 * Prices, keyed by service slug, e.g. { "scaling-polishing": "From ₹800" }.
 * Services without a price show "Quoted after examination".
 */
export const prices = {};

/** Genuine, consented patient feedback only: { quote, name, treatment } */
export const testimonials = [];

/** Real cases with written patient consent: { before, after, title, note } (image paths) */
export const beforeAfter = [];

/** Verified facilities only: { title, text } */
export const facilities = [];

/** Real clinic photographs: { src: "/images/….jpg", alt, label }. Replaces stock imagery. */
export const clinicPhotos = [];

/** Instagram posts to feature: { image: "/images/….jpg", url: "https://www.instagram.com/p/…", caption } */
export const instagramPosts = [];
