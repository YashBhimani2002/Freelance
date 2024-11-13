import React from 'react'
import { Inter , Mulish } from "next/font/google";


const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

export default function AskAnyQuestions() {
  return (
    <div className='pb-[100px] text-center w-full'>
        <div className='pt-[70px] px-[15px] xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[540px] mx-auto'>
            <h3 className={`mb-[10px] text-[#434343] md:text-[53px] text-[24px] ${mulish700.className} tracking-wide`}>Still have questions?</h3>
            <p className={`mb-[50px] lg:block hidden text-[22px] leading-[32px] text-[#323232] ${mulish400.className} tracking-wide` }>If you cannot find an answer to your question in our FAQ, you can <br/>always contact us</p>
            <p className={`mb-[50px] lg:hidden block md:text-[22px] text-base md:leading-[32px] leading-normal text-[#323232] ${mulish400.className} tracking-wide` }>If you cannot find an answer to your question in our FAQ, you can always contact us</p>
            <a href="/contact-us"><button  className={`sm:w-[240px] bg-[#286cac] text-[#fff] text-center rounded-[10px] mt-[5px] py-[6px] px-[12px] ${inter400.className}`}>Submit a Request</button></a>
        </div>
    </div>
  )
}
