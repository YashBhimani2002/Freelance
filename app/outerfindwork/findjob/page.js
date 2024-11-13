"use client";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import {  withOutFindJob } from "@/app/api/api";
import { Mulish } from "next/font/google";

import { faStar as faStarsolid } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import Loader from "@/components/common/Loader";

const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

const FindJob= (props) => {
  const { selectedFilter, setSelectedFilter, sidebarStatus } = props;
  // console.log("*****selectedFilter******", selectedFilter);
  const userType = '"Professional"'; // Define the user type
  const encodedUserType = encodeURIComponent(userType);
  const [sortValue, setSortValue] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [findJobData, setFindJobData] = useState([]);
  // console.log("*****findJobData******", findJobData);
  const [filteredData, setFilteredData] = useState([]);

  const styles = {
    pagination: {
      marginTop: "20px",
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
  const fetchFindJobData = async () => {
    try {
      const response = await withOutFindJob();
      if (response?.status == 200) {
        const isEmptyFilter =
          selectedFilter.category.length === 0 &&
          selectedFilter.experience_level.length === 0 &&
          selectedFilter.budget.length === 0 &&
          selectedFilter.rating.length === 0;
        if (sortValue == "default" && searchQuery == "" && isEmptyFilter) {
          return response.data.data;
        } else {
          return response.data.data;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { data, error, isLoading, isValidating } = useSWR(
    "/api/withOutLoginFindJob",
    (url) => fetchFindJobData(),
    {
      refreshInterval: 180000, // Refresh data every 180 seconds
      dedupingInterval: 180000, // Cache data for 60 seconds
      revalidateOnFocus: true,
    }
  );
  useEffect(() => {
    // fetchFindJobData();
    const isEmptyFilter =
      selectedFilter.category.length === 0 &&
      selectedFilter.experience_level.length === 0 &&
      selectedFilter.budget.length === 0 &&
      selectedFilter.rating.length === 0;
    if (sortValue == "default" && searchQuery == "" && isEmptyFilter && data) {
      setLoading(true);
      // setFindJobData(data.reverse());
      setFindJobData(data.reverse());
      setLoading(false);
    }
  }, [data]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);
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
  const handleChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  };
  const sortJobData = (data, option) => {
    if (option === "asc") {
      return data.sort((a, b) =>
        a.job_title.localeCompare(b.job_title)
      );
    } else if (option === "desc") {
      return data.sort((a, b) =>
        b.job_title.localeCompare(a.job_title)
      );
    } else {
      // Return original data if the option is 'default'
      return data;
    }
  };
  const handleSortChange = async (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "default") {
      setFindJobData(data);
    } else {
      // Apply sorting based on the selected option
      const sortedData = sortJobData(findJobData, selectedOption);
      setFindJobData([...sortedData]); // Make sure to create a new array to trigger a re-render
    }

    setSortValue(selectedOption);
  };
  const filterJobs = (jobs, query) => {
    return jobs.filter((job) =>
      job.job_title.toLowerCase().includes(query.toLowerCase())
    );
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = filterJobs(data, query);
    setFindJobData(filteredData);
  };

  const combinedFilters = [
    ...selectedFilter.category,
    ...selectedFilter.experience_level,
    ...selectedFilter.budget,
    ...selectedFilter.rating,
  ];

  useEffect(() => {
    if (findJobData.length > 0) {
      const mapExperienceLevel = (level) => {
        switch (level.toLowerCase()) {
          case "intermediate":
            return "Intermediate";
          case "fresher":
            return "Beginner";
          case "expert":
            return "Expert";
          default:
            return "";
        }
      };

      const mapBudgetType = (type) => {
        switch (type.toLowerCase()) {
          case "fixed":
            return "Fixed Price";
          case "range":
            return "Hourly";
          default:
            return "";
        }
      };

      const mapRating = (rating) => {
        const ratingMap = {
          1: "1 STAR",
          2: "2 STAR",
          3: "3 STAR",
          4: "4 STAR",
          5: "5 STAR",
        };
        return ratingMap[rating] || "";
      };

      const applyFilters = (data) => {
        return data.filter((job) => {
          const mappedExperienceLevel = mapExperienceLevel(
            job.experience_level
          );
          const mappedBudgetType = mapBudgetType(job.budget_type);
          const mappedRating = mapRating(job.review);

          return (
            (selectedFilter.category.length === 0 ||
              selectedFilter.category.includes(job.category_name)) &&
            (selectedFilter.experience_level.length === 0 ||
              selectedFilter.experience_level.includes(
                mappedExperienceLevel
              )) &&
            (selectedFilter.budget.length === 0 ||
              selectedFilter.budget.includes(mappedBudgetType)) &&
            (selectedFilter.rating.length === 0 ||
              selectedFilter.rating.includes(mappedRating))
          );
        });
      };

      setFilteredData(applyFilters(findJobData));
      setCurrentPage(1);
    }
  }, [selectedFilter, findJobData]);

  if (error) return <div>Error loading data...</div>;
  if (loading)
    return (
      <div className="flex flex-1 flex-col p-3 lg:p-10 gap-3 items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className={`${sidebarStatus ? 'hidden' : 'flex'} scrollbar-custom overflow-y-scroll h-auto md:flex flex-1 flex-col p-3 pt-[4.3rem] lg:p-10 lg:pt-[4.3rem] gap-3`}>
      <div>
        <div>
          <input
            className="border-[1px] border-[#A6B7F4] rounded-[20px] py-3 px-2 w-full "
            placeholder="Search for jobs"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap">
        <div className="flex flex-row flex-1 flex-wrap gap-1">
          {/* {selectedFilter.length != 0 &&
            selectedFilter.map((item, index) => (
              <div
                className="flex flex-row gap-2 hover:text-[#1068ad] items-center bg-[#e9f1ff] py-[0.2rem] px-2 cursor-pointer h-6 border rounded-[6px] border-transparent"
                onClick={() =>
                  setSelectedFilter(() =>
                    selectedFilter.filter((mapItem) => mapItem != item)
                  )
                }
              >
                <p className="text-[12px]" key={index}>
                  {item}
                </p>
                <div>
                  <FontAwesomeIcon icon={faXmark} fontSize="12px" />
                </div>
              </div>
            ))} */}
          {combinedFilters.length > 0 &&
            combinedFilters.map((item, index) => (
              <div
                key={index} // Note: Use unique IDs if possible instead of indexes
                className="flex flex-row gap-2 hover:text-[#1068ad] items-center bg-[#e9f1ff] py-[0.2rem] px-2 cursor-pointer h-6 border rounded-[6px] border-transparent"
                onClick={() =>
                  setSelectedFilter((prev) => ({
                    ...prev,
                    category: prev.category.filter((val) => val !== item),
                    experience_level: prev.experience_level.filter(
                      (val) => val !== item
                    ),
                    budget: prev.budget.filter((val) => val !== item),
                    rating: prev.rating.filter((val) => val !== item),
                  }))
                }
              >
                <p className="text-[12px]">{item}</p>
                <div>
                  <FontAwesomeIcon icon={faXmark} fontSize="12px" />
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-row items-center justify-end flex-1 gap-8">
          <button
            className="text-[14px] hover:text-[#1068ad]"
            onClick={() => {
              setSelectedFilter({
                category: [],
                experience_level: [],
                budget: [],
                rating: [],
              });
              setSearchQuery("");
              setSortValue("default");
              setFindJobData(data);
            }}
          >
            Clear Filters
          </button>
          <Select
            placeholder="Sort by"
            value={sortValue}
            onChange={handleSortChange}
            className="w-30 padding_custom"
          >
            <MenuItem value="default">Sort by</MenuItem>
            <MenuItem value="asc">A To Z</MenuItem>
            <MenuItem value="desc">Z To A</MenuItem>
          </Select>
        </div>
      </div>
      <div className="flex items-center flex-col gap-[30px] py-5">
        {paginatedData && paginatedData.length > 0 ? (
          paginatedData.map((value, index) => {
            let job = "notApplied";
            return (
              <div key={index} className="show-job-container w-full">
                <div className={`header-like-status ${mulish600.className}`}>
                  {value.selefeCreate == 0 ? (
                    <>
                      <p>{value.job_title}</p>
                    </>
                  ) : (
                    <>
                      <p>{value.job_title}</p>
                    </>
                  )}
                  <Link className="md:ms-end ms-0" href="/login">
                    {bookMark}
                  </Link>
                </div>

                {value.budget_type == "Fixed" ? (
                  <div className="reange-budger">
                    <div>
                      <span
                        className={`${mulish700.className} text-[#434343] text-[14px] mr-[14px]`}
                      >
                        Fixed Price
                      </span>
                      <span
                        className={`${mulish400.className} text-[#434343] text-[14px] mr-[14px]`}
                      >
                        <span
                          className={`${mulish700.className} text-[#434343] text-[14px] `}
                        >
                          Budget
                        </span>{" "}
                        : N{value.budget_to}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="reange-budger">
                    <div>
                      <span
                        className={`${mulish700.className} text-[#434343] text-[14px] mr-[14px]`}
                      >
                        Range
                      </span>
                      <span
                        className={`${mulish400.className} text-[#434343] text-[14px] mr-[14px]`}
                      >
                        <span
                          className={`${mulish700.className} text-[#434343] text-[14px] `}
                        >
                          Budget
                        </span>{" "}
                        : N{value.budget_from}-N{value.budget_to}
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className={`${mulish400.className} text-[#434343] text-[15px] mt-[10px]`}
                >
                  {value.job_description}
                </div>

                <div className="flex gap-1 mt-3 " style={{ flexWrap: "wrap" }}>
                  {value.skills?.map((value) => {
                    if (value) {
                      return (
                        <div key={value} className="skill-contenyt">
                          {value}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="job-container-iconbox">
                  <div className=" flex mb-3 sm:mb-0 mt-3 flex-wrap items-center gap-4">
                    <div
                      className="mr-[24px]"
                      style={{ display: "flex", height: "fit-content" }}
                    >
                      <img
                        src="/images/findjob-img/userimg.png"
                        alt="usericon"
                        className="pe-2"
                        style={{
                          height: "fit-content",
                          alignSelf: "center",
                        }}
                      />
                      {renderStars(value.review)}
                    </div>
                    <div className="mr-[24px] flex items-center gap-2">
                      <img
                        src="/images/findjob-img/pin.png"
                        alt="usericon"
                        style={{ height: "fit-content" }}
                      />
                      <p
                        className={`${mulish400.className} text-[#434343] text-[14px]`}
                      >
                        {value.user_id?.country?.name || "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/images/findjob-img/clock.svg" alt="usericon" />
                      <p
                        className={`${mulish400.className} text-[#434343] text-[14px]`}
                      >
                        Posted {formatTimeAgo(value.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-end">
                    <Link
                      className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-[6px] py-2 px-4 leading-normal no-underline bg-btn_bg text-white"
                      href={`/signup?userType=${encodedUserType}`}
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 text-[16px]">
            No data found
          </div>
        )}
        <div className="flex justify-end w-[88%]">
          {filteredData?.length > 5 && (
            <Pagination
              variant="outlined"
              shape="rounded"
              color="primary"
              count={Math.ceil(filteredData?.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChange}
              sx={styles.pagination}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default FindJob;

const bookMark = (
  <svg
    width="24"
    height="30"
    viewBox="0 0 24 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_5346_8819)">
      <path
        d="M14.9689 9.33176V25.0391L10.9014 22.8471L10.1381 22.4354L9.37483 22.8471L5.30731 25.0391V9.33176H14.9689ZM18.8335 2.06543H9.16227C8.0995 2.06543 7.23962 3.15538 7.23962 4.48754H16.9012C17.964 4.48754 18.8335 5.57749 18.8335 6.90965V22.6534L20.7658 23.8644V4.48754C20.7658 3.15538 19.8963 2.06543 18.8335 2.06543ZM14.9689 6.90965H5.30731C4.24454 6.90965 3.375 7.9996 3.375 9.33176V28.7086L10.1381 25.0755L16.9012 28.7086V9.33176C16.9012 7.9996 16.0316 6.90965 14.9689 6.90965Z"
        fill="#323232"
      />
    </g>
    <defs>
      <clipPath id="clip0_5346_8819">
        <rect
          width="23.1877"
          height="29.0653"
          fill="white"
          transform="translate(0.476562 0.854492)"
        />
      </clipPath>
    </defs>
  </svg>
);
