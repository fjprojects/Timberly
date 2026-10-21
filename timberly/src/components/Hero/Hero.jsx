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

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
      </Swiper>

      <div className="hero-content">
        <h1>Premium Wooden Furniture</h1>
        <p>Crafted for Modern Living</p>

        <button className="btn-primary">Shop Now</button>
      </div>

    </section>
  );
}

export default Hero;