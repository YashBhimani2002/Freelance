"use client";
import React, { useEffect, useState } from "react";
import ProjectDetails from "./ProjectDetails";
import InviteProfessional from "./InviteProfessional";
import Shortlisted from "./Shortlisted";
import ReviewedApplicants from "./ReviewedApplicants";
import Hired from "./Hired";

import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Error  from "../../../error";
import ErrorBoundary  from "../../../ErrorBoundry";



const inter = Inter({ subsets: ["latin"], weight: "500" });
const mulish = Mulish({ subsets: ["latin"], weight: "500" });

const dummyCardData = [
  {
    id: 1,
    name: "Digital Marketing",
    price: "Fixed Price",
    experienceLevel: "Fresher",
    no: "N100",
    posted: "Posted 33d ago",
    tags: ["Digital Marketing", "SEO", "editing"],
    hiredClient: [
      {
        name: "Proposals",
        number: "3",
      },
      {
        name: "Messages",
        number: "2",
      },
      {
        name: "Hired",
        number: "0",
      },
    ],
  },
  {
    id: 2,
    name: "Web Development",
    price: "Fixed Price",
    no: "N2300",
    experienceLevel: "Fresher",
    posted: "Posted 33d ago",
    tags: [
      "Web Development",
      "SEO",
      "PHP",
      "Data science",
      "Financial analyst",
    ],
    hiredClient: [
      {
        name: "Proposals",
        number: "1",
      },
      {
        name: "Hired",
        number: "0",
      },
    ],
  },
];

export default function Detail({ params }) {
  const id = params.project_detail * 1;
  const [status, setStatus] = useState("ProjectDetails");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const filteredResult = dummyCardData.filter(
      (item) => item.id === parseInt(id)
    );

    setFilteredData(filteredResult);
  }, [id]);

  return (
    <ErrorBoundary fallback= {<Error/>}>
    <>
    <div className={mulish.className}>
      {filteredData?.map((data) => (
        <div key={data.id}>
          <p className="font-medium">Project</p>
          <h1 className="text-black font-medium text-3xl">{data.name}</h1>
          <div
            className={`flex flex-wrap flex-col sm:flex-row items-center justify-start gap-3 ${inter.className} py-4`}
          >
            <button
              onClick={() => setStatus("ProjectDetails")}
              className={`${
                status === "ProjectDetails"
                  ? "text-btnText bg-sidbarseleclistcolor shadow"
                  : "text-black"
              }  cursor-pointer p-3 rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
            >
              Project Details
            </button>
            <button
              onClick={() => setStatus("InviteProfessional")}
              className={`${
                status === "InviteProfessional"
                  ? "text-btnText bg-sidbarseleclistcolor shadow"
                  : "text-black"
              }  cursor-pointer p-3 rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
            >
              Invite Professional
            </button>
            <button
              onClick={() => setStatus("Shortlisted")}
              className={`${
                status === "Shortlisted"
                  ? "text-btnText bg-sidbarseleclistcolor shadow"
                  : "text-black"
              }  cursor-pointer p-3 rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
            >
              Shortlisted (0)
            </button>
            <button
              onClick={() => setStatus("ReviewedApplicants")}
              className={`${
                status === "ReviewedApplicants"
                  ? "text-btnText bg-sidbarseleclistcolor shadow"
                  : "text-black"
              }  cursor-pointer p-3 rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
            >
              Reviewed Applicants (0)
            </button>
            <button
              onClick={() => setStatus("Hired")}
              className={`${
                status === "Hired"
                  ? "text-btnText bg-sidbarseleclistcolor shadow"
                  : "text-black"
              }  cursor-pointer p-3 rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
            >
              Hired (0)
            </button>
          </div>
          <div className="">
            {status === "ProjectDetails" && <ProjectDetails data={data} />}
            {status === "InviteProfessional" && <InviteProfessional />}
            {status === "Shortlisted" && <Shortlisted />}
            {status === "ReviewedApplicants" && <ReviewedApplicants />}
            {status === "Hired" && <Hired />}
          </div>
        </div>
      ))}
    </div>
    </>
    </ErrorBoundary>
  );
}
