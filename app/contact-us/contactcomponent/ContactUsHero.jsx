import React from 'react'
import { Mulish } from "next/font/google";
import helpoverlay from "../../../public/helpoverlay.png"
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

export default function Contactcenter() {
  return (
    <div  className="    md:pt-[130px] pt-[100px] md:pb-[120px] pb-[50px] w-full"  style={{
        backgroundImage: `url(${helpoverlay.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }} >
        <div className=' xl:w-[1140px] lg:w-[960px] md:w-[760px] sm:w-[540px] w-full mx-auto px-[15px] sm:pt-[70px] pt-[0px]'>
           <h1  className={`${mulish700.className} sm:mb-[25px] mb-[10px] text-box_clr lg:text-[58px] sm:text-[40px] text-[23px]  text-center`}>Submit Request</h1>
           <h3  className={`${mulish400.className}  text-[#323232] md:text-[27px] text-[16px] sm:leading-[32px] leading-[25px] text-center `}>You may also contact us via email at <span  className={`${mulish800.className}`}>support@praiki.com</span></h3>
        </div>
    </div>
  )
}
