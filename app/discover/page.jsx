"use client";
import React, { useState, useEffect } from "react";
import { getCountries, getCategories, getSkills } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  bookmarkProfessionalForJob,
  bookmarkProfessionalForJobdetails,
  removeprofessionalbookmarkForJobDetails,
} from "../api/api";
import { faBookmark as faBookmarksolid } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import profileLogo from "@/public/images/user/profile_picture.webp";
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

const Discoverpage = () => {
  const [loading, setLoading] = useState(true);
  const [bookmarkdetails, setbookmarkdetails] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [skillCategories, setSkillCategories] = useState([]);
  const [allProfessionals, setAllProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [query, setQuery] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("");

  const getProfessionals = async () => {
    try {
      const response = await axios.get(`${url}/allProfessional`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        if (
          selectedExperience == "" &&
          selectedSkillCategory == "" &&
          selectedLocation == "" &&
          sortOption == "" &&
          selectedBudget == "" &&
          inputValue == ""
        ) {
          // setAllProfessionals(response.data.allprofessionals);
          // setFilteredProfessionals(response.data.allprofessionals);
          setLoading(false);
          return response.data;
        } else {
          return response.data;
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      throw err;
    }
  };
  const { data, error, isLoading, isValidating } = useSWR(
    "/api/getProfessionals",
    getProfessionals,
    {
      refreshInterval: 60000, // Refresh data every 60 seconds
      dedupingInterval: 60000, // Cache data for 60 seconds
    }
  );
  useEffect(() => {
    if (
      selectedExperience == "" &&
      selectedSkillCategory == "" &&
      selectedLocation == "" &&
      sortOption == "" &&
      selectedBudget == "" &&
      inputValue == "" &&
      data
    ) {
      setAllProfessionals(data.allprofessionals);
      setFilteredProfessionals(data.allprofessionals);
      setLoading(false);
    }
  }, [data]);
  useEffect(() => {
    getProfessionals();
    fetchProfessionalBookMarksOfJob();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries();
        if (response) {
          if (response.status == 200) {
            const sortedCountries = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            // setCountries(response.data);
            setCountries(sortedCountries);
          }
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchSkillCategories = async () => {
      try {
        const response = await getSkills();
        if (response) {
          if (response?.status == 200) {
            // Extract category names from the response
            const categories = response.data.map((category) => category.name);
            setSkillCategories(categories);
          }
        }
      } catch (error) {
        console.error("Error fetching skill categories:", error);
      }
    };

    fetchSkillCategories();
  }, []);

  // Function to clear filters
  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedExperience("");
    setSelectedLocation("");
    setSelectedSkillCategory("");
    setInputValue("");
    setSelectedBudget("");
    setAllProfessionals(data.allprofessionals);
    setFilteredProfessionals(data.allprofessionals);
  };

  useEffect(() => {
    if (
      selectedExperience != "" ||
      selectedSkillCategory != "" ||
      selectedLocation != "" ||
      sortOption != "" ||
      selectedBudget != "" ||
      inputValue != ""
    ) {
      filterProfessionals();
    }
  }, [
    selectedExperience,
    selectedSkillCategory,
    selectedLocation,
    selectedBudget,
    inputValue,
    sortOption,
  ]);

  const filterProfessionals = () => {
    let filtered = [...allProfessionals];
    if (selectedExperience !== "") {
      filtered = filtered.filter(
        (professional) =>
          professional?.professionalDetails?.experience_level ===
          selectedExperience
      );
    }
    if (selectedSkillCategory !== "") {
      filtered = filtered.filter((professional) =>
        professional?.skillData?.some(
          (skill) => skill?.skill_id === selectedSkillCategory
        )
      );
    }
    if (selectedLocation !== "") {
      filtered = filtered.filter(
        (professional) => professional?.country?.name === selectedLocation
      );
    }
    if (selectedBudget !== "") {
      filtered = filtered.filter(
        (professional) =>
          professional?.budget === selectedBudget ||
          professional?.budgetType?.includes(selectedBudget)
      );
    }
    if (inputValue !== "") {
      const inputValueLower = inputValue.toLowerCase();
      filtered = filtered.filter(
        (professional) =>
          professional?.first_name.toLowerCase().includes(inputValueLower) ||
          professional?.last_name.toLowerCase().includes(inputValueLower) ||
          `${professional?.first_name} ${professional?.last_name}`
            .toLowerCase()
            .includes(inputValueLower)
      );
    }
    if (sortOption === "1") {
      filtered.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sortOption === "2") {
      filtered.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }
    setFilteredProfessionals(filtered);
  };
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    if (selectedSortOption == "0") {
      setAllProfessionals(data.allprofessionals);
      setFilteredProfessionals(data.allprofessionals);
    } 
      setSortOption(selectedSortOption);
  };
  const handleFormSubmit = (e) => {
    if (query == "") {
      setAllProfessionals(data.allprofessionals);
      setFilteredProfessionals(data.allprofessionals);
    }
    e.preventDefault();
    setInputValue(query);
  };
  const filterProfessionalsByExperience = (e) => {
    const selectedExp = e.target.value;
    setSelectedExperience(selectedExp);
  };
  const handleSkillCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedSkillCategory(selectedCategory);
  };
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setSelectedLocation(selectedLocation);
  };
  const handleBudgetChange = (e) => {
    setSelectedBudget(e.target.value);
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

  //*************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Function to handle page change
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
              <h2 className="dishead text-bl pb-5 font-mulish font-light sm:text-3xl text-2xl ">
                <Tooltip
                  title="Discover Professionals"
                  placement="right"
                  arrow
                  componentsProps={tooltipClass}
                >
                  Discover Professionals
                </Tooltip>
              </h2>

              <div className="grid grid-cols-1 search-box1">
                <div className="mb-4 relative ">
                  <form
                    method="get"
                    autoComplete="off"
                    onSubmit={handleFormSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Search For Professional"
                      className="w-full rounded-[20px] border-[1.5px] border-box_border bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input bb focus:shadow-input_shadow"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <input
                      type="submit"
                      name="btnsearch"
                      id="btnsearch"
                      className="absolute top-0 right-0 h-full rounded-bl-[20px] rounded-tr-[20px]  rounded-br-[20px] w-18 sm:w-28 bg-btn_bg border-0 text-white text-sm sm:text-lg "
                    />
                  </form>
                </div>
              </div>
              <div className="grid grid-cols-1 ">
                <div className="mb-4 w-full flex justify-between">
                  <h4 className="font-mulish font-light text-box_clr">
                    {filteredProfessionals !== null &&
                      filteredProfessionals !== undefined && (
                        <span className="font-semibold text-bl">
                          {filteredProfessionals?.length}
                        </span>
                      )}{" "}
                    Professionals found{" "}
                  </h4>
                  <div className="dropdown ">
                    <select
                      name="short"
                      className=" dropdown-toggle short py-1.5 px-3 border-[1.5px] border-stroke bg-transparent font-Inter text-sm rounded-xl"
                      onChange={(e) => handleSortChange(e)}
                      value={sortOption}
                    >
                      <option value="0">Sort by</option>
                      <option value="1">A To Z</option>
                      <option value="2">Z To A</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="  flex flex-wrap xl:gap-4 gap-2 w-full">
                <div className="btn-group w-full sm:w-auto">
                  <select
                    name="cat1"
                    id="cat1"
                    className=" font-mulish dropdown-toggle inline-flex xl:w-45 w-full sm:w-40 px-4 py-2 mt-2 text-base border-[1.5px] rounded-[10px]  border-stroke  focus:outline-none focus:border-blue-500 "
                    onChange={(e) => handleSkillCategoryChange(e)}
                    value={selectedSkillCategory}
                  >
                    <option value="">Skill</option>
                    {skillCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="btn-group w-full sm:w-auto">
                  <select
                    name="exp"
                    id="exp"
                    className=" dropdown-toggle font-mulish dropdown-toggle inline-flex xl:w-45 sm:w-40 w-full px-4 py-2 mt-2 text-base rounded-[10px] border-[1.5px] border-stroke focus:outline-none focus:border-blue-500"
                    onChange={(e) => filterProfessionalsByExperience(e)}
                    value={selectedExperience}
                  >
                    <option value="">Experience</option>
                    <option value="Expert">Expert</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Fresher">Fresher</option>
                  </select>
                </div>
                <div className="btn-group w-full sm:w-auto">
                  <select
                    name="exp"
                    id="exp"
                    className=" dropdown-toggle font-mulish dropdown-toggle block xl:w-45 w-full sm:w-40 px-4 py-2 mt-2 text-base border-[1.5px] border-stroke rounded-[10px] focus:outline-none focus:border-blue-500"
                    onChange={handleLocationChange}
                    value={selectedLocation}
                  >
                    <option value="">Location</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.value}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="btn-group w-full sm:w-auto">
                  <select
                    name="exp"
                    id="exp"
                    className=" dropdown-toggle font-mulish dropdown-toggle block xl:w-45 w-full sm:w-40 px-4 py-2 mt-2 text-base border-[1.5px] border-stroke rounded-[10px] focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleBudgetChange(e)}
                    value={selectedBudget}
                  >
                    <option value="">Budget</option>
                    <option value="Fixed">Fixed Price</option>
                    <option value="range">Range</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="tag-list mb-8 mt-3 flex">
                  <ul id="filter">
                    {selectedSkillCategory && (
                      <li
                        className="inline-block px-4 py-2 bg-sidbarseleclistcolor border-1 border-blue-300 text-darkbc font-bold leading-4 rounded mr-2 capitalize"
                        onClick={() => setSelectedSkillCategory("")}
                      >
                        {selectedSkillCategory}
                        <span className="cursor-pointer ml-1 text-xs">
                          &#10006;
                        </span>
                      </li>
                    )}
                    {selectedCountry && (
                      <li
                        className="inline-block px-4 py-2 bg-sidbarseleclistcolor border-1 border-blue-300 text-darkbc font-bold leading-4 rounded mr-2 capitalize"
                        onClick={() => setSelectedCountry("")}
                      >
                        {selectedCountry}
                        <span className="cursor-pointer ml-1 text-xs">
                          &#10006;
                        </span>
                      </li>
                    )}
                    {selectedLocation && (
                      <li
                        className="inline-block px-4 py-2 bg-sidbarseleclistcolor border-1 border-blue-300 text-darkbc font-bold leading-4 rounded mr-2 capitalize"
                        onClick={() => setSelectedLocation("")}
                      >
                        {selectedLocation}
                        <span className="cursor-pointer ml-1 text-xs">
                          &#10006;
                        </span>
                      </li>
                    )}
                    {selectedExperience && (
                      <li
                        className="inline-block px-4 py-2 bg-sidbarseleclistcolor border-1 border-blue-300 text-darkbc font-bold leading-4 rounded mr-2 capitalize"
                        onClick={() => setSelectedExperience("")}
                      >
                        {selectedExperience}
                        <span className="cursor-pointer ml-1 text-xs">
                          &#10006;
                        </span>
                      </li>
                    )}
                    {selectedBudget && (
                      <li
                        className="inline-block px-4 py-2 bg-sidbarseleclistcolor border-1 border-blue-300 text-darkbc font-bold leading-4 rounded mr-2 capitalize"
                        onClick={() => setSelectedBudget("")}
                      >
                        {selectedBudget}
                        <span className="cursor-pointer ml-1 text-xs">
                          &#10006;
                        </span>
                      </li>
                    )}
                  </ul>
                  <button
                    id="clear"
                    className="inline-block py-2 px-4 bg-blue-100 text-darkbc font-bold leading-4 rounded capitalize"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-7">
                {filteredProfessionals.length > 0 ? (
                  paginatedData?.map((item, index) => {
                    let totalNetTransactionsAmount = 0;
                    if (item.transactions) {
                      item.transactions.forEach((transaction) => {
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
                    if (item.activeJobs && item.completedJobs) {
                      const totalJobs =
                        item.activeJobs.length + item.completedJobs.length;
                      const jobSuccessPercentage = Math.floor(
                        (item.completedJobs.length / totalJobs) * 100
                      );
                      jobSucess = jobSuccessPercentage;
                    }
                    return (
                      <>
                        <div key={index}>
                          <div className="discover-box  p-6 border border-solid border-box_border box-border rounded-[10px] h-full">
                            <div className=" flex flex-wrap">
                              <div className="img  w-1/5 ">
                                <img
                                  className="rounded-full  w-[50px] h-[50px]"
                                  src={
                                    item?.avatarDetail[0]?.avatar
                                      ? `${url}/public/uploads/profile_attachments/${item?.avatarDetail[0]?.avatar}`
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
                              <div className="img-details  w-4/5">
                                <div className="flex justify-between">
                                  <h5 className=" font-medium font-mulish text-[19px] text-black mb-1.5">
                                    {item?.first_name} {item?.last_name}
                                  </h5>
                                  <span>
                                    {handleFontAwsome(
                                      item?.professionalDetails?._id
                                    )}
                                  </span>
                                </div>
                                <p className="text-xl font-mulish font-normal text-post_clr mb-2">
                                  {item?.professionalDetails?.bio_title || ""}
                                </p>
                                <ul>
                                  {item?.country?.name && (
                                    <li className="flex items-center gap-2 text-location_clr">
                                      <img
                                        src="/images/findjob-img/pin.png"
                                        alt="Nigeria"
                                      />
                                      {item?.country?.name}
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="grid grid-cols-1">
                              <div className="service-list  mb-3">
                                <ul>
                                  <li className="inline-block font-mulish font-normal text-xs md:text-base w-1/2 mb-2  text-box_clr">
                                    N0/ hr
                                  </li>
                                  <li className="inline-block font-mulish font-normal text-xs md:text-base w-1/2 mb-2 text-box_clr">
                                    {item?.completedJobs?.length || "0"} Jobs
                                    Completed on Freelance
                                  </li>
                                  <li className="inline-block font-mulish font-normal text-xs md:text-base w-1/2 mb-2  text-box_clr">
                                    {totalNetTransactionsAmount
                                      ? `N ${totalNetTransactionsAmount} earned`
                                      : "N 0 earned"}
                                  </li>
                                  <li className="inline-block font-mulish font-normal text-xs md:text-base w-1/2 mb-2  text-box_clr">
                                    {jobSucess !== null && !isNaN(jobSucess)
                                      ? `${jobSucess}% Job Success`
                                      : "0% Job Success"}
                                    <div class="w-full bg-progress rounded-full h-2.5 overflow-hidden">
                                      <div
                                        class="bg-[#4299E1] h-2.5 rounded-full"
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
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <p className="text-end text-black">No data found</p>
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
};
export default Discoverpage;
