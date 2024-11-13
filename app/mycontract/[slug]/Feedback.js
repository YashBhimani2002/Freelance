import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import ReadOnlyRating from "../../StarRatingReadOnly/Rating";
import axios from "axios";
import "./style.css";

import {
  contarctRating,
  getContractRating,
  postNotification,
} from "@/app/api/api";
import io from "socket.io-client";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import useSocket from "../../../app/socketContext";
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

const Feedback = ({ contract }) => {
  const [isThereProfessionalFeedback, setIsThereProfessionalFeedback] =
    useState(false);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const [clientFeedback, setClientFeedback] = useState(null);
  const [reviewSuccessfully, setReviewSuccessfully] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);
  const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const socket = io(serverUrl);
  // const {socket} = useSocket();
  useEffect(() => {
    loadClientRatingForProfessionalsData();
  }, []);

  useEffect(() => {
    // If feedback has been submitted successfully, set feedbackSubmitted to true
    if (reviewSuccessfully) {
      setFeedbackSubmitted(true);
    }
  }, [reviewSuccessfully]);

  const getRating = async () => {
    let data = {
      job_id: contract.job_id,
      rate_by: contract.user_id,
      rate_to: contract.client_id,
      contract_id: contract._id,
    };
    const response = await getContractRating(data);
    if (response?.status === 200 && response?.data?.data?.length > 0) {
      if (response?.data?.data[0].feedback.length > 0) {
        setFeedbackSubmitted(true);
      }
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  const loadClientRatingForProfessionalsData = async () => {
    if (contract !== null) {
      let data = {
        job_id: contract.job_id,
        rate_by: contract.client_id,
        rate_to: contract.user_id,
        contract_id: contract._id,
      };
      try {
        const response = await getContractRating(data);
        if (response?.status === 200 && response?.data?.data?.length > 0) {
          setClientFeedback(response?.data?.data[0]);
          setIsThereProfessionalFeedback(true);
        }
      } catch (error) {
        console.error(error);
        setIsThereProfessionalFeedback(false);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // router.push(`/mycontract`);

    if (!formSubmitted && contract !== null) {
      setFormSubmitted(true);
      setFeedbackSubmitted(true); // Set feedbackSubmitted to true after successful submission
      localStorage.setItem("feedbackSubmitted", "true"); // Store feedback submission status in localStorage
      let data = {
        // Set formSubmitted to true
        job_id: contract.job_id,
        rate_by: contract.user_id,
        rate_to: contract.client_id,
        contract_id: contract._id,
        feedback: comment,
        rate: userRating,
      };
      try {
        const response = await contarctRating(data);
        const route = `/clientContract/${contract?._id}`;
        const dataForNofitication = {
          rout: route,
          send_by: "professional",
          subject: "c_feedback",
          client_id: data.job_id.user_id._id,
          job_id: data.job_id._id,
          email: data.job_id.user_id.email,
          first_name: data.job_id.user_id.first_name,
          last_name: data.job_id.user_id.last_name,
        };

        if (response?.status === 201 || response?.status === 200) {
          router.push(`/findwork`);
          if (response?.data?.message === "Feedback updated successfully") {
            setReviewSuccessfully(response?.data?.message);
            setTimeout(() => {
              setReviewSuccessfully("");
            }, 5000);
          } else if (
            response?.data?.message === "Feedback submitted successfully"
          ) {
            setReviewSuccessfully(response?.data?.message);
            setTimeout(() => {
              setReviewSuccessfully("");
              setComment("");
            }, 5000);
            //Start Notification
            const messageForShow = `${decodedToken.first_name} ${decodedToken.last_name}  has shared feedback for ${data.job_id.job_title}`;
            await postNotification(dataForNofitication).then((res) => {
              const data = {
                rout: route,
                send_by: "professional",
                subject: "c_feedback",
                client_id: data.job_id.user_id._id,
                message: messageForShow,
                status: 0,
              };
              socket.emit("new_notification", data);
              socket.emit("update_notification", { login_as: 1, id: data.job_id.user_id._id });
              setComment("");
            });
            setComment("");
            //End Notification
          }
        }
        setComment("");
        setUserRating(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div>
          <div className="flex items-start justify-start w-full flex-col md:flex-row">
            <div className="w-1/2">
              <h6 className={`font-bold text-[18px] ${mulish700.className}`}>
                Client&apos;s Feedback
              </h6>
              {isThereProfessionalFeedback ? (
                clientFeedback !== null && (
                  <div className="mt-5 w-11/12">
                    <p
                      className={`mt-3 mb-4 text-[#434343] text-[14px] italic font-medium`}
                    >
                      {clientFeedback.rate_by.first_name || ""}{" "}
                      {clientFeedback.rate_by.last_name || ""}
                    </p>
                    <div className="flex justify-between">
                      <div className="flex">
                        <p
                          className={`text-[10px] p-[5px] px-[7px] bg-[#E9F1FF] rounded-[6px]  ${mulish400.className}`}
                        >
                          {clientFeedback.rate}.0
                        </p>
                        <div className="ml-3">
                          <ReadOnlyRating stars={clientFeedback.rate} />
                        </div>
                      </div>
                      <p
                        className={`text-[#434343] text-[12px] ${mulish400.className}`}
                      >
                        {formatDate(clientFeedback.updated_at)}
                      </p>
                    </div>
                    <p className={`mt-3 text-[#434343] text-[14px] italic`}>
                      {clientFeedback.feedback}
                    </p>
                  </div>
                )
              ) : (
                <p className={`mt-5 ${mulish400.className}`}>No comment</p>
              )}
            </div>
            <div className="w-full md:w-1/2 ">
              {reviewSuccessfully !== "" && (
                <div className="w-auto bg-[#d4edda] ml-auto p-3 text-[#155724] rounded data1 mb-3">
                  <button
                    type="button"
                    className="close"
                    onClick={() => setReviewSuccessfully("")}
                  >
                    ×
                  </button>
                  <strong className="ml-2">{reviewSuccessfully}</strong>
                </div>
              )}
              <h1 className={`text-lg ${mulish700.className} text-[#000000]`}>
                Your Feedback
              </h1>
              <div className={`py-2 ${feedbackSubmitted ? "blur" : ""}`}>
                {/* <div className={`py-2`}> */}
                <form
                  className=""
                  action=""
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <label
                    className={`text-base text-[#2D3748] ${inter500.className}`}
                    id="feedback"
                  >
                    Give Feedback
                  </label>

                  <textarea
                    id="feedback"
                    name="name"
                    placeholder="Type Review"
                    className="w-full p-2 my-2 bg-transparent border border-[#ced4da] rounded-lg outline-none resize-none min-h-[113px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="flex items-center justify-start">
                    <p
                      className={`text-base ${inter400.className} text-[#000000]`}
                    >
                      Review :{" "}
                    </p>
                    <span> </span>
                    <StarRating
                      maxRating={5}
                      size={18}
                      onSetRating={setUserRating}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formSubmitted} // Disable button if form has been submitted
                    className={`w-full md:w-auto bg-[#E9F1FF] text-[#434343] text-lg ${inter600.className} my-3 py-2 px-3 rounded hover:text-[#fff] hover:bg-[#1068AD] transition-colors duration-200 ease-in-out`}
                  >
                    Submit {/* Change button text when form is submitted */}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
};

export default Feedback;
