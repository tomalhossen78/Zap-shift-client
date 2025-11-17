import React from "react";
import icon from "../../../assets/reviewQuote.png";
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-base-100 md:p-8 p-4 my-4 flex flex-col justify-between md:gap-4 gap-2 rounded-2xl">
      <div>
        <img src={icon} />
      </div>
      <p className="font-medium">{review.review}</p>

      <div className="divider">
        ------------------------------------------------
      </div>
      <div className="flex justify-start items-center gap-2">
        <div>
          <img
            className="rounded-full w-16"
            src={review.user_photoURL}
            alt=""
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{review.userName}</h3>
          <h3 className="text-sm">{review.user_email}</h3>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
