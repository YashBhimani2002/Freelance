"use client";
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import UserrightIcon from "../../public/images/findjob-img/userimg.png";
import {
  MyApplication,
  bookmark,
  findJob,
  getCategories,
  jobinvIteesDetails,
  removejobinvitesen,
  viewProfile,
} from "../../app/api/api";
import RatingImage from "../../public/images/findjob-img/rating.svg";
import Pin from "../../public/images/findjob-img/pin.png";
import Clock from "../../public/images/findjob-img/clock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Tooltip } from "@mui/material";
import {
  faBookmark,
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarksolid,
  faStar as faStarsolid,
} from "@fortawesome/free-solid-svg-icons";
import { Provider, useSelector } from "react-redux";
import Link from "next/link";
import Jobmodal from "../../app/jobModel/page";
import Pagination from "@mui/material/Pagination";
import SubLoader from "../../components/common/SubLoader";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import Datepicker from "react-tailwindcss-datepicker";
// import { useQuery } from "react-query";
import useSWR from 'swr';
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

import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Loader from "@/components/common/Loader";
import { ArrowBackIos } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });

const FindJob = () => {
  const [loading, setLoading] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [appliedSuccessfully, setAppliedSuccessfully] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [jobId, setJobId] = useState("");
  const [userData, setUserData] = useState("");
  const [validationPopup, setValidationPopup] = useState(false);
  const [subloader, setSubLoader] = useState(false);

  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleapplyclick = (value) => {
    setJobId(value._id);
    setOpenModal(true);
    setJobData(value);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubLoader = () => {
    setSubLoader(true);
  };

  const handleappliedSuccessfully = () => {
    setAppliedSuccessfully(true);
    getmyapplication();
    setTimeout(() => {
      setAppliedSuccessfully(false);
    }, 5000);
  };

  useEffect(() => {
    const storedFullName = sessionStorage.getItem("fullName");

    if (storedFullName) {
      setFullName(storedFullName);

      // Clear the full name after 4 seconds
      setTimeout(() => {
        sessionStorage.removeItem("fullName");
        setFullName("");
      }, 4000);
    }
  }, []);
  const handleClose = () => {
    setFullName("");
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      setLoadingUserData(true);
      const response = await viewProfile();
      if (response?.data?.user) {
        setUserData(response.data.user);
        setLoading(false);
        setLoadingUserData(false);
      } else {
        console.error("Invalid response or missing user data.");
        setLoading(false);
        setLoadingUserData(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleValidation = () => {
    window.location.href = "/profile/editprofile";
  };
  const [categories, setCategories] = useState([]);
  const [findJobData, setfindJobData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [JobinvIteesDetails, setJobinvIteesDetails] = useState([]);
  const [appliedApplicationJobId, setAppliedApplicationJobId] = useState(null);
  const [jobData, setJobData] = useState();

  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getmyapplication();
    fetchjobinvitess();
    // fetchFindJobData();
    fetchData();
  }, [userData]);

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

  const fetchjobinvitess = async () => {
    try {
      const response = await jobinvIteesDetails();
      if (response?.status === 200) {
        setJobinvIteesDetails(response?.data);
      } else {
        console.error("Failed to fetch job invitees details");
      }
    } catch (error) {
      console.error("Error fetching job invitees details:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await getCategories();
      // Assuming the response data is an array of items
      if (response) {
        if (response.status == 200) {
          setCategories(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const {
  //   isLoading,
  //   error,
  //   data,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["fetchFindJobData"],
  //   queryFn: () => fetchFindJobData(),
  //   staleTime: 10000,
  // });

  const fetchFindJobData = async () => {
    try {
      const response = await findJob();
      if (response?.status == 200) {
        if (selectedSortOption == 'default' && searchQuery == "" && selectedFilters.category == '' && selectedFilters.date === "" && selectedFilters.budgetType == '' && selectedFilters.experienceLevel == "Experience") {
          // setfindJobData(response.data.data.reverse());
          // setLoading(false);
          return response.data.data;
        } else {
          return response.data.data;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { data, error, isLoading, isValidating } = useSWR('/api/findjob', (url) => fetchFindJobData(), {
    refreshInterval: 180000, // Refresh data every 60 seconds
    dedupingInterval: 180000, // Cache data for 60 seconds
    revalidateOnFocus: true,
  });
  useEffect(()=>{
    if (selectedSortOption == 'default' && searchQuery == "" && selectedFilters.category == '' && selectedFilters.date === "" && selectedFilters.budgetType == '' && selectedFilters.experienceLevel == "Experience" && data) {
      setfindJobData(data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ));
      setLoading(false);
    }
  },[data])
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

  //***************Filtering Data***************
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [selectedExperienceLevel, setSelectedExperienceLevel] =
    useState("Experience");
  const [selectedBudgetType, setSelectedBudgetType] = useState("");

  //***************Search Filtering based on Title name***************
  const filterJobs = (jobs, query) => {
    return jobs.filter((job) =>
      job.job_title.toLowerCase().includes(query.toLowerCase())
    );
  };

  //If SerachBar is empty then display all the data
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    (async () => {
      try {
        let response;
        if (query.trim() === "") {
          // If search query is not empty, fetch job data and apply filter
          response = await findJob();

          if (response?.status == 200) {
            const newData = response.data.data;
            const filteredData = filterJobs(newData, query);
            setfindJobData(filteredData);
          }
        }
      } catch (error) {
        console.error("Error fetching and filtering data:", error);
      }
    })();
  };

  //On Click of Data Will be Filtered based on Serach bar inputs
  const handleSearchSubmit = () => {
    (async () => {
      try {
        // const response = await findJob(); // Fetch job data
        // if (response?.status == 200) {
        //   const newData = response.data.data;
        const filteredData = filterJobs(data, searchQuery);
        setfindJobData(filteredData);
        // }
      } catch (error) {
        console.error("Error fetching and filtering data:", error);
      }
    })();
  };

  //***************Sort By Filtering Asc To Desc***************

  // Function to handle sorting when the dropdown changes
  const handleSortChange = async (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "default") {
      try {
        // const response = await findJob();
        // if (response?.status == 200) {
        setfindJobData(data);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // Apply sorting based on the selected option
      const sortedData = sortJobData(findJobData, selectedOption);
      setfindJobData([...sortedData]); // Make sure to create a new array to trigger a re-render
    }

    setSelectedSortOption(selectedOption);
  };

  // Function to sort job data based on the selected option
  const sortJobData = (data, option) => {
    if (option === "asc") {
      return data.sort((a, b) => a.job_title.localeCompare(b.job_title));
    } else if (option === "desc") {
      return data.sort((a, b) => b.job_title.localeCompare(a.job_title));
    } else {
      // Return original data if the option is 'default'
      return data;
    }
  };

  //***************Filtering***************
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    experienceLevel: "Experience",
    budgetType: "",
    date: ''
  });

  // Function to filter jobs based on all selected filters
  const filterJobsByFilters = (jobs, filters) => {
    return jobs.filter((job) => {
      // Apply filtering based on each filter
      const categoryFilter =
        filters.category === "" ||
        categories
          .find((category) => category._id === job.job_type)
          ?.name.toLowerCase() === filters.category.toLowerCase();

      const experienceLevelFilter =
        filters.experienceLevel === "Experience" ||
        (job.experience_level &&
          job.experience_level.toLowerCase() ===
          filters.experienceLevel.toLowerCase());

      const budgetTypeFilter =
        filters.budgetType === "" ||
        job.budget_type.toLowerCase() === filters.budgetType.toLowerCase();

      // Combine filters using logical AND
      return categoryFilter && experienceLevelFilter && budgetTypeFilter;
    });
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };
  // Updated function to handle changes for all filters
  const handleFilterChange = async (filterType, e) => {
    const filterValue =
      filterType == "date"
        ? `${formatDate(value.startDate)} ~ ${formatDate(value.endDate)}`
        : e.target.value;

    try {
      // const response = await findJob();

      // if (response?.status == 200) {
      let newData = data;
      if (filterType == "date") {
        newData = newData.filter((item) => {
          const itemDate = new Date(item.created_at);
          return (
            itemDate >= new Date(value.startDate) &&
            itemDate <= new Date(value.endDate)
          );
        });
      }
      // Update the selected filter in the state
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: filterValue,
      }));

      // Apply filtering based on all selected filters
      const filteredData = filterJobsByFilters(newData, {
        ...selectedFilters,
        [filterType]: filterValue,
      });

      setfindJobData(filteredData);
      // }
    } catch (error) {
      console.error("Error fetching and filtering data:", error);
    }
  };

  const handleRemoveFilter = async (filterType) => {
    // const response = await findJob();
    // if (response?.status == 200) {
    const newData = data;
    if (filterType == "date") {
      setValue({
        startDate: null,
        endDate: null,
      });
    }
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filterType]: "" };
      // If removing the experienceLevel filter, set it back to "Experience"
      if (filterType === "experienceLevel") {
        updatedFilters[filterType] = "Experience";
      }
      const filteredData = filterJobsByFilters(newData, updatedFilters);
      setfindJobData(filteredData);
      return updatedFilters;
    });
    // }
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      category: "",
      experienceLevel: "Experience",
      budgetType: "",
      date: ''
    });
    setfindJobData(data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    ));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const ratings = Array.from({ length: 5 }, (_, index) => index + 1);

  const dashboard = useSelector((state) => state);
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
    const jobDetails = JobinvIteesDetails?.find(
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

  // Pagination logic to slice data array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = findJobData?.slice(startIndex, endIndex);

  useEffect(() => {
    if (
      value.startDate &&
      value.endDate &&
      value.startDate != "dd/mm/yyyy" &&
      value.endDate != "dd/mm/yyyy"
    ) {
      handleFilterChange("date", {
        startDate: value.startDate,
        endDate: value.endDate,
      });
    }
  }, [value]);
  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {fullName && (
          <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1">
            <button type="button" className="close" onClick={handleClose}>
              ×
            </button>
            <strong className="ml-2">Welcome {fullName}</strong>
          </div>
        )}
        <div className="main-job-screen-content">
          {loading || loadingUserData ? (
            <Loader />
          ) : (
            <>
              {appliedSuccessfully && (
                <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
                  <button
                    type="button"
                    className="close"
                    onClick={() => setAppliedSuccessfully(false)}
                  >
                    ×
                  </button>
                  <strong className="ml-2">Application submitted.</strong>
                </div>
              )}
              <div className="Searchbox-Content">
                <input
                  placeholder="Search For projects"
                  className={`break-words ${inter.className} text-[14px]`}
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button
                  className={`submitbtn ${inter.className}`}
                  onClick={handleSearchSubmit}
                >
                  Submit
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="details-Content">
                  <div className={`${mulish400.className} text-[#434343]`}>
                    <span style={{ fontWeight: 700 }}>
                      {findJobData ? findJobData.length : "Loading..."}{" "}
                    </span>
                    project{findJobData && findJobData.length !== 1 ? "s" : ""}{" "}
                    found
                  </div>
                  <div>
                    <select
                      name="selectedFruit"
                      defaultValue="Sort by"
                      className="selsct-job-search "
                      value={selectedSortOption}
                      onChange={handleSortChange}
                    >
                      <option value="default">Sort by</option>
                      <option value="asc">A To Z</option>
                      <option value="desc">Z To A</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="Select-Filter-Content flex-col py-5 w-full h-auto gap-4 md:gap-0 xl:w-[89%] md:flex-row">
                  <select
                    name="category"
                    className={`select-Category-search ${mulish400.className} text-[16px] px-2`}
                    value={selectedFilters.category}
                    onChange={(e) => handleFilterChange("category", e)}
                  >
                    <option value="">Category</option>
                    {categories
                      ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort categories alphabetically
                      .map((option) => (
                        <option key={option.value} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                  </select>

                  <select
                    name="selectedFruit"
                    defaultValue="Experience"
                    className={`select-Category-search ${mulish400.className} text-[16px] px-2`}
                    value={selectedFilters.experienceLevel}
                    onChange={(e) => handleFilterChange("experienceLevel", e)}
                  >
                    <option value="Experience">Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <select
                    name="selectedFruit"
                    defaultValue="Sort by"
                    className={`select-Category-search ${mulish400.className} text-[16px] px-2`}
                    value={selectedFilters.budgetType}
                    onChange={(e) => handleFilterChange("budgetType", e)}
                  >
                    <option value="">Budget</option>
                    <option value="Fixed">Fixed Price</option>
                    <option value="Range">Range</option>
                  </select>
                  <div className="relative lg:w-auto w-[100%] min-w-[10rem]">
                    <Datepicker
                      value={value}
                      primaryColor={"blue"}
                      readOnly={true}
                      displayFormat="DD-MM-YYYY"
                      onChange={(newValue) => setValue(newValue)}
                      placeholder="."
                      inputClassName={`border border-[#E2E8F0] rounded-[6px] p-2 custom-datepicker-input  ${mulish400.className}`}
                      toggleIcon={() => <div className="flex w-full">
                        <div className="flex-1 flex justify-start">
                          <span className="flex flex-row items-center gap-1 "><p className={`${mulish400.className} text-[16px] text-[#2D3748]`}>Date</p></span>
                        </div>
                        <div className="justify-end -rotate-90 down_arrow">
                          <ArrowBackIos style={{ fontSize: '10.5px' }} />
                        </div></div>}
                      containerClassName='relative tailwind-datepicker'
                      
                    />
                    {/* <div className="absolute right-2 top-5 transform -translate-y-1/2 -rotate-90">
                        <ArrowBackIos style={{ fontSize: '10.5px' }} />
                      </div> */}
                  </div>
                </div>
              </div>
                <div className="flex items-center justify-start mb-5 custome-padding">
                <div className="Clear-sentens flex flex-wrap h-auto gap-1">
                  {Object.entries(selectedFilters).map(
                    ([filterType, filterValue]) =>
                      filterValue &&
                      !(
                        filterType === "experienceLevel" &&
                        filterValue === "Experience"
                      ) && (
                        <div className="skill-contenyt mr-3">
                          <span
                            key={filterType}
                            className={`selected-filter ${inter.className}`}
                            onClick={() => handleRemoveFilter(filterType)}
                          >
                            {` ${filterValue} x`}
                          </span>
                        </div>
                      )
                  )}
                  <span
                    className={`cursor-pointer ${inter.className}`}
                    onClick={() => {
                      handleClearFilters(); setValue({
                        startDate: null,
                        endDate: null
                      })
                    }}
                  >
                    Clear Filters
                  </span>
                </div>
              </div>

              <div className="flex items-center flex-col gap-[30px] pb-5">
                {paginatedData && paginatedData?.length!=0 ?
                  paginatedData.map((value, index) => {
                    let job = "notApplied";

                    appliedApplicationJobId?.map((id) => {
                      if (value._id === id) {
                        job = "applied";
                      }
                    });
                    return (
                      <div key={index} className="show-job-container">
                        <div
                          className={`header-like-status ${mulish600.className}`}
                        >
                          {value.selefeCreate == 0 ? (
                            <>
                              <Link
                                href={`/findwork/${value._id}`}
                                as={`/findwork/${value._id}`}
                              >
                                {value.job_title}
                              </Link>
                            </>
                          ) : (
                            <>
                              <p>{value.job_title}</p>
                            </>
                          )}
                          {value.selefeCreate == 0 ? (
                            <span>{handleFontAwsome(value)}</span>
                          ) : (
                            <FontAwesomeIcon icon={faBookmark} />
                          )}
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

                        <div
                          className="flex gap-1 mt-3 "
                          style={{ flexWrap: "wrap" }}
                        >
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
                              <img
                                src="/images/findjob-img/clock.svg"
                                alt="usericon"
                              />
                              <p
                                className={`${mulish400.className} text-[#434343] text-[14px]`}
                              >
                                Posted {formatTimeAgo(value.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className=" flex justify-end">
                            {loadingUserData ? (
                              <button
                                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-blue"
                                id="btn_login"
                                type="button"
                              >
                                Loading...
                              </button>
                            ) : value.selefeCreate == 0 ? (
                              job === "applied" ? (
                                <p
                                  className="inline-block align-middle text-center select-none text-[#2884cc] text-base font-sans whitespace-no-wrap rounded py-1 pr-3 leading-normal no-underline"
                                  id="btn_login"
                                  type="button"
                                >
                                  Already Applied
                                </p>
                              ) : userData?.professional_profile_complete ===
                                undefined ? (
                                <button
                                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-blue"
                                  id="btn_login"
                                  type="button"
                                  onClick={() => setValidationPopup(true)}
                                >
                                  Apply
                                </button>
                              ) : userData?.professional_profile_complete !==
                                1 ? (
                                <button
                                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-blue"
                                  id="btn_login"
                                  type="button"
                                  onClick={() => setValidationPopup(true)}
                                >
                                  Apply
                                </button>
                              ) : (
                                <button
                                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-blue"
                                  id="btn_login"
                                  type="button"
                                  onClick={() => handleapplyclick(value)}
                                >
                                  Apply
                                </button>
                              )
                            ) : (
                              <p
                                className="inline-block align-middle text-center select-none text-[#2884cc] text-base font-sans whitespace-no-wrap rounded py-1 pr-3 leading-normal no-underline"
                                id="btn_login"
                                type="button"
                              >
                                {/* Self Created */}
                                Already Applied
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }): <div className="text-black">No data found</div>}
                <div className="flex justify-end w-[88%]">
                  {findJobData?.length > 5 && (
                    <Pagination
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      count={Math.ceil(findJobData?.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handleChange}
                      sx={styles.pagination}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
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
                    onClick={handleValidation}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
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
            handleappliedSuccessfully={handleappliedSuccessfully}
          />
        )}{" "}
      </>
    </ErrorBoundary>
  );
};

export default FindJob;
