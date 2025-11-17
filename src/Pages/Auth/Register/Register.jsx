import React, { useState } from "react";
import { NavLink } from "react-router";
import Container from "../../../Utility/Container";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [show, setShow] = useState(false);
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = (data) => {
    console.log("after register", data);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container className="my-12 flex justify-center items-center">
      <div className="card w-full max-w-lg bg-base-100 shadow-sm border border-accent-content rounded-2xl p-6 hover:shadow-xl transition duration-300">
        <h1 className="text-center text-4xl font-bold text-primary mb-6">
          Have a Nice Day!
        </h1>
        <p className="text-center text-accent mb-6">
          Register to join our Community
        </p>
        <div className="card-body">
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="fieldset"
          >
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

              <button className="btn w-full bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-102">
                Register
              </button>
            </fieldset>
          </form>
          <div className="divider text-gray-400">OR</div>
          {/* google */}
          <SocialLogin />
          <div className="text-center ">
            <p className="">
              Already have an account? Please{" "}
              <NavLink
                className="text-primary font-medium hover:underline"
                to={"/login"}
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
