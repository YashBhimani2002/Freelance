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
import {
  get_specific_country,
  reviewHireAppliedJob,
  postNotification,
} from "@/app/api/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Error from "../../../error";
import ErrorBoundary from "../../../ErrorBoundry";
import { useSocket } from "@/app/socketContext";
import { createTheme, ThemeProvider, tooltipClasses } from "@mui/material";
import Tooltip from "@mui/material/Tooltip"; // Adjust the import according to your library

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
const data = {
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

export default function ReviewedApplicants({
  appliedProfessionalsForReview,
  shortlistedHireId,
  childToParent,
  id,
  allProfessionals,
}) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [specificcountry, setspecificcountry] = useState([]);
  const [ratings, setratings] = useState([]);
  const [skills, setskills] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const [selectedPofessional, setSelectedProfessional] = useState("");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
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

  const handleFontAwsome = () => {
    return isBookmarked ? (
      <FontAwesomeIcon icon={faBookmarksolid} onClick={handleBookmarkToggle} />
    ) : (
      <FontAwesomeIcon icon={faBookmark} onClick={handleBookmarkToggle} />
    );
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
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const { socket } = useSocket();
  const handleReviewClick = async (data) => {
    const alreadyHired = appliedProfessionalsForReview.find(
      (item) => item.job_id === id && item.status === "hired"
    );
    const retrievedCookie = Cookies.get("authToken");

    const decodedToken = jwt.decode(retrievedCookie);

    if (!alreadyHired) {
      const messageForShow = `${decodedToken.first_name} ${decodedToken.last_name} hired your application for "${data.contract_title}"`;

      const messageShow = `Your contract is activated for "${data.contract_title}"`;

      const dataToSend = {
        id: data._id,
        reviewOrHire: "hired",
      };

      const jobID = data.job_id;
      const route = `/application/${jobID}`;

      const dataForNofitication = {
        rout: route,
        send_by: "client",
        subject: "hired",
        email: data.professional_data[0].email,
        professional_id: data.professional_id,
        job_id: data.job_id,
        first_name: data.professional_data[0].first_name,
        last_name: data.professional_data[0].last_name,
      };
      socket.on("new_notification", dataForNofitication);
      const jobId = data._id;
      const routee = `/mycontract/${jobId}`;

      const dataNofitication = {
        rout: routee,
        send_by: "client",
        subject: "Active",
        email: data.professional_data[0].email,
        professional_id: data.professional_id,
        client_id: data.client_id,
        job_id: data.job_id,
        first_name: data.professional_data[0].first_name,
        last_name: data.professional_data[0].last_name,
      };

      const data_professional = data.professional_id;

      try {
        const response = await reviewHireAppliedJob(dataToSend);
        if (response?.status == 200) {
          // await postNotification(dataForNofitication).then((res) => {
          //   const data = {
          //     message: messageForShow,
          //     professional_id: data_professional,
          //     rout: route,
          //     status: 0,
          //   };
          //   socket.emit("new_notification", data);

          //   if (res.status == 200) {
          //   }
          // });
          await postNotification(dataNofitication).then((res) => {
            const data = {
              message: messageShow,
              professional_id: data_professional,
              rout: routee,
              status: 0,
            };

            socket.emit("new_notification", data);
            socket.emit("update_notification", {
              login_as: 2,
              id: data_professional,
            });
            if (res.status == 200) {
            }
          });
          shortlistedHireId(data._id);
          router.push(
            `/clientContract/${response.data.updatedContract._id}?Contract_created=true`
          );
          appliedProfessionalsForReview.map((appliedProf) => {
            if (appliedProf._id === data._id) {
              appliedProf.status = "hired";
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setShowPopup(true);
    }
  };

  let fcountryArray = [];
  if (
    appliedProfessionalsForReview &&
    appliedProfessionalsForReview.length > 0
  ) {
    appliedProfessionalsForReview.map((reviewedProf) => {
      if (reviewedProf.status === "reviewed" && reviewedProf.job_id === id) {
        const fcountry = reviewedProf.professional_data[0]?.country;
        if (fcountry) {
          fcountryArray.push(fcountry);
        }
      }
    });
  }
  const fuserid = [];
  appliedProfessionalsForReview &&
    appliedProfessionalsForReview.map((reviewedProf) => {
      if (reviewedProf.status === "reviewed" && reviewedProf.job_id === id) {
        const userId = reviewedProf?.user_id;
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

  const getCountryName = (countryCode) => {
    const foundCountry = specificcountry.find(
      (country) => country.id === countryCode
    );
    return foundCountry ? foundCountry.name : "";
  };
  const getrating = (userid) => {
    const foundrating = ratings.find((country) => country.userId === userid);
    return foundrating ? foundrating.averageRating : 0; // Return country name if found, else empty string
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
            {appliedProfessionalsForReview?.length > 0 ? (
              appliedProfessionalsForReview.map((reviewedProf, index) => {
                if (
                  reviewedProf.status === "reviewed" &&
                  reviewedProf.job_id === id
                ) {
                  let totalNetTransactionsAmount = 0;
                  let jobSucess = 0;

                  allProfessionals.forEach((allprofessional) => {
                    if (allprofessional._id === reviewedProf.user_id) {
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
                      key={index}
                      className="client-contract-show-job-contener"
                    >
                      <div className="flex justify-between">
                        <div className="flex">
                          <div
                            className="mr-[40px]"
                            onClick={() => handleOpenProfileModel(reviewedProf)}
                          >
                            <img
                              className="rounded-full h-[120px] w-[120px]"
                              src={
                                reviewedProf?.professional_data[0]?.avatar
                                  ? `${url}/public/uploads/profile_attachments/${reviewedProf?.professional_data[0]?.avatar}`
                                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              } // Ensure userData?.avatar is the filename
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
                                  handleOpenProfileModel(reviewedProf)
                                }
                              >
                                {reviewedProf.professional_data[0]?.first_name}{" "}
                                {reviewedProf.professional_data[0]?.last_name}
                              </p>
                            </div>
                            <h1 className="text-black font-mulish font-[400] text-[21px]">
                              {
                                reviewedProf?.professional_bio_data[0]
                                  ?.bio_title
                              }
                            </h1>
                            <ul className="flex items-center gap-7 mt-1">
                              {getCountryName(
                                reviewedProf?.professional_data[0]?.country
                              ) !== "" && (
                                <li className="flex items-center gap-2 text-location_clr">
                                  <img alt="country" className="h-5 w-5" />
                                  {getCountryName(
                                    reviewedProf?.professional_data[0]?.country
                                  )}
                                </li>
                              )}
                              <li className="bg-active_bg px-1 rounded">
                                {getrating(reviewedProf?.user_id)}
                              </li>
                              <li className="flex gap-[1px]">
                                {renderStars(
                                  getrating(reviewedProf?.user_id) || 0
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
                                    skill.userId === reviewedProf?.user_id
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
                              query: { id: reviewedProf?.user_id },
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
                            title="Start Contract"
                            placement="right"
                            arrow
                            componentsProps={tooltipClass}
                          >
                            <input
                              type="button"
                              value="Activate Contract"
                              className="text-sm transition duration-150 ease-out cursor-pointer rounded-[5px] bg-white text-black border border-white hover:border-submtBtn font-normal p-3.5 px-5 hover:text-submtBtn"
                              onClick={() => handleReviewClick(reviewedProf)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <p className="my-5 p-5">No data found</p>
            )}
            {showPopup && (
              <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
                  <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                    <div
                      className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                      onClick={() => setShowPopup(false)}
                    >
                      {cancelIcon}
                    </div>

                    <h1
                      className={` font-mulish font-[400] text-[21px] my-8 text-center text-base text-[#000000]  `}
                    >
                      A professional is already hired for this job.
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
