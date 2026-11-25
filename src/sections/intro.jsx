// Hero, About, Specialists, Services, Pricing
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Check, Clock3, HeartHandshake, MapPin, Stethoscope } from "lucide-react";
import { clinic, clinicPhotos, prices, specialists } from "../config/clinic.js";
import { services } from "../data/services.js";
import { images } from "../data/images.js";
import { generalMessage, location, serviceMessage } from "../lib/links.js";
import { BookLink, Photo, Reveal, SectionHeading, ServiceCard, WhatsAppButton } from "../components/ui.jsx";

export function Hero() {
  const real = clinicPhotos[0];
  return <section id="home" className="hero">
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">Dental clinic in {clinic.city}</span>
        <h1>Dentist in {clinic.city} for <em>healthy, confident</em> smiles.</h1>
        <p>Meet {clinic.doctor}, a dental professional with {clinic.experience} of experience, offering patient-focused dental care in {location}.</p>
        <ul className="check-list">
          {[`${clinic.experience} of experience`, "Personalised treatment planning", "Clear explanations before you decide"].map((t) => <li key={t}><Check size={18} aria-hidden="true" /> {t}</li>)}
        </ul>
        <div className="button-row">
          <BookLink />
          <WhatsAppButton message={generalMessage}>Chat on WhatsApp</WhatsAppButton>
        </div>
      </div>
      <figure className="hero-visual">
        {real ? <img src={real.src} alt={real.alt} fetchPriority="high" /> : <Photo image={images.consultation} ratio={1} priority sizes="(max-width: 900px) 100vw, 560px" />}
        <div className="float-card"><BadgeCheck size={22} aria-hidden="true" /><span><strong>{clinic.experience}</strong><small>of dental experience</small></span></div>
        {!real && <figcaption>Illustrative stock photo</figcaption>}
      </figure>
    </div>
  </section>;
}

export function About() {
  const real = clinicPhotos[1] || clinicPhotos[0];
  const facts = [
    [Clock3, clinic.experience, "Experience in dentistry"],
    [HeartHandshake, "Patient-first", "Unhurried conversations"],
    [Stethoscope, `${services.length} services`, "Options to discuss"],
    [MapPin, clinic.city, `${clinic.region}, ${clinic.country}`],
  ];
  return <section id="about" className="section">
    <div className="container split">
      <Reveal as="figure" className="framed">
        {real ? <img src={real.src} alt={real.alt} loading="lazy" /> : <Photo image={images.operatory} ratio={0.85} sizes="(max-width: 900px) 100vw, 580px" />}
        {!real && <figcaption>Illustrative stock photo, not our clinic</figcaption>}
      </Reveal>
      <Reveal>
        <SectionHeading eyebrow="About our dental clinic" title={<>Care that starts with <span>listening</span></>} text={`${clinic.practice} focuses on clear conversations and treatment planned around each patient in ${clinic.city}.`} />
        <p className="body-copy">Every smile has its own story. We take time to understand your concerns, explain the possible options along with their limits, and let you decide at your own pace.</p>
        <ul className="fact-grid">
          {facts.map(([Icon, title, text]) => <li key={text}><span className="icon-box"><Icon size={20} aria-hidden="true" /></span><span><strong>{title}</strong><small>{text}</small></span></li>)}
        </ul>
        <BookLink>Book a Consultation</BookLink>
      </Reveal>
    </div>
  </section>;
}

export function Specialists() {
  return <section id="specialists" className="section section-tint">
    <div className="container">
      <SectionHeading centered eyebrow="Our dental specialists" title={<>The people behind <span>your care</span></>} />
      <div className="specialist-list">
        {specialists.map((doctor) => <Reveal as="article" className="specialist-card" key={doctor.name}>
          {doctor.photo
            ? <img className="specialist-photo" src={doctor.photo} alt={`${doctor.name}, ${doctor.role}`} loading="lazy" />
            : <span className="specialist-photo monogram" aria-hidden="true">{doctor.name.replace(/^Dr\.?\s*/, "").charAt(0)}</span>}
          <div>
            <h3>{doctor.name}</h3>
            <p className="specialist-role">{doctor.role} · {doctor.experience}</p>
            <p>{doctor.bio}</p>
            <dl>
              <div><dt>Qualifications:</dt><dd>{doctor.qualifications || "Please ask the clinic"}</dd></div>
              {doctor.registration && <div><dt>Registration no.:</dt><dd>{doctor.registration}</dd></div>}
            </dl>
            <BookLink>Consult {doctor.name}</BookLink>
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

export function Services() {
  return <section id="treatments" className="section">
    <div className="container">
      <SectionHeading centered eyebrow="Dental services" title={<>Dental care in {clinic.city} for <span>every stage</span></>} text="Choose a service to read what it involves, or ask us about it on WhatsApp. All services are subject to clinic confirmation." />
      <div className="service-grid">{services.map((s, i) => <ServiceCard key={s.slug} service={s} delay={(i % 4) * 60} />)}</div>
    </div>
  </section>;
}

export function Pricing() {
  return <section id="pricing" className="section section-tint">
    <div className="container narrow">
      <SectionHeading centered eyebrow="Treatment details and pricing" title={<>Understand your care <span>before you decide</span></>} text="Fees depend on your examination and treatment plan. Ask for an estimate before treatment starts." />
      <Reveal className="price-table">
        <table>
          <caption className="sr-only">Dental treatments and fees</caption>
          <thead><tr><th scope="col">Treatment</th><th scope="col">Fee</th><th scope="col"><span className="sr-only">Enquire</span></th></tr></thead>
          <tbody>{services.map((s) => <tr key={s.slug}>
            <th scope="row"><Link to={`/treatments/${s.slug}`}>{s.title}</Link></th>
            <td>{prices[s.slug] || "Quoted after examination"}</td>
            <td><WhatsAppButton className="text-link" message={serviceMessage(`the fee for ${s.title}`)} aria-label={`Ask about the fee for ${s.title}`}>Ask</WhatsAppButton></td>
          </tr>)}</tbody>
        </table>
      </Reveal>
      <p className="footnote centered">Your final estimate follows a clinical assessment. <Link to={{ pathname: "/", hash: "#appointment" }}>Request a consultation <ArrowRight size={13} aria-hidden="true" /></Link></p>
    </div>
  </section>;
}
