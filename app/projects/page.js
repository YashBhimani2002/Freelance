"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findprojects, getAppliedJobs, viewProfile } from "../api/api";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Loader from "@/components/common/Loader";
import { Inter, Mulish } from "next/font/google";
import EndedProjects from "./EndedProjects";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import Datepicker from "react-tailwindcss-datepicker";
import { ArrowBackIos, Close, DateRange } from "@mui/icons-material";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import "./style.css";

import useSWR from "swr";
const inter = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });

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
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Projects() {
  const [status, setStatus] = useState("active");
  const router = useRouter();
  const [allprojects, setallProjects] = useState([]);
  const [endedProjects, setEndedProjects] = useState([]);
  const [Ended, setEnded] = useState(false);
  const [jobAppliedUserId, setJobAppliedUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [validationPopup, setValidationPopup] = useState(false);
  const [postProject, setpostProject] = useState("");
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

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
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const handleDateFilter = () => {
    const filteredProjects = allprojects.filter((item) => {
      const itemDate = new Date(item.created_at);
      return (
        itemDate >= new Date(date.startDate) &&
        itemDate <= new Date(date.endDate)
      );
    });
    setallProjects(filteredProjects);
    const filteredEndProjects = endedProjects.filter((item) => {
      const itemDate = new Date(item.created_at);
      return (
        itemDate >= new Date(date.startDate) &&
        itemDate <= new Date(date.endDate)
      );
    });
    setEndedProjects(filteredEndProjects);
  };
  useEffect(() => {
    if (date.startDate && date.endDate) {
      handleDateFilter();
    }
  }, [date]);
  const handleValidation = () => {
    window.location.href = "/profile/editprofile";
  };

  const jobAction = sessionStorage.getItem("jobAction");
  if (jobAction) {
    // Display popup message based on the action taken
    if (jobAction === "posted") {
      // Show popup for job posted
      setpostProject("Project posted successfully");
    } else if (jobAction === "saved") {
      // Show popup for job saved as draft
      setpostProject("Project saved as draft");
    }
    // Clear the flag from sessionStorage
    sessionStorage.removeItem("jobAction");
  }

  const handleClose = () => {
    setpostProject("");
  };
  // const {
  //   isLoading,
  //   error,
  //   data,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["allProjects"],
  //   queryFn: () => All_Projects(),
  //   staleTime: 10000,
  // });

  const All_Projects = async () => {
    setDataLoading(true);
    try {
      const response = await findprojects();
      // Reverse the array
      if (response?.status == 200) {
        if (date.startDate == null && date.endDate == null) {
          const reversedProjects = response?.data?.projects;
          // setallProjects(reversedProjects);
          // setEndedProjects(response?.data?.endedProjects);
          setLoading(false);
          setDataLoading(false);
          return response?.data;
        } else {
          setLoading(false);
          setDataLoading(false);
          return response?.data;
        }
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };
  const { data, error, isLoading, isValidating } = useSWR(
    "/api/projects",
    All_Projects,
    {
      refreshInterval: 60000, // Refresh data every 60 seconds
      dedupingInterval: 60000, // Cache data for 60 seconds
    }
  );
  useEffect(() => {
    if (date.startDate == null && date.endDate == null && data) {
      const reversedProjects = data?.projects?.reverse();
      setallProjects(reversedProjects);
      setEndedProjects(data?.endedProjects);
    }
  }, [data]);

  const getAppliedProjectData = async () => {
    try {
      const response = await getAppliedJobs();
      if (response?.data?.success) {
        setJobAppliedUserId(response?.data?.appliedJobs?.reverse());
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // All_Projects();
    getAppliedProjectData();
  }, [userData]);

  const filteredProjects = allprojects?.filter((project) => {
    if (status === "active") {
      return project.type === "active" || project.type === "private";
    } else {
      return project.type === status;
    }
  });

  // Count the number of active and draft projects
  const activeProjectsCount = allprojects?.filter(
    (project) => project.type === "active" || project.type === "private"
  ).length;
  const draftProjectsCount = allprojects?.filter(
    (project) => project.type === "draft"
  ).length;
  const closedProjectCount = endedProjects?.filter(
    (project) => project.type === "ended"
  ).length;

  const handleActiveClick = () => {
    setEnded(false);
    setStatus("active");
  };
  const handleEndedClick = () => {
    if (!Ended) {
      setEnded(true);
      setStatus("closed");
    }
  };
  const handleDraftClick = () => {
    setEnded(false);
    setStatus("draft");
  };

  const calculatePostedTime = (createdAt) => {
    const currentTime = new Date();
    const projectCreatedAt = new Date(createdAt);
    const timeDifference = currentTime - projectCreatedAt;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    return `Posted ${hoursDifference}h ago`;
  };
  const getCountOfProposal = (id) => {
    let count = 0;
    jobAppliedUserId.forEach((element) => {
      if (element.job_id === id) {
        count++;
      }
    });
    return count;
  };
  //*************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Other state variables and useEffect remain the same

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
  const paginatedData = filteredProjects?.slice(startIndex, endIndex);
  const showPagination = filteredProjects?.length > itemsPerPage;
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
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const clearDateFilter = () => {
    // setLoading(true);
    // All_Projects();
    const reversedProjects = data.projects?.reverse();
    setallProjects(reversedProjects);
    setEndedProjects(data.endedProjects);
    setDate({
      startDate: null,
      endDate: null,
    });
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        {postProject && (
          <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1">
            <button type="button" className="close" onClick={handleClose}>
              ×
            </button>
            <strong className="ml-2"> {postProject}</strong>
          </div>
        )}
        <div className="max-w-screen-2xl p-2 lg:px-12 lg:py-[28px]">
          {loading || loadingUserData ? (
            <Loader />
          ) : (
            <>
              <div className="flex justify-between items-center w-full">
                <Tooltip
                  title="Projects"
                  placement="right"
                  arrow
                  componentsProps={tooltipClass}
                >
                  <h1
                    className={`${mulish600.className} text-[29px] text-[#000000] tracking-wide`}
                  >
                    Projects
                  </h1>
                </Tooltip>

                <div className="flex flex-1 justify-end gap-3">
                  <div className="flex flex-col justify-center items-center ">
                    <Datepicker
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      primaryColor={"blue"}
                      readOnly={true}
                      inputClassName={`custom-datepicker-input ${mulish400.className}`}
                      displayFormat="DD-MM-YYYY"
                      placeholder="."
                      toggleIcon={() => (
                        <div className="flex w-full">
                          <div className="flex-1 flex justify-start">
                            <span className="flex flex-row items-center gap-1 ">
                              <DateRange width={10} />{" "}
                              <p className={`text-[13px]`}>Sort by</p>
                            </span>
                          </div>
                          <div className="justify-end -rotate-90 down_arrow">
                            <ArrowBackIos style={{ fontSize: "10.5px" }} />
                          </div>
                        </div>
                      )}
                      containerClassName="relative tailwind-datepicker"
                    />
                  </div>

                  {loadingUserData ? (
                    <button
                      className={`${mulish400.className} bg-submtBtn text-base text-white py-[6px] px-[12px] rounded-lg border border-submtBtn hover:text-submtBtn hover:border-submtBtn hover:bg-white tracking-wide`}
                    >
                      Loading...
                    </button>
                  ) : userData?.client_profile_complete === undefined ? (
                    <Tooltip
                      title="Post a Project"
                      placement="top"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button
                        onClick={() => setValidationPopup(true)}
                        className={`${mulish400.className} bg-submtBtn text-base text-white py-[6px] px-[12px] rounded-lg border border-submtBtn hover:text-submtBtn hover:border-submtBtn hover:bg-white tracking-wide`}
                      >
                        Post a Project
                      </button>
                    </Tooltip>
                  ) : userData?.client_profile_complete === 1 ? (
                    <Tooltip
                      title="Post a Project"
                      placement="top"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button
                        onClick={() => router.push("job_posting")}
                        className={`${mulish400.className} bg-submtBtn text-base text-white py-[6px] px-[12px] rounded-lg border border-submtBtn hover:text-submtBtn hover:border-submtBtn hover:bg-white tracking-wide`}
                      >
                        Post a Project
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Post a Project"
                      placement="top"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button
                        onClick={() => setValidationPopup(true)}
                        className={`${mulish400.className} bg-submtBtn text-base text-white py-[6px] px-[12px] rounded-lg border border-submtBtn hover:text-submtBtn hover:border-submtBtn hover:bg-white tracking-wide`}
                      >
                        Post a Project
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
              {/* -------------------------------- */}
              <div className="flex flex-col sm:flex-row items-center justify-start gap-y-3 sm:gap-y-0  pt-4 pb-[14px]">
                <button
                  // onClick={() => setStatus("active")}
                  onClick={handleActiveClick}
                  className={`${
                    status === "active"
                      ? "text-btnText bg-sidbarseleclistcolor shadow"
                      : "text-black"
                  } sm:mr-[5px]  cursor-pointer py-[8px] px-[16px] rounded-[6px] ${
                    inter600.className
                  }  w-full sm:w-auto border border-[#eee] sm:border-none`}
                >
                  Active Projects{" "}
                  {activeProjectsCount > 0 ? `(${activeProjectsCount})` : `(0)`}
                </button>

                <button
                  // onClick={() => setStatus("draft")}
                  onClick={handleDraftClick}
                  className={`${
                    status === "draft"
                      ? "text-btnText bg-sidbarseleclistcolor shadow"
                      : "text-black"
                  } sm:mr-[5px]  cursor-pointer py-[8px] px-[16px] rounded-[6px] ${
                    inter600.className
                  }   w-full sm:w-auto border border-[#eee] sm:border-none`}
                >
                  Drafts{" "}
                  {draftProjectsCount > 0 ? `(${draftProjectsCount})` : `(0)`}
                </button>
                <button
                  // onClick={() => setStatus("closed")}
                  onClick={handleEndedClick}
                  className={`${
                    status === "closed"
                      ? "text-btnText bg-sidbarseleclistcolor shadow"
                      : "text-black"
                  } sm:mr-[5px] cursor-pointer py-[8px] px-[16px] rounded-[6px] ${
                    inter600.className
                  }   w-full sm:w-auto border border-[#eee] sm:border-none`}
                >
                  Closed Projects{" "}
                  {closedProjectCount > 0 ? `(${closedProjectCount})` : `(0)`}
                </button>
              </div>
              {/* ----------------------------- */}
              {date.startDate != null && date.endDate != null && (
                <div className="flex flex-row items-center gap-2">
                  <div
                    className={`flex-row gap-1 skill-contenyt items-center`}
                    onClick={() => {
                      clearDateFilter();
                    }}
                  >
                    <p
                      className={`selected-filter ${mulish700.className} font-bold`}
                    >{`${formatDate(date.startDate)}~${formatDate(
                      date.endDate
                    )}`}</p>
                    {/* <div className="cursor-pointer selected-filter"> <Close style={{ fontSize: '17.5px' }} />
                    </div> */}
                  </div>
                  <p
                    className={`text-[black] cursor-pointer ${mulish700.className} selected-filter`}
                    onClick={() => {
                      clearDateFilter();
                    }}
                  >
                    Clear Filters
                  </p>
                </div>
              )}
              <div className="my-0 text-[#ADADAD] font-inter mt-3">
                {activeProjectsCount === 0 && status === "active" && (
                  <div className="p-5 my-0 text-center text-black">
                    No data found
                  </div>
                )}
                {draftProjectsCount === 0 && status === "draft" && (
                  <div className="p-5 my-0 text-center text-black">
                    No data found
                  </div>
                )}
                {/* {closedProjectCount === 0 && status === "closed" && (
              <div className="p-5 my-0">
                No data found
              </div>
            )} */}
                {/* {filteredProjects?.length === 0 && (
          <p>No projects found for the selected status.</p>
        )} */}
                {paginatedData?.map((projects, indexLists) => (
                  <div
                    key={indexLists}
                    className="p-6 my-5 border border-borderBlue rounded-xl"
                  >
                    {/* ----------------------- */}
                    <div className="flex justify-between">
                      <h1
                        // onClick={() => router.push(`/projects/${lists.id}`)}
                        className={`${mulish600.className} text-[#000000] text-[21px]  hover:text-searchbg cursor-pointer tracking-wide`}
                      >
                        <Link
                          href={`/projects/${projects._id}`}
                          as={`/projects/${projects._id}`}
                          className="cursor-pointer"
                        >
                          {`${projects ? projects.job_title : ""}`}
                        </Link>
                      </h1>
                      {projects.type === "private" && (
                        <span style={{ color: "green" }}>Private job</span>
                      )}
                    </div>
                    {/* ----------------------- */}

                    <ul className="flex flex-wrap items-center text-black text-sm font-mulish pt-2 pb-[12px]">
                      <li>
                        <strong
                          className={`capitalize ${mulish700.className} text-[#434343] tracking-wide mr-[15px]`}
                        >
                          {projects.budget_type === "Fixed"
                            ? `${projects.budget_type} Price`
                            : projects.budget_type}
                        </strong>
                        {projects.budget_type === "range" ? (
                          <span className="font-normal mr-[15px]">
                            N{projects.budget_from}-N{projects.budget_to}
                          </span>
                        ) : (
                          <span
                            className={`${mulish400.className} mr-[15px]  text-sm`}
                          >
                            N{projects.budget_to}
                          </span>
                        )}
                      </li>
                      <li>
                        <strong
                          className={`capitalize ${mulish700.className} text-[#434343] tracking-wide text-sm`}
                        >
                          Posted:
                        </strong>{" "}
                        <span
                          className={`${mulish400.className} text-sm text-[#434343] tracking-wide `}
                        >
                          {calculatePostedTime(projects.created_at)}
                        </span>
                      </li>
                    </ul>
                    {/* ----------------------- */}
                    {projects.skillJobData.length > 0 && (
                      <ul
                        className={`flex flex-wrap items-center justify-start gap-2 text-[11px] font-medium my-2 ${inter500.className}`}
                      >
                        {projects.skillJobData.map(
                          (skillJob) =>
                            skillJob.skillData &&
                            skillJob.skillData.name && (
                              <li
                                key={skillJob._id}
                                className="bg-sidbarseleclistcolor text-strongText p-2 rounded-lg shadow shrink-0"
                              >
                                {skillJob.skillData.name}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                    {/* ----------------------- */}
                    <ul className="flex items-center  pt-2">
                      <li className="font-inter text-getstartTitle mr-[25px]">
                        <h1 className="text-sm font-medium">Proposals</h1>
                        <h1 className="text-base mt-[8px] font-semibold">
                          {projects?.proposalCount}
                        </h1>
                      </li>
                      <li className="font-inter text-getstartTitle mr-[25px]">
                        <h1 className="text-sm font-medium">Messages</h1>
                        <h1 className="text-base mt-[8px] font-semibold">
                          {projects?.unreadMessageCount}
                        </h1>
                      </li>
                      <li className="font-inter text-getstartTitle mr-[25px]">
                        <h1 className="text-sm font-medium">Hired</h1>
                        <h1 className="text-base mt-[8px] font-semibold">
                          {projects?.hiredCount}
                        </h1>
                      </li>
                    </ul>
                  </div>
                ))}
                {showPagination && (
                  <div className="flex justify-end">
                    <Pagination
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      count={Math.ceil(filteredProjects?.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handleChange}
                      sx={styles.pagination}
                    />
                  </div>
                )}
              </div>
            </>
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
                        post a project.
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
          {Ended && (
            <EndedProjects
              dataLoading={dataLoading}
              endedProjects={endedProjects}
            />
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
