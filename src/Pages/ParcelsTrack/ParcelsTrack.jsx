import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Container from "../../Utility/Container";
import useAxios from "../../hooks/useAxios";
import { DateFormat } from "../../Utility/DateFormat";

const ParcelsTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  return (
    <Container className={"mt-20 min-h-screen px-6"}>
      <h2>Track Your package : {trackingId}</h2>
      <p>Logs so far : {trackings.length}</p>
      <ul className="timeline timeline-vertical">
        {trackings.map((log) => (
          <li>
            <div className="timeline-start">{DateFormat(log.createdAt)}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="green"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">{log.details}</div>
            <hr />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ParcelsTrack;
