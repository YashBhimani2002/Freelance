"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import "../../app/findwork/style.css";
import { findcontracts, professionalDontarctDetails } from "../api/api";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Loader from "@/components/common/Loader";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import useSWR from 'swr';

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

function MyContract() {
  const [Active, setActive] = useState(true);
  const [Ended, setEnded] = useState(false);
  const [activeContracts, setactivecontractData] = useState([]);
  const [endedContracts, setendedcontractData] = useState([]);
  const [PreviousActiveContaract, setpreviousActiveContaract] = useState();
  const [PreviousendedContracts, setendedContracts] = useState();
  const [searchtext, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [professinalContractData, setProfessinalContractData] = useState(null);
  const [professinalContractData2, setProfessinalContractData2] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleActiveClick = () => {
    if (!Active) {
      setActive(true);
      setEnded(false);
    }
  };

  const handleEndedClick = () => {
    if (!Ended) {
      setEnded(true);
      setActive(false);
    }
  };
  useEffect(() => {
    // my_contracts();
    loadProfessionalDontarctDetails();
  }, []);

  const loadProfessionalDontarctDetails = async () => {
    try {
      const response = await professionalDontarctDetails();
      if (response?.status == 200) {
        if (response?.data?.success) {
          setProfessinalContractData(response?.data?.clientContracts);
          setProfessinalContractData2(response?.data?.clientContracts);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const my_contracts = async () => {
    try {
      const response = await findcontracts();
      if (response?.status == 200) {
        if (sortOption == "" && query==""){
        // setactivecontractData(response.data.activeContracts);
        // setpreviousActiveContaract(response.data.activeContracts);
        // setendedcontractData(response.data.endedContracts);
        // setendedContracts(response.data.endedContracts);
        return response.data
        }else{
          response.data;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { data, error, isLoading, isValidating } = useSWR('/api/my_contracts', my_contracts, {
    refreshInterval: 60000, // Refresh data every 60 seconds
    dedupingInterval: 60000, // Cache data for 60 seconds
  });
  useEffect(()=>{
    if (sortOption == "" && query == "" && data) {
      setactivecontractData(data.activeContracts);
      setpreviousActiveContaract(data.activeContracts);
      setendedcontractData(data.endedContracts);
      setendedContracts(data.endedContracts);
    }
  }, [data])
  const handleInputchange = (e) => {
    setSearchText(e.target.value);
    setactivecontractData(PreviousActiveContaract);
    setendedcontractData(PreviousendedContracts);
  };
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
  };
  const handleSearch = () => {
    setSearchInput(query);
  };
  const filterContracts = () => {
    let filtered = [...professinalContractData2];

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
    setProfessinalContractData(filtered);
  };
  useEffect(() => {
    filterContracts();
  }, [searchInput, sortOption]);

  const getActiveContractCount = () => {
    let count = 0;
    if (professinalContractData !== null) {
      professinalContractData.map((contract) => {
        if (contract.type === "active") {
          count++;
        }
      });
    }
    return count;
  };

  const getEndedContractCount = () => {
    let count = 0;
    if (professinalContractData !== null) {
      professinalContractData.map((contract) => {
        if (contract.type === "ended") {
          count++;
        }
      });
    }
    return count;
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
        <div className="p-[11px] lg:px-13 lg:py-7">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className={`text-3xl ${mulish600.className} mb-4`}>
                  <Tooltip title='My Contracts' arrow placement="right" componentsProps={tooltipClass}>
                My Contracts
                  </Tooltip>
              </h2>
              <div className="flex justify-start items-center flex-col md:flex-row mt-4">
                <div
                  className={`ActiveContracts ${
                    inter600.className
                    } rounded-[6px] w-full md:w-auto text-center border border-[#eee] md:border-transparent cursor-pointer ${
                    Active ? "active" : ""
                  }`}
                  onClick={handleActiveClick}
                >
                  Active Contracts ({getActiveContractCount()})
                </div>
                <div
                    className={`EndedContracts w-full rounded-[6px] md:w-auto text-center cursor-pointer border border-[#eee] md:border-transparent ${
                    Ended ? "active" : ""
                  }`}
                  onClick={handleEndedClick}
                >
                  Ended Contracts ({getEndedContractCount()})
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
                    className="w-full h-[48px] border border-[#E2E8F0] rounded-xl text-[#2D3748] text-sm p-3"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="default">Sort by </option>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                  </select>
                </div>
              </div>
              {/* ****************Active Contract**************** */}
              {Active &&
                (professinalContractData !== null ? (
                  professinalContractData.length > 0 ? (
                    professinalContractData.map((contract) => {
                      if (contract.type === "active") {
                        return (
                          <div
                            className="w-full m-auto border border-[#A6B7F4] rounded-[14px] p-[24px] mt-[20px]"
                            key={contract.id}
                          >
                            <div>
                              <div className="mb-4">
                                <Link
                                  href={`/mycontract/${contract._id}`}
                                  as={`/mycontract/${contract._id}`}
                                >
                                  <p
                                    className={`text-black ${mulish600.className} text-[21px] leading-7 cursor-pointer hover:text-btn_bg`}
                                  >
                                    {contract.contract_title}
                                  </p>
                                </Link>
                              </div>
                              <div className="flex flex-wrap gap-3 md:gap-8 ">
                                <p
                                  className={`text-[#434343] ${mulish700.className} text-[14px]`}
                                >
                                  {contract.jobs_data[0].budget_type === "Fixed"
                                    ? "Fixed Price"
                                    : "Range"}
                                </p>
                                <span className="flex">
                                  <p
                                    className={`text-[#434343] ${mulish700.className} text-[14px]`}
                                  >
                                    Budget:{" "}
                                  </p>
                                  <p
                                    className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                                  >
                                    {contract.jobs_data[0].budget_type ===
                                    "Fixed"
                                      ? `N${contract.jobs_data[0].budget_to}`
                                      : `N${contract.jobs_data[0].budget_from}-N${contract.jobs_data[0].budget_to}`}
                                  </p>
                                </span>
                                <span className="flex">
                                  <p
                                    className={`text-[#434343] ${mulish700.className} text-[14px]`}
                                  >
                                    Date started:{" "}
                                  </p>
                                  <p
                                    className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                                  >
                                    {" "}
                                    {new Date(
                                      contract.updatedAt
                                    ).toLocaleDateString("en-US", {
                                      month: "long",
                                      day: "2-digit",
                                      year: "numeric",
                                    })}
                                  </p>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    
                      <div className="text-black ml-[30%]">No contract found</div>
                    
                  )
                ) : (
                  ""
                ))}

              {/* ****************Ended Contract**************** */}

              {Ended &&
                (professinalContractData !== null ? (
                  professinalContractData.length > 0 ? (
                    professinalContractData.map((contract) => {
                      if (contract.type === "ended") {
                        return (
                          <div
                            className="w-full m-auto border border-[#A6B7F4] rounded-[14px] p-[24px] mt-[30px]"
                            key={contract.id}
                          >
                            <div className="">
                              <div className="mb-4">
                                <Link
                                  href={`/mycontract/${contract._id}`}
                                  as={`/mycontract/${contract._id}`}
                                >
                                  <p
                                    className={`text-black ${mulish600.className} text-[21px] leading-7 cursor-pointer hover:text-btn_bg`}
                                  >
                                    {contract.contract_title}
                                  </p>
                                </Link>
                              </div>
                              <div className="flex flex-wrap gap-3 md:gap-8 ">
                                <p
                                  className={`text-[#434343] ${mulish700.className} text-[14px]`}
                                >
                                  {contract.jobs_data[0].budget_type === "Fixed"
                                    ? "Fixed Price"
                                    : "Range"}
                                </p>
                                <span className="flex">
                                  <p
                                    className={`text-[#434343] ${mulish700.className} text-[14px]`}
                                  >
                                    Budget:{" "}
                                  </p>
                                  <p
                                    className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                                  >
                                    {" "}
                                    {contract.jobs_data[0].budget_type ===
                                    "Fixed"
                                      ? `N${contract.jobs_data[0].budget_to}`
                                      : `N${contract.jobs_data[0].budget_from}-N${contract.jobs_data[0].budget_to}`}
                                  </p>
                                </span>
                                <span className="flex">
                                  <p
                                    className={`text-[#434343] ${mulish700.className} text-[14px]`}
                                  >
                                    Date started:{" "}
                                  </p>
                                  <p
                                    className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                                  >
                                    {" "}
                                    {new Date(
                                      contract.updatedAt
                                    ).toLocaleDateString("en-US", {
                                      month: "long",
                                      day: "2-digit",
                                      year: "numeric",
                                    })}
                                  </p>
                                </span>
                                <span className="flex">
                                  <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                                    Date Ended:{" "}
                                  </p>
                                  <p
                                    className={`text-[#434343] ${mulish400.className} text-[14px] ml-1`}
                                  >
                                    {" "}
                                    {new Date(
                                      contract.end_date
                                    ).toLocaleDateString("en-US", {
                                      month: "long",
                                      day: "2-digit",
                                      year: "numeric",
                                    })}
                                  </p>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                      <div className="text-black ml-[30%]">No contract found</div>
                  )
                ) : (
                  ""
                ))}
            </>
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyContract;
