import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h1 className="text-primary text-xl">Payment is Cancelled</h1>
      <Link to="/dashboard/my-parcels">
        <button className="btn bg-primary">Try Again!</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
