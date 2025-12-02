import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../Utility/Container";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { TbFilterEdit } from "react-icons/tb";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure to Delete ?",
      text: `Your parcel Will be deleted Parmanetly!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // post data to database

        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Parcel has been Deleted.",
                icon: "success",
              });
            }
          })
          .catch();
      }
    });
  };
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };
  return (
    <Container>
      <h1 className="px-6 pt-6 text-secondary text-3xl font-bold">
        All my parcels : {parcels.length}
      </h1>

      <div className="overflow-x-auto w-full p-4 mt-4">
        <table className="table w-full table-zebra">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>No.</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Tracking Id</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td className="whitespace-nowrap">{index + 1}</td>
                <td>
                  <div className="font-semibold">{parcel.parcelName}</div>
                </td>
                <td className="whitespace-nowrap">
                  <span className="badge badge-ghost badge-sm">
                    {parcel.cost} tk
                  </span>
                </td>

                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <button disabled className="btn btn-md">
                      Paid
                    </button>
                  ) : (
                    // <Link to={`/dashboard/payment/${parcel._id}`}>
                    //   {" "}
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn bg-primary btn-sm"
                    >
                      Pay
                    </button>
                    // </Link>
                  )}
                </td>
                <td>
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                    {parcel.trackingId}
                  </Link>
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td className="whitespace-nowrap">
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>

                  <button className="btn btn-square hover:bg-primary mx-2">
                    <TbFilterEdit />
                  </button>

                  <button
                    className="btn btn-square hover:bg-primary"
                    onClick={() => handleParcelDelete(parcel._id)}
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyParcels;
