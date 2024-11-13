import React from "react";
import { Mulish } from "next/font/google";
import helpoverlay from "../../../public/helpoverlay.png";

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

export default function FaqsHeroSection() {
  return (
    <div
      className="    md:pt-[130px] pt-[100px] md:pb-[120px] pb-[50px] w-full"
      style={{
        backgroundImage: `url(${helpoverlay.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" xl:w-[1140px] lg:w-[960px] md:w-[760px] sm:w-[540px] w-full mx-auto px-[15px] sm:pt-[70px] pt-[0px]">
        <h1
          className={`${mulish700.className} sm:mb-[25px] mb-[10px] text-box_clr lg:text-[58px] sm:text-[40px] text-[23px]  text-center`}
        >
          Frequently Asked Questions
        </h1>
        <h2
          className={`${mulish400.className}   text-post_clr lg:text-[27px] sm:text-[22px] text-[18px] lg:leading-[32px] text-center`}
        >
          Get quick answers to your questions about Freelance
        </h2>
      </div>
    </div>
  );
}
