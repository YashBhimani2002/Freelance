import React, { useEffect, useState } from "react";
import "./style.css";
import {
  faBookmark,
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarksolid,
  faStar as faStarsolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import {
  milstoneData,
  myApplicationDetail,
  reviewHireAppliedJob,
  get_specific_country,
} from "@/app/api/api";
import Jobmodal from "./jobModel/page";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import io from "socket.io-client";
import Error from "../../../error";
import ErrorBoundary from "../../../ErrorBoundry";
import { useSocket } from "@/app/socketContext";
import { createTheme, ThemeProvider, tooltipClasses } from "@mui/material";
import Tooltip from "@mui/material/Tooltip"; // Adjust the import according to your library

const ratingstar = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.49968 13.3916L13.3922 16.5L12.0938 10.6416L16.4163 6.69996L10.7243 6.19163L8.49968 0.666626L6.27509 6.19163L0.583008 6.69996L4.90551 10.6416L3.60717 16.5L8.49968 13.3916Z"
      fill="#7E8082"
    />
  </svg>
);
const whitestar = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4163 6.69996L10.7243 6.18329L8.49968 0.666626L6.27509 6.19163L0.583008 6.69996L4.90551 10.6416L3.60717 16.5L8.49968 13.3916L13.3922 16.5L12.1018 10.6416L16.4163 6.69996ZM8.49968 11.8333L5.52301 13.725L6.31467 10.1583L3.68634 7.75829L7.15384 7.44163L8.49968 4.08329L9.85343 7.44996L13.3209 7.76663L10.6926 10.1666L11.4843 13.7333L8.49968 11.8333Z"
      fill="#7E8082"
    />
  </svg>
);
const daata = {
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
};

const cancelIcon = (
  <svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path stroke="currentColor" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
  </svg>
);

export default function Shortlisted({
  data,
  appliedProfessionals,
  childToParent,
  shortlistedId,
  id,
  allProfessionals,
  selectedReviewApplicationDataForPerent,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [selectedRevuewApplicationData, setSelectedRevuewApplicationData] =
    useState(null);
  const [specificcountry, setspecificcountry] = useState([]);
  const [ratings, setratings] = useState([]);
  const [skills, setskills] = useState([]);

  const [myApplicationDetails, setMyApplicationDetails] = useState(null);
  const [mileStoneData, setMileStoneData] = useState(null);
  const [profileModel, setProfileModel] = useState(false);
  const [selectedPofessional, setSelectedProfessional] = useState("");

  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const { socket } = useSocket();
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleFontAwsome = () => {
    return isBookmarked ? (
      <FontAwesomeIcon icon={faBookmarksolid} onClick={handleBookmarkToggle} />
    ) : (
      <FontAwesomeIcon icon={faBookmark} onClick={handleBookmarkToggle} />
    );
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const jobid = data[0]._id;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fcountryArray = [];
  appliedProfessionals &&
    appliedProfessionals.map((professional) => {
      if (professional.status === "shortlisted" && professional.job_id === id) {
        const fcountry = professional?.professional_data[0]?.country;
        if (fcountry) {
          fcountryArray.push(fcountry);
        }
      }
    });
  const fuserid = [];
  appliedProfessionals &&
    appliedProfessionals.map((professional) => {
      if (professional.status === "shortlisted" && professional.job_id === id) {
        const userId = professional?.user_id;
        fuserid.push({ userId: userId });
      }
    });

  useEffect(() => {
    const fetchSpecificCountries = async () => {
      try {
        const response = await get_specific_country(fcountryArray, fuserid);
        if (response && response?.data?.success) {
          setspecificcountry(response?.data?.data);
          setratings(response?.data?.userRatings);
          setskills(response?.data?.userskills);
        }
      } catch (error) {
        console.error("Error fetching specific countries:", error);
      }
    };
    fetchSpecificCountries();
  }, [data]);

  useEffect(() => {
    loadmyApplicationDetail();
    loadmilstoneData();
  }, [appliedProfessionals]);

  const loadmilstoneData = async () => {
    try {
      const response = await milstoneData(jobid);
      if (response?.status === 200 || response?.status === 201) {
        setMileStoneData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadmyApplicationDetail = async () => {
    if (id) {
      const data = {
        job_id: id,
      };
      try {
        const response = await myApplicationDetail(data);
        if (response?.status === 200) {
          setMyApplicationDetails(response?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleReviewClick = async (data) => {
    setOpenModal(true);
    setSelectedRevuewApplicationData(data);
    selectedReviewApplicationDataForPerent(data);
  };

  const retrievedCookie = Cookies.get("authToken");

  const decodedToken = jwt.decode(retrievedCookie);

  const handleModalSubmit = async () => {
    setOpenModal(false);
    childToParent("ReviewedApplicants");

    if (selectedRevuewApplicationData !== null) {
      const dataToSend = {
        id: selectedRevuewApplicationData._id,
        reviewOrHire: "reviewed",
      };

      try {
        const response = await reviewHireAppliedJob(dataToSend);
        if (response?.data?.success) {
          shortlistedId(data._id);
          appliedProfessionals.map((professional) => {
            if (professional._id === selectedRevuewApplicationData._id) {
              professional.status = "reviewed";
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const getCountryName = (countryCode) => {
    const foundCountry = specificcountry.find(
      (country) => country.id === countryCode
    );
    return foundCountry ? foundCountry.name : ""; // Return country name if found, else empty string
  };
  const getrating = (userid) => {
    const foundrating = ratings.find((country) => country.userId === userid);
    return foundrating ? foundrating.averageRating : 0; // Return country name if found, else empty string
  };

  const renderStars = (starReview) => {
    const stars = [];
    const fullStars = Math.floor(starReview);
    const hasHalfStar = starReview - fullStars > 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarsolid}
            key={i}
            style={{ color: "#7E8082" }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            key={i}
            style={{ color: "#7E8082" }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            icon={faStarOutline}
            key={i}
            style={{ color: "#7E8082" }}
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
  //open professional model
  const handleOpenProfileModel = (professional) => {
    setProfileModel(true);
    setSelectedProfessional(professional);
  };
  const handleCloseProfileModel = () => {
    setProfileModel(false);
    setSelectedProfessional("");
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<Error />}>
        <>
          <div>
            {appliedProfessionals &&
              appliedProfessionals.map((professional) => {
                if (
                  professional.status === "shortlisted" &&
                  professional.job_id === id
                ) {
                  let totalNetTransactionsAmount = 0;
                  let jobSucess = 0;

                  allProfessionals.forEach((allprofessional) => {
                    if (allprofessional._id === professional.user_id) {
                      //job sucess calculation
                      if (
                        allprofessional.activeJobs &&
                        allprofessional.completedJobs
                      ) {
                        const totalJobs =
                          allprofessional.activeJobs.length +
                          allprofessional.completedJobs.length;
                        const jobSuccessPercentage = Math.floor(
                          (allprofessional.completedJobs.length / totalJobs) *
                            100
                        );
                        jobSucess = jobSuccessPercentage;
                      }

                      //transaction calculation
                      const transactions = allprofessional.transactions;

                      if (transactions && transactions.length > 0) {
                        transactions.forEach((transaction) => {
                          const amount = parseFloat(transaction.amount);
                          const commissionRate = parseFloat(
                            transaction.commission_rate
                          );

                          const commissionAmount =
                            (amount * commissionRate) / 100;

                          const netAmount = amount - commissionAmount;

                          totalNetTransactionsAmount += netAmount;
                        });
                        totalNetTransactionsAmount = Math.floor(
                          totalNetTransactionsAmount
                        );
                      }
                    }
                  });
                  return (
                    <div
                      key={professional.id}
                      className="client-contract-show-job-contener"
                    >
                      <div className="flex justify-between">
                        <div className="flex">
                          <div
                            className="mr-[40px]"
                            onClick={() => handleOpenProfileModel(professional)}
                          >
                            <img
                              className="rounded-full h-[120px] w-[120px]"
                              src={
                                professional?.professional_data[0]?.avatar
                                  ? `${url}/public/uploads/profile_attachments/${professional?.professional_data[0]?.avatar}`
                                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              }
                              alt="User"
                              onError={(e) => {
                                const target = e.target;
                                target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                              }}
                            />
                          </div>
                          <div className="client-contract-item">
                            <div className="mb-2">
                              <p
                                className="text-black font-mulish font-[400] text-[21px] leading-7"
                                onClick={() =>
                                  handleOpenProfileModel(professional)
                                }
                              >
                                {professional.professional_data[0]?.first_name}{" "}
                                {professional.professional_data[0]?.last_name}
                              </p>
                            </div>
                            <h1 className="text-black font-mulish font-[400] text-[21px]">
                              {
                                professional?.professional_bio_data[0]
                                  ?.bio_title
                              }
                            </h1>
                            <ul className="flex items-center gap-7 mt-1">
                              {getCountryName(
                                professional?.professional_data[0]?.country
                              ) !== "" && (
                                <li className="flex items-center gap-2 text-location_clr">
                                  <img alt="country" className="h-5 w-5" />
                                  {getCountryName(
                                    professional?.professional_data[0]?.country
                                  )}
                                </li>
                              )}
                              <li className="bg-active_bg px-1 rounded">
                                {getrating(professional?.user_id)}
                              </li>
                              <li className="flex gap-[1px]">
                                {renderStars(
                                  getrating(professional?.user_id) || 0
                                )}
                              </li>
                            </ul>
                            <div className="flex flex-wrap gap-8 mt-3">
                              <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                                N0
                              </p>
                              <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                                0 Jobs Completed on Praiki
                              </p>
                              <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                                {totalNetTransactionsAmount
                                  ? `N ${totalNetTransactionsAmount} earned`
                                  : "N 0 earned"}
                              </p>

                              <div className="font-regular">
                                <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                                  {jobSucess !== null && !isNaN(jobSucess)
                                    ? `${jobSucess}% Job Success`
                                    : "0% Job Success"}
                                </p>
                                <div className="w-full h-3 bg-progress rounded-md overflow-hidden">
                                  <div
                                    className="h-3 bg-[#4299E1]"
                                    style={{
                                      width: `${
                                        jobSucess !== null && !isNaN(jobSucess)
                                          ? jobSucess
                                          : 0
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <ul className="flex flex-wrap items-center justify-start gap-2 text-xs font-medium my-2 ">
                              {skills
                                .filter(
                                  (skill) =>
                                    skill.userId === professional?.user_id
                                )
                                .map((skill, index) =>
                                  skill.skills.map(
                                    (individualSkill, skillIndex) =>
                                      individualSkill?.map((item, i) => (
                                        <li
                                          className="bg-sidbarseleclistcolor text-strongText p-2 rounded-lg shadow shrink-0"
                                          key={`${i}-${skillIndex}`}
                                        >
                                          {item}
                                        </li>
                                      ))
                                  )
                                )}
                            </ul>
                          </div>
                        </div>
                        <div className="">
                          <span>{handleFontAwsome()}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className=" flex gap-3 ">
                          <Link
                            href={{
                              pathname: "/message",
                              query: { id: professional?.user_id },
                            }}
                            className=" flex gap-3 "
                          >
                            <input
                              type="button"
                              value="Message"
                              className="text-sm transition duration-300 ease-out cursor-pointer rounded-[5px] bg-submtBtn text-white border border-submtBtn font-normal p-2.5 hover:bg-white hover:text-submtBtn"
                            />
                          </Link>
                          <Tooltip
                            title="Assess Application"
                            placement="right"
                            arrow
                            componentsProps={tooltipClass}
                          >
                            <span className="flex gap-3 ">
                              <input
                                onClick={() => handleReviewClick(professional)}
                                type="button"
                                value="Review"
                                className="text-sm transition duration-150 ease-out cursor-pointer rounded-[5px] bg-white text-black border border-white hover:border-submtBtn font-normal p-3.5 px-5 hover:text-submtBtn"
                              />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            {openmodal && (
              <Jobmodal
                mileStoneData={mileStoneData}
                selectedRevuewApplicationData={selectedRevuewApplicationData}
                onClose={handleCloseModal}
                isOpen={openmodal}
                jobid={jobid}
                jobData={data[0]}
                isReview={true}
                handleModalSubmit={handleModalSubmit}
                starReview={myApplicationDetails?.review}
              />
            )}
          </div>
        </>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
