import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import DropdownEmail from "./DropdownEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import praikiLogo from "../../public/download.svg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState, useRef } from "react";
import { globalSearch } from "@/app/api/api";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import "./style.css";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Loader from "../common/Loader";

const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  socket:any
}) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSupportPage = () => {
    window.location.href = "/help-support";
  };

  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loaderStatus, setloaderStatus] = useState<any>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchValue === "") {
      setSearchResults(null);
      setloaderStatus(false);
    } else {
      fetchGlobalSearch();
    }
    const retrievedCookie = Cookies.get("authToken");

    if (retrievedCookie) {
      const decodedToken = jwt.decode(retrievedCookie);
      if (decodedToken) {
        setLoggedInUser(decodedToken);
      }
    } else {
      console.error("Auth token cookie not found.");
    }
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setSearchResults(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchGlobalSearch = async () => {
    try {
      const response = await globalSearch({
        search: searchValue,
        userId: loggedInUser._id,
        login_as: loggedInUser.login_as,
      });
      if (response) {
        if (response?.status == 200) {
          const verify = response?.data?.results;
          if (
            verify?.users?.length == 0 &&
            verify?.userJobs?.length == 0 &&
            verify?.myContracts?.length == 0 &&
            verify?.application?.length == 0 &&
            verify?.invitetabledata?.length == 0 &&
            verify?.overview?.length == 0 &&
            verify?.bankdetails?.length == 0 &&
            verify?.professinals?.length == 0 &&
            verify?.hiredProfessinals?.length == 0 &&
            verify?.BookmarkProfessinals?.length == 0 &&
            verify?.contractMilston?.length == 0 &&
            verify?.applicationMilston?.length == 0 &&
            verify?.overviewMilston?.length == 0
          ) {
            setSearchResults(null);
          } else {
            setSearchResults(response?.data?.results);
          }
        } else {
          setSearchResults(null);
        }
      } else {
        setSearchResults(null);
      }
      setloaderStatus(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGlobalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloaderStatus(true);
    setSearchValue(e.target.value);
  };
  const handleRoute = (type: string, id: string) => {
    if (type == "job") {
      router.push(
        loggedInUser.login_as == 1 ? `/projects/${id}` : `/findwork/${id}`
      );
    } else if (type == "contracts") {
      router.push(
        loggedInUser.login_as == 1
          ? `/clientContract/${id}`
          : `/mycontract/${id}`
      );
    } else if (type == "application") {
      router.push(loggedInUser.login_as == 1 ? "" : `/application/${id}`);
    } else if (type == "overview") {
      router.push("/overview");
    } else if (type == "bankdetails") {
      router.push("/paymentpreferences");
    } else if (type == "professional") {
      router.push("/discover");
    } else if (type == "hired") {
      router.push("/hired");
    } else if (type == "bookmarked") {
      router.push("/bookmark");
    } else if (type == "user") {
      router.push("/profile/editprofile");
    }
    setSearchValue("");
    setSearchResults(null);
  };
  return (
    <header className="sticky top-0 z-999 shadow-md ring-1 ring-black ring-opacity-50 flex w-full bg-blue_600    py-[8px] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="items-center gap-2 sm:gap-4 ml-10 hidden lg:flex w-[10rem] h-[4rem]">
        <Image src={praikiLogo} alt="alt"  />
      </div>
      <div className="flex items-center gap-2 sm:gap-4 lg:hidden ml-3 ">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          style={{ justifyContent: "left" }}
        >
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <span className="du-block absolute right-0 h-full w-full">
              <span
                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && "!w-full delay-300"
                }`}
              ></span>
              <span
                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && "delay-400 !w-full"
                }`}
              ></span>
              <span
                className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && "!w-full delay-500"
                }`}
              ></span>
            </span>
            <span className="absolute right-0 h-full w-full rotate-45">
              <span
                className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && "!h-0 !delay-[0]"
                }`}
              ></span>
              <span
                className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && "!h-0 !delay-200"
                }`}
              ></span>
            </span>
          </span>
        </button>
      </div>
      <div
        className="flex flex-grow items-center justify-between px-4 py-3  md:px-6 2xl:px-11 border-none"
        style={{ display: "flex", justifyContent: "right", gap: "20px" }}
      >
        <div className="hidden sm:block">
          <div className="relative bg-[#F7F7F7] rounded-2xl w-60 p-1 border border-black text-black">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 cursor-default"
              style={{ paddingLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faSearch as IconProp} color="black" />
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="max-w-[220px] bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 placeholder-black text-black"
              onChange={handleGlobalSearch}
              value={searchValue}
            />
          </div>

          {loaderStatus == true ? (
            <div className="search-results-container absolute h-10">
              {/* <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              </div> */}
              <Loader/>
            </div>
          ) : (
            searchResults !== null && (
              <div
                ref={searchResultsRef}
                className="search-results-container absolute"
              >
                {searchResults?.users?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>Users</p>
                    {searchResults?.users?.map((user: any, index: number) => {
                      return (
                        <div className="" key={index}>
                          {user?.userName && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Name : {user?.userName}
                            </div>
                          )}
                          {user?.email && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Email : {user?.email}
                            </div>
                          )}
                          {user?.user_timezone && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Time zone : {user?.user_timezone}
                            </div>
                          )}
                          {user?.country && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Country : {user?.country}
                            </div>
                          )}
                          {user?.phone && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Phone Number : {user?.phone}
                            </div>
                          )}
                          {user?.location && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Location : {user?.location}
                            </div>
                          )}
                          {user?.designation && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("user", user._id)}
                            >
                              Designation : {user?.designation}
                            </div>
                          )}
                          {loggedInUser.login_as == 2 && (
                            <>
                              {user?.experience_level && (
                                <div
                                  className={`cursor-pointer list ${mulish.className}`}
                                  onClick={() => handleRoute("user", user._id)}
                                >
                                  Experience Level : {user?.experience_level}
                                </div>
                              )}
                              {user?.bio_brief && (
                                <div
                                  className={`cursor-pointer list ${mulish.className}`}
                                  onClick={() => handleRoute("user", user._id)}
                                >
                                  Bio brief : {user?.bio_brief}
                                </div>
                              )}
                            </>
                          )}
                          {loggedInUser.login_as == 1 && (
                            <>
                              {user?.company_name && (
                                <div
                                  className={`cursor-pointer list ${mulish.className}`}
                                  onClick={() => handleRoute("user", user._id)}
                                >
                                  Company name : {user?.company_name}
                                </div>
                              )}
                              {user?.company_desc && (
                                <div
                                  className={`cursor-pointer list ${mulish.className}`}
                                  onClick={() => handleRoute("user", user._id)}
                                >
                                  Company Description : {user?.company_desc}
                                </div>
                              )}
                              {user?.web_address && (
                                <div
                                  className={`cursor-pointer list ${mulish.className}`}
                                  onClick={() => handleRoute("user", user._id)}
                                >
                                  Web address : {user?.web_address}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {searchResults?.userJobs?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    {searchResults?.userJobs?.length > 0 && (
                      <p className={`text-style ${inter600.className}`}>Jobs</p>
                    )}
                    {searchResults?.userJobs?.map((job: any, index: number) => {
                      return (
                        <div className="flex flex-col" key={index}>
                          {job?.job_title && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Title : {job.job_title}
                            </div>
                          )}
                          {job?.job_description && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Description : {job.job_description}
                            </div>
                          )}
                          {job?.budget_from == job?.budget_to
                            ? job?.budget_from && (
                                <div
                                  className={`cursor-pointer list ${mulish.className}`}
                                  onClick={() => handleRoute("job", job._id)}
                                >
                                  Budget : {job?.budget_from}
                                </div>
                              )
                            : (job?.budget_from || job?.budget_to) && (
                                <>
                                  {job?.budget_from && (
                                    <div
                                      className={`cursor-pointer list ${mulish.className}`}
                                      onClick={() =>
                                        handleRoute("job", job._id)
                                      }
                                    >
                                      Budget from : {job?.budget_from}
                                    </div>
                                  )}
                                  {job?.budget_to && (
                                    <div
                                      className={`cursor-pointer list ${mulish.className}`}
                                      onClick={() =>
                                        handleRoute("job", job._id)
                                      }
                                    >
                                      Budget to : {job?.budget_to}
                                    </div>
                                  )}
                                </>
                              )}
                          {job?.experience_level && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Experience level : {job?.experience_level}
                            </div>
                          )}
                          {job?.budget_type && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Budget type : {job?.budget_type}
                            </div>
                          )}
                          {job?.location && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Location : {job?.location}
                            </div>
                          )}
                          {job?.job_place && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Job place : {job?.job_place}
                            </div>
                          )}
                          {job?.cover_page_detail && (
                            <div
                              className={`cursor-pointer list ${mulish.className}`}
                              onClick={() => handleRoute("job", job._id)}
                            >
                              Cover page detail : {job?.cover_page_detail}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {searchResults?.myContracts?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Contracts
                    </p>
                    {searchResults?.myContracts?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.contract_title && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("contracts", contract._id)
                                }
                              >
                                Title : {contract?.contract_title}
                              </div>
                            )}
                            {contract?.contract_desc && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("contracts", contract._id)
                                }
                              >
                                Description : {contract?.contract_desc}
                              </div>
                            )}
                            {contract?.budget && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("contracts", contract._id)
                                }
                              >
                                Budget : {contract?.budget}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {searchResults?.application?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Applications
                    </p>
                    {searchResults?.application?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.contract_title && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("application", contract._id)
                                }
                              >
                                Title : {contract?.contract_title}
                              </div>
                            )}
                            {contract?.contract_desc && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("application", contract._id)
                                }
                              >
                                Description : {contract?.contract_desc}
                              </div>
                            )}
                            {contract?.budget && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("application", contract._id)
                                }
                              >
                                Budget : {contract?.budget}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {searchResults?.invitetabledata?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    {searchResults?.invitetabledata?.length > 0 && (
                      <p className={`text-style ${inter600.className}`}>
                        Invitations & Bookmarks
                      </p>
                    )}
                    {searchResults?.invitetabledata?.map(
                      (job: any, index: number) => {
                        return (
                          <div className="flex flex-col" key={index}>
                            {job?.job_title && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Title : {job.job_title}
                              </div>
                            )}
                            {job?.job_description && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Description : {job.job_description}
                              </div>
                            )}
                            {job?.budget_from == job?.budget_to
                              ? job?.budget_from && (
                                  <div
                                    className={`cursor-pointer list ${mulish.className}`}
                                    onClick={() => handleRoute("job", job._id)}
                                  >
                                    Budget : {job?.budget_from}
                                  </div>
                                )
                              : (job?.budget_from || job?.budget_to) && (
                                  <>
                                    {job?.budget_from && (
                                      <div
                                        className={`cursor-pointer list ${mulish.className}`}
                                        onClick={() =>
                                          handleRoute("job", job._id)
                                        }
                                      >
                                        Budget from : {job?.budget_from}
                                      </div>
                                    )}
                                    {job?.budget_to && (
                                      <div
                                        className={`cursor-pointer list ${mulish.className}`}
                                        onClick={() =>
                                          handleRoute("job", job._id)
                                        }
                                      >
                                        Budget to : {job?.budget_to}
                                      </div>
                                    )}
                                  </>
                                )}
                            {job?.experience_level && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Experience level : {job?.experience_level}
                              </div>
                            )}
                            {job?.budget_type && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Budget type : {job?.budget_type}
                              </div>
                            )}
                            {job?.location && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Location : {job?.location}
                              </div>
                            )}
                            {job?.job_place && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Job place : {job?.job_place}
                              </div>
                            )}
                            {job?.cover_page_detail && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() => handleRoute("job", job._id)}
                              >
                                Cover page detail : {job?.cover_page_detail}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {searchResults?.overview?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Overview
                    </p>
                    {searchResults?.overview?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.contract_title && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("overview", contract._id)
                                }
                              >
                                Title : {contract?.contract_title}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {searchResults?.bankdetails?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    {searchResults?.bankdetails?.length > 0 && (
                      <p className={`text-style ${inter600.className}`}>
                        Payment Preferences
                      </p>
                    )}
                    {searchResults?.bankdetails?.map(
                      (job: any, index: number) => {
                        return (
                          <div className="flex flex-col" key={index}>
                            {job?.bank_name && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Bank name : {job.bank_name}
                              </div>
                            )}
                            {job?.account_holder_name && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Holder name : {job.account_holder_name}
                              </div>
                            )}
                            {job?.bank_account && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Bank account : {job?.bank_account}
                              </div>
                            )}

                            {job?.ifsc_code && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                IFSC code : {job?.ifsc_code}
                              </div>
                            )}
                            {job?.routing_number && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Routing number : {job?.routing_number}
                              </div>
                            )}
                            {job?.swift_code && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Swift code : {job?.swift_code}
                              </div>
                            )}
                            {job?.address && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Address : {job?.address}
                              </div>
                            )}
                            {job?.country && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bankdetails", job._id)
                                }
                              >
                                Contry : {job?.country}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                {searchResults?.professinals?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Discover
                    </p>
                    {searchResults?.professinals?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.userName && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("professional", contract._id)
                                }
                              >
                                Name : {contract?.userName}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                {searchResults?.hiredProfessinals?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>Hired</p>
                    {searchResults?.hiredProfessinals?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.userName && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("hired", contract._id)
                                }
                              >
                                Name : {contract?.userName}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                {searchResults?.BookmarkProfessinals?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Bookmarked
                    </p>
                    {searchResults?.BookmarkProfessinals?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.userName && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("bookmarked", contract._id)
                                }
                              >
                                Name : {contract?.userName}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                {searchResults?.contractMilston?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Contracts/Milestones
                    </p>
                    {searchResults?.contractMilston?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.milestone_task && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("contracts", contract._id)
                                }
                              >
                                <p>Title : {contract?.contract_title}</p>
                                <p>Task name : {contract?.milestone_task}</p>
                              </div>
                            )}
                            {contract?.milestone_price && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("contracts", contract._id)
                                }
                              >
                                <p>Title : {contract?.contract_title}</p>
                                <p> Task price : {contract?.milestone_price}</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                {searchResults?.applicationMilston?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Application/Milestones
                    </p>
                    {searchResults?.applicationMilston?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.milestone_task && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("application", contract._id)
                                }
                              >
                                <p>Title : {contract?.contract_title}</p>
                                <p>Task name : {contract?.milestone_task}</p>
                              </div>
                            )}
                            {contract?.milestone_price && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("application", contract._id)
                                }
                              >
                                <p>Title : {contract?.contract_title}</p>
                                <p> Task price : {contract?.milestone_price}</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                {searchResults?.overviewMilston?.length > 0 && (
                  <div className="search-results pt-3 pb-3">
                    <p className={`text-style ${inter600.className}`}>
                      Overview/Milestones
                    </p>
                    {searchResults?.overviewMilston?.map(
                      (contract: any, index: number) => {
                        return (
                          <div className="" key={index}>
                            {contract?.milestone_task && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("overview", contract._id)
                                }
                              >
                                <p>Title : {contract?.contract_title}</p>
                                <p>Task name : {contract?.milestone_task}</p>
                              </div>
                            )}
                            {contract?.milestone_price && (
                              <div
                                className={`cursor-pointer list ${mulish.className}`}
                                onClick={() =>
                                  handleRoute("overview", contract._id)
                                }
                              >
                                <p>Title : {contract?.contract_title}</p>
                                <p> Task price : {contract?.milestone_price}</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownEmail />
            <DropdownNotification />
            <span
              onClick={handleSupportPage}
              className={`cursor-pointer list ${mulish.className}`}
            >
              <a href="/help-support">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="22"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M12.9998 23.8337C7.01948 23.8271 2.17307 18.9807 2.1665 13.0003V12.7837C2.2856 6.83025 7.18731 2.08896 13.1414 2.16797C19.0955 2.24697 23.8697 7.11664 23.8308 13.0711C23.7919 19.0256 18.9545 23.8325 12.9998 23.8337ZM12.9825 21.667H12.9998C17.7846 21.6622 21.6602 17.7808 21.6578 12.996C21.6554 8.21124 17.7759 4.33368 12.9912 4.33368C8.20639 4.33368 4.3269 8.21124 4.3245 12.996C4.32211 17.7808 8.19773 21.6622 12.9825 21.667ZM14.0832 19.5003H11.9165V17.3337H14.0832V19.5003ZM14.0832 16.2503H11.9165C11.8823 14.8395 12.6165 13.5212 13.834 12.8075C14.549 12.2593 15.1665 11.787 15.1665 10.8337C15.1665 9.63706 14.1965 8.66701 12.9998 8.66701C11.8032 8.66701 10.8332 9.63706 10.8332 10.8337H8.6665V10.7362C8.68392 9.18803 9.52594 7.76677 10.8754 7.00778C12.2248 6.24879 13.8767 6.26737 15.2087 7.05653C16.5408 7.84569 17.3506 9.28553 17.3332 10.8337C17.2556 12.0026 16.6286 13.0656 15.6432 13.6991C14.7523 14.2583 14.175 15.2026 14.0832 16.2503Z"
                    fill="white"
                  />
                </svg>
              </a>
            </span>
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
