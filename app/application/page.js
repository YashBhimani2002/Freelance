"use client";
import "../mycontract/style.css";
import { myApplicationList } from "../api/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import "./style.css";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import useSWR from 'swr';

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
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

function Application() {
  const router = useRouter();
  const [appliedSuccessfully, setAppliedSuccessfully] = useState(false);
  const [applicationMsg, setApplicationMsg] = useState("");
  const [withDrowSuccess, setWithdrowSuccess] = useState(false);
  const [invitationActive, setInvitationActive] = useState(true);
  const [bookmarkActive, setBookmarkActive] = useState(false);
  const [archieveActive, setArchieveActive] = useState(false);
  const [appData, setAppData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [draftData, setDraftData] = useState([]);
  const [archivedData, setArchivedData] = useState([]);
  const [activecount, setActiveCount] = useState(0);
  const [archivecount, setArchiveCount] = useState(0);
  const [draftcount, setDraftCount] = useState(0);
  const [searchinput, setSearchInput] = useState("");
  const [previousData, setPreviousData] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDataCount, setActiveDataCount] = useState(0);
  const [showPagination, setshowPagination] = useState();
  const [paginatedData, setpaginatedData] = useState([]);
  const itemsPerPage = 7;

  const getmyapplication = async () => {
    try {
      let response = await myApplicationList();

      if (response?.status == 200) {

        if (selectedSortOption == "default" && searchinput == "") {
        // setLoading(true);
          // setLoading(false);
          // setAppData(response?.data.active);
          // setActiveDataCount(response?.data?.active?.length);
          // setActiveData(response?.data.active);
          // setActiveCount(response?.data.active.length);
          // setDraftData(response?.data.draft);
          // setDraftCount(response?.data.draft.length);
          // setArchivedData(response?.data.archived);
          // setArchiveCount(response?.data.archived.length);
          // console.log(response.data,'response data .....');
          return response?.data;
        } else {
          return response?.data;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading, isValidating } = useSWR('/api/getmyapplication', getmyapplication, {
    refreshInterval: 60000, // Refresh data every 60 seconds
    dedupingInterval: 60000, // Cache data for 60 seconds
  });
  useEffect(() => {

    if (selectedSortOption == "default" && searchinput == "" && data) {
      setLoading(false);
      setAppData(data.active);
      setActiveDataCount(data.active?.length);
      setActiveData(data.active);
      setActiveCount(data.active.length);
      setDraftData(data.draft);
      setDraftCount(data.draft.length);
      setArchivedData(data.archived);
      setArchiveCount(data.archived.length);
    }
  }, [data]);
  useEffect(() => {
    const sortedContracts = appData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDatas = sortedContracts?.slice(startIndex, endIndex);
    const showPaginations = sortedContracts?.length > itemsPerPage;
    setpaginatedData(paginatedDatas);
    setshowPagination(showPaginations);
  }, [appData, currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setSearchInput("");
  }, [invitationActive, bookmarkActive, archieveActive]);

  const handleInvitationClick = () => {
    setAppData(activeData);
    setInvitationActive(true);
    setBookmarkActive(false);
    setArchieveActive(false);
  };
  const handleBookmarkClick = () => {
    setAppData(draftData);
    setBookmarkActive(true);
    setInvitationActive(false);
    setArchieveActive(false);
  };
  const handleArchieveClick = () => {
    setAppData(archivedData);
    setArchieveActive(!archieveActive);
    setInvitationActive(false);
    setBookmarkActive(false);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const slugValue = urlParams.get("applied");
    const draftslugValue = urlParams.get("draft");

    if (slugValue) {
      setAppliedSuccessfully(true);
      setApplicationMsg("Application submitted");
      setTimeout(() => {
        setAppliedSuccessfully(false);
        router.push("/application");
      }, 4000); // 5000 milliseconds = 5 seconds
    } else if (draftslugValue) {
      setAppliedSuccessfully(true);
      setApplicationMsg("Application saved successfully");
      setTimeout(() => {
        setAppliedSuccessfully(false);
        router.push("/application");
      }, 4000);
    }
  }, []);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const slugValue = urlParams.get("archived");

    if (slugValue) {
      setWithdrowSuccess(true);
      setTimeout(() => {
        setWithdrowSuccess(false);
        router.push("/application");
      }, 4000);
    }
  }, []);
  //This will return array that will give filter data value
  const handlesearch = () => {
    let fileterdata;
    if (invitationActive) {
      setPreviousData(activeData);
      fileterdata = activeData.slice();
    } else if (archieveActive) {
      setPreviousData(archivedData);
      fileterdata = archivedData.slice();
    } else {
      setPreviousData(draftData);
      fileterdata = draftData.slice();
    }
    return fileterdata;
  };
  //This will filter search value
  const handlesearchfiler = async () => {
    let fileterdata = await handlesearch();
    fileterdata = fileterdata.filter((item) => {
      let hasMatchingJobTitle = item.job_details.some((value) => {
        return value.job_title
          .toLowerCase()
          .includes(searchinput.toLowerCase());
      });
      return hasMatchingJobTitle;
    });
    setAppData(fileterdata);
  };
  //This will handel input value
  const handleinput = (value) => {
    if (value === "") {
      setAppData(previousData);
      setPreviousData([]);
    }
    setSearchInput(value);
  };
  //This will performe sorting.
  const handleSortChange = async (e) => {
    const selectedOption = e.target.value;
    const datalist = await handlesearch();
    if (selectedOption == "default") {
      try {
        setAppData(previousData);
        setPreviousData([]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // Apply sorting based on the selected option
      const sortedData = sortJobData(datalist, selectedOption);
      setAppData(sortedData); // Make sure to create a new array to trigger a re-render
    }
    setSelectedSortOption(selectedOption);
  };
  const sortJobData = (data, option) => {
    if (option === "asc") {
      return data.sort((a, b) =>
        a.job_details[0].job_title.localeCompare(b.job_details[0].job_title)
      );
    } else if (option === "desc") {
      return data.sort((a, b) =>
        b.job_details[0].job_title.localeCompare(a.job_details[0].job_title)
      );
    } else {
      // Return original data if the option is 'default'
      return data;
    }
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
  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        <div className="MainContainer lg:px-13 lg:py-5 tracking-wide">
          {appliedSuccessfully && (
            <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
              <button
                type="button"
                className="close"
                onClick={() => setAppliedSuccessfully(false)}
              >
                ×
              </button>
              <strong className="ml-2">{applicationMsg}</strong>
            </div>
          )}
          {withDrowSuccess && (
            <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
              <button
                type="button"
                className="close"
                onClick={() => setWithdrowSuccess(false)}
              >
                ×
              </button>
              <strong className="ml-2">
                Withdrawn application successfully archived.
              </strong>
            </div>
          )}
          <h2 className={`text-[29px] ${mulish600.className}`}>
            <Tooltip title='My Application' arrow placement="right" componentsProps={tooltipClass}>
              My Application
            </Tooltip>
          </h2>
          <div className="flex justify-start items-center flex-col md:flex-row mt-3">
            <div
              className={`ActiveContracts ${inter600.className
                } shrink-0 rounded-[6px] w-full md:w-auto text-center border border-[#eee] md:border-transparent text-base cursor-pointer ${inter600.className
                } ${invitationActive ? "active" : ""}`}
              onClick={handleInvitationClick}
            >
              Active Applications {`(${activecount})`}
            </div>
            <div
              className={`EndedContracts text-base ${inter600.className
                } shrink-0 rounded-[6px] w-full md:w-auto text-center border border-[#eee] md:border-transparent cursor-pointer ${inter600.className
                } ${bookmarkActive ? "active" : ""}`}
              onClick={handleBookmarkClick}
            >
              Draft Applications {`(${draftcount})`}
            </div>
            <div
              className={`EndedContracts text-base ${inter600.className
                } shrink-0 rounded-[6px] w-full md:w-auto text-center border border-[#eee] md:border-transparent cursor-pointer ${inter600.className
                } ${archieveActive ? "active" : ""}`}
              onClick={handleArchieveClick}
            >
              Archived {`(${archivecount})`}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 py-5">
            <div className="relative w-full md:w-[85%]">
              <input
                placeholder="Search your projects"
                value={searchinput}
                onChange={(e) => {
                  handleinput(e.target.value);
                }}
                className="w-full m-0 py-[6px] pl-[12px] pr-[115px] h-[48px] rounded-[20px] border border-[#A6B7F4]"
              />
              <button
                className="absolute right-0 w-[110px] h-[48px] bg-[#2884cc] rounded-r-[20px] rounded-b-[20px] text-base text-[#fff]"
                onClick={handlesearchfiler}
              >
                Submit
              </button>
            </div>
            <div className="w-full md:w-[15%]">
              <select
                className="w-full h-[48px] border border-[#E2E8F0] rounded-xl text-[#2D3748] text-sm p-3"
                value={selectedSortOption}
                onChange={handleSortChange}
              >
                <option value="default">Sort by </option>
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
              </select>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <>
              {paginatedData?.length !== 0 ? (
                paginatedData?.map((value, index) =>
                  value.job_details.map((item, idx) => {
                    const startDate = new Date(item.created_at);
                    const options = {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    };
                    const formattedDate = startDate.toLocaleDateString(
                      "en-US",
                      options
                    );
                    return (
                      <Link
                        key={idx}
                        href={`/application/${item._id}`}
                        as={`/application/${item._id}`}
                        className={`group cursor-pointer`}
                      >
                        <div className="col-12 job-search-box mt-5  cursor-pointer">
                          <h3
                            className={`text-[21px] ${mulish600.className} group-hover:text-btn_bg`}
                          >
                            {`${item ? item.job_title : ""}`}
                          </h3>
                          {item.budget_type === "range" ? (
                            <div className="price">
                              <ul className="App_Job_listing">
                                <li>
                                  <strong>Range</strong>
                                </li>
                                <li>
                                  <strong>Budget:</strong> N{item.budget_from}-N
                                  {item.budget_to}
                                </li>
                                <li>
                                  <strong>Date Started:</strong> {formattedDate}
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <div className="price">
                              <ul className="App_Job_listing">
                                <li>
                                  <strong>Fixed Price</strong>
                                </li>
                                <li>
                                  <strong>Budget:</strong> N{item.budget_to}
                                </li>
                                <li>
                                  <strong>Date Started:</strong> {formattedDate}
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })
                )
              ) : (
                <div className="custom-pl-33">No data found</div>
              )}
              {showPagination && activeDataCount >= 6 ? (
                <div className="flex justify-end mt-3">
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    count={Math.ceil(appData?.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChange}
                    sx={styles.pagination}
                  />
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Application;
