import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReviewedApplicants from "../[project_detail]/ReviewedApplicants";
import axios from "axios";
import io from "socket.io-client";
import SubLoader from "../../../../components/common/SubLoader";
import Error from "../../../error";
import ErrorBoundary from "../../../ErrorBoundry";
import { FiDownload } from "react-icons/fi"; // Import the download icon from react-icons

const linksvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1"
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
  >
    <path
      d="M5.29058 13.3344C4.02673 13.3344 2.88731 12.5731 2.40358 11.4055C1.91984 10.2379 2.18703 8.89383 3.08058 8.00001L4.40683 6.67376L5.29058 7.55751L3.96495 8.88314C3.49124 9.35685 3.30623 10.0473 3.47962 10.6944C3.65301 11.3415 4.15846 11.8469 4.80556 12.0203C5.45266 12.1937 6.14311 12.0087 6.61683 11.535L7.94245 10.2094L8.8262 11.0938L7.50058 12.4194C6.91562 13.0072 6.11986 13.3367 5.29058 13.3344ZM5.73245 10.6513L4.8487 9.76751L9.26808 5.34814L10.1518 6.23189L5.73308 10.6506L5.73245 10.6513ZM10.5943 9.32564L9.70995 8.44189L11.0356 7.11626C11.5157 6.64397 11.7057 5.95043 11.5332 5.29938C11.3608 4.64832 10.8523 4.13979 10.2013 3.96717C9.55032 3.79454 8.85673 3.98434 8.38433 4.46439L7.05808 5.79001L6.17433 4.90626L7.50058 3.58001C8.7225 2.36874 10.6937 2.37306 11.9103 3.58967C13.1269 4.80628 13.1312 6.77746 11.92 7.99939L10.5943 9.32501V9.32564Z"
      fill="#52619A"
    />
  </svg>
);
const arrowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.828 10.9997H20V12.9997H7.828L13.192 18.3637L11.778 19.7777L4 11.9997L11.778 4.22168L13.192 5.63568L7.828 10.9997Z"
      fill="#2D3748"
    />
  </svg>
);
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
import { Inter, Mulish } from "next/font/google";
import { useSocket } from "@/app/socketContext";

const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });

export default function ProjectDetails({
  data,
  onStatusChange,
  childToParent,
  appliedProfessionals,
}) {
  const [isActiveActionBtn, setIsActiveActionBtn] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subLoader, setSubLoader] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const getFileName = (value) => {
    const filePath = value;
    const parts = filePath.split("/");
    const filename = parts[parts.length - 1];
    const filenameWithExtension = filename;
    const filenameWithoutExtension = filenameWithExtension.replace(
      /_\d+\./,
      "."
    );
    return filenameWithoutExtension;
  };
  const handleDownload = async (filename) => {
    const fileUrl = `${url}/public/uploads/job_attachment/${filename}`;

    // Fetch the image as a blob
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = await getFileName(filename);

    // Append the link to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link from the document body and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const handleActionBtn = () => {
    setIsActiveActionBtn(!isActiveActionBtn);
  };
  const createdAt = data[0].created_at;
  const jobid = data[0]._id;

  const handleInviteProfessional = () => {
    onStatusChange("InviteProfessional");
  };
  const handleshortlist = () => {
    const shortlisted = appliedProfessionals.find(
      (item) => item.job_id === jobid && item.status === "shortlisted"
    );
    if (shortlisted) {
      onStatusChange("Shortlisted");
    } else {
      setShowPopup(true);
    }
  };
  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };
  const handleDeleteConfirmationClose = () => {
    setShowDeleteConfirmation(false);
  };
  const handleDeleteConfirmed = () => {
    editJobtype("delete");
    setShowDeleteConfirmation(false);
  };

  const handleEditPostClick = (status) => {
    if (status === "edit") {
      router.push(`/job_posting?edit=${jobid}`);
    } else if (status === "reuse") {
      router.push(`/job_posting?reuse=${jobid}`);
    }
  };

  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
 const {socket}=useSocket();
  const editJobtype = async (submitType) => {
    setSubLoader(true);
    try {
      const { data } = await axios.post(
        `${url}/edit-jobType`,
        {
          id: jobid,
          changetype: submitType,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        if (data.message === "Job deleted successfully") {
          setSubLoader(false);
          socket.emit("deleteJobStatus");
          window.location.href = "/projects";
        } else if (data.message === "Job type updated successfully") {
          setSubLoader(false);
        }
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "Professional has applied; cannot delete"
      ) {
        setErrorMessage("Professionals applied cannot delete job");
        setShowErrorPopup(true);
        setSubLoader(false);
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowErrorPopup(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [showErrorPopup]);

  const formatTimeAgo = () => {
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

  const handleReviewApplicants = () => {
    childToParent("Shortlisted");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActiveActionBtn(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div className="p-6 my-5 border border-borderBlue rounded-xl ">
          <div className="flex items-center justify-end"></div>
          <div className="pb-5 flex justify-between">
            <h1 className={`text-[#000000] text-[29px] ${mulish600.className}`}>
              {data[0].job_title}
            </h1>
            <div className="relative" ref={menuRef}>
              <button
                className={`border border-[#eee] rounded font-inter text-base font-semibold text-[#000000] px-[12px] py-[6px] ${
                  isActiveActionBtn
                    ? "text-btnText shadow-outline-blue"
                    : "border-bodydark"
                }`}
                onClick={() => handleActionBtn()}
              >
                Action
              </button>
              <ul
                className={`absolute  tracking-wide text-[#212529] ${
                  inter400.className
                }  shadow-lg top-10 right-0 border rounded border-bodydark bg-white w-52 py-2 ${
                  isActiveActionBtn ? "block" : "hidden"
                }`}
              >
                <li
                  className="cursor-pointer px-5 py-1 hover:bg-placeholdercolor"
                  onClick={handleshortlist}
                >
                  Review Applicants
                </li>
                <li
                  className="cursor-pointer px-5 py-1 hover:bg-placeholdercolor"
                  onClick={() => handleEditPostClick("edit")}
                >
                  Edit Post
                </li>
                <li
                  className="cursor-pointer px-5 py-1 hover:bg-placeholdercolor"
                  onClick={handleDeleteConfirmation}
                >
                  Delete Post
                </li>
                <li
                  className="cursor-pointer px-5 py-1 hover:bg-placeholdercolor"
                  onClick={() => handleEditPostClick("reuse")}
                >
                  Reuse Post
                </li>
                <li
                  className="cursor-pointer px-5 py-1 hover:bg-placeholdercolor"
                  onClick={() => editJobtype("private")}
                >
                  Make Private
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul className="grid grid-cols-4 gap-5">
              <li>
                <h5
                  className={`text-sm ${mulish400.className} text-[#434343] tracking-wide mb-1`}
                >
                  Category
                </h5>
                <h5
                  className={`text-base text-strongText font-semibold ${mulish700.className} capitalize tracking-wide`}
                >
                  {data[0].job_title}
                </h5>
              </li>
              <li>
                <h5
                  className={`text-sm ${mulish400.className} text-[#434343] tracking-wide mb-1`}
                >
                  Job Type
                </h5>
                <h5
                  className={`text-base text-strongText font-semibold ${mulish700.className} capitalize tracking-wide`}
                >
                  {data[0].budget_type}
                </h5>
              </li>
              <li>
                <h5
                  className={`text-sm ${mulish400.className} text-[#434343] tracking-wide mb-1`}
                >
                  Experience Level
                </h5>
                <h5
                  className={`text-base text-strongText font-semibold ${mulish700.className} capitalize tracking-wide`}
                >
                  {data[0].experience_level}
                </h5>
              </li>
              <li>
                <h5
                  className={`text-sm ${mulish400.className} text-[#434343] tracking-wide mb-1`}
                >
                  Posted
                </h5>
                <h5
                  className={`text-base text-strongText font-semibold ${mulish700.className} capitalize tracking-wide`}
                >
                  {formatTimeAgo()}
                </h5>
              </li>
              <li>
                <h5
                  className={`text-sm ${mulish400.className} text-[#434343] tracking-wide mb-1`}
                >
                  Budget
                </h5>
                <h5
                  className={`text-base text-strongText font-semibold ${mulish700.className} capitalize tracking-wide`}
                >
                  {data[0].budget_type === "Fixed"
                    ? `N${data[0].budget_from}`
                    : data[0].budget_type === "range"
                    ? `N${data[0].budget_from}-N${data[0].budget_to}`
                    : ""}
                </h5>
              </li>
              <li className="col-span-3">
                <h5
                  className={`text-sm ${mulish400.className} text-[#434343] tracking-wide mb-1`}
                >
                  Required Skills
                </h5>
                <ul className="flex flex-wrap items-center justify-start gap-2 text-xs font-medium my-2 ">
                  {data[0]?.skills?.map((tags, tagsIndex) => (
                    <li
                      className={`bg-sidbarseleclistcolor ${inter500.className} text-[11px] text-strongText p-2 rounded-lg shadow shrink-0`}
                      key={tagsIndex}
                    >
                      {tags}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <hr className="mt-5 border-borderBlue" />
          <h5
            className={`my-9 text-[15px] ${mulish400.className} text-[#434343]`}
          >
            {data[0].job_description}
          </h5>
          <h1
            className={`text-[#000000] text-[26px] ${mulish600.className} tracking-wide`}
          >
            Attachments
          </h1>
          {data[0]?.attachfile?.file_name && (
            <>
              <div>
                <button
                  onClick={() => handleDownload(data[0]?.attachfile?.file_name)}
                  className=" overflow-x-auto flex border mt-2 py-[6px] px-[12px] border-[#eee] rounded-md bg-white border-solid border-1 font-inter font-semibold text-base text-[#2D3748]"
                >
                  <span className="flex gap-1 justify-center shrink">
                    {linksvg}
                    <span className="text-[12px] md:text-[16px] w-full ">
                      {getFileName(data[0]?.attachfile?.file_name)}
                    </span>
                    <div className="mt-1">
                      <FiDownload /> {/* Download icon */}
                    </div>
                  </span>
                </button>
              </div>
            </>
          )}

          <div className="flex mt-10 gap-5">
            <button
              className="text-btnText bg-sidbarseleclistcolor shadow rounded 
           cursor-pointer p-3  font-medium w-full sm:w-auto border border-[#eee] sm:border-none hover:bg-btnText hover:text-white"
              onClick={handleshortlist}
            >
              Review Applicants
            </button>
            <button
              className="text-black border border-white rounded 
           cursor-pointer p-3  font-medium w-full sm:w-auto hover:text-btnText hover:border-btnText"
              onClick={handleInviteProfessional}
            >
              Invite Professional
            </button>

            {showDeleteConfirmation && (
              <div className="fixed overflow-y-scroll inset-0 flex items-center justify-center z-9999 px-10 md:px-0">
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50"></div>
                <div className="modal w-full max-w-lg mx-auto overflow-y-auto z-50 bg-[#eee] shadow-lg py-10 rounded-md transition-opacity">
                  <div className="modal-content">
                    <div className="relative bg-white ">
                      <div className="grid grid-cols-1  bg-[#eee] px-3 md:px-5">
                        <strong className="modal-banner text-center text-title-sm md:text-title-md">
                          Delete Project
                        </strong>

                        <div className="text-center text-[12px] md:text-[18px] text-nowrap ">
                          Are you sure you want to delete this project ?
                        </div>

                        <div className="buttons grid-cols-1 grid md:grid-cols-2 col-span-full gap-4 md:gap-8 mt-5">
                          <button
                            className="bg-[#1f7af5] border border-[#1f7af5] text-white rounded-sm hover:bg-[#FF661e] hover:border hover:border-[#FF661e] trasnsition-all duration-300 py-2"
                            onClick={handleDeleteConfirmed}
                          >
                            Confirm
                          </button>
                          <button
                            className="bg-transparent text-black rounded-sm border border-black hover:border hover:border-black hover:bg-black hover:text-white trasnsition-all duration-300 py-2"
                            onClick={handleDeleteConfirmationClose}
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
            {showErrorPopup && (
              <div className="fixed overflow-y-scroll inset-0 flex items-center justify-center z-9999 px-10 md:px-0">
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50"></div>
                <div className="modal w-full max-w-lg mx-auto overflow-y-auto z-50 bg-[#eee] shadow-lg py-10 rounded-md transition-opacity">
                  <div className="modal-content">
                    <div className="relative bg-white  ">
                      <div className="grid grid-cols-1  bg-[#eee] px-3 md:px-5">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                          <svg
                            className=" text-white bg-danger rounded-full px-3 py-3 text-title-md"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                          <h3
                            className="text-title-lg leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Error
                          </h3>
                          <div className="mt-2">
                            <p className="text-md text-gray-500">
                              {errorMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showPopup && (
              <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
                  <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                    <div
                      className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                      onClick={() => setShowPopup(false)}
                    >
                      {cancelIcon}
                    </div>

                    <h1
                      className={`${inter500.className} my-8 text-center text-base text-[#000000]  `}
                    >
                      Currently, there are no applicants for this project.
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {subLoader === true && <SubLoader />}
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
}
