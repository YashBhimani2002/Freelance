"use client";

import React, { useEffect, useState } from "react";
import {
  ProjectTitle,
  generateText,
  getCategories,
  getSkills,
  job_post_form_add,
  viewProfile,
} from "../api/api";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { UploadFile } from "@mui/icons-material";
import { Inter, Mulish } from "next/font/google";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import PromptModal from "../aigeneratermodel/page.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faRobot } from "@fortawesome/free-solid-svg-icons";
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

function Calendar() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skilles, setSkiles] = useState([]);
  const [budgetType, setBudgetType] = useState("Fixed");
  const [location, setLocation] = useState("remote");
  const [file, setUploadFiles] = useState();
  const [uploadedFile, setUploadedFile] = useState([]);
  const [status, setStatus] = useState(1);
  const [descjob, setDescjob] = useState("");
  const [selectcategories, setSelectCategories] = useState();
  const [exp, setExp] = useState("fresher");
  const [locationdetalils, setLocationdetalils] = useState("");
  const [Nvalue, setNvalue] = useState();
  const [Minvalue, setMinvalue] = useState();
  const [Maxvalue, setMaxvalue] = useState();
  const [titlejob, settitlejob] = useState("");
  const [titlejob1, settitlejob1] = useState("");
  const [titlejob2, settitlejob2] = useState("");
  const [titlejob3, settitlejob3] = useState("");
  const [editeData, setEditeData] = useState([]);
  const [editeSkilles, setEditeSkiles] = useState([]);
  const fullUrl = window.location.href;
  const idMatch = fullUrl.match(/(?:edit|reuse)=([^&]+)/);
  const jobid = idMatch ? idMatch[1] : null;
  const statusMatch = fullUrl.match(/\?(.*?)=/);
  const jobstatus = statusMatch ? statusMatch[1] : null;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [titlejobError, setTitlejobError] = useState("");
  const [descjobError, setDescjobError] = useState("");
  const [selectcategoriesError, setSelectCategoriesError] = useState("");
  const [NvalueError, setNvalueError] = useState("");
  const [MinvalueError, setMinvalueError] = useState("");
  const [MaxvalueError, setMaxvalueError] = useState("");
  const [uploadFileError, setUploadFileError] = useState("");
  const [error, setError] = useState("");
  const [postBtn, setPostBtn] = useState("Post Now");
  const [draftBtn, setDraftBtn] = useState("Save As Draft");
  const [validationPopup, setValidationPopup] = useState(false);
  const [EditeDroupDownSelectedId, setEditeDroupDownSelectedId] = useState("");
  const [resuseDroupDownSelectedId, setResuseDroupDownSelectedId] =
    useState("");
  const [promptModelOpen, setPromptModelOpen] = useState(false);
  // const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [promptKey, setPromptKey] = useState(null);
  const [promptVal, setPromptVal] = useState('');
  const [promptError, setPromptError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');

  const storedUserData = localStorage.getItem("user-data");
  const [filelist, setFileList] = useState([]);
  let userData = null;
  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  } else {
    // Handle case where no data is stored or it's invalid
    console.error("No user data found in localStorage.");
  }

  const handleValidationUser = () => {
    window.location.href = "/profile/editprofile";
  };

  useEffect(() => {
    if (jobid) {
      get_job();
    }
  }, [jobid]);

  const get_job = async () => {
    try {
      const { data } = await axios.post(
        `${url}/job_post`,
        {
          jobid: jobid,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        const transformedData = data.getskill2.map((skill) => ({
          value: skill._id,
          label: skill.name,
        }));
        setUploadedFile(data?.file?.file_name);
        settitlejob(data?.job?.job_title);
        settitlejob1(data?.job?._id);
        setDescjob(data?.job?.job_description);
        setSelectCategories(data?.job?.job_type);
        setSelectedSkills(transformedData);
        setExp(data?.job?.experience_level);
        setLocation(data?.job?.job_place);
        setLocationdetalils(data?.job?.location);
        setBudgetType(data?.job?.budget_type);
        setMinvalue(data?.job?.budget_from);
        setMaxvalue(data?.job?.budget_to);
        setNvalue(data?.job?.budget_from);
        if (jobstatus === "edit") {
          setStatus(4);
        } else if (jobstatus === "reuse") {
          setStatus(3);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getcategories = async () => {
    await getCategories().then((res) => {
      if (res) {
        if (res.status == 200) {
          setCategories(res.data);
        }
      }
    });
  };

  const getskills = async () => {
    await getSkills().then((res) => {
      if (res) {
        if (res?.status == 200) {
          setSkiles(res.data);
        }
      }
    });
  };

  const getEditeJobData = async () => {
    await ProjectTitle().then((res) => {
      if (res?.status == 200) {
        if (res?.data?.data?.length > 0) {
          setEditeData(res?.data?.data);
          setEditeSkiles(res?.data?.skillIdArray);
          setFileList(res?.data?.fileNameList);
        }
      }
    });
  };
  useEffect(() => {
    getEditeJobData();
    getcategories();
    getskills();
  }, []);
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudgetType(e.target.value);
  };

  const handleSkillChange = (newValue, actionMeta) => {
    setSelectedSkills(newValue);
    setError("");
  };

  const handleValidation = () => {
    let isValid = true;
    if (!titlejob.trim()) {
      setTitlejobError("Title is required");
      isValid = false;
    } else {
      setTitlejobError("");
    }

    if (!descjob.trim()) {
      setDescjobError("Description is required");
      isValid = false;
    } else {
      setDescjobError("");
    }

    if (!selectcategories) {
      setSelectCategoriesError("Category is required");
      isValid = false;
    } else {
      setSelectCategoriesError("");
    }

    if (selectedSkills.length === 0) {
      setError("Please select at least one skill.");
      return;
    }

    if (budgetType === "Fixed") {
      if (!Nvalue) {
        setNvalueError("This field is required.");
        isValid = false;
      } else {
        setNvalueError("");
      }
    } else {
      if (!Minvalue) {
        setMinvalueError("This field is required.");
        isValid = false;
      } else {
        setMinvalueError("");
      }

      if (!Maxvalue) {
        setMaxvalueError("This field is required.");
        isValid = false;
      } else {
        setMaxvalueError("");
      }

      if (Minvalue && Maxvalue && parseInt(Minvalue) > parseInt(Maxvalue)) {
        setMinvalueError("Minimum value cannot be greater than maximum value.");
        isValid = false;
      } else {
        setMinvalueError(" ");
      }
    }

    return isValid;
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["docx", "doc", "pdf"];
    const fileExtension = selectedFile?.name?.split(".").pop().toLowerCase();
    const maxFileSize = 1024 * 1024;

    if (!allowedExtensions.includes(fileExtension)) {
      setUploadFiles(null);
      setUploadFileError("Valid file docx|doc|pdf");
    } else if (selectedFile.size > maxFileSize) {
      setUploadFiles(null);
      setUploadFileError("File size exceeds 1MB limit");
    } else {
      setUploadFiles(selectedFile);
      setUploadFileError("");
    }
  };
  const handlesubmit = async (submitType) => {
    if (!handleValidation() || uploadFileError) {
      return;
    }
    if (submitType !== "Post Now" && submitType !== "Save As Draft") {
      return;
    }
    if (submitType === "Post Now") {
      setPostBtn("Posting...");
    } else if (submitType === "Save As Draft") {
      setDraftBtn("Saving...");
    }

    const formData = new FormData();
    formData.append("file", file);
    if (budgetType == "Fixed") {
      formData.append("sel_budg", 1);
      formData.append("tbudget", Nvalue);
    } else {
      formData.append("sel_budg", 2);
      formData.append("tbudget1", Minvalue);
      formData.append("tbudget2", Maxvalue);
    }
    formData.append("jobplace", location);
    formData.append("exp", exp);
    formData.append("descjob", descjob);
    formData.append("catjob", selectcategories);
    const value = [];
    selectedSkills?.map((item) => {
      value.push(item.value);
    });
    formData.append("skillstag", value);
    formData.append("location", locationdetalils);
    formData.append("titlejob", titlejob);
    formData.append("budget", budgetType);
    formData.append("titlejob3", titlejob3);
    formData.append("titlejob2", titlejob2);
    formData.append("titlejob1", titlejob1);
    formData.append("post", " Post Now");
    if (submitType === "Post Now") {
      formData.append("type", "active");
    } else if (submitType === "Save As Draft") {
      formData.append("type", "draft");
    }
    if (jobstatus === "reuse" || status === 3) {
      formData.append("statusjob", 1);
    } else if (jobstatus === "edit" || status === 4) {
      formData.append("statusjob", 0);
    } else formData.append("statusjob", status);

    await job_post_form_add(formData).then((res) => {
      if (res) {
        if (res?.status == 200) {
          const action = submitType === "Post Now" ? "posted" : "saved";
          sessionStorage.setItem("jobAction", action);
          window.location.href = "/projects";
        }
      } else {
        setPostBtn("Post Now");
        setDraftBtn("Save As Draft");
      }
    });
  };
  const handleediteData = (projectId, selecteType) => {
    if (selecteType == "edit") {
      setEditeDroupDownSelectedId(projectId);
      const selectedfilename = filelist.find(
        (item) => item.job_id === projectId
      );
      setUploadedFile(selectedfilename?.file_name);
    } else {
      setResuseDroupDownSelectedId(projectId);
    }
    const selectedProject = editeData.find((item) => item._id === projectId);

    if (selectedProject) {
      setDescjob(selectedProject.job_description);
      const skillarray = [];
      skilles.forEach((data) => {
        editeSkilles.forEach((item) => {
          if (
            selectedProject._id === item.job_id &&
            data._id === item.skill_id
          ) {
            skillarray.push({ label: data.name, value: data._id });
          }
        });
      });
      setSelectedSkills(skillarray);
      setBudgetType(selectedProject.budget_type);
      setLocation(selectedProject.job_place);
      setSelectCategories(selectedProject.job_type);
      setExp(selectedProject.experience_level);
      settitlejob(selectedProject.job_title);
      setLocationdetalils(selectedProject.location);
      setNvalue(selectedProject.budget_from.toString().replace(/,/g, ""));
      setMinvalue(selectedProject.budget_from.toString().replace(/,/g, ""));
      setMaxvalue(selectedProject.budget_to.toString().replace(/,/g, ""));
      settitlejob1(selectedProject._id);

      if (selectedProject.budget_from === selectedProject.budget_to) {
        setBudgetType("Fixed");
      } else {
        setBudgetType("range");
      }
    }
  };
  const reset = () => {
    setStatus(1);
    setDescjob("");
    setSelectedSkills([]);
    setBudgetType("Fixed");
    setLocation("remote");
    setSelectCategories("");
    setExp("fresher");
    setLocationdetalils("");
    setNvalue("");
    setMinvalue("");
    setMaxvalue("");
    settitlejob("");
    settitlejob1("");
    setUploadedFile([]);
  };

  const styleElement = document.createElement("style");
  styleElement.textContent = `
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;
  document.head.appendChild(styleElement);

  function formatNumber(value) {
    if (value == null) {
      return ""; // Return an empty string if value is null or undefined
    }
    const stringValue = String(value); // Convert value to a string
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
  const cleanResponse = (responseText) => {
    // Remove any markdown-like headers (e.g., ## or **)
    let cleanedText = responseText.replace(/##|[*]/g, '');

    // Remove any extraneous spaces
    cleanedText = cleanedText.trim();

    // If the response starts with a colon, remove it
    cleanedText = cleanedText.replace(/^:\s*/, '');

    return cleanedText;
  };
  const handleAiTextGeneration = async () => {
    if (!promptVal.trim()) {
      setPromptError('Please enter a prompt');
      return;
    }
    setPromptError('');

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
            if (promptKey == 'title') {
              settitlejob(cleanedText)
            }
            else {
              setDescjob(cleanedText)
            }
          }
        }
        setPromptKey(null);
        setPromptVal('');
        setPromptError('');
        setPromptModelOpen(false);
      } else {
        setGenerating(false);
        setPromptVal('');
        setPromptError(response?.data.error);
      }
    } catch (error) {
      setGenerating(false);
      console.error('Error generating AI text:', error);
      setPromptError('Error generating AI text. Please try again later!');
    }
  };
  const closePromptModal = () => {
    setPromptModelOpen(false);
    setPromptKey(null);
    setPromptVal('');
    setPromptError('');
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className=" max-w-screen-2xl p-2 lg:px-12 lg:py-6">
          <h3
            className={`${mulish600.className}  text-[29px] mb-[18px] text-[#000000] tracking-wide`}
          >
            <Tooltip
              title="Post a Project"
              placement="right"
              arrow
              componentsProps={tooltipClass}
            >
              Post a Project
            </Tooltip>

          </h3>
          <div className="">
            <h6
              className={`${inter500.className} text-base mb-[10px] text-[#2D3748] tracking-wide`}
            >
              Get Started
            </h6>

            {/* Form  */}

            <form autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <div className="form-check flex gap-2 mb-1">
                    <input
                      type="radio"
                      name="radio1"
                      id="newjob"
                      value="newjob"
                      onChange={() => reset()}
                      disabled={jobstatus === "edit" || jobstatus === "reuse"}
                      checked={status === 1}
                      className={`${jobstatus === "edit" || jobstatus === "reuse"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                        } `}
                    />
                    <label
                      className={`${inter400.className} text-radiolabel text-[14px] tracking-wide`}
                      htmlFor="newjob"
                    >
                      Create a new project
                    </label>
                  </div>

                  <div className="form-check flex gap-2 mb-1">
                    <input
                      type="radio"
                      name="radio1"
                      id="draftjob"
                      value="draftjob"
                      onChange={() => {
                        if (EditeDroupDownSelectedId) {
                          handleediteData(EditeDroupDownSelectedId, "edit");
                        } else {
                          reset();
                        }
                        setStatus(0);
                      }}
                      disabled={jobstatus === "edit" || jobstatus === "reuse"}
                      checked={status === 0}
                      className={`${jobstatus === "edit" || jobstatus === "reuse"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                        }`}
                    />
                    <label
                      className={`${inter400.className} text-radiolabel text-[14px] tracking-wide`}
                      htmlFor="draftjob"
                    >
                      Edit a draft
                    </label>
                  </div>

                  <div className="form-check flex gap-2">
                    <input
                      type="radio"
                      name="radio1"
                      id="reusejob"
                      value="3"
                      onChange={() => {
                        if (resuseDroupDownSelectedId) {
                          handleediteData(resuseDroupDownSelectedId, "resuse");
                        } else {
                          reset();
                        }
                        setStatus(3);
                      }}
                      disabled={jobstatus === "edit"}
                      checked={status === 3}
                      className={`${jobstatus === "edit"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                        }`}
                    />
                    <label
                      className={`${inter400.className} text-radiolabel text-[14px] tracking-wide`}
                      htmlFor="reusejob"
                    >
                      Reuse an existing post
                    </label>
                  </div>
                  {jobstatus === "edit" && (
                    <div className="form-check flex gap-2">
                      <input
                        type="radio"
                        name="radio1"
                        id="editjob"
                        value="4"
                        checked
                        onChange={() => setStatus(4)}
                      />
                      <label
                        className="font-inter text-radiolabel text-[14px] font-normal"
                        htmlFor="editjob"
                      >
                        Edit job post
                      </label>
                    </div>
                  )}
                </div>

                <div className="col-span-full label-post">
                  <div className="flex flex-1 w-full">
                    <label
                      className={`${inter500.className} text-base text-[#2D3748] tracking-wide flex-1`}
                      htmlFor="titlejob1"
                    >
                      Title for new project
                      <span className="text-danger">*</span>

                    </label>
                    <a
                      className="flex gap-2 items-end justify-end"
                      onClick={() => {
                        setPromptKey('title');
                        setPlaceholderText('Ex: Write a title');
                        setPromptModelOpen(true);
                      }}
                    >
                      <MyCustomIcon width={20} height={20}/>
                      <p className={`text-[13px] text-[#ffb705] ${inter500.className}`}>
                        Write with AI
                      </p>
                    </a>
                  </div>
                  {status === 1 || status === 4 ? (
                    <input
                      className="ttl-projinput mt-2 h-10 border border-inputbordercolor bg-white px-4 w-full"
                      type="text"
                      value={titlejob}
                      onChange={(e) => {
                        settitlejob(e.target.value);
                      }}
                    />
                  ) : jobstatus === "reuse" && status === 3 ? (
                    <input
                      className="ttl-projinput mt-2 h-10 border border-inputbordercolor bg-white px-4 w-full"
                      type="text"
                      value={titlejob}
                      onChange={(e) => {
                        settitlejob(e.target.value);
                      }}
                    />
                  ) : status === 0 ? (
                    <select
                      className="ttl-projinput mt-2 h-10 border border-inputbordercolor bg-white px-4 w-full"
                      value={EditeDroupDownSelectedId}
                      onChange={(e) => handleediteData(e.target.value, "edit")}
                    >
                      <option value="" selected disabled>
                        Select job title
                      </option>
                      {editeData
                        .filter((item) => item.type === "draft")
                        .map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.job_title}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <select
                      className="ttl-projinput mt-2 h-10 border border-inputbordercolor bg-white px-4 w-full"
                      value={resuseDroupDownSelectedId}
                      onChange={(e) => handleediteData(e.target.value, "resuse")}
                    >
                      <option value="" selected disabled>
                        Select job title
                      </option>
                      {editeData
                        .filter((item) => item.type !== "draft")
                        .map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.job_title}
                          </option>
                        ))}
                    </select>
                  )}
                  {!titlejob && titlejobError && (
                    <p className="text-danger text-sm mt-1">{titlejobError}</p>
                  )}
                  <br />
                  <small
                    className={`${inter400.className} inline-block mb-[20px] mt-[0.25rem] text-[14px] text-[#6c757d] tracking-wide`}
                  >
                    This helps your project stand out to the right candidates.
                    It’s the first thing they’ll see, so make it count!
                  </small>
                </div>

                <div className="col-span-full label-post mt-1">
                  <div className="flex flex-1 w-full">

                    <label
                      className={`${inter500.className} text-base text-[#2D3748] tracking-wide flex-1`}
                      htmlFor="titlejob2"
                    >
                      Describe your project
                      <span className="text-danger">*</span>
                    </label>
                    <a
                      className="flex gap-1 items-end"
                      // onClick={handleAiPromptVisible}
                      onClick={() => {
                        setPromptModelOpen(true);
                        setPromptKey('projectDescribe');
                        setPlaceholderText('Ex: Write a description');
                      }}
                    >
                      <MyCustomIcon width={20} height={20}/>
                      <p className={`text-[13px] text-[#ffb705] ${inter500.className}`}>
                        Write with AI
                      </p>
                    </a>
                  </div>
                  <textarea
                    className="w-full border border-inputbordercolor mt-2 bg-white p-[8px] text-sm text-black rounded"
                    id="titlejob2"
                    name="titlejob2"
                    value={descjob}
                    onChange={(e) => {
                      setDescjob(e.target.value);
                    }}
                  ></textarea>
                  {/* {errorMessages.description && (
                  <small className="inline-block font-inter font-normal text-red mt-[0.25rem] text-sm">
                    {errorMessages.description}
                  </small>
                )} */}
                  {!descjob && descjobError && (
                    <p className="text-danger text-sm mt-1">{descjobError}</p>
                  )}
                  <br />
                  <small
                    className={`${inter400.className}  inline-block  mb-[20px] mt-[0.25rem] text-[14px] text-[#6c757d] tracking-wide`}
                  >
                    Include your expectations about the task or deliverable, what
                    you’re looking for in a work relationship, and anything unique
                    about your project, team, or company.
                  </small>
                </div>

                <div className="col-span-full label-post mt-1">
                  <label
                    className={`${inter500.className} text-base text-[#2D3748] tracking-wide `}
                    htmlFor="titlejob3"
                  >
                    Attach Files
                  </label>
                  <input
                    type="file"
                    className={`${inter400.className} text-sm text-gray tracking-wide w-full border border-inputbordercolor mt-2 bg-white p-[8px] `}
                    id="titlejob3"
                    name="titlejob3"
                    onChange={handleFileChange}
                  />
                  {uploadFileError && (
                    <p className="text-danger text-sm mt-1">{uploadFileError}</p>
                  )}
                  <small
                    className={`${inter400.className} inline-block  mb-[20px] mt-[0.25rem] text-sm text-[#718096] tracking-wide`}
                  >
                    Note: Upload upto 1 Mb files (Allowed files only docx,doc or
                    pdf)
                  </small>
                  {status != 3 && (
                    <p
                      className={`${inter500.className} text-[16px] text-[#adadad]`}
                    >
                      {uploadedFile ? uploadedFile : ""}
                    </p>
                  )}
                </div>

                <div className="col-span-full label-post mt-1">
                  <label
                    className={`${inter500.className} text-base text-[#2D3748] tracking-wide `}
                    htmlFor="titlejob4"
                  >
                    Project Category
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="w-full border border-inputbordercolor mt-2 bg-white p-[8px] text-sm text-black"
                    id="titlejob4"
                    name="titlejob4"
                    onChange={(e) => setSelectCategories(e.target.value)}
                    value={selectcategories}
                  >
                    <option value="">Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {!selectcategories && selectcategoriesError && (
                    <p className="text-danger text-sm mt-1">
                      {selectcategoriesError}
                    </p>
                  )}
                  <small
                    className={`${inter400.className} inline-block  mb-[20px] mt-[0.25rem] text-sm text-[#718096] tracking-wide`}
                  >
                    This helps us match your job to candidates with the right
                    skills.
                  </small>
                </div>

                <div className="col-span-full label-post mt-1">
                  <label
                    className={`${inter500.className} inline-block text-base text-[#2D3748] tracking-wide mb-2`}
                    htmlFor="titlejob7"
                  >
                    What skills are you looking for?
                    <span className="text-danger">*</span>
                  </label>
                  {/* Skills DropDownPeeker */}
                  {/* <DropKeeper /> */}
                  <CreatableSelect
                    id="searchSkills"
                    className="searchSkills-select-input border border-inputbordercolor"
                    isMulti
                    options={skilles.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                    value={selectedSkills}
                    onChange={handleSkillChange}
                    placeholder="Search for skills"
                  />
                  {/* <small
                  className={`${inter400.className} inline-block  mb-[10px] mt-[0.25rem] text-sm text-[#718096] tracking-wide`}>
                  Selected skills
                </small> */}
                  {error && <p className="text-danger text-sm mt-1">{error}</p>}
                </div>

                <div className="col-span-full label-post mt-1">
                  <label
                    className="text-16px font-medium font-inter text-getstartTitle tracking-wide"
                    htmlFor="titlejob4"
                  >
                    What level of experience do you require?
                  </label>

                  <div className="form-check flex gap-2 mt-2  mb-1">
                    <input
                      type="radio"
                      name="radio3"
                      id="fresher"
                      value="Entry Level"
                      checked={exp === "fresher"}
                      onClick={() => {
                        setExp("fresher");
                      }}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide mb-1"
                      htmlFor="fresher"
                    >
                      Entry Level
                    </label>
                  </div>

                  <div className="form-check flex gap-2  mb-1">
                    <input
                      type="radio"
                      name="radio3"
                      id="intermediate"
                      value="Intemediate"
                      checked={exp === "intermediate"}
                      onClick={() => {
                        setExp("intermediate");
                      }}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide  mb-1"
                      htmlFor="intermediate"
                    >
                      Intemediate
                    </label>
                  </div>

                  <div className="form-check flex gap-2  mb-1">
                    <input
                      type="radio"
                      name="radio3"
                      id="expert"
                      value="Expert"
                      checked={exp === "expert"}
                      onClick={() => {
                        setExp("expert");
                      }}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide  mb-1"
                      htmlFor="expert"
                    >
                      Expert
                    </label>
                  </div>
                </div>

                <div className="col-span-full label-post mt-1">
                  <label
                    className="text-16px font-medium font-inter text-getstartTitle tracking-wide"
                    htmlFor="titlejob4"
                  >
                    Does this project require the physical presence of the
                    professional?
                  </label>

                  <div className="form-check flex gap-2 mt-2  mb-1">
                    <input
                      type="radio"
                      name="radio2"
                      id="remote"
                      value="remote"
                      checked={location === "remote"}
                      onChange={handleLocationChange}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide  "
                      htmlFor="remote"
                    >
                      Remote
                    </label>
                  </div>

                  <div className="form-check flex gap-2  mb-1">
                    <input
                      type="radio"
                      name="radio2"
                      id="physical"
                      value="physical"
                      checked={location === "physical"}
                      onChange={handleLocationChange}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide "
                      htmlFor="physical"
                    >
                      At a physical location
                    </label>
                  </div>
                  <textarea
                    className={`w-full border border-inputbordercolor mt-2 p-[8px] text-sm text-black rounded ${location === "remote" ? "bg-neutral-300" : "bg-white"
                      }`}
                    disabled={location === "remote"}
                    id="titlejob2"
                    name="titlejob2"
                    value={locationdetalils}
                    onChange={(e) => {
                      setLocationdetalils(e.target.value);
                    }}
                  ></textarea>
                  <small className="inline-block font-inter font-normal mb-[10px] text-sm text-radiolabel tracking-wide"></small>
                </div>

                <div className="col-span-full label-post">
                  <label
                    className="text-16px font-medium font-inter text-getstartTitle tracking-wide"
                    htmlFor="titlejob4"
                  >
                    What is your budget for this project?
                    <span className="text-danger">*</span>
                  </label>

                  <div className="form-check flex gap-2 mt-2 mb-[16px]">
                    <input
                      type="radio"
                      name="radio4"
                      id="Fixed"
                      value="Fixed"
                      checked={budgetType === "Fixed"}
                      onChange={handleBudgetChange}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide"
                      htmlFor="Fixed"
                    >
                      Fixed Price
                    </label>

                    <input
                      type="radio"
                      name="radio4"
                      id="range"
                      value="range"
                      checked={budgetType === "range"}
                      onChange={handleBudgetChange}
                    />
                    <label
                      className="font-inter text-radiolabel text-[14px] font-normal tracking-wide"
                      htmlFor="range"
                    >
                      Range
                    </label>
                  </div>
                  {budgetType === "Fixed" ? (
                    // Fixed Price section
                    <div className="col-span-full label-post">
                      <div className="relative z-20 bg-white dark:bg-form-input mt-2">
                        <span
                          className={`${inter400.className} text-radiolabel absolute  top-1/2 left-0 z-30 -translate-y-1/2 py-2 px-5 border border-inputbordercolor`}
                        >
                          N
                        </span>
                        <input
                          type="text"
                          inputmode="numeric"
                          className="relative z-20 w-full appearance-none border border-inputbordercolor bg-transparent py-2 px-15 outline-none"
                          value={formatNumber(Nvalue)}
                          onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            if (inputValue.length <= 8) {
                              setNvalue(inputValue);
                            }
                          }}
                        />
                      </div>
                      {!Nvalue && NvalueError && (
                        <p className="text-danger text-sm mt-1">{NvalueError}</p>
                      )}
                      <small className="inline-block font-inter font-normal mb-[20px] mt-[0.25rem] text-sm text-radiolabel tracking-wide">
                        Enter your total budget. Professional will have the option
                        to create milestones which divide your project into
                        manageable phases.
                      </small>
                    </div>
                  ) : (
                    // Range Price section
                    <div className="flex space-x-8">
                      <div className="col-span-full label-post w-[50%]">
                        <label
                          className="text-16px font-medium font-inter text-getstartTitle"
                          htmlFor="titlejob1"
                        >
                          Min
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input mt-2 w-full">
                          <span className="absolute text-radiolabel top-1/2 left-0 z-30 -translate-y-1/2 py-2 px-5 border border-inputbordercolor">
                            N
                          </span>
                          <input
                            type="text"
                            inputmode="numeric"
                            className="relative z-20 w-full appearance-none border border-inputbordercolor bg-transparent py-2 px-15 outline-none"
                            value={formatNumber(Minvalue)}
                            onKeyDown={(e) => {
                              if (e.key === "e" || e.key === "E") {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                              if (inputValue.length <= 8) {
                                setMinvalue(inputValue);
                                if (parseInt(inputValue) > parseInt(Maxvalue)) {
                                  setMinvalueError(
                                    "Minimum value cannot be greater than maximum value."
                                  );
                                } else if (
                                  parseInt(inputValue) === parseInt(Maxvalue)
                                ) {
                                  setMinvalueError(
                                    "Minimum value cannot be equal to maximum value."
                                  );
                                } else {
                                  setMinvalueError("");
                                }
                              }
                            }}
                          />
                        </div>
                        {/* {errorMessages.minBudget && (
                        <small className="inline-block font-inter font-normal text-red mt-[0.25rem] text-sm">
                          {errorMessages.minBudget}
                        </small>
                      )} */}
                        {MinvalueError && (
                          <p className="text-danger text-sm mt-1">
                            {MinvalueError}
                          </p>
                        )}
                      </div>

                      <div className="col-span-full label-post w-[50%]">
                        <label
                          className="text-16px font-medium font-inter text-getstartTitle"
                          htmlFor="titlejob1"
                        >
                          Max
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input mt-2 w-full">
                          <span className="text-radiolabel absolute top-1/2 left-0 z-30 -translate-y-1/2 py-2 px-5 border border-inputbordercolor">
                            N
                          </span>
                          <input
                            type="text"
                            inputmode="numeric"
                            className="relative z-20 w-full appearance-none border border-inputbordercolor bg-transparent py-2 px-15 outline-none"
                            value={formatNumber(Maxvalue)}
                            onKeyDown={(e) => {
                              if (e.key === "e" || e.key === "E") {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                              if (inputValue.length <= 8) {
                                setMaxvalue(inputValue);
                                if (parseInt(inputValue) < parseInt(Minvalue)) {
                                  setMaxvalueError(
                                    "Maximum value cannot be less than minimum value."
                                  );
                                } else if (
                                  parseInt(inputValue) === parseInt(Minvalue)
                                ) {
                                  setMaxvalueError(
                                    "Maximum value cannot be equal to minimum value."
                                  );
                                } else {
                                  setMaxvalueError("");
                                }
                              }
                            }}
                          />
                        </div>
                        {/* {errorMessages.maxBudget && (
                        <small className="inline-block font-inter font-normal text-red mt-[0.25rem] text-sm">
                          {errorMessages.maxBudget}
                        </small>
                      )} */}
                        {MaxvalueError && (
                          <p className="text-danger text-sm mt-1">
                            {MaxvalueError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-[20px] flex gap-3 ">
                {userData?.client_profile_complete != null &&
                  userData?.client_profile_complete === 1 ? (
                  <>
                    <input
                      type="button"
                      value={postBtn}
                      disabled={
                        postBtn !== "Post Now" || draftBtn !== "Save As Draft"
                      }
                      style={{
                        opacity:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? 0.5
                            : 1,
                        cursor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "#ccc"
                            : "",
                      }}
                      className="text-sm transition duration-300 font-inter tracking-wide ease-out cursor-pointer rounded-[5px] bg-submtBtn text-white border border-submtBtn font-normal p-2.5 hover:bg-white hover:text-submtBtn"
                      onClick={() => handlesubmit("Post Now")}
                    />
                    <input
                      type="button"
                      value={draftBtn}
                      disabled={
                        draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                      }
                      style={{
                        opacity:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? 0.5
                            : 1,
                        cursor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "#ccc"
                            : "",
                      }}
                      className="text-sm transition duration-150 ease-out cursor-pointer rounded-[5px] font-inter bg-white text-black border border-white hover:border-submtBtn font-semibold p-2.5 hover:text-submtBtn"
                      onClick={() => handlesubmit("Save As Draft")}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="button"
                      value={postBtn}
                      disabled={
                        postBtn !== "Post Now" || draftBtn !== "Save As Draft"
                      }
                      style={{
                        opacity:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? 0.5
                            : 1,
                        cursor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "#ccc"
                            : "",
                      }}
                      className="text-sm transition duration-300 font-inter tracking-wide ease-out cursor-pointer rounded-[5px] bg-submtBtn text-white border border-submtBtn font-normal p-2.5 hover:bg-white hover:text-submtBtn"
                      onClick={() => setValidationPopup(true)}
                    />
                    <input
                      type="button"
                      value={draftBtn}
                      disabled={
                        draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                      }
                      style={{
                        opacity:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? 0.5
                            : 1,
                        cursor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          draftBtn !== "Save As Draft" || postBtn !== "Post Now"
                            ? "#ccc"
                            : "",
                      }}
                      className="text-sm transition duration-150 ease-out cursor-pointer rounded-[5px] font-inter bg-white text-black border border-white hover:border-submtBtn font-semibold p-2.5 hover:text-submtBtn"
                      onClick={() => setValidationPopup(true)}
                    />
                  </>
                )}
              </div>
            </form>

          </div>
        </div>
        {validationPopup && (
          <div className="fixed grid content-center top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-black bg-opacity-70 ">
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
                      Please fill out your profile details, and then you can  post
                      a project.
                    </h1>
                  </div>
                </div>

                <div className="flex justify-center gap-5 items-center p-5">
                  <button
                    className={`w-20 text-base bg-[#eee] py-2 px-3 rounded ${inter500.className}`}
                    onClick={() => setValidationPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`w-20 bg-[#007bff] text-white py-2 px-3 rounded hover:bg-[#1068AD] ${inter500.className}`}
                    onClick={handleValidationUser}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </ThemeProvider>
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
    </>
  );
}

const MyCustomIcon = ({width , height}) => (
  <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
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



export default Calendar;
