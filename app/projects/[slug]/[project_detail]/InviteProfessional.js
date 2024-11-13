import React, { useState, useEffect } from "react";
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
import Loader from "@/components/common/Loader";
import axios from "axios";
import io from "socket.io-client";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Error from "../../../error";
import ErrorBoundary from "../../../ErrorBoundry";

import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

import {
  bookmarkProfessionalForJob,
  bookmarkProfessionalForJobdetails,
  removeprofessionalbookmarkForJobDetails,
  postNotification,
} from "../../../api/api";
import Pagination from "@mui/material/Pagination";
import { useSocket } from "@/app/socketContext";
const styles = {
  pagination: {
    "& .MuiPaginationItem-root": {
      margin: 0,
      color: "#2884cc",
    },
    "& .Mui-selected": {
      color: "white !important",
      backgroundColor: "#2884cc !important",
      "&:hover": {
        backgroundColor: "#2884cc !important", // Ensure hover effect remains the same
      },
    },
    // Remove unwanted hover effect
    "& .MuiPaginationItem-root.Mui-selected:hover": {
      backgroundColor: "#2884cc !important",
    },
    "& .MuiPaginationItem-page": {
      borderRadius: 0, // Remove border radius for buttons with count number
    },
  },
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

export default function InviteProfessional({ data }) {
  const jobId = data[0]._id;
  const jobType = data[0].type;
  const [loading, setLoading] = useState(true);
  const [allProfessionals, setAllProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [bookmarkdetails, setbookmarkdetails] = useState([]);
  const [successmessage, setsuccessmessage] = useState("");
  const [successinvite, setsuccessinvite] = useState("");
  const [invitedProfessionals, setInvitedProfessionals] = useState([]);
  const [room, setRoom] = useState([]);
  const [profileModel, setProfileModel] = useState(false);
  const [selectedPofessional, setSelectedProfessional] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const retrievedCookie = Cookies.get("authToken");

  const decodedToken = jwt.decode(retrievedCookie);

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
  const getProfessionals = async () => {
    try {
      const response = await axios.get(`${url}/allProfessional`, {
        withCredentials: true,
      });
      setAllProfessionals(response.data.allprofessionals);
      setFilteredProfessionals(response.data.allprofessionals);
      setLoading(false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    getProfessionals();
    fetchProfessionalBookMarksOfJob();
  }, []);
  const handleSearch = () => {
    const searchResults = allProfessionals.filter(
      ({ first_name, last_name }) => {
        const fullName = `${first_name?.toLowerCase()} ${last_name?.toLowerCase()}`;
        return fullName.includes(searchText?.toLowerCase().trim());
      }
    );
    setFilteredProfessionals(searchResults);
  };
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    let sortedProfessionals = [...filteredProfessionals];

    if (selectedSortOption === "asc") {
      sortedProfessionals.sort((a, b) => {
        return a.first_name.localeCompare(b.first_name);
      });
    } else if (selectedSortOption === "desc") {
      sortedProfessionals.sort((a, b) => {
        return b.first_name.localeCompare(a.first_name);
      });
    } else if (selectedSortOption === "bookmarked") {
      sortedProfessionals.sort((a, b) => {
        // Check if a is bookmarked and b is not, a should come before b
        if (
          bookmarkdetails.some(
            (bookmark) =>
              bookmark.professional_id === a.professionalDetails?._id
          ) &&
          !bookmarkdetails.some(
            (bookmark) =>
              bookmark.professional_id === b.professionalDetails?._id
          )
        ) {
          return -1;
        }
        // Check if b is bookmarked and a is not, b should come before a
        else if (
          !bookmarkdetails.some(
            (bookmark) =>
              bookmark.professional_id === a.professionalDetails?._id
          ) &&
          bookmarkdetails.some(
            (bookmark) =>
              bookmark.professional_id === b.professionalDetails?._id
          )
        ) {
          return 1;
        }
        // Otherwise, keep the original order
        else {
          return 0;
        }
      });
    } else {
      sortedProfessionals = [...allProfessionals];
    }
    setFilteredProfessionals(sortedProfessionals);
  };
  const BookmarkProfessional = async (pid) => {
    if (!pid) return;
    const data = {
      job_id: jobId,
      professional_id: pid,
    };
    await bookmarkProfessionalForJob(data).then((res) => {
      fetchProfessionalBookMarksOfJob();
    });
  };
  const removeBookmark = async (pid) => {
    const data = {
      jobId: jobId,
      professional_id: pid,
    };
    await removeprofessionalbookmarkForJobDetails(data).then((res) => {
      fetchProfessionalBookMarksOfJob();
    });
  };
  const fetchProfessionalBookMarksOfJob = async () => {
    await bookmarkProfessionalForJobdetails().then((res) => {
      if (res?.status == 200) {
        setbookmarkdetails(res?.data);
      }
    });
  };
  const handleFontAwsome = (pid) => {
    const jobDetails = bookmarkdetails?.find(
      (job) => job.professional_id === pid
    );
    return jobDetails && jobDetails.bookmark === "1" ? (
      <FontAwesomeIcon
        icon={faBookmarksolid}
        onClick={() => removeBookmark(pid)}
      />
    ) : (
      <FontAwesomeIcon
        icon={faBookmark}
        onClick={() => BookmarkProfessional(pid)}
      />
    );
  };
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const { socket } = useSocket()
  const handleClick = async (userdata) => {
    const dataForNotification = {
      rout: "/invitation&bookmark",
      send_by: "client",
      subject: "invite",
      professional_id: userdata._id,
      job_id: jobId,
      email: userdata.avatarDetail[0].email,
      first_name: userdata.first_name,
      last_name: userdata.last_name,
    };
    try {
      const { data } = await axios.post(
        `${url}/invite_professional`,
        {
          job_id: jobId,
          userid: userdata._id,
          invite_status: "0",
          proposal_status: "0",
        },
        {
          withCredentials: true,
        }
      );


      const messageForShow = `You are invited to apply for "${data?.data?.job_title}"`;

      if (data.success) {
        if (data.message === "Professional invited succesfully") {
          // Adjusted to match the received message
          setsuccessmessage("Invite sent");
          setInvitedProfessionals([...invitedProfessionals, userdata._id]);
          const res = await postNotification(dataForNotification)
          socket.emit("update_notification", { login_as: 2, id: userdata._id });

          const data = {
            rout: route,
            send_by: "client",
            subject: "invite",
            professional_id: userdata._id,
            message: messageForShow,
            job_id: jobId,
            status: 0,
          };
          console.log(userdata._id, "data of notification");
          
          socket.emit("new_notification", data);
          socket.emit('Decline Notification',data);
        } else if (
          data.message === "Professional is already hired for this job"
        ) {
          setsuccessinvite(
            "A professional has already been hired for this job."
          );
        } else {
          console.log("Unexpected message from server:", data.message);
        }
      } else {
        console.log("Server returned failure:", data);
      }
    } catch (error) {
      console.error("Error occurred while sending invitation:", error);
    }
  };

  const handleInviteClick = async (userdata) => {
    const jobID = jobId;
    const route = `/findwork/${jobID}`;
    const dataForNofitication = {
      rout: route,
      send_by: "client",
      subject: "invite",
      professional_id: userdata._id,
      job_id: jobId,
      email: data.data.user.email,
      first_name: userdata.first_name,
      last_name: userdata.last_name,
    };
    try {
      const { data } = await axios.post(
        `${url}/invite_professional`,
        {
          job_id: jobId,
          userid: userdata._id,
          invite_status: "0",
          proposal_status: "0",
        },
        {
          withCredentials: true,
        }
      );


      const messageForShow = `You are invited to apply for"${data.data.job_title}"`;
      if (data.success) {
        await postNotification(dataForNofitication).then((res) => {
          const data = {
            rout: route,
            send_by: "client",
            subject: "invite",
            professional_id: userdata._id,
            message: messageForShow,
            job_id: jobId,
            status: 0,
          };
          
          socket.emit("new_notification", data);
          socket.emit("update_notification", { login_as: 2, id: userdata._id });
          if (res.status == 200) {
          }
        });
        if (data.message === "Professional invited succesfully") {
          setsuccessmessage("Invite sent");
          setInvitedProfessionals([...invitedProfessionals, userdata._id]);
        }
      }
    } catch (error) { }

  };

  //*************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredProfessionals?.slice(startIndex, endIndex);
  const showPagination = filteredProfessionals?.length > itemsPerPage;

  //open model
  const handleOpenProfileModel = (val) => {
    setProfileModel(true);
    setSelectedProfessional(val);
  };
  const handleCloseProfileModel = () => {
    setProfileModel(false);
    setSelectedProfessional("");
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {successinvite && (
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
                      {successinvite}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-center gap-5 items-center p-5">
                  <button
                    className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                    onClick={() => setsuccessinvite(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                    onClick={() => setsuccessinvite(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-4 client-main-container-serch">
              <label class="relative block col-span-3 border-borderBlue">
                <input
                  class=" placeholder-text-slate-400 block bg-white w-full border border-borderBlue  rounded-3xl py-4 pr-18 pl-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search for professionals"
                  type="text"
                  name="search"
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ fontStyle: "normal" }}
                />
                <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                  <button
                    type="submit"
                    class="h-full w-30 px-3 flex items-center justify-center border-none text-white rounded-3xl rounded-tl-none"
                    style={{ backgroundColor: "#2884cc" }}
                    onClick={handleSearch}
                  >
                    Submit
                  </button>
                </span>
              </label>
              <div className="col-auto client-contract-dropdown">
                <select
                  className="client-selectmenu"
                  onChange={(e) => handleSortChange(e)}
                >
                  <option value="default">Sort by </option>
                  <option value="asc">A to Z</option>
                  <option value="desc">Z to A</option>
                  <option value="bookmarked">bookmarked</option>
                </select>
              </div>
            </div>
            {filteredProfessionals?.length > 0 ? (
              paginatedData?.map((val, i) => {
                let invitedP = "notInvited";
                val?.jobInviteeIds?.map((professional) => {
                  if (
                    professional.job_id === jobId &&
                    professional.invite_status !== "-1"
                  ) {
                    invitedP = "invited";
                  }
                });

                let totalNetTransactionsAmount = 0;

                if (val.transactions) {
                  val.transactions.forEach((transaction) => {
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

                let jobSucess = 0;
                if (val.activeJobs && val.completedJobs) {
                  const totalJobs =
                    val.activeJobs.length + val.completedJobs.length;
                  const jobSuccessPercentage = Math.floor(
                    (val.completedJobs.length / totalJobs) * 100
                  );
                  jobSucess = jobSuccessPercentage;
                }

                return (
                  <div className="client-contract-show-job-contener" key={i}>
                    <div className="flex justify-between">
                      <div className="flex">
                        <div
                          className="mr-[40px] cursor-pointer"
                          onClick={() => handleOpenProfileModel(val)}
                        >
                          <img
                            className="rounded-full h-[120px] w-[120px]"
                            src={
                              val?.avatarDetail[0]?.avatar
                                ? `${url}/public/uploads/profile_attachments/${val?.avatarDetail[0]?.avatar}`
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
                              className="text-black font-mulish font-[400] text-[21px] leading-7 cursor-pointer"
                              onClick={() => handleOpenProfileModel(val)}
                            >
                              {val?.first_name} {val?.last_name}
                            </p>
                          </div>
                          <h1 className="text-black font-mulish font-[400] text-[21px]">
                            {val?.professionalDetails?.bio_title}
                          </h1>
                          <ul className="flex items-center gap-7 mt-1">
                            <li className="flex items-center gap-2 text-location_clr">
                              <img
                                src="/images/findjob-img/pin.png"
                                alt="location"
                                style={{ height: "fit-content" }}
                              />
                              {val?.country?.name}
                            </li>
                            <li className="bg-active_bg px-1 rounded">
                              {val?.rating || "0.0"}
                            </li>
                            <li className="flex gap-[1px]">
                              {renderStars(val?.rating || 0)}
                            </li>
                          </ul>
                          <div className="flex flex-wrap gap-8 mt-3">
                            <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                              N0
                            </p>
                            <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                              {val.completedJobs?.length || "0"} Jobs Completed
                              on Praiki
                            </p>
                            <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                              {totalNetTransactionsAmount
                                ? `N ${totalNetTransactionsAmount} earned`
                                : "N 0 earned"}
                            </p>

                            <div className="font-regular">
                              <p className="text-[#434343] font-mulish font-[400] text-[14px]">
                                {/* 0% Job Success */}
                                {jobSucess !== null && !isNaN(jobSucess)
                                  ? `${jobSucess}% Job Success`
                                  : "0% Job Success"}
                              </p>
                              <div className="w-full h-3 bg-progress rounded-md overflow-hidden">
                                <div
                                  className="h-3 bg-blue"
                                  style={{
                                    width: `${jobSucess !== null && !isNaN(jobSucess)
                                      ? jobSucess
                                      : 0
                                      }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <ul className="flex flex-wrap items-center justify-start gap-2 text-xs font-medium my-2 ">
                            {/* {val?.skillData?.map((tags, tagsIndex) => (
                            <li
                              className="bg-sidbarseleclistcolor text-strongText p-2 rounded-lg shadow shrink-0"
                              key={tagsIndex}
                            >
                              {tags?.skill_id}
                            </li>
                          ))} */}
                            {val?.skillData?.map((tags, tagsIndex) =>
                              tags.skill_id.map((skill, skillIndex) => (
                                <li
                                  className="bg-sidbarseleclistcolor text-strongText p-2 rounded-lg shadow shrink-0"
                                  key={`${tagsIndex}_${skillIndex}`} // Use a unique key
                                >
                                  {skill}
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="">
                        <span>
                          {handleFontAwsome(val?.professionalDetails?._id)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {jobType == "draft" ? (
                        <>
                          <button
                            onClick={() => setShowPopup(true)}
                            className="add-milestone"
                          >
                            Invite
                          </button>
                        </>
                      ) : (
                        <>
                          {invitedP === "invited" ? (
                            <p className="text-success text-lg mt-1">
                              Already Invited
                            </p>
                          ) : invitedProfessionals.includes(val._id) ? (
                            <p className="text-success text-lg mt-1">
                              {successmessage}
                            </p>
                          ) : (
                            <button
                              onClick={() => handleClick(val)}
                              className="add-milestone"
                            >
                              Invite
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="my-5 p-5">No data found</p>
            )}
            {profileModel && (
              <div className="fixed grid content-center top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-50">
                <div class="max-w-sm mx-auto relative bg-white rounded-[8px] shadow-lg space-y-2 sm:items-center sm:space-y-0 sm:space-x-6">
                  <div
                    className="absolute -right-2 bg-[#1068AD] p-[2px] -top-2 text-white rounded-full cursor-pointer"
                    onClick={handleCloseProfileModel}
                  >
                    {cancelIcon}
                  </div>
                  <div className="flex justify-center items-center !m-0 bg-gray bg-opacity-10 h-[120px]">
                    <img
                      className="rounded-full h-[100px] w-[100px] absolute bottom-[165px] border-[5px] border-white"
                      src={
                        selectedPofessional?.avatarDetail[0]?.avatar
                          ? `${url}/public/uploads/profile_attachments/${selectedPofessional?.avatarDetail[0]?.avatar}`
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
                  <div class="text-center space-y-2 sm:text-left !m-0 py-8 px-14">
                    <div class="space-y-0.5 text-center mt-10">
                      <p className="text-black font-mulish font-[400] text-[21px] leading-7 mb-1">
                        {selectedPofessional?.first_name}{" "}
                        {selectedPofessional?.last_name}
                      </p>
                      <ul className="flex items-center justify-between mt-1 gap-2">
                        <li className="flex items-center gap-2 text-location_clr">
                          <img
                            src="/images/findjob-img/pin.png"
                            alt="location"
                            style={{ height: "fit-content" }}
                          />
                          {selectedPofessional?.country?.name}
                        </li>
                        <li className="bg-active_bg px-1 rounded mt-1">
                          {selectedPofessional?.rating || "0.0"}
                        </li>
                        <li className="flex gap-[1px] mt-1 mb-1">
                          {renderStars(selectedPofessional?.rating || 0)}
                        </li>
                      </ul>
                      <ul className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium my-2 ">
                        {selectedPofessional?.skillData?.map(
                          (tags, tagsIndex) => (
                            <li
                              className="bg-sidbarseleclistcolor text-strongText p-2 rounded-lg shadow shrink-0 mt-2"
                              key={tagsIndex}
                            >
                              {tags?.skill_id}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showPagination && (
              <div className="flex justify-end mt-3">
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={Math.ceil(
                    filteredProfessionals?.length / itemsPerPage
                  )}
                  page={currentPage}
                  onChange={handleChange}
                  sx={styles.pagination}
                />
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
                      This project is a draft, you can not invite professional.
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </ErrorBoundary>
  );
}
