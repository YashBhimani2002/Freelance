"use client";
import React, { useEffect, useState } from "react";
import "./styles.css";
import WorkProgress from "./workProgress/page";
import InReview from "./InReview/page";
import Available from "./available/page";
import { getMilestoneData } from "../api/api";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import WithdrawalLoader from "@/components/common/WithdrawalLoader";
import Error  from "../error";
import ErrorBoundary  from "../ErrorBoundry";
import Loader from "../../components/common/Loader/pageLoader";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";


const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish900 = Mulish({ subsets: ["latin"], weight: "700" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const cancelIcon = (
  <svg
    class="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18 18 6m0 12L6 6"
    />
  </svg>
);

const Earningoverview = () => {
  //Aplying style to tab btns
  const tabs = ["Available", "In Review", "Work in Progress"];
  const [activeTab, setActiveTab] = useState("Available");
  const [withdrawalLoader, setWithdrawalLoader] = useState(false);
  const [milestoneData, setMilestoneData] = useState({
    available: [],
    inReview: [],
    workInProgress: [],
    AllMilestone: [],
  });
  const [status, setStatus] = useState("");
  const [bankDetails, setBankDetails] = useState([]);
  const [Msg, setMsg] = useState("");
  const tabStyle = {
    borderRadius: "6px",
    padding: "8px 15px",
    color: "#000",
    fontSize: "16px",
    lineHeight: "24px",
    listStyle: "none",
    cursor: "pointer!important",
  };

  const activeTabStyle = {
    ...tabStyle,
    background: "#E9F1FF",
    color: "#3C64B1",
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchMilestoneData();
  }, []);

  const fetchMilestoneData = async () => {
    try {
      const response = await getMilestoneData(); // Fetch milestone data from API
      const { milestones, bankDetails } = response?.data;
      setMilestoneData(milestones);
      setBankDetails(bankDetails);
    } catch (error) {
      console.error("Error fetching milestone data:", error);
    }
  };

  // Function to calculate total amount for a specific status
  const calculateTotalAmount = (milestones) => {
    let totalAmount = 0;
    if (milestones) {
      milestones.forEach((milestone) => {
        totalAmount += milestone.milestone_price;
      });
    }
    return totalAmount;
  };
  const PopupOfWithdrawl = (status, msg) => {
    setStatus(status);
    fetchMilestoneData();
    setMsg(msg);
  };
  const theme = createTheme({
    palette: {
      background: {
        paper: "#1168AD",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const tooltipClass = {
    popper: {
      sx: {
        [`& .${tooltipClasses.arrow}`]: {
          color: (theme) => theme.palette.background.paper,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      },
    },
  };
  return (
    <ErrorBoundary fallback= {<Error/>}>
    <ThemeProvider theme={theme}>
        <div className="Earning-main  lg:px-12 lg:py-4">
          <div className="row">
            <div className="grid grid-cols-1">
              <h2
                className={`${mulish600.className} font-600 text-[29px] mb-[18px] text-black capitalize`}
              >
                <Tooltip title='Earnings Overview' placement="right" arrow componentsProps={tooltipClass}>
                Earnings Overview
                </Tooltip>
              </h2>

              <div className="mil-box ">
                <ul className="mb-4">
                  <li
                    className={`${mulish600.className} font-600 tracking-wide `}
                  >
                    Available
                    <span className={`${mulish700.className}`}>
                      N{calculateTotalAmount(milestoneData?.available)}
                    </span>
                  </li>
                  <li className={`${mulish600.className} font-600 tracking-wide`}>
                    In Review
                    <span className={`${mulish700.className}`}>
                      N{calculateTotalAmount(milestoneData?.inReviewes)}
                    </span>
                  </li>
                  <li className={`${mulish600.className} font-600 tracking-wide`}>
                    Work in Progress
                    <span className={`${mulish700.className}`}>
                      N{calculateTotalAmount(milestoneData?.workProgress)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="tab-over-1 ">
                <div className="tab-types">
                  <ul className="flex items-center flex-col md:flex-row p-0 gap-3 mt-3 mb-[34px] ">
                    {tabs.map((tab,index) => (
                      <li
                        key={index}
                        style={activeTab === tab ? activeTabStyle : tabStyle}
                        className={`tab1 ${inter600.className} font-600 hover:bg-bg_indigo_600  tracking-wide rounded-[6px] w-full md:w-auto text-center border border-[#eee] md:border-transparent cursor-pointer`}
                        onClick={() => handleTabClick(tab)}
                      >
                        {tab}
                      </li>
                    ))}
                  </ul>
                  <div style={{}}>
                    {activeTab === "Available" && (
                      <Available
                        milestones={milestoneData?.available}
                        allMilestone={milestoneData?.AllMilestone}
                        bankDetails={bankDetails}
                        PopupOfWithdrawl={PopupOfWithdrawl}
                      />
                    )}
                    {activeTab === "In Review" && (
                      <InReview
                        milestones={milestoneData?.inReview}
                        milestonePayment={milestoneData?.inReviewes}
                        allMilestone={milestoneData?.AllMilestone}
                      />
                    )}
                    {activeTab === "Work in Progress" && (
                      <WorkProgress
                        milestones={milestoneData?.workInProgress}
                        milestonePayment={milestoneData?.workProgress}
                        allMilestone={milestoneData?.AllMilestone}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {status == "sucess" && (
          <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
            <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
              <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                <div
                  className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                  onClick={() => setStatus("")}
                >
                  {cancelIcon}
                </div>
                <img
                  className="m-auto pt-[10px]"
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/ok--v1.png"
                  alt="ok--v1"
                />
                <h1
                  className={`font-mulish font-[400] text-[21px] mt-[10px] mb-[20px] text-center text-base text-[#000000]`}
                >
                  {Msg}
                </h1>
              </div>
            </div>
          </div>
        )}
        {status == "error" && (
          <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
            <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
              <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                <div
                  className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                  onClick={() => setStatus("")}
                >
                  {cancelIcon}
                </div>
                <img
                  className="m-auto pt-[10px]"
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/cancel.png"
                  alt="cancel"
                />
                <h1
                  className={`font-mulish font-[400] text-[21px] mt-[10px] mb-[20px] text-center text-base text-[#000000]`}
                >
                    {Msg}
                  </h1>
              </div>
            </div>
          </div>
        )}
      </ThemeProvider>
      </ErrorBoundary>
  );
};

export default Earningoverview;
