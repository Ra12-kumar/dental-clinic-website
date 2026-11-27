import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { imageUrl } from "../data/images.js";
import { serviceMessage, whatsappUrl } from "../lib/links.js";

/** Fades content in on scroll. Content stays visible without JavaScript. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || el.getBoundingClientRect().top < window.innerHeight) return undefined;
    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.classList.remove("reveal-pending");
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => { observer.disconnect(); el.classList.remove("reveal-pending"); };
  }, []);
  // The class list is static so React never overwrites "reveal-pending".
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...props}>{children}</Tag>;
}

/** Responsive, lazy-loaded stock photo with intrinsic size to avoid layout shift. */
export function Photo({ image, sizes = "(max-width: 760px) 100vw, 400px", priority = false, ratio = 0.7, alt, ...props }) {
  const url = (w) => `${imageUrl(image.id, w)}&h=${Math.round(w * ratio)}`;
  return <img
    src={url(900)}
    srcSet={[320, 400, 640, 900, 1200].map((w) => `${url(w)} ${w}w`).join(", ")}
    sizes={sizes}
    width={900}
    height={Math.round(900 * ratio)}
    alt={alt ?? image.alt}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    fetchPriority={priority ? "high" : undefined}
    {...props}
  />;
}

export function SectionHeading({ eyebrow, title, text, centered = false, as: Tag = "h2" }) {
  return <div className={`section-heading ${centered ? "centered" : ""}`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <Tag>{title}</Tag>
    {text && <p>{text}</p>}
  </div>;
}

export function WhatsAppButton({ message, children = "WhatsApp", className = "button button-whatsapp", ...props }) {
  return <a className={className} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" {...props}>
    <MessageCircle size={17} aria-hidden="true" /> {children}
  </a>;
}

export function BookLink({ service, children = "Book Appointment", className = "button button-primary" }) {
  const search = service ? `?service=${service}` : "";
  return <Link className={className} to={{ pathname: "/", search, hash: "#appointment" }}>{children} <ArrowRight size={16} aria-hidden="true" /></Link>;
}

export function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">
    {items.map(([question, answer], index) => {
      const active = open === index;
      return <div className={`faq-item ${active ? "active" : ""}`} key={question}>
        <h3><button type="button" onClick={() => setOpen(active ? -1 : index)} aria-expanded={active}>
          <span>{question}</span><ChevronDown size={19} aria-hidden="true" />
        </button></h3>
        <div className="faq-answer" hidden={!active}><p>{answer}</p></div>
      </div>;
    })}
  </div>;
}

export function ServiceCard({ service, delay = 0, heading: Heading = "h3" }) {
  const path = `/treatments/${service.slug}`;
  return <Reveal as="article" className="service-card" delay={delay}>
    <Link to={path} className="service-image" tabIndex={-1} aria-hidden="true">
      <Photo image={service.image} alt="" sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 290px" />
    </Link>
    <div className="service-body">
      <Heading><Link to={path}>{service.title}</Link></Heading>
      <p>{service.summary}</p>
      <Link className="text-link" to={path} aria-label={`View details: ${service.title}`}>View details <ArrowRight size={15} aria-hidden="true" /></Link>
      <WhatsAppButton message={serviceMessage(service.title)} className="button button-enquire" aria-label={`Enquire on WhatsApp: ${service.title}`}>Enquire on WhatsApp</WhatsAppButton>
    </div>
  </Reveal>;
}
