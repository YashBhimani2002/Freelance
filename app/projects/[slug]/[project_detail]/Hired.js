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
import Link from "next/link";
import { get_specific_country } from "@/app/api/api";
import Error  from "../../../error";
import ErrorBoundary  from "../../../ErrorBoundry";



const data = {
  id: 1,
  name: "Digital Marketing",
  price: "Fixed Price",
  experienceLevel: "Fresher",
  no: "N100",
  posted: "Posted 33d ago",
  tags: ["Digital Marketing", "SEO", "editing"],
  starReview: 3.5,
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

export default function Hired({
  appliedProfessionalsForHire,
  id,
  allProfessionals,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [specificcountry, setspecificcountry] = useState([]);
  const [ratings, setratings] = useState([]);
  const [skills, setskills] = useState([]);
  const [profileModel, setProfileModel] = useState(false);
  const [selectedPofessional, setSelectedProfessional] = useState("");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  // hired
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

  let fcountryArray = [];
  if (appliedProfessionalsForHire && appliedProfessionalsForHire.length > 0) {
    appliedProfessionalsForHire.map((hiredProf) => {
      if (hiredProf.status === "hired" && hiredProf.job_id === id) {
        const fcountry = hiredProf.professional_data[0]?.country;
        if (fcountry) {
          fcountryArray.push(fcountry);
        }
      }
    });
  }
  const fuserid = [];
  appliedProfessionalsForHire &&
    appliedProfessionalsForHire.map((hiredProf) => {
      if (hiredProf.status === "hired" && hiredProf.job_id === id) {
        const userId = hiredProf?.user_id;
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
    <ErrorBoundary fallback= {<Error/>}>
     <>
    <div>
      {appliedProfessionalsForHire.length > 0 ? (
        appliedProfessionalsForHire.map((hiredProf) => {
          if (hiredProf.status === "hired" && hiredProf.job_id === id) {
            let totalNetTransactionsAmount = 0;
            let jobSucess = 0;

            allProfessionals.forEach((allprofessional) => {
              if (allprofessional._id === hiredProf.user_id) {
                //job sucess calculation

                if (
                  allprofessional.activeJobs &&
                  allprofessional.completedJobs
                ) {
                  const totalJobs =
                    allprofessional.activeJobs.length +
                    allprofessional.completedJobs.length;
                  const jobSuccessPercentage = Math.floor(
                    (allprofessional.completedJobs.length / totalJobs) * 100
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

                    const commissionAmount = (amount * commissionRate) / 100;

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
                key={hiredProf.id}
                className="client-contract-show-job-contener"
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <div
                      className="mr-[40px]"
                      onClick={() => handleOpenProfileModel(hiredProf)}
                    >
                      <img
                        className="rounded-full h-[120px] w-[120px]"
                        src={
                          hiredProf.professional_data[0]?.avatar
                            ? `${url}/public/uploads/profile_attachments/${hiredProf.professional_data[0]?.avatar}`
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
                          onClick={() => handleOpenProfileModel(hiredProf)}
                        >
                          {hiredProf.professional_data[0]?.first_name}{" "}
                          {hiredProf.professional_data[0]?.last_name}
                        </p>
                      </div>
                      <h1 className="text-black font-mulish font-[400] text-[21px]">
                        {hiredProf?.professional_data[0]?.bio_title}
                      </h1>
                      <ul className="flex items-center gap-7 mt-1">
                        {getCountryName(
                          hiredProf?.professional_data[0]?.country
                        ) !== "" && (
                          <li className="flex items-center gap-2 text-location_clr">
                            <img alt="country" className="h-5 w-5" />
                            {getCountryName(
                              hiredProf?.professional_data[0]?.country
                            )}
                          </li>
                        )}
                        <li className="bg-active_bg px-1 rounded">
                          {getrating(hiredProf?.user_id)}
                        </li>

                        <li>
                          {" "}
                          {renderStars(getrating(hiredProf?.user_id) || 0)}
                        </li>
                      </ul>
                      <div className="flex flex-wrap gap-8 mt-3">
                        <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                          N0
                        </p>
                        <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                          0 Jobs Completed on Freelance
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
                            (skill) => skill.userId === hiredProf?.user_id
                          )
                          .map((skill, index) =>
                            skill.skills.map((individualSkill, skillIndex) =>
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
                  <Link
                    href={{
                      pathname: "/message",
                      query: { id: hiredProf?.user_id },
                    }}
                    className=" flex gap-3 "
                  >
                    <input
                      type="button"
                      value="Message"
                      className="text-sm transition duration-300 ease-out cursor-pointer rounded-[5px] bg-submtBtn text-white border border-submtBtn font-normal p-2.5 hover:bg-white hover:text-submtBtn"
                    />
                  </Link>
                </div>
              </div>
            );
          }
        })
      ) : (
        <p className="my-5 p-5">No data found</p>
      )}
    </div>
    </>
    </ErrorBoundary>
  );
}
