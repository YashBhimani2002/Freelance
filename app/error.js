"use client"
import React from 'react';
import ErrorImage from "../components/assets/ApiError.jpg"
import Image from "next/image";
import { Inter } from 'next/font/google';

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="flex flex-1 justify-center items-center flex-col mt-[21vh]">
    <Image src={ErrorImage} className='w-[17rem] h-[8rem] md:w-[23rem] md:h-[12rem] lg:w-[29rem] lg:h-[13rem]' />
    <p className={`text-center ${inter600.className} py-2`}>Oops, there is an error! </p>
    <button
    type="button"
    className={`${inter400.className} border border-transparent bg-[#190058] text-white rounded-full py-2 px-8 hover:border-[#190058] hover:bg-white hover:text-[#190058]`}
        onClick={() => reset()}
  >
    Try again?
    </button>
    </div>
    // <div>
    //   <h2>Something went wrong!</h2>
    //   <button onClick={() => reset()}>Try again</button>
    // </div>
  );
}
