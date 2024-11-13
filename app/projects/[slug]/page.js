"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectDetails from "./[project_detail]/ProjectDetails";
import InviteProfessional from "./[project_detail]/InviteProfessional";
import Shortlisted from "./[project_detail]/Shortlisted";
import ReviewedApplicants from "./[project_detail]/ReviewedApplicants";
import Hired from "./[project_detail]/Hired";

import axios from "axios";
import { getAppliedJobs, postNotification } from "@/app/api/api";
import { Reviews } from "@mui/icons-material";
import Loader from "@/components/common/Loader";

import { Inter, Mulish } from "next/font/google";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import { useSocket } from "../../socketContext";

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });

const dummyCardData = [
  {
    id: 1,
    name: "Digital Marketing",
    price: "Fixed Price",
    experienceLevel: "Fresher",
    no: "N100",
    posted: "Posted 33d ago",
    tags: ["Digital Marketing", "SEO", "editing"],
    job_description: "This is description of project Digital Marketing",
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
const arrowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.828 10.9997H20V12.9997H7.828L13.192 18.3637L11.778 19.7777L4 11.9997L11.778 4.22168L13.192 5.63568L7.828 10.9997Z"
      fill="#2D3748"
    />
  </svg>
);
export default function Detail({ params }) {
  const id = params.slug;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const [status, setStatus] = useState("ProjectDetails");
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProfessionals, setAllProfessionals] = useState([]);
  const [appliedProfessionals, setAppliedProfessionals] = useState(null);
  const [appliedProfessionalsForReview, setAppliedProfessionalsForReview] =
    useState(null);
  const [appliedProfessionalsForHire, setAppliedProfessionalsForHire] =
    useState(null);
  const [reviewSuccessfully, setReviewSuccessfully] = useState(false);
  const [selectedApplicationForReview, setSelectedApplicationForReview] =
    useState(null);
  const statusMap = {
    InviteProfessional: "ProjectDetails",
    Shortlisted: "InviteProfessional",
    ReviewedApplicants: "Shortlisted",
    Hired: "ReviewedApplicants",
  };
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const {socket} = useSocket();
  useEffect(() => {
    socket.on("jobapply", () => {
      my_project(params.slug);
      getAppliedProjectData();
    });
  }, []);
  const my_project = async (jid) => {
    try {
      const { data } = await axios.post(
        `${url}/projects`,
        {
          projectID: jid,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setfilteredData(data.specificContract);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAppliedProjectData = async () => {
    try {
      const response = await getAppliedJobs();
      if (response?.data?.success) {
        setAppliedProfessionals(response?.data?.appliedJobs);
        setAppliedProfessionalsForReview(response?.data?.appliedJobs);
        setAppliedProfessionalsForHire(response?.data?.appliedJobs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    my_project(params.slug);
    getAppliedProjectData();
  }, []);

  const getProfessionals = async () => {
    try {
      const response = await axios.get(`${url}/allProfessional`, {
        withCredentials: true,
      });
      setAllProfessionals(response.data.allprofessionals);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    getProfessionals();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const childToParent = async (value) => {
    const matchingData = appliedProfessionalsForReview.find(
      (item) => item.job_id === id
    );

    // Logging the matching data
    const retrievedCookie = Cookies.get("authToken");
    const decodedToken = jwt.decode(retrievedCookie);
    const jobID = id;
    const route = `/application/${jobID}`;

    const dataForNofitication = {
      rout: route,
      send_by: "client",
      subject: "reviewed",
      professional_id: matchingData.professional_id,
      job_id: id,
      email: selectedApplicationForReview?.professional_data[0]?.email,
      first_name: decodedToken.first_name,
      last_name: decodedToken.last_name,
    };

    const messageForShow = `${decodedToken.first_name} ${decodedToken.last_name} reviewed your application : "${matchingData.contract_title}"`;

    if (value === "ReviewedApplicants") {
      setReviewSuccessfully(true);
    }
    // const socket = io('http://localhost:8080');

    await postNotification(dataForNofitication).then((res) => {
      const data = {
        message: messageForShow,
        professional_id: matchingData.professional_id,
        rout: route,
        status: 0,
      };
      socket.emit("new_notification", data);
      socket.emit("update_notification", { login_as: 2, id: matchingData.professional_id });
      if (res.status == 200) {
        // onClose();
        // window.location.reload();
      }
    });

    setStatus(value);
    setTimeout(() => {
      setReviewSuccessfully(false);
    }, 5000);
  };

  const shortlistedId = (id) => {
    setAppliedProfessionalsForReview(
      appliedProfessionalsForReview.map((professional) => {
        if (professional._id === id) {
          professional.isReviewed = true;
        }
        return professional;
      })
    );
  };
  const getReviewCount = () => {
    let count = 0;

    appliedProfessionalsForReview?.map((professional) => {
      if (professional.status === "reviewed" && professional.job_id === id) {
        count++;
      }
      return professional;
    });

    return count;
  };

  const shortlistedHireId = (id) => {
    setAppliedProfessionalsForHire(
      appliedProfessionalsForHire.map((professional) => {
        if (professional._id === id) {
          professional.isHired = true;
        }
        return professional;
      })
    );
  };

  const getSortListCount = () => {
    let count = 0;

    appliedProfessionals?.map((professional) => {
      if (professional.status === "shortlisted" && professional.job_id === id) {
        count++;
      }
      return professional;
    });

    return count;
  };

  const getHireCount = () => {
    let count = 0;

    appliedProfessionalsForHire?.map((professional) => {
      if (professional.status === "hired" && professional.job_id === id) {
        count++;
      }
      return professional;
    });

    return count;
  };

  const selectedReviewApplicationDataForPerent = (data) => {
    setSelectedApplicationForReview(data);
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <div className="max-w-screen-2xl p-2 lg:px-12 lg:py-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            {reviewSuccessfully && (
              <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
                <button
                  type="button"
                  className="close"
                  onClick={() => setReviewSuccessfully(false)}
                >
                  ×
                </button>
                <strong className="ml-2">
                  Application reviewed successfully
                </strong>
              </div>
            )}
            {filteredData?.map((data) => (
              <div key={data.id} className="">
                <div className="flex justify-between ">
                  <div>
                    <p
                      className={`${mulish500.className} text-[#ADADAD]`}
                      style={{ color: "#adadad" }}
                    >
                      Project
                    </p>
                    <h1 className="text-[#000000] font-medium text-[29px]">
                      {data.job_title}
                    </h1>
                  </div>
                  <div
                    className="group flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      if (status !== "ProjectDetails") {
                        setStatus(statusMap[status] || status);
                      } else {
                        router.back();
                      }
                    }}
                  >
                    <p className="bg-inputbordercolor p-2 rounded-full">
                      {arrowIcon}
                    </p>
                    <h1 className="text-black text-xl font-mulish font-normal group-hover:text-searchbg cursor-pointer">
                      Back
                    </h1>
                  </div>
                </div>
                {/* -------------------------------------------- */}
                <div
                  className={`flex flex-wrap ${inter600.className}  flex-col sm:flex-row items-center justify-start  py-4`}
                >
                  <button
                    onClick={() => setStatus("ProjectDetails")}
                    className={`${
                      status === "ProjectDetails"
                        ? "text-btnText bg-sidbarseleclistcolor shadow"
                        : "text-[#000000]"
                    }  cursor-pointer mr-[5px] py-[8px] px-[16px] rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
                  >
                    Project Details
                  </button>
                  <button
                    onClick={() => setStatus("InviteProfessional")}
                    className={`${
                      status === "InviteProfessional"
                        ? "text-btnText bg-sidbarseleclistcolor shadow"
                        : "text-[#000000]"
                    }  cursor-pointer mr-[5px] py-[8px] px-[16px] rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
                  >
                    Invite Professional
                  </button>
                  <button
                    onClick={() => setStatus("Shortlisted")}
                    className={`${
                      status === "Shortlisted"
                        ? "text-btnText bg-sidbarseleclistcolor shadow"
                        : "text-[#000000]"
                    }  cursor-pointer mr-[5px] py-[8px] px-[16px] rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
                  >
                    Shortlisted ({getSortListCount()})
                  </button>
                  <button
                    onClick={() => setStatus("ReviewedApplicants")}
                    className={`${
                      status === "ReviewedApplicants"
                        ? "text-btnText bg-sidbarseleclistcolor shadow"
                        : "text-[#000000]"
                    }  cursor-pointer mr-[5px] py-[8px] px-[16px] rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
                  >
                    Reviewed Applicants ({getReviewCount()})
                  </button>
                  <button
                    onClick={() => setStatus("Hired")}
                    className={`${
                      status === "Hired"
                        ? "text-btnText bg-sidbarseleclistcolor shadow"
                        : "text-[#000000]"
                    }  cursor-pointer mr-[5px] py-[8px] px-[16px] rounded-full font-medium w-full sm:w-auto border border-[#eee] sm:border-none`}
                  >
                    Hired ({getHireCount()})
                  </button>
                </div>
                {/* -------------------------------------------- */}
                {appliedProfessionals !== null && (
                  <div className="">
                    {status === "ProjectDetails" && (
                      <ProjectDetails
                        childToParent={childToParent}
                        data={filteredData}
                        onStatusChange={handleStatusChange}
                        appliedProfessionals={appliedProfessionals}
                      />
                    )}
                    {status === "InviteProfessional" && (
                      <InviteProfessional data={filteredData} />
                    )}
                    {status === "Shortlisted" && (
                      <Shortlisted
                        id={id}
                        appliedProfessionals={appliedProfessionals}
                        shortlistedId={shortlistedId}
                        childToParent={childToParent}
                        data={filteredData}
                        allProfessionals={allProfessionals}
                        selectedReviewApplicationDataForPerent={
                          selectedReviewApplicationDataForPerent
                        }
                      />
                    )}
                    {status === "ReviewedApplicants" && (
                      <ReviewedApplicants
                        id={id}
                        shortlistedHireId={shortlistedHireId}
                        allProfessionals={allProfessionals}
                        childToParent={childToParent}
                        appliedProfessionalsForReview={
                          appliedProfessionalsForReview
                        }
                      />
                    )}
                    {status === "Hired" && (
                      <Hired
                        id={id}
                        appliedProfessionalsForHire={
                          appliedProfessionalsForHire
                        }
                        allProfessionals={allProfessionals}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
