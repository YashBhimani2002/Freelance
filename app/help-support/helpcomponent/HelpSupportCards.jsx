import React from 'react'
import cardphoto1 from '../../../public/help_card_1.png'
import cardphoto2 from '../../../public/help_card_2.png'
import cardphoto3 from '../../../public/help_card_3.png'
import { Inter , Mulish } from "next/font/google";
import { useRouter } from "next/navigation";

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });


export default function Helpcard() {
    const router = useRouter();
    const handleFaqClick = () => {
        window.location = '/faqs';
    }

    const handleSubmitRequestChange = () => {
        window.location = '/contact-us';
    }
  return (
    <>
       <div className="md:py-[80px] py-[50px] ">
           <div className='xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[540px] w-full  mx-auto px-[15px]  pt-[70px]'>
                    <div className=' max-h-fit sm:px-[15px] sm:mx-[-15px] md:flex lg:flex-none md:flex-wrap lg:flex-nowrap md:gap-y-5 lg:gap-y-0'>
                        <div className=' h-full xl:w-[380px] lg:w-[320px] md:w-[360px] sm:w-full w-full  xl:px-[15px] md:px-[15px]  xl:ml-[-15px]  md:ml-[-15px]  md:mr-0 mb-[30px] md:mb-0'>
                            {/* yha se d*/}
                            <div className=' xl:p-[43px] md:p-[20px] sm:mr-[-15px]  md:mr-0 px-[20px] py-[30px] sm:w-full bg-[#E9F1FF66] rounded-[30px] h-full'>
                                <div className=' '>
                                    <div className='flex justify-center md:mb-[60px] mb-[30px]'><img src={cardphoto1.src} alt="" className=''/></div>
                                    <h4 className={`${mulish700.className} text-box_clr xl:text-[33px] md:text-[30px] text-[21px] md:mb-[60px] mb-[30px] leading-tight text-center`}>Find answers to your questions</h4>
                                    <p className={`${mulish400.className} text-[#7E8082] md:mb-[60px] mb-[30px] leading-[22px] text-[18px] text-center`}>Our FAQ section contains answers to the most common queries we receive.</p>
                                    <div className='md:flex md:justify-center md:items-center w-full md:w-auto'>
                                       <button onClick={handleFaqClick} className={`bg-[#E9F1FF] hover:bg-[#1068AD] hover:text-[#fff] ${inter600.className} text-[18px] leading-[28px] text-box_clr text-center w-full md:w-auto py-[0.375rem] px-[0.75rem] rounded-[0.25rem] transition-colors duration-150 ease-in-out`}>Checkout the FAQs</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' xl:w-[380px] lg:w-[320px] md:w-[360px] sm:w-full w-full xl:px-[15px] lg:px-[15px] md:px-[15px] max-h-full   md:mr-[-15px] lg:mr-0 lg:ml-0 mb-[30px] md:mb-0' >
                        <div className='xl:p-[43px] md:p-[20px] bg-[#E9F1FF66] rounded-[30px] h-full px-[20px] py-[30px]'>
                                <div className=''>
                                    <div className='flex justify-center md:mb-[60px] mb-[30px]'><img src={cardphoto2.src} alt="" className=''/></div>
                                    <h4 className={`${mulish700.className} text-box_clr xl:text-[33px] md:text-[30px] text-[21px] mb-[30px] md:mb-[60px] leading-tight tracking-wide text-center`}>Ask us Anything</h4>
                                    <p className={`${mulish400.className} text-[#7E8082] md:mb-[60px] mb-[30px] md:leading-[22px] text-[18px] text-center`}>If you can’t find answers to your questions, you can submit a support request</p>
                                    <div className='md:flex md:justify-center md:items-center w-full md:w-auto'>
                                       <button onClick={handleSubmitRequestChange} className={`bg-[#E9F1FF] hover:bg-[#1068AD] hover:text-[#fff] ${inter600.className} text-[18px] leading-[28px] text-box_clr text-center py-[0.375rem]  w-full md:w-auto px-[0.75rem] rounded-[0.25rem] transition-colors duration-150 ease-in-out`}>Submit a Request</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' xl:w-[380px] md:w-[360px] sm:w-full w-full xl:px-[15px] xl:mr-[-15px] lg:mr-[-15px] md:ml-[-15px] lg:ml-0 lg:w-[320px]   md:px-[15px]    mb-[30px] md:mb-0   h-full' >
                        <div className=' xl:p-[43px] lg:p-[20px] md:p-[20px] bg-[#E9F1FF66] rounded-[30px] px-[20px] py-[30px]'>
                                <div className=''>
                                    <div className='flex justify-center md:mb-[60px] mb-[30px]'><img src={cardphoto3.src} alt="" className=''/></div>
                                    <h4 className={`${mulish700.className} text-box_clr xl:text-[33px] md:mb-[60px] mb-[30px] md:text-[30px] leading-tight text-[21px] text-center`}>Chat with <br/>Us</h4>
                                    <p className={`${mulish400.className} text-[#7E8082] md:mb-[60px] mb-[30px] md:leading-[22px] md:text-[18px] text-center  text-[18px]`}>If you can’t find answers to your questions, you can submit a support request</p>
                                    <div className='md:flex md:justify-center md:items-center w-full md:w-auto'>
                                       <button className={`bg-[#E9F1FF] hover:bg-[#1068AD] hover:text-[#fff] ${inter600.className} text-[18px] leading-[28px] text-box_clr text-center py-[0.375rem] w-full md:w-auto px-[0.75rem] rounded-[0.25rem] transition-colors duration-150 ease-in-out`}>Begin Chat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
           </div>
       </div>
    </>
  )
}
