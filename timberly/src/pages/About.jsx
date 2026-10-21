import "../components/About/About.css";

function About() {
  return (
    <>

      <div className="about">
        <section className="about-hero">
          <h1>About Timberly</h1>
          <p>
            Bringing quality wooden products and timeless designs to your home.
          </p>
        </section>

        <section className="about-content">
          <div>
            <h2>Who We Are</h2>
            <p>
              Timberly is an online furniture store focused on creating elegant,
              durable and sustainable wooden furniture.
            </p>
          </div>

          <div>
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide high-quality furniture with a smooth
              shopping experience.
            </p>
          </div>
        </section>

        <section className="about-values">
          <h2>Why Choose Us?</h2>

          <div className="values">
            <div className="card">
              <h3>Premium Quality</h3>
              <p>Long-lasting furniture made with quality materials.</p>
            </div>

            <div className="card">
              <h3>Modern Designs</h3>
              <p>Beautiful designs for modern homes.</p>
            </div>

            <div className="card">
              <h3>Customer First</h3>
              <p>Simple shopping experience and trusted service.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;