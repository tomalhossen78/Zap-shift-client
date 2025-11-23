import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../Utility/Container";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <Container>
      <h2>All my Payments History : {payments.length}</h2>

      <div className="overflow-x-auto w-full p-4 mt-20">
        <table className="table w-full table-zebra">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>No.</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Transactions Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td className="whitespace-nowrap">{index + 1}</td>
                <td>
                  <div className="font-semibold">{pay.parcelName}</div>
                </td>
                <td className="whitespace-nowrap">
                  <span className="badge badge-ghost badge-sm">
                    {pay.amount} tk
                  </span>
                </td>

                <td>{pay.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default PaymentHistory;
