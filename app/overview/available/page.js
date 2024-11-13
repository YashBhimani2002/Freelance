"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import {
  withdrawAmount,
  bankadddetails,
  bankstore,
  postNotification,
} from "@/app/api/api";
import WithdrawalLoader from "@/components/common/WithdrawalLoader";
import CardIcon from "../../../public/CardDetail/cardicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

const cancelIcon = (
  <svg
    class="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18 18 6m0 12L6 6"
    />
  </svg>
);

const Available = (props) => {
  let { milestones, allMilestone, bankDetails, PopupOfWithdrawl } = props;
  const [modal, setModal] = useState(false);
  const [selectedBankData, setSelectedBankData] = useState("");
  const [LodingButton, setLodingButton] = useState(false);
  const [withdrawalLoader, setWithdrawalLoader] = useState(false);
  const [errorPaymentMethod, seterrorPaymentMethod] = useState(false);
  const [validationPopup, setValidationPopup] = useState(false);
  const [subLoader, setSubLoader] = useState(false);
  const [domesticbankDetails, domesticsetBankDetails] = useState([]);
  const [userBankDetails, setUserBankDetails] = useState([]);
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);

  const handleProcessWithdrawal = () => {
    setWithdrawalLoader(false);
    setModal((isOpen) => !isOpen);
  };
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State to track payment method

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const [userFormData, setUserFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    accountType: "Savings",
    bankName: "",
    routingNumber: "",
    swiftCode: "",
    address: "",
    country: "",
    ifsc_no: "",
  });

  useEffect(() => {
    console.log("userFormData", userFormData);
  }, [userFormData]);

  useEffect(() => {
    console.log("decodedToken", decodedToken);
  }, [decodedToken]);

  const [errorMessages2, setErrorMessages2] = useState({
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    bankName: "",
    address: "",
    country: "",
    ifsc_no: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    acc_name: "",
    acc_number: "",
    ifsc_no: "",
    bank_name: "",
  });

  const [formData, setFormData] = useState({
    acc_name: "",
    acc_number: "",
    b_type: "Savings",
    ifsc_no: "",
    bank_name: "",
  });
  // Function to calculate total amount for a specific status
  const calculateTotalAmount = (milestones) => {
    let totalAmount = 0;
    milestones.forEach((milestone) => {
      totalAmount += milestone.milestone_price;
    });
    return totalAmount;
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Name: ${name}, Value: ${value}`); // Debugging line
    setUserFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Clear error message when the user starts typing
    setErrorMessages2((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // If the input is 'ifsc_no', filter the input value
    if (name === "ifsc_no") {
      console.log(`Input Name: ${name}, Value: ${value}`); // Log the input
      // Filter out any characters that are not alphanumeric
      const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
      value = filteredValue; // Set value to the filtered value
    }

    // Update the form data state with the new value
    setUserFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear any error messages for the specific field
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Group milestones by project ID and calculate required values
  const groupedMilestones = {};
  let totalBilledAmount = 0;
  milestones?.forEach((milestone) => {
    const projectId = milestone.job_id._id;
    if (!groupedMilestones[projectId]) {
      groupedMilestones[projectId] = {
        milestones: [],
        totalMilestonesForJob: 0,
        totalAmountForProject: 0,
      };
    }
    groupedMilestones[projectId].milestones.push(milestone);
    groupedMilestones[projectId].totalMilestonesForJob = allMilestone.filter(
      (m) => m.job_id?._id === projectId
    ).length;
    groupedMilestones[projectId].totalAmountForProject +=
      milestone.milestone_price;
    totalBilledAmount += milestone.milestone_price;
  });

  // Calculate total fees
  const totalFees = Math.floor(totalBilledAmount * 0.1);

  // Calculate total earnings (total billed amount - total fees)
  const totalEarnings = totalBilledAmount - totalFees;

  // const getAdddetials = async () => {
  //   await bankadddetails().then((res) => {
  //     console.log("responseofbank", res);
  //     if (res) {
  //       if (res?.status == 200) {
  //         const International = [];
  //         const domesticData = [];
  //         res?.data?.filter((val) => {
  //           console.log("value of ifsc", val);
  //           if (val.ifsc_code !== "") {
  //             domesticData.push(val);
  //             console.log("true", val);
  //           } else {
  //             International.push(val);
  //             console.log("false", val);
  //           }
  //         });
  //         domesticsetBankDetails(domesticData);
  //         setUserBankDetails(International);
  //       }
  //     }
  //   });
  // };
  const handleForSubmit = async () => {
    // console.log("test");
    const errors = {};
    if (!userFormData.accountHolderName.trim()) {
      errors.accountHolderName = "Please enter account holder name.";
    } else if (
      !/^[a-zA-Z\s]{3,}$/.test(userFormData.accountHolderName.trim())
    ) {
      errors.accountHolderName =
        "Account holder name must be at least 3 characters and contain only letters";
    }
    if (!userFormData.accountNumber.trim()) {
      errors.accountNumber = "Please enter account number.";
    } else if (!/^\d{10,14}$/.test(userFormData.accountNumber.trim())) {
      errors.accountNumber =
        "Please enter a valid account number (10-14 digits).";
    }

    if (selectedPaymentMethod === "International") {
      if (!userFormData.routingNumber.trim()) {
        errors.routingNumber = "Please enter routing number.";
      }
      if (!userFormData.swiftCode.trim()) {
        errors.swiftCode = "Please enter Swift code.";
      } else if (
        !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(
          userFormData.swiftCode.trim()
        )
      ) {
        errors.swiftCode = "Please enter a valid SWIFT code.";
      }
      if (!userFormData.address.trim()) {
        errors.address = "Please enter address.";
      }
      if (!userFormData.country.trim()) {
        errors.country = "Please enter country.";
      }
    }
    if (!userFormData.bankName.trim()) {
      errors.bankName = "Please enter bank name.";
    }

    setErrorMessages2(errors);
    setErrorMessages(errors);

    // If there are errors, display them and prevent form submission
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
      return;
    }

    // Add new bank details
    const data = {
      bank_name: userFormData.bankName,
      acc_name: userFormData.accountHolderName,
      acc_number: userFormData.accountNumber,
      b_type: userFormData.accountType,
      ifsc_code: userFormData.ifsc_no,
      routing_number: userFormData.routingNumber,
      swift_code: userFormData.swiftCode,
      address: userFormData.address,
      country: userFormData.country,
    };
    console.log("DATA", data);
    setWithdrawalLoader(true);
    let mileid = [];
    milestones.map((item) => {
      mileid.push(item._id);
    });
    const data1 = {
      paymentme: data,
      mileid: mileid,
      commi: "10",
      totalpayment: totalEarnings,
    };
    const route = ``;
    const dataForNofitication = {
      rout: route,
      send_by: "professional",
      subject: "withdraw_Payment",
      client_id: decodedToken._id,
      job_id: "",
      email: decodedToken.email,
      first_name: decodedToken.first_name,
      last_name: decodedToken.first_name,
    };

    await withdrawAmount(data1).then(async (response) => {
      if (response?.status == 200) {
        if (response?.data.response == "error") {
          setLodingButton(false);
          setWithdrawalLoader(false);
          handleProcessWithdrawal();
          PopupOfWithdrawl("error", response?.data?.msg);
        } else {
          setLodingButton(false);
          setWithdrawalLoader(false);
          handleProcessWithdrawal();
          PopupOfWithdrawl("sucess", response?.data?.msg);
        }
        // const messageForShow = `Application for ${jobDetails.job_title} has been withdrawn by ${decodedToken.first_name} ${decodedToken.last_name}"`;
        const messageForShow = "";
        await postNotification(dataForNofitication).then((res) => {
          const data = {
            rout: route,
            send_by: "professional",
            subject: "withdraw_Payment",
            client_id: decodedToken._id,
            message: messageForShow,
            status: 0,
          };
          // socket.emit("new_notification", data);
        });
      } else {
        setLodingButton(false);
        setWithdrawalLoader(false);
        handleProcessWithdrawal();
        PopupOfWithdrawl("error", response?.data?.msg);
      }
    });

    // Clear the form data
    setUserFormData({
      accountHolderName: "",
      accountNumber: "",
      accountType: "Savings",
      bankName: "",
      routingNumber: "",
      swiftCode: "",
      address: "",
      country: "",
      ifsc_no: "",
    });

    // Clear the form data
    setFormData({
      acc_name: "",
      acc_number: "",
      b_type: "Savings",
      ifsc_no: "",
      bank_name: "",
    });
  };

  const handleValidation = () => {
    setSubLoader(true);
    window.location.href = "/paymentpreferences";
  };
  return (
    <>
      <div className="main-over-tab">
        {milestones?.length > 0 ? (
          <div className="table-responsive overflow-x-auto">
            <table
              className="table w-full min-w-max"
              style={{ marginBottom: "16px" }}
            >
              <thead>
                <tr className={`${inter700.className} font-700`}>
                  <th scope="col">PROJECT</th>
                  <th scope="col">MILESTONES COMPLETED</th>
                  <th scope="col">FEES</th>
                  <th scope="col">AMOUNT BILLED</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedMilestones).map((projectId) => {
                  const {
                    milestones,
                    totalMilestonesForJob,
                    totalAmountForProject,
                  } = groupedMilestones[projectId];
                  const fee = Math.floor(totalAmountForProject * 0.1);

                  return (
                    <tr key={projectId} className="border-t border-[#eee]">
                      <td
                        className={`p-[12px] text-left text-[#2D3748] text-sm ${inter400.className}`}
                      >
                        {milestones[0]?.job_id?.job_title}
                      </td>
                      <td
                        className={`p-[12px] text-center text-[#2D3748] text-sm ${inter400.className}`}
                      >
                        {`${milestones?.length}/${totalMilestonesForJob}`}
                      </td>
                      <td
                        className={`p-[12px] text-center text-[#2D3748] text-sm ${inter400.className}`}
                      >
                        N{fee}
                      </td>
                      <td
                        className={`p-[12px] text-right text-[#2D3748] text-sm ${inter400.className}`}
                      >
                        N{totalAmountForProject}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <span
            className={`${inter400.className} font-400 text-black ml-[35%]`}
            style={{
              color: "#adadad",
              lineHeight: "24px",
              letterSpacing: "0.5px",
            }}
          >
            No Data Found
          </span>
        )}
        <div className="">
          {milestones?.length > 0 && (
            <table className="table table-total" style={{ marginTop: "40px" }}>
              <thead>
                <tr className={`${inter700.className} font-700`}>
                  <th scope="col">TOTAL BILLED</th>
                  <th scope="col">N{totalBilledAmount}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#eee]">
                  <td
                    className={`p-[12px] text-left text-[#2D3748] text-sm ${inter400.className}`}
                  >
                    FEES
                  </td>
                  <td
                    className={`p-[12px] text-right text-[#2D3748] text-sm ${inter400.className}`}
                  >
                    N{totalFees}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <div className="my-5 pt-3 pb-5 border-t border-[#eee] flex items-center justify-between text-black">
            <h1 className={`${mulish700.className} text-[23px]`}>
              Your Earnings
            </h1>
            <h1 className={`${mulish700.className} text-[23px]`}>
              N{totalEarnings}
            </h1>
          </div>
        </div>
        <div className="flex justify-end">
          {totalEarnings === 0 ? (
            <button
              className={`btn btn-opacity ${inter600.className} text-gray bg-active_bg`}
            >
              Process Withdrawal
            </button>
          ) : (
            <button
              className={`btn ${inter600.className} bg-active_bg`}
              onClick={handleProcessWithdrawal}
            >
              Process Withdrawal
            </button>
          )}
        </div>
        <div className="text-end">
          <span
            className={`${inter400.className}`}
            style={{
              display: "inline-block",
              color: "#adadad",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0.5px",
              marginTop: "20px",
            }}
          >
            *due to CBN policy, you may be charged a token transaction fee to
            process your withdrawal. See our{" "}
            <Link
              href="#"
              className="text-decoration-none"
              style={{ color: "#0064cb", cursor: "pointer!important" }}
            >
              Payment Policy
            </Link>{" "}
            for details.
          </span>
        </div>
      </div>
      {modal && (
        <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h-screen bg-black bg-opacity-70">
          <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-3">
            <div className="bg-white w-full lg:max-w-[800px] rounded-[20px] relative slideInFromTop p-6">
              <div
                className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                onClick={handleProcessWithdrawal}
              >
                {cancelIcon}
              </div>

              <h1
                className={`${mulish800.className} text-[26px] text-[#000000]`}
              >
                Process Withdrawal
              </h1>

              {/* Available Balance */}
              <div className="border-y border-[#eee] py-4">
                <div className="mb-4">
                  <p
                    className={`${inter500.className} text-[#2D3748] text-base`}
                  >
                    Available Balance
                  </p>
                  <p className={`${inter500.className} text-sm text-[#718096]`}>
                    N{totalEarnings}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <p
                    className={`${inter500.className} text-[#2D3748] text-base`}
                  >
                    Payment Method
                  </p>
                  <select
                    className={`w-full border border-[#eee] p-[5px] text-sm ${inter500.className} h-[40px]`}
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange} // Change to handle payment method
                  >
                    <option value="">Select payment method</option>
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                  {errorPaymentMethod && (
                    <p className="text-sm text-red-600">
                      Please select payment method
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between mb-4">
                  <p
                    className={`${inter500.className} text-[#2D3748] text-base`}
                  >
                    Amount
                  </p>
                  <p
                    className={`${inter500.className} text-[#2D3748] text-base`}
                  >
                    NGN {totalEarnings}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className={`radio-btn-name ${mulish600.className}`}>
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded"
                    onChange={handleUserInputChange}
                    value={userFormData.accountHolderName}
                    name="accountHolderName" // Ensure name matches state
                  />
                  {errorMessages2.accountHolderName && (
                    <p className="text-red-600">
                      {errorMessages2.accountHolderName}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`radio-btn-name ${mulish600.className}`}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber" // Ensure name matches state
                    maxLength={14}
                    className="w-full p-3 border border-gray-300 rounded"
                    onChange={handleUserInputChange}
                    value={userFormData.accountNumber}
                    onKeyDown={(e) => {
                      if (
                        !/^[0-9]$/.test(e.key) &&
                        ![
                          "Backspace",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Home",
                          "End",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errorMessages2.accountNumber && (
                    <p className="text-red-600">
                      {errorMessages2.accountNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`radio-btn-name ${mulish600.className}`}>
                    Account Type
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded"
                    onChange={handleUserInputChange}
                    value={userFormData.accountType}
                    name="accountType" // Add this line
                  >
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                  </select>
                </div>

                <div>
                  <label className={`radio-btn-name ${mulish600.className}`}>
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName" // Ensure name matches state
                    className="w-full p-3 border border-gray-300 rounded"
                    onChange={handleUserInputChange}
                    value={userFormData.bankName}
                  />
                  {errorMessages2.bankName && (
                    <p className="text-red-600">{errorMessages2.bankName}</p>
                  )}
                </div>
              </div>
              {selectedPaymentMethod === "Domestic" && (
                <div>
                  <label
                    htmlFor="ifsc_no"
                    className={`radio-btn-name ${mulish600.className} tracking-wide`}
                  >
                    Bank Code{" "}
                    <span className="text-gray text-[13px]">
                      (e.g. 058 for GTB, 044 for Access Bank etc.)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="ifsc_no"
                    id="ifsc_no"
                    value={userFormData.ifsc_no}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    maxLength={11}
                  />
                  {errorMessages2.ifsc_no && (
                    <p className="text-red-500">{errorMessages.ifsc_no}</p>
                  )}
                </div>
              )}

              {/* International Transaction Fields */}
              {selectedPaymentMethod === "International" && (
                <div className="grid md:grid-cols-1 gap-4 mt-6">
                  {/* Add the heading for International Transaction */}
                  <h3
                    className={`text-lg font-bold mt-6 ${mulish700.className}`}
                  >
                    For International Transaction
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label
                        className={`radio-btn-name ${mulish600.className}`}
                      >
                        Routing Number
                      </label>
                      <input
                        type="text"
                        name="routingNumber"
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={handleUserInputChange}
                        value={userFormData.routingNumber}
                      />
                      {errorMessages2.routingNumber && (
                        <p className="text-red-600">
                          {errorMessages2.routingNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`radio-btn-name ${mulish600.className}`}
                      >
                        Swift Code
                      </label>
                      <input
                        type="text"
                        name="swiftCode"
                        maxLength={11}
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={handleUserInputChange}
                        value={userFormData.swiftCode}
                      />
                      {errorMessages2.swiftCode && (
                        <p className="text-red-600">
                          {errorMessages2.swiftCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`radio-btn-name ${mulish600.className}`}
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={handleUserInputChange}
                        value={userFormData.address}
                      />
                      {errorMessages2.address && (
                        <p className="text-red-600">{errorMessages2.address}</p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`radio-btn-name ${mulish600.className}`}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={handleUserInputChange}
                        value={userFormData.country}
                      />
                      {errorMessages2.country && (
                        <p className="text-red-600">{errorMessages2.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-start gap-2 sm:gap-5 items-center mt-6">
                <button
                  className={`w-full sm:w-auto bg-[#286cac] text-white py-2 px-3 rounded sm:rounded-[10px] h-[39px] border border-[#286cac] hover:bg-transparent hover:text-[#286cac] transition-colors duration-200 ease-in-out ${inter500.className}`}
                  onClick={handleForSubmit}
                >
                  Submit Withdrawal Request
                </button>

                <button
                  className={`w-full sm:w-auto bg-transparent text-[#000] py-2 px-3 rounded h-[39px] border border-[#eee] sm:border-transparent hover:border-[#286cac] hover:text-[#286cac] transition-colors duration-200 ease-in-out ${inter600.className}`}
                  onClick={handleProcessWithdrawal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {withdrawalLoader == true && <WithdrawalLoader />}
    </>
  );
};

export default Available;
