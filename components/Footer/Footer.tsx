import React, { useState } from "react";
import {
  Box,
  FooterContainer,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import praikiLogo from "@/public/praiki.svg";
import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });

const Footer = () => {
  const [isOpenabout, setIsOpenabout] = useState(false);
  const [isOpencontact, setIsOpencontact] = useState(false);
  const [email, setEmail] = useState("");
  const [errorStatus,setErrorStatus]=useState(false);
  const router = useRouter();
  const handleScrollTo = (id: string) => {
    router.push(`/policy#${id}`);
  };
 const handleSubscribe =()=>{
  if(email && email !== ""){
    setErrorStatus(false)
  }else{
    setErrorStatus(true);
  }
 }
  return (
    <div>
      <Box className=" w-full">
        <FooterContainer className=" xl:w-[1140px] lg:w-[960px] w-full mx-auto xl:pt-[70px] sm:pt-[70px] pt-[70px] pb-[50px] px-[15px] sm:px-[30px] lg:px-[15px] md:pb-0 sm:pb-[50px]">
          <Row className="about-contact-div justify-between flex flex-col md:flex-row  lg:flex-nowrap sm:flex-nowrap  sm:pb-[42px] sm:ml-[-15px]">
            <div className="pb-10 md:pb-0">
              <div className="About-us-div sm:flex sm:flex-col sm:flex-wrap text-left  mb-0   xl:w-[190px] lg:w-[160px] md:w-[150px] sm:w-[270px] sm:px-[15px]">
                <Heading className={`${mulish700.className} tracking-wide`}>
                  About Us
                </Heading>
                <FooterLink
                  href="/about-us"
                  className={`${mulish400.className} block xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  About Freelance
                </FooterLink>
                <FooterLink
                  href="#"
                  className={`${mulish400.className} block xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  How Freelance Works
                </FooterLink>
                {/* <FooterLink
                  href="/payment-policy"
                  className={`${mulish400.className} xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  Payment Policy
                </FooterLink> */}
                <FooterLink
                  href="#"
                  className={`${mulish400.className} block xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  Services
                </FooterLink>
              </div>
            </div>

            <div className="pb-10 md:pb-0">
              <div className="Contact-us-div sm:flex flex-col text-left ml-0   sm:px-[15px] xl:w-[190px] lg:w-[160px] md:w-[150px] sm:w-[270px]">
                <Heading className={`${mulish700.className}`}>
                  Contact Us
                </Heading>
                <FooterLink
                  href="/contact-us"
                  className={`${mulish400.className} block xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  Contact
                </FooterLink>
                <FooterLink
                  href="/help-support"
                  className={`${mulish400.className} block xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  Help & Support
                </FooterLink>
                <FooterLink
                  href="/faqs"
                  className={`${mulish400.className} block xl:mb-[15px] lg:mb-[12px] sm:mb-[5px]`}
                >
                  FAQ
                </FooterLink>
              </div>
            </div>

            <Column className=" hidden md:block md:px-[15px] xl:w-[190px] lg:w-[200px] lg:ms-[95px] md:w-[180px]">
              <Heading className={`hidden md:block ${mulish700.className} `}>
                Connect with Us
              </Heading>
              <div className="hidden md:flex">
                <FooterLink
                  href="#"
                  target="_blank"
                  className="lg:mr-[13px] lg:mb-[10px] md:mr-[2px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M3.33594 16.0026C3.33749 22.5618 8.10714 28.1467 14.5853 29.1746V19.856H11.2026V16.0026H14.5893V13.0693C14.4379 11.6794 14.9126 10.2941 15.8848 9.28922C16.8569 8.28434 18.2257 7.764 19.6199 7.86931C20.6207 7.88547 21.6189 7.9746 22.6066 8.13598V11.4146H20.9213C20.3411 11.3387 19.7577 11.5303 19.3356 11.9355C18.9135 12.3408 18.6983 12.9158 18.7506 13.4986V16.0026H22.4453L21.8546 19.8573H18.7506V29.1746C25.7566 28.0674 30.6694 21.669 29.93 14.6147C29.1905 7.56047 23.0577 2.31988 15.9744 2.68955C8.89109 3.05921 3.33706 8.90972 3.33594 16.0026Z"
                      fill="#2E3A59"
                    />
                  </svg>
                </FooterLink>
                <FooterLink
                  href="#"
                  target="_blank"
                  className="lg:mr-[13px] lg:mb-[10px] md:mr-[2px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M16.6689 28.0547C13.3889 28.0547 13.0023 28.0373 11.7223 27.9813C10.7241 27.9485 9.73886 27.7456 8.80895 27.3813C7.20003 26.7552 5.9278 25.4825 5.30228 23.8733C4.95202 22.94 4.7631 21.954 4.74361 20.9573C4.66895 19.68 4.66895 19.2613 4.66895 16.0067C4.66895 12.7173 4.68628 12.3333 4.74361 11.06C4.76353 10.0647 4.95244 9.08 5.30228 8.14799C5.92712 6.53669 7.20141 5.26288 8.81295 4.63865C9.74447 4.28692 10.7294 4.09751 11.7249 4.07865C12.9983 4.00665 13.4169 4.00665 16.6689 4.00665C19.9756 4.00665 20.3556 4.02399 21.6156 4.07865C22.6137 4.09767 23.6013 4.28707 24.5356 4.63865C26.1467 5.26359 27.4207 6.53715 28.0463 8.14799C28.4024 9.09358 28.5924 10.0937 28.6076 11.104C28.6823 12.3813 28.6823 12.7987 28.6823 16.052C28.6823 19.3053 28.6636 19.732 28.6076 20.9947C28.5878 21.9923 28.3984 22.9792 28.0476 23.9133C27.4205 25.5236 26.1464 26.7968 24.5356 27.4227C23.6026 27.7722 22.6171 27.9611 21.6209 27.9813C20.3476 28.0547 19.9303 28.0547 16.6689 28.0547ZM16.6236 6.11732C13.3623 6.11732 13.0236 6.13332 11.7503 6.19065C10.9903 6.20072 10.2376 6.34097 9.52495 6.60532C8.47262 7.008 7.63991 7.83731 7.23295 8.88799C6.96656 9.60838 6.82629 10.3693 6.81828 11.1373C6.74761 12.4293 6.74761 12.768 6.74761 16.0067C6.74761 19.2067 6.75961 19.5947 6.81828 20.8787C6.83021 21.6389 6.97041 22.3917 7.23295 23.1053C7.64051 24.1553 8.47307 24.984 9.52495 25.3867C10.2371 25.6528 10.9901 25.7931 11.7503 25.8013C13.0409 25.876 13.3809 25.876 16.6236 25.876C19.8943 25.876 20.2329 25.86 21.4956 25.8013C22.2561 25.7921 23.0094 25.6518 23.7223 25.3867C24.7682 24.9805 25.5955 24.1537 26.0023 23.108C26.2681 22.387 26.4084 21.6257 26.4169 20.8573H26.4316C26.4889 19.5827 26.4889 19.2427 26.4889 15.9853C26.4889 12.728 26.4743 12.3853 26.4169 11.112C26.405 10.3526 26.2648 9.60067 26.0023 8.88799C25.5964 7.84075 24.769 7.01238 23.7223 6.60532C23.0095 6.33964 22.2562 6.19935 21.4956 6.19065C20.2063 6.11732 19.8689 6.11732 16.6236 6.11732ZM16.6689 22.1653C14.1756 22.1669 11.9268 20.6663 10.9714 18.3633C10.016 16.0602 10.5422 13.4084 12.3045 11.6446C14.0668 9.88078 16.7181 9.35235 19.022 10.3058C21.3258 11.2592 22.8284 13.5066 22.8289 16C22.8253 19.4014 20.0704 22.1587 16.6689 22.1653ZM16.6689 11.9973C14.4598 11.9973 12.6689 13.7882 12.6689 15.9973C12.6689 18.2065 14.4598 19.9973 16.6689 19.9973C18.8781 19.9973 20.6689 18.2065 20.6689 15.9973C20.6638 13.7903 18.876 12.0025 16.6689 11.9973ZM23.0689 11.0467C22.2762 11.0437 21.6355 10.3994 21.6369 9.60666C21.6384 8.81389 22.2815 8.172 23.0743 8.172C23.8671 8.172 24.5101 8.81388 24.5116 9.60665C24.512 9.98914 24.36 10.356 24.0893 10.6262C23.8186 10.8964 23.4514 11.0477 23.0689 11.0467Z"
                      fill="#2E3A59"
                    />
                  </svg>
                </FooterLink>
                <FooterLink
                  href="#"
                  target="_blank"
                  className="lg:mr-[13px] lg:mb-[10px] md:mr-[2px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M17.9998 28H12.6665V12H17.9998V14.6667C19.1367 13.2203 20.8607 12.3581 22.6998 12.316C26.0073 12.3344 28.6761 15.0258 28.6665 18.3333V28H23.3332V19C23.1199 17.5102 21.8422 16.4048 20.3372 16.408C19.6789 16.4288 19.0575 16.717 18.6164 17.2062C18.1754 17.6953 17.9527 18.3431 17.9998 19V28ZM9.99984 28H4.6665V12H9.99984V28ZM7.33317 9.33333C5.86041 9.33333 4.6665 8.13943 4.6665 6.66667C4.6665 5.19391 5.86041 4 7.33317 4C8.80593 4 9.99984 5.19391 9.99984 6.66667C9.99984 7.37391 9.71889 8.05219 9.21879 8.55229C8.71869 9.05238 8.04041 9.33333 7.33317 9.33333Z"
                      fill="#2E3A59"
                    />
                  </svg>
                </FooterLink>
                <FooterLink
                  href="#"
                  target="_blank"
                  className="lg:mr-[13px] lg:mb-[10px] md:mr-[2px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M27.3265 8.91736C28.5218 8.20281 29.4161 7.07767 29.8425 5.75203C28.7194 6.41843 27.4906 6.88786 26.2092 7.14003C24.4326 5.26073 21.6179 4.80339 19.3377 6.02357C17.0576 7.24374 15.8765 9.83934 16.4545 12.36C11.854 12.1291 7.56781 9.95591 4.66252 6.38136C3.14631 8.99659 3.92113 12.3397 6.43319 14.0214C5.5248 13.9922 4.63656 13.7462 3.84252 13.304C3.84252 13.328 3.84252 13.352 3.84252 13.376C3.84305 16.1002 5.76302 18.4468 8.43319 18.9867C7.59061 19.2159 6.7068 19.2497 5.84919 19.0854C6.60012 21.4151 8.74726 23.0111 11.1945 23.0587C9.16763 24.6495 6.66449 25.5122 4.08786 25.508C3.63115 25.5087 3.17481 25.4824 2.72119 25.4294C5.33771 27.1107 8.38302 28.0032 11.4932 28C15.8202 28.0297 19.9786 26.3239 23.0382 23.264C26.0978 20.2042 27.8033 16.0457 27.7732 11.7187C27.7732 11.4707 27.7674 11.224 27.7559 10.9787C28.8765 10.1688 29.8436 9.16556 30.6119 8.01603C29.5679 8.47878 28.4605 8.78259 27.3265 8.91736Z"
                      fill="#2E3A59"
                    />
                  </svg>
                </FooterLink>
              </div>
            </Column>
            <div className="block pt-[0px]  md:pl-[7px] sm:pl-0 pr-[7px] sm:pr-[0px]  rounded-[8px] lg:ml-[95px] md:w-[28%]">
              <div className="">
                <Heading className={`hidden md:block ${mulish700.className} `}>
                  Newsletter
                </Heading>
              </div>
              <div className="mb-2">
                <p
                  className={`${inter400.className} text-[14px] text-radiolabel sm:mb-[10px] pt-[15px] md:pt-[0px]`}
                >
                  Keep up to date with content, updates, and offers from Freelance
                </p>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => {
                      if (e.target.value != "") {
                        setErrorStatus(false);
                      } else {
                        setErrorStatus(true);
                      }
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 text-base leading-5 text-gray-700 bg-white border border-[#ced4da] rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  ></input>
                  <button
                    className="btn absolute top-0 bottom-0 right-0 bg-[#A6B7F4]  text-black text-xs  py-[10px] rounded-s-[0px] rounded-l-[0.25rem]"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                </div>
                <p
                  className={`text-red ml-1 text-[12px] ${
                    errorStatus ? "block" : "hidden"
                  }`}
                >
                  Please enter email
                </p>
              </div>
            </div>
          </Row>
          <div className="w-full md:ml-[-15px] flex  h-auto justify-between items-center  hover:bg-transparent ">
            <div className="flex flex-col sm:flex-row w-full items-center justify-between md:pt-[20px] md:pb-[85px]">
              <div className="lg:w-1/2 w-2/2 md:flex  items-center  sm:block xl:w-[570px] md:w-[350px] py-5 sm:py-0">
                <div className="md:pb-0 w-full sm:flex md:flex-none sm:ml-[-15px]  flex justify-start  md:justify-center sm:justify-center  cursor-pointer  xl:w-[190px] md:px-[15px] lg:w-[160px] md:w-[120px]">
                  <a href="#">
                    <Image
                      src={praikiLogo}
                      alt="logo"
                      title=""
                      // width={180}
                      // height={60}
                      className="w-[13rem] h-[13rem] object-cover"
                    />
                  </a>
                </div>

                <div className="sm:w-full  font-semibold md:text-[13px] text-box_clr hidden md:block xl:w-[430px] lg:w-[320px] md:w-[240px] md:px-[15px]">
                  <div
                    className={`${mulish600.className} lg:ml-[15px] leading-6 tracking-wide `}
                  >
                    Connecting professionals to <br />
                    businesses across India
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-2/2 grid items-end xl:w-[570px] md:w-[360px]">
                <div className="w-full flex justify-end flex-col">
                  <div
                    className={`${mulish400.className} space-x-4 md:mt-[10px] lg:text-[15px] md:text-[13px] text-box_clr cursor-pointer  justify-center md:justify-end  hidden md:flex`}
                  >
                    <FooterLink
                      href="#"
                      onClick={() => handleScrollTo("scrollHere1")}
                    >
                      {" "}
                      <div className="text-[15px] hover:text-[#286cac]">
                        {" "}
                        Privacy Policy
                      </div>
                    </FooterLink>
                    <FooterLink
                      href="#"
                      onClick={() => handleScrollTo("scrollHere2")}
                    >
                      {" "}
                      <div className="text-[15px] hover:text-[#286cac]">
                        {" "}
                        Terms of Service
                      </div>
                    </FooterLink>
                    <FooterLink
                      href="#"
                      onClick={() => handleScrollTo("scrollHere3")}
                    >
                      {" "}
                      <div className="text-[15px] hover:text-[#286cac]">
                        {" "}
                        Refund Policy{" "}
                      </div>
                    </FooterLink>
                  </div>

                  <div
                    className={`${mulish400.className} text-[13px] text-box_clr font-normal text-left  sm:text-right leading-10`}
                  >
                    © 2024 Freelance - All Rights Reserved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FooterContainer>
      </Box>
    </div>
  );
};
export default Footer;
