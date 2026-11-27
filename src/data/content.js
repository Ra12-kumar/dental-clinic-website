import { clinic } from "../config/clinic.js";
import { images } from "./images.js";

export const articles = [
  { title: "5 Signs You May Need a Root Canal", slug: "root-canal-signs", related: ["root-canal","crowns-bridges"], sections: [["The five signs to mention","Tell your dentist about toothache that lingers, sensitivity to hot or cold that continues after the trigger is gone, pain when biting, swelling or tenderness of the gum near one tooth, and a tooth that has darkened. These signs can have other causes, and some infected teeth cause no symptoms at all."],["How a dentist checks","Diagnosis usually involves looking at the tooth, gently testing how it responds and, where appropriate, taking an X-ray. Only then can your dentist say whether root canal treatment or another option is suitable."]], category: "Understanding treatment", image: images.xray, intro: "Tooth pain, lingering sensitivity, or swelling can have many causes. Learn when it may be helpful to seek a dental assessment." },
  { title: "What Are Dental Implants?", slug: "what-are-dental-implants", related: ["dental-implants","dentures","crowns-bridges"], sections: [["The parts of an implant","An implant system generally has a post placed in the jawbone, a connector and a replacement tooth fitted on top. The replacement may be a single crown, or implants may support a bridge or denture."],["Questions to ask before deciding","Ask whether you have enough healthy bone, how your general health and habits such as smoking affect suitability, how many visits are expected, what it will cost and which alternatives you could choose."]], category: "Treatment guide", image: images.implantModel, intro: "A simple introduction to dental implants, how they are considered, and the questions to discuss with a dentist." },
  { title: "How to Maintain Healthy Teeth", slug: "healthy-teeth", related: ["scaling-polishing","gum-treatment"], sections: [["Daily habits","Brush twice a day with a fluoride toothpaste, reaching every surface and the gum line. Clean between teeth once a day with floss or interdental brushes, and replace a worn toothbrush."],["Food, drink and tobacco","Frequent sugary snacks and drinks give decay-causing bacteria more opportunities to act. Drinking water and avoiding tobacco help protect teeth and gums."]], category: "Everyday care", image: images.toothbrushes, intro: "Consistent daily habits and personalised dental advice can support good oral health." },
  { title: "Why Regular Dental Checkups Matter", slug: "dental-checkups", related: ["scaling-polishing","gum-treatment"], sections: [["What may happen at a visit","A check-up can include a review of your health and medicines, an examination of teeth, gums and soft tissues, and X-rays when they are needed. You can raise any concern, however small it seems."],["Why timing matters","Early decay and gum disease often cause little or no discomfort. Finding problems early can mean more options, so ask your dentist how often you should be seen."]], category: "Prevention", image: images.examination, intro: "Routine dental visits can help your dentist assess your oral health and discuss concerns early." },
  { title: "Braces vs Clear Aligners", slug: "braces-vs-aligners", related: ["braces-aligners","smile-makeover"], sections: [["How they differ","Braces are fixed to the teeth and adjusted by your clinician. Clear aligners are removable trays changed in a planned sequence, and they only work when worn for the hours advised."],["Choosing between them","Consider the kind of tooth movement you need, cleaning, diet restrictions with fixed braces, your ability to wear trays consistently, appearance and cost. An orthodontic assessment shows which are realistic for you."]], category: "Treatment guide", image: images.aligner, intro: "Both options may help align teeth. Suitability depends on your teeth, bite, and treatment goals." },
  { title: "Common Causes of Tooth Pain", slug: "tooth-pain-causes", related: ["root-canal","gum-treatment","tooth-extraction"], sections: [["Possible causes","Tooth pain may come from decay, a cracked tooth or loose filling, gum inflammation, an abscess, grinding, or a wisdom tooth coming through. Sinus problems can also be felt in the upper teeth."],["What to note before your visit","Note which area hurts, when it started, what makes it better or worse and whether there is swelling or fever. Seek urgent care for spreading swelling or difficulty breathing or swallowing."]], category: "Understanding symptoms", image: images.instruments, intro: "Tooth discomfort can have several causes. A dental examination is needed to identify the source." },
];

export const faqs = [
  ["How can I book a dental appointment?", `Call +${clinic.phoneCountryCode} ${clinic.phone} or send an appointment request using the form on this website. WhatsApp requests are enquiries only; the clinic confirms availability directly.`],
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
