import { useState } from "react";
import api from "../api/api";
import "../components/Contact/Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await api.post("/contact/", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("Thanks! Your message was received.");
    } catch {
      setStatus("Your message could not be sent. Please try again.");
    } finally { setLoading(false); }
  }
  return <main className="contact">
    <section className="contact-hero"><h1>Contact Timberly</h1><p>Have questions? We're here to help.</p></section>
    <div className="contact-container">
      <section className="contact-info"><h2>Get in touch</h2>
        <p>Thrissur, Kerala</p><p>support@timberly.com</p>
      </section>
      <form className="contact-form" onSubmit={submit}>
        <h2>Send us a message</h2>
        <input aria-label="Your name" placeholder="Your name" required maxLength={120} value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input aria-label="Email" type="email" placeholder="Your email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input aria-label="Subject" placeholder="Subject" required maxLength={180} value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        <textarea aria-label="Message" placeholder="Your message" rows="5" required maxLength={5000} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} />
        {status && <p role="status">{status}</p>}
        <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send message"}</button>
      </form>
    </div>
  </main>;
}
export default Contact;
