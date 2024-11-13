"use client";
import React, { useEffect, useState } from "react";
import Invitation from "./Invitation";
import Bookmark from "./Bookmark";
import "../mycontract/style.css";
import { InvitationBookmarkDetails } from "../api/api";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import Loader from "@/components/common/Loader";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { useSocket } from "../socketContext";
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

function InvitationandBookmark() {
  const router = useRouter();
  const [Active, setActive] = useState(true);
  const [Ended, setEnded] = useState(false);
  const [BookmarkList, setBookmarkList] = useState([]);
  const [perviousDataOfFilterBookMark, setPerviousDataOfFilterBookMark] =
    useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [searchInput, setSearchInput] = useState("");
  const [bookmarkcount, setBookmarkcount] = useState(0);
  const [Invitations, setInvitations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [tabChange, setTabchange] = useState("");
  const [removedInvitation, setRemovedInvitation] = useState(false);
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const {socket} = useSocket();
  useEffect(() => {
    socket.on("inviteStatus", (data) => {
      invitationBookmarkDetails("invitation");
    });

    socket.on("deleteJobStatus", (data) => {
      invitationBookmarkDetails("invitation");
    });
  }, []);

  const handleActiveClick = () => {
    if (!Active) {
      setActive(true);
      setEnded(false);
      invitationBookmarkDetails("invitation");
      setTabchange("invitation");
    }
  };

  const handleEndedClick = () => {
    if (!Ended) {
      setEnded(true);
      setActive(false);
      invitationBookmarkDetails("bookmark");
      setTabchange("bookmark");
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const slugValue = urlParams.get("removed");

    if (slugValue) {
      setRemovedInvitation(true);
      setTimeout(() => {
        setRemovedInvitation(false);
        router.push("/invitation&bookmark");
      }, 9000);
    }
  }, []);

  const invitationBookmarkDetails = async (dataType) => {
    setDataLoading(true);
    const data = {
      searchjob: "",
      searchjob1: "",
      short: "",
      short1: "",
      dataType: dataType,
    };
    try {
      const res = await InvitationBookmarkDetails(data);
      if (res?.status == 200) {
        setDataLoading(false);
        setLoading(false);
        setBookmarkcount(res?.data?.bookmarkCount);
        setInvitations(res?.data?.inviteCount);
        setBookmarkList(res?.data?.bookmark);
        setPerviousDataOfFilterBookMark(res?.data?.bookmark);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    invitationBookmarkDetails("invitation");
  }, []);
  const handleSortChange = async (e) => {
    const selectedOption = e.target.value;
    const datalist = BookmarkList.slice();
    if (selectedOption == "default") {
      try {
        setBookmarkList(perviousDataOfFilterBookMark);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // Apply sorting based on the selected option
      const sortedData = sortJobData(datalist, selectedOption);
      setBookmarkList(sortedData); // Make sure to create a new array to trigger a re-render
    }

    setSelectedSortOption(selectedOption);
  };

  // Function to sort job data based on the selected option
  const sortJobData = (data, option) => {
    if (option === "asc") {
      return data.sort((a, b) =>
        a.jobData.job_title.localeCompare(b.jobData.job_title)
      );
    } else if (option === "desc") {
      return data.sort((a, b) =>
        b.jobData.job_title.localeCompare(a.jobData.job_title)
      );
    } else {
      // Return original data if the option is 'default'
      return data;
    }
  };

  const SearchFilter = () => {
    if (searchInput) {
      const datalist = BookmarkList.slice();
      const filteredData = datalist.filter((item) => {
        // Customize this condition based on your search criteria
        let status = item.jobData.job_title
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        if (status == true) {
          return item;
        }
      });
      setBookmarkList(filteredData);
    } else {
      setBookmarkList(perviousDataOfFilterBookMark);
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
  const handleRefresh = (value)=>{
    invitationBookmarkDetails(value);
  }
  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        <div className="MainContainer lg:px-12 lg:py-4">
          {loading ? (
            <Loader />
          ) : (
            <>
              {removedInvitation && (
                <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
                  <button
                    type="button"
                    className="close"
                    onClick={() => setRemovedInvitation(false)}
                  >
                    ×
                  </button>
                  <strong className="ml-2">
                    Job invitation removed successfully.
                  </strong>
                </div>
              )}

              <h2
                className={`text-[29px] ${mulish600.className} text-[#000000]`}
              >
                  <Tooltip title='Invitation & Bookmark' arrow placement="right" componentsProps={tooltipClass}>
                Invitation & Bookmark
                  </Tooltip>
              </h2>
              <div className="flex justify-start items-center flex-col md:flex-row mt-3">
                <div
                  className={`ActiveContracts ${
                    inter600.className
                  } rounded-[6px] w-full md:w-auto text-center pl-[17px] border border-[#eee] md:border-transparent cursor-pointer ${
                    Active ? "active" : ""
                  }`}
                  onClick={handleActiveClick}
                >
                  {`Invitations (${Invitations})`}
                </div>
                <div
                  className={`EndedContracts ${
                    inter600.className
                  } rounded-[6px] w-full md:w-auto text-center border border-[#eee] md:border-transparent cursor-pointer ${
                    Ended ? "active" : ""
                  }`}
                  onClick={handleEndedClick}
                >
                  {`Bookmarks (${bookmarkcount})`}
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 py-5">
                <div className="relative rounded-xl w-full md:w-[85%]">
                  <input
                    placeholder="Search your projects"
                      className="w-full m-0 py-[6px] pl-[12px] pr-[115px] h-[48px] rounded-[20px] border border-[#A6B7F4]"
                    value={searchInput}
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setBookmarkList(perviousDataOfFilterBookMark);
                      }
                      setSearchInput(e.target.value);
                    }}
                  />
                  <button
                      className="absolute right-0 w-[110px] h-[48px] bg-[#2884cc] rounded-r-[20px] rounded-b-[20px] text-base text-[#fff]"
                    onClick={() => {
                      SearchFilter();
                    }}
                  >
                    Submit
                  </button>
                </div>
                <div className="w-full md:w-[15%]">
                  <select
                    className="w-full h-[48px] border border-[#E2E8F0] text-[#2D3748] text-sm p-3 rounded-xl"
                    value={selectedSortOption}
                    onChange={handleSortChange}
                  >
                    <option value="Sortby">Sort by </option>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                    {tabChange === "bookmark" && (
                      <option value="default">Bookmark</option>
                    )}
                  </select>
                </div>
              </div>
              {Active && (
                <Invitation
                  InvitationList={BookmarkList}
                  dataLoading={dataLoading}
                  handleRefresh = {handleRefresh}
                />
              )}
              {Ended && (
                <Bookmark
                  BookmarkList={BookmarkList}
                  dataLoading={dataLoading}
                  handleRefresh = {handleRefresh}
                />
              )}
            </>
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default InvitationandBookmark;
