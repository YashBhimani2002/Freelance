import React from "react";
import Image from "next/image";
import praikiLogo from "../../../public/praiki.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Headersmall() {
  const handlePraikiLogoClick = () => {
    window.location.href = "/";
  };
  const path = usePathname();

  return (
    <>
      <div className={`bg-[#1068AD] p-4 md:py-[12px] md:px-[40px] sticky top-0 ${path.includes("/freelance-find-work") && "z-10"} `}>
        <div className=" mx-[-15px] flex flex-wrap md:gap-0 gap-3 justify-between items-center">
          <div className="md:w-[154px] w-full  px-[15px] ">
            <a href="/">
              <Image
                src={praikiLogo}
                alt="alt"
                className="w-[105px] h-[55px] "
              />
            </a>
          </div>
          <div className="pl-4 pr-2 md:px-[15px] md:w-auto w-full flex-row flex gap-6 items-center">
            {!path.includes("/freelance-find-work") && (
              <div className="flex relative bg-searchbg rounded-2xl sm:w-60 w-full p-1 border border-grashad text-black mr-[8px]">
                <button className="absolute left-0 top-1/2 -translate-y-1/2 pl-[10px]">
                  <FontAwesomeIcon
                    icon={faSearch}
                    color="white"
                  ></FontAwesomeIcon>
                </button>

                <input
                  type="text"
                  placeholder="Search..."
                  className="max-w-[220px] bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 placeholder-placeholdercolor text-white"
                />
              </div>
            )}
            {path.includes("/freelance-find-work") && (
              <>
                <div className="flex relative bg-searchbg rounded-[1.25rem] sm:w-[17.313rem] w-full h-[2.125rem] p-1 border border-searchbg text-black mr-[8px]">
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 pl-[10px]">
                    <FontAwesomeIcon
                      icon={faSearch}
                      color="rgba(255,255,255,0.8)"
                      fontSize="0.875rem"
                    ></FontAwesomeIcon>
                  </button>

                  <input
                    type="text"
                    placeholder="Search..."
                    className="max-w-[220px] bg-transparent pl-7 pr-4 font-[2.938rem] text-[0.875rem] focus:outline-none xl:w-125 placeholder-[rgba(255,255,255,0.8)] text-white"
                  />
                </div>
                <div className="fixed md:relative top-[1.8rem] right-[7.2rem] md:top-0 md:right-0 flex">
                  <Link className="md:ms-end ms-0" href="/login">
                    <button className="text-white font-bold text-[16px]">
                      Log In
                    </button>
                  </Link>
                </div>
                <div
                  className="fixed md:relative top-[1.5rem] right-[1rem] md:top-0 md:right-0"
                  // style={{ position: "fixed", top: "1.1rem", right: "1rem" }}
                >
                  <Link className="shrink-0" href="/signup">
                    <button className="text-textBlue pt-[5px] pb-[8px] md:py-2 w-[5rem] md:w-[5.813rem] bg-white rounded-md font-bold text-[16px]">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
