"use client";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import "./style.css";
import { useRouter } from "next/navigation"; // Import the useRouter hook from next/router
import axios from "axios";
import Milestone from "./Milestone";
import File from "./Files";
import Feedback from "./Feedback";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import {
  clientContarctDetails,
  milstoneData,
  myApplicationDetail,
} from "@/app/api/api";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import Loader from "@/components/common/Loader";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });

function ClientContractDetail({ params }) {
  const router = useRouter(); // Initialize the useRouter hook
  const id = params.slug;

  const [jobid, setJobid] = useState(null);

  useEffect(() => {
    const fullUrl = window.location.href;
    const idMatch = fullUrl.match(/(?:Contract_created)=([^&]+)/);
    const extractedJobid = idMatch ? idMatch[1] : null;
    if (extractedJobid) {
      setJobid(extractedJobid);
    }
  }, []);


  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [activeTab, setActiveTab] = useState("milestone");
  const [contract, setContract] = useState({});
  const [allContract, setAllContract] = useState(null);
  const [myApplicationDetails, setMyApplicationDetails] = useState(null);
  const [myApplicationFilesDetails, setMyApplicationFilesDetails] =
    useState(null);
  const [mileStoneData, setMileStoneData] = useState(null);
  const [SubmitedWorkeMilstone, setSubmitedWorkeMilstone] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Access the query parameters using router.query
  //   const sin = router.query.Contract_created;
  //   console.log(sin , "testtt");
  //   if (sin) {
  //     // Do something with the 'sin' variable
  //     console.log("Sin value:", sin);
  //   }
  // }, [router.query.Contract_created]); // Listen to changes in the query parameters

  useEffect(() => {
    // Listen for the custom event
    const hireButtonListener = (event) => {
      // Show alert message when the event is received
      alert("Hire button clicked!");

      // Optionally, you can navigate to a specific page
      // router.push('/specificPage');
    };

    window.addEventListener("hireButtonClick", hireButtonListener);

    return () => {
      // Clean up event listener when component unmounts
      window.removeEventListener("hireButtonClick", hireButtonListener);
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const my_contracts = async () => {
    try {
      const { data } = await axios.post(
        `${url}/my_contracts`,
        {
          contractID: id,
        },
        {
          withCredentials: true,
        }
      );
      if (data?.success) {
        setContract(data.specificContract[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updatedMilstoneData = (milstoneData) => {
    setMileStoneData(milstoneData);
    const submitWorke = milstoneData.milstone?.filter(
      (milestone) => milestone.status === "2" || milestone.status === "3"
    );
    setSubmitedWorkeMilstone(submitWorke);
  };
  useEffect(() => {
    my_contracts();
    loadclientContarctDetailsData();
  }, []);

  useEffect(() => {
    loadMyApplicationsData();
    loadmilstoneData();
  }, [allContract]);

  const loadmilstoneData = async () => {
    if (allContract !== null) {
      try {
        const response = await milstoneData(allContract[0].job_id);
        if (response?.status === 200 || response?.status === 201) {
          setMileStoneData(response?.data);
          if (allContract) {
            const filtermilstonedata = response?.data?.milstone?.filter(
              (milestone) => {
                return (
                  milestone.professional_id === allContract[0].professional_id
                );
              }
            );
            const submitWorke = filtermilstonedata?.filter(
              (milestone) =>
                milestone.status === "2" || milestone.status === "3"
            );
            setSubmitedWorkeMilstone(submitWorke);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const loadMyApplicationsData = async () => {
    if (allContract !== null) {
      let data = {
        job_id: allContract[0].job_id,
        user_id: allContract[0].user_id,
      };

      try {
        const response = await myApplicationDetail(data);
        if (response?.status === 200) {
          setMyApplicationDetails(response?.data);
          setMyApplicationFilesDetails(response?.data?.attachment[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const loadclientContarctDetailsData = async () => {
    setLoading(true);
    try {
      const response = await clientContarctDetails();

      if (response?.data?.success) {
        const filteredData = response?.data?.clientContracts?.filter(
          (contract) => {
            return contract._id == id;
          }
        );

        setAllContract(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options)?.format(date);
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {jobid && (
          <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1">
            <button
              type="button"
              className="close"
              onClick={() => setJobid(null)}
            >
              ×
            </button>
            <strong className="ml-2">contract activated successfully</strong>
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className="p-[11px] lg:px-13 lg:py-7">
            <h2
              className={`text-[23px] md:text-[29px] ${mulish600.className} mb-[18px]`}
            >
              My Contracts
            </h2>
            {allContract !== null && (
              <div className="client-container_syn">
                <div className="client_view_profile_backbutton_syn">
                  <div className="client-top-bar">
                    <div className="client-left-content">
                      <div
                        className="client-inner-left group"
                        onClick={() => {
                          router.push(`/clientContract`);
                        }}
                      >
                        <div className="client-backicon">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="40"
                              height="40"
                              rx="20"
                              fill="#E2E8F0"
                            />
                            <path
                              d="M15.828 19H28V21H15.828L21.192 26.364L19.778 27.778L12 20L19.778 12.222L21.192 13.636L15.828 19Z"
                              fill="#2D3748"
                            />
                          </svg>
                        </div>
                        <div
                          className={`text-base ${inter400.className} group-hover:text-[#2884CC] transition-colors duration-200 ease-linear`}
                        >
                          Back
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#e9f1ffe3] mt-[3%] p-[24px] rounded-[27px]">
                    <div
                      className={`${mulish600.className} text-[21px] text-[#000] mb-[10px]`}
                    >
                      {allContract[0]?.professional_data[0]?.first_name}{" "}
                      {allContract[0]?.professional_data[0]?.last_name}
                    </div>
                    <div
                      className={`text-[15px] text-[#434343] ${mulish500.className}`}
                    >
                      {allContract[0]?.contract_desc}
                      {""}
                    </div>
                    <div
                      className={`${mulish600.className} text-[21px] text-[#000] mb-[10px]`}
                    >
                      {allContract[0]?.jobs_data[0]?.job_title}
                    </div>
                    <div
                      className={`flex items-center flex-wrap gap-y-2 gap-x-5 ${mulish500.className} text-[15px] text-[#434343]`}
                    >
                      <div>
                        {allContract[0]?.jobs_data[0].budget_type === "Fixed"
                          ? "Fixed Price"
                          : "Range"}
                      </div>
                      <div className="flex items-center gap-2">
                        <strong className="shrink-0">Budget :</strong>
                        <p className="shrink-0">
                          {allContract[0]?.jobs_data[0].budget_type === "Fixed"
                            ? `N${allContract[0]?.jobs_data[0]?.budget_to}`
                            : `N${allContract[0]?.jobs_data[0]?.budget_from}-N${allContract[0]?.jobs_data[0]?.budget_to}`}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2">
                        <strong className="shrink-0">Date Started :</strong>
                        <p className="shrink-0">
                          {formatDate(allContract[0]?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`pt-[35px] pb-[30px] text-base ${inter600.className} flex flex-col md:flex-row items-center gap-2`}
                >
                  <button
                    className={`client-tab-button ${
                      activeTab === "milestone" ? "active" : ""
                    } text-center w-full md:w-auto border !border-[#eee] md:!border-transparent`}
                    onClick={() => handleTabClick("milestone")}
                  >
                    Milestones
                  </button>
                  <button
                    className={`client-tab-button ${
                      activeTab === "files" ? "active" : ""
                    } text-center w-full md:w-auto border !border-[#eee] md:!border-transparent`}
                    onClick={() => handleTabClick("files")}
                  >
                    Files
                  </button>

                  {allContract[0].type === "ended" ? (
                    <button
                      className={`client-tab-button ${
                        activeTab === "feedback" ? "active" : ""
                      }  text-center w-full md:w-auto border !border-[#eee] md:!border-transparent`}
                      onClick={() => handleTabClick("feedback")}
                    >
                      Feedback
                    </button>
                  ) : (
                    <button
                      className={`client-tab-button ${
                        activeTab === "feedback" ? "active" : ""
                      } cursor-no-drop text-center w-full  md:w-auto border !border-[#eee] md:!border-transparent`}
                    >
                      Feedback
                    </button>
                  )}
                </div>
                {activeTab === "milestone" && mileStoneData !== null && (
                  <Milestone
                    mileStoneData={mileStoneData}
                    id={id}
                    loadclientContarctDetailsData={
                      loadclientContarctDetailsData
                    }
                    handleTabClick={handleTabClick}
                    allContract={allContract}
                    myApplicationDetails={myApplicationDetails}
                    updatedMilstoneData={updatedMilstoneData}
                  />
                )}
                {activeTab === "files" && mileStoneData !== null && (
                  <File
                    mileStoneData={mileStoneData.file}
                    myApplicationFilesDetails={myApplicationFilesDetails}
                    SubmitedWorkeMilstone={SubmitedWorkeMilstone}
                  />
                )}
                {activeTab === "feedback" && (
                  <Feedback id={id} allContract={allContract} />
                )}
              </div>
            )}
          </div>
        )}
      </>
    </ErrorBoundary>
  );
}

export default ClientContractDetail;
