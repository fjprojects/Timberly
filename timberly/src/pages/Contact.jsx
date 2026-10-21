import "../components/Contact/Contact.css";
import Navbar from "../components/Navbar/Navbar";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact">
        <section className="contact-hero">
          <h1>Contact Timberly</h1>
          <p>
            Have questions? We are here to help you with your furniture needs.
          </p>
        </section>

        <section className="contact-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>

            <p>
              📍 Address: Thrissur, Kerala
            </p>

            <p>
              📞 Phone: +91 7907698580
            </p>

            <p>
              ✉ Email: support@timberly.com
            </p>
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Subject" />

            <textarea
              placeholder="Your Message"
              rows="5"
            ></textarea>

            <button type="submit">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Contact;