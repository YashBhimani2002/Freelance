"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import Image from "next/image";
import location from "../../public/Fafaiconimages/pin.png";
import webimage from "../../public/images/Webimage.png";
import shareIcon from "../../public/Fafaiconimages/share.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileProcess } from "../api/api";
import { viewProfile } from "../api/api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Rating } from "react-simple-star-rating";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import facebook from "../../public/facebook.svg";
import twitter from "../../public/twitter.svg";
import linkedin from "../../public/linkedin.svg";
import {
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarsolid } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/common/Loader";
import Error  from "../error";
import ErrorBoundary  from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const basic = Inter({ subsets: ["latin"] });
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [activeTab, setActiveTab] = useState("activeJobs");
  const [userData, setUserData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [certificationData, setCertificationData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [clientData, setClientData] = useState({});
  const [professionalData, setProfessionalData] = useState({});
  const [skillData, setSkillData] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [country, setcountryData] = useState("");
  const [totalTransactionsAmount, setTotalTransactionsAmount] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("");

  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const hourlyRate = 0;
  const jobCompleted = 0;
  const totalTransactions = 0;
  const getviewprofile = async () => {
    try {
      const response = await viewProfile();
      if (response?.status == 200) {
        setUserData(response.data.user);
        setcountryData(response.data?.countryInfoArray?.[0]?.name || "");
        setEducationData(response.data?.eduction);
        setExperienceData(response.data?.expedit);
        setCertificationData(response.data?.certificate);
        setPortfolioData(response?.data?.portfolio);
        setClientData(response.data.clint);
        setProfessionalData(response.data.professional_data);
        setSkillData(response?.data?.skillData.map((skill) => skill?.skill_id));
        setRating(response?.data?.rating);
        setJobCount(response?.data?.jobCount);
        setActiveJobs(response?.data?.activeJobs);
        setCompletedJobs(response?.data?.completedJobs);
        setLoading(false);
        
        // Initialize total transactions amount
        let totalNetTransactionsAmount = 0;

        if (response.data.transactions) {
          response.data.transactions.forEach((transaction) => {
            const amount = parseFloat(transaction.amount);
            // const commissionRate = parseFloat(transaction.commission_rate);
            // const commissionAmount = (amount * commissionRate) / 100;
            // const netAmount = amount - commissionAmount;
            totalNetTransactionsAmount += amount;
          });
        }
        totalNetTransactionsAmount = Math.floor(totalNetTransactionsAmount);
        setTotalTransactionsAmount(totalNetTransactionsAmount);

        // Calculate the average Job Success in Percentage
        if (response.data.completedJobs) {
          const totalJobs =
            response.data.activeJobs.length +
            response.data.completedJobs.length;
          const jobSuccessPercentage = Math.floor(
            (response.data.completedJobs.length / totalJobs) * 100
          );

          // Set the calculated job success percentage to state
          setProgressPercentage(jobSuccessPercentage);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getviewprofile();
  }, []);

 


  const [isDropdownOpen, setDropdownOpen] = useState(false);
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
    const Title =
      userData && userData.first_name
        ? encodeURIComponent(userData.first_name)
        : "";
    const urlToShare = "https://praiki.com";
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${urlToShare}&title=${Title}&summary=${Title}`;
    openPopupWindow(linkedInShareUrl, 600, 400);
  };
  const handleTwitterButtonClick = () => {
    const Title =
      userData && userData.first_name
        ? encodeURIComponent(userData.first_name)
        : "";
    const urlToShare = "https://praiki.com";
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      urlToShare
    )}&text=${Title}`;
    openPopupWindow(twitterShareUrl, 600, 400);
  };
  const handleFacebookButtonClick = () => {
    const urlToShare = "https://praiki.com";
    const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=954664435945458&display=popup&href=${encodeURIComponent(
      urlToShare
    )}`;
    openPopupWindow(facebookShareUrl, 600, 400);
  };
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const renderStars = (rating) => {
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
    <div className=" lg:pl-[0px] lg:pt-[20px]">
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="xl:pl-16">
            <h2 className={`${mulish600.className} text-[20px] md:text-[29px]`}>
                    <Tooltip title='Profile' arrow placement="right" componentsProps={tooltipClass}>
              Profile
              </Tooltip>
            </h2>
            <div className="box-content my-4">
              <div className="flex items-start md:items-center justify-between relative">
                <div className="flex flex-col md:flex-row gap-5 md:gap-16 items-center justify-start w-full md:w-[75%] xl:w-[80%]">
                  <div className=" flex justify-start w-full md:w-auto ">
                    <img
                      className="float-start w-[100px] h-[100px] rounded-full"
                      width={100}
                      height={100}
                      src={
                        userData?.avatar
                          ? `${url}/public/uploads/profile_attachments/${userData?.avatar}`
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      onError={(e) => {
                        const target = e.target;
                        target.src =
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                      }}
                    />
                  </div>
                  <div className="flex justify-start flex-col gap-2 tracking-wide w-full md:w-auto">
                    <h4
                      className={`${mulish600.className} text-[20px]  md:text-[29px]`}
                    >
                      {userData &&
                        `${userData?.first_name} ${userData?.last_name}`}
                    </h4>
                    <p
                      className={`text-[#7E8082] text-base ${mulish400.className}`}
                    >
                      {clientData &&
                        `${clientData?.designation}, ${clientData?.company_name}`}
                      {professionalData && `${professionalData?.company}`}
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[5px]">
                      <div className="flex items-center gap-3 me-2">
                        <Image src={location} alt="pin" />
                        <span
                          className={`text-[#434343] text-base ${inter500.className}`}
                        >
                          {country}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 col-span-2">
                        <span
                          className={`bg-[#E9F1FF] rounded-[8px] p-[5px] text-base ${inter500.className}`}
                        >
                          {rating}
                        </span>
                        <div className="flex gap-[1px]">
                          {renderStars(rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 md:static my-5 md:my-0 flex flex-col gap-5">
                  <div className="align-class">
                    <div className="dropdown">
                      <div className="relative ">
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
                            className="dropdown bg-[#f1f1f1]"
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
                            <ul className="socialBoxProfile">
                              <li className="socialProfileLi1">
                                <Image
                                  src={facebook}
                                  alt="Facebook Icon"
                                  width={15}
                                  height={15}
                                  onClick={handleFacebookButtonClick}
                                />
                              </li>
                              <li className="socialProfileLi1">
                                <Image
                                  src={twitter}
                                  alt="twitter Icon"
                                  width={15}
                                  height={15}
                                  onClick={handleTwitterButtonClick}
                                />
                              </li>
                              <li className="socialProfileLi2">
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
                  <Link
                    href="/profile/editprofile"
                    className="text-right shrink-0"
                  >
                    <button className="text-white text-xs md:text-sm lg:text-base xl:text-lg bg-[#286CAC] hover:bg-white border border-transparent rounded-[6px] hover:border-[#286cac] hover:text-[#286cac] py-1 px-2 xl:px-3 max-w-fit">
                      Edit Your Profile
                    </button>
                  </Link>
                </div>
              </div>
              {professionalData && (
                <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-3 xl:grid-cols-4 py-6 gap-y-5 gap-x-5">
                  {/* <div>
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                    >
                      Hourly Rate
                    </p>
                    <h5
                      className={`${mulish700.className} text-base text-[#434343] tracking-wide mt-2`}
                    >
                      N {professionalData.hourly_rate}
                    </h5>
                  </div> */}
                  
                  <div className="me-2">
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                    >
                      Job Completed
                    </p>
                    <h5
                      className={`${mulish700.className} text-base text-[#434343] tracking-wide mt-2`}
                    >
                      {completedJobs?.length || "0"}
                    </h5>
                  </div>
                  <div>
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                    >
                      Total Earnings
                    </p>
                    <h5
                      className={`${mulish700.className} text-base text-[#434343] tracking-wide mt-2`}
                    >
                      N{" "}
                      {totalTransactionsAmount ? totalTransactionsAmount : "0"}
                    </h5>
                  </div>
                  <div className="">
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide flex justify-between items-center`}
                    >
                      <p>Job Success</p>
                      <p>{`${
                        progressPercentage ? progressPercentage : "0"
                      }%`}</p>
                    </p>

                    <div className="w-full h-3 bg-progress rounded-md overflow-hidden">
                      <div
                        className="h-3 bg-blue"
                        style={{
                          width: `${
                            progressPercentage ? progressPercentage : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-span-2 xl:col-span-4">
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                    >
                      Skills
                    </p>
                    {skillData.length > 0 ? (
                      <div className="flex items-center flex-wrap gap-3 text-sm">
                        {skillData.map((skill) =>
                          skill?.map((item, index) => (
                            <h6
                              key={index}
                              className={`shrink-0 my-2 bg-[#E9F1FF] rounded-[8px] text-[11px] text-[#434343] p-[8px] ${inter500.className}`}
                            >
                              {item}
                            </h6>
                          ))
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center flex-wrap gap-3 text-sm">
                        <h6
                          className={`shrink-0 my-2 bg-[#E9F1FF] rounded-[8px] text-[11px] text-[#434343] p-[8px] ${inter500.className}`}
                        >
                          No skill found
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {clientData && (
                <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-3 xl:grid-cols-4 py-6 gap-y-5 gap-x-5">
                  <div>
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                    >
                      Jobs Created
                    </p>
                    <h5
                      className={`${mulish700.className} text-base text-[#434343] tracking-wide mt-2`}
                    >
                      {jobCount}
                    </h5>
                  </div>
                  <div>
                    <p
                      className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                    >
                      Total Spent
                    </p>
                    <h5
                      className={`${mulish700.className} text-base text-[#434343] tracking-wide mt-2`}
                    >
                      N{" "}
                      {totalTransactionsAmount ? totalTransactionsAmount : "0"}
                    </h5>
                  </div>
                </div>
              )}
              {clientData != null && (
                <>
                  <div className=" py-[20px] border-y border-[#a6b7f4]">
                    <div>
                      <p
                        className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                      >
                        Company Description
                      </p>
                      <h5
                        className={`text-sm text-[#434343] ${mulish500.className}`}
                      >
                        {clientData && ` ${clientData.company_desc}`}
                      </h5>
                    </div>
                  </div>
                  <div className=" py-[20px] border-y border-[#a6b7f4]">
                    <div>
                      <p
                        className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                      >
                        Company Name
                      </p>
                      <h5
                        className={`text-sm text-[#434343] ${mulish500.className}`}
                      >
                        {clientData && ` ${clientData.company_name}`}
                      </h5>
                    </div>
                  </div>
                  <div className=" py-[20px] border-[#a6b7f4]">
                    <div>
                      <p
                        className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                      >
                        Web Address
                      </p>
                      <h5
                        className={`text-sm text-[#434343] ${mulish500.className}`}
                      >
                        {clientData?.web_address || ""}
                      </h5>
                    </div>
                  </div>
                </>
              )}
              {professionalData && (
                <>
                  <div className=" py-[20px]">
                    <div>
                      <p
                        className={`m-0 text-base md:text-[29px] ${mulish600.className} mb-[15px]`}
                      >
                        Praiki Job History
                      </p>
                      <div
                        className={`History-content ${inter600.className} text-center`}
                      >
                        <h5
                          className={
                            activeTab === "activeJobs"
                              ? "active-tab"
                              : "deactive-tab border md:border-transparent border-[#eee]"
                          }
                          onClick={() => handleTabClick("activeJobs")}
                        >
                          Active Jobs ({activeJobs?.length || "0"})
                        </h5>
                        <h5
                          className={
                            activeTab === "completedJobs"
                              ? "active-tab"
                              : "deactive-tab border md:border-transparent border-[#eee]"
                          }
                          onClick={() => handleTabClick("completedJobs")}
                        >
                          Completed Jobs ({completedJobs?.length || "0"})
                        </h5>
                      </div>
                    </div>
                  </div>
                  {activeJobs?.length > 0 && activeTab === "activeJobs"
                    ? activeJobs?.map((val, i) => {
                        return (
                          <div key={i} className="pb-[20px]">
                            <h4 className={`${mulish700.className}`}>
                              {val?.job_title}
                            </h4>

                            <div className="flex gap-10 items-center my-2">
                              {val?.budget_type === "Fixed" ? (
                                <p
                                  className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                                >
                                  <span
                                    className={`text-[#434343] text-base ${inter500.className}`}
                                  >
                                    {" "}
                                    Earnings:{" "}
                                  </span>
                                  N{val?.budget_from}
                                </p>
                              ) : (
                                <p
                                  className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                                >
                                  <span
                                    className={`text-[#434343] text-base ${inter500.className}`}
                                  >
                                    {" "}
                                    Earnings:
                                  </span>
                                  N{val?.budget_from} - {val?.budget_to}
                                </p>
                              )}
                              <div className="flex items-center gap-3 col-span-2">
                                <span
                                  className={`bg-[#E9F1FF] rounded-[8px] p-[5px] text-base ${inter500.className}`}
                                >
                                  {val?.rating}
                                </span>
                                <div className="flex gap-[1px]">
                                  {renderStars(val?.rating)}
                                </div>
                              </div>

                              <p
                                className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                              >
                                {val?.created_at
                                  ? new Date(
                                      val?.created_at
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : ""}
                              </p>
                            </div>
                            <p
                              className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                            >
                              {val?.job_description}
                            </p>
                          </div>
                        );
                      })
                    : ""}
                  {completedJobs.length > 0 && activeTab === "completedJobs"
                    ? completedJobs.map((val, i) => {
                        return (
                          <div key={i} className="pb-[20px]">
                            <h4 className={`${mulish700.className}`}>
                              {val?.job_title}
                            </h4>

                            <div className="flex gap-10 items-center my-2">
                              {val?.budget_type === "Fixed" ? (
                                <p
                                  className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                                >
                                  <span
                                    className={`text-[#434343] text-base ${inter500.className}`}
                                  >
                                    {" "}
                                    Earnings:{" "}
                                  </span>
                                  N{val?.budget_from}
                                </p>
                              ) : (
                                <p
                                  className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                                >
                                  <span
                                    className={`text-[#434343] text-base ${inter500.className}`}
                                  >
                                    {" "}
                                    Earnings:
                                  </span>
                                  N{val?.budget_from} - {val?.budget_to}
                                </p>
                              )}
                              <div className="flex items-center gap-3 col-span-2">
                                <span
                                  className={`bg-[#E9F1FF] rounded-[8px] p-[5px] text-base ${inter500.className}`}
                                >
                                  {val?.rating}
                                </span>
                                <div className="flex gap-[1px]">
                                  {renderStars(val?.rating)}
                                </div>
                              </div>

                              <p
                                className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                              >
                                {val?.created_at
                                  ? new Date(
                                      val?.created_at
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : ""}
                              </p>
                            </div>
                            <p
                              className={`m-0 ${mulish400.className} text-sm text-[#434343] tracking-wide`}
                            >
                              {val?.job_description}
                            </p>
                          </div>
                        );
                      })
                    : ""}
                  <div className="py-[20px] border-y border-[#a6b7f4]">
                    <div>
                      <div className="Education-data">
                        <h3
                          className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                        >
                          Education
                        </h3>
                        {educationData === null ||
                        educationData.length === 0 ? (
                          <div className={`flex w-full ${mulish500.className}`}>
                            No education found
                          </div>
                        ) : (
                          educationData.map((education, index) => (
                            <div className="flex w-full" key={index}>
                              <div className="Education-info basis-1/2">
                                <h4 className={`${mulish700.className}`}>
                                  {education.school}
                                </h4>
                                <span className={`${mulish500.className}`}>
                                  {education.degree}
                                </span>
                              </div>
                              <div className="Education-info basis-1/2">
                                <span className={`${mulish600.className}`}>
                                  {new Date(education.from_date).getFullYear()}-
                                  {new Date(education.to_date).getFullYear()}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-[20px]">
                    <div>
                      <div className="Education-data">
                        <h3
                          className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                        >
                          Work Experience
                        </h3>
                        {experienceData === null ||
                        experienceData.length === 0 ? (
                          <div className="flex w-full">No experience found</div>
                        ) : (
                          experienceData.map((experience, index) => (
                            <div className="flex w-full" key={index}>
                              <div className="Education-info basis-1/2">
                                <h4 className={`${mulish700.className}`}>
                                  {experience.exp_title}
                                </h4>
                                <span className={`${mulish500.className}`}>
                                  {experience.company}
                                </span>
                              </div>
                              <div className="Education-info basis-1/2">
                                <span className={`${mulish600.className}`}>
                                  {experience.year}-
                                  {experience.end_year ||
                                    new Date().getFullYear()}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-[20px] border-t border-[#a6b7f4]">
                    <div>
                      <div className="Education-data">
                        <h3
                          className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                        >
                          Professional Certifications
                        </h3>
                        {certificationData === null ||
                        certificationData?.length === 0 ? (
                          <div className={`flex w-full ${mulish500.className}`}>
                            No Professional Certifications found
                          </div>
                        ) : (
                          certificationData.map((certData, index) => (
                            <div className="flex w-full" key={index}>
                              <div className="Education-info basis-1/2">
                                <h4 className={`${mulish700.className}`}>
                                  {certData.certification_for}
                                </h4>
                                <span className={`${mulish500.className}`}>
                                  {certData.certificate_in}
                                </span>
                              </div>
                              <div className="Education-info basis-1/2">
                                <span className={`${mulish600.className}`}>
                                  {new Date(
                                    certData.certificate_start_date
                                  ).getFullYear()}
                                  -
                                  {new Date(
                                    certData.certificate_end_date
                                  ).getFullYear()}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-[20px] border-t border-[#a6b7f4]">
                    <div>
                      <div className="Education-data">
                        <h3
                          className={`m-0 text-base md:text-[20px] ${mulish700.className} mb-[15px]`}
                        >
                          Portfolio
                        </h3>
                        {portfolioData === null ||
                        portfolioData.length === 0 ? (
                          <div className={`flex w-full ${mulish500.className}`}>
                            No Portfolio found.
                          </div>
                        ) : (
                          <div className="flex w-full">
                            {portfolioData.map((data, index) => (
                              <div
                                className="Education-info basis-1/2"
                                key={index}
                              >
                                <h4 className={`${mulish700.className}`}>
                                  {data.title}
                                </h4>
                                <span className={`${mulish500.className}`}>
                                  {data.portfolio_link}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </ThemeProvider>
    </ErrorBoundary>
  );
};

export default Profile;
