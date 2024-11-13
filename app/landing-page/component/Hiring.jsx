// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Inter } from "next/font/google";
// import { useRouter } from "next/navigation";
// const inter900 = Inter({ subsets: ["latin"], weight: "900" });
// const inter600 = Inter({ subsets: ["latin"], weight: "600" });
// const inter400 = Inter({ subsets: ["latin"], weight: "400" });

// gsap.registerPlugin(ScrollTrigger);

// export default function Hiring() {
//   const router = useRouter();

//   const handleHiringGetStarted = () => {
//     router.push("/signup/Client");
//   };

//   useEffect(() => {
//     gsap.fromTo(
//       ".custome-background", // Target the element you want to animate
//       { opacity: 0, y: 100 }, // Initial state
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         scrollTrigger: {
//           trigger: ".custome-background", // Element that triggers the animation
//           start: "top bottom", // When the top of the element reaches the bottom of the viewport
//           end: "bottom top", // When the bottom of the element reaches the top of the viewport
//           scrub: true, // Smooth scrolling effect
//         },
//       }
//     );
//   }, []);

//   return (
//     <>
//       <div className="w-full">
//         <div className="font-Inter xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[540px] w-full sm:mx-auto lg:mb-[150px] mb-[50px]">
//           {/* -------------ready to start hiring section----------- */}
//           <div className="flex text-start w-full custome-background py-[75px] h-[280px] px-[110px] items-center rounded-[16px]">
//             <div className="w-[80%]">
//               <h1
//                 className={`${inter900.className} text-[26px] md:text-[32px] font-black text-white mb-[25px]`}
//               >
//                 Ready for Success?
//               </h1>
//               <p
//                 className={`${inter400.className} mb-[30px] w-[77%] text-white font-normal md:text-lg lg:text-[18px] md:text-[21px] text-[15px] tracking-wide`}
//               >
//                 Turn your ideas into reality with access to vetted
//                 professionals. Let Freelance support your success today.
//               </p>
//             </div>
//             <div className="w-[20%]">
//               <button
//                 onClick={handleHiringGetStarted}
//                 className={`${inter600.className} bg-white w-[150px] text-lg p-[13px] text-blue rounded-[10px] hover:bg-transparent border border-blue hover:text-blue transition-colors duration-300 ease-in-out`}
//               >
//                 Sign Up Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter900 = Inter({ subsets: ["latin"], weight: "900" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

gsap.registerPlugin(ScrollTrigger);

export default function Hiring() {
  const router = useRouter();

  const handleHiringGetStarted = () => {
    router.push("/signup");
  };

  useEffect(() => {
    gsap.fromTo(
      ".custome-background", // Target the element you want to animate
      { opacity: 0, y: 100 }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".custome-background", // Element that triggers the animation
          start: "top bottom", // When the top of the element reaches the bottom of the viewport
          end: "bottom top", // When the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrolling effect
        },
      }
    );
  }, []);

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="font-Inter w-full xl:w-[1140px] lg:w-[960px] mx-auto mb-[50px] lg:mb-[150px]">
          {/* -------------ready to start hiring section----------- */}
          <div className="flex flex-col sm:flex-row text-start w-full custome-background py-[30px] sm:py-[75px] px-[20px] sm:px-[30px] lg:px-[110px] justify-between items-center rounded-[16px]">
            <div className="w-full sm:w-[70%] md::w-[80%] mb-4 sm:mb-0">
              <h1
                className={`${inter900.className} text-[20px] sm:text-[26px] md:text-[32px] font-black text-white mb-[15px] sm:mb-[25px]`}
              >
                Ready for Success?
              </h1>
              <p
                className={`${inter400.className} mb-[20px] sm:mb-[30px] w-full sm:w-[77%] text-white font-normal text-[14px] sm:text-[15px] md:text-lg lg:text-[18px] md:text-[21px] tracking-wide`}
              >
                Turn your ideas into reality with access to vetted
                professionals. Let Freelance support your success today.
              </p>
            </div>
            <div className="w-full sm:w-[30%] md:w-[20%] text-center">
              <button
                onClick={handleHiringGetStarted}
                className={`${inter600.className} bg-white w-full sm:w-[150px] text-lg p-[10px] sm:p-[13px] text-blue rounded-[10px] hover:bg-transparent border border-blue hover:border-white hover:text-white transition-colors duration-300 ease-in-out`}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
