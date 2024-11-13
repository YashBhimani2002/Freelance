import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Image from "next/image";
import "./page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBarChart,
  faBars,
  faChartColumn,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCog,
  faComment,
  faComments,
  faDotCircle,
  faMessage,
  faQuestionCircle,
  faSquarePollVertical,
  faThLarge,
  faU,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../lib/store";
import { setDashboardStatus } from "@/lib/features/todos/professionalClientSidebar";
import { Inter } from "next/font/google";
import { GetUserNameAvtar, viewProfile } from "../../app/api/api";
import Loader from "@/components/common/Loader";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
const inter = Inter({ subsets: ["latin"], weight: "400" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  socket: any;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [userData, setUserData] = useState({
    professional_profile_complete: null,
    client_profile_complete: null,
  });
  const [userName, setUserName] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const dashboard = useSelector((state) => state);
  const dispatch = useDispatch();
  const pathname = usePathname();

  let status = (dashboard as any)?.dashboard?.status;
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [openGroups, setOpenGroups] = useState<number[]>([]);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getUserData = async () => {
    try {
      const response = await GetUserNameAvtar();
      if (response?.status == 200) {
        if (response?.data?.user) {
          setUserName(response.data.user);

          dispatch(setDashboardStatus(response.data.user.login_as));
        } else {
          console.error("Invalid response or missing user data.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getviewprofile = async () => {
    try {
      const storedUserData = localStorage.getItem("user-data");
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
      if (parsedUserData?.client_profile_complete && parsedUserData?.professional_profile_complete) {
        setUserData(parsedUserData);
      } else {
        const response = await viewProfile();
        if (response?.data?.user) {
          const userDataToStore = {
            professional_profile_complete:
              response.data.user.professional_profile_complete,
            client_profile_complete: response.data.user.client_profile_complete,
          };
          localStorage.setItem("user-data", JSON.stringify(userDataToStore));
        } else {
          console.error("Invalid response or missing user data.");
        }
      }
      // if (
      //   !userData.client_profile_complete ||
      //   !userData.professional_profile_complete
      // ) {
      //   const response = await viewProfile();
      //   if (response?.data?.user) {
      //     const updatedUserData = {
      //       ...userData,
      //       professional_profile_complete:
      //         response.data.user.professional_profile_complete !== null
      //           ? response.data.user.professional_profile_complete
      //           : userData.professional_profile_complete,
      //       client_profile_complete:
      //         response.data.user.client_profile_complete !== null
      //           ? response.data.user.client_profile_complete
      //           : userData.client_profile_complete,
      //     };

      //     if (
      //       updatedUserData.professional_profile_complete !== null ||
      //       updatedUserData.client_profile_complete !== null
      //     ) {
      //       localStorage.setItem("user-data", JSON.stringify(updatedUserData));
      //     }
      //   } else {
      //     console.error("Invalid response or missing user data.");
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getviewprofile();
    getUserData();
  }, []);

  const handleGroupClick = (groupId: number) => {
    if (openGroups.includes(groupId)) {
      setOpenGroups(openGroups.filter((group) => group !== groupId));
    } else {
      setOpenGroups([...openGroups, groupId]);
    }
  };
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sidebarOpen]);

  const handleSupportPage = () => {
    window.location.href = "/help-support";
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
          color: (theme: {
            palette: {
              background: { paper: string };
              text: {
                primary: string;
              };
            };
          }) => theme.palette.background.paper,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: (theme: {
            palette: {
              background: { paper: string };
              text: {
                primary: string;
              };
            };
          }) => theme.palette.background.paper,
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <aside
        ref={sidebar}
        className={`${
          inter.className
        } absolute left-[0px] top-auto z-1 lg:z-0 flex  flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-[1px_1px_44px_-24px_rgba(0,0,0,0.5)] aside_width ${
          collapseStatus ? "lg:w-20" : "lg:w-[320px]"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-2 pl-[0.8rem] ${
            collapseStatus && "lg:pl-[1rem]"
          } pr-4 py-5.5 border-b border-gray_300`}
        >
          <Link
            ref={trigger}
            className="flex flex-1 items-center gap-4"
            href="#"
          >
            <div className="flex flex-1 items-center gap-4">
              <div className="h-12 w-12 rounded-full">
                <img
                  className="rounded-full h-[50px] w-[50px]"
                  src={
                    userName?.avatar
                      ? `${url}/public/uploads/profile_attachments/${
                          userName?.avatar
                        }?${new Date().getTime()}`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="User"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    const target = e.target;
                    if (target instanceof HTMLImageElement) {
                      target.src =
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                    }
                  }}
                />
              </div>

              <span
                className={`text-left  lg:${
                  collapseStatus ? "hidden" : "block"
                }`}
              >
                <span className="block text-base text-black">
                  {userName &&
                    userName.first_name &&
                    `${userName.first_name}${
                      userName.last_name ? ` ${userName.last_name}` : ""
                    }`}
                </span>
                <span className="block text-base font-normal"></span>
              </span>
            </div>
            <div
              className={`hidden lg:${
                collapseStatus ? "hidden" : "flex"
              } justify-end`}
              onClick={() => {
                setCollapseStatus(true);
              }}
            >
              <FontAwesomeIcon icon={faBars} color="#0969D4" />
            </div>
          </Link>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-1 py-1  ">
            <div>
              <ul className="mb-6 flex flex-col gap-2">
                {status == 2 ? (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/" || pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href=""
                            className={`group hover:cursor-pointer relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black  duration-300 ease-in-out$ ${
                              open &&
                              `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                            } justify-start lg:${
                              collapseStatus &&
                              "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sidebarExpanded) {
                                handleClick();
                                setCollapseStatus(false);
                              } else {
                                setSidebarExpanded(true);
                              }
                            }}
                          >
                            <div
                              className={`lg:${
                                collapseStatus && "flex w-[100%] justify-center"
                              }`}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ fontSize: "13px" }}
                              >
                                <path
                                  d="M1 1H7V7H1V1ZM11 1H17V7H11V1ZM1 11H7V17H1V11ZM11 14C11 14.7956 11.3161 15.5587 11.8787 16.1213C12.4413 16.6839 13.2044 17 14 17C14.7956 17 15.5587 16.6839 16.1213 16.1213C16.6839 15.5587 17 14.7956 17 14C17 13.2044 16.6839 12.4413 16.1213 11.8787C15.5587 11.3161 14.7956 11 14 11C13.2044 11 12.4413 11.3161 11.8787 11.8787C11.3161 12.4413 11 13.2044 11 14Z"
                                  stroke="#0969D4"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <Tooltip
                              title="Timeline"
                              placement="right"
                              arrow
                              componentsProps={tooltipClass}
                              className={`lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            >
                              <p>Timeline</p>
                            </Tooltip>
                            <FontAwesomeIcon
                              icon={
                                open
                                  ? (faChevronDown as IconProp)
                                  : (faChevronLeft as IconProp)
                              }
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-sidebarTextColor lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            ></FontAwesomeIcon>
                          </Link>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open
                                ? "hidden"
                                : `lg:${
                                    collapseStatus && "hidden"
                                  } bg-sidbarseleclistcolor`
                            }`}
                          >
                            <ul className="mt-1 mb-1 flex flex-col pl-[1.5rem] border_style">
                              <li onClick={() => router.push("/findwork")}>
                                <div
                                  className={`${
                                    pathname === "/findwork"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[1.1rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/findwork"
                                  className={`group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/findwork" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  }`}
                                >
                                  <Tooltip
                                    title="Search and apply for jobs."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Find Work</p>
                                  </Tooltip>
                                </Link>
                              </li>
                              <li onClick={() => router.push("/mycontract")}>
                                <div
                                  className={`${
                                    pathname === "/mycontract"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[4.55rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/mycontract"
                                  className={`group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/mycontract" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  }`}
                                >
                                  <Tooltip
                                    title="View your contracts."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>My Contracts</p>
                                  </Tooltip>
                                </Link>
                              </li>
                              <li onClick={() => router.push("/application")}>
                                <div
                                  className={`${
                                    pathname === "/application"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[8rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/application"
                                  className={`group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/application" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  }`}
                                >
                                  <Tooltip
                                    title="Track your job applications."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Applications</p>
                                  </Tooltip>
                                </Link>
                              </li>
                              <li
                                onClick={() =>
                                  router.push("/invitation&bookmark")
                                }
                              >
                                <div
                                  className={`${
                                    pathname === "/invitation&bookmark"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[11.5rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/invitation&bookmark"
                                  className={`group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/invitation&bookmark" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="See invitations and saved jobs."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Invitations & Bookmarks</p>
                                  </Tooltip>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/" || pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black  duration-300 ease-in-out$ ${
                              open &&
                              `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                            } lg:${
                              collapseStatus &&
                              "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sidebarExpanded) {
                                handleClick();
                                setCollapseStatus(false);
                              } else {
                                setSidebarExpanded(true);
                              }
                            }}
                          >
                            <div
                              className={`lg:${
                                collapseStatus && "flex w-[100%] justify-center"
                              }`}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ fontSize: "13px" }}
                              >
                                <path
                                  d="M1 1H7V7H1V1ZM11 1H17V7H11V1ZM1 11H7V17H1V11ZM11 14C11 14.7956 11.3161 15.5587 11.8787 16.1213C12.4413 16.6839 13.2044 17 14 17C14.7956 17 15.5587 16.6839 16.1213 16.1213C16.6839 15.5587 17 14.7956 17 14C17 13.2044 16.6839 12.4413 16.1213 11.8787C15.5587 11.3161 14.7956 11 14 11C13.2044 11 12.4413 11.3161 11.8787 11.8787C11.3161 12.4413 11 13.2044 11 14Z"
                                  stroke="#0969D4"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <Tooltip
                              title="Browse available projects."
                              placement="right"
                              arrow
                              componentsProps={tooltipClass}
                              className={`lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            >
                              <p>Projects</p>
                            </Tooltip>
                            <FontAwesomeIcon
                              icon={
                                open
                                  ? (faChevronDown as IconProp)
                                  : (faChevronLeft as IconProp)
                              }
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-sidebarTextColor lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            ></FontAwesomeIcon>
                          </Link>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open
                                ? "hidden"
                                : `lg:${
                                    collapseStatus && "hidden"
                                  } bg-sidbarseleclistcolor`
                            }`}
                          >
                            <ul className="mt-1 mb-1 flex flex-col pl-[1.5rem] border_style_p">
                              <div
                                className={`${
                                  pathname === "/projects"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[0.7rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li
                                onClick={() => router.push("/projects")}
                                className={`cursor-pointer group relative flex items-center gap-2.5 pl-[1.27rem] pr-4 py-[11px] font-medium duration-300 ease-in-out hover:text-selectedfontcolor ${
                                  pathname === "/projects" &&
                                  `text-selectedfontcolor ${inter700.className}`
                                } `}
                              >
                                <Tooltip
                                  title="View your ongoing and past projects."
                                  placement="right"
                                  arrow
                                  componentsProps={tooltipClass}
                                >
                                  <p>Your Projects</p>
                                </Tooltip>
                              </li>
                              <div
                                className={`${
                                  pathname === "/job_posting"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[3.6rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li>
                                <div
                                  onClick={() => router.push("/job_posting")}
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/job_posting" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="Start a new project."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Post a Project</p>
                                  </Tooltip>
                                </div>
                              </li>
                              <div
                                className={`${
                                  pathname === "/clientContract"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[6.5rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li
                                onClick={() => router.push("/clientContract")}
                              >
                                <div
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/clientContract" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  }`}
                                >
                                  <Tooltip
                                    title="Manage your contracts and agreements."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Contracts</p>
                                  </Tooltip>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                )}
                {status == 1 ? (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/" || pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black  duration-300 ease-in-out$ ${
                              open &&
                              `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                            } lg:${
                              collapseStatus &&
                              "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sidebarExpanded) {
                                handleClick();
                                setCollapseStatus(false);
                              } else {
                                setSidebarExpanded(true);
                              }
                            }}
                          >
                            <div
                              className={`lg:${
                                collapseStatus && "flex w-[100%] justify-center"
                              }`}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ fontSize: "13px" }}
                              >
                                <path
                                  d="M1 15L0.25 15L1 15ZM5 11L5 10.25L5 11ZM13 11V10.25V11ZM1.75 15C1.75 14.138 2.09241 13.3114 2.7019 12.7019L1.64124 11.6412C0.750445 12.532 0.25 13.7402 0.25 15H1.75ZM2.7019 12.7019C3.3114 12.0924 4.13805 11.75 5 11.75L5 10.25C3.74022 10.25 2.53204 10.7504 1.64124 11.6412L2.7019 12.7019ZM5 11.75H13V10.25H5V11.75ZM13 11.75C13.862 11.75 14.6886 12.0924 15.2981 12.7019L16.3588 11.6412C15.468 10.7504 14.2598 10.25 13 10.25L13 11.75ZM15.2981 12.7019C15.9076 13.3114 16.25 14.138 16.25 15H17.75C17.75 13.7402 17.2496 12.532 16.3588 11.6412L15.2981 12.7019ZM16.25 15C16.25 15.3315 16.1183 15.6495 15.8839 15.8839L16.9445 16.9445C17.4603 16.4288 17.75 15.7293 17.75 15H16.25ZM15.8839 15.8839C15.6495 16.1183 15.3315 16.25 15 16.25V17.75C15.7293 17.75 16.4288 17.4603 16.9445 16.9445L15.8839 15.8839ZM15 16.25H3V17.75H15V16.25ZM3 16.25C2.66848 16.25 2.35054 16.1183 2.11612 15.8839L1.05546 16.9445C1.57118 17.4603 2.27065 17.75 3 17.75V16.25ZM2.11612 15.8839C1.8817 15.6495 1.75 15.3315 1.75 15L0.25 15C0.25 15.7293 0.539731 16.4288 1.05546 16.9445L2.11612 15.8839ZM11.25 4C11.25 5.24264 10.2426 6.25 9 6.25V7.75C11.0711 7.75 12.75 6.07107 12.75 4H11.25ZM9 6.25C7.75736 6.25 6.75 5.24264 6.75 4H5.25C5.25 6.07107 6.92893 7.75 9 7.75V6.25ZM6.75 4C6.75 2.75736 7.75736 1.75 9 1.75V0.25C6.92893 0.25 5.25 1.92893 5.25 4H6.75ZM9 1.75C10.2426 1.75 11.25 2.75736 11.25 4H12.75C12.75 1.92893 11.0711 0.25 9 0.25V1.75Z"
                                  fill="#0969D4"
                                />
                              </svg>
                            </div>
                            <Tooltip
                              title="Explore and connect with professionals."
                              placement="right"
                              arrow
                              componentsProps={tooltipClass}
                              className={`lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            >
                              <p>Professionals</p>
                            </Tooltip>
                            <FontAwesomeIcon
                              icon={
                                open
                                  ? (faChevronDown as IconProp)
                                  : (faChevronLeft as IconProp)
                              }
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-sidebarTextColor lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            ></FontAwesomeIcon>
                          </Link>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open
                                ? "hidden"
                                : `lg:${
                                    collapseStatus && "hidden"
                                  } bg-sidbarseleclistcolor`
                            }`}
                          >
                            <ul className="mt-1 mb-1 flex flex-col pl-[1.5rem] border_style_p">
                              <div
                                className={`${
                                  pathname === "/discover"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[0.8rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li onClick={() => router.push("/discover")}>
                                <div
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/discover" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="Find new opportunities and talent."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Discover</p>
                                  </Tooltip>
                                </div>
                              </li>
                              <div
                                className={`${
                                  pathname === "/hired" ? `absolute` : "hidden"
                                } duration-300 ease-in-out top-[3.6rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li onClick={() => router.push("/hired")}>
                                <div
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/hired" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="Review professionals you’ve hired."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Hired</p>
                                  </Tooltip>
                                </div>
                              </li>
                              <div
                                className={`${
                                  pathname === "/bookmark"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[6.5rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li onClick={() => router.push("/bookmark")}>
                                <div
                                  onClick={() => router.push("/bookmark")}
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium  duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/bookmark" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="View your saved projects and profiles."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Bookmarked</p>
                                  </Tooltip>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                  ""
                )}

                {status == 2 ? (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/forms" || pathname.includes("forms")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out ${
                              open &&
                              `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                            } lg:${
                              collapseStatus &&
                              "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sidebarExpanded) {
                                handleClick();
                                setCollapseStatus(false);
                              } else {
                                setSidebarExpanded(true);
                              }
                            }}
                          >
                            {/* <FontAwesomeIcon icon={faChartColumn as IconProp} /> */}
                            <div
                              className={`lg:${
                                collapseStatus && "flex w-[100%] justify-center"
                              }`}
                            >
                              <svg
                                width="19"
                                height="18"
                                viewBox="0 0 19 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ fontSize: "13px" }}
                              >
                                <path
                                  d="M17.8093 12.781V14.5482C17.8093 14.8701 17.746 15.189 17.6228 15.4864C17.4996 15.7839 17.3191 16.0542 17.0914 16.2819C16.8638 16.5095 16.5935 16.6901 16.2961 16.8134C15.9986 16.9366 15.6798 17 15.3579 17H3.45137C3.12939 17.0002 2.81051 16.937 2.51299 16.8139C2.21547 16.6908 1.94514 16.5102 1.71747 16.2825C1.48979 16.0549 1.30923 15.7845 1.18612 15.487C1.06301 15.1895 0.999767 14.8706 1 14.5486V7.26352C1 6.61338 1.25827 5.98986 1.71799 5.53014C2.17771 5.07042 2.80123 4.81215 3.45137 4.81215H15.3579C16.0079 4.81251 16.6312 5.07089 17.0909 5.53053C17.5505 5.99018 17.8089 6.61349 17.8093 7.26352V9.03071M15.6584 4.83174L15.0116 2.60249L6.37013 4.81304M13.2867 3.04362L12.3456 1L4.72847 4.81304M12.6083 8.87759H17.2511C17.5453 8.87782 17.8273 8.99483 18.0353 9.20291C18.2433 9.41098 18.3602 9.69311 18.3603 9.98731V11.8257C18.3602 12.12 18.2433 12.4022 18.0352 12.6103C17.8271 12.8184 17.5449 12.9353 17.2506 12.9355H12.6078C12.211 12.9351 11.8304 12.7773 11.5498 12.4966C11.2693 12.2159 11.1115 11.8353 11.1113 11.4385V10.3746C11.1115 9.97763 11.2693 9.597 11.55 9.31631C11.8307 9.03562 12.2113 8.87782 12.6083 8.87759ZM14.0002 10.9065C14.0002 11.4432 13.5652 11.8783 13.0285 11.8783C12.4918 11.8783 12.0568 11.4432 12.0568 10.9065C12.0568 10.3698 12.4918 9.93479 13.0285 9.93479C13.5652 9.93479 14.0002 10.3698 14.0002 10.9065Z"
                                  stroke="#0969D4"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <Tooltip
                              title="Check your earnings."
                              placement="right"
                              arrow
                              componentsProps={tooltipClass}
                              className={`lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            >
                              <p>Earnings</p>
                            </Tooltip>
                            <FontAwesomeIcon
                              icon={
                                open
                                  ? (faChevronDown as IconProp)
                                  : (faChevronLeft as IconProp)
                              }
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-sidebarTextColor lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            ></FontAwesomeIcon>
                          </Link>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open
                                ? "hidden"
                                : `lg:${
                                    collapseStatus && "hidden"
                                  } bg-sidbarseleclistcolor`
                            }`}
                          >
                            <ul className="mt-1 mb-1 flex flex-col pl-[1.5rem] border_style">
                              <li onClick={() => router.push("/overview")}>
                                <div
                                  className={`${
                                    pathname === "/overview"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[1.1rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/overview"
                                  className={`first-letter:group relative flex items-center gap-3.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/overview" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  }`}
                                >
                                  <Tooltip
                                    title="View your earnings summary."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Overview</p>
                                  </Tooltip>
                                </Link>
                              </li>
                              <li
                                onClick={() =>
                                  router.push("/transactionhistory")
                                }
                              >
                                <div
                                  className={`${
                                    pathname === "/transactionhistory"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[4.5rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/transactionhistory"
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/transactionhistory" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="See your payment records."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Transaction History</p>
                                  </Tooltip>
                                </Link>
                              </li>
                              {/* <li
                                onClick={() =>
                                  router.push("/paymentpreferences")
                                }
                              >
                                <div
                                  className={`${
                                    pathname === "/paymentpreferences"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[8rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>
                                <Link
                                  href="/paymentpreferences"
                                  className={`first-letter:group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/paymentpreferences" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="Set your payment methods."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Payment Preferences</p>
                                  </Tooltip>
                                </Link>
                              </li> */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/forms" || pathname.includes("forms")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out ${
                              open &&
                              `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                            } lg:${
                              collapseStatus &&
                              "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (sidebarExpanded) {
                                handleClick();
                                setCollapseStatus(false);
                              } else {
                                setSidebarExpanded(true);
                              }
                            }}
                          >
                            <div
                              className={`lg:${
                                collapseStatus && "flex w-[100%] justify-center"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={faSquarePollVertical as IconProp}
                                color="#0969D4"
                                fontSize="20px"
                              ></FontAwesomeIcon>
                            </div>
                            <Tooltip
                              title="Manage your financial records"
                              placement="right"
                              arrow
                              componentsProps={tooltipClass}
                              className={`lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            >
                              <p>Financials</p>
                            </Tooltip>
                            <FontAwesomeIcon
                              icon={
                                open
                                  ? (faChevronDown as IconProp)
                                  : (faChevronLeft as IconProp)
                              }
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-sidebarTextColor lg:${
                                collapseStatus ? "hidden" : "block"
                              }`}
                            ></FontAwesomeIcon>
                          </Link>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open
                                ? "hidden"
                                : `lg:${
                                    collapseStatus && "hidden"
                                  } bg-sidbarseleclistcolor`
                            }`}
                          >
                            <ul className="mt-1 mb-1 flex flex-col pl-[1.5rem] border_style_p">
                              <div
                                className={`${
                                  pathname === "/transactionhistory"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[0.8rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              <li
                                onClick={() =>
                                  router.push("/transactionhistory")
                                }
                              >
                                <div
                                  className={`cursor-pointer first-letter:group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/forms/form-elements" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="View your past transactions."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Transaction History</p>
                                  </Tooltip>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                )}
                <li onClick={() => router.push("/message")}>
                  <div
                    className={`cursor-pointer group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out ${
                      pathname.includes("message") &&
                      `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                    } lg:${
                      collapseStatus &&
                      "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                    }`}
                  >
                    <div
                      className={`lg:${
                        collapseStatus && "flex w-[100%] justify-center"
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ fontSize: "13px" }}
                      >
                        <path
                          d="M12 13V15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16H4L1 19V9C1 8.73478 1.10536 8.48043 1.29289 8.29289C1.48043 8.10536 1.73478 8 2 8H4M19 12L16 9H9C8.73478 9 8.48043 8.89464 8.29289 8.70711C8.10536 8.51957 8 8.26522 8 8V2C8 1.73478 8.10536 1.48043 8.29289 1.29289C8.48043 1.10536 8.73478 1 9 1H18C18.2652 1 18.5196 1.10536 18.7071 1.29289C18.8946 1.48043 19 1.73478 19 2V12Z"
                          stroke="#0969D4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <Tooltip
                      title="View and send messages."
                      placement="right"
                      arrow
                      componentsProps={tooltipClass}
                      className={`lg:${collapseStatus ? "hidden" : "block"}`}
                    >
                      <p>Messages</p>
                    </Tooltip>
                  </div>
                </li>
                {status == 2 ? (
                  <li onClick={() => router.push("/profile")}>
                    <Link
                      href="/profile"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out  ${
                        pathname.includes("profile") &&
                        `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                      } lg:${
                        collapseStatus &&
                        "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                      }`}
                    >
                      {/* <FontAwesomeIcon
                        icon={faUserAlt as IconProp}
                        color={`${
                          pathname.includes("profile") ? "#1068ad" : "black"
                        }`}
                      ></FontAwesomeIcon> */}
                      <div
                        className={`lg:${
                          collapseStatus && "flex w-[100%] justify-center"
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ fontSize: "13px" }}
                        >
                          <path
                            d="M1 15L0.25 15L1 15ZM5 11L5 10.25L5 11ZM13 11V10.25V11ZM1.75 15C1.75 14.138 2.09241 13.3114 2.7019 12.7019L1.64124 11.6412C0.750445 12.532 0.25 13.7402 0.25 15H1.75ZM2.7019 12.7019C3.3114 12.0924 4.13805 11.75 5 11.75L5 10.25C3.74022 10.25 2.53204 10.7504 1.64124 11.6412L2.7019 12.7019ZM5 11.75H13V10.25H5V11.75ZM13 11.75C13.862 11.75 14.6886 12.0924 15.2981 12.7019L16.3588 11.6412C15.468 10.7504 14.2598 10.25 13 10.25L13 11.75ZM15.2981 12.7019C15.9076 13.3114 16.25 14.138 16.25 15H17.75C17.75 13.7402 17.2496 12.532 16.3588 11.6412L15.2981 12.7019ZM16.25 15C16.25 15.3315 16.1183 15.6495 15.8839 15.8839L16.9445 16.9445C17.4603 16.4288 17.75 15.7293 17.75 15H16.25ZM15.8839 15.8839C15.6495 16.1183 15.3315 16.25 15 16.25V17.75C15.7293 17.75 16.4288 17.4603 16.9445 16.9445L15.8839 15.8839ZM15 16.25H3V17.75H15V16.25ZM3 16.25C2.66848 16.25 2.35054 16.1183 2.11612 15.8839L1.05546 16.9445C1.57118 17.4603 2.27065 17.75 3 17.75V16.25ZM2.11612 15.8839C1.8817 15.6495 1.75 15.3315 1.75 15L0.25 15C0.25 15.7293 0.539731 16.4288 1.05546 16.9445L2.11612 15.8839ZM11.25 4C11.25 5.24264 10.2426 6.25 9 6.25V7.75C11.0711 7.75 12.75 6.07107 12.75 4H11.25ZM9 6.25C7.75736 6.25 6.75 5.24264 6.75 4H5.25C5.25 6.07107 6.92893 7.75 9 7.75V6.25ZM6.75 4C6.75 2.75736 7.75736 1.75 9 1.75V0.25C6.92893 0.25 5.25 1.92893 5.25 4H6.75ZM9 1.75C10.2426 1.75 11.25 2.75736 11.25 4H12.75C12.75 1.92893 11.0711 0.25 9 0.25V1.75Z"
                            fill="#0969D4"
                          />
                        </svg>
                      </div>
                      <Tooltip
                        title="Manage your profile."
                        placement="right"
                        arrow
                        componentsProps={tooltipClass}
                        className={`lg:${collapseStatus ? "hidden" : "block"}`}
                      >
                        <p>Profile</p>
                      </Tooltip>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/ui" || pathname.includes("ui")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out ${
                            open &&
                            `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                          } lg:${
                            collapseStatus &&
                            "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (sidebarExpanded) {
                              handleClick();
                              setCollapseStatus(false);
                            } else {
                              setSidebarExpanded(true);
                            }
                          }}
                        >
                          <div
                            className={`lg:${
                              collapseStatus && "flex w-[100%] justify-center"
                            }`}
                          >
                            <svg
                              width="19"
                              height="20"
                              viewBox="0 0 19 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ fontSize: "13px" }}
                            >
                              <path
                                d="M9.5 12.7C10.9937 12.7 12.2047 11.4912 12.2047 10C12.2047 8.50883 10.9937 7.3 9.5 7.3C8.00626 7.3 6.79534 8.50883 6.79534 10C6.79534 11.4912 8.00626 12.7 9.5 12.7Z"
                                stroke="#0969D4"
                                stroke-width="1.5"
                              />
                              <path
                                d="M11.0912 1.1368C10.7604 1 10.3402 1 9.5 1C8.65975 1 8.23963 1 7.90876 1.1368C7.68985 1.22726 7.49094 1.35991 7.3234 1.52715C7.15587 1.6944 7.023 1.89296 6.93238 2.1115C6.84944 2.3122 6.81608 2.5471 6.80346 2.8882C6.79759 3.13474 6.72917 3.37576 6.60461 3.58872C6.48005 3.80168 6.30342 3.97962 6.09123 4.1059C5.87559 4.22629 5.63287 4.29011 5.3858 4.29136C5.13872 4.29262 4.89536 4.23129 4.6785 4.1131C4.37558 3.9529 4.1565 3.8647 3.93923 3.8359C3.4653 3.77368 2.98602 3.90188 2.60673 4.1923C2.32365 4.411 2.11268 4.7737 1.69256 5.5C1.27244 6.2263 1.06147 6.589 1.01549 6.9445C0.984511 7.17891 1.00009 7.41711 1.06135 7.64551C1.12261 7.8739 1.22834 8.08801 1.37251 8.2756C1.50594 8.4484 1.69256 8.5933 1.98196 8.7751C2.40839 9.0424 2.68246 9.4978 2.68246 10C2.68246 10.5022 2.40839 10.9576 1.98196 11.224C1.69256 11.4067 1.50504 11.5516 1.37251 11.7244C1.22834 11.912 1.12261 12.1261 1.06135 12.3545C1.00009 12.5829 0.984511 12.8211 1.01549 13.0555C1.06237 13.4101 1.27244 13.7737 1.69166 14.5C2.11268 15.2263 2.32274 15.589 2.60673 15.8077C2.79465 15.9516 3.00913 16.0572 3.23791 16.1183C3.4667 16.1795 3.70532 16.195 3.94013 16.1641C4.1565 16.1353 4.37558 16.0471 4.6785 15.8869C4.89536 15.7687 5.13872 15.7074 5.3858 15.7086C5.63287 15.7099 5.87559 15.7737 6.09123 15.8941C6.52668 16.1461 6.78543 16.6096 6.80346 17.1118C6.81608 17.4538 6.84854 17.6878 6.93238 17.8885C7.023 18.107 7.15587 18.3056 7.3234 18.4728C7.49094 18.6401 7.68985 18.7727 7.90876 18.8632C8.23963 19 8.65975 19 9.5 19C10.3402 19 10.7604 19 11.0912 18.8632C11.3102 18.7727 11.5091 18.6401 11.6766 18.4728C11.8441 18.3056 11.977 18.107 12.0676 17.8885C12.1506 17.6878 12.1839 17.4538 12.1965 17.1118C12.2146 16.6096 12.4733 16.1452 12.9088 15.8941C13.1244 15.7737 13.3671 15.7099 13.6142 15.7086C13.8613 15.7074 14.1046 15.7687 14.3215 15.8869C14.6244 16.0471 14.8435 16.1353 15.0599 16.1641C15.2947 16.195 15.5333 16.1795 15.7621 16.1183C15.9909 16.0572 16.2054 15.9516 16.3933 15.8077C16.6773 15.5899 16.8873 15.2263 17.3074 14.5C17.7276 13.7737 17.9385 13.411 17.9845 13.0555C18.0155 12.8211 17.9999 12.5829 17.9386 12.3545C17.8774 12.1261 17.7717 11.912 17.6275 11.7244C17.4941 11.5516 17.3074 11.4067 17.018 11.2249C16.807 11.0966 16.6321 10.9169 16.5095 10.7026C16.387 10.4884 16.321 10.2467 16.3175 10C16.3175 9.4978 16.5916 9.0424 17.018 8.776C17.3074 8.5933 17.495 8.4484 17.6275 8.2756C17.7717 8.08801 17.8774 7.8739 17.9386 7.64551C17.9999 7.41711 18.0155 7.17891 17.9845 6.9445C17.9376 6.5899 17.7276 6.2263 17.3083 5.5C16.8873 4.7737 16.6773 4.411 16.3933 4.1923C16.2054 4.04838 15.9909 3.94283 15.7621 3.88168C15.5333 3.82053 15.2947 3.80497 15.0599 3.8359C14.8435 3.8647 14.6244 3.9529 14.3206 4.1131C14.1038 4.23113 13.8607 4.29238 13.6138 4.29112C13.3669 4.28986 13.1243 4.22613 12.9088 4.1059C12.6966 3.97962 12.5199 3.80168 12.3954 3.58872C12.2708 3.37576 12.2024 3.13474 12.1965 2.8882C12.1839 2.5462 12.1515 2.3122 12.0676 2.1115C11.977 1.89296 11.8441 1.6944 11.6766 1.52715C11.5091 1.35991 11.3102 1.22726 11.0912 1.1368Z"
                                stroke="#0969D4"
                                stroke-width="1.5"
                              />
                            </svg>
                          </div>
                          <Tooltip
                            title="Adjust your preferences."
                            placement="right"
                            arrow
                            componentsProps={tooltipClass}
                            className={`lg:${
                              collapseStatus ? "hidden" : "block"
                            }`}
                          >
                            <p>Settings</p>
                          </Tooltip>
                          <FontAwesomeIcon
                            icon={
                              open
                                ? (faChevronDown as IconProp)
                                : (faChevronLeft as IconProp)
                            }
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-sidebarTextColor lg:${
                              collapseStatus ? "hidden" : "block"
                            }`}
                          ></FontAwesomeIcon>
                        </Link>
                        <div
                          className={`translate transform overflow-hidden ${
                            !open
                              ? "hidden"
                              : `lg:${
                                  collapseStatus && "hidden"
                                } bg-sidbarseleclistcolor`
                          }`}
                        >
                          <ul className="mt-1 mb-1 flex flex-col pl-[1.5rem] border_style">
                            <li>
                              <Link href="/account_setting">
                                <div
                                  className={`${
                                    pathname === "/account_setting"
                                      ? `absolute`
                                      : "hidden"
                                  } duration-300 ease-in-out top-[1.1rem] left-[1.28rem] z-2`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    fontSize={8}
                                    color="#0969D4"
                                  />
                                </div>

                                <div
                                  className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black duration-300 ease-in-out hover:text-selectedfontcolor ${
                                    pathname === "/account_setting" &&
                                    `text-selectedfontcolor ${inter700.className}`
                                  } `}
                                >
                                  <Tooltip
                                    title="Manage your account details."
                                    placement="right"
                                    arrow
                                    componentsProps={tooltipClass}
                                  >
                                    <p>Account Settings</p>
                                  </Tooltip>
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() =>
                                router.push("/identity_verification")
                              }
                            >
                              <div
                                className={`${
                                  pathname === "/identity_verification"
                                    ? `absolute`
                                    : "hidden"
                                } duration-300 ease-in-out top-[4.6rem] left-[1.28rem] z-2`}
                              >
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  fontSize={8}
                                  color="#0969D4"
                                />
                              </div>
                              {/* <div
                                className={`cursor-pointer group relative flex items-center gap-2.5 rounded-md pl-[1.27rem] pr-4 py-[11px] font-medium text-black duration-300 ease-in-out hover:text-selectedfontcolor ${
                                  pathname === "/identity_verification" &&
                                  `text-selectedfontcolor ${inter700.className}`
                                } `}
                              >
                                <Tooltip
                                  title="Confirm your identity securely."
                                  placement="right"
                                  arrow
                                  componentsProps={tooltipClass}
                                >
                                  <p>Identity Verification</p>
                                </Tooltip>
                              </div> */}
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                <li onClick={handleSupportPage} className="cursor-pointer">
                  <a href="/help-support">
                    <div
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out  ${
                        pathname.includes("calender") &&
                        `text-selectedfontcolor bg-sidbarselectcolor ${inter700.className}`
                      } lg:${
                        collapseStatus &&
                        "justify-center hover:bg-white hover:shadow-card-3 hover:shadow-btn_border hover:mx-1"
                      }`}
                    >
                      <div
                        className={`lg:${
                          collapseStatus && "flex w-[100%] justify-center"
                        }`}
                      >
                        <svg
                          width="16"
                          height="18"
                          viewBox="0 0 16 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ fontSize: "13px" }}
                        >
                          <path
                            d="M9.53813 16.0431H8C5.7728 16.0431 3.88267 15.2648 2.3296 13.7083C0.776533 12.1518 0 10.2576 0 8.02583C0 5.79406 0.776178 3.89847 2.32853 2.33908C3.88089 0.779695 5.77067 0 7.99787 0C9.11147 0 10.1532 0.208917 11.1232 0.62675C12.0932 1.04387 12.9404 1.61572 13.6651 2.34229C14.3897 3.06887 14.96 3.91701 15.376 4.88673C15.792 5.85645 16 6.90139 16 8.02155C16 10.0679 15.4759 11.9446 14.4277 13.6516C13.3796 15.3586 12.0452 16.7775 10.4245 17.9084C10.3292 17.9633 10.2332 17.9936 10.1365 17.9993C10.0412 18.0043 9.94987 17.9829 9.8624 17.9351C9.77493 17.8873 9.70525 17.8264 9.65333 17.7522C9.60142 17.6781 9.57333 17.5843 9.56907 17.4709L9.53813 16.0431ZM10.6667 16.4174C11.9289 15.3479 12.9557 14.0958 13.7472 12.6612C14.5387 11.2266 14.934 9.68005 14.9333 8.02155C14.9333 6.07855 14.262 4.43431 12.9195 3.08883C11.5769 1.74335 9.93707 1.07025 8 1.06954C6.06293 1.06883 4.42311 1.74192 3.08053 3.08883C1.73796 4.43574 1.06667 6.07998 1.06667 8.02155C1.06667 9.96312 1.73796 11.6077 3.08053 12.9553C4.42311 14.303 6.06293 14.9757 8 14.9736H10.6667V16.4174ZM8.0384 13.4452C8.256 13.4452 8.44089 13.3682 8.59307 13.2142C8.74524 13.0602 8.82098 12.8737 8.82027 12.6548C8.81956 12.4359 8.74276 12.2505 8.58987 12.0986C8.43698 11.9468 8.25102 11.8705 8.032 11.8698C7.81298 11.869 7.62809 11.9464 7.47733 12.1018C7.32658 12.2573 7.25049 12.4437 7.24907 12.6612C7.24764 12.8787 7.32444 13.0641 7.47947 13.2174C7.63449 13.3707 7.8208 13.4466 8.0384 13.4452ZM5.82293 5.56375C5.94667 5.61152 6.07004 5.60831 6.19307 5.55412C6.31609 5.49993 6.41671 5.41259 6.49493 5.29208C6.64071 5.05108 6.84764 4.85856 7.11573 4.71453C7.38382 4.57193 7.69244 4.50063 8.0416 4.50063C8.56498 4.50063 8.99058 4.63788 9.3184 4.9124C9.64622 5.18691 9.80978 5.5584 9.80907 6.02686C9.80907 6.31635 9.73902 6.5873 9.59893 6.83971C9.45884 7.09141 9.21991 7.3866 8.88213 7.72529C8.42418 8.17236 8.09529 8.55596 7.89547 8.87611C7.69565 9.19626 7.59609 9.50714 7.5968 9.80875C7.5968 9.94922 7.64231 10.069 7.73333 10.1681C7.82436 10.2672 7.93458 10.3171 8.064 10.3179C8.19342 10.3186 8.30187 10.2687 8.38933 10.1681C8.4768 10.0697 8.52871 9.94815 8.54507 9.80341C8.57991 9.58237 8.69902 9.33673 8.9024 9.06649C9.10578 8.79625 9.35324 8.51532 9.6448 8.22369C10.0459 7.82155 10.3328 7.44257 10.5056 7.08677C10.6784 6.73026 10.7648 6.3741 10.7648 6.0183C10.7648 5.2846 10.5124 4.69457 10.0075 4.24821C9.50258 3.80186 8.8608 3.57868 8.08213 3.57868C7.55876 3.57868 7.07662 3.70667 6.63573 3.96265C6.19484 4.21862 5.86347 4.5238 5.6416 4.87817C5.56338 5.02292 5.54027 5.16124 5.57227 5.29315C5.60427 5.42506 5.68782 5.51526 5.82293 5.56375Z"
                            fill="#0969D4"
                          />
                        </svg>
                      </div>
                      <Tooltip
                        title="Support"
                        placement="right"
                        arrow
                        componentsProps={tooltipClass}
                        className={`lg:${collapseStatus ? "hidden" : "block"}`}
                      >
                        <p>Support</p>
                      </Tooltip>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
      <div className="h-[5.8rem] flex items-center">
        <div
          className={`hidden lg:${
            collapseStatus ? "flex items-center " : "hidden"
          } bg-sidebarTextColor rounded-tr-[6px] rounded-br-[6px] h-10 p-1 cursor-pointer`}
          onClick={() => setCollapseStatus(false)}
        >
          <FontAwesomeIcon icon={faArrowRight} color="#ffffff" />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Sidebar;
