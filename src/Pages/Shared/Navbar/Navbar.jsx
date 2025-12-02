import { Link, NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";
import Container from "../../../Utility/Container";
import { useEffect, useState } from "react";
import Logo from "../../../Componets/Logo/Logo";
import User from "../../../Componets/User/User";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const links = (
    <>
      <li className="text-secondary font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-secondary font-medium">
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li className="text-secondary font-medium">
        <NavLink to="/coverage">Coverage</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
          </li>
        </>
      )}
      {user && (
        <>
          <li className="text-secondary font-medium">
            <NavLink className={"text-secondary font-medium"} to="/beArider">
              Become a rider
            </NavLink>
          </li>
        </>
      )}
      <li className="px-10">
        {" "}
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-md fixed w-full top-0 z-20 md:px-0 px-4">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link
              to={"/"}
              className="btn btn-ghost text-[24px] text-primary font-bold"
            >
              <Logo />
            </Link>
          </div>

          <div className="navbar-end gap-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <User />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
