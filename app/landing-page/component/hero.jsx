// import React, { useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ".././style1.css";
// import { Inter } from "next/font/google";
// import { useRouter } from "next/navigation";
// import banerImage1 from "../../../components/assets/Footer/joyful-dark-skinned-smiling-female-has-dark-hair-curly-hair-points-aside-with-thumb-1-66e2dfba1068e.webp";
// import banerImage2 from "../../../components/assets/Footer/banner2.png";
// import banerImage3 from "../../../components/assets/Footer/banner3.png";
// import helpoverlay from "../../../public/helpoverlay.png";

// const inter800 = Inter({ subsets: ["latin"], weight: "800" });
// const inter500 = Inter({ subsets: ["latin"], weight: "500" });
// const inter600 = Inter({ subsets: ["latin"], weight: "600" });

// export default function Hero() {
//   const router = useRouter();
//   const sliderRef = useRef();

//   const handleFindTalent = () => {
//     router.push("/signup/Client");
//   };
//   const handleFindWork = () => {
//     router.push("/signup/Professional");
//   };

//   return (
//     <div class="relative w-full h-full overflow-hidden">
//       <div className="flex w-full">
//         <div className="w-1/2 flex justify-center">
//           {/* <div className="w-[70%]">
//             <h2 class="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold leading-tight mb-4">
//               Hire world-class talent for your projects
//             </h2>
//             <p class="text-lg text-grey-700 font-medium mb-8">
//               Praiki facilitates easy access to professional services in Nigeria
//               and other African countries.
//             </p>
//             <div class="flex space-x-3">
//               <button class="bg-blue-600 text-white py-3 px-5 rounded-md hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-150">
//                 Find Talent
//               </button>
//               <button class="bg-white text-blue-600 border border-blue-600 py-3 px-5 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-150">
//                 Find Work
//               </button>
//             </div>
//           </div> */}
//           <div className="absolute top-0 left-0 w-full h-4/5 flex md:items-center md:justify-center">
//             <div className="banner pr-[45%]  lg:pr-[800px] pt-[45px] lg:pt-0 pl-[30px] lg:pl-0">
//               <h2
//                 className={`${inter800.className} text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold md:leading-[2rem] xl:leading-[70px] md:tracking-tight mb-[20px] sm:mb-[38px] line-height:2.25rem`}
//               >
//                 Hire world-class talent for your projects
//               </h2>
//               <p
//                 className={`${inter500.className} sm:mb-[100px] mb-[30px] md:text-greytext text-hero_clr text- font-medium sm:leading-7 leading-5 md:text-basic lg:text-lg me-10 lg:me-20 w-[100%]`}
//               >
//                 Praiki facilitates easy access to professional services in
//                 Nigeria and other African countries.
//               </p>
//               <div className="sm:text-lg text-sm font-semibold flex items-start justify-center pr-0 md:pr-[100px]">
//                 <button
//                   onClick={handleFindTalent}
//                   className={`${inter600.className} bg-blue text-medium w-[11rem] py-3 px-3 text-white rounded hover:bg-white border border-blue hover:text-blue transition-colors duration-100  mr-[15px]    ease-in-out`}
//                 >
//                   Find Talent
//                 </button>
//                 <button
//                   onClick={handleFindWork}
//                   className={`${inter600.className} text-medium w-[11rem] py-3 px-3 rounded bg-custom-background border border-white shadow-custom`}
//                 >
//                   Find Work
//                 </button>

//                 {/* <button
//                   onClick={handleFindWork}
//                   className={`${inter600.className} text:medium w-36 py-3 px-3 rounded bg-custom-background border border-btn_border`}
//                 >
//                   Find Work
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2">
//           {" "}
//           <img
//             width={"894px"}
//             height={"652px"}
//             src={banerImage1.src}
//             alt="Banner 1"
//             className="rounded-[10px]  md:rounded-0 scale-0-76 mt-[-16%]"
//           />{" "}
//         </div>
//       </div>
//       {/* <div class="md:flex md:items-start md:justify-between"> */}
//       {/* <!-- Text Section --> */}
//       {/* <div class="md:w-1/2 lg:w-2/5 p-6 m-auto">
//           <h2 class="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold leading-tight mb-4">
//             Hire world-class talent for your projects
//           </h2>
//           <p class="text-lg text-grey-700 font-medium mb-8">
//             Praiki facilitates easy access to professional services in Nigeria
//             and other African countries.
//           </p>
//           <div class="flex space-x-3">
//             <button class="bg-blue-600 text-white py-3 px-5 rounded-md hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-150">
//               Find Talent
//             </button>
//             <button class="bg-white text-blue-600 border border-blue-600 py-3 px-5 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-150">
//               Find Work
//             </button>
//           </div>
//         </div> */}

//       {/* <!-- Image Section --> */}
//       {/* <div class="md:w-1/2 lg:w-[45%] p-6">
//           <img
//             width={"894px"}
//             height={"652px"}
//             src={banerImage1.src}
//             alt="Banner 1"
//             className="rounded-[10px]  md:rounded-0 scale-0-76 mt-[-16%]"
//           />{" "}
//         </div> */}
//       {/* </div> */}
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ".././style1.css";
// import { Inter } from "next/font/google";
// import { useRouter } from "next/navigation";
// import banerImage1 from "../../../components/assets/Footer/joyful-dark-skinned-smiling-female-has-dark-hair-curly-hair-points-aside-with-thumb-1-66e2dfba1068e.webp";
// import banerImage2 from "../../../components/assets/Footer/banner2.png";
// import banerImage3 from "../../../components/assets/Footer/banner3.png";
// import helpoverlay from "../../../public/helpoverlay.png";

// const inter800 = Inter({ subsets: ["latin"], weight: "800" });
// const inter500 = Inter({ subsets: ["latin"], weight: "500" });
// const inter600 = Inter({ subsets: ["latin"], weight: "600" });

// export default function Hero() {
//   const router = useRouter();
//   const [scrollY, setScrollY] = useState(0);

//   const handleFindTalent = () => {
//     router.push("/signup/Client");
//   };
//   const handleFindWork = () => {
//     router.push("/signup/Professional");
//   };

//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <div className="flex w-full">
//         <div className="w-1/2 flex justify-center">
//           <div className="absolute top-0 left-0 w-full h-4/5 flex md:items-center md:justify-center">
//             <div
//               className={`parallax pr-[45%] lg:pr-[800px] pt-[45px] lg:pt-0 pl-[30px] lg:pl-0 ${
//                 scrollY > 0 ? "scrolled" : ""
//               }`}
//               style={{ "--scroll-y": `${scrollY}px` }}
//             >
//               <h2
//                 className={`${inter800.className} text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold md:leading-[2rem] xl:leading-[70px] md:tracking-tight mb-[20px] sm:mb-[38px] line-height:2.25rem`}
//               >
//                 Hire world-class talent for your projects
//               </h2>
//               <p
//                 className={`${inter500.className} sm:mb-[100px] mb-[30px] md:text-greytext text-hero_clr text- font-medium sm:leading-7 leading-5 md:text-basic lg:text-lg me-10 lg:me-20 w-[100%]`}
//               >
//                 Praiki facilitates easy access to professional services in
//                 Nigeria and other African countries.
//               </p>
//               <div className="sm:text-lg text-sm font-semibold flex items-start justify-center pr-0 md:pr-[100px]">
//                 <button
//                   onClick={handleFindTalent}
//                   className={`${inter600.className} bg-blue text-medium w-[11rem] py-3 px-3 text-white rounded hover:bg-white border border-blue hover:text-blue transition-colors duration-100  mr-[15px] ease-in-out`}
//                 >
//                   Find Talent
//                 </button>
//                 <button
//                   onClick={handleFindWork}
//                   className={`${inter600.className} text-medium w-[11rem] py-3 px-3 rounded bg-custom-background border border-white shadow-custom`}
//                 >
//                   Find Work
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2">
//           <img
//             width={"894px"}
//             height={"652px"}
//             src={banerImage1.src}
//             alt="Banner 1"
//             className="rounded-[10px] md:rounded-0 scale-0-76 mt-[-16%]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import banerImage1 from "../../../components/assets/Footer/joyful-dark-skinned-smiling-female-has-dark-hair-curly-hair-points-aside-with-thumb-1-66e2dfba1068e.webp";

// const Hero = () => {
//   const router = useRouter();
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const translateY = scrollY * 0.5; // Adjust the multiplier for the effect

//   const handleFindTalent = () => {
//     router.push("/signup/Client");
//   };

//   const handleFindWork = () => {
//     router.push("/signup/Professional");
//   };

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <div className="flex w-full">
//         <div className="w-1/2 flex justify-center">
//           <div className="absolute top-0 left-0 w-full h-4/5 flex md:items-center md:justify-center">
//             <div className="banner pr-[45%] lg:pr-[800px] pt-[45px] lg:pt-0 pl-[30px] lg:pl-0">
//               <h2
//                 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold md:leading-[2rem] xl:leading-[70px] md:tracking-tight mb-[20px] sm:mb-[38px] scroll-jumping-text"
//                 style={{ transform: `translateY(${translateY}px)` }}
//               >
//                 Hire world-class talent for your projects
//               </h2>
//               <p
//                 className="sm:mb-[100px] mb-[30px] md:text-greytext text-hero_clr text- font-medium sm:leading-7 leading-5 md:text-basic lg:text-lg me-10 lg:me-20 w-[100%] scroll-jumping-text"
//                 style={{ transform: `translateY(${translateY}px)` }}
//               >
//                 Praiki facilitates easy access to professional services in
//                 Nigeria and other African countries.
//               </p>
//               <div className="sm:text-lg text-sm font-semibold flex items-start justify-center pr-0 md:pr-[100px]">
//                 <button
//                   onClick={handleFindTalent}
//                   className="bg-blue text-medium w-[11rem] py-3 px-3 text-white rounded hover:bg-white border border-blue hover:text-blue transition-colors duration-100 mr-[15px] ease-in-out"
//                 >
//                   Find Talent
//                 </button>
//                 <button
//                   onClick={handleFindWork}
//                   className="text-medium w-[11rem] py-3 px-3 rounded bg-custom-background border border-white shadow-custom"
//                 >
//                   Find Work
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2">
//           <img
//             width={"894px"}
//             height={"652px"}
//             src={banerImage1.src}
//             alt="Banner 1"
//             className="rounded-[10px] md:rounded-0 scale-0-76 mt-[-16%]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import banerImage1 from "../../../components/assets/Footer/joyful-dark-skinned-smiling-female-has-dark-hair-curly-hair-points-aside-with-thumb-1-66e2dfba1068e.webp";
// import banerImage2 from "../../../components/assets/Footer/banner2.png";
// import banerImage3 from "../../../components/assets/Footer/banner3.png";
// import helpoverlay from "../../../public/helpoverlay.png";
// import ".././style1.css"; // Ensure bounce animation CSS is imported

// const Hero = () => {
//   const router = useRouter();
//   const [isBouncing, setIsBouncing] = useState(false);
//   const textRef = useRef(null);
//   const timerRef = useRef(null);

//   const handleFindTalent = () => {
//     router.push("/signup/Client");
//   };

//   const handleFindWork = () => {
//     router.push("/signup/Professional");
//   };

//   const handleScroll = () => {
//     if (textRef.current) {
//       const rect = textRef.current.getBoundingClientRect();
//       const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

//       if (isVisible) {
//         if (!isBouncing) {
//           setIsBouncing(true);
//           // Remove bounce class after animation duration
//           if (timerRef.current) clearTimeout(timerRef.current);
//           timerRef.current = setTimeout(() => {
//             setIsBouncing(false);
//           }, 1000); // Match the duration of the animation
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [isBouncing]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <div className="flex w-full">
//         <div className="w-1/2 flex justify-center">
//           <div className="absolute top-0 left-0 w-full h-4/5 flex md:items-center md:justify-center">
//             <div className="banner pr-[45%] lg:pr-[800px] pt-[45px] lg:pt-0 pl-[30px] lg:pl-0">
//               <h2
//                 ref={textRef}
//                 className={`text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold md:leading-[2rem] xl:leading-[70px] md:tracking-tight mb-[20px] sm:mb-[38px] ${
//                   isBouncing ? "bounce" : ""
//                 }`}
//               >
//                 Hire world-class talent for your projects
//               </h2>
//               <p className="sm:mb-[100px] mb-[30px] md:text-greytext text-hero_clr text- font-medium sm:leading-7 leading-5 md:text-basic lg:text-lg me-10 lg:me-20 w-[100%]">
//                 Praiki facilitates easy access to professional services in
//                 Nigeria and other African countries.
//               </p>
//               <div className="sm:text-lg text-sm font-semibold flex items-start justify-center pr-0 md:pr-[100px]">
//                 <button
//                   onClick={handleFindTalent}
//                   className="bg-blue text-medium w-[11rem] py-3 px-3 text-white rounded hover:bg-white border border-blue hover:text-blue transition-colors duration-100 mr-[15px] ease-in-out"
//                 >
//                   Find Talent
//                 </button>
//                 <button
//                   onClick={handleFindWork}
//                   className="text-medium w-[11rem] py-3 px-3 rounded bg-custom-background border border-white shadow-custom"
//                 >
//                   Find Work
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2">
//           <img
//             width={"894px"}
//             height={"652px"}
//             src={banerImage1.src}
//             alt="Banner 1"
//             className="rounded-[10px] md:rounded-0 scale-0-76 mt-[-16%]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ".././style1.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import banerImage1 from "../../../public/findJob.jpg";
import banerImage2 from "../../../components/assets/Footer/banner2.png";
import banerImage3 from "../../../components/assets/Footer/banner3.png";
import helpoverlay from "../../../public/helpoverlay.png";

const inter800 = Inter({ subsets: ["latin"], weight: "800" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });

export default function Hero() {
  const router = useRouter();
  const sliderRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position

  const handleFindTalent = () => {
    // router.push("/signup");
    router.push(`/signup?userType=${encodeURIComponent('"Client"')}`);
  };
  const handleFindWork = () => {
    router.push("/praiki-find-work");
  };

  // Effect to track scroll and update the scroll position
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
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex flex-col md:flex-row  w-full">
        <div className="md:w-1/2 flex justify-center">
          <div className=" custome-position  top-0 left-0 w-full h-4/5 flex md:items-center md:justify-center">
            <div className="banner w-auto pr-[30px] md:pr-[45%] xl:pr-[800px] pt-[45px] lg:pt-0 pl-[30px]">
              <h2
                className={`${inter800.className} sm:w-auto md:w-auto lg:w-[30rem] animation text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-blue font-extrabold md:leading-[2rem] xl:leading-[70px] md:tracking-tight mb-[20px] sm:mb-[38px]`}
                // Invert the translateY based on scroll position
                style={{
                  transform: `translateY(${scrollPosition * -0.3}px)`,
                }}
              >
                Hire world-class talent for your projects
              </h2>
              <p
                className={`${inter500.className} animation sm:mb-[90px] mb-[30px] md:text-greytext text-hero_clr text- font-medium sm:leading-7 leading-5 md:text-basic lg:text-lg me-10 lg:me-20 w-[100%]`}
                style={{
                  transform: `translateY(${scrollPosition * -0.3}px)`,
                }}
              >
                FreeLance facilitates easy access to professional services in
                Nigeria and other African countries.
              </p>
              <div className="sm:text-lg text-sm font-semibold flex items-start md:justify-center pr-0 md:pr-[100px]">
                <button
                  onClick={handleFindTalent}
                  className={`${inter600.className} bg-blue text-medium sm:w-[11rem] py-3 px-3 text-white rounded hover:bg-white border border-blue hover:text-blue transition-colors duration-100  mr-[15px] ease-in-out`}
                >
                  Find Talent
                </button>
                <button
                  onClick={handleFindWork}
                  className={`${inter600.className}  shadow  text-medium sm:w-[11rem] py-3 px-3 rounded bg-custom-background border border-color  shadow-custom transition-colors hover:border-blue hover:text-blue`}
                >
                  Find Work
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w:full md:w-1/2">
          <img
            width={"894px"}
            height={"652px"}
            src={banerImage1.src}
            alt="Banner 1"
            className="rounded-[10px] md:rounded-0 scale-0-76 mt-[-10%]"
          />
        </div>
      </div>
    </div>
  );
}
