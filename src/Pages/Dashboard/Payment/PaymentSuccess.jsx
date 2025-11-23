import React from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  return (
    <div>
      <h1 className="text-primary text-xl">Payment successfull </h1>
    </div>
  );
};

export default PaymentSuccess;
