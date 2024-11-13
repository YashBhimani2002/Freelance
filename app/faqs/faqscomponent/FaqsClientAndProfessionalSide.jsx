import React , {useState} from "react";
import { Inter , Mulish } from "next/font/google";
import ClientQuestions from "./ClientQuestions"
import ProfessionalQuestions from "./ProfessionalQuestions"
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });


export default function FaqsClientAndProfessionalSide() {
    const [activeTab, setActiveTab] = useState("client");

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  return (
    <div className=" md:py-[80px] py-[50px] w-full">
      <div className="xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[540px] mx-auto px-[15px] pt-[70px] ">
        <ul className="text-center inline-block w-full md:mb-[60px] mb-[20px]" id="myTab" role="tablist">
          <li className="inline-block mr-[20px] md:mb-[-1px] mb-[10px] w-full md:w-auto">
            <button  onClick={() => handleTabClick('client')} className={`${inter600.className} w-full md:w-auto py-[8px] px-[16px] border-none  rounded-[30px] leading-[24px] text-base hover:text-[#3C64B1] hover:bg-[#E9F1FF] bg-[${activeTab === 'client' ? '#E9F1FF' : 'transparent'}] text-[${activeTab === 'client' ? '#3C64B1' : '#000'}]`}>I’m a Client</button>
          </li>

          <li className="inline-block mr-[20px] md:mb-[-1px] mb-[10px] w-full md:w-auto">
            <button  onClick={() => handleTabClick('professional')} className={`${inter600.className} w-full md:w-auto hover:bg-[#E9F1FF] hover:text-[#3C64B1] py-[8px] px-[16px] border-none  rounded-[30px] leading-[24px] text-base bg-[${activeTab === 'professional' ? '#E9F1FF' : 'transparent'}] text-[${activeTab === 'professional' ? '#3C64B1' : '#000'}]` }>I’m a Professional</button>
          </li>
        </ul>
        <div className=" tab-content">
        {activeTab === 'client' && <ClientQuestions />}
        {activeTab === 'professional' && <ProfessionalQuestions />}
        </div>
      </div>
    </div>
  );
}
