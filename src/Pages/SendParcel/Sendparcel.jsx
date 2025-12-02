import React from "react";
import Container from "../../Utility/Container";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Sendparcel = () => {
  const naviage = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);

  const senderRegion = watch("senderRegion");

  const districtByRegion = (district) => {
    const regionDistricts = serviceCenters.filter(
      (service) => service.region === district
    );
    const disricts = regionDistricts.map((r) => r.district);
    // console.log(disricts);
    return disricts;
  };

  const receiverRegion = watch("receiverRegion");

  const handleSendParcel = (data) => {
    console.log("after login", data);
    const isDocumet = data.parcelType === "document";
    const isSameDistrict = data.picupWarhouse === data.receiverWarhouse;
    // console.log(sameDistrict);
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocumet) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const extra = (parcelWeight - 3) * 40;
        cost = isSameDistrict ? 110 + extra : 150 + extra + 40;
      }
    }
    console.log(cost);
    data.cost = cost;
    Swal.fire({
      title: "Are you Agree cost?",
      text: `you will be charged ${cost} tk`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send My parcel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // post data to database

        axiosSecure
          .post("/parcels", data)
          .then((res) => {
            // console.log("after saving parcels", res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Send!",
                text: "Your Parcel has been send.",
                icon: "success",
              });
              naviage("/dashboard/my-parcels");
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error happends here!",
              text: error,
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <Container className="my-20 p-4 min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="bg-base-200/30 py-12 px-16 rounded-2xl"
      >
        <fieldset className="fieldset">
          <h1 className="font-extrabold text-5xl text-secondary">Add Parcel</h1>

          {/* divider */}
          <div className="divider py-2"></div>

          <h3 className="font-extrabold text-2xl text-secondary">
            Enter your parcel details
          </h3>
          {/* radio */}

          <div>
            <div className="flex gap-8 py-4">
              <div className="flex items-center justify-center gap-3">
                <input
                  type="radio"
                  {...register("parcelType", { required: true })}
                  className="radio radio-primary"
                  value="document"
                  defaultChecked
                />
                <p className="font-semibold">Document</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <input
                  type="radio"
                  {...register("parcelType", { required: true })}
                  className="radio radio-primary"
                  value="not-document"
                />
                <p className="font-semibold">Not-Document</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* title */}
            <div className="flex-1">
              <legend className="fieldset-legend">Parcel Name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Parcel Name"
                {...register("parcelName", { required: true })}
              />
              {errors.parcelName?.type === "required" && (
                <p className="text-red-500 py-2">Parcel Name Required!</p>
              )}
            </div>

            <div className="flex-1">
              {/* Parcel Weight (KG) */}
              <legend className="fieldset-legend">Parcel Weight (KG)</legend>
              <input
                type="number"
                className="input w-full"
                placeholder="Parcel Weight (KG)"
                {...register("parcelWeight", { required: true })}
              />
              {errors.parcelWeight?.type === "required" && (
                <p className="text-red-500 py-2">Parcel Weight Required!</p>
              )}
            </div>
          </div>

          <div className="divider py-2"></div>

          <div className="flex gap-6">
            {/* Sender Details */}
            <div className="flex-1">
              <h1 className="text-xl font-extrabold text-secondary py-2">
                Sender Details
              </h1>
              {/* name */}
              <div className="grid grid-cols-2 gap-6">
                <div className="">
                  <legend className="fieldset-legend">Sender Name</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Sender Name"
                    value={user?.displayName?.toUpperCase()}
                    {...register("senderName", { required: true })}
                  />
                </div>
                {/* select warhouse */}
                <div>
                  <legend className="fieldset-legend">
                    Sender Pickup Wire house
                  </legend>
                  <select
                    defaultValue={""}
                    className="select w-full"
                    {...register("picupWarhouse", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Sender Wire house
                    </option>
                    {senderRegion &&
                      districtByRegion(senderRegion).map((district, index) => (
                        <option value={district} key={index}>
                          {district}
                        </option>
                      ))}
                  </select>
                  {errors.picupWarhouse?.type === "required" && (
                    <p className="text-red-500 py-2">Wirehouse Required!</p>
                  )}
                </div>
                <div>
                  <legend className="fieldset-legend">Sender Address</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Sender Address"
                    {...register("senderAddress", { required: true })}
                  />
                  {errors.senderAddress?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Sender Address Required!
                    </p>
                  )}
                </div>
                <div>
                  <legend className="fieldset-legend">Sender Email</legend>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Sender Email"
                    value={user?.email}
                    {...register("senderEmail", { required: true })}
                  />
                  {errors.senderEmail?.type === "required" && (
                    <p className="text-red-500 py-2">Sender Email Required!</p>
                  )}
                </div>
                <div className="col-span-2">
                  <legend className="fieldset-legend">Your Region</legend>
                  <select
                    className="select w-full"
                    {...register("senderRegion", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Your Region
                    </option>
                    {regions.map((region, index) => (
                      <option key={index}>{region}</option>
                    ))}
                  </select>

                  {errors.senderRegion?.type === "required" && (
                    <p className="text-red-500 py-2">Sender Region Required!</p>
                  )}
                </div>

                <div className="col-span-2">
                  <legend className="fieldset-legend">
                    Pickup Instruction
                  </legend>
                  <textarea
                    type="text"
                    className="input w-full"
                    placeholder="Pickup Instruction"
                    {...register("pickupInstruction", { required: true })}
                  />
                  {errors.pickupInstruction?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Pickup Instruction Required!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* receiver details */}

            <div className="flex-1">
              <h1 className="text-xl font-extrabold text-secondary py-2">
                Receiver Details
              </h1>
              <div className="grid grid-cols-2 gap-6">
                {/* name */}
                <div>
                  <legend className="fieldset-legend">Receiver Name</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver Name"
                    {...register("receiverName", { required: true })}
                  />

                  {errors.receiverName?.type === "required" && (
                    <p className="text-red-500 py-2">Receiver Name Required!</p>
                  )}
                </div>
                {/* select warhouse */}
                <div>
                  <legend className="fieldset-legend">
                    Receiver Delivery Wire house
                  </legend>
                  <select
                    defaultValue={""}
                    className="select w-full"
                    {...register("receiverWarhouse", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Receiver Wire house
                    </option>
                    {receiverRegion &&
                      districtByRegion(receiverRegion).map((disrict, index) => (
                        <option value={disrict} key={index}>
                          {disrict}
                        </option>
                      ))}
                  </select>
                  {errors.receiverWarhouse?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Receiver Wire house Required!
                    </p>
                  )}
                </div>
                {/* address */}
                <div>
                  <legend className="fieldset-legend">Receiver Address</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver Address"
                    {...register("receiverAddress", { required: true })}
                  />
                  {errors.receiverAddress?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Receiver Address Required!
                    </p>
                  )}
                </div>
                {/* contact */}
                <div>
                  <legend className="fieldset-legend">Receiver Email</legend>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Receiver Email"
                    {...register("receiverEmail", { required: true })}
                  />
                  {errors.receiverEmail?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Receiver Email Required!
                    </p>
                  )}
                </div>
                {/* region */}
                <div className="col-span-2">
                  <legend className="fieldset-legend">Receiver Region</legend>
                  <select
                    className="select w-full"
                    {...register("receiverRegion", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Your Region
                    </option>
                    {regions.map((region, index) => (
                      <option key={index}>{region}</option>
                    ))}
                  </select>
                  {errors.receiverRegion?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Receiver Region Required!
                    </p>
                  )}
                </div>
                {/* picup */}
                <div className="col-span-2">
                  <legend className="fieldset-legend">
                    Delivery Instruction
                  </legend>
                  <textarea
                    type="text"
                    className="input w-full"
                    placeholder="Delivery Instruction"
                    {...register("deliveryInstruction", { required: true })}
                  />
                  {errors.deliveryInstruction?.type === "required" && (
                    <p className="text-red-500 py-2">
                      Delivery Instruction Required!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="py-4">* PickUp Time-4pm-7pm-Approx.</p>
          {/* button */}

          <div className="py-4">
            <button type="submit" className="btn-small">
              Proceed to Confirm Booking
            </button>
          </div>
        </fieldset>
      </form>
    </Container>
  );
};

export default Sendparcel;
