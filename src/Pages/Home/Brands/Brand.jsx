import React from "react";
// import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import brand1 from "../../../assets/brands/amazon.png";
import brand3 from "../../../assets/brands/casio.png";
import brand4 from "../../../assets/brands/moonstar.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/star.png";
import brand7 from "../../../assets/brands/start_people.png";
const Brand = () => {
  const brandsLogo = [brand1, brand3, brand4, brand5, brand6, brand7];
  return (
    <div className="py-12 space-y-12">
      <h1 className="text-4xl font-extrabold text-center">
        We've helped thousands of sales teams
      </h1>
      <Swiper
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        // loop={true}
        slidesPerView={6}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {brandsLogo.map((brand, index) => (
          <SwiperSlide>
            <img key={index} src={brand} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brand;
