"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import { Navigate, useLocation } from "react-router";
import { FiDownload } from "react-icons/fi"; // Import the download icon from react-icons
import {
  GetFileDetails,
  pjobdetail,
  bookmark,
  jobinvIteesDetails,
  removejobinvitesen,
  MyApplication,
} from "../../api/api";
import Jobmodal from "@/app/jobModel/page";
import Editmodal from "@/app/submitApplicationModule/page";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import {
  faBookmark as faBookmarksolid,
  faLinkedinIn,
  faStar as faStarsolid,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/common/Loader";
import {
  faBookmark,
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import facebook from "../../../public/facebook.svg";
import twitter from "../../../public/twitter.svg";
import linkedin from "../../../public/linkedin.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SubLoader from "@/components/common/SubLoader";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";

const inter = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const basic = Inter({ subsets: ["latin"] });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

export default function JobDetails({ params }) {
  const router = useRouter();
  const [openmodal, setOpenModal] = useState(false);
  const [openeditmodal, setEditOpenModal] = useState(false);
  const [subloader, setSubLoader] = useState(false);
  const [Jobdetail, setJobdetail] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [skillesName, setSkillesName] = useState();
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [totlaspend, settotlaspend] = useState(0);
  const [totalhours, settotalhours] = useState(0);
  const [totalposted, setTotalPosted] = useState(0);
  const [jobId, setJobId] = useState("");
  const [jobApply, setJobApply] = useState("notApplied");
  const [jobData, setjobData] = useState();
  const [attachmentDetails, setAttachmentDetails] = useState([]);
  const [JobinvIteesDetails, setJobinvIteesDetails] = useState([]);
  const [loadingFindWorkDetailPage, setLoadingFindWorkDetailPage] = useState(false);
  const [reviewData, setReviewData] = useState({
    length: 0,
    averageRating: 0,
  });
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
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
  const [validationPopup, setValidationPopup] = useState(false);
  const storedUserData = localStorage.getItem("user-data");
  let userData = null;
  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  } else {
    console.error("No user data found in localStorage.");
  }

  const handleValidationUser = () => {
    window.location.href = "/profile/editprofile";
  };
  const linksvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mt-1"
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
  const id = params.slug;

  const handleapplyclick = () => {
    setOpenModal(true);
    setJobId(Jobdetail._id);
  };

  const handleEditclick = () => {
    window.location.href = `/application/${Jobdetail._id}`;

    // setEditOpenModal(true);
    // setJobId(Jobdetail._id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditOpenModal(false);
  };
  const handleSubLoader = () => {
    setSubLoader(true);
  };
  const showclientDetilas = (clientDetalis) => {
    let tbud = 0;
    clientDetalis.map((item) => {
      tbud = tbud + parseInt(item.budget_to);
    });
    let thours = tbud / clientDetalis.length / 24;
    let roundedTotalHours = Math.round(thours);
    settotalhours(roundedTotalHours);
    settotlaspend(tbud);
    setTotalPosted(clientDetalis.length);
  };
  const showclientReview = (clientReview) => {
    let reviewLength = 0;
    let totalRating = 0;
    if (Array.isArray(clientReview) && clientReview.length > 0) {
      reviewLength = clientReview.length;
      clientReview.forEach((review) => {
        totalRating += review.rate;
      });
    }
    const averageRating = reviewLength > 0 ? totalRating / reviewLength : 0;

    // Set the state with length and average rating
    setReviewData({
      length: reviewLength,
      averageRating: averageRating,
    });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(reviewData.averageRating);
    const hasHalfStar = reviewData.averageRating - fullStars > 0;

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

  const getpjobdetails = async () => {
    setLoadingFindWorkDetailPage(true)
    try {
      const response = await pjobdetail(id);

      if (response?.status == 200) {
        let jobData = response?.data?.data?.data?.detail;
        jobData.skills = response?.data?.data?.skillDetails;
        jobData.user_id = response?.data?.data?.data?.userDetails.user_id;
        setjobData(jobData);
        setJobdetail(response?.data?.data?.data?.detail);
        setUserDetails(response?.data?.data?.data?.userDetails.user_id);
        setSkillesName(response?.data?.data?.skillDetails);
        showclientDetilas(response?.data?.data?.data?.client);
        showclientReview(response?.data?.data?.data?.review);
        if (response?.data?.data?.data?.filepath !== false) {
          setFileName(response?.data?.data?.data?.fileName);
        }
        setAttachmentDetails(response?.data?.data?.data?.fileData);
        // --------------- find apllied job ----------------
        const jobAplication = await MyApplication();
        if (jobAplication?.status == 200) {
          const appliedJobIds = jobAplication?.data?.data?.map(
            (job) => job.job_id
          );

          const appliedjob = response?.data?.data?.data?.detail._id;
          if (appliedJobIds) {
            appliedJobIds.map((id) => {
              if (appliedjob === id) {
                setJobApply("applied");
              }
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFindWorkDetailPage(false);
    }
  
  };

  const fetchjobinvitess = async () => {
    await jobinvIteesDetails().then((res) => {
      if (res?.status == 200) {
        setJobinvIteesDetails(res?.data);
      }
    });
  };
  useEffect(() => {
    getpjobdetails();
    fetchjobinvitess();
  }, []);

  function formatTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      if (hoursDifference < 1) {
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        if (minutesDifference < 1) {
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
  }

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
    const jobDetails = JobinvIteesDetails.find(
      (job) => job.job_id === value._id
    );

    if (jobDetails && jobDetails.bookmark === "1") {
      return (
        <FontAwesomeIcon
          icon={faBookmarksolid}
          onClick={() => {
            handleBookmarkeremove(value);
          }}
          className="cursor-pointer"
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
        />
      );
    }
  };

  const openPopupWindow = (url, width, height) => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;
    window.open(
      url,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };
  const handleMouseLeave = (e) => {
    if (
      !e.relatedTarget ||
      !e.relatedTarget.closest(".text-box_clr, .dropdown")
    ) {
      setDropdownOpen(false);
    }
  };
  const handleLinkedInButtonClick = () => {
    const jobTitle =
      Jobdetail && Jobdetail.job_title
        ? encodeURIComponent(Jobdetail.job_title)
        : "";
    const urlToShare = "https://praiki.com";
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${urlToShare}&title=${jobTitle}&summary=${jobTitle}`;
    openPopupWindow(linkedInShareUrl, 600, 400);
  };
  const handleTwitterButtonClick = () => {
    const jobTitle =
      Jobdetail && Jobdetail.job_title
        ? encodeURIComponent(Jobdetail.job_title)
        : "";
    const urlToShare = "https://pracki.com";
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      urlToShare
    )}&text=${jobTitle}`;
    openPopupWindow(twitterShareUrl, 600, 400);
  };
  const handleFacebookButtonClick = () => {
    const urlToShare = "https://pracki.com";
    const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=954664435945458&display=popup&href=${encodeURIComponent(
      urlToShare
    )}`;
    openPopupWindow(facebookShareUrl, 600, 400);
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {loadingFindWorkDetailPage ? (
         <Loader/>
        ) : Jobdetail?.job_title ? (
          <div className=" p-3 md:p-4 md:px-11">
            <div
              className={`text-[29px] text-[#000000] ${mulish600.className} tracking-wide`}
            >
              Projects Details
            </div>
            <div className="container_syn">
              <div className="top-bar">
                <div className="left-content">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <div className="backicon">
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
                      className={`${inter400.className} text-[#000000] text-base ml-2 hover:text-blue_600`}
                    >
                      Back
                    </div>
                  </div>
                </div>
                <div className="right-content">
                  <div className="inner-right">
                    <div className="pr-[15px] text-[15px]">
                      <span className="text-box_clr">
                        {handleFontAwsome(Jobdetail)}
                      </span>
                    </div>
                    <div style={{ position: "relative" }}>
                      <div
                        className={`text-[15px] ${basic.className} flex text-box_clr`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M5.72902 15.625C6.64012 15.6223 7.51675 15.2764 8.18422 14.6563L14.7051 18.3823C14.2534 20.1472 15.166 21.976 16.8477 22.6763C18.5295 23.3766 20.4703 22.736 21.4048 21.1722C22.3392 19.6084 21.9839 17.5957 20.5704 16.4464C19.1569 15.2971 17.1141 15.3599 15.7738 16.5938L9.25297 12.8677C9.32134 12.6063 9.35909 12.3379 9.36547 12.0677L15.7728 8.40627C17.0445 9.56245 18.9524 9.66966 20.3457 8.66323C21.7389 7.6568 22.2367 5.81194 21.5388 4.24126C20.8408 2.67058 19.138 1.80357 17.4573 2.16311C15.7765 2.52265 14.5775 4.01043 14.5832 5.72919C14.5869 6.02927 14.6278 6.32773 14.7051 6.61773L8.78422 10C7.83578 8.53275 5.97977 7.94456 4.35934 8.59774C2.73891 9.25092 1.80963 10.9618 2.14387 12.6767C2.47811 14.3915 3.9819 15.6282 5.72902 15.625Z"
                            fill="#52619A"
                          />
                        </svg>
                        Share
                      </div>
                      {isDropdownOpen && (
                        <div
                          className="dropdown"
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 999,
                            width: "100%",
                            textAlign: "-webkit-center",
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <ul className="socialBox">
                            <li className="socialLi1">
                              <Image
                                src={facebook}
                                alt="Facebook Icon"
                                width={15}
                                height={15}
                                onClick={handleFacebookButtonClick}
                              />
                            </li>
                            <li className="socialLi1">
                              <Image
                                src={twitter}
                                alt="twitter Icon"
                                width={15}
                                height={15}
                                onClick={handleTwitterButtonClick}
                              />
                            </li>
                            <li className="socialLi2">
                              <Image
                                src={linkedin}
                                alt="linkedin Icon"
                                width={15}
                                height={15}
                                onClick={handleLinkedInButtonClick}
                              />
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-5 ">
                <div
                  className={`text-[29px] text-[#000000] ${mulish600.className} tracking-wide w-full text-left`}
                >
                  <h3>{Jobdetail && `${Jobdetail.job_title}`}</h3>
                </div>
                {Jobdetail && Jobdetail.type === "deleted" ? (
                  ""
                ) : (
                  <>
                    {jobApply === "applied" ? (
                      <div
                        className={` w-52 apply-button ${inter400.className} tracking-wide text-[#434343] text-lg cursor-pointer hover:bg-[#286cac] hover:text-white transition-colors duration-200 ease-in-out`}
                      >
                        <span id="Apply" onClick={() => handleEditclick()}>
                          Already Applied
                        </span>
                      </div>
                    ) : userData.professional_profile_complete != null &&
                      userData.professional_profile_complete === 1 ? (
                      <div
                        className={`apply-button ${inter400.className} tracking-wide text-[#434343] text-lg cursor-pointer hover:bg-[#286cac] hover:text-white transition-colors duration-200 ease-in-out`}
                      >
                        <span id="Apply" onClick={() => handleapplyclick()}>
                          Apply
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`apply-button ${inter400.className} tracking-wide text-[#434343] text-lg cursor-pointer hover:bg-[#286cac] hover:text-white transition-colors duration-200 ease-in-out`}
                      >
                        <span
                          id="Apply"
                          onClick={() => setValidationPopup(true)}
                        >
                          Apply
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="contentdiv">
                <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-5">
                  <div>
                    <div
                      className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                    >
                      Category
                    </div>
                    <div
                      className={`text-[16px] ${mulish700.className} text-box_clr`}
                    >
                      {Jobdetail && `${Jobdetail.job_title}`}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                    >
                      Job Type
                    </div>
                    <div
                      className={`text-[16px] ${mulish700.className} text-box_clr`}
                    >
                      {Jobdetail &&
                        `${Jobdetail.budget_type
                          .charAt(0)
                          .toUpperCase()}${Jobdetail.budget_type.slice(1)}`}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                    >
                      Experience Level
                    </div>
                    <div
                      className={`text-[16px] ${mulish700.className} text-box_clr`}
                    >
                      {Jobdetail &&
                        `${Jobdetail.experience_level
                          .charAt(0)
                          .toUpperCase()}${Jobdetail.experience_level.slice(
                          1
                        )}`}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                    >
                      Posted
                    </div>
                    <div
                      className={`text-[16px] ${mulish700.className} text-box_clr`}
                    >
                      {formatTimeAgo(Jobdetail.created_at)}
                    </div>
                  </div>

                  {Jobdetail.budget_type == "Fixed" ? (
                    <div>
                      <div
                        className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                      >
                        Budget
                      </div>
                      <div
                        className={`text-[16px] ${mulish700.className} text-box_clr`}
                      >
                        N{Jobdetail.budget_from}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                      >
                        Budget
                      </div>
                      <div
                        className={`text-[16px] ${mulish700.className} text-box_clr`}
                      >
                        N{Jobdetail.budget_from}-N{Jobdetail.budget_to}
                      </div>
                    </div>
                  )}
                  <div className="col-span-3">
                    <div
                      className={`text-[14px] mb-1 ${mulish400.className} tracking-wide text-box_clr`}
                    >
                      Required Skills
                    </div>
                    <div className="space-x-3 ">
                      {skillesName?.map((value, index) => {
                        if (value) {
                          return (
                            <div
                              key={value}
                              className={`skill-contenyt text-[11px] ${inter400.className} text-box_clr`}
                            >
                              {value}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border2"></div>
              <div className="mt-[15px ]">
                <div className="flex flex-col xl:flex-row items-start justify-between flex-wrap gap-5">
                  <div className="left70">
                    <div className="desc">{Jobdetail.cover_page_detail}</div>
                    <div
                      className={`text-[26px] ${mulish600.className} text-[#000000]`}
                    >
                      Attachments
                    </div>
                    <div>
                      {attachmentDetails &&
                      attachmentDetails.filepath !== false ? (
                        <>
                          <>
                            {attachmentDetails &&
                            attachmentDetails.length > 0 ? (
                              attachmentDetails.map((item, index) => (
                                <div key={index}>
                                  {item.filepath !== false ? (
                                    <div>
                                      <button
                                        className="w-full overflow-x-auto flex border mt-5 p-2 border-[#eee] rounded-md bg-white border-solid border-1 font-inter font-semibold text-base text-[#2D3748]"
                                        onClick={() =>
                                          handleDownload(item.fileName)
                                        }
                                      >
                                        <span className="w-full flex gap-1 justify-center shrink">
                                          {/* <FiDownload /> Download icon */}
                                          <span className="text-[12px] md:text-[16px] w-full ">
                                            {getFileName(item.fileName)}
                                          </span>
                                          <div className="mt-1">
                                            <FiDownload /> {/* Download icon */}
                                          </div>
                                        </span>
                                      </button>
                                    </div>
                                  ) : (
                                    <div key={index} className="mt-[16px]">
                                      <p
                                        className={`text-[16px] text-[#adadad] ${mulish600.className}`}
                                      >
                                        No attachment found
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="mt-[16px]">
                                <p
                                  className={`text-[16px] text-[#adadad] ${mulish600.className}`}
                                >
                                  No attachment found
                                </p>
                              </div>
                            )}

                            {jobApply === "applied" ? (
                              <div>
                                <p className="text-gray mt-10">
                                  Already Applied
                                </p>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        </>
                      ) : (
                        <button
                          className={` ${inter400.className} tracking-wide text-base inline-block transition-colors duration-200 ease-in-out align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-blue mt-10`}
                          id="btn_login"
                          type="button"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="right30 tracking-wide w-full xl:w-[30%]">
                    <div
                      className={`text-[21px] text-[#000000] ${mulish600.className} pb-3`}
                    >
                      About Client
                    </div>
                    <div className="flex items-start justify-start gap-3">
                      <div className="">
                        <div className="proficon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="21"
                            viewBox="0 0 23 21"
                            fill="none"
                          >
                            <path
                              d="M3.83317 16.625H1.9165C1.9165 13.7255 4.49087 11.375 7.6665 11.375C10.8421 11.375 13.4165 13.7255 13.4165 16.625H11.4998C11.4998 14.692 9.7836 13.125 7.6665 13.125C5.54941 13.125 3.83317 14.692 3.83317 16.625ZM15.3274 13.4837L12.7342 11.1213L14.0873 9.8805L15.3255 11.011L19.4463 7.2555L20.7995 8.4945L15.3255 13.482L15.3274 13.4837ZM7.6665 10.5C5.54941 10.5 3.83317 8.933 3.83317 7C3.83317 5.067 5.54941 3.5 7.6665 3.5C9.7836 3.5 11.4998 5.067 11.4998 7C11.4972 8.932 9.7825 10.4976 7.6665 10.5ZM7.6665 5.25C6.61942 5.25097 5.76698 6.01899 5.75198 6.97492C5.73697 7.93085 6.56496 8.72087 7.61158 8.74923C8.6582 8.77759 9.53605 8.03381 9.58317 7.07875V7.42875V7C9.58317 6.0335 8.72505 5.25 7.6665 5.25Z"
                              fill="#2E3A59"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start">
                        <div className="flex items-center justify-start">
                          {renderStars()}
                        </div>
                        <div
                          className={`text-[15px] text-box_clr ${mulish400.className}`}
                        >
                          {reviewData.length} review
                          {reviewData.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    <div className="py-3 flex justify-start items-center gap-3">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                        >
                          <path
                            d="M10.5 18.375C9.39482 17.4323 8.37041 16.3988 7.4375 15.2853C6.0375 13.6132 4.375 11.123 4.375 8.74995C4.37376 6.27156 5.86622 4.03667 8.15594 3.08818C10.4457 2.13968 13.0813 2.66454 14.833 4.41783C15.9849 5.56461 16.6302 7.12454 16.625 8.74995C16.625 11.123 14.9625 13.6132 13.5625 15.2853C12.6296 16.3988 11.6052 17.4323 10.5 18.375ZM10.5 6.12495C9.56218 6.12495 8.6956 6.62527 8.22668 7.43745C7.75777 8.24963 7.75777 9.25027 8.22668 10.0625C8.6956 10.8746 9.56218 11.375 10.5 11.375C11.9497 11.375 13.125 10.1997 13.125 8.74995C13.125 7.3002 11.9497 6.12495 10.5 6.12495Z"
                            fill="#2E3A59"
                          />
                        </svg>
                      </div>
                      <div
                        className={`text-[15px] text-box_clr ${mulish400.className}`}
                      >
                        {userDetails?.country?.name || "-"}
                      </div>
                    </div>
                    <div className="border2"></div>
                    <div
                      className={`text-[14px] ${mulish600.className} text-location_clr `}
                    >
                      Total Spent
                    </div>
                    <div
                      className={`text-[18px] ${mulish800.className} text-client_color py-1`}
                    >
                      N{totlaspend}
                    </div>
                    <div
                      className={`text-[14px] ${mulish600.className} text-location_clr mt-2`}
                    >
                      Projects Posted
                    </div>
                    <div
                      className={`text-[18px] ${mulish800.className} text-client_color py-1 mb-1`}
                    >
                      {totalposted}
                    </div>
                    <div
                      className={`text-[14px] ${mulish600.className} text-location_clr `}
                    >
                      Average Hourly Spend
                    </div>
                    <div
                      className={`text-[18px] ${mulish800.className} text-client_color py-1`}
                    >
                      N{totalhours}/ hr
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {subloader == true && <SubLoader />}
            {openmodal && (
              <Jobmodal
                onOpenLoader={handleSubLoader}
                onClose={handleCloseModal}
                isOpen={openmodal}
                jobid={jobId}
                jobData={jobData}
                reviewData={reviewData}
              />
            )}

            {openeditmodal && (
              <Editmodal
                onClose={handleCloseModal}
                isOpen={openeditmodal}
                jobData={jobData}
                jobid={jobId}
                reviewData={reviewData}
              />
            )}

            {validationPopup && (
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
                          Please fill out your profile details, and then you can
                          apply for a project.
                        </h1>
                      </div>
                    </div>

                    <div className="flex justify-center gap-5 items-center p-5">
                      <button
                        className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                        onClick={() => setValidationPopup(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                        onClick={handleValidationUser}
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </>
    </ErrorBoundary>
  );
}
