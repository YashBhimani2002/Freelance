"use client";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import paystacklogo from "../../../public/images/logo/paystacklogo.png";
import stripelogo from "../../../public/images/logo/stripelogo.png";
import flutterwavelogo from "../../../public/images/logo/flutterwavelogo.png";
import {
  changeStatusOfMilestone,
  milstoneData,
  makeEndContract,
  postNotification,
  MilestoneStatusChange,
} from "../../api/api";
import { createTheme, ThemeProvider, tooltipClasses } from "@mui/material";
import Tooltip from "@mui/material/Tooltip"; // Adjust the import according to your library
import { useRouter } from "next/navigation";
import SubmitDataLoader from "@/components/common/SubmitDataLoader";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import Loader from "@/components/common/Loader";
import { useSocket } from "../../../app/socketContext";
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

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

const Milestones = (props) => {
  const router = useRouter();
  const { contract, handleTabClick, myContracts } = props;
  const [isEndContractAlertOpen, setIsEndContractAlertOpen] = useState(false);
  const [MilstoneData, setMilstoneData] = useState([]);
  const [shouldEndContractEnable, setShouldEndContractEnable] = useState(false);
  const [filldescription, setfilldescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const jobId = contract?.job_id;
  const handleEndContract = () => {
    if (shouldEndContractEnable) {
      setIsEndContractAlertOpen((isOpen) => !isOpen);
    }
  };

  const getMilstonData = async () => {
    setLoading(true);
    try {
      const respons = await milstoneData(jobId);
      if (respons?.status == 200) {
        setMilstoneData(respons?.data?.milstone);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const { socket } = useSocket();
  useEffect(() => {
    // get message from  server when a new message is sent by someone else in real time
    socket.on("milstonChagestatus", async (msg) => {
      try {
        const respons = await milstoneData(msg.data.milestone.job_id);
        if (respons?.status == 200) {
          if (respons?.data?.success == true) {
            setMilstoneData(respons?.data?.milstone);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  useEffect(() => {
    if (jobId) {
      getMilstonData();
    }
  }, [jobId]);

  useEffect(() => {
    const areAllStatusThree = MilstoneData.every(
      (milestone) => milestone.status === "3"
    );
    setShouldEndContractEnable(areAllStatusThree);
  }, [MilstoneData]);

  // Function to format date in "MMM DD, YYYY" format
  const start_date = new Date(MilstoneData?.milestone_start_date);
  const end_date = new Date(MilstoneData?.milestone_end_date);
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMyBudget = () => {
    let count = 0;
    MilstoneData.map((val) => {
      count = count + val.milestone_price;
    });
    return count;
  };

  const getMyEscrowAmount = () => {
    let count = 0;
    MilstoneData.forEach((val) => {
      if (val.status === "1" || val.status === "2" || val.status === "4") {
        count += val.milestone_price;
      }
    });
    return count;
  };

  const getMyPaidAmount = () => {
    let count = 0;
    MilstoneData.forEach((val) => {
      if (val.status === "3") {
        count += val.milestone_price;
      }
    });
    return count;
  };

  const getMyPendingAmount = () => {
    let count = 0;
    MilstoneData.forEach((val) => {
      if (val.status === "0") {
        count += val.milestone_price;
      }
    });
    return count;
  };

  const [showPopup, setShowPopup] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedMilestoneId, setselectedMilestoneid] = useState();
  const [error, setfileeror] = useState(false);
  const [LoadingSubmiteButton, setLoadingSubmiteButton] = useState(false);
  const [submitDataLoader, setSubmitDataLoader] = useState(false);
  const handleOpenPopup = (selectedMilestone) => {
    setselectedMilestoneid(selectedMilestone._id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setLoadingSubmiteButton(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setfileeror(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };
  const handleFileChange = (event) => {
    setfileeror(false);
    const droppedFiles = Array.from(event.target.files);
    setFiles(droppedFiles);
  };
  const browseFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  const handleFileUpload = async () => {
    try {
      if (files.length > 0) {
        setSubmitDataLoader(true);
        const formDataToSend = new FormData();
        files.forEach((file) => {
          formDataToSend.append("files", file);
        });
        formDataToSend.append("id", selectedMilestoneId);
        formDataToSend.append("filldescription", filldescription);

        const response = await changeStatusOfMilestone(formDataToSend);
        const jobID = jobId;
        const route = `/clientContract/${contract._id}?file=true`;
        const dataForNofitication = {
          rout: route,
          send_by: "Professional",
          subject: "submit_work",
          client_id: response?.data?.data?.user._id,
          job_id: jobId,
          email: response?.data?.data?.user?.email,
          first_name: response?.data?.data?.user?.first_name,
          last_name: response?.data?.data?.user?.last_name,
          milestone_Task: response?.data?.data?.milestone?.milestone_task,
        };

        if (response?.status == 200) {
          socket.emit("milstonChagestatus", {
            id: selectedMilestoneId,
            status: "2",
          });
          await MilestoneStatusChange({
            id: selectedMilestoneId,
            status: "2",
          });
          await postNotification(dataForNofitication).then((res) => {
            const messageShow = `${response?.data?.data?.client?.first_name} ${response?.data?.data?.client?.last_name} has submitted Work for "${response?.data?.data?.milestone?.milestone_task}"`;
            const data = {
              message: messageShow,
              professional_id: response?.data?.data?.user._id,
              rout: route,
              status: 0,
            };
            socket.emit("new_notification", data);
            socket.emit("update_notification", {
              login_as: 2,
              id: response?.data?.data?.user._id,
            });
            if (res.status == 200) {
              setSubmitDataLoader(false);
            }
          });
          setSubmitDataLoader(false);
          setStatus("sucess");
          const updatedMilestones = MilstoneData.map((mileStone) => {
            if (selectedMilestoneId === mileStone._id) {
              return { ...mileStone, status: "2" };
            }
            return mileStone;
          });
          setMilstoneData(updatedMilestones);
          setFiles([]);
          setfilldescription("");
        } else {
          setStatus("error");
        }
        setFiles([]);
        handleClosePopup();
        setLoadingSubmiteButton(false);
      } else {
        setfileeror(true);
        setLoadingSubmiteButton(false);
        setSubmitDataLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitWorkClick = async (selectedMilestone) => {
    const updatedMilestones = MilstoneData.map((mileStone) => {
      if (selectedMilestone._id === mileStone._id) {
        return { ...mileStone, status: "2" };
      }
      return mileStone;
    });
    setMilstoneData(updatedMilestones);
    try {
      const response = await changeStatusOfMilestone({
        id: selectedMilestone._id,
        status: "2",
      });
      await postNotification(dataForNotification).then((res) => {
        if (res?.status == 200) {
        }
      });
    } catch (error) {
      console.error(error);
    }
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

  const endContract = async (handleTabClick) => {
    try {
      const response = await makeEndContract({ id: contract._id });
      if (response.status === 200) {
        myContracts();
        handleTabClick("feedback");
        const route = `/clientContract/${contract._id}`;
        const dataNofitication = {
          rout: route,
          send_by: "Professional",
          subject: "p_endcontract",
          client_id: response?.data?.updatedContract?.client_id?._id,
          job_id: jobId,
          email: response?.data?.updatedContract?.client_id?.email,
          first_name: response?.data?.updatedContract?.client_id?.first_name,
          last_name: response?.data?.updatedContract?.client_id?.last_name,
        };

        await postNotification(dataNofitication).then((res) => {
          const messageShow = `${response?.data?.updatedContract?.client_id?.first_name} ${response?.data?.updatedContract?.client_id?.last_name} has ended contract for project "${response?.data?.data?.milestone?.milestone_task}"`;
          const data = {
            message: messageShow,
            client_id: response?.data?.updatedContract?.client_id?._id,
            rout: route,
            status: 0,
          };
          socket.emit("new_notification", data);
          socket.emit("update_notification", {
            login_as: 1,
            id: response?.data?.updatedContract?.client_id?._id,
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<Error />}>
        <>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div>
                <div
                  className={`flex flex-col md:flex-row flex-wrap items-center justify-start text-[#2D3748] gap-5`}
                >
                  <div
                    className={`w-full shrink-0 md:w-auto border rounded-[12px] border-[#E2E8F0] flex flex-col p-[15px] text-sm ${mulish700.className}`}
                  >
                    Budget
                    <span
                      className={`text-[16px] mt-[5px] ${mulish700.className}`}
                    >
                      N {getMyBudget()}
                    </span>
                  </div>
                  <div
                    className={`w-full shrink-0 md:w-auto border rounded-[12px] border-[#E2E8F0] flex flex-col p-[15px] text-sm ${mulish700.className}`}
                  >
                    In Escrow
                    <span
                      className={`text-[16px] mt-[5px] ${mulish700.className}`}
                    >
                      N {getMyEscrowAmount()}
                    </span>
                  </div>
                  <div
                    className={`w-full shrink-0 md:w-auto border rounded-[12px] border-[#E2E8F0] flex flex-col p-[15px] text-sm ${mulish700.className}`}
                  >
                    Milestones Paid
                    <span
                      className={`text-[16px] mt-[5px] ${mulish700.className}`}
                    >
                      N {getMyPaidAmount()}
                    </span>
                  </div>
                  <div
                    className={`w-full shrink-0 md:w-auto border rounded-[12px] border-[#E2E8F0] flex flex-col p-[15px] text-sm ${mulish700.className}`}
                  >
                    Outstanding Milestones
                    <span
                      className={`text-[16px] mt-[5px] ${mulish700.className}`}
                    >
                      N {getMyPendingAmount()}
                    </span>
                  </div>
                </div>
                {MilstoneData && MilstoneData.length > 0 ? (
                  MilstoneData.slice().map((val, index) => (
                    <div key={index}>
                      <div
                        style={{
                          fontWeight: "500",
                          fontSize: "19px",
                          marginTop: "10px",
                        }}
                      >
                        {index + 1} : {val?.milestone_task}
                      </div>
                      <div className="flex justify-start items-center flex-col md:flex-row gap-5">
                        <div className="flex flex-wrap items-center  gap-x-5 gap-y-2  w-full">
                          <div
                            className={`text-[#434343] ${mulish700.className} text-[14px]`}
                          >
                            Status:&nbsp;
                            <span
                              className={`text-[#207bd6] ${mulish700.className} text-[14px] ml-1`}
                            >
                              {val.status === "0" && <span>Pending</span>}
                              {val.status === "1" && <span>Assigned</span>}
                              {val.status === "2" && <span>submitted</span>}
                              {val.status === "3" && <span>Approved</span>}
                              {val.status === "4" && <span>Rejected</span>}
                            </span>
                          </div>
                          <div
                            className={`text-[#434343] ${mulish700.className} text-[14px]`}
                          >
                            Amount :&nbsp;
                            <span
                              className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                            >
                              N{val?.milestone_price}
                            </span>
                          </div>
                          <div
                            className={`text-[#434343] ${mulish700.className} text-[14px]`}
                          >
                            Date Started :&nbsp;
                            <span
                              className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                            >
                              {formatDate(new Date(val?.milestone_start_date))}
                            </span>
                          </div>
                          <div
                            className={`text-[#434343] ${mulish700.className} text-[14px]`}
                          >
                            Date Completed :&nbsp;
                            <span
                              className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                            >
                              {formatDate(new Date(val?.milestone_end_date))}
                            </span>
                          </div>
                        </div>
                        {/* {contract?.contact_type === "ended" ||
                contract?.contact_type === "pending" ? (
                  <button
                    className={`w-full text-[#434343] shrink-0 md:w-auto bg-[#E9F1FF] ${mulish600.className} border border-[#E9F1FF] py-2 px-4 rounded-[10px] cursor-not-allowed hover:text-[#3C64B1] hover:border-[#3C64B1]`}
                  >
                    Submit Work
                  </button>
                ) : (
                  <button
                    className={`w-full text-[#434343] shrink-0 md:w-auto bg-[#E9F1FF] ${mulish600.className} border border-[#E9F1FF] py-2 px-4 rounded-[10px] cursor-pointer hover:text-[#3C64B1] hover:border-[#3C64B1]`}
                  >
                    Submit Work
                  </button>
                )} */}

                        <button
                          onClick={
                            val.status === "1" || val.status === "4"
                              ? () => handleOpenPopup(val)
                              : null
                          }
                          className={
                            val.status === "1" || val.status === "4"
                              ? `w-full text-[#434343] shrink-0 md:w-auto bg-[#E9F1FF] ${mulish600.className} border border-[#E9F1FF] py-2 px-4 rounded-[6px]  hover:text-[#3C64B1] hover:border-[#3C64B1]`
                              : `w-full text-[#434343] shrink-0 md:w-auto bg-[#E9F1FF] ${mulish600.className} border border-[#E9F1FF] py-2 px-4 rounded-[6px] cursor-not-allowed hover:text-[#3C64B1] hover:border-[#3C64B1] submit_work_disable_btn`
                          }
                        >
                          Submit Work
                        </button>
                        {showPopup && (
                          <div className="popup-container">
                            <div className="popup">
                              <button onClick={handleClosePopup}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 50 50"
                                  width="20px"
                                  height="20px"
                                >
                                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                                </svg>
                              </button>

                              <div
                                className="drop-area max-h-[136px] hide-scrollbar"
                                onClick={browseFile}
                                onDrop={handleFileDrop}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                {/* Render dropped files */}

                                {files.length > 0 ? (
                                  files.map((file, index) => (
                                    <div key={index}>{file.name}</div>
                                  ))
                                ) : (
                                  <h2>
                                    Drag and Drop Files Here <br /> Or <br />{" "}
                                    Browse File
                                  </h2>
                                )}
                              </div>
                              {error ? (
                                <div>
                                  <p className="text-red">
                                    Please upload at least 1 file.
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              <textarea
                                className="note-area font-serif"
                                placeholder="Notes"
                                onChange={(e) => {
                                  setfilldescription(e.target.value);
                                }}
                              ></textarea>

                              <div className="button-area">
                                {LoadingSubmiteButton ? (
                                  <button className="w-full text-[#434343] shrink-0 md:w-auto bg-[#E9F1FF] ${mulish600.className} border border-[#E9F1FF] py-2 px-4 rounded-[10px]  hover:text-[#3C64B1] hover:border-[#3C64B1] upload">
                                    Loading...
                                  </button>
                                ) : (
                                  <button
                                    className="w-full text-[#434343] shrink-0 md:w-auto bg-[#E9F1FF] ${mulish600.className} border border-[#E9F1FF] py-2 px-4 rounded-[10px]  hover:text-[#3C64B1] hover:border-[#3C64B1] upload"
                                    onClick={handleFileUpload}
                                  >
                                    Upload
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-full border-t border-[#A6B7F4] my-5"></div>
                    </div>
                  ))
                ) : (
                  <>
                    <div>No data found</div>
                    <div className="w-full border-t border-[#A6B7F4] my-5"></div>
                  </>
                )}
              </div>

              {contract?.type === "ended" ? (
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
                        ? `${inter600.className} text-center w-full md:w-auto border border-[#eee] rounded-[6px] p-2 cursor-pointer hover:text-[#3C64B1] hover:border-[#3C64B1]`
                        : `${inter600.className} text-center w-full md:w-auto border border-[#eee] rounded-[6px] p-2 cursor-pointer hover:text-[#3C64B1] hover:border-[#3C64B1] submit_work_disable_btn`
                    }
                    onClick={() => handleEndContract()}
                  >
                    <p>End Contract</p>
                  </button>
                </Tooltip>
              )}
            </div>
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
                        Congrats champ! Click “ok” to share feedback
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
                    className={` font-mulish font-[400] text-[21px] mt-[10px] mb-[20px] text-center text-base text-[#000000]  `}
                  >
                    Your work has been submitted successfully.
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
                    Your work submission has been failed.
                  </h1>
                </div>
              </div>
            </div>
          )}
          {submitDataLoader == true && <SubmitDataLoader />}
        </>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Milestones;
