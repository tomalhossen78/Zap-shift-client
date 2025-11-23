import React from "react";
import Container from "../../Utility/Container";
import riderImg from "../../../src/assets/agent-pending.png";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const BeaRider = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const region = watch("region");

  const districtByRegion = (district) => {
    const regionDistricts = serviceCenters.filter(
      (service) => service.region === district
    );
    const disricts = regionDistricts.map((r) => r.district);
    return disricts;
  };
  const handleAddRider = (data) => {
    console.log("after login", data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-right",
          icon: "success",
          title:
            "Rider Application Added Succefully.We will confirm you  in 7 workings days.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    });
  };
  return (
    <Container className="my-24 px-6 min-h-screen">
      <form
        onSubmit={handleSubmit(handleAddRider)}
        className="bg-base-200/30 py-12 px-16 rounded-2xl"
      >
        <fieldset className="fieldset">
          <h1 className="font-extrabold text-5xl text-secondary">Be a Rider</h1>
          <p className="w-1/2 py-4 text-primary-content">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          {/* divider */}
          <div className="divider py-2"></div>

          <h3 className="font-extrabold text-2xl text-secondary">
            Tell us about yourself
          </h3>
          {/* radio */}

          <div className="flex gap-6 items-center justify-between">
            <div className="flex-1">
              {/* name */}
              <div className="grid grid-cols-2 gap-6">
                <div className="">
                  <legend className="fieldset-legend">Your Name</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your Name"
                    defaultValue={user?.displayName?.toUpperCase()}
                    {...register("name", { required: true })}
                    // readOnly
                  />
                </div>
                {/* age */}
                <div className="">
                  <legend className="fieldset-legend">Your Age</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Your Age"
                    {...register("age", { required: true })}
                  />
                  {errors.age?.type === "required" && (
                    <p className="text-red-500 py-2">Age Required!</p>
                  )}
                </div>

                {/* email */}

                <div>
                  <legend className="fieldset-legend">Email</legend>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    value={user?.email}
                    readOnly
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500 py-2">Email Required!</p>
                  )}
                </div>

                {/* region */}
                <div>
                  <legend className="fieldset-legend">Your Region</legend>
                  <select
                    className="select w-full"
                    {...register("region", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Your Region
                    </option>
                    {regions.map((region, index) => (
                      <option key={index}>{region}</option>
                    ))}
                  </select>
                  {/* 
                  {errors.region?.type === "required" && (
                    <p className="text-red-500 py-2">Sender Region Required!</p>
                  )} */}
                </div>

                {/* Nid */}

                <div>
                  <legend className="fieldset-legend">NID No</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="NID"
                    {...register("nid", { required: true })}
                  />
                  {errors.nid?.type === "required" && (
                    <p className="text-red-500 py-2">NID No. Required!</p>
                  )}
                </div>
                {/* contact */}

                <div>
                  <legend className="fieldset-legend">Contact No</legend>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Contact No."
                    {...register("number", { required: true })}
                  />
                  {errors.number?.type === "required" && (
                    <p className="text-red-500 py-2">Sender Email Required!</p>
                  )}
                </div>

                {/* select warhouse */}
                <div className="col-span-2">
                  <legend className="fieldset-legend">
                    Which wire-house you want to work?
                  </legend>
                  <select
                    defaultValue={""}
                    className="select w-full"
                    {...register("warhouse", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Sender Wire house
                    </option>
                    {region &&
                      districtByRegion(region).map((district, index) => (
                        <option value={district} key={index}>
                          {district}
                        </option>
                      ))}
                  </select>
                  {/* {errors.picupWarhouse?.type === "required" && (
                    <p className="text-red-500 py-2">Wirehouse Required!</p>
                  )} */}
                </div>
              </div>

              {/* button */}

              <div className="py-6 w-full">
                <button type="submit" className="btn-full">
                  Submit
                </button>
              </div>
            </div>

            <div className="max-h-[400px] max-w-[400px]">
              <img src={riderImg} alt="" />
            </div>
          </div>
        </fieldset>
      </form>
    </Container>
  );
};

export default BeaRider;
