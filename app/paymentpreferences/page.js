"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import CardImage from "../../public/CardDetail/carddetails.png";
import CardIcon from "../../public/CardDetail/cardicon.png";
import { bankadddetails, bankremove, bankstore, bankupdate } from "../api/api";
import Image from "next/image";

import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
const inter = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const mulish = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

const PaymentPref = () => {
  //***********ADD UPADTE AND REMOVE FOR DOMESTIC BANK DETAILS*************//
  const [formData, setFormData] = useState({
    acc_name: "",
    acc_number: "",
    b_type: "Savings",
    ifsc_no: "",
    bank_name: "",
  });
  const [editingIndex, setEditingIndex] = useState(undefined);
  const [domesticbankDetails, domesticsetBankDetails] = useState([]);
  const [userBankDetails, setUserBankDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDomesticModal, setShowDomesticModal] = useState(false);
  const [showInternationalModal, setShowInternationalModal] = useState(false);
  // State variables for error messages
  const [errorMessages, setErrorMessages] = useState({
    acc_name: "",
    acc_number: "",
    ifsc_no: "",
    bank_name: "",
  });
  const openDomesticModal = () => {
    setShowDomesticModal(true);
    setShowInternationalModal(false); // Close the international modal if open
  };

  const openInternationalModal = () => {
    setShowInternationalModal(true);
    setShowDomesticModal(false); // Close the domestic modal if open
  };

  const closeModal = () => {
    const modal = document.getElementById("slideOutToTop");
    modal.classList.add("slideOutToTop");

    setFormData({
      acc_name: "",
      acc_number: "",
      b_type: "Savings",
      ifsc_no: "",
      bank_name: "",
    });

    setErrorMessages("");
    setErrorMessages2("");
    setUserFormData({
      accountHolderName: "",
      accountNumber: "",
      accountType: "Savings",
      bankName: "",
      routingNumber: "",
      swiftCode: "",
      address: "",
      country: "",
    });

    setEditingIndex(undefined);
    setEditingItemIndex(undefined);

    // Delay removing the modal from the DOM to allow the animation to complete
    setTimeout(() => {
      setShowDomesticModal(false);
      setShowInternationalModal(false);
    }, 300);
  };
  const getAdddetials = async () => {
    await bankadddetails().then((res) => {
      if (res) {
        if (res?.status == 200) {
          const International = [];
          const domesticData = [];
          res?.data?.filter((val) => {
            if (val.ifsc_code !== "") {
              domesticData.push(val);
            } else {
              International.push(val);
            }
          });
          domesticsetBankDetails(domesticData);
          setUserBankDetails(International);
        }
      }
    });
  };
  useEffect(() => {
    getAdddetials();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name == "ifsc_no") {
      const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
      value = filteredValue;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error message when the user starts typing
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFormSubmit = async () => {
    // Validate the form data
    const errors = {};
    if (!formData.acc_name.trim()) {
      errors.acc_name = "Please enter account holder name.";
    } else if (!/^[a-zA-Z\s]{3,}$/.test(formData.acc_name.trim())) {
      errors.acc_name =
        "Account holder name must be at least 3 characters and contain only letters";
    }
    if (!formData.acc_number.trim()) {
      errors.acc_number = "Please enter account number.";
    } else if (!/^\d{10,14}$/.test(formData.acc_number.trim())) {
      errors.acc_number = "Please enter a valid account number (10-14 digits).";
    }
    if (!formData.ifsc_no.trim()) {
      errors.ifsc_no = "Please enter bank Code.";
    }
    if (!formData.bank_name.trim()) {
      errors.bank_name = "Please enter bank name.";
    }
    setErrorMessages(errors);
    // If there are errors, display them and prevent form submission
    if (Object.keys(errors).length > 0) {
      return;
    }
    setShowDomesticModal(false);

    // Check if editingIndex is defined, indicating an edit operation
    if (editingIndex !== undefined) {
      // Update the bank details at the specified index
      const data = {
        bid: editingIndex,
        acc_name: formData.acc_name,
        acc_number: formData.acc_number,
        b_type: formData.b_type,
        ifsc_no: formData.ifsc_no,
        bank_name: formData.bank_name,
      };
      await bankupdate(data).then((res) => {
        if (res?.status == 200) {
          getAdddetials();
        }
      });

      // Reset the editing index
      setEditingIndex(undefined);
    } else {
      await bankstore(formData).then((res) => {
        if (res?.status == 200) {
          getAdddetials();
        }
      });
    }
    // Clear the form data
    setFormData({
      acc_name: "",
      acc_number: "",
      b_type: "Savings",
      ifsc_no: "",
      bank_name: "",
    });
  };

  const handleRemove = async (bid) => {
    const data = {
      bill_id: bid,
    };
    await bankremove(data).then((res) => {
      if (res?.status == 200) {
        getAdddetials();
      }
    });
  };

  const handleEdit = async (indexToEdit) => {
    const bankToEdit = domesticbankDetails[indexToEdit];

    // Set the form data for editing
    setFormData({
      acc_name: bankToEdit.account_holder_name,
      acc_number: bankToEdit.bank_account,
      b_type: bankToEdit.bank_type,
      ifsc_no: bankToEdit.ifsc_code,
      bank_name: bankToEdit.bank_name,
    });

    // Save the index of the item being edited
    setEditingIndex(bankToEdit._id);
    setShowDomesticModal(true);
  };

  //***********ADD UPADTE AND REMOVE FOR INTERNATIONAL BANK DETAILS**********//

  const [userFormData, setUserFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    accountType: "Savings",
    bankName: "",
    routingNumber: "",
    swiftCode: "",
    address: "",
    country: "",
  });

  const [editingItemIndex, setEditingItemIndex] = useState(undefined);
  //Error Msg
  const [errorMessages2, setErrorMessages2] = useState({
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    bankName: "",
    address: "",
    country: "",
  });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Clear error message when the user starts typing
    setErrorMessages2((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleUserFormSubmit = async () => {
    // Validate the form data
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
    if (!userFormData.routingNumber.trim()) {
      errors.routingNumber = "Please enter routing number.";
    }
    if (!userFormData.swiftCode.trim()) {
      errors.swiftCode = "Please enter Swift code.";
    } else if (
      !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(userFormData.swiftCode.trim())
    ) {
      errors.swiftCode = "Please enter a valid SWIFT code.";
    }
    if (!userFormData.bankName.trim()) {
      errors.bankName = "Please enter bank name.";
    }
    if (!userFormData.address.trim()) {
      errors.address = "Please enter address.";
    }
    if (!userFormData.country.trim()) {
      errors.country = "Please enter country.";
    }
    setErrorMessages2(errors);

    // If there are errors, display them and prevent form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    setShowInternationalModal(false);

    if (editingItemIndex !== undefined) {
      const data = {
        bid: editingItemIndex,
        bank_name: userFormData.bankName,
        acc_name: userFormData.accountHolderName,
        acc_number: userFormData.accountNumber,
        b_type: userFormData.accountType,
        ifsc_code: "",
        routing_number: userFormData.routingNumber,
        swift_code: userFormData.swiftCode,
        address: userFormData.address,
        country: userFormData.country,
      };
      await bankupdate(data).then((res) => {
        if (res?.status == 200) {
          getAdddetials();
        }
      });

      // Reset the editing index
      setEditingItemIndex(undefined);
    } else {
      // Add new bank details
      const data = {
        bank_name: userFormData.bankName,
        acc_name: userFormData.accountHolderName,
        acc_number: userFormData.accountNumber,
        b_type: userFormData.accountType,
        ifsc_code: "",
        routing_number: userFormData.routingNumber,
        swift_code: userFormData.swiftCode,
        address: userFormData.address,
        country: userFormData.country,
      };
      await bankstore(data).then((res) => {
        if (res?.status == 200) {
          getAdddetials();
        }
      });
    }

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
    });
  };

  const handleUserEdit = (indexToEdit) => {
    const userBankToEdit = userBankDetails[indexToEdit];

    // Set the form data for editing
    setUserFormData({
      accountHolderName: userBankToEdit.account_holder_name,
      accountNumber: userBankToEdit.bank_account,
      accountType: userBankToEdit.bank_type,
      bankName: userBankToEdit.bank_name,
      routingNumber: userBankToEdit.routing_number,
      swiftCode: userBankToEdit.swift_code,
      address: userBankToEdit.address,
      country: userBankToEdit.country,
    });

    // Save the index of the item being edited
    setEditingItemIndex(userBankToEdit._id);
    setShowInternationalModal(true);
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
        <div className="main-payment xl:pl-16 lg:py-12">
          <div className="grid grid-cols-1 ">
            {/* Bank Detail (Domestic) */}
            <div className=" domestic lg:w-full">
              <div className="bank_detail_title">
                <h2
                  className={`${mulish600.className} text-[22px] text-[#000] tracking-wide`}
                >
                  <Tooltip title=' Bank Detail (Domestic)' arrow placement="right" componentsProps={tooltipClass}>
                  Bank Detail (Domestic)
                  </Tooltip>
                </h2>
              </div>
              <div className="row bank_detail">
                <div className=" bank_detail_tbl_title">
                  <div className={`text-sm ${inter600.className}`}>
                    Bank Detail
                  </div>
                  <div
                    className={`bank_form_btn ${inter600.className} text-sm`}
                    data-bs-toggle="modal"
                    data-bs-target="#BankDetailDomestic"
                    onClick={openDomesticModal}
                  >
                    Add Bank Detail
                  </div>
                </div>
                <div className=" bank_detail_tbl_data overflow-x-auto">
                  <table className={`w-full ${inter700.className} text-sm`}>
                    <thead>
                      <tr>
                        <th>Bank Name</th>
                        <th>Account Number</th>
                        <th>Account Holder Name</th>
                        <th>Account Type</th>
                        <th>Bank Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domesticbankDetails.map((detail, index) => (
                        <tr className={`${inter.className}`} key={index}>
                          <td>{detail.bank_name}</td>
                          <td>{detail.bank_account}</td>
                          <td>{detail.account_holder_name}</td>
                          <td>{detail.bank_type}</td>
                          <td>{detail.ifsc_code}</td>
                          <td className="d-flex flex-column flex custome-width custome-flex">
                            <button
                              className="bank_detail_tbl_data_remove_btn"
                              onClick={() => handleRemove(detail._id)}
                            >
                              Remove
                            </button>
                            <button
                              className="bank_detail_tbl_data_edit_btn w-[80px]"
                              data-bs-toggle="modal"
                              data-bs-target="#BankDetailDomestic"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bank Detail (International) */}
            <div className=" domestic pt-10">
              <div className="bank_detail_title">
                <h2
                  className={`${mulish600.className} text-[22px] text-[#000] tracking-wide`}
                >
                  <Tooltip title='Bank Detail (International)' arrow placement="right" componentsProps={tooltipClass}>
                  Bank Detail (International)
                  </Tooltip>
                </h2>
              </div>
              <div className="bank_detail ">
                <div className=" bank_detail_tbl_title">
                  <div className={`text-sm ${inter600.className}`}>
                    Bank Detail
                  </div>
                  <div
                    className={`bank_form_btn ${inter600.className} text-sm`}
                    data-bs-toggle="modal"
                    data-bs-target="#BankDetailInternational"
                    onClick={openInternationalModal}
                  >
                    Add Bank Detail
                  </div>
                </div>
                <div className=" bank_detail_tbl_data overflow-x-auto">
                  <table className={`w-full ${inter700.className} text-sm`}>
                    <thead>
                      <tr>
                        <th>Bank Name</th>
                        <th>Account Number</th>
                        <th>Account Holder Name</th>
                        <th>Account Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBankDetails.map((bank, index) => (
                        <tr className={`${inter.className}`} key={index}>
                          <td>{bank.bank_name}</td>
                          <td>{bank.bank_account}</td>
                          <td>{bank.account_holder_name}</td>
                          <td>{bank.bank_type}</td>
                          <td className="d-flex flex-column flex custome-width  custome-flex">
                            <button
                              className="bank_detail_tbl_data_remove_btn"
                              onClick={() => handleRemove(bank._id)}
                            >
                              Remove
                            </button>
                            <button
                              className="bank_detail_tbl_data_edit_btn w-[80]"
                              data-bs-toggle="modal"
                              data-bs-target="#BankDetailInternational"
                              onClick={() => handleUserEdit(index)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <span className="Payment_Policy_msg">
            Check our{" "}
            <span>
              <a href="/payment-policy">Payment Policy</a>
            </span>{" "}
            for charges on international withdrawals.
          </span>
        </div>

        {showDomesticModal && (
          <BankDetailDomesticModal
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            errorMessages={errorMessages}
            closeModal={closeModal}
          />
        )}
        {/* Conditional Rendering of Modals */}

        {showInternationalModal && (
          <div className="w-screen py-14 min-h-screen max-h-fit z-[99991] bg-black bg-opacity-70 fixed top-0 left-0 !overflow-auto touch-auto">
            <div
              className="modal w-[90%] sm:w-4/5  sm:max-w-[790px] fade my-billings-add-a-card rounded-[20px]  bg-opacity-50 min-h-full   overflow-y-auto overflow-x-hidden absolute left-1/2 transform -translate-x-1/2  "
              id="BankDetailInternational"
            >
              <div
                className="modal-dialog modal-dialog-centered bg-white rounded-[20px] h-auto slideInFromTop"
                id="slideOutToTop"
              >
                <div className={`${mulish600.className} modal-content`}>
                  <form autoComplete="off">
                    <div className="modal-header " style={{ border: "none" }}>
                      <button
                        type="button"
                        className="close-icon border-2 border-t-[#6b7280] border-l-[#6b7280] border-r-black border-b-black"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                      >
                        <span className="fa fa-times">X</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <div className="row grid grid-cols-1 xl:grid-cols-2 gap-10">
                        <div className=" alt">
                          <Image
                            src={CardImage}
                            className="add-a-card-img w-full h-auto object-cover"
                            alt="add-a-card-img "
                          />
                        </div>
                        <div className=" grid grid-cols-1">
                          <div className=" h-auto">
                            <div className="full_width input-box ">
                              <label
                                htmlFor="acc_name"
                                className={`radio-btn-name ${mulish600.className} tracking-wide`}
                              >
                                Account Holder Name
                              </label>
                              <input
                                type="text"
                                name="accountHolderName"
                                id="accountHolderName"
                                onChange={handleUserInputChange}
                                value={userFormData.accountHolderName}
                                className="p-3"
                              />
                              <label
                                htmlFor="accountHolderName"
                                className="customErrorClass"
                              >
                                {errorMessages2.accountHolderName}
                              </label>
                            </div>
                            <div className="full_width input-box">
                              <label
                                htmlFor="acc_number"
                                className={`radio-btn-name ${mulish600.className} tracking-wide`}
                              >
                                Account Number
                              </label>
                              <input
                                type="text"
                                name="accountNumber"
                                id="accountNumber"
                                className="card-i py-3 pl-15 pr-3"
                                onChange={handleUserInputChange}
                                value={userFormData.accountNumber}
                                maxLength="14"
                                onKeyDown={(e) => {
                                  if (
                                    !(
                                      e.key === "Backspace" ||
                                      e.key === "Delete" ||
                                      e.key === "ArrowLeft" ||
                                      e.key === "ArrowRight" ||
                                      e.key === "Home" ||
                                      e.key === "End" ||
                                      (e.key >= "0" && e.key <= "9")
                                    )
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <label
                                htmlFor="accountNumber"
                                className="customErrorClass"
                              >
                                {errorMessages2.accountNumber}
                              </label>
                              <Image
                                className="card-icon-1"
                                src={CardIcon}
                                alt="card-icon.png"
                              />
                            </div>

                            <div className="full_width input-box">
                              <label
                                htmlFor="b_type"
                                className={`radio-btn-name ${mulish600.className} tracking-wide`}
                              >
                                Account Type{" "}
                                <span
                                  className={`text-[#808080] text-[13px] ${mulish600.className}`}
                                >
                                  {" "}
                                  (savings or current){" "}
                                </span>{" "}
                              </label>
                              <select
                                name="accountType"
                                id="b_type"
                                onChange={handleUserInputChange}
                                value={userFormData.accountType}
                                className={`p-3 text-[#808080] text-[13px] ${mulish600.className}`}
                              >
                                <option value="Savings">Savings</option>
                                <option value="Current">Current</option>
                              </select>
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className="dropdown-icon position-new"
                              />
                            </div>

                            <div className="full_width input-box">
                              <label
                                htmlFor="bankName"
                                className={`radio-btn-name ${mulish600.className} tracking-wide`}
                              >
                                Bank Name
                              </label>
                              <input
                                type="text"
                                name="bankName"
                                id="bankName"
                                onChange={handleUserInputChange}
                                value={userFormData.bankName}
                                className="p-3"
                              />
                              <label
                                htmlFor="bankName"
                                className="customErrorClass"
                              >
                                {errorMessages2.bankName}
                              </label>
                            </div>
                          </div>

                          <h3
                            className={`full_width billing-address-title text-lg pb-3 ${mulish700.className} `}
                          >
                            For International Transaction
                          </h3>

                          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
                            <div className="">
                              <div className="full_width input-box">
                                <label
                                  htmlFor="routing_number"
                                  className={`radio-btn-name ${mulish600.className} tracking-wide`}
                                >
                                  Routing Number
                                </label>
                                <input
                                  type="text"
                                  name="routingNumber"
                                  id="routingNumber"
                                  onChange={handleUserInputChange}
                                  value={userFormData.routingNumber}
                                  className="p-3"
                                  onKeyDown={(e) => {
                                    if (
                                      !(
                                        e.key === "Backspace" ||
                                        e.key === "Delete" ||
                                        e.key === "ArrowLeft" ||
                                        e.key === "ArrowRight" ||
                                        e.key === "Home" ||
                                        e.key === "End" ||
                                        (e.key >= "0" && e.key <= "9")
                                      )
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                                <label
                                  htmlFor="routingNumber"
                                  className="customErrorClass"
                                >
                                  {errorMessages2.routingNumber}
                                </label>
                              </div>
                            </div>

                            <div className="">
                              <div className="full_width input-box">
                                <label
                                  htmlFor="swift_code"
                                  className={`radio-btn-name ${mulish600.className} tracking-wide`}
                                >
                                  Swift Code
                                </label>
                                <input
                                  type="text"
                                  name="swiftCode"
                                  id="swiftCode"
                                  onChange={handleUserInputChange}
                                  value={userFormData.swiftCode}
                                  className="p-3"
                                  maxLength={11}
                                />
                                <label
                                  htmlFor="swiftCode"
                                  className="customErrorClass"
                                >
                                  {errorMessages2.swiftCode}
                                </label>
                              </div>
                            </div>

                            <div className="">
                              <div className="full_width input-box">
                                <label
                                  htmlFor="address"
                                  className={`radio-btn-name ${mulish600.className} tracking-wide`}
                                >
                                  Address
                                </label>
                                <input
                                  type="text"
                                  name="address"
                                  id="address"
                                  onChange={handleUserInputChange}
                                  value={userFormData.address}
                                  className="p-3"
                                />
                                <label
                                  htmlFor="address"
                                  className="customErrorClass"
                                >
                                  {errorMessages2.address}
                                </label>
                              </div>
                            </div>

                            <div className="">
                              <div className="full_width input-box">
                                <label
                                  htmlFor="country"
                                  className={`radio-btn-name ${mulish600.className} tracking-wide`}
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  name="country"
                                  id="country"
                                  onChange={handleUserInputChange}
                                  value={userFormData.country}
                                  className="p-3"
                                />
                                <label
                                  htmlFor="country"
                                  className="customErrorClass"
                                >
                                  {errorMessages2.country}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" add-card-btn-main flex flex-col md:flex-row   items-center justify-center gap-5  md:gap-[30px]">
                        <input
                          type="button"
                          name="Submit"
                          value="Add Bank Detail"
                          className="add-card-btn w-full md:w-auto border-2 border-t-[#6b7280] border-l-[#6b7280] border-r-black border-b-black"
                          onClick={handleUserFormSubmit}
                        />
                        <input
                          type="button"
                          name="Reset"
                          value="Cancel"
                          className="add-card-btn w-full md:w-auto cancle-color-change border-2 border-t-[#6b7280] border-l-[#6b7280] border-r-black border-b-black"
                          data-bs-dismiss="modal"
                          onClick={closeModal}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default PaymentPref;

const BankDetailDomesticModal = ({
  formData,
  handleInputChange,
  handleFormSubmit,
  errorMessages,
  closeModal,
}) => {
  return (
    // change1
    <div className="w-screen py-14 min-h-screen max-h-fit z-[99991] bg-black bg-opacity-70 fixed top-0 left-0 !overflow-auto touch-auto">
      <div
        className="modal w-[90%] sm:w-4/5  sm:max-w-[790px] fade my-billings-add-a-card rounded-[20px] min-h-full  overflow-y-auto overflow-x-hidden absolute left-1/2 transform -translate-x-1/2 "
        id="BankDetailInternational"
      >
        <div
          className="modal-dialog modal-dialog-centered bg-white rounded-[20px] h-auto slideInFromTop"
          id="slideOutToTop"
        >
          <div className="modal-content rela overflow-y-auto">
            <form autoComplete="off">
              <div className="modal-header  " style={{ border: "none" }}>
                <button
                  type="button"
                  className="close-icon z-[9999999] border-2 border-t-[#6b7280] border-l-[#6b7280] border-r-black border-b-black"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span className="text-lg">X</span>
                </button>
              </div>
              <div className="modal-body ">
                <div className="row grid grid-cols-1 xl:grid-cols-2 gap-10">
                  <div className=" alt">
                    <Image
                      src={CardImage}
                      className="add-a-card-img w-full h-auto object-cover"
                      alt="add-a-card-img "
                    />
                  </div>
                  <div className=" grid grid-cols-1">
                    <div className=" h-auto">
                      <div className="full_width input-box">
                        <label
                          htmlFor="acc_name"
                          className={`radio-btn-name ${mulish600.className} tracking-wide`}
                        >
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          name="acc_name"
                          id="acc_name"
                          value={formData.acc_name}
                          onChange={handleInputChange}
                          className="p-3"
                        />
                        <label
                          htmlFor="acc_name"
                          className="customErrorClass text-red-500"
                        >
                          {errorMessages.acc_name}
                        </label>
                      </div>

                      <label
                        htmlFor="acc_number"
                        className={`radio-btn-name ${mulish600.className} tracking-wide`}
                      >
                        Account Number
                      </label>
                      <div className="full_width input-box">
                        <input
                          type="text"
                          name="acc_number"
                          id="acc_number"
                          className="card-i py-3 pl-15 pr-3"
                          value={formData.acc_number}
                          onChange={handleInputChange}
                          min="0"
                          max="14"
                          onKeyDown={(e) => {
                            if (
                              !(
                                e.key === "Backspace" ||
                                e.key === "Delete" ||
                                e.key === "ArrowLeft" ||
                                e.key === "ArrowRight" ||
                                e.key === "Home" ||
                                e.key === "End" ||
                                (e.key >= "0" && e.key <= "9")
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <label
                          htmlFor="acc_number"
                          className="customErrorClass text-red-500"
                        >
                          {errorMessages.acc_number}
                        </label>
                        <Image
                          className="card-icon"
                          src={CardIcon}
                          alt="card-icon.png"
                        />
                      </div>

                      <div className="full_width input-box">
                        <label
                          htmlFor="b_type"
                          className={`radio-btn-name ${mulish600.className} tracking-wide`}
                        >
                          Account Type{" "}
                          <span className="text-black text-sm">
                            (savings or current)
                          </span>{" "}
                        </label>
                        <div className="select-wrapper position">
                          <select
                            name="b_type"
                            className="p-3"
                            id="b_type"
                            value={formData.b_type}
                            onChange={handleInputChange}
                          >
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                          </select>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="dropdown-icon position_icone"
                          />
                        </div>
                      </div>

                      <div className="full_width input-box">
                        <label
                          htmlFor="ifsc_no"
                          className={`radio-btn-name ${mulish600.className} tracking-wide`}
                        >
                          Bank Code{" "}
                          <span className="text-gray text-[13px]">
                            (e.g. 058 for GTB, 044 for Access Bank etc.)
                          </span>{" "}
                        </label>
                        <input
                          type="text"
                          name="ifsc_no"
                          id="ifsc_no"
                          value={formData.ifsc_no}
                          onChange={handleInputChange}
                          className="p-3"
                          maxLength={11}
                        />
                        <label
                          htmlFor="ifsc_no"
                          className="customErrorClass text-red-500"
                        >
                          {errorMessages.ifsc_no}
                        </label>
                      </div>

                      <div className="full_width input-box">
                        <label
                          htmlFor="bank_name"
                          className={`radio-btn-name ${mulish600.className} tracking-wide`}
                        >
                          Bank Name
                        </label>
                        <input
                          type="text"
                          name="bank_name"
                          id="bank_name"
                          value={formData.bank_name}
                          onChange={handleInputChange}
                          className="p-3"
                        />
                        <label
                          htmlFor="bank_name"
                          className="customErrorClass text-red-500"
                        >
                          {errorMessages.bank_name}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" add-card-btn-main flex flex-col md:flex-row   items-center justify-center gap-5  md:gap-[30px]">
                  <input
                    type="button"
                    name="Submit"
                    value="Add Bank Detail"
                    className="add-card-btn w-full md:w-auto border-2 border-t-[#6b7280] border-l-[#6b7280] border-r-black border-b-black"
                    onClick={handleFormSubmit}
                  />
                  <input
                    type="button"
                    name="Reset"
                    value="Cancel"
                    className="add-card-btn w-full md:w-auto cancle-color-change border-2 border-t-[#6b7280] border-l-[#6b7280] border-r-black border-b-black "
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
