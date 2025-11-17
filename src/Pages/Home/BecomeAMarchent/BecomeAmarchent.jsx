import React from "react";
import Container from "../../../Utility/Container";
import img from "../../../assets/location-merchant.png";
import bgimg from "../../../assets/be-a-merchant-bg.png";
const BecomeAmarchent = () => {
  return (
    <div className="py-12">
      <Container
        className={
          "bg-secondary p-20 space-y-6 rounded-4xl flex items-center gap-6 relative"
        }
      >
        {" "}
        <div className="absolute top-0">
          <img src={bgimg} alt="" />
        </div>
        <div className="flex-4 space-y-4">
          <h1 className="text-4xl font-extrabold text-base-100">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="text-base-300 max-w-xl font-medium">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex items-center gap-6">
            <button className="btn-primary">Become a Merchant</button>
            <button className="btn-outline">Earn with ZapShift Courier</button>
          </div>
        </div>
        <div className="flex-3">
          <img src={img} />
        </div>
      </Container>
    </div>
  );
};

export default BecomeAmarchent;
