import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, ShieldCheck } from "lucide-react";
import { clinic, prices } from "../config/clinic.js";
import { getService, services } from "../data/services.js";
import { articles } from "../data/content.js";
import { phoneDisplay, phoneHref, serviceMessage } from "../lib/links.js";
import { BookLink, FaqList, Photo, SectionHeading, ServiceCard, WhatsAppButton } from "../components/ui.jsx";
import { ArticleCard } from "../sections/connect.jsx";

const Back = ({ to, children }) => <Link className="back-link" to={to}><ArrowLeft size={15} aria-hidden="true" /> {children}</Link>;

export function ServicesPage() {
  return <section className="section">
    <div className="container">
      <Back to="/">Home</Back>
      <SectionHeading as="h1" centered eyebrow={`Dental clinic in ${clinic.city}`} title={<>Dental services in <span>{clinic.city}</span></>} text="Read about each treatment and ask us any questions. Availability and suitability are confirmed by the clinic." />
      <div className="service-grid">{services.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
    </div>
  </section>;
}

export function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;
  const sections = [["What is it?", service.intro], ["When might you need it?", service.when], ["How is it performed?", service.procedure], ["What should you expect?", service.expect], ["Recovery and aftercare", service.aftercare]];
  const related = [1, 2, 3].map((n) => services[(services.indexOf(service) + n) % services.length]);
  return <article key={slug}>
    <header className="detail-hero">
      <div className="container split">
        <div>
          <Back to="/services">All services</Back>
          <span className="eyebrow">Treatment guide</span>
          <h1>{service.title} in {clinic.city}</h1>
          <p>{service.intro}</p>
          <p><strong>Fee:</strong> {prices[slug] || "Quoted after examination"}</p>
          <div className="button-row">
            <BookLink service={slug}>Book this service</BookLink>
            <WhatsAppButton message={serviceMessage(service.title)}>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </div>
        <figure>
          <Photo image={service.image} priority sizes="(max-width: 900px) 100vw, 580px" />
          <figcaption>Illustrative stock photo</figcaption>
        </figure>
      </div>
    </header>
    <div className="container detail-layout section">
      <div>
        {sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
        <div className="disclaimer"><ShieldCheck size={20} aria-hidden="true" /><p>General education only. Suitability depends on an individual examination. Discuss benefits, risks and alternatives with your dentist.</p></div>
        <h2>Common questions about {service.title.toLowerCase()}</h2>
        <FaqList items={service.faqs} />
      </div>
      <aside>
        <h2>Have questions?</h2>
        <p>Contact the clinic to ask about availability.</p>
        <BookLink service={slug}>Request appointment</BookLink>
        <a className="text-link" href={phoneHref}><Phone size={15} aria-hidden="true" /> {phoneDisplay}</a>
      </aside>
    </div>
    <section className="section section-tint">
      <div className="container">
        <SectionHeading centered title="Related services" />
        <div className="service-grid three">{related.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
      </div>
    </section>
  </article>;
}

export function ArticlesPage() {
  return <section className="section">
    <div className="container">
      <Back to="/">Home</Back>
      <SectionHeading as="h1" eyebrow="The smile journal" title={<>Dental health, <span>made clearer</span></>} text="Patient education articles to support informed conversations with your dentist." />
      <div className="card-grid three">{articles.map((a) => <ArticleCard key={a.slug} article={a} heading="h2" />)}</div>
      <p className="footnote">Educational content does not replace professional advice.</p>
    </div>
  </section>;
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return <article className="section">
    <div className="container prose">
      <Back to="/articles">All articles</Back>
      <span className="eyebrow">{article.category}</span>
      <h1>{article.title}</h1>
      <p className="lead">{article.intro}</p>
      <Photo image={article.image} ratio={0.55} priority sizes="(max-width: 800px) 100vw, 780px" />
      <p>Symptoms and dental needs differ from person to person, so general information cannot tell you what is happening in your individual case.</p>
      <h2>What should you keep in mind?</h2>
      <p>Notice changes in your teeth or gums and share your concerns with a dentist, who can examine you, explain possible causes and discuss next steps.</p>
      <h2>When should you ask for advice?</h2>
      <p>For persistent pain, swelling, injury or another concern, contact a dental professional. Seek urgent medical attention for difficulty breathing or swallowing.</p>
      <p>Read more about our <Link to="/services">dental services in {clinic.city}</Link>.</p>
      <div className="disclaimer"><ShieldCheck size={20} aria-hidden="true" /><p>For general education only; not a substitute for professional advice, diagnosis or treatment.</p></div>
      <BookLink>Ask {clinic.doctor}</BookLink>
    </div>
  </article>;
}

export function PolicyPage({ disclaimer = false }) {
  return <section className="section">
    <div className="container prose">
      <Back to="/">Home</Back>
      <h1>{disclaimer ? "Medical Disclaimer" : "Privacy Policy"}</h1>
      {disclaimer ? <>
        <p>Website information is for general education and is not dental or medical advice, diagnosis or treatment. It cannot replace a consultation with a qualified dental professional.</p>
        <p>Treatment availability, suitability, results, risks, recovery and timing vary. Contact the clinic to confirm current services and consultation policies.</p>
        <p>If you have a dental emergency or serious symptoms, seek appropriate urgent care.</p>
      </> : <>
        <p>This website does not store appointment form details. They are placed into a WhatsApp message only when you submit the form, and reach the clinic only if you send it. No appointment is automatically created or confirmed.</p>
        <p>WhatsApp, Facebook, Instagram and Google Maps handle information under their own privacy terms. Photos and fonts are loaded from Unsplash and Google Fonts, which receive standard technical request data.</p>
        <p>Avoid including sensitive health information unless you are comfortable sharing it. Contact the clinic with questions about how your information is handled.</p>
      </>}
    </div>
  </section>;
}

export function NotFound() {
  return <section className="section">
    <div className="container prose">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <div className="button-row"><Link className="button button-primary" to="/">Go to home page</Link><Link className="button button-outline" to="/services">View services</Link></div>
    </div>
  </section>;
}
