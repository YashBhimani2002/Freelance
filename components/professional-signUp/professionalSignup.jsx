"use client";
/* eslint-disable */
import React from "react";
import Image from "next/image";
import Mainlogo from "./../../public/images/socialimages/mainlogo.png";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./professional-signup.css";
import {
  createCompanyProfile,
  getCity,
  getCountries,
  getStates,
  verifyEmail,
} from "../../app/api/api.js";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const inter = Inter({ subsets: ["latin"], weight: "500" });

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

function professionalSignup() {
  const [countryData, setCountryData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fullUrl = window.location.href;
  const tokenMatch = fullUrl.match(/\/([^\/]+)$/);
  const activationToken = tokenMatch ? tokenMatch[1] : null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodedToken = jwtDecode(activationToken);

    const userFromToken = decodedToken?.user || null;

    setUser(userFromToken._id);
    setCompanyProfileData((prevData) => ({
      ...prevData,
      user_id: userFromToken._id,
    }));
  }, [activationToken]);

  const [companyProfileData, setCompanyProfileData] = useState({
    user_id: "",
    company_name: "",
    profile_img: "",
    company_desc: "",
    location: "",
    company_country: "",
    company_state: "",
    company_city: "",
    phone: "",
    designation: "",
  });

  const [validationForCompanyProfileData, setValidationForCompanyProfileData] =
    useState({
      company_name: "",
      company_desc: "",
      location: "",
      company_country: "",
      company_state: "",
      company_city: "",
      phone: "",
      designation: "",
    });

  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await verifyEmail({ token: activationToken });
      if (response) {
        setCountryData(response);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await getCountries();
      if (response) {
        if (response.status == 200) {
          const sortedCountries = response.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCountryData(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompanyNameInputChange = (event) => {
    const { name, value } = event.target;
    let message = "";
    if (value.trim().length < 2) {
      message = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least 2 characters`;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      message = `Please enter a valid ${name.toLowerCase()}`;
    } else {
      message = "";
    }
    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      company_name: message,
    }));

    setCompanyProfileData({
      ...companyProfileData,
      company_name: value,
    });
  };

  const handleChooseCompanyImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension === "jpg" || extension === "jpeg" || extension === "png") {
        setCompanyProfileData({
          ...companyProfileData,
          profile_img: file,
        });
        setErrorMessage("");
      } else {
        setErrorMessage("Please select a JPG or PNG image file.");
        event.target.value = null;
      }
    }
  };

  const handleCompanyDescriptionChange = (event) => {
    const { value, name } = event.target;
    let message = "";
    if (value.trim().length < 5) {
      message = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least 5 characters`;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      message = `Please enter a valid ${name.toLowerCase()}`;
    } else {
      message = "";
    }
    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      company_desc: message,
    }));

    setCompanyProfileData({
      ...companyProfileData,
      company_desc: value,
    });
  };

  const handleCompanyAddressChange = (event) => {
    const { value, name } = event.target;
    let message = "";
    if (value.trim().length < 5) {
      message = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least 5 characters`;
    } else {
      message = "";
    }
    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      location: message,
    }));

    setCompanyProfileData({
      ...companyProfileData,
      location: value,
    });
  };

  const handleCompanyContectNumberChange = (event) => {
    const { value } = event.target;

    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      phone: "",
    }));

    if (/^\d+$/.test(value) || value === "") {
      setCompanyProfileData({
        ...companyProfileData,
        phone: value,
      });

      setValidationForCompanyProfileData({
        ...validationForCompanyProfileData,
        phone: "",
      });
    } else {
      setValidationForCompanyProfileData({
        ...validationForCompanyProfileData,
        phone: "Please enter only numeric characters.",
      });
    }
  };

  const handleYourDesignationChange = (event) => {
    const { value, name } = event.target;
    let message = "";
    if (value.trim().length < 2) {
      message = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least 2 characters`;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      message = `Please enter a valid ${name.toLowerCase()}`;
    } else {
      message = "";
    }
    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      designation: message,
    }));
    setCompanyProfileData({
      ...companyProfileData,
      designation: value,
    });
  };

  const hanndleCountryChange = async (event) => {
    const { value } = event.target;
    setCompanyProfileData({
      ...companyProfileData,
      company_country: value,
    });

    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      company_country: "",
    }));
    setStateData(null);
    setCityData(null);

    try {
      const response = await getStates(value);
      if (response) {
        if (response?.status == 200) {
          setStateData(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const hanndleStateChange = async (event) => {
    const { value } = event.target;

    setCompanyProfileData({
      ...companyProfileData,
      company_state: value,
    });

    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      company_state: "",
    }));
    try {
      const response = await getCity(value);
      if (response) {
        setCityData(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const hanndleCityChange = async (event) => {
    const { value } = event.target;
    setCompanyProfileData({
      ...companyProfileData,
      company_city: value,
    });

    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      company_city: "",
    }));
  };

  const handleSubmitButtonClick = async () => {
    if (companyProfileData.phone === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        phone: "Please enter Contact Number.",
      }));
    } else if (companyProfileData.phone.length < 10) {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        phone: "Please complete your contact number.",
      }));
    }

    if (companyProfileData.designation === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        designation: "Please enter your designation.",
      }));
    }

    if (companyProfileData.company_country === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        company_country: "Please select your country.",
      }));
    }

    if (companyProfileData.company_state === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        company_state: "Please select your state.",
      }));
    }

    if (companyProfileData.company_city === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        company_city: "Please select your city.",
      }));
    }

    if (companyProfileData.location === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        location: "Please enter company address.",
      }));
    }

    if (companyProfileData.company_desc === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        company_desc: "Please enter company description.",
      }));
    }

    if (companyProfileData.company_name === "") {
      setValidationForCompanyProfileData((prevValidation) => ({
        ...prevValidation,
        company_name: "Please enter company name.",
      }));
    }

    if (
      validationForCompanyProfileData.phone !== "" ||
      validationForCompanyProfileData.location !== "" ||
      validationForCompanyProfileData.designation !== "" ||
      validationForCompanyProfileData.company_state !== "" ||
      validationForCompanyProfileData.company_name !== "" ||
      validationForCompanyProfileData.company_desc !== "" ||
      validationForCompanyProfileData.company_country !== "" ||
      validationForCompanyProfileData.company_city !== ""
    ) {
      return;
    }

    if (
      companyProfileData.company_name !== "" &&
      companyProfileData.company_desc !== "" &&
      companyProfileData.location !== "" &&
      companyProfileData.company_country !== "" &&
      companyProfileData.company_state !== "" &&
      companyProfileData.company_city !== "" &&
      companyProfileData.phone !== "" &&
      companyProfileData.designation !== ""
    ) {
      try {
        const responce = await createCompanyProfile(companyProfileData);
        if (responce?.status === 200) {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePhoneChange = (phone, country, e, formattedValue) => {
    setValidationForCompanyProfileData((prevValidation) => ({
      ...prevValidation,
      phone: "",
    }));

    if (/^\d+$/.test(phone) || phone === "") {
      setCompanyProfileData({
        ...companyProfileData,
        phone: phone,
      });

      setValidationForCompanyProfileData({
        ...validationForCompanyProfileData,
        phone: "",
      });
    } else {
      setValidationForCompanyProfileData({
        ...validationForCompanyProfileData,
        phone: "Please enter only numeric characters.",
      });
    }
  };
  return (
    <>
      <section className="gstart-sec signup-sec">
        <div className="row praiki_create_company_profile_container_syn">
          <div className="praiki_create_company_join_praiki_container_syn">
            <div className="side-step">
              <div className="relative left-[50px] lg:left-[20px] top-[30px] lg:top-[10px]">
                <a href="/">
                  <Image
                    src={Mainlogo}
                    alt="logo"
                    title=""
                    className="w-137px"
                    width={140}
                    height={40}
                  />
                </a>
              </div>
              <div className="stepwizard">
                <div className="stepwizard-row setup-panel">
                  <h2 className={`${mulish700.className}`}>Join Praiki</h2>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      href="#step-1"
                      type="button"
                      id="st1"
                      className="btn btn-one btn-circle11 btn-default "
                    ></a>
                    <p>
                      <small className={`${mulish400.className} text-[14.4px]`}>
                        Create account
                      </small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      href="#step-1"
                      type="button"
                      id="st1"
                      className="btn btn-one btn-circle11 btn-circle22 "
                    ></a>
                    <p>
                      <small className={`${mulish400.className} text-[14.4px]`}>
                        Verify email
                      </small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      href="#step-2"
                      type="button"
                      id="st2"
                      className="btn btn-two btn-default btn-circle3"
                      style={{ pointerEvents: "none", cursor: "default" }}
                    ></a>
                    <p>
                      <small className={`${mulish400.className} text-[14.4px]`}>
                        Create Your Profile
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="createCompanyProfile w-auto md:mr-10 px-12 py-2">
            <div className="gstart-info-main signup-main">
              <div className="pro-login-info">
                <div className="">
                  <div
                    className="panel panel-primary panel12 setup-content"
                    id="step-1"
                  >
                    <div className="">
                      <div className="">
                        <div className="">
                          <h1
                            className={`title text-center md:text-left ${mulish700.className}`}
                          >
                            Create Company Profile
                          </h1>
                        </div>

                        <div className="my-4">
                          <div className="space-y-2">
                            <label
                              className={` text-[#2d3748] text-base ${inter.className} block`}
                            >
                              Company Name<span className="text-red">*</span>
                            </label>
                            <input
                              className="w-full p-2 rounded"
                              type="text"
                              placeholder="Enter Company Name"
                              value={companyProfileData.company_name}
                              onChange={handleCompanyNameInputChange}
                              name="Company name"
                            />
                            {validationForCompanyProfileData.company_name !==
                              "" && (
                              <div className="praiki_error_massage_syn">
                                {validationForCompanyProfileData.company_name}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="my-4">
                          <div className="space-y-2">
                            <label
                              className={`text-[#2d3748] text-base ${inter.className} block ${inter.className}`}
                            >
                              Choose Company Image
                            </label>
                            <input
                              type="file"
                              className="w-full p-2 bg-white rounded"
                              onChange={handleChooseCompanyImageFileChange}
                            />
                            {errorMessage && (
                              <p className="text-danger">{errorMessage}</p>
                            )}
                          </div>
                        </div>
                        <div className="my-4">
                          <div className="space-y-2">
                            <label
                              className={` text-[#2d3748] text-base ${inter.className} block`}
                            >
                              Company Description
                              <span className="text-red">*</span>
                            </label>
                            <div className="">
                              <textarea
                                onChange={handleCompanyDescriptionChange}
                                placeholder="Enter Company Description"
                                className="w-full p-2 rounded"
                                name="Description"
                              ></textarea>
                              {validationForCompanyProfileData.company_desc !==
                                "" && (
                                <div className="praiki_error_massage_syn">
                                  {validationForCompanyProfileData.company_desc}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="my-4">
                          <div className="space-y-2">
                            <label
                              className={` text-[#2d3748] text-base ${inter.className} block`}
                            >
                              Company Address<span className="error">*</span>
                            </label>
                            <div className="">
                              <textarea
                                onChange={handleCompanyAddressChange}
                                placeholder="Enter Company Address"
                                className="w-full p-2 rounded"
                                name="Company address"
                              ></textarea>
                              {validationForCompanyProfileData.location !==
                                "" && (
                                <div className="praiki_error_massage_syn">
                                  {validationForCompanyProfileData.location}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between w-full flex-col sm:flex-row py-2">
                            <div className=" mb-5 w-full sm:w-[30%]">
                              <div className=" flex mb-1">
                                <h6
                                  className={`text-[#2d3748] text-base ${inter.className}`}
                                >
                                  Country
                                </h6>
                                <span className="text-red">*</span>
                              </div>
                              <select
                                onChange={hanndleCountryChange}
                                className=" p-[8px] w-full border border-[#e2e8f0] rounded "
                              >
                                <option>Select Country</option>
                                {countryData &&
                                  countryData.data &&
                                  Array.isArray(countryData.data) &&
                                  countryData.data.map((country) => (
                                    <option
                                      key={country.id}
                                      value={country.id}
                                      id={country.name}
                                    >
                                      <img
                                        src={country.emoji}
                                        alt={`${country.name} flag`}
                                      />
                                      {country.name}
                                    </option>
                                  ))}
                              </select>
                              {validationForCompanyProfileData.company_country !==
                                "" && (
                                <div className="praiki_error_massage_syn">
                                  {
                                    validationForCompanyProfileData.company_country
                                  }
                                </div>
                              )}
                            </div>
                            <div className=" mb-5 w-full sm:w-[30%]">
                              <div className=" flex mb-1">
                                <h6
                                  className={`text-[#2d3748] text-base ${inter.className}`}
                                >
                                  State
                                </h6>
                                <span className="text-red">*</span>
                              </div>
                              <select
                                onChange={hanndleStateChange}
                                className="p-[8px] w-full border border-[#e2e8f0] rounded "
                              >
                                <option>Select State</option>
                                {stateData !== null &&
                                  stateData.data.map((state) => {
                                    return (
                                      <option value={state.id} id={state.value}>
                                        <img src={state.emoji} />
                                        {state.name}
                                      </option>
                                    );
                                  })}
                              </select>
                              {validationForCompanyProfileData.company_state !==
                                "" && (
                                <div className="praiki_error_massage_syn">
                                  {
                                    validationForCompanyProfileData.company_state
                                  }
                                </div>
                              )}
                            </div>
                            <div className=" mb-5 w-full sm:w-[30%]">
                              <div className=" flex mb-1">
                                <h6
                                  className={`text-[#2d3748] text-base ${inter.className}`}
                                >
                                  City
                                </h6>
                                <span className="text-red">*</span>
                              </div>
                              <select
                                onChange={hanndleCityChange}
                                className="p-[8px] w-full border border-[#e2e8f0] rounded "
                              >
                                <option>Select City</option>
                                {cityData !== null &&
                                  cityData.data.map((city) => {
                                    return (
                                      <option value={city.id} id={city.name}>
                                        <img src={city.emoji} />
                                        {city.name}
                                      </option>
                                    );
                                  })}
                              </select>

                              {validationForCompanyProfileData.company_city !==
                                "" && (
                                <div className="praiki_error_massage_syn">
                                  {validationForCompanyProfileData.company_city}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className=" flex justify-between w-full flex-col sm:flex-row">
                            <div className="mb-[20px] w-full sm:w-[49%]">
                              <div className="flex mb-[10px]">
                                <h6
                                  className={`text-[#2d3748] text-base ${inter.className}`}
                                >
                                  Company Contact Number
                                </h6>
                                <span className="text-red">*</span>
                              </div>
                              <PhoneInput
                                country={"ng"}
                                name="phone"
                                id="phone"
                                className={`block appearance-none w-full py-1 mb-1 text-base leading-normal bg-white  border border-[#dee2e6] h-10 text-[#495057] `}
                                countryCodeEditable={false}
                                onChange={handlePhoneChange}
                              />
                              {validationForCompanyProfileData.phone !== "" && (
                                <div className="praiki_error_massage_syn">
                                  {validationForCompanyProfileData.phone}
                                </div>
                              )}
                            </div>
                            <div className=" w-full sm:w-[49%] ">
                              <div className=" flex mb-[10px]">
                                <h6
                                  className={`text-[#2d3748] text-base ${inter.className}`}
                                >
                                  Your Designation
                                </h6>
                                <span className="text-red">*</span>
                              </div>
                              <input
                                onChange={handleYourDesignationChange}
                                maxlength="100"
                                type="text"
                                className="w-full p-2 bg-white rounded"
                                placeholder="Enter Your Designation"
                                name="Designation"
                              />
                              {validationForCompanyProfileData.designation !==
                                "" && (
                                <div className="praiki_error_massage_syn">
                                  {validationForCompanyProfileData.designation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmitButtonClick}
                    className={`bg-[#286cac] text-white mt-5 rounded py-2 px-5 border border-transparent hover:border-[#286cac] hover:text-[#286cac] hover:bg-transparent ${inter.className}`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default professionalSignup;
