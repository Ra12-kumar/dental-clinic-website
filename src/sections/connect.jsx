// Emergency, Social media, Articles, FAQ, Contact and map
import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Clock3, Facebook, Instagram, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { clinic, instagramPosts } from "../config/clinic.js";
import { articles, faqs } from "../data/content.js";
import { images } from "../data/images.js";
import { emergencyMessage, fullAddress, generalMessage, phoneDisplay, phoneHref, safeUrl, whatsappUrl } from "../lib/links.js";
import { FaqList, Photo, SectionHeading, WhatsAppButton } from "../components/ui.jsx";

function ShareButton() {
  const share = () => {
    const page = window.location.origin + window.location.pathname;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(page)}`, "_blank", "noopener,noreferrer");
  };
  return <button type="button" className="button button-outline" onClick={share}><Share2 size={16} aria-hidden="true" /> Share on Facebook</button>;
}

const guides = [
  [images.toothbrushes, "Daily oral care habits", "/articles/healthy-teeth"],
  [images.aligner, "Braces vs clear aligners", "/articles/braces-vs-aligners"],
  [images.implantModel, "What are dental implants?", "/articles/what-are-dental-implants"],
  [images.examination, "Why check-ups matter", "/articles/dental-checkups"],
];

export function Social() {
  const instagram = safeUrl(clinic.social.instagram);
  const facebook = safeUrl(clinic.social.facebook);
  const posts = instagramPosts.filter((p) => safeUrl(p.url));
  return <section id="social" className="section section-tint">
    <div className="container social-grid">
      <div className="social-panel">
        <SectionHeading eyebrow={posts.length ? "Instagram" : "Smile tips"} title={posts.length ? "From our Instagram" : "Smile tips and guides"} />
        <div className="insta-grid">
          {posts.length
            ? posts.map((p) => <a key={p.url} href={safeUrl(p.url)} target="_blank" rel="noopener noreferrer"><img src={p.image} alt={p.caption} loading="lazy" /><span>{p.caption}</span></a>)
            : guides.map(([image, caption, to]) => <Link key={to} to={to}><Photo image={image} alt="" ratio={1} sizes="(max-width: 600px) 50vw, 180px" /><span>{caption}</span></Link>)}
        </div>
        {instagram
          ? <a className="button button-instagram" href={instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17} aria-hidden="true" /> Follow us on Instagram</a>
          : <p className="footnote">Our Instagram link will be added soon.</p>}
      </div>
      <div className="social-panel">
        <SectionHeading eyebrow="Facebook" title="Stay connected" text="Know someone looking for a dentist? Share this page with them." />
        <div className="button-row">
          {facebook && <a className="button button-facebook" href={facebook} target="_blank" rel="noopener noreferrer"><Facebook size={17} aria-hidden="true" /> Follow us on Facebook</a>}
          <ShareButton />
        </div>
        {!facebook && <p className="footnote">Our Facebook page link will be added soon.</p>}
      </div>
    </div>
  </section>;
}

export function ArticleCard({ article, heading: Heading = "h3" }) {
  return <Link className="article-card" to={`/articles/${article.slug}`}>
    <Photo image={article.image} alt="" ratio={0.6} />
    <div><span>{article.category}</span><Heading>{article.title}</Heading><p>{article.intro}</p><b>Read article <ArrowRight size={14} aria-hidden="true" /></b></div>
  </Link>;
}

export function Articles() {
  return <section id="journal" className="section">
    <div className="container">
      <SectionHeading centered eyebrow="The smile journal" title={<>A little more about <span>oral health</span></>} />
      <div className="card-grid three">{articles.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
      <p className="center-action"><Link className="text-link" to="/articles">Explore all articles <ArrowRight size={16} aria-hidden="true" /></Link></p>
    </div>
  </section>;
}

export function FaqSection() {
  return <section id="faqs" className="section section-tint">
    <div className="container faq-grid">
      <div>
        <SectionHeading eyebrow="Frequently asked questions" title={<>Your questions, <span>answered</span></>} text="A few helpful notes before you get in touch." />
        <WhatsAppButton message={generalMessage}>Ask us another</WhatsAppButton>
      </div>
      <FaqList items={faqs} />
    </div>
  </section>;
}

export function Emergency() {
  return <section className="emergency" aria-labelledby="emergency-title">
    <div className="container">
      <AlertCircle size={34} aria-hidden="true" />
      <div>
        <h2 id="emergency-title">Dental emergency enquiry</h2>
        <p>{clinic.emergencyNote} For difficulty breathing or swallowing, rapidly spreading swelling or heavy bleeding, go to a hospital immediately.</p>
      </div>
      <div className="button-row">
        <a className="button button-light" href={phoneHref}><Phone size={16} aria-hidden="true" /> Call now</a>
        <WhatsAppButton message={emergencyMessage}>Urgent enquiry</WhatsAppButton>
      </div>
    </div>
  </section>;
}

export function Contact() {
  const [showMap, setShowMap] = useState(false);
  const rows = [
    [MapPin, "Address", fullAddress, !clinic.address && "Message us for the exact address and directions."],
    [Phone, "Phone", <a href={phoneHref} key="phone">{phoneDisplay}</a>],
    [Clock3, "Clinic timings", clinic.hours.length ? clinic.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>) : "Please contact us for current timings."],
    ...(clinic.email ? [[Mail, "Email", <a href={`mailto:${clinic.email}`} key="email">{clinic.email}</a>]] : []),
  ];
  const query = encodeURIComponent(clinic.address ? `${clinic.practice}, ${fullAddress}` : `${clinic.practice} ${clinic.city}`);
  const embed = safeUrl(clinic.mapEmbedUrl) || (clinic.address ? `https://www.google.com/maps?q=${query}&output=embed` : "");
  return <section id="contact" className="section">
    <div className="container split">
      <div>
        <SectionHeading eyebrow="Contact us" title={<>Visit {clinic.doctor} <span>in {clinic.city}</span></>} text="Ask about services, clinic details or appointment availability." />
        <ul className="contact-list">{rows.map(([Icon, label, value, note]) => <li key={label}>
          <span className="icon-box"><Icon size={20} aria-hidden="true" /></span>
          <div><small>{label}</small><strong>{value}</strong>{note && <small>{note}</small>}</div>
        </li>)}</ul>
        <div className="button-row">
          <a className="button button-primary" href={phoneHref}><Phone size={16} aria-hidden="true" /> Call now</a>
          <WhatsAppButton message={generalMessage} />
        </div>
      </div>
      <div id="location" className="map-card">
        <h3>Google Maps location</h3>
        {embed && showMap
          ? <iframe src={embed} title={`Map showing ${clinic.practice}`} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          : <div className="map-placeholder">
              <MapPin size={42} aria-hidden="true" />
              <p>{embed ? fullAddress : "Our exact map pin has not been published yet. Message us and we will send directions."}</p>
              {embed
                ? <button type="button" className="button button-outline" onClick={() => setShowMap(true)}>Load map</button>
                : <a className="button button-outline" href={whatsappUrl("Hello, please share the clinic address and map location.")} target="_blank" rel="noopener noreferrer">Request directions</a>}
            </div>}
        <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer">{clinic.address ? "Open in Google Maps" : "Search on Google Maps"} <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
