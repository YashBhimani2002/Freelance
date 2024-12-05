"use client";
import React, { useState, useEffect } from "react";
import "./stylebookmark.css";
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
import Link from "next/link";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

import {
  bookmarkProfessionalForJob,
  bookmarkProfessionalForJobdetails,
  removeprofessionalbookmarkForJobDetails,
} from "../api/api";
import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";

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
function Bookmark() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [bookmarkedProfessionals, setBookmarkedProfessionals] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [allProfessionals, setAllProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [bookmarkdetails, setbookmarkdetails] = useState([]);
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
  };
  const handleFormSubmit = () => {
    setSearchInput(query);
  };
  const filterProfessionals = () => {
    let filtered = [...bookmarkedProfessionals];

    if (searchInput !== "") {
      const inputValueLower = searchInput?.toLowerCase();
      filtered = filtered.filter(
        (professional) =>
          professional?.first_name.toLowerCase().includes(inputValueLower) ||
          professional?.last_name.toLowerCase().includes(inputValueLower)
      );
    }
    if (sortOption === "1") {
      filtered.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sortOption === "2") {
      filtered.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }
    setFilteredProfessionals(filtered);
  };
  useEffect(() => {
    filterProfessionals();
  }, [searchInput, sortOption]);

  const getProfessionals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/allProfessional`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        setAllProfessionals(response?.data?.allprofessionals);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const BookmarkProfessional = async (pid) => {
    if (!pid) return;
    const data = {
      professional_id: pid,
    };
    await bookmarkProfessionalForJob(data).then((res) => {
      fetchProfessionalBookMarksOfJob();
    });
  };
  const removeBookmark = async (pid) => {
    const data = {
      professional_id: pid,
    };
    await removeprofessionalbookmarkForJobDetails(data).then((res) => {
      fetchProfessionalBookMarksOfJob();
    });
  };
  const fetchProfessionalBookMarksOfJob = async () => {
    await bookmarkProfessionalForJobdetails().then((res) => {
      // setLoading(true);
      if (res?.status == 200) {
        setbookmarkdetails(res?.data);
        const bookmarkedProfessionalsIds = res?.data?.map(
          (bookmark) => bookmark?.professional_id
        );
        const filteredbookmarkedProfessionals = allProfessionals?.filter(
          (professional) =>
            bookmarkedProfessionalsIds?.includes(
              professional?.professionalDetails?._id
            )
        );
        setBookmarkedProfessionals(filteredbookmarkedProfessionals);
        setFilteredProfessionals(filteredbookmarkedProfessionals);
        // setLoading(false);
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
  useEffect(() => {
    getProfessionals();
  }, []);
  useEffect(() => {
    fetchProfessionalBookMarksOfJob();
  }, [allProfessionals]);

  //*************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Function to handle page change
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  // Pagination logic to slice data array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredProfessionals?.slice(startIndex, endIndex);
  const showPagination = filteredProfessionals?.length > itemsPerPage;
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
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        <div className="md:pr-[70px]   md:pl-[70px] px-[10px]">
          {loading == true ? (
            <Loader />
          ) : (
            <div>
              <h2 className="dishead text-bl pb-5 font-mulish font-light sm:text-3xl text-2xl ">
                <Tooltip
                  title="Bookmarked Professionals"
                  placement="right"
                  arrow
                  componentsProps={tooltipClass}
                >
                  Bookmarked Professionals
                </Tooltip>
              </h2>
              <div className="mt-0 mb-[35px] main-container-serch flex flex-wrap ">
                <div className=" mycontract-search w-4/5">
                  <input
                    placeholder="Search for professional"
                    className="inputtag"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="submitbtn" onClick={handleFormSubmit}>
                    Submit
                  </button>
                </div>
                <div className=" mycontract-dropdown w-1/5 md:mt-3 xl:mt-0">
                  <select
                    className="selectmenu"
                    onChange={handleSortChange}
                    value={sortOption}
                  >
                    <option value="" disabled={sortOption === ""}>
                      Sort by{" "}
                    </option>
                    <option value="1">A to Z</option>
                    <option value="2">Z to A</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 mt-4">
                {filteredProfessionals && filteredProfessionals?.length > 0 ? (
                  paginatedData?.map((data, index) => {
                    let totalNetTransactionsAmount = 0;

                    if (data.transactions) {
                      data.transactions.forEach((transaction) => {
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
                    let jobSucess = 0;
                    if (data.activeJobs && data.completedJobs) {
                      const totalJobs =
                        data.activeJobs.length + data.completedJobs.length;
                      const jobSuccessPercentage = Math.floor(
                        (data.completedJobs.length / totalJobs) * 100
                      );
                      jobSucess = jobSuccessPercentage;
                    }
                    return (
                      <>
                        <div
                          key={index}
                          className="discover-box  p-6 border border-solid border-box_border box-border rounded-lg mb-8"
                        >
                          <div className=" flex flex-col sm:flex-row gap-5 w-full">
                            <div className="img  w-1/5 ">
                              <img
                                className="rounded-full h-[120px] w-[120px]"
                                src={
                                  data?.avatarDetail[0]?.avatar
                                    ? `${url}/public/uploads/profile_attachments/${data?.avatarDetail[0]?.avatar}`
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
                            <div className="img-details  w-4/5 ">
                              <div className="dis-box-info relative">
                                <div className="bookmark_job absolute top-1 right-0 text-20 text-black">
                                  <div className="bookmark_job absolute top-1 right-0 text-20 text-black ">
                                    {handleFontAwsome(
                                      data?.professionalDetails?._id
                                    )}
                                  </div>
                                </div>

                                <div className="">
                                  <h5 className=" font-semibold font-mulish text-[20px] text-darkbc mb-1.5">
                                    {data.first_name} {data.last_name}
                                  </h5>
                                </div>
                                <p className="text-xl font-mulish font-normal text-post_clr mb-2">
                                  {data?.professionalDetails?.bio_title}
                                </p>
                                <ul className="flex items-center gap-7">
                                  {data?.country?.name && (
                                    <li className="flex items-center gap-2 text-location_clr">
                                      <img
                                        src="/images/findjob-img/pin.png"
                                        alt="usericon"
                                        style={{ height: "fit-content" }}
                                      />
                                      {data?.country?.name}
                                    </li>
                                  )}
                                  <li className="bg-active_bg px-1 rounded">
                                    {data?.rating}
                                  </li>
                                  <li className="flex gap-[1px]">
                                    {renderStars(data?.rating)}
                                  </li>
                                </ul>
                              </div>
                              <div className="grid grid-cols-1 mt-3">
                                <div className="font-mulish text-xs text-box_clr grid grid-cols-2 gap-3 sm:flex items-center sm:gap-7">
                                  <div className="font-regular">
                                    Bid Amount:{" "}
                                    <span className="font-bold"> N0</span>
                                  </div>
                                  <div className="font-regular">
                                    <span className="font-bold">
                                      {data?.completedJobs?.length || "0"}
                                    </span>{" "}
                                    Jobs Completed on Freelance
                                  </div>
                                  <div className="font-regular">
                                    <span className="font-bold">
                                      N{" "}
                                      {totalNetTransactionsAmount
                                        ? totalNetTransactionsAmount
                                        : "0"}
                                    </span>{" "}
                                    earned
                                  </div>
                                  <div className="font-regular mt-1">
                                    <span className="font-bold">
                                      {jobSucess !== null && !isNaN(jobSucess)
                                        ? `${jobSucess}%`
                                        : "0%"}
                                    </span>{" "}
                                    Job Success
                                    <div className="w-full h-1 bg-progress rounded-md overflow-hidden">
                                      <div
                                        className="h-1 bg-[#4299E1]"
                                        style={{
                                          width: `${
                                            jobSucess !== null &&
                                            !isNaN(jobSucess)
                                              ? jobSucess
                                              : 0
                                          }%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="font-regular w-10/12 mt-3">
                                {data?.professionalDetails?.bio_brief}
                              </div>
                            </div>
                          </div>

                          <div className="flex mt-5  justify-end">
                            <Link
                              href={{
                                pathname: "/message",
                                query: { id: data?._id },
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
                      </>
                    );
                  })
                ) : (
                  <div className=" text-black ms-3 text-center">No data found</div>
                )}
              </div>
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
            </div>
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Bookmark;
