import React, { useState } from "react";
import Container from "../../../Utility/Container";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { signInuser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    // console.log("after login", data);
    signInuser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
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
    <Container className="my-10 flex justify-center items-center">
      <div className="card w-full max-w-lg bg-base-100 shadow-sm border border-accent-content rounded-2xl p-4 hover:shadow-xl transition duration-300">
        <h1 className="text-center text-4xl font-bold text-primary mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-accent mb-6">
          Login to continue to your account
        </p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
            {/* email */}
            <fieldset className="fieldset">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email Required!</p>
              )}

              {/* password */}

              <div className="relative">
                <label className="label font-semibold">Password</label>
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  })}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"

                  // ref={passwordRef}
                  // onChange={handlePassworldChange}
                />
                <div className="absolute top-[30px] right-4 text-primary-content">
                  {show ? (
                    <FaEye size={16} onClick={() => setShow(!show)} />
                  ) : (
                    <FaEyeSlash size={16} onClick={() => setShow(!show)} />
                  )}
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is Required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be 8 characters or longers
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number, and one special character.
                  </p>
                )}
              </div>

              {/* <div>{error}</div> */}
              <button className="btn w-full bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-102">
                Login
              </button>
            </fieldset>
          </form>
          <div className="divider text-gray-400">OR</div>
          {/* google */}
          <SocialLogin />
          {/* Register Link */}
          <div className="text-center text-sm mt-6">
            <p>
              New to our website?{" "}
              <NavLink
                className="text-primary font-medium hover:underline"
                to={"/register"}
              >
                Create an account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
