import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, CalendarDays, Facebook, Instagram, Menu, MessageCircle, Phone, Smile, X } from "lucide-react";
import { clinic } from "../config/clinic.js";
import { services } from "../data/services.js";
import { fullAddress, generalMessage, location as place, phoneDisplay, phoneHref, safeUrl, whatsappUrl } from "../lib/links.js";
import { BookLink } from "./ui.jsx";

const navItems = [
  ["Home", "home"], ["About", "about"], ["Services", "treatments"], ["Pricing", "pricing"],
  ["Gallery", "gallery"], ["FAQs", "faqs"], ["Contact", "contact"],
];
const homeAnchor = (id) => ({ pathname: "/", hash: `#${id}` });

function Logo() {
  return <Link to="/" className="brand" aria-label={`${clinic.practice} home`}>
    <span className="brand-mark"><Smile size={23} strokeWidth={2.2} aria-hidden="true" /></span>
    <span className="brand-copy"><strong>{clinic.doctor}</strong><small>Dental Care</small></span>
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { key } = useLocation();
  useEffect(() => setOpen(false), [key]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="site-header">
    <div className="topline">
      <span>Dental care in {place}</span>
      <a href={phoneHref}><Phone size={13} aria-hidden="true" /> {phoneDisplay}</a>
    </div>
    <div className="nav-wrap container">
      <Logo />
      <button type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="main-nav">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="main-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {navItems.map(([label, id]) => <Link key={id} to={homeAnchor(id)}>{label}</Link>)}
        <BookLink className="button button-primary nav-cta"><CalendarDays size={16} aria-hidden="true" /> Book Appointment</BookLink>
      </nav>
    </div>
  </header>;
}

function SocialLinks() {
  const links = [
    ["Instagram", safeUrl(clinic.social.instagram), Instagram],
    ["Facebook", safeUrl(clinic.social.facebook), Facebook],
    ["WhatsApp", whatsappUrl(generalMessage), MessageCircle],
  ].filter(([, url]) => url);
  return <div className="social-links">
    {links.map(([label, url, Icon]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${clinic.practice} on ${label}`}><Icon size={18} aria-hidden="true" /></a>)}
  </div>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Logo />
        <p>Patient-focused dental care and clear conversations in {place}.</p>
        <a href={phoneHref}><Phone size={15} aria-hidden="true" /> {phoneDisplay}</a>
        <SocialLinks />
      </div>
      <nav aria-label="Explore"><h2>Explore</h2>
        {[["About the clinic", "about"], ["Our specialists", "specialists"], ["Why choose us", "why-us"], ["Testimonials", "testimonials"], ["Facilities", "facilities"], ["FAQs", "faqs"]].map(([label, id]) => <Link key={id} to={homeAnchor(id)}>{label}</Link>)}
        <Link to="/articles">Articles</Link>
      </nav>
      <nav aria-label="Services"><h2>Services</h2>
        {services.slice(0, 6).map((s) => <Link key={s.slug} to={`/treatments/${s.slug}`}>{s.title}</Link>)}
        <Link to="/services">All dental services</Link>
      </nav>
      <div><h2>Find us</h2>
        <address>{fullAddress}</address>
        {clinic.hours.map((h) => <span key={h.days}>{h.days}: {h.time}</span>)}
        {clinic.email && <a href={`mailto:${clinic.email}`}>{clinic.email}</a>}
        <Link to={homeAnchor("location")}>Map and directions</Link>
        <Link to={homeAnchor("appointment")}>Request an appointment</Link>
      </div>
    </div>
    <div className="container footer-legal">
      <span>© {new Date().getFullYear()} {clinic.practice}</span>
      <div><Link to="/privacy">Privacy Policy</Link><Link to="/disclaimer">Medical Disclaimer</Link></div>
    </div>
    <p className="container footer-disclaimer">Information on this website is educational and is not a substitute for professional dental advice, diagnosis or treatment. Treatment suitability and availability must be confirmed by the clinic.</p>
  </footer>;
}

export function FloatingControls() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>
    <a className="floating-whatsapp" href={whatsappUrl(generalMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat with the clinic on WhatsApp"><MessageCircle size={27} aria-hidden="true" /></a>
    {visible && <button type="button" className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={19} aria-hidden="true" /></button>}
    <nav className="mobile-bar" aria-label="Quick actions">
      <a href={phoneHref}><Phone size={17} aria-hidden="true" /> Call</a>
      <a href={whatsappUrl(generalMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</a>
      <Link to={homeAnchor("appointment")}><CalendarDays size={17} aria-hidden="true" /> Book</Link>
    </nav>
  </>;
}
