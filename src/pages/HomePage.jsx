import { About, Hero, Pricing, Services, Specialists } from "../sections/intro.jsx";
import { BeforeAfter, Facilities, Testimonials, WhyChoose } from "../sections/trust.jsx";
import { Articles, Contact, Emergency, FaqSection, Social } from "../sections/connect.jsx";
import Appointment from "../sections/Appointment.jsx";

export default function HomePage() {
  return <>
    <Hero /><About /><Specialists /><Services /><Pricing /><BeforeAfter /><Testimonials />
    <WhyChoose /><Facilities /><Appointment /><Emergency /><Social /><Articles /><FaqSection /><Contact />
  </>;
}
