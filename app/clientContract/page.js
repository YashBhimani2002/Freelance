"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import "../../app/findwork/style.css";
import { clientContarctDetails, findcontracts } from "../api/api";
import Link from "next/link";
import ActiveContracts from "./ActiveContracts";
import EndedContracts from "./EndedContracts";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import Loader from "@/components/common/Loader";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";

import useSWR from 'swr';
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

function ClientContract() {
  const router = useRouter();
  const [reviewSuccessfully, setReviewSuccessfully] = useState(false);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const slugValue = urlParams.get("activated");
    if (slugValue) {
      setReviewSuccessfully(true);
      setTimeout(() => {
        setReviewSuccessfully(false);
        router.push("/clientContract");
      }, 5000);
    }
  }, []);
  const [Active, setActive] = useState(true);
  const [Ended, setEnded] = useState(false);
  const [activeContracts, setactivecontractData] = useState([]);
  const [endedContracts, setendedcontractData] = useState([]);
  const [PreviousActiveContaract, setpreviousActiveContaract] = useState();
  const [PreviousendedContracts, setendedContracts] = useState();
  const [sortOption, setSortOption] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const [myContractActiveButton, setMyContractActiveButton] =
    useState("Active Contracts");
  const [allContract, setAllContract] = useState(null);
  const [allContract2, setAllContract2] = useState([]);
  const [activeContractCount, setActiveContractCount] = useState(0);
  const [EndedContractCount, setEndedContractCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleActiveClick = () => {
    setMyContractActiveButton("Active Contracts");
    if (!Active) {
      setActive(true);
      setEnded(false);
    }
  };
  const handleEndedClick = () => {
    setMyContractActiveButton("Ended Contracts");
    if (!Ended) {
      setEnded(true);
      setActive(false);
    }
  };
  useEffect(() => {
    // my_contracts();
    loadclientContarctDetailsData();
  }, []);

  useEffect(() => {
    setQuery("");
    setSearchInput("");
  }, [Active, Ended]);

  useEffect(() => {
    let Activecount = 0;
    let Endedcount = 0;
    if (allContract !== null) {
      allContract.map((contract) => {
        if (contract.type === "active") {
          Activecount = Activecount + 1;
        }
        if (contract.type === "ended") {
          Endedcount = Endedcount + 1;
        }
      });
    }
    setActiveContractCount(Activecount);
    setEndedContractCount(Endedcount);
  }, [allContract]);

  const loadclientContarctDetailsData = async () => {
    setLoading(true);
    try {
      const response = await clientContarctDetails();
      if (response?.status == 200) {
        if (response?.data?.success) {
          if (sortOption == "" && query == "") {
            // setAllContract(response?.data?.clientContracts);
            // setAllContract2(response?.data?.clientContracts);
            return response?.data;
          } else {
            return response?.data;

          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const { data, error, isLoading, isValidating } = useSWR('/api/loadclientContarctDetailsData', loadclientContarctDetailsData, {
    refreshInterval: 60000, // Refresh data every 60 seconds
    dedupingInterval: 60000, // Cache data for 60 seconds
  });
  useEffect(() => {
    if (sortOption == "" && query == "" && data) {
      setAllContract(data?.clientContracts);
      setAllContract2(data?.clientContracts);
    }
  }, [data])
  // const my_contracts = async () => {
  //   try {
  //     const response = await findcontracts();

  //     if (response?.status == 200) {
  //       setactivecontractData(response.data.activeContracts);
  //       setpreviousActiveContaract(response.data.activeContracts);
  //       setendedcontractData(response.data.endedContracts);
  //       setendedContracts(response.data.endedContracts);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
  };
  const handleSearch = () => {
    if(query==""){
      setAllContract(data?.clientContracts);
      setAllContract2(data?.clientContracts);
    }
    setSearchInput(query);
  };
  const filterContracts = () => {
    let filtered = [...allContract2];

    if (searchInput !== "") {
      const inputValueLower = searchInput?.toLowerCase();
      filtered = filtered.filter((item) =>
        item?.contract_title.toLowerCase().includes(inputValueLower)
      );
    }
    if (sortOption === "asc") {
      filtered.sort((a, b) => a.contract_title.localeCompare(b.contract_title));
    } else if (sortOption === "desc") {
      filtered.sort((a, b) => b.contract_title.localeCompare(a.contract_title));
    }
    setAllContract(filtered);
  };
  useEffect(() => {
    if(searchInput!="" || sortOption != ""){
    filterContracts();
    }
  }, [searchInput, sortOption]);
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
        {loading ? (
          <Loader />
        ) : (
          <div className="p-[11px] lg:px-13 lg:py-7">
            {reviewSuccessfully && (
              <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
                <button
                  type="button"
                  className="close"
                  onClick={() => setReviewSuccessfully(false)}
                >
                  ×
                </button>
                <strong className="ml-2">
                  Your contract is activated Successfully.
                </strong>
              </div>
            )}

            <h2 className={`text-[23px] md:text-[29px] ${mulish600.className}`}>
              <Tooltip
                title="Contracts"
                placement="right"
                arrow
                componentsProps={tooltipClass}
              >
                Contracts
              </Tooltip>
            </h2>
            <div
              className={`flex flex-col sm:flex-row items-center justify-start mt-2`}
            >
              <div
                className={`client-ActiveContracts cursor-pointer text-center w-full sm:w-auto border !border-[#eee] sm:!border-transparent ${inter600.className
                  } ${Active ? "active" : ""}`}
                onClick={handleActiveClick}
              >
                Active Contracts ({activeContractCount})
              </div>
              <div
                className={`client-EndedContracts cursor-pointer text-center w-full sm:w-auto border !border-[#eee] sm:!border-transparent ${inter600.className
                  } ${Ended ? "active" : ""}`}
                onClick={handleEndedClick}
              >
                Ended Contracts ({EndedContractCount})
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-5 xl:gap-10 py-4">
              <div className="relative w-full md:w-[85%]">
                <input
                  placeholder="Search your projects"
                  className="w-full m-0 py-[6px] pl-[12px] pr-[115px] h-[48px] rounded-[20px] border border-[#A6B7F4]"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <button
                  className="absolute right-0 w-[110px] h-[48px] bg-[#2884cc] rounded-r-[20px] rounded-b-[20px] text-base text-[#fff]"
                  onClick={handleSearch}
                >
                  Submit
                </button>
              </div>
              <div className="w-full md:w-[15%]">
                <select
                  className="w-full h-[48px] border border-[#E2E8F0] rounded text-[#2D3748] text-sm p-3 rounded-xl"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="default">Sort by </option>
                  <option value="asc">A to Z</option>
                  <option value="desc">Z to A</option>
                </select>
              </div>
            </div>

            {myContractActiveButton === "Active Contracts" && (
              <ActiveContracts allContract={allContract} />
            )}
            {myContractActiveButton === "Ended Contracts" && (
              <EndedContracts allContract={allContract} />
            )}
          </div>
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default ClientContract;
