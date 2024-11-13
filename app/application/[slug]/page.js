"use client";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiDownload } from "react-icons/fi"; // Import the download icon from react-icons
import {
  faBookmark,
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarsolid } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  myApplicationDetail,
  withdrawApplication,
  jobinvIteesDetails,
  bookmark,
  removejobinvitesen,
  postNotification,
} from "@/app/api/api";
import Image from "next/image";
import AplicationModule from "../../submitApplicationModule/page.js";
import bookMarkImage from "../../../components/assets/CardDetail/bookmark.png";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useSocket } from "../../socketContext";
import Loader from "@/components/common/Loader";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
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
const linksvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
  >
    <path
      d="M5.29058 13.3344C4.02673 13.3344 2.88731 12.5731 2.40358 11.4055C1.91984 10.2379 2.18703 8.89383 3.08058 8.00001L4.40683 6.67376L5.29058 7.55751L3.96495 8.88314C3.49124 9.35685 3.30623 10.0473 3.47962 10.6944C3.65301 11.3415 4.15846 11.8469 4.80556 12.0203C5.45266 12.1937 6.14311 12.0087 6.61683 11.535L7.94245 10.2094L8.8262 11.0938L7.50058 12.4194C6.91562 13.0072 6.11986 13.3367 5.29058 13.3344ZM5.73245 10.6513L4.8487 9.76751L9.26808 5.34814L10.1518 6.23189L5.73308 10.6506L5.73245 10.6513ZM10.5943 9.32564L9.70995 8.44189L11.0356 7.11626C11.5157 6.64397 11.7057 5.95043 11.5332 5.29938C11.3608 4.64832 10.8523 4.13979 10.2013 3.96717C9.55032 3.79454 8.85673 3.98434 8.38433 4.46439L7.05808 5.79001L6.17433 4.90626L7.50058 3.58001C8.7225 2.36874 10.6937 2.37306 11.9103 3.58967C13.1269 4.80628 13.1312 6.77746 11.92 7.99939L10.5943 9.32501V9.32564Z"
      fill="#52619A"
    />
  </svg>
);
const ApplicationDetails = ({ params }) => {
  const [jobDetails, setJobDetials] = useState({});
  const [milestoneDetails, setMilestoneDetails] = useState([]);
  const [pfeesDetails, setPfeesDetails] = useState([]);
  const [skilljobDetials, setSkilljobDetials] = useState([]);
  const [invjobDetials, setInvjobDetials] = useState({});
  const [budgetDetails, setBudgetDetails] = useState({});
  const [attachmentDetails, setAttachmentDetials] = useState([]);
  const [fees, setFees] = useState(10);
  const [bud, setBud] = useState(0);
  const [pfees, setPfees] = useState(0);
  const [prakiFees, setPrakiFees] = useState(0);
  const [earTot, setEarTot] = useState(0);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [openmodal, setOpenModal] = useState(false);
  const [jobData, setJobData] = useState();
  const [rating, setRating] = useState(0);
  const [Flag, setflag] = useState(null);
  const [Msg, setmsg] = useState("");
  const [JobinvIteesDetails, setJobinvIteesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const ratings = Array.from({ length: 5 }, (_, index) => index + 1);
  const handleapplyclick = () => {
    setOpenModal(true);
  };
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const {socket}=useSocket();
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);

  const handleCloseModal = () => {
    setOpenModal(false);
    getmyApplicationDetails();
  };
  //Get all application details...
  const getmyApplicationDetails = async () => {
    const data = {
      job_id: params.slug,
    };
    await myApplicationDetail(data).then((res) => {
      setJobData(res?.data);
      setJobDetials(res?.data?.job);
      setMilestoneDetails(res?.data?.milestone);
      setPfeesDetails(res?.data?.pfees);
      setSkilljobDetials(res?.data?.skill_job);
      setInvjobDetials(res?.data?.invjob);
      setBudgetDetails(res?.data?.budget);
      setAttachmentDetials(res?.data?.attachment);
      setRating(res?.data?.review);
      let sumOffee = 0;
      res?.data?.pfees?.map((item) => {
        sumOffee += item.fees;
      });
      let budget = 0;
      res?.data?.milestone?.map((item) => {
        budget += item.milestone_price;
      });

      setFees(sumOffee);
      if (res?.data?.milestone?.length > 0) {
        const prakiFees = (budget * sumOffee) / 100;
        const earTot = budget - prakiFees;

        setBud(budget);
        setPfees(fees);
        setPrakiFees(prakiFees);
        setEarTot(earTot);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getmyApplicationDetails();
    };
    fetchData();
  }, []);

  //Formate date...
  const formatTimeAgo = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

      if (hoursDifference === 0) {
        if (minutesDifference === 0) {
          const secondsDifference = Math.floor(timeDifference / 1000);
          return `${secondsDifference}s ago`;
        } else {
          return `${minutesDifference}m ago`;
        }
      } else {
        return `${hoursDifference}h ago`;
      }
    } else {
      return `${daysDifference}d ago`;
    }
  };

  const getFileName = (value) => {
    const filePath = value;
    const parts = filePath.split("/");
    const filename = parts[parts.length - 1];
    const filenameWithExtension = filename;
    const filenameWithoutExtension = filenameWithExtension.replace(
      /_\d+\./,
      "."
    );
    return filenameWithoutExtension;
  };
  const handleDownload = async (filename) => {
    const fileUrl = `${url}/public/uploads/job_attachment/${filename}`;

    // Fetch the image as a blob
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = await getFileName(filename);

    // Append the link to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link from the document body and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars > 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarsolid}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            icon={faStarOutline}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      }
    }

    return stars;
  };

  const withdraw_application = async () => {
    await withdrawApplication({ job_id: jobDetails._id }).then(async (res) => {
      const route = `/projects/${jobDetails._id}`;
      const dataForNofitication = {
        rout: route,
        send_by: "professional",
        subject: "withdraw",
        client_id: jobDetails.user_id._id,
        job_id: jobDetails._id,
        email: jobDetails.user_id.email,
        first_name: jobDetails.user_id.first_name,
        last_name: jobDetails.user_id.last_name,
      };
      if (res?.status == 200) {
        if (res?.data?.flag == 1) {
          setmsg(res?.data?.msg);
          setflag(1);
        } else {
          const messageForShow = `Application for ${jobDetails.job_title} has been withdrawn by ${decodedToken.first_name} ${decodedToken.last_name}"`;
          await postNotification(dataForNofitication).then((res) => {
            const data = {
              rout: route,
              send_by: "professional",
              subject: "withdraw",
              client_id: jobDetails.user_id._id,
              message: messageForShow,
              status: 0,
            };
            socket.emit("new_notification", data);
            socket.emit("update_notification",{ login_as: 1, id: jobDetails.user_id._id });
          });
          setmsg(res?.data?.msg);
          setflag(0);
          window.location.href = "/application?archived=true";
        }
      } else {
        setmsg("Withdraw application failed....");
        setflag(0);
      }
    });
  };

  const fetchjobinvitess = async () => {
    try {
      const response = await jobinvIteesDetails();
      if (response?.status === 200) {
        setJobinvIteesDetails(response?.data);
      } else {
        console.error("Failed to fetch job invitees details");
      }
    } catch (error) {
      console.error("Error fetching job invitees details:", error);
    }
  };

  useEffect(() => {
    fetchjobinvitess();
  }, []);

  const handleBookemarke = async (value) => {
    const data = {
      job_id: value._id,
      textid: "",
      user_id: value.user_id,
    };
    await bookmark(data).then((res) => {
      if (res?.status == 200) {
        fetchjobinvitess();
      }
    });
  };
  const handleBookmarkeremove = async (value) => {
    const data = {
      jobId: value._id,
    };

    await removejobinvitesen(data).then((res) => {
      fetchjobinvitess();
    });
  };

  const handleFontAwsome = (value) => {
    const jobDetails = JobinvIteesDetails?.find(
      (job) => job.job_id === value?._id
    );

    if (jobDetails && jobDetails.bookmark === "1") {
      return (
        <Image
          src={bookMarkImage}
          alt="bookmarkIcone"
          className="cursor-pointer"
          width={16}
          height={30}
          onClick={() => {
            handleBookmarkeremove(value);
          }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faBookmark}
          onClick={() => {
            handleBookemarke(value);
          }}
          className="cursor-pointer"
          width={16}
          height={30}
        />
      );
    }
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {loading ? (
          <Loader/>
        ) : (
          <>
            {Msg && (
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
                          {Msg}
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center gap-5 items-center p-5">
                      <button
                        className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                        onClick={() => setmsg(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                        onClick={() => setmsg(false)}
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className={`show
                h-full flex p-[11px] lg:px-14 lg:py-5`}
              tabIndex="-1"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered custom-modal-width bg-white  w-full"
                style={{ borderRadius: "20px" }}
              >
                <div className="modal-content">
                  <div className="  ">
                    <h5
                      className={`w-256 text-[23px] md:text-[29px] mb-[18px] tracking-wide ${mulish600.className}`}
                    >
                      My Applications
                    </h5>
                  </div>
                  <div className="modal-body1 border border-solid border-[#A6B7F4] ">
                    <div className=" flex justify-between items-center gap-2 cursor-pointer w-full pb-7">
                      <div className="group">
                        <Link
                          href="/application"
                          className={`flex items-center gap-2  cursor-pointer`}
                        >
                          <p className="bg-inputbordercolor p-2 rounded-full">
                            {arrowIcon}
                          </p>
                          <h1
                            className={`text-[#000000] font-mulish font-normal text-base ${inter.className} group-hover:text-searchbg cursor-pointer `}
                          >
                            Back
                          </h1>
                        </Link>
                      </div>
                      <div className="">
                        <span>{handleFontAwsome(jobDetails)}</span>
                      </div>
                    </div>
                    <div className="top-box1 mb-[28px]">
                      <div className="header2">
                        <div
                          className={`job  ${mulish600.className} text-base md:text-[25px] mb-[20px]`}
                        >
                          Job Details
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            style={{ cursor: "pointer!important" }}
                          >
                            <path
                              d="M21.2512 25H7.50122C6.12051 25 5.00122 23.8807 5.00122 22.5V8.75C5.00122 7.36929 6.12051 6.25 7.50122 6.25H12.5012V8.75H7.50122V22.5H21.2512V17.5H23.7512V22.5C23.7512 23.8807 22.6319 25 21.2512 25ZM14.6262 17.1337L12.8637 15.3663L20.73 7.5H16.2512V5H25.0012V13.75H22.5012V9.26875L14.6262 17.1337Z"
                              fill="#2E3A59"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className={`${mulish600.className} text-base md:text-[21px] mb-[10px]`}
                      >
                        {jobDetails?.job_title}
                      </div>
                      <div
                        className={`${mulish500.className} text-[15px] text-[#718096] mb-[10px]`}
                      >
                        {jobDetails?.job_description}
                      </div>
                      <div
                        className={`skill ${inter500.className} text-[11px] text-[#000] my-[20px] flex items-center flex-wrap gap-5`}
                      >
                        {skilljobDetials?.map((value, index) => {
                          if (value) {
                            return (
                              <p
                                className="text-xs text-[#434343] bg-[#E9F1FF] rounded-[9px] p-2 shadow-md"
                                key={index}
                              >
                                {value}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div className="low">
                        {jobDetails?.budget_type == "range" ? (
                          <>
                            <span
                              id="fixed"
                              className={`${mulish700.className} text-[14px] text-[#000]`}
                            >
                              Range
                            </span>
                            <span
                              id="fixed"
                              className={`${mulish700.className} text-[14px] text-[#000]`}
                            >
                              Budget:
                              <span
                                id="amount"
                                className={`${mulish400.className} text-[14px] text-[#000]`}
                              >
                                {" "}
                                N{jobDetails?.budget_from} - N
                                {jobDetails?.budget_to}
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              id="fixed"
                              className={`${mulish700.className} text-[14px] text-[#000]`}
                            >
                              Fixed Price
                            </span>
                            <span
                              id="fixed"
                              className={`${mulish700.className} text-[14px] text-[#000]`}
                            >
                              Budget:
                              <span
                                id="amount"
                                className={`${mulish400.className} text-[14px] text-[#000]`}
                              >
                                {" "}
                                N{jobDetails?.budget_from}
                              </span>
                            </span>
                          </>
                        )}
                        <div
                          className="mr-[24px] w-full sm:w-auto my-2"
                          style={{ display: "flex" }}
                        >
                          <Image
                            src="/images/findjob-img/userimg.png"
                            alt="usericon"
                            className="pe-2"
                            width={30}
                            height={3}
                            style={{
                              height: "fit-content",
                              alignSelf: "center",
                            }}
                          />
                          {renderStars()}
                        </div>
                        <div style={{ display: "flex" }}>
                          <Image
                            src="/images/findjob-img/clock.svg"
                            alt="usericon"
                            className="mr-[10px]"
                            width={24}
                            height={24}
                          />
                          <p
                            className={`${mulish400.className} text-[#434343] text-[14px] mt-[3px]`}
                          >
                            Posted {formatTimeAgo(jobDetails?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-[20px]">
                      <div
                        className={`${mulish600.className} text-[16px] md:text-[25px] mb-[22px] text-[#000]`}
                      >
                        Contract Proposal Terms
                      </div>
                      <div
                        className={`  ${inter500.className} text-[16px] mb-[10px] text-[#000]`}
                      >
                        Payment Type
                      </div>
                      <div
                        className={`  ${inter.className} text-[16px] mb-[24px] text-[#718096]`}
                      >
                        {budgetDetails?.length > 0
                          ? budgetDetails[0]?.bargaining_option != "multiple"
                            ? "Single Payments"
                            : "Milestone Payments"
                          : ""}
                      </div>
                    </div>
                    <div className="px-[20px]">
                      <div
                        className={`${inter500.className} text-[16px] mb-[10px] text-[#000] tracking-tight`}
                      >
                        Milestones
                      </div>
                      <table className="w-full mb-6">
                        <tr className="bg-[#E9F1FFE3] text-white">
                          <th
                            className={`${inter500.className} w-[70%] py-2 text-left text-[#000000]`}
                          >
                            Description
                          </th>
                          <th
                            className={`${inter500.className} w-[15%] py-2 text-center text-[#000000]`}
                          >
                            Amount
                          </th>
                          <th
                            className={`${inter500.className} w-[15%] py-2 text-center text-[#000000]`}
                          >
                            Due Date
                          </th>
                        </tr>
                        {milestoneDetails?.map((item, index) => (
                          <tr key={index}>
                            <td className="py-1 text-left text-[14px] text-[#7E8082] font-medium">
                              {item.milestone_task}
                            </td>
                            <td className="py-1 text-center text-[14px] text-[#7E8082] font-medium">
                              N{item.milestone_price}
                            </td>
                            <td className="py-1 text-center text-[14px] text-[#7E8082] font-medium">
                              {new Date(
                                item.milestone_end_date
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                    <div className="px-[20px]">
                      <div
                        className={`  ${inter500.className} text-[16px] mb-[10px] text-[#000]`}
                      >
                        Pitch
                      </div>
                      <div
                        className={`  ${inter.className} text-sm md:text-[16px] mb-[24px] text-[#718096] tracking-wide`}
                      >
                        {budgetDetails?.length > 0
                          ? budgetDetails[0]?.contract_desc
                          : ""}
                      </div>
                    </div>
                    <div className="px-[20px]">
                      <div
                        className={`  ${inter500.className} text-[16px] mb-[10px] text-[#000]`}
                      >
                        Attachments
                      </div>
                      {attachmentDetails?.length > 0 ? (
                        attachmentDetails?.map((item, index) =>
                          item.filepath !== false ? (
                            <div key={index} className="mb-[10px]">
                              <button
                                onClick={() => handleDownload(item.fileName)}
                                className="w-full overflow-x-auto md:w-auto border p-2 border-[#eee] rounded-md bg-white border-solid border-1 font-inter font-semibold text-[#2D3748]"
                              >
                                <span className="flex gap-1 justify-start items-center">
                                  <span>{linksvg}</span>
                                  <p className="text-[12px]">
                                    {" "}
                                    {getFileName(item?.fileName)}
                                  </p>
                                  <div className="mt-1">
                                    <FiDownload /> {/* Download icon */}
                                  </div>
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div key={index}>
                              <p
                                className={`text-[16px] text-[#adadad] ${mulish600.className}`}
                              >
                                No attachment found
                              </p>
                            </div>
                          )
                        )
                      ) : (
                        <div>
                          <p
                            className={`text-[16px] text-[#adadad] ${mulish600.className}`}
                          >
                            No attachment found
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="pay-summary-application-page">
                      <div
                        className={`pay-title text-[16px] text-[#212529] mb-[10px] ${inter500.className}`}
                      >
                        Payment Summary
                      </div>
                      <div className="flex align-items-center justify-between">
                        <div
                          className={` text-xs md:text-[14px] text-[#718096] mb-[10px] tracking-wide ${inter.className}`}
                        >
                          Total Project Cost
                        </div>
                        <div
                          className={` text-xs md:text-[14px] text-[#718096] mb-[10px] tracking-wide ${inter.className}`}
                        >
                          N{bud}
                        </div>
                      </div>
                      <div className="flex align-items-center justify-between">
                        <div
                          className={` text-xs md:text-[14px] text-[#718096] mb-[10px] tracking-wide ${inter.className}`}
                        >
                          Praiki Fees ({fees}%)
                        </div>
                        <div
                          className={` text-xs md:text-[14px] text-[#718096] mb-[10px] tracking-wide ${inter.className}`}
                        >
                          N{prakiFees}
                        </div>
                      </div>
                      <div className="flex align-items-center justify-between">
                        <div
                          className={` text-xs md:text-[14px] text-[#718096] mb-[10px] tracking-wide ${inter.className}`}
                        >
                          Your Net Earnings
                        </div>
                        <div
                          className={` text-xs md:text-[14px] text-[#718096] mb-[10px] tracking-wide ${inter.className}`}
                        >
                          N{earTot}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`mt-5 flex flex-col md:flex-row justify-start items-center gap-1 ${inter500.className}`}
                    >
                      <button
                        onClick={() => {
                          handleapplyclick();
                        }}
                        className="add-milestone1 w-full md:w-auto hover:text-[#2884CC] hover:bg-[#fff] transition-colors duration-200 ease-in-out"
                      >
                        Edit Application
                      </button>
                      {jobData?.invjob.invite_status != "5" && (
                        <button
                          className="add-milestone2 w-full md:w-auto"
                          onClick={() => withdraw_application()}
                        >
                          Withdraw Application
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {openmodal && (
              <AplicationModule
                onClose={handleCloseModal}
                isOpen={openmodal}
                jobData={jobData}
              />
            )}{" "}
          </>
        )}
      </>
    </ErrorBoundary>
  );
};

export default ApplicationDetails;
