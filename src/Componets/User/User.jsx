import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { IoLogIn, IoLogOut } from "react-icons/io5";

const User = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Succesfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-12 border-2 border-primary rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                referrerPolicy="no-referrer"
                src={
                  user.photoURL ||
                  "https://avatars.githubusercontent.com/u/195260435?v=4"
                }
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <div className=" pb-3 border-b border-b-gray-200">
              <li className="text-sm font-bold">{user.displayName}</li>
              <li className="text-xs">{user.email}</li>
            </div>
            <li className="mt-3">
              <Link to={"/profile"}>
                <FaUser /> Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn-xs bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
              >
                <IoLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="btn btn-sm bg-primary rounded-md shadow-md hover:bg-black transition-transform hover:scale-105  text-white"
        >
          {" "}
          <IoLogIn /> Login
        </Link>
      )}
    </div>
  );
};

export default User;
