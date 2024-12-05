"use client";
import React, { useState, useEffect } from "react";
import "./stylehiredpage.css";
import {
  hiredProfessionals,
  bookmarkProfessionalForJob,
  bookmarkProfessionalForJobdetails,
  removeprofessionalbookmarkForJobDetails,
} from "../api/api";
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
import Pagination from "@mui/material/Pagination";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import useSWR from "swr";

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

const tickIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20C4.47967 19.994 0.00606237 15.5204 0 10V9.80002C0.109931 4.30455 4.63459 -0.0720257 10.1307 0.000898217C15.6268 0.0738221 20.0337 4.5689 19.9978 10.0654C19.9619 15.5618 15.4966 19.9989 10 20ZM5.41 9.59002L4 11L8 15L16 7.00002L14.59 5.58002L8 12.17L5.41 9.59002Z"
      fill="#2E3A59"
    />
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

function Hire() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [bookmarkdetails, setbookmarkdetails] = useState([]);
  const [allProfessionals, setAllProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const fetchData = async () => {
    try {
      const response = await hiredProfessionals();
      if (response?.status == 200) {
        if (response?.data?.success === true) {
          if (sortOption == "" && query == "") {
            setLoading(false);
            // setAllProfessionals(response?.data?.hiredProfessionals);
            // setFilteredProfessionals(response?.data?.hiredProfessionals);
            return response?.data;
          } else {
            return response?.data;
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { data, error, isLoading, isValidating } = useSWR(
    "/api/fetchData",
    fetchData,
    {
      refreshInterval: 60000, // Refresh data every 60 seconds
      dedupingInterval: 60000, // Cache data for 60 seconds
    }
  );
  useEffect(() => {
    if (sortOption == "" && query == "" && data) {
      setAllProfessionals(data.hiredProfessionals);
      setFilteredProfessionals(data.hiredProfessionals);
      setLoading(false);
    }
  }, [data]);
  useEffect(() => {
    // fetchData();
    fetchProfessionalBookMarksOfJob();
  }, []);

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    if(selectedSortOption=="0"){
      setAllProfessionals(data.hiredProfessionals);
      setFilteredProfessionals(data.hiredProfessionals);
    }
      setSortOption(selectedSortOption);
  };
  const handleFormSubmit = () => {
    if(query==""){
      setAllProfessionals(data.hiredProfessionals);
      setFilteredProfessionals(data.hiredProfessionals);
    }
    setSearchInput(query);
  };
  const filterProfessionals = () => {
    let filtered = [...allProfessionals];
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
    if(searchInput != "" || sortOption !== ""){
    filterProfessionals();
    }
  }, [searchInput, sortOption]);
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
      if (res?.status == 200) {
        setbookmarkdetails(res?.data);
      }
    });
  };
  const handleFontAwsome = (pid) => {
    const jobDetails = bookmarkdetails?.find(
      (item) => item.professional_id === pid
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
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h2 className="dishead text-bl pb-5 font-mulish font-medium sm:text-3xl text-[21px] ">
                <Tooltip
                  title="Hired Professionals"
                  placement="right"
                  arrow
                  componentsProps={tooltipClass}
                >
                  Hired Professionals
                </Tooltip>
              </h2>
              <div className="mt-0 mb-[35px] main-container-serch flex flex-wrap">
                <div className=" mycontract-search w-4/5 relative">
                  <input
                    placeholder="Search for Professional"
                    className="inputtag"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    className="submitbtn absolute"
                    onClick={handleFormSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div className=" mycontract-dropdown w-1/5 md:mt-3 xl:mt-0">
                  <select
                    className="selectmenuUpdated rounded-xl"
                    onChange={handleSortChange}
                    value={sortOption}
                  >
                    <option value="0">Sort by </option>
                    <option value="1">A to Z</option>
                    <option value="2">Z to A</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                {filteredProfessionals?.length > 0 ? (
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
                          className="discover-box p-6 border border-solid border-box_border box-border rounded-lg mb-8"
                          key={index}
                        >
                          <div className="flex flex-col sm:flex-row gap-5">
                            <div className="img w-auto">
                              <img
                                className="rounded-full h-[122px] w-[150px] "
                                src={
                                  data?.avatar
                                    ? `${url}/public/uploads/profile_attachments/${data?.avatar}`
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
                            <div className="img-details w-full">
                              <div className="dis-box-info relative">
                                <div className="bookmark_job absolute top-1 right-0 text-20 text-black">
                                  {handleFontAwsome(
                                    data?.professionalDetails?._id
                                  )}
                                </div>

                                <div className="flex items-center gap-3">
                                  <h5 className="font-semibold font-mulish text-[19px] text-darkbc">
                                    {data?.first_name} {data?.last_name}
                                  </h5>
                                  <p>{tickIcon}</p>
                                </div>

                                <p className="text-xl font-mulish font-normal text-post_clr mb-2">
                                  {data?.professionalDetails?.bio_title}
                                </p>
                                <ul className="flex justify-between sm:justify-normal items-center gap-7">
                                  {data?.country?.name && (
                                    <li className="flex items-center gap-2 text-location_clr w-30">
                                      <img
                                        alt="pin"
                                        src="/images/findjob-img/pin.png"
                                        style={{ height: "fit-content" }}
                                      />
                                      {data?.country?.name}
                                    </li>
                                  )}
                                  <div className="flex items-center gap-5 sm:gap-3">
                                    <li className="bg-active_bg px-1 rounded">
                                      {data?.rating}
                                    </li>
                                    <li className="flex gap-[1px]">
                                      {renderStars(data?.rating)}
                                    </li>
                                  </div>
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
                                <div className="flex flex-wrap w-full mt-3">
                                  <div className="lg:w-full xl:w-4/5 sm:pr-8 pr-0 font-Inter font-regular text-sm text-radiolabel">
                                    {data?.professionalDetails?.bio_brief}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className=" text-black text-center ms-3">No data found</div>
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

export default Hire;
