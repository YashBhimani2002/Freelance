"use client";
/* eslint-disable */
import React from "react";
import "./companysignup.css";
import Mainlogo from "@/public/images/socialimages/mainlogo.png";
import Image from "next/image";
// import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getCountries,
  getStates,
  getCity,
  getSkills,
  getCategories,
  SaveExperience,
  SaveEducation,
  FormSubmit,
  verifyEmail,
  addOrUpdateSkill,
} from "../../app/api/api.js";
import { jwtDecode } from "jwt-decode";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";

import CreatableSelect from "react-select/creatable";
import Link from "next/link";

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin"], weight: "500" });

// import "react-country-state-city/dist/react-country-state-city.css";

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

function CompanyProfile() {
  //   const navigate = useNavigate()
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [countryError1, setCountryError1] = useState("");
  const [stateError, setStateError] = useState("");
  const [stateError1, setStateError1] = useState("");
  const [cityError, setCityError] = useState("");
  const [cityError1, setCityError1] = useState("");
  const [startMonthError, setStartMonthError] = useState("");
  const [startYearsError, setstartYearsError] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [endMonthError, setEndMonthError] = useState("");
  const [endYearsError, setEndYearsError] = useState("");
  const [skillsError, setSkillsError] = useState("");
  const [screen, setScreen] = useState("1");
  const fastvel = 1;
  const [selectedValue, setSelectedValue] = useState(fastvel);
  const [workform, setWorkform] = useState(false);
  const [educationForm, setEducationForm] = useState(false);

  const [schoolNameError, setSchoolNameError] = useState("");
  const [degreeError, setDegreeError] = useState("");
  const [stydyError, setStydyError] = useState("");
  const [skillsList, setSkillsList] = useState([]);

  const [addWork, setAddWork] = useState(false);
  const [addYourSkills, setaddYourSkills] = useState(false);
  const [addAdditionalDetails, setaddAdditionalDetails] = useState(false);
  const [addAdditionalData, setaddAdditionalData] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);

  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [jobCatogary, setJobCatogary] = useState("");
  const [jobCategoryError, setJobCategoryError] = useState("");
  const [bioError, setBioError] = useState("");
  const [attendedStartError, setAttendedStartError] = useState("");
  const [attendedEndError, setAttendedEndError] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [cityId, setCityId] = useState(0);

  const [countryidadd, setCountryidAdd] = useState(0);
  const [stateidadd, setstateidAdd] = useState(0);
  const [cityIdadd, setCityIdAdd] = useState(0);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [stateListAdd, setStateListAdd] = useState([]);
  const [countryListAdd, setCountryListAdd] = useState([]);
  const [cityListAdd, setCityListAdd] = useState([]);

  const [jobCategories, setCategoriesList] = useState([]);

  const [addEduError, setAddEduError] = useState("");
  const [addWorExpError, setAddWorkExpError] = useState("");

  const countryNameget = countryList.find(
    (item) => item.id === parseInt(countryid)
  );
  const satteNameget = stateList.find((item) => item.id === parseInt(stateid));
  const cityNameget = cityList.find((item) => item.id === parseInt(cityId));

  const countryNamegetadd = countryListAdd.find(
    (item) => item.id === parseInt(countryidadd)
  );
  const satteNamegetadd = stateListAdd.find(
    (item) => item.id === parseInt(stateidadd)
  );
  const cityNamegetadd = cityListAdd.find(
    (item) => item.id === parseInt(cityIdadd)
  );

  // Assuming you have a function to handle changes in countryid
  const fullUrl = window.location.href;
  const tokenMatch = fullUrl.match(/\/([^\/]+)$/);
  const activationToken = tokenMatch ? tokenMatch[1] : null;
  //   const { activationToken } = useParams();
  // const { activationToken } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCountryData();
  }, []);
  const fetchCountryData = async () => {
    try {
      const response = await verifyEmail({ token: activationToken });
      if (response) {
        // setCountryData(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Decode the activationToken to get user information
    const decodedToken = jwtDecode(activationToken);

    // Access the user property from the decoded object
    const userFromToken = decodedToken?.user || null;

    // Set the user state
    setUser(userFromToken._id);
    setFormData((prevData) => ({
      ...prevData,
      user_id: userFromToken._id,
    }));
  }, [activationToken]);

  const [formData, setFormData] = useState({
    user_id: "",
    jobtitle: "",
    category: "",
    bio: "",
    title: "",
    company: "",
    addWorkcountry: "",
    addWorkstate: "",
    addWorkcity: "",
    address: "",
    Workcountry: "",
    Workstate: "",
    Workcity: "",
    startmonth: "",
    startyears: "",
    endmonth: "",
    endyears: "",
    school: "",
    degree: "",
    study: "",
    streetaddress: "",
    phone: "",
    attendedstartdate: "",
    attendedenddate: "",
    currentlywork: false,
  });
  // month fatch
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const allYearsGenerator = () => {
    const date = new Date();
    let currentYear = date.getFullYear();
    let years = [];
    for (let i = currentYear; i <= currentYear + 100; i++) {
      years.push(i);
    }
    return years;
  };

  const allYearsArray = allYearsGenerator();

  const YearGenerator = () => {
    const date = new Date();
    let currentYear = date.getFullYear();
    let years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(i);
    }
    return years;
  };

  const yearsArray = YearGenerator();
  const [monthsArray, setMonthsArray] = useState(months);

  const [isSelectedOther, setIsSelectedOther] = useState(false);
  const [otherSkills, setOtherSkills] = useState("");
  const [otherSkillsError, setOtherSkillsError] = useState(false);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value, type, checked, id } = event.target;
    // Clear error messages for the corresponding field
    if (value === "other" || id === "otherSkills") {
      setIsSelectedOther(true);
      if (value === "skills" || id === "otherSkills") {
        setOtherSkills(event.target.value);
        // const newSkills = value.split(',').map(skill => skill.trim());
      }
    } else {
      setIsSelectedOther(false);
    }

    if (name === "category") {
      setJobCategoryError("");
    } else if (name === "bio") {
      setBioError("");
    } else if (name === "address") {
      setAddressError("");
    } else if (name === "startmonth") {
      setStartMonthError("");
    } else if (name === "startyears") {
      setstartYearsError("");
    } else if (name === "endmonth") {
      setEndMonthError("");
    } else if (name === "endyears") {
      setEndYearsError("");
    }
    if (name === "attendedstartdate") {
      setAttendedStartError("");
    }
    if (name === "streetaddress") {
      setStreetAddressError("");
    }
    if (name === "attendedenddate") {
      setAttendedEndError("");
    } else if (name === "phone") {
      setPhoneError("");
    }
    if (name === "addWorkcountry") {
      setCountryError1("");
    }
    if (name === "addWorkstate") {
      setStateError1("");
    }
    if (name === "addWorkcity") {
      setCityError1("");
    }

    if (checked === true) {
      setEndMonthError("");
      setEndYearsError("");
    }

    //display month based on selected year
    if (name === "startyears") {
      const selectedYear = parseInt(value);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Month is zero-based
      const currentMonths = selectedYear === currentYear ? currentMonth : 12;
      setFormData({
        ...formData,
        [name]: value,
      });
      setStartMonthError("");
      // Update months array based on selected year
      const updatedMonths = months.slice(0, currentMonths);
      setMonthsArray(updatedMonths);
    }

    // Update formData with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleValidation = (name, value) => {
    let message = "";
    // if (value.trim().length < 3) {
    //   message = `${
    //     name.charAt(0).toUpperCase() + name.slice(1)
    //   } must be at least 3 characters`;
    // }
    if (name === "jobtitle") {
      if (!/^[a-zA-Z\s]{3,}$/.test(value.trim())) {
        message =
          "Job title must be at least 3 characters and contain only letters";
      }
    } else if (name == "title") {
      if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9\s-]{3,}$/.test(value.trim())) {
        message = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least 3 characters and contain at least one letter`;
      }
      // if (!/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z0-9-]{3,}$/.test(value.trim())) {
      //   message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 3 characters and contain a combination of letters and numbers`;
      // }
    } else if (name == "companyName") {
      if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9\s-]{3,}$/.test(value.trim())) {
        message = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least 3 characters and contain at least one letter`;
      }
      // if (!/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z0-9-]{3,}$/.test(value.trim())) {
      //   message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 3 characters and contain a combination of letters and numbers`;
      // }
    } else if (name == "degree") {
      if (!/^[A-Za-z\s.-]+$/i.test(value)) {
        message = `Please enter a valid ${name.toLowerCase()}`;
      }
    } else if (name == "Field of study") {
      if (!/^[A-Za-z\s.-]+$/i.test(value)) {
        message = `Please enter a valid ${name.toLowerCase()}`;
      }
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      message = `Please enter a valid ${name.toLowerCase()}`;
    } else {
      message = "";
    }
    if (name == "jobtitle") {
      setJobTitleError(message);
    } else if (name == "title") {
      setTitleError(message);
    } else if (name == "companyName") {
      setCompanyNameError(message);
    } else if (name === "school") {
      setSchoolNameError(message);
    } else if (name === "degree") {
      setDegreeError(message);
    } else if (name === "Field of study") {
      setStydyError(message);
    }
  };

  const Closescreen = () => {
    setWorkform(false);
    // setTitleError('')
    // setCompanyNameError('')
    // setAddressError('')
    // setCountryError('')
    // setStateError('')
    // setCityError('')
    // setStartMonthError('')
    // setstartYearsError('')
    // setEndMonthError('')
    // setEndYearsError('')
  };
  const EducationClosescreen = () => {
    setEducationForm(false);
  };

  //function to handle Add Work Experience Popup
  const saveFormdata = async (event) => {
    event.preventDefault();
    const {
      title,
      companyName,
      address,
      Workcountry,
      Workstate,
      Workcity,
      startmonth,
      startyears,
      endmonth,
      endyears,
      currentlywork,
    } = formData;
    let flag = false;

    // // Reset previous error messages
    // setTitleError("");
    // setCompanyNameError("");
    // setAddressError("");
    // setCountryError("");
    // setStateError("");
    // setCityError("");
    // setStartMonthError("");
    // setstartYearsError("");
    // setEndMonthError("");
    // setEndYearsError("");
    // setStreetAddressError("");
    // setPhoneError("");
    // setAddWorkExpError('')

    // Validate individual fields
    if (!title.trim()) {
      setTitleError("Please enter a title");
    }

    if (!companyName || !companyName.trim()) {
      setCompanyNameError("Please enter a company name");
    }

    if (!address.trim()) {
      setAddressError("Please enter an address");
    }

    if (!Workcountry.trim()) {
      setCountryError("Please select a country");
    }

    if (!Workstate.trim()) {
      setStateError("Please select a state");
    }

    if (!Workcity.trim()) {
      setCityError("Please select a city");
    }

    if (!startmonth.trim()) {
      setStartMonthError("Please enter start month");
    }

    if (!startyears.trim()) {
      setstartYearsError("Please enter start year");
    }

    if (!currentlywork) {
      if (!endmonth.trim()) {
        flag = true;
        setEndMonthError("Please enter end month");
      }

      if (!endyears.trim()) {
        flag = true;
        setEndYearsError("Please enter end year");
      }
    }

    // If any validation fails, stop execution
    if (
      titleError ||
      companyNameError ||
      addressError ||
      countryError ||
      stateError ||
      cityError ||
      startMonthError ||
      startYearsError ||
      skillsError ||
      flag
    ) {
      return;
    }

    // Set countryid, stateid, and cityId in formData
    const combinedData = {
      ...formData,
      stateid,
      countryid,
      cityId,
    };

    try {
      const response = await SaveExperience(combinedData);
      setWorkform(false);
      setAddWorkExpError("");
    } catch (error) {
      //console.log("Error saving experience data, error: " + error);
    }
  };

  const WorkExperienceData = () => {
    // Assuming you have specific education fields like school, degree, study, etc.
    const {
      title,
      companyName,
      address,
      Workcountry,
      Workstate,
      Workcity,
      startmonth,
      startyears,
      endmonth,
      endyears,
      currentlywork,
    } = formData;

    // Add validation for required education fields
    if (
      !title ||
      !companyName ||
      !address ||
      !Workcountry ||
      !Workstate ||
      !Workcity ||
      !startmonth ||
      !startyears
    ) {
      // Set appropriate error messages or handle the lack of data in a way that makes sense for your application
      //User can't continue further it add work popup is empty
      setAddWorkExpError("Please fill in all required work experience fields.");
      // You can set error messages here if needed
      return;
    }

    if (
      titleError ||
      companyNameError ||
      addressError ||
      countryError ||
      stateError ||
      cityError ||
      startMonthError ||
      startYearsError ||
      skillsError
    ) {
      setAddWorkExpError("Please fill valid work experience fields.");
      return;
    }

    // If the user is currently working, no need to check for end dates
    if (!currentlywork && (!endmonth || !endyears)) {
      // Set appropriate error messages or handle the lack of data in a way that makes sense for your application
      setAddWorkExpError("Please fill in end month and year.");
      return;
    }

    setAddEducation(true);
    setAddWork(false);
    const setvel = 3;
    setSelectedValue(setvel);
  };

  //function to handle submit of Add Education Popup
  const EducationDataSubmit = () => {
    //backend error, uncomment the code when issue is soved
    const { school, degree, study, attendedstartdate, attendedenddate } =
      formData;

    // Add validation for required education fields
    if (
      !school ||
      !degree ||
      !study ||
      !attendedstartdate ||
      !attendedenddate
    ) {
      // Set appropriate error messages or handle the lack of data in a way that makes sense for your application
      //User can't continue further if add education Popup fields are empty
      setAddEduError("Please fill in all required education fields.");
      return;
    }

    if (
      schoolNameError ||
      degreeError ||
      stydyError ||
      attendedStartError ||
      attendedEndError
    ) {
      setAddEduError("Please fill valid education fields.");
      return;
    }

    setAddEducation(false);
    setAddWork(false);
    setaddYourSkills(true);
    const setvel = 4;
    setSelectedValue(setvel);
  };

  // function to handle skills selection
  const SkillDataSubmit = async () => {
    const skillsData = formData.skills;

    // Add validation for selected skills
    if (!skillsData || skillsData.length === 0) {
      // Set appropriate error messages or handle the lack of selected skills in a way that makes sense for your application
      setSkillsError("Please select at least one skill.");
      return;
    }
    if (formData.skills !== "other") {
      setAddEducation(false);
      setAddWork(false);
      setaddYourSkills(false);
      setSkillsError("");
      setaddAdditionalData(true);
      setaddAdditionalDetails(true);
      const setvel = 5;
      setSelectedValue(setvel);
    }
  };

  const handleSubmitAllData = async (event) => {
    // Added 'async' keyword here
    event.preventDefault();
    const { streetaddress, addWorkcountry, addWorkstate, addWorkcity, phone } =
      formData;

    // Reset error messages
    setCountryError1("");
    setStateError1("");
    setCityError1("");
    setStreetAddressError("");
    setPhoneError("");

    // Validation checks
    if (!streetaddress.trim()) {
      setStreetAddressError("Street address is required");
    }
    if (!addWorkcountry || !addWorkcountry.trim()) {
      setCountryError1("Please select a country");
    } else {
      setCountryError1("");
    }
    if (!addWorkcity.trim()) {
      setCityError1("Please select a city");
    } else {
      setCityError1("");
    }
    if (!phone.trim()) {
      setPhoneError("Phone is required");
    }
    //  else if (!/^\d+$/.test(phone)) {
    //   setPhoneError("Phone must contain only numeric values");
    // }
    else if (phone.length < 10) {
      setPhoneError("Please enter a phone number in valid format");
    } else {
      if (
        streetaddress.trim() &&
        addWorkcountry.trim() &&
        addWorkstate.trim() &&
        addWorkcity.trim() &&
        phone.trim()
      ) {
        await submitDataToBackend();
      }
    }
  };

  const submitDataToBackend = async () => {
    const combineData = {
      ...formData,
      cityId,
      stateid,
      countryid,
    };
    try {
      const response = await FormSubmit(combineData);
      window.location.href = "/login";
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = formData;
  };

  // Get the current date in the format "YYYY-MM-DD"
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRangeChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
  };

  // function to handle form submit (handling jobTitle, category and bio only)
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Destructure formData for easier access
    const { jobtitle, category, bio } = formData;

    if (!jobtitle.trim()) {
      setJobTitleError("Please enter job title");
    } else if (jobtitle.length < 4) {
      setJobTitleError("Job title must be at least 4 characters");
    } else {
      setJobTitleError("");
    }

    if (!category.trim()) {
      setJobCategoryError("Please enter job category");
    } else {
      setJobCategoryError("");
    }

    if (!bio.trim()) {
      setBioError("Please enter bio");
    } else if (bio.length < 10) {
      setBioError("Bio must be at least 10 characters");
    } else {
      setBioError("");
    }

    // Check if all fields are valid before proceeding
    if (
      !jobtitle.trim() ||
      !category.trim() ||
      !bio.trim() ||
      bio.length < 10
    ) {
      // If any field is invalid, stop further processing
      return;
    }

    // Reset error messages and perform any additional actions
    setJobTitleError("");
    setJobCategoryError("");
    setBioError("");
    setAddWork(true);
  };

  const labelText = `${selectedValue}/5`;

  useEffect(() => {
    if (addWork) {
      const setvel = 2;
      setSelectedValue(setvel);
    }
  }, [addWork]);

  //addWork form open
  const addWorkform = () => {
    setWorkform(true);
  };
  //EducationForm open
  const addEducationForm = (event) => {
    setEducationForm(true);
  };

  // function to handle Add education Pop up
  const saveFormdataEducation = async (event) => {
    event.preventDefault();
    const { school, degree, study, attendedstartdate, attendedenddate } =
      formData;

    if (!school.trim()) {
      setSchoolNameError("Please enter school/college name");
    }
    if (!degree.trim()) {
      setDegreeError("Please enter degree");
    }
    if (!study.trim()) {
      setStydyError("Please enter Study");
    }
    if (!attendedstartdate.trim()) {
      setAttendedStartError("Please Select Start Date ");
    }
    if (!attendedenddate.trim()) {
      setAttendedEndError("Please Select end Date");
    }
    if (
      schoolNameError ||
      degreeError ||
      stydyError ||
      attendedStartError ||
      attendedEndError
    ) {
      return;
    } else {
      const formattedStartDate = new Date(attendedstartdate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(attendedenddate)
        .toISOString()
        .split("T")[0];

      setFormData((prevFormData) => ({
        ...prevFormData,
        attendedstartdate: formattedStartDate,
        attendedenddate: formattedEndDate,
      }));
      const combineData = {
        ...formData,
        school,
        degree,
        study,
      };

      try {
        const response = await SaveEducation(combineData);
        setEducationForm(false);
        setAddEduError("");
      } catch (error) {
        //console.log("Error saving education data, error: " + error);
      }
    }
  };

  useEffect(() => {
    if (
      countryNameget !== undefined ||
      satteNameget !== undefined ||
      cityNameget !== undefined ||
      countryNamegetadd !== undefined ||
      satteNamegetadd !== undefined ||
      cityNamegetadd !== undefined
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Workcountry: countryNameget?.name || "",
        Workstate: satteNameget?.name || "",
        Workcity: cityNameget?.name || "",
        addWorkcountry: countryNamegetadd?.name || "",
        addWorkstate: satteNamegetadd?.name || "",
        addWorkcity: cityNamegetadd?.name || "",
      }));
    } else {
      //console.log("Country or state not found");
    }
  }, [
    countryNameget?.id,
    satteNameget?.id,
    cityNameget?.id,
    countryNamegetadd?.id,
    satteNamegetadd?.id,
    cityNamegetadd?.id,
  ]);
  // Fetch countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        if (response) {
          if (response.status == 200) {
            const sortedCountries = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setCountryList(sortedCountries);
            setCountryListAdd(sortedCountries);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getSkills();
        if (response) {
          if (response?.status == 200) {
            const sortedSkilles = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            // setSkillsList(response.data);
            setSkillsList(sortedSkilles);
            const categoriesResponse = await getCategories();
            if (categoriesResponse) {
              if (categoriesResponse.status == 200) {
                setCategoriesList(categoriesResponse.data);
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  // Fetch states when the selected country changes
  const getCountryName = (countryid, countryidadd) => {
    const selectedCountry = countryList.filter(
      (country) => country.id === countryid
    );
    return selectedCountry ? selectedCountry.name : "";
  };
  useEffect(() => {
    // Log only if there is a selected country
    if (countryid !== 0) {
      // //console.log(getCountryName(), "asdnasndkjdsa");
    }
  }, [countryid]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStates(countryid);
        if (response) {
          if (response?.status == 200) {
            setStateList(response.data);
            setStateListAdd(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch states only if countryid is truthy (selected)
    if (countryid) {
      fetchStates();
    }
  }, [countryid]); // Dependency on countryid ensures this effect runs whenever countryid changes

  // Fetch cities when the selected state changes
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCity(stateid);
        setCityList(response.data);
        setCityListAdd(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, [stateid]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStates(countryidadd);
        if (response) {
          if (response?.status == 200) {
            setStateListAdd(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch states only if countryidadd is truthy (selected)
    if (countryidadd) {
      fetchStates();
    }
  }, [countryidadd]);

  // Fetch cities when the selected state changes
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCity(stateidadd);
        setCityListAdd(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, [stateidadd]);

  const handlePraikiLogoClick = () => {
    window.location.href = "/";
  };

  const handlePhoneChange = (phone, country, e, formattedValue) => {
    setFormData({
      ...formData,
      phone: formattedValue,
    });
  };

  const handleSkillChange = (newValue, actionMeta) => {
    setSelectedSkills(newValue);
    setFormData({
      ...formData,
      skills: newValue.map((val) => val.label),
    });
    // setError('');
  };

  const handleBackButtonClick = () => {
    if (selectedValue === 2) {
      setAddWork(false);
      setSelectedValue(1);
    }

    //addEducation === true
    if (selectedValue === 3) {
      setAddEducation(false);
      setAddWork(true);
      setSelectedValue(2);
    }

    if (selectedValue === 4) {
      setaddYourSkills(false);
      setAddEducation(true);
      setSelectedValue(3);
    }

    if (selectedValue === 5) {
      setaddAdditionalData(false);
      setaddYourSkills(true);
      setSelectedValue(4);
    }
  };

  return (
    <>
      <section className="gstart-sec signup-sec">
        <div className="row">
          <div className="col-md-4 ps-0">
            <div className="side-step">
              <div className="logo-image" onClick={handlePraikiLogoClick}>
                <a href="/">
                  <Image src={Mainlogo} alt="logo" style={{ width: "140px" }} />
                </a>
              </div>
              <div className="stepwizard">
                <div className="stepwizard-row setup-panel">
                  <h2>Join Freelance</h2>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      href="#step-1"
                      type="button"
                      id="st1"
                      className="btn btn-one btn-d1 btn-default "
                    ></a>
                    <p>
                      <small>Create account</small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      href="#step-2"
                      type="button"
                      id="st2"
                      className="btn btn-two btn-default btn-d2"
                      //   style="pointer-events: none; cursor: default;"
                      style={{ pointerEvents: "none", cursor: "default" }}
                    ></a>
                    <p>
                      <small>Verify email</small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      href="#step-3"
                      type="button"
                      id="st3"
                      className="btn btn-three btn-default btn-circle3 "
                      //   style="pointer-events: none; cursor: default;"
                      style={{ pointerEvents: "none", cursor: "default" }}
                    ></a>
                    <p>
                      <small className="">Create Your Profile</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* workform Form start */}

          {workform && (
            <>
              <div className="work-form-section">
                <div className="work-form-Content">
                  <div className="content-hadder">
                    <h4
                      className={` ${mulish700.className} text-[#434343] text-[33px] text-bold`}
                    >
                      Add Work Experience
                    </h4>
                    <p className=" cursor-pointer " onClick={Closescreen}>
                      X
                    </p>
                  </div>
                  <div className="form-input-field">
                    <>
                      {/* Profile  title*/}
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label
                            className={`text-base block ${inter.className}`}
                          >
                            Title
                          </label>
                          <input
                            maxLength="100"
                            type="text"
                            name="title" // Corrected name attribute
                            id="title"
                            className="w-full border border-stroke p-2 rounded" // Corrected class attribute
                            value={formData.title} // Corrected key in formData
                            onChange={(e) => {
                              handleValidation(e.target.name, e.target.value);
                              handleInputChange(e);
                            }}
                          />

                          <p className="error" id="title_error">
                            {titleError}
                          </p>
                        </div>
                      </div>
                      {/* Profile title end*/}
                      {/* Profile Company Name title*/}

                      <div className="col-sm-12">
                        <div className="form-group">
                          <label
                            className={`text-base block ${inter.className} pt-2`}
                          >
                            Company Name
                          </label>
                          <input
                            maxLength="100"
                            type="text"
                            name="companyName" // Corrected name attribute
                            id="companyName"
                            className="w-full border border-stroke p-2 rounded" // Corrected class attribute
                            value={formData.companyName} // Corrected key in formData
                            onChange={(e) => {
                              handleValidation(e.target.name, e.target.value);
                              handleInputChange(e);
                            }}
                          />
                          <p className="error" id="Coname_error">
                            {companyNameError}
                          </p>
                        </div>
                      </div>
                      {/* Profile Company Name end*/}
                      {/* Profile Company Name title*/}

                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="control-label">Address</label>
                          <input
                            maxLength="100"
                            type="text"
                            name="address" // Corrected name attribute
                            id="address"
                            className="w-full border border-stroke p-2 rounded" // Corrected class attribute
                            value={formData.address} // Corrected key in formData
                            onChange={handleInputChange}
                          />
                          <p className="error" id="address_error">
                            {addressError}
                          </p>
                        </div>
                      </div>
                      {/* Profile Company Name end*/}
                      <div className="form-contory-row justify-content-between my-3 inputs-rows">
                        <div className="col-sm-4 d-grid pe-1">
                          <h6>Country</h6>
                          <select
                            className="fast-input-content"
                            onChange={(e) => {
                              setCountryid(e.target.value);
                              setCountryError(""); // Reset country error on change
                              setFormData((prevData) => ({
                                ...prevData,
                                Workcountry:
                                  e.target.options[
                                    e.target.selectedIndex
                                  ].getAttribute("id"),
                              }));
                            }}
                            value={countryid}
                          >
                            <option value="">Select Country</option>
                            {countryList.map((country) => (
                              <option
                                key={country.id}
                                value={country.id}
                                id={country.name}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {/* Display country error outside of the select element */}
                          <p className="error" id="country_error">
                            {countryError}
                          </p>
                        </div>
                        <div className="col-sm-4 d-grid px-1">
                          <h6>State</h6>
                          <select
                            className="secund-input-content"
                            onChange={(e) => {
                              setstateid(e.target.value);
                              setStateError(""); // Reset state error on change
                              setFormData((prevData) => ({
                                ...prevData,
                                Workstate:
                                  e.target.options[
                                    e.target.selectedIndex
                                  ].getAttribute("id"),
                              }));
                            }}
                            value={stateid}
                          >
                            <option value="">Select State</option>
                            {stateList.map((state) => (
                              <option
                                key={state.id}
                                value={state.id}
                                id={state.name}
                              >
                                {state.name}
                              </option>
                            ))}
                          </select>
                          {/* Display state error outside of the select element */}
                          <p className="error" id="state_error">
                            {stateError}
                          </p>
                        </div>
                        <div className="col-sm-4 d-grid">
                          <h6>City</h6>
                          <select
                            className="thurd-input-content"
                            onChange={(e) => {
                              setCityId(e.target.value); // Update cityId when the user selects a city
                              setCityError(""); // Reset city error on change
                              setFormData((prevData) => ({
                                ...prevData,
                                Workcity:
                                  e.target.options[
                                    e.target.selectedIndex
                                  ].getAttribute("id"),
                              }));
                            }}
                            value={cityId}
                          >
                            <option value="">Select City</option>
                            {cityList.map((city) => (
                              <option
                                key={city.id}
                                value={city.id}
                                id={city.name}
                              >
                                {city.name}
                              </option>
                            ))}
                          </select>
                          {/* Display city error outside of the select element */}
                          <p className="error" id="city_error">
                            {cityError}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="true"
                            id="defaultCheck2"
                            name="currentlywork"
                            checked={formData.currentlywork}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label px-2"
                            htmlFor="defaultCheck2"
                          >
                            I currently work here
                          </label>

                          <div className="msgerror"></div>
                        </div>
                      </div>
                      <div className="form-contory-row">
                        <div className="flex flex-col">
                          <div className="form-group d-grid">
                            <label className="control-label">Start Month</label>
                            <select
                              name="startmonth"
                              id="startmonth"
                              style={{ paddingLeft: "7px", fontSize: "14px" }}
                              value={formData.startmonth}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Start Month</option>
                              {monthsArray.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <p className="error" id="startmonth_error">
                              {startMonthError}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-3  justify-content-center">
                          <div className="form-group d-grid">
                            <label className="control-label mt-4">
                              Start Year
                            </label>
                            <select
                              name="startyears"
                              id="startyears"
                              style={{ paddingLeft: "7px", fontSize: "14px" }}
                              value={formData.startyears}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Start Year</option>
                              {yearsArray.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            <p className="error" id="startyears_error">
                              {startYearsError}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-3  justify-content-end">
                          <div className="form-group d-grid">
                            <label
                              className={`control-label  ${
                                formData.currentlywork ? "labelDisable" : ""
                              }`}
                            >
                              End Month
                            </label>
                            <select
                              name="endmonth"
                              id="endmonth"
                              style={{ paddingLeft: "7px", fontSize: "14px" }}
                              value={formData.endmonth}
                              onChange={handleInputChange}
                              disabled={formData.currentlywork} // Disable if currently working
                            >
                              <option value="">Select End Month</option>
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <p className="error" id="endmonth_error">
                              {endMonthError}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-3  justify-content-end">
                          <div className="form-group d-grid">
                            <label
                              className={`control-label mt-4  ${
                                formData.currentlywork ? "labelDisable" : ""
                              }`}
                            >
                              End Year
                            </label>
                            <select
                              name="endyears"
                              id="endyears"
                              style={{ paddingLeft: "7px", fontSize: "14px" }}
                              value={formData.endyears}
                              onChange={handleInputChange}
                              disabled={formData.currentlywork} // Disable if currently working
                            >
                              <option value="">Select End Year</option>
                              {allYearsArray.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            <p className="error" id="endyears_error">
                              {endYearsError}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                  <div className=" d-flex justify-content-end footer-content">
                    <button className="save-data" onClick={saveFormdata}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* workform Form end  */}
          {/* EducationForm start */}
          {educationForm && (
            <>
              <div className="work-form-section">
                <div className="work-form-Content">
                  <div className="content-hadder">
                    <h4
                      className={` ${mulish700.className} text-[#434343] text-[33px] text-bold`}
                    >
                      Add Education History
                    </h4>
                    <p
                      className="cursor-pointer"
                      onClick={EducationClosescreen}
                    >
                      X
                    </p>
                  </div>
                  <div className="form-input-field">
                    <>
                      {/* Profile  title*/}
                      <div className="col-sm-12">
                        <div className="mb-4 ">
                          <label className="control-label">
                            School/College Name
                          </label>
                          <input
                            maxLength="100"
                            type="text"
                            name="school" // Corrected name attribute
                            id="school"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded" // Corrected class attribute
                            value={formData.school} // Corrected key in formData
                            onChange={(e) => {
                              handleValidation(e.target.name, e.target.value);
                              handleInputChange(e);
                            }}
                          />
                          <p className="error" id="schoolname_error">
                            {schoolNameError}
                          </p>
                        </div>
                      </div>
                      {/* Profile title end*/}
                      {/* Profile Company Name title*/}

                      <div className="col-sm-12">
                        <div className="mb-4">
                          <label className="control-label">Degree</label>
                          <input
                            maxLength="100"
                            type="text"
                            name="degree" // Corrected name attribute
                            id="degree"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded" // Corrected class attribute
                            value={formData.degree} // Corrected key in formData
                            onChange={(e) => {
                              handleValidation(e.target.name, e.target.value);
                              handleInputChange(e);
                            }}
                          />
                          <p className="error" id="degree_error">
                            {degreeError}
                          </p>
                        </div>
                      </div>
                      {/* Profile Company Name end*/}
                      {/* Profile Company Name title*/}

                      <div className="col-sm-12">
                        <div className="mb-4">
                          <label className="control-label">
                            Field of Study
                          </label>
                          <input
                            maxLength="100"
                            type="text"
                            name="study" // Corrected name attribute
                            id="study"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded" // Corrected class attribute
                            value={formData.study} // Corrected key in formData
                            onChange={(e) => {
                              handleValidation(
                                "Field of study",
                                e.target.value
                              );
                              handleInputChange(e);
                            }}
                          />
                          <p className="error" id="stydy_error">
                            {stydyError}
                          </p>
                        </div>
                      </div>
                      {/* Profile Company Name end*/}
                      <div>Dates Attended</div>
                      <div className="form-contory-row justify-content-between my-3 inputs-rows">
                        <div className="col-sm-6 justify-content-start date-inputs pe-2">
                          <input
                            type="date"
                            name="attendedstartdate"
                            value={formData.attendedstartdate}
                            onChange={handleInputChange}
                            max={getCurrentDate()}
                          />
                          <p className="error" id="attendedstart_error">
                            {attendedStartError}
                          </p>
                        </div>

                        <div className="col-sm-6 d-grid date-inputs">
                          <input
                            type="date"
                            name="attendedenddate"
                            defaultValue={formData.attendedenddate}
                            onChange={handleInputChange}
                            min={formData.attendedstartdate}
                            // max={getCurrentDate()}
                            // max = {getFutureDate()} {/* Set a future date as the max */}
                          />
                          <p className="error" id="attendedend_error">
                            {attendedEndError}
                          </p>
                        </div>
                      </div>
                    </>
                  </div>
                  <div className=" d-flex justify-content-end footer-content">
                    <button
                      className="save-data"
                      onClick={saveFormdataEducation}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* EducationForm end  */}

          <div className="col-md-7 side-content-add">
            <div
              className="
            "
            >
              <div className="login-info-1">
                <div className="step">
                  <form
                    action="#"
                    style={{ height: "100vh" }}
                    role="form"
                    id="frm_step1"
                    method="post"
                    autoComplete="off"
                    enctype="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div
                      className="panel panel-primary setup-content"
                      id="step-1"
                    >
                      <div className="panel-body">
                        <div className="row">
                          {/* {selectedValue !== 1 && (
                            <p onClick={handleBackButtonClick}>Back</p>
                          )} */}
                          {selectedValue !== 1 && (
                            <div
                              onClick={handleBackButtonClick}
                              className={`flex items-center gap-2  cursor-pointer`}
                            >
                              <p className="bg-inputbordercolor p-2 rounded-full">
                                {arrowIcon}
                              </p>
                              <h3
                                className={`text-[#000000] font-mulish font-normal text-base ${inter.className} group-hover:text-searchbg cursor-pointer `}
                              >
                                Back
                              </h3>
                            </div>
                          )}
                          <div className="col-md-12">
                            <h1 className="title">Create your profile</h1>
                            {addWork === true ||
                            addEducation === true ||
                            setaddYourSkills === true ||
                            addAdditionalData === true ? null : (
                              <div className="footer-line">
                                <h3>Describe what you do </h3>
                              </div>
                            )}
                          </div>
                          <div className="reangevice-content">
                            <p>
                              Build a profile to show potential clients what you
                              can do. It only takes a few minutes and you can
                              edit it later.
                            </p>

                            <form action="/action_page.php">
                              <label
                                htmlFor="customRange"
                                className="form-label"
                              >
                                {labelText}
                              </label>
                              <input
                                type="range"
                                className="range"
                                id="customRange"
                                name=""
                                min="0"
                                max="5"
                                value={selectedValue}
                                onChange={handleRangeChange}
                              />
                            </form>
                          </div>
                          {addWork === true ? (
                            <div className="second-section">
                              <div className="secound-screen-content">
                                Add relevant work experience
                              </div>
                              <button onClick={addWorkform}>
                                Add Work Experience &nbsp; +
                              </button>
                            </div>
                          ) : (
                            <>
                              {addEducation === true ? (
                                <div className="second-section">
                                  <div className="secound-screen-content">
                                    Add your education
                                  </div>
                                  <button onClick={addEducationForm}>
                                    Add Education &nbsp; +
                                  </button>
                                </div>
                              ) : (
                                <>
                                  {addYourSkills === true ? (
                                    <div className="second-section">
                                      <div className="secound-screen-content my-2">
                                        Add your skills
                                      </div>
                                      <div className="col-sm-12">
                                        <div className="form-group">
                                          <label className="control-label">
                                            Your Skills
                                          </label>
                                          <CreatableSelect
                                            id="searchSkills"
                                            // className="searchSkills-select-input border border-inputbordercolor mt-[5px]"
                                            isMulti
                                            options={skillsList.map(
                                              (skill) => ({
                                                value: skill._id,
                                                label: skill.name,
                                              })
                                            )}
                                            value={selectedSkills}
                                            onChange={handleSkillChange}
                                            placeholder="Search for skills"
                                          />
                                          {/* <select
                                            name="skills"
                                            id="skills"
                                            style={{ paddingLeft: "7px" }}
                                            defaultValue={formData.skill}
                                            onChange={handleInputChange}
                                          >
                                            <option value="">
                                              Select a skill
                                            </option>
                                            {skillsList.map((skill) => (
                                              <option
                                                key={skill.id}
                                                value={skill.name}
                                              >
                                                {skill.name}
                                              </option>
                                            ))}
                                            <option value={"other"}>
                                              Other
                                            </option>
                                          </select>
                                          <p
                                            className="error"
                                            id="skills_error"
                                          >
                                            {skillsError}
                                          </p> */}
                                        </div>

                                        {isSelectedOther && (
                                          <div className="col-sm-12">
                                            <div className="form-group">
                                              <label className="control-label">
                                                Add Skills
                                              </label>
                                              <input
                                                maxLength="100"
                                                type="text"
                                                name="skills"
                                                id="otherSkills"
                                                className="form-control"
                                                placeholder="Enter Job Title"
                                                onChange={handleInputChange}
                                              />
                                              {otherSkillsError && (
                                                <p
                                                  className="error"
                                                  id="skills_error"
                                                >
                                                  Please Add your skill.
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      {addAdditionalData === true ? (
                                        <>
                                          <div className="second-section">
                                            <div className="secound-screen-content my-2">
                                              Additional Details
                                            </div>
                                            <div className="col-sm-12">
                                              <div className="form-group">
                                                <label className="control-label">
                                                  Street Address (this won't
                                                  show on your profile)
                                                </label>
                                                <input
                                                  maxLength="100"
                                                  type="text"
                                                  name="streetaddress" // Corrected name attribute
                                                  id="streetaddress"
                                                  className="form-control" // Corrected class attribute
                                                  value={formData.streetaddress} // Corrected key in formData
                                                  onChange={handleInputChange}
                                                />
                                                <p
                                                  className="error"
                                                  id="fname_error"
                                                >
                                                  {streetAddressError}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="my-3 form-contory-row ">
                                              <div className="flex flex-col items-start px-1">
                                                <h6>Country</h6>
                                                <select
                                                  className=""
                                                  onChange={(e) => {
                                                    setCountryidAdd(
                                                      e.target.value
                                                    );
                                                    setFormData((prevData) => ({
                                                      ...prevData,
                                                      addWorkcountry:
                                                        e.target.options[
                                                          e.target.selectedIndex
                                                        ].getAttribute("id"),
                                                    }));
                                                    setCountryError1(""); // Reset country error on change
                                                  }}
                                                  value={countryidadd}
                                                >
                                                  <option value="">
                                                    Select Country
                                                  </option>
                                                  {countryListAdd.map(
                                                    (country) => (
                                                      <option
                                                        key={country.id}
                                                        value={country.id}
                                                        id={country.name}
                                                      >
                                                        {country.name}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                                {/* Display error */}
                                                <p
                                                  className="error"
                                                  id="country_error"
                                                >
                                                  {countryError1}
                                                </p>
                                              </div>
                                              <div className="flex flex-col items-start px-1">
                                                <h6>State</h6>
                                                <select
                                                  className=""
                                                  onChange={(e) => {
                                                    setstateidAdd(
                                                      e.target.value
                                                    );
                                                    setFormData((prevData) => ({
                                                      ...prevData,
                                                      addWorkstate:
                                                        e.target.options[
                                                          e.target.selectedIndex
                                                        ].getAttribute("id"),
                                                    }));
                                                    setStateError(""); // Reset state error on change
                                                  }}
                                                  value={stateidadd}
                                                >
                                                  <option value="">
                                                    Select State
                                                  </option>
                                                  {stateListAdd.map((state) => (
                                                    <option
                                                      key={state.id}
                                                      value={state.id}
                                                      id={state.name}
                                                    >
                                                      {state.name}
                                                    </option>
                                                  ))}
                                                </select>
                                                <p
                                                  className="error"
                                                  id="state_error"
                                                >
                                                  {stateError1}
                                                </p>
                                              </div>
                                              <div className="flex flex-col items-start px-1">
                                                <h6>City</h6>
                                                <select
                                                  className="thurd-input-content"
                                                  onChange={(e) => {
                                                    setCityIdAdd(
                                                      e.target.value
                                                    ); // Update cityId when the user selects a city
                                                    setFormData((prevData) => ({
                                                      ...prevData,
                                                      addWorkcity:
                                                        e.target.options[
                                                          e.target.selectedIndex
                                                        ].getAttribute("id"),
                                                    }));
                                                    setCityError1(""); // Reset city error on change
                                                  }}
                                                  value={cityIdadd}
                                                  placeholder="Select City"
                                                >
                                                  <option value="">
                                                    Select City
                                                  </option>
                                                  {cityListAdd.map((city) => (
                                                    <option
                                                      key={city.id}
                                                      value={city.id}
                                                      id={city.id}
                                                    >
                                                      {city.name}
                                                    </option>
                                                  ))}
                                                </select>
                                                {/* Display city error outside of the select element */}
                                                <p
                                                  className="error"
                                                  id="city_error"
                                                >
                                                  {cityError1}
                                                </p>
                                              </div>
                                              <div className="flex flex-col items-start px-1">
                                                <label className="">
                                                  Phone
                                                </label>
                                                {/* <input
                                                  maxLength="10"
                                                  type="number"
                                                  name="phone"
                                                  id="phone"
                                                  className="phoneinputs"
                                                  value={formData.phone}
                                                  onKeyDown={(e) => {
                                                    if (
                                                      e.key === "e" ||
                                                      e.key === "E"
                                                    ) {
                                                      e.preventDefault();
                                                    }
                                                  }}
                                                  onChange={(e) => {
                                                    const inputValue =
                                                      e.target.value;
                                                    if (
                                                      inputValue.length <= 10
                                                    ) {
                                                      handleInputChange(e);
                                                    } else {
                                                      handleInputChange({
                                                        target: {
                                                          name: e.target.name,
                                                          value:
                                                            inputValue.slice(
                                                              0,
                                                              10
                                                            ),
                                                        },
                                                      });
                                                    }
                                                  }}
                                                  inputMode="numeric"
                                                  pattern="[0-9]*" 
                                                /> */}
                                                <PhoneInput
                                                  country={"ng"}
                                                  name="phone"
                                                  id="phone"
                                                  className="phoneinputs"
                                                  countryCodeEditable={false}
                                                  value={formData.phone}
                                                  onChange={handlePhoneChange}
                                                />
                                                <p
                                                  className="error"
                                                  id="phone_error"
                                                >
                                                  {phoneError}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          {/* Profile job title */}
                                          <div className="col-sm-12">
                                            <div className="form-group">
                                              <label className="control-label">
                                                Your Job Title
                                              </label>
                                              <input
                                                maxLength="100"
                                                type="text"
                                                name="jobtitle"
                                                id="jobtitle"
                                                className="form-control"
                                                placeholder="Enter Job Title"
                                                value={formData.jobtitle}
                                                onChange={(e) => {
                                                  handleValidation(
                                                    e.target.name,
                                                    e.target.value
                                                  );
                                                  handleInputChange(e);
                                                }}
                                              />
                                              <p
                                                className="error"
                                                id="fname_error"
                                              >
                                                {jobTitleError}
                                              </p>
                                            </div>
                                          </div>
                                          {/* Profile job title end*/}
                                          {/* Profile job Category */}
                                          <div className="col-sm-12">
                                            <div className="form-group">
                                              <label className="control-label">
                                                Job Category
                                              </label>
                                              <select
                                                name="category"
                                                id="category"
                                                style={{ paddingLeft: "7px" }}
                                                value={
                                                  formData.category ||
                                                  "Select Job Category"
                                                } // Set a default value
                                                onChange={handleInputChange}
                                              >
                                                {/* Default option */}
                                                <option value="">
                                                  Select Job Category
                                                </option>

                                                {/* Map through the jobCategories array and create options */}
                                                {jobCategories.map(
                                                  (category) => (
                                                    <option
                                                      key={category.id}
                                                      value={category.name}
                                                    >
                                                      {category.name}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                              <p
                                                className="error"
                                                id="country_error"
                                              >
                                                {jobCategoryError}
                                              </p>
                                            </div>
                                          </div>
                                          {/* Profile job Category end*/}
                                          {/* Profile job bio */}
                                          <div className="col-sm-12">
                                            <div className="form-group">
                                              <label>Your Bio</label>
                                              <textarea
                                                name="bio"
                                                placeholder="Your Bio"
                                                rows={4}
                                                cols={40}
                                                style={{
                                                  width: "100%",
                                                  padding: 10,
                                                  border: 1,
                                                  borderColor: "#E2E8F0",
                                                }}
                                                value={formData.bio}
                                                onChange={(e) => {
                                                  handleInputChange(e);
                                                }}
                                              />
                                              <p
                                                className="error"
                                                id="bio_error"
                                              >
                                                {bioError}
                                              </p>
                                            </div>
                                          </div>
                                          {/* Profile job bio end */}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* All continue buttons */}
                    {/* Add work continue btn */}
                    {addWork === true ? (
                      <>
                        <button
                          className="btn btn-blue w-auto btn-account"
                          id="btn_step1"
                          type="submit"
                          onClick={WorkExperienceData}
                        >
                          Continue
                        </button>
                        <p className="error pt-3" id="startmonth_error">
                          {addWorExpError}
                        </p>
                      </>
                    ) : (
                      <>
                        {addEducation === true ? (
                          <>
                            <button
                              className="btn btn-blue w-auto btn-account"
                              id="btn_step1"
                              type="submit"
                              onClick={EducationDataSubmit}
                            >
                              Continue
                            </button>
                            <p className="error pt-3" id="startmonth_error">
                              {addEduError}
                            </p>
                          </>
                        ) : (
                          <>
                            {addYourSkills === true ? (
                              <>
                                <button
                                  className="btn btn-blue w-auto btn-account"
                                  id="btn_step1"
                                  type="submit"
                                  onClick={() => SkillDataSubmit()}
                                >
                                  Continue
                                </button>
                              </>
                            ) : (
                              <>
                                {addAdditionalDetails === true ? (
                                  <button
                                    className="btn btn-blue w-auto btn-account"
                                    type="submit"
                                    onClick={handleSubmitAllData}
                                  >
                                    Continue
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-blue w-auto btn-account"
                                      type="submit"
                                      onClick={handleFormSubmit}
                                    >
                                      Continue
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompanyProfile;
