import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersMangemet = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUser = (user, role, msg, icon) => {
    const roleInfo = { role: role };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      Swal.fire({
        title: `Are you sure to mark as ${role} `,
        text: `Your Role is Change Parmently Parmanetly!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          refetch();
          if (res.data.modifiedCount) {
            // console.log(res.data);
            Swal.fire({
              title: `${role} marked`,
              text: msg,
              icon: icon,
            });
          }
        }
      });
    });
  };
  const handleMakeUser = (user) => {
    handleUser(user, "admin", "Marks as Admin has been Succesfully", "success");
  };
  const handleRemoveUser = (user) => {
    handleUser(user, "user", "Admin has been removed Succesfully", "warning");
  };
  return (
    <div>
      <h1>Mange Users : {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.displayName.toUpperCase()}
                      </div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <th>
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaUserShield size={30} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleRemoveUser(user)}
                    >
                      <FiShieldOff size={30} />
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersMangemet;
