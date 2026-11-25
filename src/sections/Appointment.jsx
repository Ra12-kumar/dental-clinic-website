import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarDays, Phone, ShieldCheck } from "lucide-react";
import { services, getService } from "../data/services.js";
import { bookingMessage, emptyBooking, todayString, validateBooking } from "../lib/booking.js";
import { phoneDisplay, phoneHref, whatsappUrl } from "../lib/links.js";

function Field({ label, name, error, optional, full, children }) {
  return <div className={`field ${full ? "full" : ""}`}>
    <label htmlFor={`booking-${name}`}>{label}{optional && <span> (optional)</span>}</label>
    {children}
    {error && <p className="field-error" id={`booking-${name}-error`}>{error}</p>}
  </div>;
}

export default function Appointment() {
  const [params] = useSearchParams();
  const requested = getService(params.get("service"))?.title || "";
  const [values, setValues] = useState(emptyBooking);
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState("");
  const [today, setToday] = useState(""); // set in the browser, not at build time
  const form = useRef(null);

  useEffect(() => setToday(todayString()), []);
  // A "Book" link for a service pre-selects it.
  useEffect(() => {
    if (requested) setValues((v) => ({ ...v, service: requested }));
  }, [requested]);

  const bind = (name) => ({
    id: `booking-${name}`,
    name,
    value: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `booking-${name}-error` : undefined,
    onChange: (event) => {
      setValues((v) => ({ ...v, [name]: event.target.value }));
      setErrors((e) => ({ ...e, [name]: undefined }));
      setSentUrl("");
    },
  });

  const submit = (event) => {
    event.preventDefault();
    const found = validateBooking(values);
    setErrors(found);
    const first = Object.keys(emptyBooking).find((key) => found[key]);
    if (first) {
      setSentUrl("");
      form.current.elements[first].focus();
      return;
    }
    const url = whatsappUrl(bookingMessage(values));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return <section id="appointment" className="section section-booking">
    <div className="container booking-grid">
      <div className="booking-copy">
        <span className="eyebrow">Appointment booking</span>
        <h2>One small step toward a healthier smile.</h2>
        <p>Fill in your details and WhatsApp opens with your request ready to send. The clinic then replies to confirm availability.</p>
        <p className="booking-note">Sending a request does not confirm an appointment.</p>
        <a className="booking-call" href={phoneHref}><Phone size={18} aria-hidden="true" /> Prefer to call? <strong>{phoneDisplay}</strong></a>
      </div>
      <form ref={form} className="booking-form" onSubmit={submit} noValidate aria-label="Appointment request">
        <h3><CalendarDays size={20} aria-hidden="true" /> Request an appointment</h3>
        <div className="form-grid">
          <Field label="Patient name" name="name" error={errors.name}><input {...bind("name")} autoComplete="name" maxLength={80} required /></Field>
          <Field label="Mobile number" name="mobile" error={errors.mobile}><input {...bind("mobile")} type="tel" autoComplete="tel" maxLength={16} placeholder="10-digit mobile" required /></Field>
          <Field label="Email address" name="email" error={errors.email}><input {...bind("email")} type="email" autoComplete="email" maxLength={120} required /></Field>
          <Field label="Dental service" name="service" error={errors.service}>
            <select {...bind("service")} required>
              <option value="">Select a service</option>
              {services.map((s) => <option key={s.slug}>{s.title}</option>)}
              <option>Not sure yet</option>
            </select>
          </Field>
          <Field label="Preferred date" name="date" error={errors.date}><input {...bind("date")} type="date" min={today || undefined} required /></Field>
          <Field label="Preferred time" name="time" error={errors.time}><input {...bind("time")} type="time" required /></Field>
          <Field label="Additional message" name="message" error={errors.message} optional full><textarea {...bind("message")} rows={3} maxLength={500} /></Field>
        </div>
        <button type="submit" className="button button-primary submit">Send request on WhatsApp <ArrowRight size={16} aria-hidden="true" /></button>
        <p className="form-privacy"><ShieldCheck size={14} aria-hidden="true" /> This website does not store your details. They reach the clinic only when you send the WhatsApp message.</p>
        <div aria-live="polite">
          {Object.values(errors).some(Boolean) && <p className="form-status error">Please correct the highlighted fields.</p>}
          {sentUrl && <p className="form-status success">Your request is ready. <strong>Press send in WhatsApp</strong> to deliver it. Your appointment is not confirmed until the clinic replies. WhatsApp did not open? <a href={sentUrl} target="_blank" rel="noopener noreferrer">Open it here</a>.</p>}
        </div>
      </form>
    </div>
  </section>;
}
