import React, { useEffect, useState } from "react";
import Logo from "../Componets/Logo/Logo";
import Container from "../Utility/Container";
import { Link, Outlet } from "react-router";
import img from "../assets/authImage.png";
import ThemeController from "../Componets/Theme/themeController";
import User from "../Componets/User/User";

const AuthLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="my-6">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex justify-center items-center gap-6">
            <User />
            <ThemeController handleTheme={handleTheme} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="flex-1">
            <img src={img} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;
