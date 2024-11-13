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
      className="    md:pt-[130px] pt-[100px] md:pb-[120px] pb-[50px] w-full"
      style={{
        backgroundImage: `url(${helpoverlay.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" xl:w-[1140px] lg:w-[960px] md:w-[760px] sm:w-[540px] w-full mx-auto px-[15px] pt-[0px]">
        <h1
          className={`${mulish800.className} hidden md:block sm:mb-[25px] mb-[10px] text-[#2B6CB0] lg:text-[60px] sm:text-[40px] text-[23px] leading-[70px]  text-center`}
          style={{
            transform: `translateY(${scrollPosition * -0.3}px)`,
          }}
        >
          Connecting professionals <br /> to businesses across India
        </h1>
        <h1
          className={`${mulish800.className} md:hidden block  sm:mb-[25px] mb-[10px] text-box_clr lg:text-[58px] sm:text-[40px] text-[23px]  text-center`}
          style={{
            transform: `translateY(${scrollPosition * -0.3}px)`,
          }}
       >
          Connecting professionals to businesses across India
        </h1>
        <h2
          className={`${mulish400.className} md:block hidden text-post_clr tracking-wide lg:text-[18px] sm:text-[22px] lg:leading-[32px] text-center`}
          style={{
            transform: `translateY(${scrollPosition * -0.3}px)`,
          }}
        >
          Freelance is a remote services marketplace designed to connect businesses
          of all sizes <br />
          to independent professionals,freelancers, and agencies for all their
          hiring needs. <br />
        </h2>
        <h2
          className={`${mulish400.className} md:hidden block tracking-wide text-post_clr lg:text-[27px] sm:text-[22px] text-[18px] lg:leading-[32px] text-center`}
        
          style={{
            transform: `translateY(${scrollPosition * -0.3}px)`,
          }}>
          Freelance is a remote services marketplace designed to connect businesses
          of all sizes to independent professionals, freelancers, and agencies
          for all their hiring needs.
        </h2>
      </div>
    </div>
  );
}
