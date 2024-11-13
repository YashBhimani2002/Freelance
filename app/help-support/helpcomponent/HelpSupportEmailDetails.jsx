import React from 'react'
import { Mulish } from "next/font/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

export default function Smalldetail() {
  return (
    <div className=' pb-[60px] w-full'>
               <div className=' xl:w-[1140px] sm:w-[540px] md:w-auto mx-auto px-[15px] pt-[70px] '>
                 <h3  className={`${mulish400.className} sm:block hidden text-[#323232] md:text-[27px] text-[16px] leading-[32px] text-center `}>You may also contact us via email at<br/> <span  className={`${mulish800.className}`}>support@freelance.com</span></h3>
                 <h3  className={`${mulish400.className} sm:hidden block text-[#323232] md:text-[27px] text-[16px] sm:leading-[32px] leading-[25px] text-center `}>You may also contact us via email at <span  className={`${mulish800.className}`}>support@freelance.com</span></h3>
                 <div className='md:w-[60%] w-[100%] border-t border-[#A6B7F4] mx-auto mt-[100px] pt-[26px]'>
                       <div  className={`${mulish400.className}  sm:text-left md:text-right text-[#323232] tracking-wide`}>
                       <FontAwesomeIcon icon={faPhone} className='mr-2  leading-[17px]' />
                       <a href="tel:(+234) 807 362 2282">(+234) 807 362 2282</a>
                       </div>
               </div>
               </div>
               
    </div>
  )
}
