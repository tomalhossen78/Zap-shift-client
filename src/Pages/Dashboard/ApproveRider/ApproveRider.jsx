import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DateFormat } from "../../../Utility/DateFormat";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  return (
    <div>
      <h1 className="px-6 pt-6 text-secondary text-3xl font-bold">
        Riders pending Approvals :{riders.length}{" "}
      </h1>
      <div className="overflow-x-auto w-full p-4 mt-4">
        <table className="table w-full table-zebra">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Application time</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td className="whitespace-nowrap">{index + 1}</td>
                <td>
                  <div className="font-semibold">{rider.name}</div>
                </td>
                <td className="whitespace-nowrap">{rider.email}</td>

                <td>{DateFormat(rider.createAt)}</td>
                <td>{rider.warhouse}</td>
                <td
                  className={`${
                    rider.status === "pending"
                      ? "text-yellow-500 "
                      : rider.status === "approved"
                      ? "text-primary"
                      : "text-red-500"
                  }`}
                >
                  {rider.status}
                </td>
                <td className="flex gap-4">
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn-small-2"
                  >
                    <BsFillPersonCheckFill size={16} />
                  </button>
                  <button
                    onClick={() => handleReject(rider)}
                    className="btn-small-2"
                  >
                    <IoPersonRemoveSharp size={16} />
                  </button>
                  <button className="btn-small-2">
                    <FaTrashCan size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
