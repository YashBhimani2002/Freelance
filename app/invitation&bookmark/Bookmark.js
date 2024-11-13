import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { MyApplication, diclinJobInvite } from "../api/api";
import Jobmodal from "../jobModel/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarksolid,
  faStar as faStarsolid,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/common/Loader";
import SubLoader from "../../components/common/SubLoader";

const inter = Inter({ subsets: ["latin"], weight: "500" });
const mulish = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });

const bookmarkIcon = (
  <svg
    class="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
  </svg>
);
const userIcon = (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.81706 16.8408H2.90039C2.90039 13.9413 5.47475 11.5908 8.65039 11.5908C11.826 11.5908 14.4004 13.9413 14.4004 16.8408H12.4837C12.4837 14.9078 10.7675 13.3408 8.65039 13.3408C6.5333 13.3408 4.81706 14.9078 4.81706 16.8408ZM16.3113 13.6996L13.7181 11.3371L15.0712 10.0963L16.3094 11.2268L20.4302 7.47132L21.7834 8.71032L16.3094 13.6978L16.3113 13.6996ZM8.65039 10.7158C6.5333 10.7158 4.81706 9.14882 4.81706 7.21582C4.81706 5.28282 6.5333 3.71582 8.65039 3.71582C10.7675 3.71582 12.4837 5.28282 12.4837 7.21582C12.4811 9.14782 10.7664 10.7134 8.65039 10.7158ZM8.65039 5.46582C7.60331 5.46679 6.75087 6.23481 6.73586 7.19074C6.72086 8.14667 7.54885 8.93669 8.59547 8.96505C9.64209 8.99341 10.5199 8.24963 10.5671 7.29457V7.64457V7.21582C10.5671 6.24932 9.70894 5.46582 8.65039 5.46582Z"
      fill="#2E3A59"
    />
  </svg>
);
const starIcon = (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1447 5.60657L10.6452 5.13277L8.49592 0.0737305L6.34662 5.14041L0.847168 5.60657L5.02338 9.22126L3.76899 14.5936L8.49592 11.7431L13.2228 14.5936L11.9761 9.22126L16.1447 5.60657ZM8.49592 10.3141L5.61999 12.0488L6.38486 8.77802L3.84548 6.57711L7.19563 6.28671L8.49592 3.20697L9.80385 6.29436L13.154 6.58475L10.6146 8.78566L11.3795 12.0565L8.49592 10.3141Z"
      fill="#323232"
    />
  </svg>
);

const locationIcon = (
  <svg
    width="15"
    height="19"
    viewBox="0 0 15 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.67432 18.7156C6.41125 17.6383 5.2405 16.4571 4.17432 15.1846C2.57432 13.2736 0.674317 10.4276 0.674317 7.71563C0.672899 4.88317 2.37856 2.32902 4.99539 1.24502C7.61221 0.161031 10.6244 0.760867 12.6263 2.76463C13.9428 4.07523 14.6802 5.85802 14.6744 7.71563C14.6744 10.4276 12.7743 13.2736 11.1743 15.1846C10.1081 16.4571 8.93739 17.6383 7.67432 18.7156ZM7.67432 4.71563C6.60252 4.71563 5.61214 5.28742 5.07624 6.21563C4.54034 7.14383 4.54034 8.28742 5.07624 9.21563C5.61214 10.1438 6.60252 10.7156 7.67432 10.7156C9.33117 10.7156 10.6743 9.37248 10.6743 7.71563C10.6743 6.05877 9.33117 4.71563 7.67432 4.71563Z"
      fill="#2E3A59"
    />
  </svg>
);
const timeIcon = (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.6743 20.7158C5.15147 20.7158 0.674316 16.2387 0.674316 10.7158C0.674316 5.19297 5.15147 0.71582 10.6743 0.71582C16.1972 0.71582 20.6743 5.19297 20.6743 10.7158C20.6683 16.2362 16.1947 20.7098 10.6743 20.7158ZM10.6743 2.71582C6.25604 2.71582 2.67432 6.29754 2.67432 10.7158C2.67432 15.1341 6.25604 18.7158 10.6743 18.7158C15.0926 18.7158 18.6743 15.1341 18.6743 10.7158C18.6694 6.2996 15.0905 2.72078 10.6743 2.71582ZM15.6743 11.7158H9.67432V5.71582H11.6743V9.71582H15.6743V11.7158Z"
      fill="#2E3A59"
    />
  </svg>
);
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
export default function Bookmark({ BookmarkList, dataLoading, handleRefresh }) {
  const [appliedApplicationJobId, setAppliedApplicationJobId] = useState(null);
  const [jobData, setJobData] = useState();
  const [jobId, setJobId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeclinePopup, setShowDeclinePopup] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [reviewData, setReviewData] = useState({
    length: 0,
    averageRating: 0,
  });
  const [openmodal, setOpenModal] = useState(false);
  const [subloader, setSubLoader] = useState(false);

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

  const handleapplyclick = (value, review, skills) => {
    setJobId(value._id);
    setJobData({ ...value, skills: skills });
    setReviewData({
      averageRating: review,
    });
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    getmyapplication();
  }, []);

  const handleSubLoader = () => {
    setSubLoader(true);
  };

  const getmyapplication = async () => {
    try {
      const response = await MyApplication();
      if (response?.status == 200) {
        setAppliedApplicationJobId(
          response?.data?.data?.map((jobs) => jobs.job_id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formatTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      return `${hoursDifference}h ago`;
    } else {
      return `${daysDifference}d ago`;
    }
  }

  const renderStars = (value) => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value - fullStars > 0;

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

  const handleDeclineInvitation = async (job_id) => {
    setSelectedJobId(job_id);
    setShowDeclinePopup(true);
  };

  const declineInvitation = async () => {
    try {
      const data = {
        jobId: selectedJobId, // Use the stored job_id
      };
      await diclinJobInvite(data).then((res) => {
        console.log(res,data);
        
        if (res?.status == 200) {
          // window.location.reload();
          handleRefresh('bookmark')
          setShowDeclinePopup(false);
        }
      });
    } catch (error) {
      console.error("Error declining job invitation:", error);
    }
  };
  return (
    <>
      {dataLoading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <div className={` ${mulish.className} my-5`}>
          {BookmarkList.length > 0 ? (
            BookmarkList.map((item) => {
              let job = "notApplied";

              appliedApplicationJobId?.map((id) => {
                if (item.jobData._id === id) {
                  job = "applied";
                }
              });

              let invitedP = "invited";
              item?.jobinvitessdata?.map((professional) => {
                if (
                  item.jobData._id === professional.job_id &&
                  ["-1", "2"].includes(professional.invite_status)
                ) {
                  invitedP = "notInvited";
                }
              });
              return (
                <div
                  className="p-5 my-5 border border-borderBlue rounded-xl"
                  key={item.jobData._id}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`findwork/${item.jobData._id}`}
                      className={`text-black text-[21px] ${mulish600.className} hover:text-searchbg cursor-pointer`}
                    >
                      {item.jobData.job_title}
                    </Link>
                    {/* <p>{bookmarkIcon}</p> */}
                  </div>
                  {item.jobData.budget_type == "fixed" ? (
                    <div className="flex items-center gap-5 py-3 text-sm">
                      <p className="text-strongText font-semibold">
                        Fixed Price
                      </p>
                      <p>
                        <strong className="text-strongText">Budget :</strong> N
                        {item.jobData.budget_from}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5 py-3 text-sm">
                      <p className="text-strongText font-semibold">Range</p>
                      <p>
                        <strong className="text-strongText">Budget :</strong> N
                        {item.jobData.budget_from}-N{item.jobData.budget_to}
                      </p>
                    </div>
                  )}

                  <p className="text-strongText text-[15px]">
                    {item.jobData.job_description}
                  </p>
                  <ul
                    className={`${inter.className} flex flex-wrap items-center justify-start gap-2 text-xs font-medium my-2`}
                  >
                    {item.skilllist.map((skill, index) => (
                      <li
                        key={index}
                        className="bg-sidbarseleclistcolor text-strongText p-2 mt-2 rounded-lg shadow shrink-0 font-medium"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 sm:justify-between mt-3">
                    <ul className="flex flex-wrap justify-start items-center gap-4  sm:gap-8">
                      <li className="flex items-center gap-1 sm:gap-3">
                        <p>{userIcon}</p>
                        <p className="flex items-center">
                          {renderStars(item.review)}
                          {/* <span>{starIcon}</span>
                    <span>{starIcon}</span>
                    <span>{starIcon}</span>
                    <span>{starIcon}</span>
                    <span>{starIcon}</span> */}
                        </p>
                      </li>
                      <li className="flex items-center gap-2 text-strongText text-[14px]">
                        <p>{locationIcon}</p>
                        <p>{item.jobData.user_id?.country?.name || "-"}</p>
                      </li>
                      <li className="flex items-center gap-2 text-strongText text-[14px]">
                        <p>{timeIcon}</p>
                        <p>Posted {formatTimeAgo(item.jobData.created_at)}</p>
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row items-center gap-3 xl:gap-5">
                      {invitedP === "notInvited" ? (
                        <></>
                      ) : job === "applied" ? (
                        <button
                          onClick={() => setShowPopup(true)}
                          className={` ${inter.className} text-base w-full sm:w-auto border border-[#eee] sm:border-transparent p-2 text-black font-normal py-[6px] px-[12px] rounded-[10px] bg-white hover:text-blue_600 hover:bg-white hover:border hover:border-blue_600`}
                        >
                          Decline
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleDeclineInvitation(item?.jobData?._id)
                          }
                          className={` ${inter.className} text-base w-full sm:w-auto border border-[#eee] sm:border-transparent p-2 text-black font-normal py-[6px] px-[12px] rounded-[10px] bg-white hover:text-blue_600 hover:bg-white hover:border hover:border-blue_600`}
                        >
                          Decline
                        </button>
                      )}
                      {job === "applied" ? (
                        <button
                          className={`${inter.className} select-none text-active_color font-normal whitespace-no-wrap rounded py-1 leading-normal no-underline`}
                          id="btn_login"
                          type="button"
                        >
                          Already Applied
                        </button>
                      ) : userData.professional_profile_complete != null &&
                        userData.professional_profile_complete === 1 ? (
                        <button
                          className={`${inter.className} text-base w-full sm:w-auto border py-[6px] px-[12px] rounded-[10px] text-white font-normal bg-blue_600 hover:text-blue_600 hover:bg-white hover:border hover:border-blue_600`}
                          id="btn_login"
                          type="button"
                          onClick={() =>
                            handleapplyclick(item.jobData, item.review, item.skilllist)
                          }
                        >
                          Apply
                        </button>
                      ) : (
                        <button
                          className={`${inter.className} text-base w-full sm:w-auto border py-[6px] px-[12px] rounded-[10px] text-white font-normal bg-blue_600 hover:text-blue_600 hover:bg-white hover:border hover:border-blue_600`}
                          id="btn_login"
                          type="button"
                          onClick={() => setValidationPopup(true)}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
                <div className="text-black ml-[35%] ms-3">No data found</div>
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
                    You have already applied for this job.
                  </h1>
                </div>
              </div>
            </div>
          )}
          {showDeclinePopup && (
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
                        Do you really want to decline this invitation?
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-center gap-5 items-center p-5">
                    <button
                      className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                      onClick={() => setShowDeclinePopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                      onClick={declineInvitation}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {subloader == true && <SubLoader />}

      {openmodal && (
        <Jobmodal
          onClose={handleCloseModal}
          onOpenLoader={handleSubLoader}
          isOpen={openmodal}
          jobid={jobId}
          jobData={jobData}
          reviewData={reviewData}
        />
      )}
    </>
  );
}
