// Before & After gallery, Testimonials, Why choose us, Facilities
import { useEffect, useRef, useState } from "react";
import { Check, Clock3, HeartHandshake, MessageCircle, Quote, ShieldCheck, Sparkles, Stethoscope, X, ZoomIn } from "lucide-react";
import { beforeAfter, clinic, clinicPhotos, facilities, testimonials } from "../config/clinic.js";
import { reasons, visitChecklist } from "../data/content.js";
import { images, imageUrl } from "../data/images.js";
import { Photo, Reveal, SectionHeading, WhatsAppButton } from "../components/ui.jsx";

const stockGallery = [images.twoChairs, images.orangeChair, images.digitalScan, images.implantModel];

function Gallery() {
  const real = clinicPhotos.length > 0;
  const items = real
    ? clinicPhotos.map((p) => ({ key: p.src, thumb: p.src, full: p.src, alt: p.alt }))
    : stockGallery.map((p) => ({ key: p.id, image: p, full: imageUrl(p.id, 1400), alt: p.alt }));
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  useEffect(() => { if (active) dialog.current?.showModal(); }, [active]);
  return <>
    <h3 className="subheading">{real ? "Inside our clinic" : "Dental care in pictures"}</h3>
    {!real && <p className="footnote centered">Illustrative stock photographs. These are not photos of our clinic or patients.</p>}
    <div className="gallery-grid">
      {items.map((item) => <button type="button" key={item.key} className="gallery-tile" onClick={() => setActive(item)} aria-label={`Enlarge: ${item.alt}`}>
        {item.image ? <Photo image={item.image} alt="" ratio={0.75} sizes="(max-width: 900px) 50vw, 290px" /> : <img src={item.thumb} alt="" loading="lazy" />}
        <ZoomIn size={18} aria-hidden="true" />
      </button>)}
    </div>
    {/* Native dialog gives focus trapping, Escape to close and focus return. */}
    {active && <dialog ref={dialog} className="lightbox" aria-label="Image preview" onClose={() => setActive(null)} onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}>
      <button type="button" onClick={() => dialog.current.close()} aria-label="Close image"><X aria-hidden="true" /></button>
      <img src={active.full} alt={active.alt} />
    </dialog>}
  </>;
}

export function BeforeAfter() {
  return <section id="gallery" className="section">
    <div className="container">
      <SectionHeading centered eyebrow="Before & after gallery" title={<>Real cases, <span>shared with consent</span></>} />
      {beforeAfter.length > 0
        ? <>
            <div className="case-grid">{beforeAfter.map((c) => <figure className="case-card" key={c.title}>
              <div><span><img src={c.before} alt={`Before: ${c.title}`} loading="lazy" /><b>Before</b></span><span><img src={c.after} alt={`After: ${c.title}`} loading="lazy" /><b>After</b></span></div>
              <figcaption><strong>{c.title}</strong>{c.note && <small>{c.note}</small>}</figcaption>
            </figure>)}</div>
            <p className="footnote centered">Individual results vary.</p>
          </>
        : <div className="empty-state">
            <p>We only show before-and-after photographs of our own patients, with their permission. To discuss what may be realistic for you, talk to us.</p>
            <WhatsAppButton message={`Hello ${clinic.doctor}, I would like to discuss what results may be realistic for my smile.`}>Ask about your case</WhatsAppButton>
          </div>}
      <Gallery />
    </div>
  </section>;
}

export function Testimonials() {
  return <section id="testimonials" className="section section-tint">
    <div className="container">
      <SectionHeading centered eyebrow="Patient testimonials" title={<>In our patients' <span>own words</span></>} />
      {testimonials.length > 0
        ? <div className="quote-grid">{testimonials.map((t) => <Reveal as="figure" className="quote-card" key={t.quote}>
            <Quote size={26} aria-hidden="true" /><blockquote>{t.quote}</blockquote>
            <figcaption><strong>{t.name}</strong>{t.treatment && <small>{t.treatment}</small>}</figcaption>
          </Reveal>)}</div>
        : <div className="empty-state">
            <p>We publish only genuine feedback from patients who agree to share it. Visited us? We would value your honest experience.</p>
            <WhatsAppButton message={`Hello ${clinic.doctor}, I would like to share feedback about my visit.`}>Share your feedback</WhatsAppButton>
          </div>}
    </div>
  </section>;
}

const reasonIcons = { clock: Clock3, heart: HeartHandshake, sparkles: Sparkles, stethoscope: Stethoscope, shield: ShieldCheck, message: MessageCircle };

export function WhyChoose() {
  return <section id="why-us" className="section section-navy">
    <div className="container">
      <SectionHeading centered eyebrow="Why choose us?" title={<>A dental visit that feels <span>more human</span></>} text="Good care begins with a conversation. You should feel informed, comfortable and involved at every step." />
      <div className="card-grid three">{reasons.map(([icon, title, text], i) => {
        const Icon = reasonIcons[icon];
        return <Reveal className="info-card" key={title} delay={(i % 3) * 70}><span className="icon-box"><Icon size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></Reveal>;
      })}</div>
    </div>
  </section>;
}

export function Facilities() {
  const listed = facilities.length > 0;
  const items = listed ? facilities.map((f) => [f.title, f.text]) : visitChecklist;
  return <section id="facilities" className="section">
    <div className="container">
      <SectionHeading centered eyebrow="Clinic facilities" title={listed ? <>What you will find <span>at the clinic</span></> : <>Questions worth asking <span>before you visit</span></>} text={listed ? undefined : "Ask us about any of these. We are happy to explain our current facilities and protocols."} />
      <div className="card-grid four">{items.map(([title, text]) => <Reveal className="info-card" key={title}><span className="icon-box"><Check size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
    </div>
  </section>;
}
