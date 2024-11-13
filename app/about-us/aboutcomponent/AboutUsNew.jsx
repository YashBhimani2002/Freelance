import React, { useEffect, useState } from "react";
import { Mulish } from "next/font/google";
import helpoverlay from "../../../public/helpoverlay.png";

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

export default function Helpcenter() {
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="md:pt-[110px] pt-[60px] md:pb-[200px] pb-[170px] w-full"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" xl:w-[1140px] lg:w-[960px] md:w-[760px] sm:w-[540px] w-full mx-auto px-[15px] pt-[0px]">
        <h1
          className={`${mulish800.className} hidden md:block sm:mb-[25px] mb-[10px] text-[#2B6CB0] lg:text-[60px] sm:text-[40px] text-[23px] leading-[70px]  text-center`}
          style={{
           transform: `translateY(${scrollPosition *     0.2}px)`,
         }}
        >
          About Praiki
        </h1>
        <h1
          className={`${mulish800.className} md:hidden block  sm:mb-[25px] mb-[10px] text-box_clr lg:text-[58px] sm:text-[40px] text-[23px]  text-center`}
          style={{
           transform: `translateY(${scrollPosition *     0.2}px)`,
         }}
        >
          About Praiki
        </h1>
        <h2
          className={`${mulish400.className} md:block hidden text-post_clr tracking-wide lg:text-[18px] sm:text-[22px] lg:leading-[32px] text-center`}
          style={{
           transform: `translateY(${scrollPosition *     0.2}px)`,
         }}
        >
          Praiki was founded to solve a critical challenge in Nigeria’s
          employment sector: effectively matching skills to opportunities.{" "}
          <br />
          Conceived by Ronke Bankole and co-partnered by Tobi Lawson, our goal
          is to transform the workforce landscape.
          <br />
        </h2>
        <h2
          className={`${mulish400.className} md:hidden block tracking-wide text-post_clr lg:text-[27px] sm:text-[22px] text-[18px] lg:leading-[32px] text-center`}
          style={{
           transform: `translateY(${scrollPosition *     0.2}px)`,
         }}
        >
          Praiki was founded to solve a critical challenge in Nigeria’s employment sector: effectively matching skills to opportunities. Conceived by Ronke Bankole and co-partnered by Tobi Lawson, our goal is to transform the workforce landscape.
        </h2>
      </div>
    </div>
  );
}
