"use client";
import React, { useState, useEffect } from "react";
import "../style.css";
import Image from "next/image";
import successGIF from "../../../public/success.gif";
import cancelGIF from "../../../public/cancel.gif";
import TimezoneSelect from "react-timezone-select";
import {
  getCountries,
  getSkills,
  getCategories,
  viewProfile,
  update_profile,
  storeImageInBackend,
  storepPortfolioData,
  generateText,
} from "../../api/api";
import axios from "axios";
import { Mulish } from "next/font/google";
import { Inter } from "next/font/google";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";

import CreatableSelect from "react-select/creatable";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import PromptModal from "@/app/aigeneratermodel/page";
import { Tooltip, tooltipClasses, createTheme, ThemeProvider } from "@mui/material";

const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

//Genrating 100years (from current year to current year - 100)
const YearList = () => {
  let years = [];
  let date = new Date();
  let cyear = date.getFullYear();
  for (let year = cyear; year >= cyear - 100; year--) {
    years.push(year);
  }
  return years;
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

const showPassIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-greytext"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const hidePassIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-greytext"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Editprofileform = () => {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [userData, setUserData] = useState({});
  const [successMessPopUp, setSuccessMessPopUp] = useState(false);
  const [successMessPopUp2, setSuccessMessPopUp2] = useState(false);

  const [errorMessPopUp, setErrorMessPopUp] = useState(false);
  const [profileUpdateMess, setProfileUpdateMess] = useState("");
  const [profileUpdateMess2, setProfileUpdateMess2] = useState("");

  const [isSuccessGIF, setIsSuccessGIF] = useState("");
  const [isSuccessGIF2, setIsSuccessGIF2] = useState("");
  const [endDateError, setEndDateError] = useState(""); // Initialize with an empty string

  const [countries, setCountries] = useState([]);
  const [pid, setPid] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [CompanyProfileFileName, setCompanyProfileFileName] = useState("");
  const [portfolioDownloadFileName, setPortfolioDownloadFilName] = useState();
  const [DeletePortfolioIds, setDeletePortfolioIds] = useState([]);
  const [promptModelOpen, setPromptModelOpen] = useState(false);
  // const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [promptKey, setPromptKey] = useState(null);
  const [promptVal, setPromptVal] = useState("");
  const [promptError, setPromptError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isAdding, setIsAdding] = useState(false); // State to track if we are adding a certificate
  // Function to toggle visibility for Current Password
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  // Function to toggle visibility for New Password
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  // Function to toggle visibility for Confirm Password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [demosortedCountries, setDemosortedCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries();
        if (response) {
          if (response.status == 200) {
            const sortedCountries = response.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setCountries(sortedCountries);
            setDemosortedCountries(sortedCountries);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleSuccessMessPopUp = () => {
    setSuccessMessPopUp((isOpen) => !isOpen);

    if (userData.login_as === 2) {
      setTimeout(() => {
        // window.location.href = "/profile";
        router.push("/profile");
      }, 2000);
    }

    if (userData.login_as === 1) {
      setTimeout(() => {
        // window.location.href = "/projects";
        router.push("/projects");
      }, 2000);
    }

    // window.location.href = "/profile";
  };
  const handleSuccessMessPopUp2 = () => {
    setSuccessMessPopUp2((isOpen) => !isOpen);
    if (userData.login_as === 2) {
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    }

    if (userData.login_as === 1) {
      setTimeout(() => {
        window.location.href = "/projects";
      }, 2000);
    }

    // window.location.href = "/profile";
  };
  const handleErrorMessPopUp = () => {
    setErrorMessPopUp((isOpen) => !isOpen);
  };
  const [editformData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    userProfile: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    timeZone: "",
    skills: "",
    companyProfile: "",
    company_name: "",
    company_desc: "",
    designation: "",
    webaddress: "",
    // hourly_rate: "",
    // hourly_available: "",

    education: [
      {
        id: "",
        college_school: "",
        degree: "",
        start_date: "",
        end_date: "",
      },
    ],
    experienceLevel: "Fresher",
    experience: [
      {
        id: "",
        title: "",
        company_name: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
      },
    ],
    certificate: [
      {
        id: "",
        certificate_for: "",
        certificate_in: "",
        start_date: "",
        end_date: "",
      },
    ],
    portfolio: [
      {
        id: 14,
        portfoliotitle: "",
        portfolioimg: null,
        portfoliolink: "",
      },
    ],
  });

  const validMonths = [
    "Month",
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
  const getviewprofile = async () => {
    try {
      const response = await viewProfile();
      if (response) {
        if (response?.status == 200) {
          setUserData(response.data.user);
          setSelectedSkills(
            response.data?.skillData[0]?.skill_id.map((skill) => ({
              id: skill,
              name: skill,
              label: skill,
              value: skill,
            }))
          );
          setPid(response?.data?.professional_data?._id || "");
          setCompanyProfileFileName(response.data?.clint?.profile_img);
          const filnameArray = [];
          response.data?.portfolio?.map((item) => {
            if (item.portfolio_image != null) {
              filnameArray.push(item.portfolio_image);
            }
          });
          setPortfolioDownloadFilName(filnameArray);
          // Check if the API response contains education data
          const hasEducationData =
            response.data?.eduction && response.data.eduction.length > 0;

          // Check if the API response contains experience data
          const hasExperienceData =
            response.data?.expedit && response.data.expedit.length > 0;
          const hasCertificateData =
            response.data?.certificate && response.data.certificate.length > 0;
          // Check if the API response contains portfolio data
          const hasPortfolioData =
            response.data?.portfolio && response.data.portfolio.length > 0;

          setCurrentlyWork(
            response.data?.expedit[0]?.end_year == null ? false : true
          );

          setcheckedWork(response.data?.expedit[0]?.check || false);
          setEditFormData((prevFormData) => ({
            ...prevFormData,
            first_name: response.data.user.first_name || "",
            last_name: response.data.user.last_name || "",
            email: response.data.user.email || "",
            // address: response.data.user.address || "",
            country: response.data.user.country || "",
            skills: response.data?.skillData[0]?.skill_id || "",
            timeZone: response.data.user?.user_timezone || "",
            phone:
              response.data?.clint?.phone ||
              response.data?.professional_data?.phone ||
              "",
            companyProfile: response.data?.clint?.profile_img,
            company_name:
              response.data?.clint?.company_name ||
              response.data?.professional_data?.company ||
              "",
            company_desc:
              response.data?.clint?.company_desc ||
              response.data?.professional_data?.bio_brief ||
              "",
            webaddress: response.data?.clint?.web_address || "",
            designation:
              response.data?.clint?.designation ||
              response.data?.professional_data?.designation ||
              "",
            // hourly_rate: response.data?.professional_data?.hourly_rate || "",
            // hourly_available:
            //   response.data?.professional_data?.hourly_available || "",
            address:
              response.data?.clint?.location ||
              response.data?.professional_data?.location ||
              "",

            // education: response.data?.eduction?.map((edu) => ({
            //   id: edu._id,
            //   college_school: edu.school,
            //   degree: edu.degree,
            //   start_date:
            //     new Date(edu.from_date).toISOString().substring(0, 10) || "",
            //   end_date:
            //     new Date(edu.to_date).toISOString().substring(0, 10) || "",
            // })),

            education: hasEducationData
              ? response.data?.eduction?.map((edu) => ({
                  id: edu._id,
                  college_school: edu.school,
                  degree: edu.degree,
                  start_date:
                    new Date(edu.from_date).toISOString().substring(0, 10) ||
                    "",
                  end_date:
                    new Date(edu.to_date).toISOString().substring(0, 10) || "",
                }))
              : prevFormData.education,

            // experienceLevel:
            //   response.data?.professional_data?.experience_level || "",
            // experience: response.data?.expedit?.map((item) => ({
            //   id: 12,
            //   title: item?.exp_title || "",
            //   company_name: item?.company || "",
            //   start_month: item?.month || "",
            //   start_year: `${item?.year}` || "",
            //   end_month:
            //     typeof item?.end_month === "string"
            //       ? item?.end_month
            //       : validMonths[item?.end_month] || "",
            //   end_year: `${item?.end_year}` || "",
            // })),
            experience: hasExperienceData
              ? response.data?.expedit?.map((item) => ({
                  id: item?._id,
                  title: item?.exp_title || "",
                  company_name: item?.company || "",
                  start_month: item?.month || "",
                  start_year: `${item?.year}` || "",
                  end_month:
                    typeof item?.end_month === "string"
                      ? item?.end_month
                      : validMonths[item?.end_month] || "",
                  // end_month: item?.end_month || null,
                  end_year: item?.end_year || null,
                }))
              : prevFormData.experience, // Use existing experience data if no experience data from API
            certificate: hasCertificateData
              ? response.data?.certificate?.map((item) => ({
                  id: item._id,
                  certificate_for: item.certification_for || "",
                  certificate_in: item.certificate_in || "",
                  start_date: item.certificate_start_date || "",
                  end_date: item.certificate_end_date || "",
                }))
              : prevFormData.certificate,
            // portfolio: response.data?.portfolio?.map((item) => ({
            //   id: item._id,
            //   portfoliotitle: item.title || "",
            //   portfolioimg: item.portfolio_image,
            //   portfoliolink: item.portfolio_link || "",
            // })),
            portfolio: hasPortfolioData
              ? response.data?.portfolio?.map((item) => ({
                  id: item._id,
                  portfoliotitle: item.title || "",
                  portfolioimg: item.portfolio_image,
                  portfoliolink: item.portfolio_link || "",
                }))
              : prevFormData.portfolio, // Use existing portfolio data if no portfolio data from API
            userProfile: response.data?.user?.avatar || "",
            // Populate other fields similarly based on the API response
          }));
        }
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getviewprofile();
  }, []);
  const [changePasswordFormData, setChangePasswordFormData] = useState({
    current_password: "",
    confirm_password: "",
    new_password: "",
  });

  const [endMonthError, setEndMonthError] = useState("");

  const [skillsList, setSkillsList] = useState([]);
  const [jobCategories, setCategoriesList] = useState([]);

  let cyears = YearList();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getSkills();
        if (response) {
          if (response?.status == 200) {
            setSkillsList(response.data);
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
  }, []);

  // ************************** education form func **********************************
  //add EducationField function
  const addEducationField = () => {
    const newId = editformData.education?.length + 1;
    setEditFormData((prevFormData) => {
      // Check if prevFormData is defined
      if (!prevFormData) {
        // Handle the case where prevFormData is not defined
        return {
          education: [
            {
              id: newId,
              college_school: "",
              degree: "",
              start_date: "",
              end_date: "",
            },
          ],
        };
      }

      // Ensure prevFormData.education is an array
      if (!Array.isArray(prevFormData.education)) {
        // Handle the case where prevFormData.education is not an array
        return {
          ...prevFormData,
          education: [
            {
              id: newId,
              college_school: "",
              degree: "",
              start_date: "",
              end_date: "",
            },
          ],
        };
      }

      // If both prevFormData and prevFormData.education are defined and valid arrays
      return {
        ...prevFormData,
        education: [
          ...prevFormData.education,
          {
            id: newId,
            college_school: "",
            degree: "",
            start_date: "",
            end_date: "",
          },
        ],
      };
    });
  };

  //  delete EducationField function
  const deleteEducationField = (id) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      education: prevFormData.education.filter((data) => data.id !== id),
    }));
  };

  function isNewerEndDate(startYear, startMonth, endYear, endMonth) {
    // Convert start and end dates to Date objects for comparison
    const startDate = new Date(`${startYear}-${startMonth}`);
    const endDate = new Date(`${endYear}-${endMonth}`);

    // Check if end date is greater than or equal to start date
    return endDate >= startDate;
  }

  // ************************** end education form func **********************************
  // **************************Experience Level form func **********************************

  const handleExperienceChange = (e) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      experienceLevel: e.target.value,
    }));
  };

  // **************************END Experience Level form func **********************************
  // ************************** experience form func **********************************

  const [currentlyWork, setCurrentlyWork] = useState(false);
  const [checkedWork, setcheckedWork] = useState(false);

  // Add experience field
  const addExperienceField = () => {
    const newId = editformData.experience?.length + 1;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      experience: Array.isArray(prevFormData.experience)
        ? [
            ...prevFormData.experience,
            {
              id: newId,
              title: "",
              company_name: "",
              start_month: "",
              start_year: "",
              end_month: null,
              end_year: null,
            },
          ]
        : [
            {
              id: newId,
              title: "",
              company_name: "",
              start_month: "",
              start_year: "",
              end_month: null,
              end_year: null,
            },
          ],
    }));
  };

  // Delete experience field
  const deleteExperienceField = (id) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      experience: prevFormData.experience.filter((data) => data.id !== id),
    }));
  };

  // ************************** end experience form func **********************************
  // ************************** Professional Certificate form func **********************************

  // Add professional certificate field
  const addCertificateField = () => {
    const newId = editformData.certificate.length + 1;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      certificate: [
        ...prevFormData.certificate,
        {
          id: newId,
          certificate_for: "",
          certificate_in: "",
          start_date: "",
          end_date: "",
        },
      ],
    }));
  };

  // Delete professional certificate field

  const deleteCertificateField = (id) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      certificate: prevFormData.certificate.filter((data) => data.id !== id),
    }));
  };

  // ************************** end Professional Certificate form func **********************************
  // ************************** portfolio form func **********************************

  // Add portfolio field
  const addPortfolioField = () => {
    const newId = editformData.portfolio?.length + 1;
    setEditFormData((prevFormData) => {
      // Check if prevFormData.portfolio is an array
      if (!Array.isArray(prevFormData.portfolio)) {
        // If it's not an array, initialize it as an empty array
        prevFormData.portfolio = [];
      }

      // Spread prevFormData.portfolio or initialize it as an empty array
      return {
        ...prevFormData,
        portfolio: [
          ...prevFormData.portfolio,
          {
            id: newId,
            portfoliotitle: "",
            portfolioimg: "",
            portfoliolink: "",
          },
        ],
      };
    });
  };

  // Delete portfolio field
  const deletePortfolioField = (id) => {
    if (typeof id == "string") {
      setDeletePortfolioIds((prev) => [...prev, id]);
    }
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      portfolio: prevFormData.portfolio.filter((data) => data.id !== id),
    }));
  };

  const handlePortfolioUpload = (e, indexPortfolio, id) => {
    const fileInput = e.target;
    const maxFileSize = 1 * 1024 * 1024; // 1 MB

    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      // Check file size
      if (selectedFile.size > maxFileSize) {
        setIsSuccessGIF("fail");
        setProfileUpdateMess(
          "File size exceeds the maximum allowed limit of 1MB."
        );
        handleErrorMessPopUp();
        // Clear the file input
        fileInput.value = "";
        return;
      }

      // Check file type
      const allowedFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ];

      if (!allowedFileTypes.includes(selectedFile.type)) {
        setIsSuccessGIF("fail");
        setProfileUpdateMess(
          "Unsupported file format. Please select a file in DOC or PDF & PNG or JPEG format."
        );
        handleErrorMessPopUp();
        // Clear the file input
        fileInput.value = "";
        return;
      }
      const newData = [...editformData.portfolio];
      newData[indexPortfolio].portfolioimg = [selectedFile];
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        portfolio: newData,
      }));
      // Clear the error for this field
      validateAndSetFieldFormData(`portfolio_${id}_portfolioimg`, "");
    }
  };

  // ************************** end Portfolio form func **********************************
  // ************************** handle form data submit **********************************
  const [formDataErrors, setFormDataErrors] = useState({});

  const validateAndSetFieldFormData = (fieldName, value) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    setFormDataErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
    // Check if the field is empty
    // if (fieldName === "skills" && !value.length) {
    //   setFormDataErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [fieldName]: "Please select a skill.",
    //   }));
    // } else {
    //   // Clear error message if the field is not empty
    //   setFormDataErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [fieldName]: "",
    //   }));
    // }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newFormErrors = {};

    // Perform validation of all fields
    if (!editformData.first_name.trim()) {
      newFormErrors.first_name = "Please Enter a First name.";
    } else if (!/^[a-zA-Z\s]{3,}$/.test(editformData.first_name.trim())) {
      newFormErrors.first_name = "First name should only contain characters.";
    }

    if (!editformData.last_name.trim()) {
      newFormErrors.last_name = "Please Enter a Last Name.";
    } else if (!/^[a-zA-Z\s]{3,}$/.test(editformData.last_name.trim())) {
      newFormErrors.last_name =
        "Last name must be at least 3 characters and contain only letters";
    }
    if (!editformData.userProfile) {
      newFormErrors.userProfile = "Please select a profile image.";
    }
    if (!editformData.address || !editformData.address.trim()) {
      newFormErrors.address = "Please Enter your Address.";
    }
    if (!editformData.phone || !editformData.phone.trim()) {
      newFormErrors.phone = "Please Enter your Phone Number.";
    }
    // if (userData.login_as == 2) {
    //   if (!editformData.hourly_rate) {
    //     newFormErrors.hourly_rate = "Please enter your hourly rate.";
    //   }

    //   if (!editformData.hourly_available) {
    //     newFormErrors.hourly_available = "Please enter your hourly rate.";
    //   }
    // }
    // Country
    if (!editformData.country) {
      newFormErrors.country = "Please select a country.";
    }
    // TimeZone
    if (!editformData.timeZone) {
      newFormErrors.timeZone = "Please select a timezone.";
    }
    // skills
    if (userData.login_as === 2) {
      if (!editformData.skills || editformData.skills.length === 0) {
        newFormErrors.skills = "Please select a skill.";
      }
    }
    // // Company Name
    // if (!editformData.company_name.trim()) {
    //   newFormErrors.company_name = "Please enter a Company Name";
    // }
    // // Description
    if (userData.login_as === 2) {
      if (!editformData.company_desc.trim()) {
        newFormErrors.company_desc = "Please enter a description.";
      } else if (!/[A-Za-z]/.test(editformData.company_desc.trim())) {
        newFormErrors.company_desc =
          "Description should contain at least one character.";
      }
    }
    // Designation
    if (userData.login_as === 1) {
      if (!editformData.designation.trim()) {
        newFormErrors.designation = "Please enter a designation.";
      } else if (!/[A-Za-z]/.test(editformData.designation.trim())) {
        newFormErrors.designation =
          "Designation should have at least one character.";
      }
    }

    if (userData.login_as === 1) {
      // Web Address
      if (!editformData.webaddress.trim()) {
        newFormErrors.webaddress =
          "Please enter a web address. Example: www.example.com";
      } else if (
        !/^(?:(?:https?:\/\/)?(?:www\.)?\S+\.\S+)$/.test(
          editformData.webaddress.trim()
        )
      ) {
        newFormErrors.webaddress =
          "Please enter a valid web address. Example: www.example.com";
      }

      // Company Name
      if (!editformData.company_name.trim()) {
        newFormErrors.company_name = "Please enter a company name.";
      } else if (
        !/^(?=.*[a-zA-Z])[a-zA-Z0-9\s-]{3,}$/.test(
          editformData.company_name.trim()
        )
      ) {
        newFormErrors.company_name =
          "Company name should be at least 3 characters and contain at least one letter";
      }
    }
    if (userData.login_as === 2) {
      if (!editformData.experienceLevel) {
        setValidationError("Please select an experience level.");
      } else {
        setValidationError("");
      }
      // Education fields
      const seenSchools = new Set();
      const seenDegrees = new Set();
      const seenDates = new Set();
      editformData.education.forEach((data) => {
        if (!data.college_school.trim()) {
          newFormErrors[`education_${data.id}_college_school`] =
            "Please Enter a College/School";
        } else if (!/[A-Za-z]/.test(data.college_school.trim())) {
          newFormErrors[`education_${data.id}_college_school`] =
            "College/School should contain at least one character";
        }
        if (!data.degree.trim()) {
          newFormErrors[`education_${data.id}_degree`] =
            "Please Enter a Degree";
        } else if (!/[A-Za-z]/.test(data.degree.trim())) {
          newFormErrors[`education_${data.id}_degree`] =
            "Degree should contain at least one character";
        } else if (seenDegrees.has(data.degree.trim().toLowerCase())) {
          newFormErrors[`education_${data.id}_degree`] =
            "Duplicate degree found";
        } else {
          seenDegrees.add(data.degree.trim().toLowerCase());
        }

        if (!data.start_date) {
          newFormErrors[`education_${data.id}_start_date`] =
            "Please select a start date.";
        } else if (seenDates.has(data.start_date)) {
          newFormErrors[`education_${data.id}_start_date`] =
            "Duplicate start date found";
        } else {
          seenDates.add(data.start_date);
        }

        if (!data.end_date) {
          newFormErrors[`education_${data.id}_end_date`] =
            "Please select an end date.";
        } else if (seenDates.has(data.end_date)) {
          newFormErrors[`education_${data.id}_end_date`] =
            "Duplicate end date found";
        } else {
          seenDates.add(data.end_date);
        }

        if (
          data.start_date &&
          data.end_date &&
          data.start_date >= data.end_date
        ) {
          newFormErrors[`education_${data.id}_end_date`] =
            "End date must be greater than the start date.";
        }
      });

      // experience fields
      const dupCompanies = new Set();
      const dupDates = new Set();
      editformData.experience.forEach((data) => {
        if (!data.title || !data.title.trim()) {
          newFormErrors[`experience_${data.id}_title`] =
            "Please enter a title.";
        } else if (!/^[a-zA-Z\s]{3,}$/.test(data.title.trim())) {
          newFormErrors[`experience_${data.id}_title`] =
            "Title should be at least 3 characters and contain only letters";
        }

        if (!data.company_name || !data.company_name.trim()) {
          newFormErrors[`experience_${data.id}_company_name`] =
            "Please enter a company name.";
        } else if (!/[A-Za-z]/.test(data.company_name.trim())) {
          newFormErrors[`experience_${data.id}_company_name`] =
            "Company name should contain at least one character.";
        } else if (dupCompanies.has(data.company_name.trim().toLowerCase())) {
          newFormErrors[`experience_${data.id}_company_name`] =
            "Duplicate company name found";
        } else {
          dupCompanies.add(data.company_name.trim().toLowerCase());
        }

        // Existing validation logic
        if (!checkedWork && (!data.end_year || !data.end_month)) {
          // Validation for end date when "I currently work here" is not checked
          newFormErrors[`experience_${data.id}_end_date`] =
            "Please Enter an End Date";
        } else if (!checkedWork) {
          // More validation logic here
          // Validation for end date when "I currently work here" is not checked
          const endDate = new Date(`${data.end_year}-${data.end_month}`);
          const startDate = new Date(`${data.start_year}-${data.start_month}`);
          if (endDate <= startDate) {
            newFormErrors[`experience_${data.id}_end_date`] =
              "End date must be greater than start date";
          }
        }

        // Additional validation logic for end date when "I currently work here" is checked
        if (checkedWork && data.end_year && data.end_month) {
          const endDate = new Date(`${data.end_year}-${data.end_month}`);
          const startDate = new Date(`${data.start_year}-${data.start_month}`);
          if (endDate <= startDate) {
            newFormErrors[`experience_${data.id}_end_date`] =
              "End date must be greater than start date";
          }
        }

        // if (!checkedWork && (!data.end_year || !data.end_month)) {
        //   console.log(checkedWork, data.end_year, data.end_month)
        //   newFormErrors[`experience_${data.id}_end_date`] = "Please Enter an End Date";

        // } else if (!checkedWork) {
        //   const endDate = new Date(`${data.end_year}-${data.end_month}`);
        //   const startDate = new Date(`${data.start_year}-${data.start_month}`);
        //   console.log(checkedWork, data.end_year, data.end_month)
        //   console.log(startDate, endDate);
        //   if (endDate <= startDate) {
        //     newFormErrors[`experience_${data.id}_end_date`] = "End date must be greater than start date";
        //   }
        // }

        if (
          !data.start_month ||
          !data.start_month.trim() ||
          !data.start_year ||
          !data.start_year.trim()
        ) {
          newFormErrors[`experience_${data.id}_start_date`] =
            "Please select a start date.";
        } else {
          const startDate = `${data.start_month.trim()} ${data.start_year.trim()}`;
          if (dupDates.has(startDate)) {
            newFormErrors[`experience_${data.id}_start_date`] =
              "Duplicate start date found";
          } else {
            dupDates.add(startDate);
          }
        }
      });
      // Certificate fields
      const dupCertificateFor = new Set();
      const dupCertificateIn = new Set();
      const dupCertificateDates = new Set();
      editformData.certificate.forEach((data) => {
        if (
          data.certificate_for &&
          dupCertificateFor.has(data.certificate_for.trim().toLowerCase())
        ) {
          newFormErrors[`certificate_${data.id}_certificate_for`] =
            "Duplicate certificate found";
        } else {
          dupCertificateFor.add(data.certificate_for.trim().toLowerCase());
        }

        if (
          data.certificate_in &&
          dupCertificateIn.has(data.certificate_in.trim().toLowerCase())
        ) {
          newFormErrors[`certificate_${data.id}_certificate_in`] =
            "Duplicate certificate found";
        } else {
          dupCertificateIn.add(data.certificate_in.trim().toLowerCase());
        }

        // else if (dupCertificateDates.has(data.start_date)) {
        //   newFormErrors[`certificate_${data.id}_start_date`] = "Duplicate start date found";
        // } else {
        //   dupCertificateDates.add(data.start_date);
        // }

        if (
          data.end_date &&
          data.start_date &&
          dupCertificateDates.has(data.end_date) &&
          dupCertificateDates.has(data.start_date)
        ) {
          newFormErrors[`certificate_${data.id}_end_date`] =
            "Duplicate start date found";
        } else {
          dupCertificateDates.add(data.end_date);
          dupCertificateDates.add(data.start_date);
        }

        if (
          data.start_date &&
          data.end_date &&
          data.start_date >= data.end_date
        ) {
          newFormErrors[`certificate_${data.id}_end_date`] =
            "End date must be greater than the start date.";
        }
      });
      const newCertificateData = editformData.certificate.filter((data) => {
        // Check if any of the specified properties are defined
        if (
          data.certificate_for ||
          data.certificate_in ||
          data.start_date ||
          data.end_date
        ) {
          return true; // Keep the item if any of the properties are defined
        } else {
          return false; // Remove the item if all properties are undefined
        }
      });

      editformData.certificate = newCertificateData;
      // Portfolio fields validation
      const dupPortfolioTitle = new Set();
      const dupPortfolioLink = new Set();
      editformData.portfolio.forEach((data) => {
        if (!data.portfoliotitle || !data.portfoliotitle.trim()) {
          newFormErrors[`portfolio_${data.id}_portfoliotitle`] =
            "Please enter a portfolio title.";
        } else if (!/^[a-zA-Z\s]{3,}$/.test(data.portfoliotitle.trim())) {
          newFormErrors[`portfolio_${data.id}_portfoliotitle`] =
            "Portfolio title should be at least 3 characters and contain only letters.";
        } else if (
          dupPortfolioTitle.has(data.portfoliotitle.trim().toLowerCase())
        ) {
          newFormErrors[`portfolio_${data.id}_portfoliotitle`] =
            "Duplicate portfolio title found";
        } else {
          dupPortfolioTitle.add(data.portfoliotitle.trim().toLowerCase());
        }

        // Check if either portfolio image or portfolio link is provided
        const isPortfolioImageValid = !!data.portfolioimg;
        const isPortfolioLinkValid = !!data.portfoliolink;

        if (!isPortfolioImageValid && !isPortfolioLinkValid) {
          newFormErrors[`portfolio_${data.id}_portfoliolink`] =
            "Please provide either a portfolio image or a portfolio link.";
        } else if (!isPortfolioImageValid) {
          // Additional condition to check if portfolio image is not provided
          // Add appropriate error message or handle as per your requirement
        } else if (!isPortfolioLinkValid) {
          // Additional condition to check if portfolio link is not provided
          // Add appropriate error message or handle as per your requirement
        } else {
          // Validate portfolio link format if provided
          if (
            !/^(?:(?:https?:\/\/)?(?:www\.)?\S+\.\S+)$/.test(
              data.portfoliolink.trim()
            )
          ) {
            newFormErrors[`portfolio_${data.id}_portfoliolink`] =
              "Please enter a valid portfolio link.";
          } else if (
            dupPortfolioLink.has(data.portfoliolink.trim().toLowerCase())
          ) {
            newFormErrors[`portfolio_${data.id}_portfoliolink`] =
              "Duplicate portfolio link found";
          } else {
            dupPortfolioLink.add(data.portfoliolink.trim().toLowerCase());
          }
        }
      });
    }

    // Set errors in state
    setFormDataErrors(newFormErrors);

    // Check if there are any errors
    if (Object.keys(newFormErrors).length === 0) {
      try {
        // Your existing form validation and submission logic here

        // Simulating asynchronous form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Assuming PostProfileData is a function to handle form submission
        await  PostProfileData();
      } catch (error) {
        console.error("Form submission error:", error);
        // Handle any errors here
      } finally {
        setIsSubmitting(false); // Reset isSubmitting state
      }
    } else {
      setIsSubmitting(false); // Reset isSubmitting state
      const firstErrorField = Object.keys(newFormErrors)[0];
      let errorElementId;
      if (["first_name", "last_name", "address"].includes(firstErrorField)) {
        errorElementId = "showError1";
      } else if (["phone", "country", "timeZone", "skills", "company_desc" , "company_name"].includes(firstErrorField)) {
        errorElementId = "showError2";
      } else if (firstErrorField.startsWith("education")) {
        errorElementId = "showError3";
      } else if (firstErrorField.startsWith("experience")) {
        errorElementId = "showError4";
      } else if (firstErrorField.startsWith("portfolio")) {
        errorElementId = "showError5";
      }else {
        errorElementId = "scrollMiddle";
      }
    
      const errorElement = document.getElementById(errorElementId);
      if (errorElement) {
        console.log(firstErrorField , "2")
        errorElement.scrollIntoView({ behavior: 'smooth'});
      }
    
      // return;
    }
  }
  const PostProfileData = async () => {
    try {
      const formData = new FormData();
      const portfolioFormData = new FormData();
      formData.append("id", userData._id);
      formData.append("pid", pid);
      formData.append("user_type", userData.login_as);
      formData.append("check", checkedWork);
      formData.append("CompanyProfileFileName", CompanyProfileFileName);

      if (
        editformData?.userProfile &&
        typeof editformData?.userProfile === "object"
      ) {
        formData.append("avatar", editformData.userProfile);
      }

      // Append all fields from editformData dynamically
      for (const key in editformData) {
        if (editformData.hasOwnProperty(key)) {
          if (key === "portfolio") {
            continue; // Skip appending portfolio data
          }
          if (Array.isArray(editformData[key])) {
            // Format nested arrays like education, experience, certificate
            editformData[key].forEach((item, index) => {
              for (const nestedKey in item) {
                if (item.hasOwnProperty(nestedKey)) {
                  formData.append(
                    `${key}[${index}][${nestedKey}]`,
                    item[nestedKey]
                  );
                }
              }
            });
          } else if (typeof editformData[key] === "object") {
            // Format other nested objects
            formData.append(key, JSON.stringify(editformData[key]));
          } else {
            formData.append(key, editformData[key]);
          }
        }
      }
      console.log(formData, "seeee");
      portfolioFormData.append(
        "portfolio",
        JSON.stringify(editformData.portfolio)
      );
      portfolioFormData.append(
        "deleteDataId",
        JSON.stringify(DeletePortfolioIds)
      );
      // Append portfolio images
      const uploadedFileIds = [];
      editformData.portfolio.forEach((portfolioItem, index) => {
        if (portfolioItem.portfolioimg) {
          const data = {
            file: portfolioItem.portfolioimg[0],
          };
          if (typeof data.file == "object") {
            uploadedFileIds.push(portfolioItem.id);
            portfolioFormData.append("files", portfolioItem.portfolioimg[0]);
          }
        }
      });
      portfolioFormData.append("UploadedIds", JSON.stringify(uploadedFileIds));
      const result = await storepPortfolioData(portfolioFormData);
      console.log("formData", formData);
      const response = await update_profile(formData);
      console.log("formData", formData);
      if (response?.status == 200) {
        if (response?.data?.success === true) {
          if (
            editformData?.companyProfile &&
            typeof editformData?.companyProfile === "object"
          ) {
            const formDataImage = new FormData();
            formDataImage.append("companyImage", editformData.companyProfile);
            await storeImageInBackend(formDataImage);
          }
          setIsSuccessGIF("success");
          setProfileUpdateMess("Your profile has been successfully updated!");
          setSuccessMessPopUp((isOpen) => !isOpen);
          if (userData.login_as === 2) {
            setTimeout(() => {
              window.location.href = "/profile";
            }, 2000);
          }

          if (userData.login_as === 1) {
            setTimeout(() => {
              window.location.href = "/projects";
            }, 2000);
          }

          // setTimeout(() => {
          //   // window.location.href = "/profile";
          // }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // **************************END handle form data submit **********************************
  // *************************change password validation************************************
  const [changePasswordErrors, setChangePasswordErrors] = useState({});
  const validatePassword = (password) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const validateAndSetField = (fieldName, value) => {
    setChangePasswordFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    setChangePasswordErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setChangePasswordErrors(newErrors);

    if (!changePasswordFormData.current_password) {
      newErrors.current_password = "Please Enter current password";
    }

    if (!validatePassword(changePasswordFormData.new_password)) {
      newErrors.new_password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (
      changePasswordFormData.new_password !==
      changePasswordFormData.confirm_password
    ) {
      newErrors.confirm_password = "Passwords do not match";
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        const { data } = await axios.post(
          `${url}/change-password`,
          {
            c_password: changePasswordFormData?.current_password,
            new_password: changePasswordFormData?.new_password,
            id: userData?._id,
          },
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setIsSuccessGIF("success");
          setProfileUpdateMess("Your password has been successfully updated!");
          handleSuccessMessPopUp();
        } else {
          setChangePasswordErrors((prevErrors) => ({
            ...prevErrors,
            current_password: "Password incorrect.",
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const yearsInPast = 20;
  const yearsInFuture = 10;
  const dynamicYears = Array.from(
    { length: yearsInPast + yearsInFuture + 1 },
    (_, index) => currentYear - yearsInPast + index
  );

  const handlePhoneChange = (phone, country, e, formattedValue) => {
    setEditFormData({
      ...editformData,
      phone: formattedValue,
    });
  };

  const handleSkillChange = (newValue, actionMeta) => {
    validateAndSetFieldFormData("skills", newValue);
    setSelectedSkills(newValue);
    setEditFormData({
      ...editformData,
      skills: newValue.map((val) => val.label),
    });
  };

  const handleDownload = async () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    portfolioDownloadFileName.map(async (item) => {
      if (item != null) {
        const fileUrl = `${url}/public/uploads/profile_attachments/${item}`;

        // Fetch the image as a blob
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = await item;

        // Append the link to the document body and trigger a click event
        document.body.appendChild(link);
        link.click();

        // Cleanup: remove the link from the document body and revoke the object URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    });
  };

  const cleanResponse = (responseText) => {
    // Remove any markdown-like headers (e.g., ## or **)
    let cleanedText = responseText.replace(/##|[*]/g, "");

    // Remove any extraneous spaces
    cleanedText = cleanedText.trim();

    // If the response starts with a colon, remove it
    cleanedText = cleanedText.replace(/^:\s*/, "");

    return cleanedText;
  };
  const handleAiTextGeneration = async () => {
    if (!promptVal.trim()) {
      setPromptError("Please enter a prompt");
      return;
    }
    setPromptError("");

    try {
      setGenerating(true);
      const data = promptVal;

      const response = await generateText({ data });
      if (response?.data.success) {
        setGenerating(false);
        const result = response?.data;
        if (result.text) {
          const cleanedText = cleanResponse(result.text);
          if (promptKey !== null) {
            if (promptKey == "title") {
              setEditFormData({
                ...editformData,
                company_desc: cleanedText,
              });
            }
          }
        }
        setPromptKey(null);
        setPromptVal("");
        setPromptError("");
        setPromptModelOpen(false);
      } else {
        setGenerating(false);
        setPromptVal("");
        setPromptError(response?.data.error);
      }
    } catch (error) {
      setGenerating(false);
      console.error("Error generating AI text:", error);
      setPromptError("Error generating AI text. Please try again later!");
    }
  };
  const closePromptModal = () => {
    setPromptModelOpen(false);
    setPromptKey(null);
    setPromptVal("");
    setPromptError("");
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <>
      <ThemeProvider theme={theme}>
        {loading ? (
          <Loader />
        ) : (
          <div className="find-section">
            <div className="sidemenuand-Fide-job-row">
              <div className="xl:pl-14 lg:py-7" id="showError1">
                <h1
                  className={`${mulish600.className} text-[20px] md:text-[29px] text-[#000] mb-[16px] tracking-wide`}
                >
                  Edit Profile
                </h1>
                <div className=" border border-[#a6b7f4] rounded-[14px] px-[5px] md:px-[10px] py-[23px]">
                  <form autoComplete="off" method="post" action="">
                    <div className="flex flex-col flex-wrap">
                      <div className="rowlinecontent">
                        <div className="sm:w-1/2 pr-4 pl-4 px-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={`text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                htmlFor="firstName"
                              >
                                First Name
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>
                            <input
                              maxLength="100"
                              type="text"
                              placeholder="First Name"
                              name="first_name"
                              id="firstName"
                              className={`block rounded appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `} // Corrected class attribute
                              value={editformData.first_name}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "first_name",
                                  e.target.value
                                )
                              }
                            />
                            {formDataErrors.first_name && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="first_name_error"
                              >
                                {formDataErrors.first_name}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:w-1/2 pr-4 pl-4 px-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                htmlFor="lastName"
                              >
                                Last Name
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>

                            <input
                              maxLength="100"
                              type="text"
                              placeholder="Last Name"
                              name="last_name"
                              id="lastName"
                              className={`block appearance-none rounded w-full py-1 px-2 mb-1 text-base leading-normal bg-white border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `}
                              value={editformData.last_name}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "last_name",
                                  e.target.value
                                )
                              }
                            />
                            {formDataErrors.last_name && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="last_name_error"
                              >
                                {formDataErrors.last_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="rowlinecontent min-h-fit">
                        <div className="sm:w-1/2 pr-4 pl-4 px-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                              >
                                User Profile
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>

                            <div className="flex gap-5 img-upload">
                              <input
                                type="file"
                                className={`block rounded appearance-none w-full pt-1.5 pl-2 mb-1 text-base leading-normal bg-white border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `}
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={(e) => {
                                  const selectedFile = e.target.files[0];
                                  if (selectedFile) {
                                    const allowedFormats = [
                                      "image/jpeg",
                                      "image/jpg",
                                      "image/png",
                                      "image/gif",
                                    ];
                                    if (
                                      !allowedFormats.includes(
                                        selectedFile.type
                                      )
                                    ) {
                                      setIsSuccessGIF("fail");
                                      setProfileUpdateMess(
                                        "Unsupported file format. Please select an image in JPG, JPEG, PNG, or GIF format."
                                      );
                                      handleSuccessMessPopUp();
                                      e.target.value = "";
                                    } else {
                                      const fileName = selectedFile.name;
                                      validateAndSetFieldFormData(
                                        "userProfile",
                                        selectedFile
                                      );
                                    }
                                  }
                                }}
                              />
                              {/* Display the user's uploaded profile picture */}

                              {editformData?.userProfile &&
                                typeof editformData?.userProfile ===
                                  "object" && (
                                  <img
                                    src={
                                      editformData.userProfile instanceof Blob
                                        ? URL.createObjectURL(
                                            editformData.userProfile
                                          )
                                        : ""
                                    }
                                    alt="User Profile"
                                    className="rounded-full"
                                    width={45}
                                    height={40}
                                  />
                                )}
                              {editformData?.userProfile &&
                                typeof editformData?.userProfile ===
                                  "string" && (
                                  <img
                                    src={`${url}/public/uploads/profile_attachments/${editformData?.userProfile}`}
                                    alt="User Profile"
                                    className="rounded-full"
                                    width={45}
                                    height={40}
                                    onError={(e) => {
                                      const target = e.target;
                                      target.src =
                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                                    }}
                                  />
                                )}
                            </div>

                            {formDataErrors.userProfile && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="profile_error"
                              >
                                {formDataErrors.userProfile}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:w-1/2 pr-4 pl-4 px-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>

                            <input
                              maxLength="100"
                              type="text"
                              placeholder="Email"
                              name="email"
                              id="email"
                              className={`block rounded appearance-none w-full pb-1 px-2 mb-1 text-base leading-normal bg-[#e9ecef] border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `}
                              value={editformData.email}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="sm:w-full pr-4 pl-4">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                id="showError2"
                              >
                                Address
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>

                            <textarea
                              className={`border border-[#dee2e6] rounded text-[#495057] ${inter400.className} `}
                              name="location"
                              rows={2}
                              cols={40}
                              style={{
                                width: "100%",
                                padding: 10,
                              }}
                              value={editformData.address}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "address",
                                  e.target.value
                                )
                              }
                            />
                            {formDataErrors.address && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="address_error"
                              >
                                {formDataErrors.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "start",
                          flexWrap: "wrap",
                        }}
                      >
                        <div className="flex-col sm:w-1/2 pr-4 pl-4 d-grid pe-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                htmlFor="phoneNumber"
                              >
                                Phone Number
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>
                            <PhoneInput
                              country={"ng"}
                              name="phone"
                              id="phoneNumber"
                              className={`block appearance-none rounded w-full py-1 mb-1 text-base leading-normal bg-white  border border-[#dee2e6] h-10 text-[#495057] ${inter400.className} `}
                              countryCodeEditable={false}
                              value={editformData.phone}
                              onChange={handlePhoneChange}
                            />

                            {formDataErrors.phone && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="phone_error"
                              >
                                {formDataErrors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex-col sm:w-1/2 pr-4 pl-4 d-grid pe-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                              >
                                Country
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>

                            <select
                              className={`block w-full rounded py-1 px-2 mb-1 text-base leading-normal bg-white  border border-[#dee2e6] h-10 text-[#495057] ${inter400.className} `}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "country",
                                  e.target.value
                                )
                              }
                              value={editformData.country}
                            >
                              <option disabled value="">
                                Select Country
                              </option>
                              {userData && userData.country && (
                                <option value={userData.country}>
                                  {countries.find(
                                    (country) =>
                                      country._id === userData.country
                                  )?.name || "Select Country"}
                                </option>
                              )}
                              {countries.map((country) => (
                                <option key={country.id} value={country._id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            {/* Display country error outside of the select element */}
                            {formDataErrors.country && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="country_error"
                              >
                                {formDataErrors.country}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="rowlinecontent">
                        <div className="sm:w-1/2 pr-4 pl-4 d-grid pe-1 mb-4">
                          <div className="mb-2.5">
                            <label
                              className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                            >
                              Time zone
                            </label>
                            <span className="text-red pl-1">*</span>
                          </div>

                          {/* <TimezoneSelect
                      className="form-control p-0" */}
                          <TimezoneSelect
                            className="!appearance-none !w-full selection:mb-1 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded p-0"
                            value={editformData.timeZone}
                            onChange={(value) =>
                              validateAndSetFieldFormData(
                                "timeZone",
                                value.value
                              )
                            }
                          >
                            <option
                              value=""
                              className={`text-[#495057] ${inter400.className} `}
                            >
                              Select Timezone
                            </option>
                          </TimezoneSelect>
                          {/* Display country error outside of the select element */}
                          {formDataErrors.timeZone && (
                            <p
                              className={`${inter500.className} text-[15px] text-[#FF0000]`}
                              id="timezone_error"
                            >
                              {formDataErrors.timeZone}
                            </p>
                          )}
                        </div>
                        <div className="sm:w-1/2 pr-4 pl-4 d-grid pe-1 mb-4">
                          {userData && userData.login_as === 2 && (
                            <>
                              <div className="mb-2.5">
                                <Tooltip
                                  title="Choose or enter your skill. Your skills show clients what you can offer"
                                  placement="right"
                                  arrow
                                  componentsProps={tooltipClass}
                                >
                                  <label
                                    className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                  >
                                    Your Skill
                                  </label>
                                <span className="text-red pl-1">*</span>
                                </Tooltip>
                              </div>
                              {/* <select
                              className="block w-full py-[7px] px-2 text-base leading-normal bg-white  border border-[#dee2e6] text-[#495057] h-10"
                              onChange={(e) => {
                                validateAndSetFieldFormData(
                                  "skills",
                                  e.target.value
                                );
                              }}
                              value={editformData.skills}
                            >
                              <option
                                value=""
                                className={`text-[#495057] ${inter400.className} `}
                              >
                                Select a skill
                              </option>
                              {skillsList.map((skill) => (
                                <option key={skill.id} value={skill.name}>
                                  {skill.name}
                                </option>
                              ))}
                            </select> */}
                              <CreatableSelect
                                id="searchSkills"
                                className="searchSkills-select-input border border-inputbordercolor mt-[5px] rounded"
                                isMulti
                                options={skillsList.map((skill) => ({
                                  value: skill._id,
                                  label: skill.name,
                                }))}
                                value={selectedSkills}
                                onChange={handleSkillChange}
                                placeholder="Search for skills"
                              />
                              {/* Display skills error outside of the select element */}
                              {formDataErrors.skills && (
                                <p
                                  className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  id="skills_error"
                                >
                                  {formDataErrors.skills}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      {userData && userData.login_as === 1 && (
                        <div className="rowlinecontent">
                          <div className="sm:w-full pr-4 pl-4 px-1 flex gap-[20px]">
                            <div className="w-[50%]">
                              <div className="mb-2.5">
                                <label
                                  className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                >
                                  Company Profile
                                </label>
                              </div>

                              <div className="flex gap-5 img-upload">
                                <input
                                  type="file"
                                  className={`block rounded appearance-none w-full pt-1.5 pl-2 mb-1 text-base leading-normal bg-white border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `}
                                  accept=".jpg, .jpeg, .png, .gif"
                                  onChange={(e) => {
                                    const selectedFile = e.target.files[0];
                                    if (selectedFile) {
                                      const allowedFormats = [
                                        "image/jpeg",
                                        "image/jpg",
                                        "image/png",
                                        "image/gif",
                                      ];
                                      if (
                                        !allowedFormats.includes(
                                          selectedFile.type
                                        )
                                      ) {
                                        setIsSuccessGIF2("fail");
                                        setProfileUpdateMess2(
                                          "Unsupported file format. Please select an image in JPG, JPEG, PNG, or GIF format."
                                        );
                                        handleSuccessMessPopUp2();
                                        e.target.value = "";
                                      } else {
                                        const fileName = selectedFile.name;
                                        // Do whatever you need with the file name
                                        setCompanyProfileFileName(fileName);
                                        validateAndSetFieldFormData(
                                          "companyProfile",
                                          selectedFile
                                        );
                                      }
                                    }
                                  }}
                                />
                                {/* Display the user's uploaded profile picture */}

                                {editformData?.companyProfile &&
                                  typeof editformData?.companyProfile ===
                                    "object" && (
                                    <img
                                      src={
                                        editformData.companyProfile instanceof
                                        Blob
                                          ? URL.createObjectURL(
                                              editformData.companyProfile
                                            )
                                          : ""
                                      }
                                      alt="Company Profile"
                                      className="rounded-full"
                                      width={45}
                                      height={40}
                                    />
                                  )}
                                {editformData?.companyProfile &&
                                  typeof editformData?.companyProfile ===
                                    "string" && (
                                    <img
                                      src={`${url}/public/uploads/profile_attachments/${editformData?.companyProfile}`}
                                      alt="Company Profile"
                                      className="rounded-full"
                                      width={45}
                                      height={40}
                                      onError={(e) => {
                                        const target = e.target;
                                        target.src =
                                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                                      }}
                                    />
                                  )}
                              </div>

                              {formDataErrors.companyProfile && (
                                <p
                                  className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  id="profile_error"
                                >
                                  {formDataErrors.companyProfile}
                                </p>
                              )}
                            </div>
                            <div className="sm:w-1/2 pr-4 pl-4 px-1">
                              <div className="mb-4">
                                <div className="mb-2.5">
                                  <label
                                    className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                    htmlFor="companyName"
                                  >
                                    Company Name
                                  </label>
                                  <span className="text-red pl-1">*</span>
                                </div>
                                <input
                                  maxLength="100"
                                  type="text"
                                  placeholder="Company Name"
                                  name="company_name"
                                  id="companyName"
                                  className={`block rounded appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white border border-[#dee2e6] h-10 text-[#495057] ${inter400.className} `}
                                  onChange={(e) =>
                                    validateAndSetFieldFormData(
                                      "company_name",
                                      e.target.value
                                    )
                                  }
                                  value={editformData.company_name}
                                />

                                {formDataErrors.company_name && (
                                  <p
                                    className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                    id="company_name_error"
                                  >
                                    {formDataErrors.company_name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        {/* Description field start */}
                        <div className="sm:w-full pr-4 pl-4">
                          <div className="mb-4">
                            <div className="mb-2.5 flex flex-1 w-full">
                            {userData && userData.login_as === 2 ? 
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide flex-1`}
                              >
                              <Tooltip
                                  title="Describe what you do. This helps potential clients get to know you at glance."
                                  placement="right"
                                  arrow
                                  componentsProps={tooltipClass}
                                >
                               Description <span className="text-red pl-1">*</span>
                              </Tooltip>
                              </label> 
                              :
                              <label
                                className={` text-[#2D3748] text-base ${inter500.className} tracking-wide flex-1`}
                              >
                               Company Description (optional)
                              </label>
                            }
                              
                              <a
                                className={`flex gap-1 items-end ${
                                  userData && userData.login_as === 2
                                    ? "hidden"
                                    : "block"
                                }`}
                                // onClick={handleAiPromptVisible}
                                onClick={() => {
                                  setPromptKey("title");
                                  setPlaceholderText("Ex: Company Description");
                                  setPromptModelOpen(true);
                                }}
                              >
                                <MyCustomIcon width={20} height={20} />
                                <p className={`text-[13px] text-[#ffb705] `}>
                                  Write with AI
                                </p>
                              </a>
                            </div>

                            <textarea
                              className={`border border-[#dee2e6] rounded text-[#495057] ${inter400.className} `}
                              name="company_desc"
                              rows={2}
                              cols={40}
                              style={{
                                width: "100%",
                                padding: 10,
                              }}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "company_desc",
                                  e.target.value
                                )
                              }
                              value={editformData.company_desc}
                            />
                            {formDataErrors.company_desc && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="company_desc_error"
                              >
                                {formDataErrors.company_desc}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div id="scrollMiddle"></div>
                      {/* Description field end */}
                      {/* Designation field start */}
                      {userData && userData.login_as === 1 && (
                        <div className="rowlinecontent">
                          <div className="sm:w-1/2 pr-4 pl-4 px-1">
                            <div className="mb-4">
                              <div className="mb-2.5">
                                <label
                                  className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                  htmlFor="designation"
                                >
                                  Designation
                                </label>
                                <span className="text-red pl-1">*</span>
                              </div>
                              <input
                                maxLength="100"
                                type="text"
                                placeholder="Designation"
                                name="designation"
                                id="designation"
                                className={`block rounded appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `} // Corrected class attribute
                                onChange={(e) =>
                                  validateAndSetFieldFormData(
                                    "designation",
                                    e.target.value
                                  )
                                }
                                value={editformData.designation}
                              />
                              {formDataErrors.designation && (
                                <p
                                  className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  id="designation_error"
                                >
                                  {formDataErrors.designation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Designation field end */}
                      {/* hourly avalible field start  */}
                      {/* {userData && userData.login_as === 2 && (
                      <div className="rowlinecontend flex">
                        <div className="sm:w-1/2 pr-4 pl-4 px-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={`text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                htmlFor="hourlyRate"
                              >
                                Hourly Rate
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>
                            <input
                              maxLength="100"
                              type="number"
                              placeholder="Hourly Rate"
                              name="hourly_rate"
                              id="hourlyRate"
                              className={`block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `}
                              value={editformData.hourly_rate}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "hourly_rate",
                                  e.target.value
                                )
                              }
                              pattern="[0-9]*"
                            />
                            {formDataErrors.hourly_rate && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="hourly_rate_error"
                              >
                                {formDataErrors.hourly_rate}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:w-1/2 pr-4 pl-4 px-1">
                          <div className="mb-4">
                            <div className="mb-2.5">
                              <label
                                className={`text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                htmlFor="hourlyAvailable"
                              >
                                Hourly available
                              </label>
                              <span className="text-red pl-1">*</span>
                            </div>
                            <input
                              maxLength="100"
                              type="number"
                              placeholder="Hourly available"
                              name="hourly_available"
                              id="hourlyAvailable"
                              className={`block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white border border-[#E2E8F0] h-10 text-[#495057] ${inter400.className} `}
                              value={editformData.hourly_available}
                              onChange={(e) =>
                                validateAndSetFieldFormData(
                                  "hourly_available",
                                  e.target.value
                                )
                              }
                              pattern="[0-9]*"
                            />
                            {formDataErrors.hourly_available && (
                              <p
                                className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                id="hourly_available_error"
                              >
                                {formDataErrors.hourly_available}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )} */}

                      {/* hourly avalible field end */}
                      {/* Web Address field start */}
                      {userData && userData.login_as === 1 && (
                        <div className="rowlinecontent">
                          <div className="sm:w-full pr-4 pl-4 px-1">
                            <div className="mb-4">
                              <div className="mb-2.5">
                                <label
                                  className={` text-[#2D3748] text-base ${inter500.className} tracking-wide`}
                                  htmlFor="webaddress"
                                >
                                  Web Address
                                </label>
                                <span className="text-red pl-1">*</span>
                              </div>
                              <input
                                maxLength="100"
                                type="text"
                                placeholder="Web Address"
                                name="webaddress"
                                id="webaddress"
                                className={`w-full rounded appearance-none py-1 px-2 mb-1 text-base leading-normal bg-white  border border-[#dee2e6]  h-10 text-[#495057] ${inter400.className} `}
                                onChange={(e) =>
                                  validateAndSetFieldFormData(
                                    "webaddress",
                                    e.target.value
                                  )
                                }
                                value={editformData.webaddress}
                              />
                              {formDataErrors.webaddress && (
                                <p
                                  className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  id="webaddress_error"
                                >
                                  {formDataErrors.webaddress}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Web Address field end */}
                      {/******************* Education field start *******************/}

                      {userData && userData.login_as === 2 && (
                        <div className="" id="showError3">
                          <div className="mb-2.5">
                            <label
                              className={`pl-4 text-[#2D3748] text-base ${inter500.className} tracking-wide text-[#2D3748]`}
                            >
                              Education
                            </label>
                            <span className="text-red pl-1">*</span>
                          </div>
                          {editformData?.education?.map(
                            (data, indexEducation) => (
                              <div
                                className="mx-4 flex flex-col md:grid grid-cols-6 xl:grid-cols-12 md:gap-x-4 lg:gap-x-2 xl:gap-x-8"
                                key={data.id}
                              >
                                {/* College/School */}
                                <div className="col-span-3">
                                  <div className="mb-4">
                                    <div className="mb-2.5">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        College/School
                                      </label>
                                    </div>
                                    <input
                                      type="text"
                                      className="block appearance-none rounded w-full py-1 px-2 mb-1 text-base leading-normal bg-white border border-[#dee2e6]  text-[#495057]  h-10"
                                      value={data.college_school}
                                      onChange={(e) => {
                                        const newData = [
                                          ...editformData.education,
                                        ];
                                        newData[indexEducation].college_school =
                                          e.target.value;
                                        setEditFormData((prevFormData) => ({
                                          ...prevFormData,
                                          education: newData,
                                        }));
                                        // Clear the error for this field
                                        validateAndSetFieldFormData(
                                          `education_${data.id}_college_school`,
                                          ""
                                        );
                                      }}
                                    />
                                    {formDataErrors[
                                      `education_${data.id}_college_school`
                                    ] && (
                                      <p
                                        className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                      >
                                        {
                                          formDataErrors[
                                            `education_${data.id}_college_school`
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Degree */}
                                <div className="col-span-3">
                                  <div className="mb-4">
                                    <div className="mb-2.5">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Degree
                                      </label>
                                    </div>
                                    <input
                                      type="text"
                                      name="degree"
                                      className="block appearance-none rounded w-full py-1 px-2 mb-1 text-base leading-normal bg-white  border border-[#dee2e6]  text-[#495057]  h-10"
                                      value={data.degree}
                                      onChange={(e) => {
                                        const newData = [
                                          ...editformData.education,
                                        ];
                                        newData[indexEducation].degree =
                                          e.target.value;
                                        setEditFormData((prevFormData) => ({
                                          ...prevFormData,
                                          education: newData,
                                        }));
                                        // Clear the error for this field
                                        validateAndSetFieldFormData(
                                          `education_${data.id}_degree`,
                                          ""
                                        );
                                      }}
                                    />
                                    {formDataErrors[
                                      `education_${data.id}_degree`
                                    ] && (
                                      <p
                                        className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                      >
                                        {
                                          formDataErrors[
                                            `education_${data.id}_degree`
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Start Date */}
                                <div className="col-span-2">
                                  <div className="mb-4">
                                    <div className="mb-2.5">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Start Date
                                      </label>
                                    </div>
                                    <input
                                      type="date"
                                      className="block appearance-none rounded w-full py-1 px-2 mb-1 text-base leading-normal bg-white  border border-[#dee2e6]  text-[#495057]  h-10"
                                      value={data.start_date}
                                      max={
                                        new Date().toISOString().split("T")[0]
                                      }
                                      onChange={(e) => {
                                        const newData = [
                                          ...editformData.education,
                                        ];
                                        newData[indexEducation].start_date =
                                          e.target.value;
                                        setEditFormData((prevFormData) => ({
                                          ...prevFormData,
                                          education: newData,
                                        }));
                                        // Clear the error for this field
                                        validateAndSetFieldFormData(
                                          `education_${data.id}_start_date`,
                                          ""
                                        );
                                      }}
                                    />
                                    {formDataErrors[
                                      `education_${data.id}_start_date`
                                    ] && (
                                      <p
                                        className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                      >
                                        {
                                          formDataErrors[
                                            `education_${data.id}_start_date`
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* End Date */}
                                <div className="col-span-2">
                                  <div className="mb-4">
                                    <div className="mb-2.5">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        End Date
                                      </label>
                                    </div>
                                    <input
                                      type="date"
                                      className="block  appearance-none rounded w-full py-1 px-2 mb-1 text-base leading-normal bg-white  border border-[#dee2e6]  text-[#495057]  h-10"
                                      value={data.end_date}
                                      min={data.start_date}
                                      max={
                                        new Date().toISOString().split("T")[0]
                                      }
                                      onChange={(e) => {
                                        const newData = [
                                          ...editformData.education,
                                        ];
                                        newData[indexEducation].end_date =
                                          e.target.value;
                                        setEditFormData((prevFormData) => ({
                                          ...prevFormData,
                                          education: newData,
                                        }));
                                        // Clear the error for this field
                                        validateAndSetFieldFormData(
                                          `education_${data.id}_end_date`,
                                          ""
                                        );
                                      }}
                                    />
                                    {formDataErrors[
                                      `education_${data.id}_end_date`
                                    ] && (
                                      <p
                                        className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                      >
                                        {
                                          formDataErrors[
                                            `education_${data.id}_end_date`
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-2 mb-4 text-right xl:text-left custom-text">
                                  <div className="">
                                    <div className="mb-2.5">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Action
                                      </label>
                                    </div>
                                    <button
                                      className={`Education-Acsion ${
                                        inter400.className
                                      } ${
                                        indexEducation === 0 ? "disabled" : ""
                                      }`}
                                      onClick={() =>
                                        deleteEducationField(data.id)
                                      }
                                      disabled={indexEducation === 0}
                                    >
                                      DEL
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          {/* Add Row Button */}
                          <div className="mx-4 mb-4">
                            <button
                              onClick={addEducationField}
                              type="button"
                              className={`inline-block w-full md:w-auto align-middle text-center select-none border font-normal whitespace-no-wrap rounded-[6px] py-2 px-3 leading-normal no-underline bg-gray-600 text-white hover:bg-gray-700 bg-[#286CAC] hover:border-[#286CAC] hover:text-[#286CAC] hover:bg-white ${inter400.className}`}
                            >
                              Add More
                            </button>
                          </div>
                        </div>
                      )}

                      {/******************* Education field end *******************/}
                      {/* Experience Level start            */}
                      {userData && userData.login_as === 2 && (
                        <>
                          <div className="ml-4 mb-2.5" id="showError4">
                            <label
                              className={` text-[#2D3748] text-base ${inter500.className} tracking-wide text-[#2D3748]`}
                            >
                              Experience Level{" "}
                            </label>
                            <span className="text-red pl-1">*</span>
                          </div>
                          <div className="sm:w-1/2 pr-4 pl-4 selectionbutton mb-4">
                            <label className=" flex gap-2">
                              <input
                                type="radio"
                                name="experience"
                                value="Fresher"
                                checked={
                                  editformData.experienceLevel === "Fresher"
                                }
                                onChange={handleExperienceChange}
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              Fresher
                            </label>

                            <label className="flex gap-2">
                              <input
                                type="radio"
                                name="experience"
                                value="Intermediate"
                                checked={
                                  editformData.experienceLevel ===
                                  "Intermediate"
                                }
                                onChange={handleExperienceChange}
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              Intermediate
                            </label>

                            <label className="flex gap-2">
                              <input
                                type="radio"
                                name="experience"
                                value="Expert"
                                checked={
                                  editformData.experienceLevel === "Expert"
                                }
                                onChange={handleExperienceChange}
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              Expert
                            </label>
                          </div>
                          {validationError && (
                            <p
                              className={`${inter500.className} text-[15px] text-[#FF0000]`}
                            >
                              {validationError}
                            </p>
                          )}
                        </>
                      )}
                      {/* Experience Level end            */}
                      {/******************* Experience field start*******************/}
                      {userData && userData.login_as === 2 && (
                        <div className="">
                          <div className="ml-4 mb-2.5">
                            <label
                              className={`text-[#2D3748] text-base ${inter500.className} tracking-wide text-[#2D3748]`}
                            >
                              Experience
                            </label>
                            <span className="text-red pl-1">*</span>
                          </div>
                          <div>
                            {editformData.experience?.map(
                              (data, indexExperience) => (
                                <div key={data.id}>
                                  <div className="mx-4 flex flex-col md:grid grid-cols-6 xl:grid-cols-12 md:gap-x-4 lg:gap-x-2 xl:gap-x-8">
                                    {/* Title */}
                                    <div className="col-span-3 xl:col-span-2">
                                      <div className="mb-4">
                                        <div className="mb-2.5">
                                          <label
                                            className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                          >
                                            Designation
                                          </label>
                                        </div>
                                        {/* <label className="control-label">Title</label> */}
                                        <input
                                          type="text"
                                          className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                          value={data.title}
                                          onChange={(e) => {
                                            const newData = [
                                              ...editformData.experience,
                                            ];
                                            newData[indexExperience].title =
                                              e.target.value;
                                            setEditFormData((prevFormData) => ({
                                              ...prevFormData,
                                              experience: newData,
                                            }));
                                            // Clear the error for this field
                                            validateAndSetFieldFormData(
                                              `experience_${data.id}_title`,
                                              ""
                                            );
                                          }}
                                        />
                                        {formDataErrors[
                                          `experience_${data.id}_title`
                                        ] && (
                                          <p
                                            className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                          >
                                            {
                                              formDataErrors[
                                                `experience_${data.id}_title`
                                              ]
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Compnay */}
                                    <div className="col-span-3 xl:col-span-2">
                                      <div className="mb-4">
                                        <div className="mb-2.5">
                                          <label
                                            className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                          >
                                            Company
                                          </label>
                                        </div>
                                        <input
                                          type="text"
                                          className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                          value={data.company_name}
                                          onChange={(e) => {
                                            const newData = [
                                              ...editformData.experience,
                                            ];
                                            newData[
                                              indexExperience
                                            ].company_name = e.target.value;
                                            setEditFormData((prevFormData) => ({
                                              ...prevFormData,
                                              experience: newData,
                                            }));
                                            // Clear the error for this field
                                            validateAndSetFieldFormData(
                                              `experience_${data.id}_company_name`,
                                              ""
                                            );
                                          }}
                                        />
                                        {formDataErrors[
                                          `experience_${data.id}_company_name`
                                        ] && (
                                          <p
                                            className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                          >
                                            {
                                              formDataErrors[
                                                `experience_${data.id}_company_name`
                                              ]
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    {/* ********************************Experience (start date)********************************** */}
                                    <div className="col-span-3">
                                      <div className="w-full xl:w-auto">
                                        <div className="mb-4 flex flex-col">
                                          <div className="mb-2.5">
                                            <label
                                              className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                            >
                                              Start Date
                                            </label>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <select
                                              className="block text-[#495057] w-full min-w-[50%] h-10 py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                              name="startmonth"
                                              id="startmonth"
                                              value={data.start_month}
                                              onChange={(e) => {
                                                const newData = [
                                                  ...editformData.experience,
                                                ];
                                                newData[
                                                  indexExperience
                                                ].start_month = e.target.value;
                                                setEditFormData(
                                                  (prevFormData) => ({
                                                    ...prevFormData,
                                                    experience: newData,
                                                  })
                                                );
                                                validateAndSetFieldFormData(
                                                  `experience_${data.id}_start_date`,
                                                  ""
                                                );
                                              }}
                                            >
                                              {validMonths.map((month) => (
                                                <option
                                                  key={`${month}A`}
                                                  value={month}
                                                >
                                                  {month}
                                                </option>
                                              ))}
                                            </select>
                                            <select
                                              className="block text-[#495057] w-full py-1 h-10 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                              name="startyears"
                                              id="startyears"
                                              value={data.start_year}
                                              onChange={(e) => {
                                                const newData = [
                                                  ...editformData.experience,
                                                ];
                                                newData[
                                                  indexExperience
                                                ].start_year = e.target.value;
                                                setEditFormData(
                                                  (prevFormData) => ({
                                                    ...prevFormData,
                                                    experience: newData,
                                                  })
                                                );
                                                // Clear the error for this field
                                                validateAndSetFieldFormData(
                                                  `experience_${data.id}_start_date`,
                                                  ""
                                                );
                                              }}
                                            >
                                              <option value="">year</option>
                                              {cyears.map((year) => (
                                                <option
                                                  key={`${year}1`}
                                                  value={year}
                                                >
                                                  {year}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          {/* Validation */}
                                          {formDataErrors[
                                            `experience_${data.id}_start_date`
                                          ] && (
                                            <p
                                              className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                            >
                                              {
                                                formDataErrors[
                                                  `experience_${data.id}_start_date`
                                                ]
                                              }
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      {/* *******************************Experience (end date)*********************************** */}
                                    </div>
                                    {/* ********************************Experience (end date)********************************** */}
                                    <div className="col-span-3">
                                      <div className="mb-4 flex flex-col w-full xl:w-auto">
                                        <div className="mb-2.5">
                                          <label
                                            className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                          >
                                            End Date
                                          </label>
                                        </div>
                                        <div className="flex  items-center gap-2 w-full">
                                          <select
                                            className="block text-[#495057] w-full min-w-[50%] h-10 py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                            name="endmonth"
                                            id="endmonth"
                                            value={data.end_month}
                                            // Inside the onChange event handler for the end month select
                                            onChange={(e) => {
                                              const newData = [
                                                ...editformData.experience,
                                              ];
                                              newData[
                                                indexExperience
                                              ].end_month = e.target.value;
                                              setEditFormData(
                                                (prevFormData) => ({
                                                  ...prevFormData,
                                                  experience: newData,
                                                })
                                              );
                                              validateAndSetFieldFormData(
                                                `experience_${data.id}_end_date`,
                                                ""
                                              );
                                            }}
                                            onClick={(e) => {}}
                                            disabled={
                                              checkedWork &&
                                              indexExperience === 0
                                            } // Updated condition here
                                          >
                                            {validMonths.map((month) => (
                                              <option key={month} value={month}>
                                                {month}
                                              </option>
                                            ))}
                                          </select>
                                          <select
                                            className="block w-full text-[#495057] py-1 h-10 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                            name="endyears"
                                            id="endyears"
                                            style={{ paddingLeft: "7px" }}
                                            value={data.end_year}
                                            // Inside the onChange event handler for the end year select
                                            onChange={(e) => {
                                              const newData = [
                                                ...editformData.experience,
                                              ];
                                              newData[
                                                indexExperience
                                              ].end_year = e.target.value;
                                              setEditFormData(
                                                (prevFormData) => ({
                                                  ...prevFormData,
                                                  experience: newData,
                                                })
                                              );
                                              validateAndSetFieldFormData(
                                                `experience_${data.id}_end_date`,
                                                ""
                                              );
                                            }}
                                            disabled={
                                              checkedWork &&
                                              indexExperience === 0
                                            } // Updated condition here
                                          >
                                            <option value="">year</option>
                                            {cyears.map((year) => (
                                              <option key={year} value={year}>
                                                {year}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        {/* Validation */}
                                        {formDataErrors[
                                          `experience_${data.id}_end_date`
                                        ] && (
                                          <p
                                            className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                          >
                                            {
                                              formDataErrors[
                                                `experience_${data.id}_end_date`
                                              ]
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* ********************************Experience (end date)********************************** */}
                                    <div className="mb-4 col-span-6 xl:col-span-2 text-right xl:text-left custom-text">
                                      <div className="">
                                        <div className="mb-2.5">
                                          <label
                                            className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                          >
                                            Action
                                          </label>
                                        </div>
                                        <button
                                          className={`Education-Acsion ${inter400} ${
                                            indexExperience === 0
                                              ? "disabled"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            deleteExperienceField(data.id)
                                          }
                                          disabled={indexExperience === 0}
                                        >
                                          DEL
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    {/* "I currently work here" checkbox */}
                                    {indexExperience === 0 && (
                                      <div className="md:w-full ml-5">
                                        <div className="relative block mb-4">
                                          <input
                                            className="mr-3"
                                            type="checkbox"
                                            value={checkedWork}
                                            id="defaultCheck2"
                                            name="currentlywork"
                                            checked={checkedWork}
                                            onChange={(e) => {
                                              setcheckedWork(e.target.checked);
                                              const newData = [
                                                ...editformData.experience,
                                              ];
                                              newData[0].end_year = null;
                                              newData[0].end_month = null;
                                              setEditFormData(
                                                (prevFormData) => ({
                                                  ...prevFormData,
                                                  experience: newData,
                                                })
                                              );
                                            }}
                                          />
                                          <label
                                            className={`${inter500.className} text-base text-[#2D3748] tracking-wide`}
                                            htmlFor="defaultCheck2"
                                          >
                                            I currently work here
                                          </label>
                                          <div className="msgerror"></div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                            {/* Add Row Button */}
                            <div className="mx-4 mb-4">
                              <button
                                type="button"
                                className={`inline-block w-full md:w-auto align-middle text-center select-none border font-normal whitespace-no-wrap rounded-[6px] py-2 px-3 leading-normal no-underline bg-gray-600 text-white hover:bg-gray-700 bg-[#286CAC] hover:border-[#286CAC] hover:text-[#286CAC] hover:bg-white ${inter400.className}`}
                                onClick={addExperienceField}
                              >
                                Add More
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/****************** Experience field end**************************/}
                      {/* pr-[0%] md:pr-[4%] xl:pr-[6%] */}
                      {/* flex flex-wrap xl:flex-nowrap items-start justify-start gap-x-8 gap-y-1 mx-4 */}
                      {/* w-full md:w-auto md:min-w-1/5 grow */}
                      {/* w-full md:w-auto md:min-w-[15%] grow */}
                      {/******************* Professional Certificate field start *******************/}
                      {userData && userData.login_as === 2 && (
                        <div className="" id="showError5">
                          <label
                            className={`text-[#2D3748] text-base ${inter500.className} tracking-wide text-[#2D3748] ml-4`}
                          >
                            Professional Certificate (optional)
                          </label>
                          <div className="h-auto mt-2.5">
                            {editformData.certificate.map(
                              (data, indexProfessionalCertificate) => (
                                <div
                                  className="mx-4 flex-1 flex flex-col md:flex-row md:flex-wrap md:gap-x-4 lg:gap-x-4 xl:gap-x-8"
                                  key={data.id}
                                >
                                  {/* Certificate For */}
                                  <div className="flex-1 md:flex-wrap">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm  text-[#2D3748]  tracking-wide`}
                                      >
                                        Certificate For
                                      </label>
                                      <input
                                        type="text"
                                        name="certificatefor"
                                        className="block appearance-none text-[#495057] w-full h-10 py-1 px-2 mt-2.5 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                        value={data.certificate_for}
                                        onChange={(e) => {
                                          const newData = [
                                            ...editformData.certificate,
                                          ];
                                          newData[
                                            indexProfessionalCertificate
                                          ].certificate_for = e.target.value;
                                          setEditFormData((prevFormData) => ({
                                            ...prevFormData,
                                            certificate: newData,
                                          }));
                                          // Clear the error for this field
                                          validateAndSetFieldFormData(
                                            `certificate_${data.id}_certificate_for`,
                                            ""
                                          );
                                        }}
                                      />
                                      {formDataErrors[
                                        `certificate_${data.id}_certificate_for`
                                      ] && (
                                        <p
                                          className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                        >
                                          {
                                            formDataErrors[
                                              `certificate_${data.id}_certificate_for`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Certificate In */}
                                  <div className="flex-1 md:flex-wrap">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Certificate In
                                      </label>
                                      <input
                                        type="text"
                                        name="degree"
                                        className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mt-2.5 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                        value={data.certificate_in}
                                        onChange={(e) => {
                                          const newData = [
                                            ...editformData.certificate,
                                          ];
                                          newData[
                                            indexProfessionalCertificate
                                          ].certificate_in = e.target.value;
                                          setEditFormData((prevFormData) => ({
                                            ...prevFormData,
                                            certificate: newData,
                                          }));
                                          // Clear the error for this field
                                          validateAndSetFieldFormData(
                                            `certificate_${data.id}_certificate_in`,
                                            ""
                                          );
                                        }}
                                      />
                                      {formDataErrors[
                                        `certificate_${data.id}_certificate_in`
                                      ] && (
                                        <p
                                          className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                        >
                                          {
                                            formDataErrors[
                                              `certificate_${data.id}_certificate_in`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Start Date */}
                                  <div className="flex-1 md:flex-wrap">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Start Date
                                      </label>
                                      <input
                                        type="date"
                                        className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mt-2.5 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                        value={data.start_date}
                                        max={
                                          new Date().toISOString().split("T")[0]
                                        }
                                        onChange={(e) => {
                                          const newData = [
                                            ...editformData.certificate,
                                          ];
                                          newData[
                                            indexProfessionalCertificate
                                          ].start_date = e.target.value;
                                          setEditFormData((prevFormData) => ({
                                            ...prevFormData,
                                            certificate: newData,
                                          }));
                                          // Clear the error for this field
                                          validateAndSetFieldFormData(
                                            `certificate_${data.id}_start_date`,
                                            ""
                                          );
                                        }}
                                      />
                                      {formDataErrors[
                                        `certificate_${data.id}_start_date`
                                      ] && (
                                        <p
                                          className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                        >
                                          {
                                            formDataErrors[
                                              `certificate_${data.id}_start_date`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* End Date */}
                                  <div className="flex-1 md:flex-wrap">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        End Date
                                      </label>
                                      <input
                                        type="date"
                                        className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mt-2.5 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                        value={data.end_date}
                                        max={
                                          new Date().toISOString().split("T")[0]
                                        }
                                        min={data.start_date}
                                        onChange={(e) => {
                                          const newData = [
                                            ...editformData.certificate,
                                          ];
                                          newData[
                                            indexProfessionalCertificate
                                          ].end_date = e.target.value;
                                          setEditFormData((prevFormData) => ({
                                            ...prevFormData,
                                            certificate: newData,
                                          }));
                                          validateAndSetFieldFormData(
                                            `certificate_${data.id}_end_date`,
                                            ""
                                          );
                                        }}
                                      />

                                      {formDataErrors[
                                        `certificate_${data.id}_end_date`
                                      ] && (
                                        <p
                                          className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                        >
                                          {
                                            formDataErrors[
                                              `certificate_${data.id}_end_date`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}

                            {/* Add Row Button */}
                          </div>
                        </div>
                      )}
                      <br />
                      {/******************* Professional Certificate field end *******************/}
                      {/******************* Portfolio field start *******************/}
                      {userData && userData.login_as === 2 && (
                        <div className="">
                         
                           <Tooltip
                                  title="Upload your portfolio or share a link to your website or social media profile"
                                  placement="right"
                                  arrow
                                  componentsProps={tooltipClass}
                                >
                           <label
                            className={`text-[#2D3748] text-base ${inter500.className} tracking-wide text-[#2D3748] ml-4 mb-2.5`}
                          >  Portfolio
                            {/* <span className="text-red pl-1">*</span> */}
                          </label>
                          <span className="text-red pl-1">*</span></Tooltip>
                          <div className="h-auto w-auto">
                            {editformData.portfolio?.map(
                              (data, indexPortfolio) => (
                                <div
                                  className="mx-4 flex flex-col gap-1 md:grid grid-cols-6 xl:grid-cols-12 md:gap-x-4 lg:gap-x-2 xl:gap-x-8"
                                  key={data.id}
                                >
                                  {/* Portfolio Title */}
                                  <div className="col-span-3">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Title
                                      </label>
                                      <input
                                        type="text"
                                        className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mt-2.5 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                        value={data.portfoliotitle}
                                        onChange={(e) => {
                                          const newData = [
                                            ...editformData.portfolio,
                                          ];
                                          newData[
                                            indexPortfolio
                                          ].portfoliotitle = e.target.value;
                                          setEditFormData((prevFormData) => ({
                                            ...prevFormData,
                                            portfolio: newData,
                                          }));
                                          validateAndSetFieldFormData(
                                            `portfolio_${data.id}_portfoliotitle`,
                                            ""
                                          );
                                        }}
                                      />
                                      {formDataErrors[
                                        `portfolio_${data.id}_portfoliotitle`
                                      ] && (
                                        <p
                                          className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                        >
                                          {
                                            formDataErrors[
                                              `portfolio_${data.id}_portfoliotitle`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Portfolio Image */}
                                  <div className="col-span-3">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Portfolio File
                                      </label>
                                      <div className="">
                                        <input
                                          type="file"
                                          className="block text-[#495057] appearance-none w-full h-10 py-1.5 px-2 mt-2.5 text-sm leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                          id="files"
                                          accept=".pdf, .docx"
                                          onChange={(e) =>
                                            handlePortfolioUpload(
                                              e,
                                              indexPortfolio,
                                              data.id
                                            )
                                          }
                                        />

                                        {indexPortfolio === 0 ? (
                                          <p
                                            className={`text-sm text-[#6c757d] ${inter500.className}`}
                                          >
                                            You Can Upload pdf/word/image up to
                                            1 Mb File
                                          </p>
                                        ) : null}
                                        {formDataErrors[
                                          `portfolio_${data.id}_portfolioimg`
                                        ] && (
                                          <p
                                            className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                          >
                                            {
                                              formDataErrors[
                                                `portfolio_${data.id}_portfolioimg`
                                              ]
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Download Link */}
                                  <div className="col-span-2">
                                    <div className="mb-4">
                                      {indexPortfolio === 0 ? (
                                        <>
                                          <label
                                            className={`${inter500.className} text-sm text-[#2D3748] tracking-wide mr-[10px]`}
                                          >
                                            Download
                                          </label>
                                          <a
                                            className="downloaedmenu"
                                            onClick={() => {
                                              handleDownload();
                                            }}
                                          >
                                            Download
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                  </div>

                                  {/* Portfolio Link */}
                                  <div className="col-span-2">
                                    <div className="mb-4">
                                      <label
                                        className={`${inter500.className} text-sm text-[#2D3748] tracking-wide`}
                                      >
                                        Portfolio Link
                                      </label>

                                      <input
                                        type="text"
                                        className="block text-[#495057] appearance-none w-full h-10 py-1 px-2 mt-2.5 text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded"
                                        value={data.portfoliolink}
                                        name="PortfolioLink"
                                        autoComplete="false"
                                        onChange={(e) => {
                                          const newData = [
                                            ...editformData.portfolio,
                                          ];
                                          newData[
                                            indexPortfolio
                                          ].portfoliolink = e.target.value;
                                          setEditFormData((prevFormData) => ({
                                            ...prevFormData,
                                            portfolio: newData,
                                          }));
                                          validateAndSetFieldFormData(
                                            `portfolio_${data.id}_PortfolioLink`,
                                            ""
                                          );
                                        }}
                                      />
                                      {formDataErrors[
                                        `portfolio_${data.id}_portfoliolink`
                                      ] && (
                                        <p
                                          className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                        >
                                          {/* {
                                            formDataErrors.portfoliolink
                                          } */}
                                          {
                                            formDataErrors[
                                              `portfolio_${data.id}_portfoliolink`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {/* Action (Delete) */}
                                  <div className="mb-4 col-span-2 text-right xl:text-left custom-text">
                                    <div className="">
                                      <div className="mb-2.5">
                                        <label className="control-label">
                                          Action
                                        </label>
                                      </div>
                                      <button
                                        className={`Education-Acsion ${
                                          indexPortfolio === 0 ? "disabled" : ""
                                        }`}
                                        onClick={() =>
                                          deletePortfolioField(data.id)
                                        }
                                        disabled={indexPortfolio === 0}
                                      >
                                        DEL
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}

                            {/* Add Row Button */}
                            <div className="mx-4 mb-4">
                              <button
                                type="button"
                                className={`inline-block w-full md:w-auto align-middle text-center select-none border font-normal whitespace-no-wrap rounded-[6px] py-2 px-3 leading-normal no-underline bg-gray-600 text-white hover:bg-gray-700 bg-[#286CAC] hover:border-[#286CAC] hover:text-[#286CAC] hover:bg-white ${inter400.className}`}
                                onClick={addPortfolioField}
                              >
                                Add More
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/******************* Portfolio field end *******************/}
                      <button
                        className={`bg-[#e9f1ff] rounded-md text-center text-sm text-[#484848] md:ml-[16px] mx-4 md:mx-0 mt-4 md:w-fit p-[10px] py-3 px-8 hover:bg-[#1068AD] hover:text-[#fff]`}
                        onClick={handleSubmit}
                        disabled={isSubmitting} // Disable button when submitting
                      >
                        {isSubmitting ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
                {/* {!userData?.google_id &&
                !userData?.linkedin_id &&
                !userData?.facebook_id && (
                  <>
                    <h1
                      className={`${mulish600.className} text-[20px] md:text-[29px] text-[#000] my-[16px]`}
                    >
                      Change Password
                    </h1>
                    <div className="box-content">
                      <form autoComplete="off" method="post" action="">
                        <div>
                          <div className="rowlinecontent flex items-center gap-2">
                            <div className="sm:w-full pr-4 pl-4 px-1">
                              <div className="mb-4">
                                <label
                                  className={`${inter500.className} text-base text-[#2D3748]`}
                                >
                                  Current Password
                                </label>
                                <div className="relative">
                                  <input
                                    maxLength="100"
                                    type={
                                      showCurrentPassword ? "text" : "password"
                                    }
                                    className="block appearance-none w-full py-1 px-2 mb-1 mt-[10px] text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded " // Corrected class attribute
                                    value={
                                      changePasswordFormData.current_password
                                    } // Corrected key in formData
                                    onChange={(e) =>
                                      validateAndSetField(
                                        "current_password",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span
                                    onClick={toggleCurrentPasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                                  >
                                    {showCurrentPassword
                                      ? showPassIcon
                                      : hidePassIcon}
                                  </span>
                                </div>
                                {changePasswordErrors.current_password && (
                                  <span
                                    className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  >
                                    {changePasswordErrors.current_password}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="rowlinecontent">
                            <div className="sm:w-full pr-4 pl-4 px-1">
                              <div className="mb-4">
                                <label
                                  className={`${inter500.className} text-base text-[#2D3748]`}
                                >
                                  New Password
                                </label>
                                <div className="relative">
                                  <input
                                    maxLength="100"
                                    type={showNewPassword ? "text" : "password"}
                                    className="block appearance-none w-full py-1 px-2 mb-1 mt-[10px] text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded" // Corrected class attribute
                                    value={changePasswordFormData.new_password} // Corrected key in formData
                                    onChange={(e) =>
                                      validateAndSetField(
                                        "new_password",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span
                                    onClick={toggleNewPasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                                  >
                                    {showNewPassword
                                      ? showPassIcon
                                      : hidePassIcon}
                                  </span>
                                </div>
                                {changePasswordErrors.new_password && (
                                  <span
                                    className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  >
                                    {changePasswordErrors.new_password}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="rowlinecontent flex items-center gap-2">
                            <div className="sm:w-full pr-4 pl-4 px-1">
                              <div className="mb-4">
                                <label
                                  className={`${inter500.className} text-base text-[#2D3748]`}
                                >
                                  Confirm Password
                                </label>
                                <div className="relative">
                                  <input
                                    maxLength="100"
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    className="block appearance-none w-full py-1 px-2 mb-1 mt-[10px] text-base leading-normal bg-white text-gray-800 border border-[#dee2e6] rounded" // Corrected class attribute
                                    value={
                                      changePasswordFormData.confirm_password
                                    }
                                    onChange={(e) =>
                                      validateAndSetField(
                                        "confirm_password",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer inline-flex items-center px-3 text-sm text-gray rounded-s-md border-grey"
                                  >
                                    {showConfirmPassword
                                      ? showPassIcon
                                      : hidePassIcon}
                                  </span>
                                </div>
                                {changePasswordErrors.confirm_password && (
                                  <span
                                    className={`${inter500.className} text-[15px] text-[#FF0000]`}
                                  >
                                    {changePasswordErrors.confirm_password}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={handleChangePassword}
                            className={`bg-[#e9f1ff] ${inter600.className} text-center text-sm text-[#484848] md:ml-[16px] mx-4 md:mx-0 md:w-fit p-[10px] py-4 hover:bg-[#1068AD] hover:text-[#fff]`}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )} */}
              </div>
            </div>
            {successMessPopUp && (
              <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
                  <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                    <div
                      className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                      onClick={() => handleErrorMessPopUp()}
                    >
                      {cancelIcon}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full p-5 border-b border-[#eee]">
                      {isSuccessGIF === "success" && (
                        <Image
                          src={successGIF}
                          alt="success"
                          width={80}
                          height={80}
                          className="mix-blend-multiply bg-transparent"
                        />
                      )}
                      {isSuccessGIF === "fail" && (
                        <Image
                          src={cancelGIF}
                          alt="fail"
                          width={80}
                          height={80}
                          className="mix-blend-multiply bg-transparent"
                        />
                      )}
                      <h1
                        className={`${inter600.className} text-center text-base text-[#000000]  `}
                      >
                        {profileUpdateMess}
                      </h1>
                    </div>

                    <div className="flex justify-end gap-5 items-center p-5">
                      <button
                        className={`bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                        onClick={() => handleSuccessMessPopUp()}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
                {successMessPopUp && (
                  <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                    <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
                      <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                        <div
                          className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                          onClick={() => handleErrorMessPopUp()}
                        >
                          {cancelIcon}
                        </div>
                        <div className="flex flex-col items-center justify-center w-full p-5 border-b border-[#eee]">
                          {isSuccessGIF === "success" && (
                            <Image
                              src={successGIF}
                              alt="success"
                              width={80}
                              height={80}
                              className="mix-blend-multiply bg-transparent"
                            />
                          )}
                          {isSuccessGIF === "fail" && (
                            <Image
                              src={cancelGIF}
                              alt="fail"
                              width={80}
                              height={80}
                              className="mix-blend-multiply bg-transparent"
                            />
                          )}
                          <h1
                            className={`${inter600.className} text-center text-base text-[#000000]  `}
                          >
                            {profileUpdateMess}
                          </h1>
                        </div>

                        <div className="flex justify-center gap-5 items-center p-5">
                          <button
                            className={`bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                            onClick={() => handleSuccessMessPopUp()}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {errorMessPopUp && (
                  <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                    <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
                      <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                        <div
                          className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                          onClick={() => handleErrorMessPopUp()}
                        >
                          {cancelIcon}
                        </div>
                        <div className="flex flex-col items-center justify-center w-full p-5 border-b border-[#eee]">
                          {isSuccessGIF === "fail" && (
                            <Image
                              src={cancelGIF}
                              alt="fail"
                              width={80}
                              height={80}
                              className="mix-blend-multiply bg-transparent"
                            />
                          )}
                          <h1
                            className={`${inter600.className} text-center text-base text-[#000000]  `}
                          >
                            {profileUpdateMess}
                          </h1>
                        </div>

                        <div className="flex justify-center gap-5 items-center p-5">
                          <button
                            className={`bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                            onClick={() => handleErrorMessPopUp()}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {errorMessPopUp && (
              <div className="fixed top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
                <div className="flex justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[100%] px-3">
                  <div className="bg-white min-w-[40%] rounded-[20px] relative slideInFromTop ">
                    <div
                      className="absolute -right-2 bg-[#1068AD] p-1 -top-2 text-white rounded-full cursor-pointer"
                      onClick={() => handleErrorMessPopUp()}
                    >
                      {cancelIcon}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full p-5 border-b border-[#eee]">
                      {isSuccessGIF === "fail" && (
                        <Image
                          src={cancelGIF}
                          alt="fail"
                          width={80}
                          height={80}
                          className="mix-blend-multiply bg-transparent"
                        />
                      )}
                      <h1
                        className={`${inter600.className} text-center text-base text-[#000000]  `}
                      >
                        {profileUpdateMess}
                      </h1>
                    </div>

                    <div className="flex justify-end gap-5 items-center p-5">
                      <button
                        className={`bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                        onClick={() => handleErrorMessPopUp()}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <PromptModal
          isOpen={promptModelOpen}
          promptVal={promptVal}
          setPromptVal={setPromptVal}
          promptError={promptError}
          handleSubmit={handleAiTextGeneration}
          closePromptModal={closePromptModal}
          generating={generating}
          placeholderText={placeholderText}
        />
        </ThemeProvider>
      </>
    </ErrorBoundary>
  );
};

const MyCustomIcon = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.90268 7.16895C8.79941 8.00541 7.75547 8.91736 6.77838 9.89826C2.17447 14.5022 -0.156617 19.6322 1.56904 21.3595C3.29469 23.0851 8.42633 20.7524 13.0286 16.1501C14.0096 15.1725 14.9215 14.128 15.7579 13.0242"
      stroke="#FFB703"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.7583 13.0233C18.473 16.6268 19.5787 20.0166 18.2383 21.357C16.511 23.0842 11.381 20.7515 6.77713 16.1493C2.17646 11.5437 -0.154627 6.41533 1.57103 4.68806C2.9114 3.3493 6.3012 4.45495 9.90467 7.16808"
      stroke="#FFB703"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.09375 13.0239C9.09375 13.2386 9.17903 13.4445 9.33082 13.5963C9.48261 13.7481 9.68849 13.8333 9.90316 13.8333C10.1178 13.8333 10.3237 13.7481 10.4755 13.5963C10.6273 13.4445 10.7126 13.2386 10.7126 13.0239C10.7126 12.8093 10.6273 12.6034 10.4755 12.4516C10.3237 12.2998 10.1178 12.2145 9.90316 12.2145C9.68849 12.2145 9.48261 12.2998 9.33082 12.4516C9.17903 12.6034 9.09375 12.8093 9.09375 13.0239ZM13.157 5.97563C12.647 5.88659 12.647 5.15651 13.157 5.06909C14.0578 4.91304 14.8917 4.49193 15.5521 3.85956C16.2124 3.2272 16.6692 2.41231 16.864 1.51904L16.8932 1.3782C17.0033 0.876369 17.7188 0.873132 17.8321 1.37334L17.871 1.53684C18.0741 2.4257 18.5353 3.23477 19.1965 3.86258C19.8577 4.49039 20.6896 4.90898 21.5877 5.06586C22.0993 5.15489 22.0993 5.88983 21.5877 5.97725C20.6896 6.13413 19.8577 6.55272 19.1965 7.18053C18.5353 7.80834 18.0741 8.6174 17.871 9.50626L17.8321 9.66976C17.7188 10.1716 17.0033 10.1684 16.8932 9.66652L16.8608 9.52568C16.6659 8.63241 16.2091 7.81752 15.5488 7.18516C14.8885 6.5528 14.0546 6.13168 13.1537 5.97563H13.157Z"
      stroke="#FFB703"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Editprofileform;
