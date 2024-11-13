import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Rating from "../../StarRating/Rating";
import ReadOnlyRating from "../../StarRatingReadOnly/Rating";
import { contarctRating, getContractRating, postNotification } from "@/app/api/api";
import io from "socket.io-client";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import "./style.css";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { useSocket } from "@/app/socketContext";


const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

function Feedback(props) {
  const { id, allContract } = props;
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [isThereProfessionalFeedback, setIsThereProfessionalFeedback] =
    useState(false);
  const [feedbackMassage, setFeedbackMassage] = useState("");

  const [professionalFeedback, setProfessionalFeedback] = useState(null);
  const [reviewSuccessfully, setReviewSuccessfully] = useState("");
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);
  const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  // const socket = io(serverUrl);
  const {socket}=useSocket()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfessionalRatingData();
  }, [allContract]);


  useEffect(() => {
    // If feedback has been submitted successfully, set feedbackSubmitted to true
    if (reviewSuccessfully) {
      setFeedbackSubmitted(true);
    }
  }, [reviewSuccessfully]);

  const getRating = async() => {
    let data = {
      job_id: allContract[0].job_id,
      rate_by: allContract[0].client_id,
      rate_to: allContract[0].user_id,
      contract_id: allContract[0]._id,
    };
    const response = await getContractRating(data);
    if (response?.status === 200 && response?.data?.data?.length > 0) {
      if(response?.data?.data[0].feedback.length > 0){
        setFeedbackSubmitted(true);
      }
    }
  }

  useEffect(()=>{
    getRating()
  },[])
  


  const loadProfessionalRatingData = async () => {
    setLoading(true)
    if (allContract !== null) {
      let data = {
        job_id: allContract[0].job_id,
        rate_by: allContract[0].user_id,
        rate_to: allContract[0].client_id,
        contract_id: allContract[0]._id,
      };
      try {
        const response = await getContractRating(data);
        if (response?.status === 200 && response?.data?.data?.length > 0) {
          setProfessionalFeedback(response?.data?.data[0]);
          setIsThereProfessionalFeedback(true);          
        }
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    }
  };

  const handleFeedbackChange = (event) => {
    const newValue = event.target.value;
    setFeedbackMassage(newValue);
  };

  const sendRating = (rate) => {
    setRating(rate);
  };

  const handleSubmitButtonClick = async () => {
    if (!formSubmitted && allContract !== null) {
      setFormSubmitted(true);
      setFeedbackSubmitted(true); // Set feedbackSubmitted to true after successful submission
      let data = {
        job_id: allContract[0].job_id,
        rate_by: allContract[0].client_id,
        rate_to: allContract[0].user_id,
        contract_id: allContract[0]._id,
        feedback: feedbackMassage,
        rate: rating,
      };
      try {
        const response = await contarctRating(data);
        const route = `/mycontract/${allContract[0]._id}`;
        const dataForNofitication = {
          rout: route,
          send_by: "client",
          subject: "p_feedback",
          professional_id: allContract[0].professional_id,
          email: allContract[0]?.professional_data[0].email,
          job_id: allContract[0].job_id,
          first_name: allContract[0].professional_data[0].first_name,
          last_name: allContract[0].professional_data[0].last_name,
        };

        if (response?.status === 201 || response?.status === 200) {
          router.push("/projects");
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
            }, 5000);
            const messageForShow = `${decodedToken.first_name} ${decodedToken.last_name} has shared feedback for ${allContract[0].jobs_data[0].job_title}`;
            await postNotification(dataForNofitication).then((res) => {
              const data = {
                rout: route,
                send_by: "client",
                subject: "p_feedback",
                professional_id: allContract[0].professional_id,
                message: messageForShow,
                status: 0,
              };
              socket.emit("new_notification", data);
              socket.emit("update_notification", { login_as: 2, id: allContract[0].professional_id });
            });
          }
        }
        setRating(0);
        setFeedbackMassage("");
        // router.push("/clientContract");
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
      {loading? <Loader /> :
      <div className="flex flex-col-reverse md:flex-row w-full shadeInAnimation">
        <div className="w-full md:w-1/2 my-10 md:my-0">
          <h6 className={`text-[18px] ${mulish700.className} tracking-wide`}>
            Professional&apos;s Feedback
          </h6>
          {isThereProfessionalFeedback ? (
            professionalFeedback !== null && (
              <div className="mt-5 w-11/12">
                <p
                  className={`mt-3 mb-4 text-[#434343] text-[14px] italic font-medium`}
                >
                  {professionalFeedback.rate_by.first_name || ""}{" "}
                  {professionalFeedback.rate_by.last_name || ""}
                </p>
                <div className="flex justify-between">
                  <div className="flex">
                    <p
                      className={`text-[10px] p-[5px] px-[7px] bg-[#E9F1FF] rounded-[6px]  ${mulish400.className}`}
                    >
                      {professionalFeedback?.rate}.0
                    </p>
                    <div className="ml-3">
                      <ReadOnlyRating stars={professionalFeedback?.rate} />
                    </div>
                  </div>
                  <p
                    className={`text-[#434343] text-[12px] ${mulish400.className}`}
                  >
                    {formatDate(professionalFeedback.updated_at)}
                  </p>
                </div>
                <p className={`mt-3 text-[#434343] text-[14px] italic`}>
                  {professionalFeedback.feedback}
                </p>
              </div>
            )
          ) : (
            <p className={`mt-5 ${mulish400.className}`}>No comment</p>
          )}
        </div>
        <div className="w-auto md:w-1/2">
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
          <h6 className={`text-[18px] ${mulish700.className} tracking-wide`}>
            Your Feedback
          </h6>
          <div className={`py-2 ${feedbackSubmitted ? 'blur' : ''}`}>
            <p
              className={`mt-3 mb-3 text-base text-[#2D3748] ${inter500.className}`}
            >
              Give Feedback
            </p>
            <div>
              <textarea
                onChange={handleFeedbackChange}
                value={feedbackMassage}
                style={{ border: "1px solid #ced4da" }}
                className="p-2 w-full h-30 border rounded"
                placeholder="Type Review"
              />
            </div>
            <div className="mt-2 mb-3 flex items-center">
              <p className={`inline-block text-base ${inter400.className}`}>
                Review :
              </p>
              <Rating sendRating={sendRating} />
            </div>
            <button
              disabled={formSubmitted}
              onClick={handleSubmitButtonClick}
              className={`w-full md:w-auto bg-[#E9F1FF] text-[#434343] rounded py-[6px] px-[12px] text-lg ${inter600.className} hover:text-[#fff] hover:bg-[#1068AD] transition-colors duration-200 ease-in-out`}
            >
              Submit
            </button>
          </div>
        
        </div>
      </div>}
      </>
    </ErrorBoundary>
  );
}

export default Feedback;
