import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import ContractModal from "./ContractModal";
import MakePaymentModel from "./makePaymentModel/page";
import Jobmodal from "./jobModal/page";
import StripePayment from "./../../../app/stripe/page";
import Flutterwave from "./../../../app/flutterwave/page";
import PaymentForm from "./../../../app/paystack/page";
import { createTheme, ThemeProvider, tooltipClasses } from "@mui/material";
import Tooltip from "@mui/material/Tooltip"; // Adjust the import according to your library
import {
  MilestoneStatusChange,
  postNotification,
  clientTransactions,
  milstoneData,
  update_Milstone_SubmitReview,
  makeEndContract,
} from "@/app/api/api";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import { useRouter } from "next/navigation";
import { useSocket } from "@/app/socketContext";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

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
const Milestone = (props) => {
  const router = useRouter();
  const {
    id,
    allContract,
    mileStoneData,
    loadclientContarctDetailsData,
    updatedMilstoneData,
    handleTabClick,
  } = props;
  const { myApplicationDetails } = props;
  const [openmodal, setOpenModal] = useState(false);
  const [myContractMilestone, setMyContractMilestone] = useState(null);
  const [myContractMilestoneDotMilestone, setMyContractMilestoneDotMilestone] =
    useState(null);

  const [selectedRevuewApplicationData, setSelectedRevuewApplicationData] =
    useState(null);

  const [shouldMakePaymentEnable, setShouldMakePaymentEnable] = useState(false);
  const [assignmentState, setAssignmentState] = useState({
    currentAssign: {},
    isCurrentAssign: false,
  });
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [paymentModel, setPaymentModel] = useState(false);
  const [FilterData, setFilterData] = useState();
  const [status, setStatus] = useState("");
  const [milstonCalculation, setmilstonCalculation] = useState(null);
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);
  const [isEndContractAlertOpen, setIsEndContractAlertOpen] = useState(false);
  const [shouldEndContractEnable, setShouldEndContractEnable] = useState(false);
  const [feedbackStatus, setfeedbackStatus] = useState(0);

  const handleEndContract = () => {
    if (shouldEndContractEnable) {
      setIsEndContractAlertOpen((isOpen) => !isOpen);
    }
  };

  useEffect(() => {
    callRepateValue();
  }, [allContract, id, mileStoneData]);

  const callRepateValue = () => {
    if (allContract !== null && mileStoneData !== null) {
      setMyContractMilestone(mileStoneData);
      const filtermilstonedata = mileStoneData.milstone?.filter((milestone) => {
        return milestone.professional_id === allContract[0].professional_id;
      });
      setMyContractMilestoneDotMilestone(filtermilstonedata);
      setmilstonCalculation(filtermilstonedata);
      //Geting data for edite contract.
      const filterData = filtermilstonedata?.filter(
        (milestone) => milestone.status === "0"
      );
      setFilterData({
        file: mileStoneData.file,
        message: mileStoneData.message,
        milstone: filterData,
        success: mileStoneData.success,
      });
    }
  };

  useEffect(() => {
    if (myContractMilestoneDotMilestone !== null) {
      const filteredAssignDataForPayment =
        myContractMilestoneDotMilestone?.filter(
          (milestone) => milestone.status === "1"
        );
      if (filteredAssignDataForPayment?.length > 0) {
        setShouldMakePaymentEnable(true);
      }
    }
  }, [myContractMilestoneDotMilestone]);

  const handleEditContractModel = () => {
    if (FilterData?.milstone?.length > 0) {
      setOpenModal("editContract");
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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

  const handlePaymentModalSubmit = () => {
    if (
      paymentMethod == "Stripe" &&
      assignmentState?.currentAssign?.selectedMilestone?.milestone_price < 800
    ) {
      // Show error message.
      setStatus("error");
      setOpenModal(false);
      setPaymentModel(false);
    } else {
      setOpenModal(false);
      setPaymentModel(true);
    }
  };
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const { socket } = useSocket();
  useEffect(() => {
    // get message from  server when a new message is sent by someone else in real time
    socket.on("milstonChagestatus", async (msg) => {
      try {
        const response = await milstoneData(msg.data.milestone.job_id);
        if (response?.status === 200) {
          if (response?.data?.success == true) {
            setMyContractMilestoneDotMilestone(response?.data?.milstone);
            setmilstonCalculation(response?.data?.milstone);
            const filterData = response?.data?.milstone?.filter(
              (milestone) => milestone.status === "0"
            );
            setFilterData({
              file: response?.data?.file,
              message: response?.data?.message,
              milstone: filterData,
              success: response?.data?.success,
            });
            updatedMilstoneData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  }, []);
  const selectedPaymentOption = (method) => {
    setPaymentMethod(method);
  };

  const handlepaymentmethodclose = () => {
    setPaymentMethod(null);
    setPaymentModel(false);
  };
  const handleModalSubmit = async (milstoneData) => {
    const data = {
      milestones: milstoneData,
      jobid: allContract[0].job_id,
    };
    await update_Milstone_SubmitReview(data).then((res) => {});
    setOpenModal(false);
  };

  function hasPendingMilestoneBefore(index, milestones) {
    for (let i = 0; i < index; i++) {
      if (milestones[i].status === "0") {
        return true;
      }
    }
    return false;
  }

  const handleAssignToPayClick = async (selectedMilestone) => {
    const updatedMilestones = myContractMilestoneDotMilestone.map(
      (mileStone) => {
        if (selectedMilestone._id === mileStone._id) {
          return { ...mileStone, status: "1" };
        }
        return mileStone;
      }
    );
    setMyContractMilestoneDotMilestone(updatedMilestones);

    setAssignmentState({
      currentAssign: { selectedMilestone },
      isCurrentAssign: true,
    });
  };

  const handleApproveClick = async (selectedMilestone) => {
    const updatedMilestones = myContractMilestoneDotMilestone.map(
      (mileStone) => {
        if (selectedMilestone._id === mileStone._id) {
          return { ...mileStone, status: "3" };
        }
        return mileStone;
      }
    );
    setMyContractMilestoneDotMilestone(updatedMilestones);
    try {
      await MilestoneStatusChange({
        id: selectedMilestone._id,
        status: "3",
      })
        .then((response) => {
          // console.log("milestone update...");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      socket.emit("milstonChagestatus", {
        id: selectedMilestone._id,
        status: "3",
      });
      const jobID = allContract[0]._id;
      const route = `/mycontract/${jobID}`;
      const dataForNofitication = {
        rout: route,
        send_by: "client",
        subject: "approved",
        milestone_Task: selectedMilestone.milestone_task,
        professional_id: selectedMilestone.professional_id,
        job_id: selectedMilestone.job_id,
        email: allContract[0].professional_data[0].email,
        first_name: allContract[0].professional_data[0].first_name,
        last_name: allContract[0].professional_data[0].last_name,
      };
      const messageForShow = `${allContract[0].professional_data[0].first_name} ${allContract[0].professional_data[0].last_name}has Approved your work on ${selectedMilestone.milestone_task}`;
      await postNotification(dataForNofitication).then((res) => {
        const data = {
          rout: route,
          status: 0,
          message: messageForShow,
          professional_id: selectedMilestone.professional_id,
        };
        socket.emit("new_notification", data);
        socket.emit("update_notification", {
          login_as: 2,
          id: selectedMilestone.professional_id,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectClick = async (selectedMilestone) => {
    const updatedMilestones = myContractMilestoneDotMilestone.map(
      (mileStone) => {
        if (selectedMilestone._id === mileStone._id) {
          return { ...mileStone, status: "4" };
        }
        return mileStone;
      }
    );
    setMyContractMilestoneDotMilestone(updatedMilestones);
    setmilstonCalculation(updatedMilestones);
    try {
      socket.emit("milstonChagestatus", {
        id: selectedMilestone._id,
        status: "4",
      });
      const jobId = allContract[0]._id;
      const routee = `/mycontract/${jobId}`;
      const dataForNofitication = {
        rout: routee,
        send_by: "client",
        subject: "rejected",
        professional_id: selectedMilestone.professional_id,
        job_id: selectedMilestone.job_id,
        email: allContract[0].professional_data[0].email,
        first_name: allContract[0].professional_data[0].first_name,
        last_name: allContract[0].professional_data[0].last_name,
      };
      const messageShow = `${allContract[0].professional_data[0].first_name} ${allContract[0].professional_data[0].last_name} has Rejected your work on ${selectedMilestone.milestone_task}`;
      await postNotification(dataForNofitication).then((res) => {
        const data = {
          rout: routee,
          status: 0,
          message: messageShow,
          professional_id: selectedMilestone.professional_id,
        };
        socket.emit("new_notification", data);
        socket.emit("update_notification", {
          login_as: 2,
          id: selectedMilestone.professional_id,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getContractBudget = () => {
    if (myContractMilestoneDotMilestone !== null) {
      let count = 0;
      myContractMilestoneDotMilestone?.map((milestone) => {
        count = count + parseInt(milestone.milestone_price);
      });
      return count;
    }
  };

  const getMyEscrowAmount = () => {
    if (milstonCalculation !== null) {
      let count = 0;
      milstonCalculation?.forEach((val) => {
        if (val.status === "1" || val.status === "2" || val.status == "4") {
          count += parseInt(val.milestone_price);
        }
      });
      return count;
    }
  };

  const getMyPaidAmount = () => {
    if (myContractMilestoneDotMilestone !== null) {
      let count = 0;
      myContractMilestoneDotMilestone?.forEach((val) => {
        if (val.status === "3") {
          count += parseInt(val.milestone_price);
        }
      });
      return count;
    }
  };

  const getMyPendingAmount = () => {
    if (milstonCalculation !== null) {
      let count = 0;
      milstonCalculation?.forEach((val) => {
        if (val.status === "0") {
          count += parseInt(val.milestone_price);
        }
      });
      return count;
    }
  };

  const handleMakePaymentClick = async () => {
    const filteredAssignDataForPayment = myContractMilestoneDotMilestone.filter(
      (milestone) => milestone.status === "1"
    );
    if (filteredAssignDataForPayment.length > 0) {
      setOpenModal("makePayment");
    }
  };
  const disableMakePayment = () => {
    setAssignmentState({
      currentAssign: {},
      isCurrentAssign: false,
    });
    const filterData = myContractMilestoneDotMilestone?.filter(
      (milestone) => milestone.status === "0"
    );
    setFilterData({
      file: mileStoneData.file,
      message: mileStoneData.message,
      milstone: filterData,
      success: mileStoneData.success,
    });
  };
  const updateCalculation = () => {
    setmilstonCalculation(myContractMilestoneDotMilestone);
  };
  useEffect(() => {
    const areAllStatusThree = myContractMilestoneDotMilestone?.every(
      (milestone) => milestone.status === "3"
    );
    setShouldEndContractEnable(areAllStatusThree);
  }, [myContractMilestoneDotMilestone]);

  const fullUrl = window.location.href;
  const idMatch = fullUrl.match(/(?:file)=([^&]+)/);
  const jobid = idMatch ? idMatch[1] : null;
  // const statusMatch = fullUrl.match(/\?(.*?)=/);
  // const jobstatus = statusMatch ? statusMatch[1] : null;

  // console.log("jobstatus...",jobstatus)
  // console.log("jobid...", jobid);

  if (jobid) {
    // console.log("tessttt");
    handleTabClick("files");
  }

  const endContract = async (handleTabClick) => {
    try {
      const response = await makeEndContract({ id: allContract[0]._id });
      const jobID = allContract[0]._id;
      const route = `/mycontract/${jobID}`;
      const dataForNofitication = {
        rout: route,
        send_by: "client",
        subject: "c_endcontract",
        professional_id: allContract[0].professional_id,
        job_id: allContract[0].job_id,
        email: allContract[0].professional_data[0].email,
        first_name: allContract[0].professional_data[0].first_name,
        last_name: allContract[0].professional_data[0].last_name,
      };
      const messageForShow = `${allContract[0].professional_data[0].first_name} ${allContract[0].professional_data[0].last_name}has ended contract for project ${allContract[0].jobs_data[0].job_title}`;
      await postNotification(dataForNofitication).then((res) => {
        const data = {
          rout: route,
          status: 0,
          message: messageForShow,
          professional_id: allContract[0].professional_id,
        };
        socket.emit("new_notification", data);
        socket.emit("update_notification", {
          login_as: 2,
          id: allContract[0].professional_id,
        });
      });
      if (response.status === 200) {
        loadclientContarctDetailsData();
        // router.push(`/clientContract`);
        // Redirect to feedback if the contract ended successfully
        if (allContract[0]?.type !== "ended") {
          handleTabClick("feedback");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<Error />}>
        <>
          <div>
            <div class="client-cont-box gap-2 md:gap-0">
              <div className="flex flex-row flex-1 md:flex-0">
                <div class="client-contract-box flex-1 md:flex-0">
                  Budget
                  <span className="client-contract-box-span">
                    N {getContractBudget()}
                  </span>
                </div>
                <div class="client-contract-box flex-1 md:flex-0">
                  In Escrow
                  <span className="client-contract-box-span">
                    N {getMyEscrowAmount()}
                  </span>
                </div>
              </div>
              <div className="flex flex-row flex-1 md:flex-0">
                <div class="client-contract-box flex-1 md:flex-0">
                  Milestones Paid
                  <span className="client-contract-box-span">
                    N {getMyPaidAmount()}
                  </span>
                </div>
                <div class="client-contract-box flex-1 md:flex-0">
                  Outstanding Milestones
                  <span className="client-contract-box-span">
                    N {getMyPendingAmount()}
                  </span>
                </div>
              </div>
            </div>
            {myContractMilestoneDotMilestone !== null &&
              myContractMilestoneDotMilestone?.map(
                (milestone, index, milestones) => {
                  const indexOfStatusZero = milestones.findIndex(
                    (milestone) => milestone.status === "0"
                  );
                  const previousMilestoneStatusIsApproved =
                    index > 0 && milestones[index - 1].status === "3";
                  return (
                    <div key={index}>
                      <div
                        style={{
                          fontWeight: "500",
                          fontSize: "19px",
                          marginTop: "10px",
                        }}
                      >
                        {index + 1} : {milestone?.milestone_task}
                      </div>
                      <div style={{ borderBottom: "2px solid #a6b7f4" }}>
                        <div className="client-cont-box2">
                          <strong
                            style={{ display: "flex", alignItems: "center" }}
                            className="client-contract-box2"
                          >
                            Status :&nbsp;
                            {milestone.status === "0" && (
                              <span
                                className="client-contract-box-span"
                                style={{ color: "#207bd6" }}
                              >
                                Pending
                              </span>
                            )}
                            {milestone.status === "1" && (
                              <span
                                className="client-contract-box-span"
                                style={{ color: "#207bd6" }}
                              >
                                Assigned
                              </span>
                            )}
                            {milestone.status === "2" && (
                              <span
                                className="client-contract-box-span"
                                style={{ color: "#207bd6" }}
                              >
                                Submitted
                              </span>
                            )}
                            {milestone.status === "3" && (
                              <span
                                className="client-contract-box-span"
                                style={{ color: "#207bd6" }}
                              >
                                Approved
                              </span>
                            )}
                            {milestone.status === "4" && (
                              <span
                                className="client-contract-box-span"
                                style={{ color: "#207bd6" }}
                              >
                                Rejected
                              </span>
                            )}
                          </strong>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                            className="client-contract-box2"
                          >
                            Select Status :&nbsp;
                            <button
                              onClick={
                                (index === 0 && index === indexOfStatusZero) ||
                                (index !== 0 &&
                                  index === indexOfStatusZero &&
                                  previousMilestoneStatusIsApproved)
                                  ? () => handleAssignToPayClick(milestone)
                                  : null
                              }
                              className={
                                (index === 0 && index === indexOfStatusZero) ||
                                (index !== 0 &&
                                  index === indexOfStatusZero &&
                                  previousMilestoneStatusIsApproved)
                                  ? "client-contract-box-span-button"
                                  : "client-contract-box-span-button payment-disabled-button"
                              }
                            >
                              Assign to pay
                            </button>
                          </div>
                          <button
                            className={
                              milestone.status === "2"
                                ? "client-contract-box-span-button client-contract-box2"
                                : "client-contract-box-span-button client-contract-box2 payment-disabled-button"
                            }
                            onClick={
                              milestone.status === "2"
                                ? () => handleApproveClick(milestone)
                                : null
                            }
                          >
                            Approve
                          </button>
                          <button
                            className={
                              milestone.status === "2"
                                ? "client-contract-box-span-button client-contract-box2"
                                : "client-contract-box-span-button client-contract-box2 payment-disabled-button"
                            }
                            onClick={
                              milestone.status === "2"
                                ? () => handleRejectClick(milestone)
                                : null
                            }
                          >
                            Reject
                          </button>
                          <div className="flex items-center ${mulish700.className} mr-5 text-[14px]">
                            <p className={`${mulish700.className}`}>Amount :</p>
                            <p className="ml-1">N{milestone.milestone_price}</p>
                          </div>
                          <div className="flex items-center text-[14px]">
                            <p className={`${mulish700.className}`}>
                              Date Started :
                            </p>
                            <p className="ml-1">
                              {formatDate(milestone.milestone_start_date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-4 text-[14px]">
                          <p className={`${mulish700.className}`}>
                            Date Completed :
                          </p>
                          <p className="ml-1">
                            {formatDate(milestone.milestone_end_date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            <Tooltip
              title="Process Payment"
              placement="bottom"
              arrow
              componentsProps={tooltipClass}
            >
              <button
                onClick={
                  assignmentState.isCurrentAssign
                    ? () => handleMakePaymentClick()
                    : null
                }
                className={
                  assignmentState.isCurrentAssign
                    ? "client-cont-end-button mr-5"
                    : "client-cont-end-button mr-5 payment-disabled-button"
                }
              >
                Make Payment
              </button>
            </Tooltip>

            {allContract[0]?.type === "ended" ? (
              <Tooltip
                title="Change Contract"
                placement="bottom"
                arrow
                componentsProps={tooltipClass}
              >
                <button className="client-cont-end-button payment-disabled-button">
                  Edit Contract
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                title="Change Contract"
                  placement="bottom"
                arrow
                componentsProps={tooltipClass}
              >
                <button
                  className={
                    FilterData?.milstone?.length == 0
                      ? "client-cont-end-button payment-disabled-button"
                      : "client-cont-end-button"
                  }
                  onClick={() => handleEditContractModel()}
                  disabled={FilterData?.milstone?.length == 0 && true}
                >
                  Edit Contract
                </button>
              </Tooltip>
            )}

            {allContract[0]?.type === "ended" ? (
              <></>
            ) : (
              <Tooltip
                title="Finish Contract"
                  placement="bottom"
                arrow
                componentsProps={tooltipClass}
              >
                <button
                  className={
                    shouldEndContractEnable
                      ? "client-cont-end-button ml-5"
                      : "client-cont-end-button ml-5 payment-disabled-button"
                  }
                  onClick={() => handleEndContract()}
                >
                  End Contract
                </button>
              </Tooltip>
            )}
            {isEndContractAlertOpen && (
              <div className="fixed grid content-center top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                <div className="flex h-96 m-auto justify-center py-10">
                  <div className="bg-white h-60 w-96 rounded-[20px] relative slideInFromTop ">
                    <div className="h-[67%] justify-center border-b border-[#eee] grid content-center">
                      <div className="text-center w-80 pt-2.5">
                        <img
                          className="m-auto"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABo0lEQVR4nO2ZsUoDQRCGP0Eigo1gY2EigvgE2muiGGx8BStLS9HKVxAkJp2vYG1pZWdnoRiT+ABRBCGeriysMBxGcrvmLqfzwcKm2H9mdnaGMAeKoiijzjzQADpABJghr8jZqgOlUOc3gOcUnDZ91hNQCbn5LJ03IoiiTwANIXIPrAEFhk8BKANNYf/UR6gjBKzzaVMW9ls+ArJg07j5OIVYYSdGvsOsMCE+hAawBTy6p1jNYwAdcb7tqWE0APwzUHVZsLe/mccM/AZGA+AfZ2DJvf8HYDGPARyK8wd5DOBInLf71H0wGgCaAaNPCC1itAuhbdSPfdFB7D53XWgBuHPL7lP3Icr7VKKd8VyoIuzbf7SJqQuBphNMazK3HpvM1XyESm4uOegM8w04AyZ+0BwHToBeAt2u72wUd+tJgrDrApj6RmsSOE+o1XUjxiCKLoWtBN8HroAZoTENXA54NnK2aiE374Pt9R/CkRtgDpgFrmNOHgNjjCC7sSy1XAf5+v0O7DHibAOvfYp8h5ywGiv+l4ABb2YsA7durWTnhqL8bT4BzP6f7sXMMdAAAAAASUVORK5CYII="
                        />
                        <h1
                          className={`${inter600.className} p-5 text-base text-[#000000]  `}
                        >
                          You are a Praiki Champion, Click ok to share feedback
                        </h1>
                      </div>
                    </div>

                    <div className="flex justify-center gap-5 items-center p-5">
                      {/* <button
                      className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                      onClick={() => handleEndContract()}
                    >
                      Cancel
                    </button> */}
                      <button
                        className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                        onClick={() => endContract(handleTabClick)}
                      >
                        ok
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openmodal === "editContract" && (
              <Jobmodal
                mileStoneData={FilterData}
                selectedRevuewApplicationData={selectedRevuewApplicationData}
                onClose={handleCloseModal}
                allContract={allContract}
                isOpen={openmodal}
                jobid={allContract[0].job_id}
                jobData={allContract[0].jobs_data[0]}
                isReview={true}
                handleModalSubmit={handleModalSubmit}
              />
            )}
            {openmodal === "makePayment" && (
              <MakePaymentModel
                onClose={handleCloseModal}
                isOpen={openmodal}
                handleModalSubmit={handlePaymentModalSubmit}
                selectedPaymentOption={selectedPaymentOption}
              />
            )}

            {paymentModel && (
              <>
                {paymentMethod === "Stripe" && (
                  <StripePayment
                    amount={
                      assignmentState?.currentAssign?.selectedMilestone
                        ?.milestone_price * 100
                    }
                    jobId={
                      assignmentState?.currentAssign?.selectedMilestone?.job_id
                    }
                    mileid={
                      assignmentState?.currentAssign?.selectedMilestone?._id
                    }
                    disableMakePayment={disableMakePayment}
                    contractId={allContract[0]?._id}
                    paymentStatu={updateCalculation}
                  />
                )}
                {paymentMethod === "Paystack" && (
                  <PaymentForm
                    amount={
                      assignmentState?.currentAssign?.selectedMilestone
                        ?.milestone_price * 100
                    }
                    jobId={
                      assignmentState?.currentAssign?.selectedMilestone?.job_id
                    }
                    mileid={
                      assignmentState?.currentAssign?.selectedMilestone?._id
                    }
                    disableMakePayment={disableMakePayment}
                    paymentStatu={updateCalculation}
                    resetPaymentMethod={handlepaymentmethodclose}
                  />
                )}
                {paymentMethod === "Flutterwave" && (
                  <Flutterwave
                    amount={
                      assignmentState?.currentAssign?.selectedMilestone
                        ?.milestone_price
                    }
                    jobId={
                      assignmentState?.currentAssign?.selectedMilestone?.job_id
                    }
                    mileid={
                      assignmentState?.currentAssign?.selectedMilestone?._id
                    }
                    disableMakePayment={disableMakePayment}
                    milstonPaymentType={allContract[0]?.bargaining_option}
                    paymentStatu={updateCalculation}
                    resetPaymentMethod={handlepaymentmethodclose}
                  />
                )}
              </>
            )}
          </div>
          {status == "error" && (
            <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
              <div className="flex justify-center py-10">
                <div className="bg-[#f87171] min-w-[40%] rounded-[20px] relative slideInFromTop ">
                  <div
                    className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                    onClick={() => setStatus("")}
                  >
                    {cancelIcon}
                  </div>
                  <h1
                    className={`${inter600.className} p-5 text-base text-[#000000]`}
                  >
                    Your amount needs to be more than N800 for stripe payment.
                  </h1>
                </div>
              </div>
            </div>
          )}
        </>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Milestone;
