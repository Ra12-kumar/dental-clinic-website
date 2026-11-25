import { clinic } from "../config/clinic.js";

export const emptyBooking = { name: "", mobile: "", email: "", service: "", date: "", time: "", message: "" };

const pad = (n) => String(n).padStart(2, "0");
/** Local (not UTC) YYYY-MM-DD, so "today" is correct in India. */
export const todayString = (now = new Date()) => `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

export const normaliseMobile = (value) => {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
};

export function validateBooking(values, now = new Date()) {
  const errors = {};
  const name = values.name.trim();
  if (name.length < 2 || !/\p{L}/u.test(name)) errors.name = "Enter the patient's full name.";
  if (!/^[\d\s()+-]+$/.test(values.mobile) || !/^[6-9]\d{9}$/.test(normaliseMobile(values.mobile)))
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.service) errors.service = "Choose a service, or “Not sure yet”.";
  const today = todayString(now);
  if (!values.date) errors.date = "Choose a preferred date.";
  else if (values.date < today) errors.date = "Choose today or a later date.";
  if (!values.time) errors.time = "Choose a preferred time.";
  else if (values.date === today && values.time <= `${pad(now.getHours())}:${pad(now.getMinutes())}`)
    errors.time = "Choose a time later than now.";
  if (values.message.length > 500) errors.message = "Keep your message under 500 characters.";
  return errors;
}

const formatDate = (value) => value.split("-").reverse().join("/");
const formatTime = (value) => {
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;
};
const oneLine = (value) => value.replace(/\s+/g, " ").trim();

export const bookingMessage = (values) =>
  [
    `Hello ${clinic.doctor}, I would like to request a dental appointment.`,
    `Name: ${oneLine(values.name)}`,
    `Mobile: ${normaliseMobile(values.mobile)}`,
    `Email: ${values.email.trim()}`,
    `Service: ${values.service}`,
    `Preferred date: ${formatDate(values.date)}`,
    `Preferred time: ${formatTime(values.time)}`,
    values.message.trim() ? `Message: ${values.message.trim()}` : "",
    "Please confirm availability.",
  ].filter(Boolean).join("\n");
