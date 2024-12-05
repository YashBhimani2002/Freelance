"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../jobModel/style.css";
import Image from "next/image";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  deletMilstoneData,
  deleteUploadFile,
  updateapplication,
  postNotification,
} from "../api/api";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faStar as faStarsolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarOutline,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
function AplicationModule(props) {
  let { isOpen, onClose, jobData } = props;
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(currentDate.getFullYear() + 1); // Set to one year from current date

  const [pitch, setPitch] = useState(
    jobData?.mycontaractbargainingoption[0]?.contract_desc
  );
  const [Msg, setmsg] = useState("");
  const [milstoneData, setMilstoneData] = useState(jobData?.milestone);
  const [pfeesDetails, setPfeesDetails] = useState(jobData?.pfees || []);
  const [attachmentDetails, setAttachmentDetials] = useState(
    jobData?.attachment
  );
  const [milstonemiror, setMilstoneMiror] = useState([]);
  const [fees, setFees] = useState(10);
  const [bud, setBud] = useState(0);
  const [pfees, setPfees] = useState(0);
  const [Flag, setflag] = useState(null);
  const [prakiFees, setPrakiFees] = useState(0);
  const [earTot, setEarTot] = useState(0);
  const [errors, setErrors] = useState({});
  const [maxDate, setMaxDate] = useState(new Date());
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selpay, setSelpay] = useState(1);
  const [bargainingoption, setBargainingOption] = useState(
    jobData?.mycontaractbargainingoption[0]?.bargaining_option
  );
  const [deletpopup, setDeletepopup] = useState(false);
  const [deletmilstoneid, setDeletemilstonId] = useState();
  const router = useRouter();
  const ratings = Array.from({ length: 5 }, (_, index) => index + 1);
  const [invteStatus, setInvteStatus] = useState("");
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);

  useEffect(() => {
    setMaxDate(new Date());
    if (Array.isArray(jobData?.invjob)) {
      setInvteStatus(jobData?.invjob[0]?.invite_status);
    } else {
      setInvteStatus(jobData?.invjob?.invite_status);
    }
  }, []);
  let sumOffee = 0;
  jobData?.pfees?.map((item) => {
    sumOffee += item.fees;
  });
  //Set Payment Summary Details
  const setpayment = () => {
    let sumOffee = 0;
    pfeesDetails.map((item) => {
      sumOffee += item.fees;
    });
    let budget = 0;
    if (milstonemiror.length > 0) {
      milstonemiror.map((item) => {
        if (item.milestone_price) {
          budget += parseInt(item.milestone_price);
        }
      });
    } else {
      milstoneData?.map((item) => {
        if (item.milestone_price) {
          budget += parseInt(item.milestone_price);
        }
      });
    }
    setFees(sumOffee);
    if (milstoneData?.length > 0) {
      const prakiFees = (budget * sumOffee) / 100;
      const earTot = budget - prakiFees;
      setBud(budget);
      setPfees(fees);
      setPrakiFees(prakiFees);
      setEarTot(earTot);
    }
  };
  useEffect(() => {
    setpayment();
  }, [milstoneData]);
  //Fomrate date...
  const formatTimeAgo = (createdAt) => {
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
  //handle textearea entry...
  const handleChangePitch = (e) => {
    const value = e.target.value;
    // Your existing logic for updating the pitch state
    setPitch(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.pitch;
      return newErrors;
    });
  };
  //handle all form entrys and store in it's usestate variable
  const handleInputChange = (index, fieldName, value) => {
    if (milstonemiror.length > 0) {
      const updatedMilestones1 = milstonemiror;
      updatedMilestones1[index][fieldName] = value;
      setMilstoneMiror(updatedMilestones1);
    } else {
      const updatedMilestones2 = milstoneData;
      updatedMilestones2[index][fieldName] = value;
      setMilstoneData(updatedMilestones2);
    }
    setpayment();
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`${fieldName}${index}`];
      return newErrors;
    });
  };
  //Open delete popup..
  const handledeletepopup = (value) => {
    setDeletepopup(!deletpopup);
    setDeletemilstonId(value);
  };
  //Remove  axtra added milstone form...
  const deleteDiv = async () => {
    setDeletepopup(!deletpopup);
    const value = deletmilstoneid;
    if (typeof value == "string") {
      const data = {
        milstone_id: value,
      };
      await deletMilstoneData(data).then((res) => {});
    }
    if (milstonemiror.length > 0) {
      const updatedMilestones1 = milstonemiror.slice(0, -1);
      setMilstoneMiror(updatedMilestones1);
      alert("Deleted successfully");
    } else {
      const updatedMilestones2 = milstoneData.filter(
        (item) => item._id !== value
      );
      setMilstoneData(updatedMilestones2);
    }
  };
  //Add more detials filed for milstone from..
  const addMoreDiv = () => {
    // Validate fields in the current div
    let data = milstoneData;
    if (milstonemiror.length > 0) {
      data = milstonemiror;
    }
    const isCurrentDivInvalid = data.some((milestone) => {
      return (
        !milestone.milestone_task ||
        !milestone.milestone_hours ||
        !milestone.milestone_price ||
        !milestone.milestone_start_date ||
        !milestone.milestone_end_date
      );
    });
    if (isCurrentDivInvalid) {
      return;
    }
    // Proceed with adding more divs
    const newMilestone = {
      _id: data.length + 1,
      milestone_task: "",
      milestone_hours: "",
      milestone_price: "",
      milestone_start_date: null,
      milestone_end_date: null,
    };
    setMilstoneMiror([...data, newMilestone]);
  };
  //Store input value of file.
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  //handle form submite..

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (submitType) => {
    // Disable submission buttons when submitting
    setIsSubmitting(true);

    let milston;
    if (milstonemiror.length > 0) {
      milston = milstonemiror;
    } else {
      milston = milstoneData;
    }
    const newErrors = {};
    milston.forEach((milestone, index) => {
      if (!milestone.milestone_task && selpay === 1) {
        newErrors[`milestone_task${index}`] = "Please enter deliverable.";
      }
      if (!milestone.milestone_hours) {
        newErrors[`milestone_hours${index}`] = "Please enter milestone hours.";
      }
      if (!milestone.milestone_price) {
        newErrors[`milestone_price${index}`] = "Please enter Bid Amount.";
      }
      if (!milestone.milestone_start_date) {
        newErrors[`milestone_start_date${index}`] =
          "Please enter expected start date.";
      }
      if (!milestone.milestone_end_date) {
        newErrors[`milestone_end_date${index}`] =
          "Please enter expected due date.";
      }
    });

    if (!pitch) {
      newErrors.pitch = "Please enter your pitch for this job.";
    }

    // Validate files

    // Add additional validations if needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Re-enable buttons if there are errors
      setIsSubmitting(false);
      return;
    }

    let typebtn = "";

    if (submitType === "Submit") {
      typebtn = "1";
    } else if (submitType === "Save As Draft") {
      typebtn = "2";
    }

    // Your form submission logic here
    try {
      const formData = new FormData();

      formData.append("file", selectedFiles ? selectedFiles[0] : selectedFiles);
      formData.append("milestones", JSON.stringify(milston));
      formData.append("pitch", pitch);
      formData.append("jobid", jobData.job._id);
      formData.append("typebtn", typebtn);
      formData.append("selpay", 1);

      // console.log("jobData", jobData);
      const route = `/projects/${jobData.job._id}`;
      const dataForNofitication = {
        rout: route,
        send_by: "professional",
        subject: "job-Apply",
        client_id: jobData.job.user_id._id,
        job_id: jobData.job._id,
        email: jobData.job.user_id.email,
        first_name: jobData.job.user_id.first_name,
        last_name: jobData.job.user_id.last_name,
      };

      const res = await updateapplication(formData);

      // console.log("before", res?.flag);
      if (res?.status === 200) {
        if (submitType === "Submit") {
          if (res?.data?.flag == 1) {
            setmsg(res?.data?.msg);
            setflag(1);
          } else {
            setflag(0);
            window.location.href = "/application?applied=true";
          }
          // const messageForShow = `Application for ${jobData.job.job_title} has been Edit by ${decodedToken.first_name} ${decodedToken.last_name}"`;
          const messageForShow = `" ${decodedToken.first_name} ${decodedToken.last_name} has applied for ${jobData.job.job_title} "`;
          await postNotification(dataForNofitication).then((res) => {
            const data = {
              rout: route,
              send_by: "professional",
              subject: "job-Apply",
              client_id: jobData.job.user_id._id,
              message: messageForShow,
              status: 0,
            };
            socket.emit("new_notification", data);
            socket.emit("update_notification", { login_as: 1, id: jobData.job.user_id._id });
          });
        } else if (submitType === "Save As Draft") {
          if (res?.data?.flag == 1) {
            setmsg(res?.data?.msg);
            setflag(1);
          } else {
            setflag(0);

            window.location.href = "/application?draft=true";
          }
          setflag(0);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Re-enable buttons if there's an error
      setIsSubmitting(false);
    }
  };

  const handlefiledelte = async (id) => {
    const data = {
      file_id: id,
    };
    await deleteUploadFile(data).then((res) => {
      if (res?.status === 200) {
        const updatedAttachmentDetails = attachmentDetails.filter(
          (item) => item.id !== id
        );
        setAttachmentDetials(updatedAttachmentDetails);
      }
    });
  };
  const milstoneui = (value, index, typedata) => {
    let comparedata;
    if (typedata == "mirordata") {
      comparedata = milstonemiror;
    } else {
      comparedata = milstoneData;
    }
    return (
      <form key={index}>
        {Msg && (
          <div className="fixed grid content-center top-0 bottom-0 left-0 z-[999999] w-full h:screen bg-black bg-opacity-70 ">
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
                      {Msg}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-center gap-5 items-center p-5">
                  <button
                    className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                    onClick={() => setmsg(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                    onClick={() => setmsg(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row Add_more_form">
          <div className="inputs-respo flex gap-3">
            <div className="responsiveness-in mt-2">
              <div className="form-group">
                <label
                  htmlFor={`validationTask`}
                  className={`${inter500.className} text-[16px] mb-[8px] text-[#2D3748]`}
                >
                  Milestone
                </label>
                <input
                  id={`validationTask`}
                  type="text"
                  className={`form-control mtask1 ${
                    bargainingoption == "single" ? "disabled" : ""
                  }`}
                  placeholder={
                    bargainingoption == "single"
                      ? "Whole Project"
                      : "Enter a deliverable"
                  }
                  readOnly={bargainingoption == "single"}
                  style={{
                    backgroundColor:
                      bargainingoption == "single" ? "#e9ecef" : "",
                    cursor:
                      bargainingoption == "single"
                        ? "not-allowed!important"
                        : "auto",
                  }}
                  value={value.milestone_task}
                  onChange={(e) =>
                    handleInputChange(index, "milestone_task", e.target.value)
                  }
                />
                {errors[`milestone_task${index}`] && (
                  <div className="proposal_error-message">
                    {errors[`milestone_task${index}`]}
                  </div>
                )}
              </div>
            </div>

            <div className="responsiveness-in mt-2">
              <div className="form-group">
                <label htmlFor={`validationHours`}>Hours</label>
                <input
                  type="text"
                  className="form-control mtask1"
                  placeholder="Hours"
                  value={value.milestone_hours}
                  id={`validationHours`}
                  onChange={(e) =>
                    handleInputChange(index, "milestone_hours", e.target.value)
                  }
                  onKeyDown={(e) => {
                    // Allow only numbers and Backspace/Delete keys
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();
                    }
                    // Limit maximum length to 3 characters
                    if (
                      e.target.value.length >= 3 &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors[`milestone_hours${index}`] && (
                  <div className="proposal_error-message">
                    {errors[`milestone_hours${index}`]}
                  </div>
                )}
              </div>
            </div>

            <div className=" mt-2 w-full md:w-[32%]">
              <div className="form-group">
                <label htmlFor={`validationBidAmount`}>Bid Amount</label>
                <div>
                  <input
                    type="text"
                    className="form-control curr1"
                    aria-describedby="emailHelp"
                    value="N"
                    style={{ background: "#e9ecef" }}
                    readOnly
                  />
                  <input
                    type="text"
                    className="form-control mtask1 amt joincurr"
                    placeholder="Amount"
                    value={value.milestone_price}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "milestone_price",
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      // Allow only numbers and Backspace/Delete keys
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                      }
                      // Limit maximum length to 5 characters
                      if (
                        e.target.value.length >= 6 &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {errors[`milestone_price${index}`] && (
                  <div className="proposal_error-message">
                    {errors[`milestone_price${index}`]}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputs-respo flex gap-7">
            <div className="responsiveness-in">
              <div className="form-group">
                <label htmlFor={`validationStartDate`}>
                  Expected Start Date
                </label>
                <DatePicker
                  selected={
                    value.milestone_start_date !== null &&
                    new Date(value.milestone_start_date)
                  }
                  onChange={(date) =>
                    handleInputChange(index, "milestone_start_date", date)
                  }
                  placeholderText="MM/DD/YYYY"
                  className="form-control mtask1"
                  minDate={new Date()}
                  maxDate={value.milestone_end_date && value.milestone_end_date}
                  isClearable
                />
                {errors[`milestone_start_date${index}`] && (
                  <div className="proposal_error-message">
                    {errors[`milestone_start_date${index}`]}
                  </div>
                )}
              </div>
            </div>

            <div className="responsiveness-in">
              <div className="form-group">
                <label htmlFor={`validationEndDate`}>Expected Due Date</label>
                <DatePicker
                  selected={
                    value.milestone_end_date !== null &&
                    new Date(value.milestone_end_date)
                  }
                  onChange={(date) =>
                    handleInputChange(index, "milestone_end_date", date)
                  }
                  placeholderText="MM/DD/YYYY"
                  className="form-control mtask1"
                  isInputReadonly
                  minDate={value.milestone_start_date || new Date()}
                  maxDate={futureDate} // Set maxDate to one year from current date
                />
                {errors[`milestone_end_date${index}`] && (
                  <div className="proposal_error-message">
                    {errors[`milestone_end_date${index}`]}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mb-[14px]">
            <input
              type="button"
              className={`add-milestone responsiveness-in ${
                bargainingoption === "single" ? "disabled single" : ""
              }`}
              value="Add More"
              onClick={addMoreDiv}
              disabled={true}
            />

            {index >= 1 && (
              <input
                type="button"
                className="btn btn-danger text-white delete_milestone"
                value="Delete"
                onClick={() => {
                  handledeletepopup(value._id);
                }}
              />
            )}
          </div>
        </div>
      </form>
    );
  };

  const renderStars = () => {
    const stars = [];
    let reviewNum = jobData?.review != null ? jobData?.review : 0;
    const fullStars = Math.floor(reviewNum);
    const hasHalfStar = reviewNum - fullStars > 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarsolid}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            icon={faStarOutline}
            key={i}
            style={{ color: "#323232" }}
          />
        );
      }
    }

    return stars;
  };
  return (
    <>
      <div
        className={`fixed left-0 bottom-0 w-full h-full z-999999 overflow-y-scroll flex justify-center items-center ${
          deletpopup ? "bg-[#000000BF]" : "bg-[#00000074]"
          } scrollbar-custom`}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered absolute custom-modal-width top-6 bg-white m-3 md:w-180 slideInFromTop"
          style={{ borderRadius: "20px" }}
        >
          <div className="modal-content">
            <div className="border-b border-solid border-[#e9ecef] flex items-center justify-between p-[16px]">
              <h5 className={`text-[26px] text-[#000] ${mulish800.className}`}>
                Submit an Application
              </h5>
              <div
                onClick={onClose}
                className="bg-[#F2F2F2] p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#404040"
                >
                  <path
                    d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"
                    fill="#404040"
                  />
                </svg>
              </div>
            </div>
            <div className="modal-body">
              <div className="top-box mb-[28px]">
                <div className="header2">
                  <div
                    className={`job  ${mulish600.className} text-[25px] mb-[15px]`}
                  >
                    Job Details
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      style={{ cursor: "pointer!important" }}
                    >
                      <path
                        d="M21.2512 25H7.50122C6.12051 25 5.00122 23.8807 5.00122 22.5V8.75C5.00122 7.36929 6.12051 6.25 7.50122 6.25H12.5012V8.75H7.50122V22.5H21.2512V17.5H23.7512V22.5C23.7512 23.8807 22.6319 25 21.2512 25ZM14.6262 17.1337L12.8637 15.3663L20.73 7.5H16.2512V5H25.0012V13.75H22.5012V9.26875L14.6262 17.1337Z"
                        fill="#2E3A59"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`pa  ${mulish600.className} text-[21px] !mt-0 mb-[10px]`}
                >
                  {jobData?.job?.job_title}
                </div>
                <div
                  className={`obj  ${mulish400.className} text-[15px] text-[#434343] mb-[15px]`}
                >
                  {jobData?.job?.job_description}
                </div>
                <div
                  className={`${inter500.className} text-[11px] text-[#000] mb-[18px] flex flex-wrap items-center gap-3`}
                >
                  {jobData?.skill_job?.map((value, index) => {
                    if (value) {
                      return (
                        <span id="" key={index}>
                          {value}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="low gap-y-2">
                  {jobData?.job?.budget_type == "range" ? (
                    <>
                      <span
                        id="fixed"
                        className={`${mulish700.className} text-[14px] text-[#000]`}
                      >
                        Range
                      </span>
                      <span
                        id="fixed"
                        className={`${mulish700.className} text-[14px] text-[#000]`}
                      >
                        Budget:
                        <span
                          id="amount"
                          className={`${mulish400.className} text-[14px] text-[#000]`}
                        >
                          {" "}
                          N{jobData?.job?.budget_from} - N
                          {jobData?.job?.budget_to}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        id="fixed"
                        className={`${mulish700.className} text-[14px] text-[#000]`}
                      >
                        Fixed Price
                      </span>
                      <span
                        id="fixed"
                        className={`${mulish700.className} text-[14px] text-[#000]`}
                      >
                        Budget:
                        <span
                          id="amount"
                          className={`${mulish400.className} text-[14px] text-[#000]`}
                        >
                          {" "}
                          N{jobData?.job?.budget_from}
                        </span>
                      </span>
                    </>
                  )}

                  <div
                    className="mr-[24px]"
                    style={{ display: "flex", height: "fit-content" }}
                  >
                    <Image
                      src="/images/findjob-img/userimg.png"
                      alt="usericon"
                      className="pe-2"
                      width={30}
                      height={24}
                      style={{ height: "fit-content", alignSelf: "center" }}
                    />
                    {renderStars()}
                  </div>
                  <div className="flex items-center">
                    <Image
                      src="/images/findjob-img/clock.svg"
                      width={24}
                      height={24}
                      alt="usericon"
                      className="mr-[10px]"
                    />
                    <p
                      className={`${mulish400.className} text-[#434343] text-[14px]`}
                    >
                      Posted {formatTimeAgo(jobData?.job?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`contact  ${mulish600.className} text-[25px] mb-[13px] tracking-wide`}
              >
                Contact Proposal
              </div>
              <div
                className={`payment  ${inter500.className} text-[16px] mb-[8px] text-[#2D3748]`}
              >
                Project Terms
              </div>

              <div className="pay-div2">
                <div className="pay-div">
                  <div className="form-check">
                    <input
                      className=" bg-blue border border-[#e9ecef] text-white cursor-pointer mr-[8px]"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefaultMultiple"
                      checked={bargainingoption === "multiple"}
                      disabled={bargainingoption === "single"}
                      value="multiple"
                    />
                    <label
                      className={` ${inter500.className} text-[14px] mb-[8px] text-[#718096]`}
                      htmlFor="flexRadioDefaultMultiple"
                    >
                      Multiple Milestone
                    </label>
                  </div>
                </div>
                <div className="pay-div">
                  <div className="form-check">
                    <input
                      className="form-check-label bg-gray border border-[#e9ecef] cursor-pointer mr-[8px]"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefaultSingle"
                      checked={bargainingoption === "single"}
                      disabled={bargainingoption === "multiple"}
                      value="single"
                    />
                    <label
                      className={`form-check-label ${inter500.className} text-[14px] mb-[8px] text-[#718096]`}
                      htmlFor="flexRadioDefaultSingle"
                    >
                      Single Milestone
                    </label>
                  </div>
                </div>
              </div>

              {milstonemiror.length > 0
                ? milstonemiror?.map((milestone, index) =>
                    milstoneui(milestone, index, "mirordata")
                  )
                : milstoneData?.map((value, index) =>
                    milstoneui(value, index, "realdata")
                  )}

              <div className="col-md-12">
                <div className="form-group">
                  <label
                    htmlFor="validationTooltip01"
                    className={`inline-block mb-[8px] ${inter500.className}`}
                  >
                    Write a Pitch<span className="error">*</span>
                  </label>
                  <textarea
                    className="form-control mtask1"
                    id="cletter"
                    name="cletter"
                    placeholder="Please enter your pitch for this job"
                    value={pitch}
                    onChange={handleChangePitch}
                  ></textarea>
                  {errors.pitch && (
                    <div className="proposal_error-message">{errors.pitch}</div>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label
                    htmlFor="validationTooltip01"
                    className={`inline-block mb-[8px] ${inter500.className}`}
                  >
                    Add Attachments
                  </label>
                  <input
                    type="file"
                    className={`form-control-file mtask1 h-0 text-[12.8px] !text-[#ADADAD] ${inter.className}`}
                    id="files"
                    onChange={handleFileChange}
                  />
                  <small
                    className={`text-[12.8px] text-[#ADADAD] ${inter.className} tracking-wide`}
                  >
                    Note: Upload upto 1 Mb files (Allowed files only docx,doc or
                    pdf)
                  </small>
                  <br />
                  {attachmentDetails?.length > 0 ? (
                    attachmentDetails?.map((item, index) =>
                      item.filepath !== false ? (
                        <ul key={index} className="mt-[16px]">
                          <li className="text-gray list-disc ml-5">
                            <p className="text-base md:text-[16px] leading-[24px] tracking-[0.5px] font-[600] flex">
                              {" "}
                              {item?.fileName}
                              <p>
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className="ml-2 cursor-pointer"
                                  onClick={() => handlefiledelte(item.id)}
                                ></FontAwesomeIcon>
                              </p>
                            </p>
                          </li>
                        </ul>
                      ) : (
                        <div key={index} className="mt-[16px]">
                          <p
                            className={`text-[16px] text-[#adadad] ${mulish600.className}`}
                          >
                            No attachment found
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <div className="mt-[16px]">
                      <p
                        className={`text-[16px] text-[#adadad] ${mulish600.className}`}
                      >
                        No attachment found
                      </p>
                    </div>
                  )}
                  <br />
                  <small
                    className={`text-[12.8px] text-[#ADADAD] tracking-wide ${inter.className}`}
                  >
                    *Project Terms are negotiable.You will be notified of
                    changes to your Terms.
                  </small>
                </div>
              </div>

              <div className="pay-summary">
                <div
                  className={`pay-title text-[16px] text-[#212529] mb-[10px] ${inter500.className}`}
                >
                  Payment Summary
                </div>
                <div className="flex align-items-center justify-between">
                  <div
                    className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                  >
                    Total Project Cost
                  </div>
                  <div
                    className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                  >
                    N{bud}
                  </div>
                </div>
                <div className="flex align-items-center justify-between">
                  <div
                    className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                  >
                    Freelance Fees({fees}%)
                  </div>
                  <div
                    className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                  >
                    N{prakiFees}
                  </div>
                </div>
                <div className="flex align-items-center justify-between">
                  <div
                    className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                  >
                    Your Net Earnings
                  </div>
                  <div
                    className={`hlo text-[14px] text-[#718096] mb-[8px] ${inter.className}`}
                  >
                    N{earTot}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex align-items-end gap-2  border-t border-solid border-[#e9ecef] p-5">
              <button
                className="grow md:grow-0 cursor-pointer bg-[#E9F1FF] font-inter font-semibold text-[14px] leading-[28px] text-[#434343] inline-block text-center border border-transparent py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out duration-150 hover:bg-[#1068AD] hover:text-[#ffffff]"
                onClick={() => handleSubmit("Submit")}
                disabled={isSubmitting}
              >
                Submit Application
              </button>
              {invteStatus != "1" && (
                <button
                  className="bg-[#286cac] font-inter font-medium text-[14px] leading-[28px] text-white border border-[#286cac] py-[10px] px-[12px] rounded-[10px] transition-colors ease-in-out hover:bg-transparent hover:text-[#286cac] hover:border-[#286cac]"
                  onClick={() => handleSubmit("Save As Draft")}
                  disabled={isSubmitting}
                >
                  Save Draft
                </button>
              )}
            </div>
          </div>
        </div>
        {deletpopup ? (
          <div class="fixed top-0 z-999999 w-255 max-w-[40%]">
            <div className="flex justify-end relative z-2">
              <button
                onClick={() => {
                  setDeletepopup(!deletpopup);
                }}
                class="bg-[#1066a9] p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center text-2xl font-[900] leading-none text-white"
              >
                ×
              </button>
            </div>
            <div className="bg-white absolute w-[97.3%] top-[55%] z-1 rounded-[25px] border border-[#c7c7c7]">
              <div class="p-4 flex-1 relative border-b border-[#e9ecef] ">
                <p class="text-black font-semibold tracking-normal">
                  Do you really want to delete record?
                </p>
              </div>
              <div className="flex justify-end align-items-center p-4 border-t border-[#e9ecef] gap-2">
                <button
                  onClick={() => {
                    setDeletepopup(!deletpopup);
                  }}
                  class="bg-[#F0F0F0] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteDiv();
                  }}
                  class="text-white bg-[#007bff] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
AplicationModule.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  jobData: PropTypes.any,
};

export default AplicationModule;
