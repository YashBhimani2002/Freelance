"use client";
import {
  updateUser,
  viewProfile,
  LogoutApi,
  switchAccount,
  postEmail,
  changeStatus,
} from "../api/api";
import { useCallback, useState } from "react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardStatus } from "@/lib/features/todos/professionalClientSidebar";
import { RootState } from "../../lib/store";
import axios from "axios";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { useSocket } from "../socketContext";
import Loader from "../../components/common/Loader";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

export default function AccountSetting() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [clintData, setClintData] = useState({});
  const [profesisonalData, setProfesisonalData] = useState({});
  const [country, setcountryData] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [SwitchAccount, setSwitchAccount] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false); // Added state to control the visibility of the loader
  const [isActive, setIsActive] = useState(true);
  const {setActivate} = useSocket()
  const toggleButton = async() => {
    try{
      const response = await changeStatus({ filed: 'notification_status' , value : isActive ? 0 : 1 })
      if(response.status==200){
      setIsActive(!isActive);
      }
    }catch(error){
      console.error(error)
    }
  };
  useEffect(()=>{
    setActivate(isActive);
  },[isActive])
  const handleCloseAccount = () => {
    setShowConfirmation(true);
  };
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);
  const [loading, setLoading] = useState(false);

  const dataForMail = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    eventType: "close_account",
  };

  //new
  const handleConfirmCloseAccount = async () => {
    try {
      const { data } = await axios.post(
        `${url}/close-account`,
        {
          userid: userData._id,
        },
        {
          withCredentials: true,
        }
      );
      if (data.message === "Account closed successfully") {
        await postEmail(dataForMail);
        await LogoutApi();
        window.location.href = "/login";
      }
    } catch (error) { }
  };

  const handleCancelCloseAccount = () => {
    setShowConfirmation(false);
  };

  const handleResetPassword = async () => {
    // Perform logout action
    try {
      const response = await LogoutApi();
      if (response?.status === 200) {
        localStorage.removeItem("user-data");
        document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = "/forgot-password";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dashboard = useSelector((state) => state);
  let currentStatus = dashboard?.dashboard?.status;

  const fetchFindJobData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await viewProfile();
      if (response) {
        if (response?.status == 200) {
          setUserData(response.data.user);
          setIsActive(response?.data?.user?.notification_status ?response?.data?.user?.notification_status == 0 ? false : true:false);
          setClintData(response.data.clint);
          setProfesisonalData(response.data.professional_data);
          setcountryData(response.data.countryInfoArray[0].firstZoneName);
          // setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  }, []);
  

  useEffect(() => {
    fetchFindJobData();
  }, []);

  const handleRoleSwitch = async () => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    try {
      const response = await updateUser({ status: newStatus });
      if (response?.status == 200) {
        if (response?.data?.success) {
          dispatch(setDashboardStatus(newStatus));
        }
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const dashboardStatus = useSelector(
    (/* @type {RootState} */ state) => state.dashboard.status
  );
  const switchDashboard = async () => {
    const newStatus = dashboardStatus === 1 ? 2 : 1;
    setLoaderStatus(true); // Show loader when account switching starts
    await switchAccount({
      login_as: newStatus,
    }).then((res) => {
      if (res?.status == 200) {
        const options = {
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        };
        Cookies.set("authToken", res?.data?.token , options);
        window.location.href = res?.data?.route;
        dispatch(setDashboardStatus(newStatus));
        setSwitchAccount(false); // Disable the popup after successful account switch
      }
    });
    setLoaderStatus(false); // Hide loader when account switching ends (whether success or failure)
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
        {SwitchAccount ? (
          <div className="fixed top-0 z-999999 w-255 max-w-[40%] left-[48%] top-[29%] md:left-[26%] md:top-[8%]">
            <div className="flex justify-end relative z-2">
              <button
                onClick={() => {
                  setSwitchAccount(!SwitchAccount);
                }}
                className="pb-[5px] border bg-white p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center text-2xl font-[900] leading-none text-[#1068ad]"
              >
                ×
              </button>
            </div>
            <div className="bg-white fixed w-[74%] left-[12%] md:w-[35%] top-[12%] md:left-[30%]  z-1 rounded-[25px] border border-[#c7c7c7]">
              {loaderStatus ? (
                <>
                  {" "}
                  <Loader />
                </>
              ) : (
                <>
                  <div className="p-4 flex-1 relative border-b border-[#e9ecef] ">
                    <p className="text-black font-semibold tracking-normal">
                      {dashboardStatus === 1 &&
                      decodedToken?.professional_profile_complete === 1
                        ? "Do you want to switch to a Professional account?"
                        : dashboardStatus === 1
                        ? "Do you want to create a Professional account?"
                        : dashboardStatus === 2 &&
                          decodedToken?.client_profile_complete === 1
                        ? "Do you want to switch to a client account?"
                        : dashboardStatus === 2
                        ? "Do you want to Create a Client account?"
                        : null}
                    </p>
                  </div>
                  <div className="flex justify-end align-items-center p-4 border-t border-[#e9ecef] gap-2">
                    <button
                      onClick={() => {
                        setSwitchAccount(!SwitchAccount);
                      }}
                      className="text-white bg-[#dc3545] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        switchDashboard();
                      }}
                      className="text-white bg-[#28a745] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="lg:px-12 lg:py-4">
            <h1
              className={`text-[#000000] text-3xl ${mulish600.className} font-normal`}
            >
              <Tooltip
                title="Account Settings"
                placement="right"
                arrow
                componentsProps={tooltipClass}
              >
                Account Settings
              </Tooltip>
            </h1>
            <div className="my-5 p-5 border border-borderBlue rounded-xl">
              <h1
                className={`${mulish600.className} text-[#000000] text-[25px] font-normal mb-5 tracking-wide`}
              >
                Personal Details
              </h1>
              <div>
                <ul
                  className={` ${inter600.className} grid grid-cols-1 md:grid-cols-2 text-[14px] gap-3 md:gap-5 tracking-wide`}
                >
                  <li>
                    <h4 className="text-[#2D3748]">First Name</h4>
                    <p className={`${inter400.className} text-radiolabel`}>
                      {userData && `${userData.first_name}`}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[#2D3748]">Email</h4>
                    <p className={`${inter400.className} text-radiolabel`}>
                      {userData && `${userData.email}`}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[#2D3748]">Last Name</h4>
                    <p className={`${inter400.className} text-radiolabel`}>
                      {userData && `${userData.last_name}`}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[#2D3748]">Phone</h4>
                    <p className={`${inter400.className} text-radiolabel`}>
                      {clintData && `${clintData.phone}`}
                      {profesisonalData && `${profesisonalData.phone}`}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[#2D3748]">Address</h4>
                    <p className={`${inter400.className} text-radiolabel`}>
                      {clintData && `${clintData.location}`}
                      {profesisonalData && `${profesisonalData.location}`}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[#2D3748]">Time Zone</h4>
                    <p className={`${inter400.className} text-radiolabel`}>
                      {userData?.user_timezone}
                    </p>
                  </li>
                </ul>
                <div
                  className={`${inter600.className} my-10 flex flex-col md:flex-row justify-start items-center gap-5 `}
                >
                  <div className=" w-full md:w-36">
                    <Tooltip
                      title="Edit Details"
                      placement="bottom"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button
                        onClick={() => router.push("/profile/editprofile")}
                        className="text-lg bg-sidbarseleclistcolor p-3 w-full text-[#434343] rounded transition-colors duration-200 ease-in-out hover:bg-blue_600 hover:text-white"
                      >
                        Edit Details
                      </button>
                    </Tooltip>
                  </div>
                  <div className="w-full md:w-36">
                    <Tooltip
                      title="Close Account"
                      placement="bottom"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button
                        className="text-base p-3 w-full text-[#434343] border border-radiolabel md:border-transparent hover:border hover:border-submtBtn transition-colors duration-200 ease-in-out hover:text-submtBtn rounded"
                        onClick={handleCloseAccount}
                      >
                        Close Account
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className=" border-y border-borderBlue py-5 tracking-wide">
                  <h1
                    className={`text-[#000000] text-[16px] sm:text-xl ${mulish700.className} font-normal`}
                  >
                    Additional Accounts
                  </h1>
                  <p
                    className={`text-[#434343] text-sm my-3 ${mulish600.className}  `}
                  >
                    {userData?.login_as === 1
                      ? "Setup a Professional account if you want to get hired to complete a project"
                      : "Setup a client account if you want to post jobs or hire professionals"}
                  </p>

                  <div className={`${inter600.className} mt-5`}>
                    <Tooltip
                      title={
                        dashboardStatus === 1 &&
                        decodedToken?.professional_profile_complete === 1
                          ? "Switch to a Professional account"
                          : dashboardStatus === 1
                          ? "Create a Professional Account"
                          : dashboardStatus === 2 &&
                            decodedToken?.client_profile_complete === 1
                          ? "Switch to a Client Account"
                          : dashboardStatus === 2
                          ? "Create a Client Account"
                          : null
                      }
                      placement="right"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button
                        onClick={() => setSwitchAccount(true)}
                        className="text-lg bg-sidbarseleclistcolor p-3 text-[#434343]  rounded transition-colors duration-200 ease-in-out hover:bg-blue_600 hover:text-white w-full md:w-auto"
                      >
                        {dashboardStatus === 1 &&
                        decodedToken?.professional_profile_complete === 1
                          ? "Switch to a Professional account"
                          : dashboardStatus === 1
                          ? "Create a Professional Account"
                          : dashboardStatus === 2 &&
                            decodedToken?.client_profile_complete === 1
                          ? "Switch to a Client Account"
                          : dashboardStatus === 2
                          ? "Create a Client Account"
                          : null}
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className=" py-5 tracking-wide">
                  <h1
                    className={`text-black text-[16px] sm:text-xl ${mulish700.className}  `}
                  >
                    Password and Security
                  </h1>
                  <p
                    className={`text-[#434343] text-sm my-3 ${mulish600.className} `}
                  >
                    Choose a strong, unique password
                  </p>

                  <div
                    className={`${inter600.className} mt-5`}
                    onClick={handleResetPassword}
                  >
                    <Tooltip
                      title="Reset Password"
                      placement="right"
                      arrow
                      componentsProps={tooltipClass}
                    >
                      <button className="text-lg bg-sidbarseleclistcolor p-3 text-[#434343] rounded transition-colors duration-200 ease-in-out hover:bg-blue_600 hover:text-white w-full md:w-auto">
                        Reset Password
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className=" py-5 tracking-wide">
                  <h1
                    className={`text-black text-[16px] sm:text-xl ${mulish700.className}  `}
                  >
                    Notifications
                  </h1>
                  <div className="flex flex-row gap-10">
                    <p
                      className={`text-[#434343] text-sm my-3 ${mulish600.className} `}
                    >
                      Enable In - app notifications
                    </p>
                    <div className="flex justify-center items-center">
                      <div
                        onClick={toggleButton}
                        className={`w-[3.084rem] h-[1.48rem] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-[#F2F5F5] `}
                      >
                        <div
                          className={`w-[1.313rem] h-[1.25rem] rounded-full shadow-md transform transition-transform duration-300 ${
                            isActive
                              ? "translate-x-5.5 bg-[#1068AD]"
                              : "translate-x-0 bg-[#1068AD66]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showConfirmation && (
                <div className="fixed overflow-y-scroll inset-0 flex items-center justify-center z-9999 px-10 md:px-0">
                  <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50"></div>
                  <div className="modal w-full max-w-lg mx-auto overflow-y-auto z-50 bg-[#eee] shadow-lg py-10 rounded-md transition-opacity">
                    <div className="modal-content">
                      <div className="relative bg-white ">
                        <div className="grid grid-cols-1  bg-[#eee] px-3 md:px-5">
                          <strong className="modal-banner text-center text-title-sm md:text-title-md">
                            Close Account
                          </strong>

                          <div className="text-center text-[12px] md:text-[18px] text-nowrap ">
                            Are you sure you want to close your account?
                          </div>

                          <div className="buttons grid-cols-1 grid md:grid-cols-2 col-span-full gap-4 md:gap-8 mt-5">
                            <button
                              className="bg-[#1f7af5] border border-[#1f7af5] text-white rounded-sm hover:bg-[#FF661e] hover:border hover:border-[#FF661e] trasnsition-all duration-300 py-2"
                              onClick={handleConfirmCloseAccount}
                            >
                              Confirm
                            </button>
                            <button
                              className="bg-transparent text-black rounded-sm border border-black hover:border hover:border-black hover:bg-black hover:text-white trasnsition-all duration-300 py-2"
                              onClick={handleCancelCloseAccount}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
}
