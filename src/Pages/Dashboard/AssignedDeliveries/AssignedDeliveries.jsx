import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpadate = (parcel, status) => {
    // console.log(parcel);
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `Parcel status is updated with ${status
      .split("-")
      .join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h1>Parcels pending Pickup : {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No.</th>
              <th>Parcel Name</th>
              <th>Confirm</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.trackingId}</td>
                <td className="flex gap-2">
                  {parcel.deliveryStatus === "driver-assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpadate(parcel, "rider-arriving")
                        }
                        className="btn-small"
                      >
                        Accept
                      </button>
                      <button className="btn-small-2 btn-warning">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-secondary">Delivery Accepted</span>
                  )}
                </td>
                <td>
                  {parcel.deliveryStatus === "rider-arriving" ? (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpadate(parcel, "parcel-picked-up")
                      }
                      className="btn-small"
                    >
                      Mark as Picked Up
                    </button>
                  ) : parcel.deliveryStatus === "parcel-picked-up" ? (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpadate(parcel, "parcel-delivered")
                      }
                      className="btn-small"
                    >
                      Mark as Deliverd
                    </button>
                  ) : (
                    <span>Deliverd</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
