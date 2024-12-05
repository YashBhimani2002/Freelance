"use client";
import React, { useState, useEffect } from "react";
import "./viewyourprofile.css";
// import * as FaIcons from "react-icons/fa";
import location from "../../public/Fafaiconimages/pin.png";
import webimage from "../../public/Fafaiconimages/Webimage.png";
import shareimage from "../../public/Fafaiconimages/share.png";
// import { Rating } from "react-simple-star-rating";
// import { ProgressBar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useParams, useNavigate } from "react-router-dom";
import { ProfileProcess } from "./app/api/api";
import { viewProfile } from "./app/api/api";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import React, {useState, useEffect} from 'react'
// import { ProgressBar } from 'react-bootstrap';

import "./viewyourprofile.css";

import Image from "next/image";

import { Metadata } from "next";
import { Rating } from "@mui/material";
export const metadata: Metadata = {
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
};
const Profile = () => {
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("activeJobs");
  const [userData, setUserData] = useState({});
  const [clintData, setClintData] = useState({});

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const hourlyRate = 2300;
  const jobCompleted = 0;
  const totalTransactions = 0;

  // Calculate progress percentage based on your data
  const progressPercentage =
    totalTransactions !== 0 ? (jobCompleted / totalTransactions) * 100 : 0;

  // const navigate = useNavigate();

  // Catch Rating value
  const handleRating = (rate: React.SetStateAction<number>) => {
    setRating(rate);

    // other logic
  };

  const profilescreen = () => {
    // navigate("/users_edit_profile");
  };

  const onPointerEnter = () => //console.log("Enter");
  const onPointerLeave = () => //console.log("Leave");
  const onPointerMove = (value: any, index: any) => //console.log(value, index);

  const getProfileData = async () => {
    try {
      const response = await ProfileProcess();
    } catch (error) {
      console.error(error);
    }
  };

  const getviewprofile = async () => {
    try {
      const response = await viewProfile();
      setUserData(response.data.user);
      setClintData(response.data.clint);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileData();
    getviewprofile();
  }, []);
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <>
        <div className="find-section">
          <div className="sidemenuand-Fide-job-row">
            <div className="main-screen-content-profile">
              <div className="headerteg">Profile</div>

              <div className="box-content">
                <div className="fast-content-box">
                  <Image alt="Profile" src={webimage} className="profile-img" />
                  <div className="center-content">
                    <h3>
                      {userData &&
                        `${userData?.first_name} ${userData?.last_name}`}
                    </h3>
                    <p>test, test</p>
                    <div className="locasion-content">
                      <Image src={location} alt="Location" />
                      <span>{userData && `${userData.country}`}</span>
                      <span>
                        <p>{rating}</p>
                      </span>
                      <Rating
                        onRate={handleRating}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                        ratingValue={rating} // Dynamically show the current rating value
                        /* Other available props can be added here */
                        className="custom-rating"
                      />

                      {/* Display the current rating value */}
                    </div>
                  </div>
                  <div className="right-content">
                    <div>
                      <div className="dropdown">
                        <div className="profile-image">
                          <Image src={shareimage} alt="share-image" />
                          <span className="mx-2">share</span>
                        </div>
                        <div className="dropdown-content2">
                          <a
                            target="_blank"
                            href="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Fpraiki.com%252Fshare-profile%252FNzA%253D&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB"
                          >
                            <FaIcons.FaFacebookSquare
                              style={{ fontSize: 13 }}
                            />{" "}
                          </a>
                          <a
                            target="_blank"
                            href="https://twitter.com/intent/tweet?text=Show+My+Profile&url=https://praiki.com/share-profile/NzA="
                          >
                            <FaIcons.FaTwitter style={{ fontSize: 13 }} />{" "}
                          </a>
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle%3Fmini%3Dtrue%26url%3Dhttps%3A%2F%2Fpraiki.com%2Fshare-profile%2FNzA%3D%26title%3DShow%2BMy%2BProfile%26summary%3D"
                          >
                            <FaIcons.FaLinkedinIn style={{ fontSize: 13 }} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <button onClick={profilescreen}>Edit Your Profile</button>
                  </div>
                </div>
                <div
                  className="Jobs-Created second-content-box"
                  style={{ borderBottom: "none" }}
                >
                  <div>
                    <p className="m-0">Hourly Rate</p>
                    <h5>N{hourlyRate}</h5>
                  </div>
                  <div className="me-2">
                    <p className="m-0">Job Completed</p>
                    <h5>{jobCompleted}</h5>
                  </div>
                  <div>
                    <p className="m-0">Total Transactions</p>
                    <h5>{totalTransactions}</h5>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-100  progress-row">
                    <p className="m-0 progressbar-content">
                      Job Success <span>{`${progressPercentage}%`}</span>
                    </p>
                    <ProgressBar now={progressPercentage} />
                  </div>
                </div>
                <div className="skills-rows w-100">
                  <p
                    className="m-0 "
                    style={{
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#434343",
                    }}
                  >
                    Skills
                  </p>
                  <div className="skills-content d-flex">
                    <h6>Financial analyst</h6>
                    <h6>Financial analyst</h6>
                  </div>
                </div>
                <div className="Jobs-Created1 d-flex w-100">
                  <div>
                    <p className="m-0">Company Description</p>
                    <h5>{clintData && ` ${clintData.company_desc}`}</h5>
                  </div>
                </div>
                <div className="Jobs-Created1 d-flex w-100">
                  <div>
                    <p className="m-0">Freelance Job History</p>
                    <div className="History-content">
                      <h5
                        className={
                          activeTab === "activeJobs"
                            ? "active-tab"
                            : "deactive-tab"
                        }
                        onClick={() => handleTabClick("activeJobs")}
                      >
                        Active Jobs (0)
                      </h5>
                      <h5
                        className={
                          activeTab === "completedJobs"
                            ? "active-tab"
                            : "deactive-tab"
                        }
                        onClick={() => handleTabClick("completedJobs")}
                      >
                        Completed Jobs (0)
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="Jobs-Created1 d-flex w-100">
                  <div>
                    <p className="m-0">Company Name</p>
                    <h5>{clintData && ` ${clintData.company_name}`}</h5>
                    <p className="m-0">Education</p>
                    <div className="Education-data">
                      <h5
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          width: "50%",
                        }}
                      >
                        Test
                        <br />
                        <span style={{ fontWeight: 600 }}>test</span>
                      </h5>
                      <h6 style={{ fontSize: 14 }}>2014-2018</h6>
                    </div>
                    <div className="Education-data">
                      <h5
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          width: "50%",
                        }}
                      >
                        Test1
                        <br />
                        <span style={{ fontWeight: 600 }}>test</span>
                      </h5>
                      <h6 style={{ fontSize: 14 }}>2023-2023</h6>
                    </div>
                  </div>
                </div>
                <div className="Jobs-Created1 d-flex w-100">
                  <div>
                    <p className="m-0">Work Experience</p>
                    <div className="Education-data">
                      <h5
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          width: "50%",
                        }}
                      >
                        Test
                        <br />
                        <span style={{ fontWeight: 600 }}>test</span>
                      </h5>
                      <h6 style={{ fontSize: 14 }}>2021-2022</h6>
                    </div>
                    <div className="Education-data">
                      <h5
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          width: "50%",
                        }}
                      >
                        Test1
                        <br />
                        <span style={{ fontWeight: 600 }}>test</span>
                      </h5>
                      <h6 style={{ fontSize: 14 }}>Curruntly work here</h6>
                    </div>
                  </div>
                </div>

                <div className="Jobs-Created1 d-flex w-100">
                  <div>
                    <p className="m-0">Professional Certifications</p>
                    <div className="Education-data">
                      <h5
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          width: "50%",
                        }}
                      >
                        test1
                        <br />
                        <span style={{ fontWeight: 600 }}>test</span>
                      </h5>
                      <h6 style={{ fontSize: 14 }}>2023-2023</h6>
                    </div>
                  </div>
                </div>
                <div className="Jobs-Created1 d-flex">
                  <div>
                    <p className="m-0">Web Address</p>
                    <h5>{clintData && ` ${clintData.web_address}`}</h5>
                    <p className="m-0">Portfolio</p>
                    <div className="Education-data">
                      <h5
                        style={{
                          fontWeight: "bold",
                          color: "#000000",
                          width: "50%",
                        }}
                      >
                        test1
                        <br />
                        <span style={{ fontWeight: 600 }}>www.google .com</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Profile;
