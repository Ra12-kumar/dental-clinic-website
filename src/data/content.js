import { clinic } from "../config/clinic.js";
import { images } from "./images.js";

export const articles = [
  { title: "5 Signs You May Need a Root Canal", slug: "root-canal-signs", category: "Understanding treatment", image: images.xray, intro: "Tooth pain, lingering sensitivity, or swelling can have many causes. Learn when it may be helpful to seek a dental assessment." },
  { title: "What Are Dental Implants?", slug: "what-are-dental-implants", category: "Treatment guide", image: images.implantModel, intro: "A simple introduction to dental implants, how they are considered, and the questions to discuss with a dentist." },
  { title: "How to Maintain Healthy Teeth", slug: "healthy-teeth", category: "Everyday care", image: images.toothbrushes, intro: "Consistent daily habits and personalised dental advice can support good oral health." },
  { title: "Why Regular Dental Checkups Matter", slug: "dental-checkups", category: "Prevention", image: images.examination, intro: "Routine dental visits can help your dentist assess your oral health and discuss concerns early." },
  { title: "Braces vs Clear Aligners", slug: "braces-vs-aligners", category: "Treatment guide", image: images.aligner, intro: "Both options may help align teeth. Suitability depends on your teeth, bite, and treatment goals." },
  { title: "Common Causes of Tooth Pain", slug: "tooth-pain-causes", category: "Understanding symptoms", image: images.instruments, intro: "Tooth discomfort can have several causes. A dental examination is needed to identify the source." },
];

export const faqs = [
  ["How can I book a dental appointment?", `Call ${clinic.phone} or send an appointment request using the form on this website. WhatsApp requests are enquiries only; the clinic confirms availability directly.`],
  ["Does submitting the form confirm my appointment?", "No. It opens WhatsApp with your details filled in. After you press send, wait for the clinic to confirm a time."],
  ["How much does treatment cost?", "Cost depends on your individual needs. Fees are explained after an examination, and you can ask for an estimate on WhatsApp."],
  ["What is a root canal treatment?", "It addresses the soft tissue inside a tooth when it is inflamed or infected. A dentist can explain whether it is suitable after examining you."],
  ["Are dental implants suitable for everyone?", "No single treatment is right for everyone. Suitability depends on oral and general health, bone condition and clinical assessment."],
  ["What should I do if I have severe tooth pain?", "Contact a dental professional promptly. If you have facial swelling, difficulty breathing or swallowing, or feel seriously unwell, seek urgent medical care."],
  ["How often should I visit a dentist?", "The right interval depends on your oral health and risk factors. Ask your dentist to recommend a schedule."],
  ["What treatments are available?", `Services shown are for information and are subject to confirmation. Contact ${clinic.doctor} to ask about current services.`],
  ...(clinic.freeConsultationNote
    ? [["Is an initial consultation free?", "A free initial consultation may be available, subject to clinic confirmation and applicable professional requirements."]]
    : []),
];

export const reasons = [
  ["clock", `${clinic.experience} of experience`, "An established background in dentistry."],
  ["heart", "Patient-centred consultation", "Time to hear your concerns and priorities."],
  ["sparkles", "Personalised planning", "Options discussed around your needs."],
  ["stethoscope", "Range of treatments", "Many care options to explore together."],
  ["shield", "Hygiene questions welcome", "Ask us about our hygiene and sterilisation protocols."],
  ["message", "Clear communication", "Understand proposed care before you decide."],
];

export const visitChecklist = [
  ["Hygiene and sterilisation", "How are instruments cleaned and sterilised between patients?"],
  ["Diagnostics", "What examinations or imaging might be needed for your concern?"],
  ["Comfort", "What can be done to keep you comfortable during treatment?"],
  ["Access", "Ask about parking, step-free entry and waiting arrangements."],
];
