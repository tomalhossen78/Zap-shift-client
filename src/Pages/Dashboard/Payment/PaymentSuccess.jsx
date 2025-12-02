import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const calledRef = useRef(false);
  // console.log(sessionId);

  useEffect(() => {
    if (!sessionId || calledRef.current) {
      return;
    }
    calledRef.current = true;
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        // console.log(res.data);
        setPaymentInfo({
          trackingId: res.data.trackingId,
          transactionId: res.data.transactionId,
        });
      });
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h1 className="text-primary text-xl">Payment successfull </h1>
      <p>TrackingId : {paymentInfo.trackingId}</p>
      <p>TransactionId : {paymentInfo.transactionId}</p>
    </div>
  );
};

export default PaymentSuccess;
