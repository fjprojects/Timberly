import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Hero.css";
import img1 from "../../assets/hero1.jpg";
import img2 from "../../assets/hero2.jpg";
import img3 from "../../assets/hero3.jpg";

function Hero() {
  return (
    <section className="hero">
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="hero-swiper">
        {[img1, img2, img3].map((image, index) => <SwiperSlide key={image}><img src={image} alt={`Furniture inspiration ${index + 1}`} /></SwiperSlide>)}
      </Swiper>
      <div className="hero-content">
        <h1>Premium Wooden Furniture</h1>
        <p>Crafted for modern living.</p>
        <Link to="/shop" className="btn-primary">Shop now →</Link>
      </div>
    </section>
  );
}
export default Hero;
