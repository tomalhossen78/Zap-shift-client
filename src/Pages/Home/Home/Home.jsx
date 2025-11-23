import React from "react";
import Container from "../../../Utility/Container";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Brand from "../Brands/Brand";
import Reviews from "../Reviews/Reviews";
import Facility from "../Facility/Facility";
import BecomeAmarchent from "../BecomeAMarchent/BecomeAmarchent";
import FAQ from "../FAQ/FAQ";
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="pt-20 px-6">
        <Banner />
        <HowItWorks />
        <OurServices />
        <Brand />
        <Facility />
        <BecomeAmarchent />
        <Reviews reviewsPromise={reviewsPromise} />
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
