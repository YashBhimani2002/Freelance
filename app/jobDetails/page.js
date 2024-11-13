"use client";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { pjobdetail } from "../../app/api/api";
import Jobmodal from "../jobModel/page";

function JobDetails() {
  const [openmodal, setOpenModal] = useState(false);
  const location = useLocation();
  const [Jobdetail, setJobdetail] = useState({});

  const handleapplyclick = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getpjobdetails = async () => {
    let id = location.state.id;
    try {
      const response = await pjobdetail(id);
      if (response?.status == 200) {
        setJobdetail(response.data?.data?.detail);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getpjobdetails();
  }, []);

  return (
    <div>
      <div className="title">Job Details</div>
      <div className="container_syn">
        <div className="top-bar">
          <div className="left-content">
            <div className="inner-left" onClick={() => Navigate(-1)}>
              <div className="backicon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="20" fill="#E2E8F0" />
                  <path
                    d="M15.828 19H28V21H15.828L21.192 26.364L19.778 27.778L12 20L19.778 12.222L21.192 13.636L15.828 19Z"
                    fill="#2D3748"
                  />
                </svg>
              </div>
              <div className="back">Back</div>
            </div>
          </div>
          <div className="right-content">
            <div className="inner-right">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2425_10355)">
                    <path
                      d="M15 7V19.97L10.79 18.16L10 17.82L9.21 18.16L5 19.97V7H15ZM19 1H8.99C7.89 1 7 1.9 7 3H17C18.1 3 19 3.9 19 5V18L21 19V3C21 1.9 20.1 1 19 1ZM15 5H5C3.9 5 3 5.9 3 7V23L10 20L17 23V7C17 5.9 16.1 5 15 5Z"
                      fill="#52619A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2425_10355">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M5.72902 15.625C6.64012 15.6223 7.51675 15.2764 8.18422 14.6563L14.7051 18.3823C14.2534 20.1472 15.166 21.976 16.8477 22.6763C18.5295 23.3766 20.4703 22.736 21.4048 21.1722C22.3392 19.6084 21.9839 17.5957 20.5704 16.4464C19.1569 15.2971 17.1141 15.3599 15.7738 16.5938L9.25297 12.8677C9.32134 12.6063 9.35909 12.3379 9.36547 12.0677L15.7728 8.40627C17.0445 9.56245 18.9524 9.66966 20.3457 8.66323C21.7389 7.6568 22.2367 5.81194 21.5388 4.24126C20.8408 2.67058 19.138 1.80357 17.4573 2.16311C15.7765 2.52265 14.5775 4.01043 14.5832 5.72919C14.5869 6.02927 14.6278 6.32773 14.7051 6.61773L8.78422 10C7.83578 8.53275 5.97977 7.94456 4.35934 8.59774C2.73891 9.25092 1.80963 10.9618 2.14387 12.6767C2.47811 14.3915 3.9819 15.6282 5.72902 15.625Z"
                    fill="#52619A"
                  />
                </svg>
              </div>
              <div>Share</div>
            </div>
          </div>
        </div>
        <div className="headerdiv">
          <div className="headertext">
            <h3>{Jobdetail && `${Jobdetail.job_title}`}</h3>
          </div>
          <div className="apply-button">
            <span id="Apply" onClick={() => handleapplyclick()}>
              Apply
            </span>
          </div>
        </div>
        <div className="contentdiv">
          <div className="upper-div">
            <div>
              <div className="titletext">Category</div>
              <div className="subtetx">
                {Jobdetail && `${Jobdetail.job_title}`}
              </div>
            </div>
            <div>
              <div className="titletext">Job Type</div>
              <div className="subtetx">
                {Jobdetail && `${Jobdetail.budget_type}`}
              </div>
            </div>
            <div>
              <div className="titletext">Experience Level</div>
              <div className="subtetx">
                {Jobdetail && `${Jobdetail.experience_level}`}
              </div>
            </div>
            <div>
              <div className="titletext">Posted</div>
              <div className="subtetx">5 Hours ago</div>
            </div>
          </div>
          <div className="lower-div">
            <div>
              <div className="titletext">Budget</div>
              <div className="subtetx">
                N{Jobdetail.budget_from}{" "}
                <span>Budget :N{Jobdetail.budget_to}</span>
              </div>
            </div>
            <div>
              <div className="titletext">Required Skills</div>
              <div className="flexed">
                {Jobdetail.skills?.map((value) => (
                  <div className="skill-contenyt" key={index}>
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="titletext"></div>
              <div className="subtetx"></div>
            </div>
            <div>
              <div className="titletext"></div>
              <div className="subtetx"></div>
            </div>
          </div>
        </div>
        <div className="border2"></div>
        <div className="lowerdiv">
          <div className="flexx">
            <div className="left70">
              <div className="desc">{Jobdetail.cover_page_detail}</div>
              <div className="Attachments">Attachments</div>
            </div>
            <div className="right30">
              <div className="client">About Client</div>
              <div className="stardiv">
                <div className="proficon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="21"
                    viewBox="0 0 23 21"
                    fill="none"
                  >
                    <path
                      d="M3.83317 16.625H1.9165C1.9165 13.7255 4.49087 11.375 7.6665 11.375C10.8421 11.375 13.4165 13.7255 13.4165 16.625H11.4998C11.4998 14.692 9.7836 13.125 7.6665 13.125C5.54941 13.125 3.83317 14.692 3.83317 16.625ZM15.3274 13.4837L12.7342 11.1213L14.0873 9.8805L15.3255 11.011L19.4463 7.2555L20.7995 8.4945L15.3255 13.482L15.3274 13.4837ZM7.6665 10.5C5.54941 10.5 3.83317 8.933 3.83317 7C3.83317 5.067 5.54941 3.5 7.6665 3.5C9.7836 3.5 11.4998 5.067 11.4998 7C11.4972 8.932 9.7825 10.4976 7.6665 10.5ZM7.6665 5.25C6.61942 5.25097 5.76698 6.01899 5.75198 6.97492C5.73697 7.93085 6.56496 8.72087 7.61158 8.74923C8.6582 8.77759 9.53605 8.03381 9.58317 7.07875V7.42875V7C9.58317 6.0335 8.72505 5.25 7.6665 5.25Z"
                      fill="#2E3A59"
                    />
                  </svg>
                </div>
                <div className="staricon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group">
                      <path
                        id="Vector"
                        d="M8.1551 12.5274L12.882 15.3779L11.6276 10.0056L15.8038 6.39087L10.3044 5.92471L8.1551 0.858032L6.0058 5.92471L0.506348 6.39087L4.68256 10.0056L3.42817 15.3779L8.1551 12.5274Z"
                        fill="#323232"
                      />
                    </g>
                  </svg>
                </div>
                <div className="staricon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group">
                      <path
                        id="Vector"
                        d="M8.1551 12.5274L12.882 15.3779L11.6276 10.0056L15.8038 6.39087L10.3044 5.92471L8.1551 0.858032L6.0058 5.92471L0.506348 6.39087L4.68256 10.0056L3.42817 15.3779L8.1551 12.5274Z"
                        fill="#323232"
                      />
                    </g>
                  </svg>
                </div>
                <div className="staricon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group">
                      <path
                        id="Vector"
                        d="M8.1551 12.5274L12.882 15.3779L11.6276 10.0056L15.8038 6.39087L10.3044 5.92471L8.1551 0.858032L6.0058 5.92471L0.506348 6.39087L4.68256 10.0056L3.42817 15.3779L8.1551 12.5274Z"
                        fill="#323232"
                      />
                    </g>
                  </svg>
                </div>
                <div className="staricon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group">
                      <path
                        id="Vector"
                        d="M8.1551 12.5274L12.882 15.3779L11.6276 10.0056L15.8038 6.39087L10.3044 5.92471L8.1551 0.858032L6.0058 5.92471L0.506348 6.39087L4.68256 10.0056L3.42817 15.3779L8.1551 12.5274Z"
                        fill="#323232"
                      />
                    </g>
                  </svg>
                </div>
                <div className="staricon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2425_10401)">
                      <path
                        d="M17.1608 7.39087L11.6613 6.91707L9.51203 1.85803L7.36273 6.92471L1.86328 7.39087L6.0395 11.0056L4.7851 16.3779L9.51203 13.5274L14.239 16.3779L12.9922 11.0056L17.1608 7.39087ZM9.51203 12.0984L6.6361 13.8331L7.40097 10.5623L4.86159 8.36141L8.21174 8.07102L9.51203 4.99127L10.82 8.07866L14.1701 8.36906L11.6307 10.57L12.3956 13.8408L9.51203 12.0984Z"
                        fill="#323232"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2425_10401">
                        <rect
                          width="18.357"
                          height="18.3409"
                          fill="white"
                          transform="translate(0.333496 0.32959)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="review">10 review</div>
              <div className="loca">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.5 18.375C9.39482 17.4323 8.37041 16.3988 7.4375 15.2853C6.0375 13.6132 4.375 11.123 4.375 8.74995C4.37376 6.27156 5.86622 4.03667 8.15594 3.08818C10.4457 2.13968 13.0813 2.66454 14.833 4.41783C15.9849 5.56461 16.6302 7.12454 16.625 8.74995C16.625 11.123 14.9625 13.6132 13.5625 15.2853C12.6296 16.3988 11.6052 17.4323 10.5 18.375ZM10.5 6.12495C9.56218 6.12495 8.6956 6.62527 8.22668 7.43745C7.75777 8.24963 7.75777 9.25027 8.22668 10.0625C8.6956 10.8746 9.56218 11.375 10.5 11.375C11.9497 11.375 13.125 10.1997 13.125 8.74995C13.125 7.3002 11.9497 6.12495 10.5 6.12495Z"
                      fill="#2E3A59"
                    />
                  </svg>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {Jobdetail && `${Jobdetail.location}`}
                </div>
              </div>
              <div className="border2"></div>
              <div className="total">Total Spend</div>
              <div className="def">50,000</div>
              <div className="total">Jobs Posted</div>
              <div className="def">12</div>
              <div className="total">Average Hourly Spend</div>
              <div className="def">N35/ hr</div>
            </div>
          </div>
        </div>
      </div>
      {openmodal && (
        <Jobmodal onClose={handleCloseModal} isOpen={openmodal} jobid={jobid} />
      )}
    </div>
  );
}

export default JobDetails;
