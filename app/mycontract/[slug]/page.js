"use client";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import Milestones from "./Milestones";
import Files from "./Files";
import Feedback from "./Feedback";
import { pjobdetail } from "../../api/api";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import Loader from "@/components/common/Loader";

const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

export default function ContractDetails({ params }) {
  const id = params.slug;

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [activeTab, setActiveTab] = useState("milestones");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const router = useRouter();
  const my_contracts = async () => {
    setLoading(true);
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
      if (data.success) {
        setContract(data.specificContract[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getjobdetails = async () => {
    try {
      const response = await pjobdetail(contract.job_id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    my_contracts();
  }, []);

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="p-[11px] lg:px-13 lg:py-7">
            <h2
              className={` text-[23px] md:text-[29px] ${mulish600.className} text-[#000000] mb-3`}
            >
              My Contracts
            </h2>
            <div className="border border-[#A6B7F4] rounded-[14px] bg-[#ffffff] p-[24px]">
              <div className="">
                <div
                  className="flex items-center gap-3 group cursor-pointer"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <div className="">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#E2E8F0" />
                      <path
                        d="M15.828 19H28V21H15.828L21.192 26.364L19.778 27.778L12 20L19.778 12.222L21.192 13.636L15.828 19Z"
                        fill="#2D3748"
                      />
                    </svg>
                  </div>
                  <div
                    className={`text-base ${inter400.className} group-hover:text-blue_600`}
                  >
                    Back
                  </div>
                </div>
              </div>
              <div className="bg-box_bg rounded-[27px] mt-8 p-[20px]">
                <div className="flex items-center justify-between">
                  <h1
                    className={`text-[20px] md:text-[25px] ${mulish600.className} text-[#000000]`}
                  >
                    Project Summary
                  </h1>
                  <div className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M21.2513 25H7.50125C6.12054 25 5.00125 23.8807 5.00125 22.5V8.75C5.00125 7.36929 6.12054 6.25 7.50125 6.25H12.5013V8.75H7.50125V22.5H21.2513V17.5H23.7513V22.5C23.7513 23.8807 22.632 25 21.2513 25ZM14.6263 17.1337L12.8638 15.3663L20.73 7.5H16.2513V5H25.0013V13.75H22.5013V9.26875L14.6263 17.1337Z"
                        fill="#2E3A59"
                      />
                    </svg>
                  </div>
                </div>
                <h2
                  className={`${mulish600.className} text-[16px] md:text-[21px] text-[#000000] my-3`}
                >
                  {contract && `${contract.contract_title}`}
                </h2>
                <h3
                  className={`text-[#434343] text-[15px] ${mulish400.className} tracking-wides`}
                >
                  {contract && `${contract?.job_id?.job_description}`}
                </h3>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row my-10 gap-2">
                <button
                  className={`text-[16px] ${
                    inter600.className
                  } bg-[#fff] px-3 py-2 text-[#000000] border border-[#eee] md:border-transparent rounded-[6px] cursor-pointer hover:bg-box_bg tracking-wide hover:text-[#3C64B1] ${
                    activeTab === "milestones" ? "bg-box_bg text-[#3C64B1]" : ""
                  }`}
                  onClick={() => handleTabClick("milestones")}
                >
                  Milestones
                </button>
                <button
                  className={`text-[16px] ${
                    inter600.className
                  } bg-[#fff] px-3 py-2 text-[#000000] border border-[#eee] md:border-transparent rounded-[6px] cursor-pointer hover:bg-box_bg tracking-wide hover:text-[#3C64B1] ${
                    activeTab === "files" ? "bg-box_bg text-[#3C64B1]" : ""
                  }`}
                  onClick={() => handleTabClick("files")}
                >
                  Files
                </button>
                {contract?.type === "ended" ? (
                  <button
                    className={`text-[16px] ${
                      inter600.className
                    } bg-[#fff] px-3 py-2 text-[#000000] border border-[#eee] md:border-transparent rounded-[6px] cursor-pointer hover:bg-box_bg tracking-wide hover:text-[#3C64B1] ${
                      activeTab === "feedback" ? "bg-box_bg text-[#3C64B1]" : ""
                    }`}
                    onClick={() => handleTabClick("feedback")}
                  >
                    Feedback
                  </button>
                ) : (
                  <button
                    className={`text-[16px] ${
                      inter600.className
                    } bg-[#fff] px-3 py-2 text-[#000000] border cursor-no-drop border-[#eee] md:border-transparent rounded-[6px]  hover:bg-box_bg tracking-wide hover:text-[#3C64B1] ${
                      activeTab === "feedback" ? "bg-box_bg text-[#3C64B1]" : ""
                    }`}
                  >
                    Feedback
                  </button>
                )}
              </div>
              {activeTab === "milestones" && (
                <Milestones
                  contract={contract}
                  handleTabClick={handleTabClick}
                  myContracts={my_contracts}
                />
              )}
              {activeTab === "files" && <Files contract={contract} />}
              {activeTab === "feedback" && <Feedback contract={contract} />}
            </div>
          </div>
        )}
      </>
    </ErrorBoundary>
  );
}
