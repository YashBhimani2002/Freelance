// import Profe from "@/public/LandingPageImages/full-length-portrait-young-smiling-african-man 1 (1).png";
// import Profebg from "@/public/LandingPageImages/Rectangle 24376.png";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import { useRouter } from "next/navigation";

// const inter800 = Inter({ subsets: ["latin"], weight: "800" });
// const inter600 = Inter({ subsets: ["latin"], weight: "600" });
// const inter400 = Inter({ subsets: ["latin"], weight: "400" });

// export default function Opprtunities() {
//   const router = useRouter();
//   const handleGetStarted = () => {
//     router.push("/signup/Professional");
//   };
//   return (
//     <div className="font-Inter  lg:pt-[60px] py-[20px] w-full ">
//       <div className="flex flex-col-reverse md:flex-row   xl:pt-[140px]  px-[15px] w-full xl:w-[1140px] lg:w-[960px]  mx-auto">
//         <div className="w-full md:w-1/2 xl:w-[466px] lg-[385px] hidden sm:block backgroundImage rounded-tl-custom-tl rounded-br-custom-br">
//           <div className="w-[286px] rounded-[24px] bg-custom-orange absolute p-[15px] ml-[20%] mt-[-103px]">
//             <h1 className={`${inter600.className}  text-white text-[24px]`}>
//               Global Opportunities
//             </h1>
//             <p className="text-white text-[16px]">
//               Advance your career with access to a global pool of clients and
//               projects.
//             </p>
//           </div>

//           <Image
//             className="w-full mt-[-29%] ml-[40px]"
//             src={Profe}
//             style={{ maxWidth: "83%" }}
//             alt="professional_image"
//           />
//           <div className="w-[286px] rounded-[24px] m-[-8%]  bg-custom-orange absolute p-[15px]">
//             <h1 className={`${inter600.className}  text-white text-[24px]`}>
//               Flexibility and Control
//             </h1>
//             <p className="text-white text-[16px]">
//               Control when, where, and how <br /> you work.
//             </p>
//           </div>
//         </div>

//         <div className="w-6/6 md:w-1/2 xl:w-[555px] lg:w-[560px] md:ml-[20px] lg:ml-[95px] pr-[15px] flex flex-col justify-center">
//           <h5
//             className={`${inter600.className} custome_font text-blackText2  sm:text-base text-sm`}
//           >
//             Professionals can
//           </h5>
//           <div className="w-full md:w-1/2 xl:w-[24%]  block sm:hidden mb-[20px]">
//             <Image className="w-full" src={Profe} alt="professional_image" />
//           </div>
//           <h2
//             className={`${inter800.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-blackText`}
//           >
//             Access global opportunities
//           </h2>
//           <p
//             className={`${inter400.className} text-greytext text-base sm:text-lg font-normal my-3 xl:me-10`}
//           >
//             Meet clients from around the world and take your career to new
//             heights. Work wherever and whenever suits you. With FreeLance, you
//             remain in control.
//           </p>
//           <div className="md:my-10 mt-[20px] sm:mb-[40px] mb-[20px]">
//             <button
//               onClick={handleGetStarted}
//               className={`${inter600.className} custome-bl text-lg p-[13px] text-white rounded-[6px] hover:bg-transparent border  hover:text-blue transition-colors duration-300 ease-in-out w-[200px]`}
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Profe from "@/public/Man working with laptop.jpg";
import Profebg from "@/public/LandingPageImages/Rectangle 24376.png";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const inter800 = Inter({ subsets: ["latin"], weight: "800" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

export default function Opprtunities() {
  const router = useRouter();

  // Refs for animating specific elements
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const handleGetStarted = () => {
    // router.push("/signup");
    router.push(`/signup?userType=${encodeURIComponent('"Professional"')}`);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    // GSAP animations with ScrollTrigger
    gsap.fromTo(
      image,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      text,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: text,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      className="font-Inter lg:pt-[60px] sm:py-[20px] w-full"
      ref={sectionRef}
    >
      <div className="flex flex-col md:flex-row pt-0 sm:pt-[140px] md:pt-0 xl:pt-[140px] px-[15px] w-full xl:w-[1140px] lg:w-[960px] mx-auto">
        {/* Left section */}
        <div
          className="w-full md:w-[70%] xl:w-[466px] lg-[385px] hidden sm:block backgroundImage rounded-tl-custom-tl rounded-br-custom-br"
          ref={imageRef}
        >
          <div className="hidden lg:block  w-[286px] rounded-[24px] bg-custom-orange absolute p-[15px] ml-[70%] mt-[-90px]">
            <h1
              className={`${inter700.className} text-white text-[24px] leading-[23px] my-2`}
            >
              Global Opportunities
            </h1>
            <p className={`${inter400.className} text-white text-[16px]`}>
              Advance your career with access to a global pool of clients and
              projects.
            </p>
          </div>

          <Image
            className="w-full sm:mt-[-29%]  ml-[40px] max-w-[75%] md:max-w-[83%]"
            src={Profe}
            alt="professional_image"
          />
          <div className=" hidden lg:block  w-[57%] rounded-[24px] m-[-15%] bg-custom-orange absolute p-[15px]">
            <h1 className={`${inter600.className} text-white text-[24px]`}>
              Flexibility and Control
            </h1>
            <p className="text-white text-[16px]">
              Control when, where, and how <br /> you work.
            </p>
          </div>
        </div>

        {/* Right section */}
        <div
          className="w-6/6 md:w-1/2 xl:w-[555px] lg:w-[560px] md:ml-[20px] lg:ml-[95px] pr-[15px] flex flex-col justify-center"
          ref={textRef}
        >
          <div className="w-full md:w-1/2 xl:w-[24%] block sm:hidden mb-[20px]">
            <Image className="w-full" src={Profe} alt="professional_image" />
          </div>
          <h5
            className={`${inter600.className} custome_font text-blackText2 sm:text-base text-sm`}
          >
            Professionals can
          </h5>
          <h2
            className={`${inter800.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-blackText`}
          >
            Access global opportunities
          </h2>
          <p
            className={`${inter400.className} text-greytext text-base sm:text-lg font-normal my-3 xl:me-10`}
          >
            Meet clients from around the world and take your career to new
            heights. Work wherever and whenever suits you. With FreeLance, you
            remain in control.
          </p>
          <div className="md:my-4 mt-[20px] sm:mb-[40px] mb-[20px]">
            <button
              onClick={handleGetStarted}
              className={`${inter600.className} custome-bl text-lg p-[13px] text-white rounded-[6px] hover:bg-transparent border hover:text-blue transition-colors duration-300 ease-in-out w-[200px]`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
