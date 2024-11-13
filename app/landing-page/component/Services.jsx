// import Accounting from "@/public/LandingPageImages/Accounting 2.png";
// import ProductManagement from "@/public/LandingPageImages/productManagement2.png";
// import Legal from "@/public/LandingPageImages/legal2.png";
// import WebAndMobileDevelopment from "@/public/LandingPageImages/Mobile&web 2.png";
// import ArchitecturalDesign from "@/public/LandingPageImages/Architecture2.png";
// import Research from "@/public/LandingPageImages/Research2.png";
// import WritingAndEditing from "@/public/LandingPageImages/writing&editing2.png";
// import StrategyConsulting from "@/public/LandingPageImages/strategy2.png";
// import ProjectManagement from "@/public/LandingPageImages/ProjectMangement2.png";
// import RiskAnalysis from "@/public/LandingPageImages/Risk2.png";
// import DigitalMarketing from "@/public/LandingPageImages/DigitalMarketing 2.png";
// import GraphicsDesign from "@/public/LandingPageImages/Graphic2.png";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import gsap from "gsap";
// import { useEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const inter500italic = Inter({ subsets: ["latin"], weight: "500" });
// const inter500 = Inter({ subsets: ["latin"], weight: "500" });
// const inter800 = Inter({ subsets: ["latin"], weight: "800" });

// const boxesData = [
//   { name: "Accounting", icon: Accounting },
//   { name: "Product Management", icon: ProductManagement },
//   { name: "Legal", icon: Legal },
//   { name: "Web & Mobile Development", icon: WebAndMobileDevelopment },
//   { name: "Architectural Design", icon: ArchitecturalDesign },
//   { name: "Research", icon: Research },
//   { name: "Writing And Editing", icon: WritingAndEditing },
//   { name: "Strategy Consulting", icon: StrategyConsulting },
//   { name: "Project Management", icon: ProjectManagement },
//   { name: "Risk Analysis", icon: RiskAnalysis },
//   { name: "Digital Marketing", icon: DigitalMarketing },
//   { name: "Graphics Design", icon: GraphicsDesign },
// ];

// export default function Service() {
//   const h1Ref = useRef(null); // Create a reference to your h1 element

//   useEffect(() => {
//     // GSAP animation on scroll
//     gsap.from(h1Ref.current, {
//       scrollTrigger: {
//         trigger: h1Ref.current,
//         start: "top 80%", // Animation starts when the top of h1 hits 80% of viewport
//         end: "top 50%", // Animation ends when top of h1 reaches 50% of viewport
//         scrub: 2, // Higher scrub value for slower scroll-bound animation
//       },
//       y: 100, // Move the text from 100px down to its original position
//       opacity: 0, // Animate the opacity from 0 to 1
//       duration: 3, // Slow down by increasing duration (3 seconds instead of 1.5)
//       ease: "power2.out", // Use a slower ease for a more gradual effect
//     });
//   }, []);

//   const boxesRef = useRef([]);

//   useEffect(() => {
//     // Animate each box on scroll
//     boxesRef.current.forEach((box, index) => {
//       gsap.fromTo(
//         box,
//         {
//           opacity: 0,
//           y: 50, // Start slightly below the view
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           delay: index * 0.1, // Stagger the animation
//           ease: "power4.out",
//           scrollTrigger: {
//             trigger: box,
//             start: "top 80%", // Animation starts when the top of the box is 80% from the top of the viewport
//             toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
//           },
//         }
//       );
//     });
//   }, []);

//   return (
//     <div className=" w-full  ">
//       <div className=" lg:w-[68%]   md:w-[100%]  mx-0  lg:mx-auto px-[15px] ">
//         <h1
//           ref={h1Ref} // Attach the reference to your h1 element
//           className={`${inter800.className} text-center text-3xl sm:text-5xl text-blackText xl:mb-[80px] lg:mb-[80px]`}
//         >
//           Services curated for you
//         </h1>

//         <div className="grid grid-cols-2 md:grid-cols-6 w-full ml-0 gap-y-[22px] lg:pb-[70px] pb-[40px] gap-[3rem]">
//           {boxesData.map((list, boxIndex) => (
//             <div
//               key={boxIndex}
//               ref={(el) => (boxesRef.current[boxIndex] = el)}
//               className="on_hover flex items-start flex-row sm:flex-col justify-center w-[170px] h-[160px] gap-[1rem] px-[15px] bg-box_bg py-[4px] bg-gradient-custom rounded-[24px] gradient-hover"
//             >
//               <Image src={list.icon} alt={list.icon} />
//               <p className={`${inter500.className} text-[16px] text-start`}>
//                 {list.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { Inter } from "next/font/google";

// // Import images
// import Accounting from "@/public/LandingPageImages/Accounting 2.png";
// import ProductManagement from "@/public/LandingPageImages/productManagement2.png";
// import Legal from "@/public/LandingPageImages/legal2.png";
// import WebAndMobileDevelopment from "@/public/LandingPageImages/Mobile&web 2.png";
// import ArchitecturalDesign from "@/public/LandingPageImages/Architecture2.png";
// import Research from "@/public/LandingPageImages/Research2.png";
// import WritingAndEditing from "@/public/LandingPageImages/writing&editing2.png";
// import StrategyConsulting from "@/public/LandingPageImages/strategy2.png";
// import ProjectManagement from "@/public/LandingPageImages/ProjectMangement2.png";
// import RiskAnalysis from "@/public/LandingPageImages/Risk2.png";
// import DigitalMarketing from "@/public/LandingPageImages/DigitalMarketing 2.png";
// import GraphicsDesign from "@/public/LandingPageImages/Graphic2.png";

// gsap.registerPlugin(ScrollTrigger);

// const inter500 = Inter({ subsets: ["latin"], weight: "500" });
// const inter800 = Inter({ subsets: ["latin"], weight: "800" });

// const boxesData = [
//   { name: "Accounting", icon: Accounting },
//   { name: "Product Management", icon: ProductManagement },
//   { name: "Legal", icon: Legal },
//   { name: "Web & Mobile Development", icon: WebAndMobileDevelopment },
//   { name: "Architectural Design", icon: ArchitecturalDesign },
//   { name: "Research", icon: Research },
//   { name: "Writing And Editing", icon: WritingAndEditing },
//   { name: "Strategy Consulting", icon: StrategyConsulting },
//   { name: "Project Management", icon: ProjectManagement },
//   { name: "Risk Analysis", icon: RiskAnalysis },
//   { name: "Digital Marketing", icon: DigitalMarketing },
//   { name: "Graphics Design", icon: GraphicsDesign },
// ];

// export default function Service() {
//   const h1Ref = useRef(null);
//   const boxesRef = useRef([]);

//   useEffect(() => {
//     // GSAP animation for h1 text
//     if (h1Ref.current) {
//       gsap.fromTo(
//         h1Ref.current,
//         { opacity: 0, y: 100 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 3,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: h1Ref.current,
//             start: "top 80%",
//             end: "top 50%",
//             scrub: 1,
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }

//     // GSAP animation for each service box
//     if (boxesRef.current) {
//       boxesRef.current.forEach((box, index) => {
//         gsap.fromTo(
//           box,
//           { opacity: 0, y: 50 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             delay: index * 0.15,
//             ease: "power4.out",
//             scrollTrigger: {
//               trigger: box,
//               start: "top 80%", // Animation starts when the box enters the viewport
//               end: "top 50%", // Animation ends when the box reaches 50% of viewport
//               toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
//             },
//           }
//         );
//       });
//     }

//     // Refresh ScrollTrigger to account for any layout changes
//     ScrollTrigger.refresh();
//   }, []);

//   useEffect(() => {
//     // Optional: refresh ScrollTrigger on window resize to handle layout changes
//     window.addEventListener("resize", ScrollTrigger.refresh);
//     return () => {
//       window.removeEventListener("resize", ScrollTrigger.refresh);
//     };
//   }, []);

//   return (
//     <div className="w-full">
//       <div className="lg:w-[68%] md:w-[100%] mx-0 lg:mx-auto px-[15px]">
//         <h1
//           ref={h1Ref}
//           className={`${inter800.className} text-center text-3xl sm:text-5xl text-blackText xl:mb-[80px] lg:mb-[80px]`}
//         >
//           Services curated for you
//         </h1>

//         <div className="grid grid-cols-2 md:grid-cols-6 w-full ml-0 gap-y-[22px] lg:pb-[70px] pb-[40px] gap-[3rem]">
//           {boxesData.map((list, boxIndex) => (
//             <div
//               key={boxIndex}
//               ref={(el) => (boxesRef.current[boxIndex] = el)}
//               className="on_hover flex items-start flex-row sm:flex-col justify-center w-[170px] h-[160px] gap-[1rem] px-[15px] bg-box_bg py-[4px] bg-gradient-custom rounded-[24px] gradient-hover"
//             >
//               <Image src={list.icon} alt={list.name} loading="lazy" />
//               <p className={`${inter500.className} text-[16px] text-start`}>
//                 {list.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { Inter } from "next/font/google";

// // Import images
// import Accounting from "@/public/LandingPageImages/Accounting 2.png";
// import ProductManagement from "@/public/LandingPageImages/productManagement2.png";
// import Legal from "@/public/LandingPageImages/legal2.png";
// import WebAndMobileDevelopment from "@/public/LandingPageImages/Mobile&web 2.png";
// import ArchitecturalDesign from "@/public/LandingPageImages/Architecture2.png";
// import Research from "@/public/LandingPageImages/Research2.png";
// import WritingAndEditing from "@/public/LandingPageImages/writing&editing2.png";
// import StrategyConsulting from "@/public/LandingPageImages/strategy2.png";
// import ProjectManagement from "@/public/LandingPageImages/ProjectMangement2.png";
// import RiskAnalysis from "@/public/LandingPageImages/Risk2.png";
// import DigitalMarketing from "@/public/LandingPageImages/DigitalMarketing 2.png";
// import GraphicsDesign from "@/public/LandingPageImages/Graphic2.png";

// gsap.registerPlugin(ScrollTrigger);

// const inter500 = Inter({ subsets: ["latin"], weight: "500" });
// const inter800 = Inter({ subsets: ["latin"], weight: "800" });

// const boxesData = [
//   { name: "Accounting", icon: Accounting },
//   { name: "Product Management", icon: ProductManagement },
//   { name: "Legal", icon: Legal },
//   { name: "Web & Mobile Development", icon: WebAndMobileDevelopment },
//   { name: "Architectural Design", icon: ArchitecturalDesign },
//   { name: "Research", icon: Research },
//   { name: "Writing And Editing", icon: WritingAndEditing },
//   { name: "Strategy Consulting", icon: StrategyConsulting },
//   { name: "Project Management", icon: ProjectManagement },
//   { name: "Risk Analysis", icon: RiskAnalysis },
//   { name: "Digital Marketing", icon: DigitalMarketing },
//   { name: "Graphics Design", icon: GraphicsDesign },
// ];

// export default function Service() {
//   const h1Ref = useRef(null);
//   const boxesRef = useRef([]);

//   useEffect(() => {
//     // GSAP animation for h1 text
//     if (h1Ref.current) {
//       gsap.fromTo(
//         h1Ref.current,
//         { opacity: 0, y: 100 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 2,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: h1Ref.current,
//             start: "top 80%",
//             end: "top 60%",
//             scrub: 1,
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }

//     // GSAP timeline for the grid boxes
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".grid",
//         start: "top 80%",
//         end: "top 40%",
//         scrub: 1,
//         toggleActions: "play none none reverse",
//         onUpdate: (self) => {
//           // Optional: You can log the progress or other metrics here
//           // console.log(self.progress);
//         },
//       },
//     });

//     boxesRef.current.forEach((box, index) => {
//       tl.fromTo(
//         box,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.0,
//           delay: index * 0.1,
//           ease: "power4.out",
//         },
//         index * 0.1
//       );
//     });

//     // Cleanup function to kill ScrollTriggers if needed
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   useEffect(() => {
//     // Handle resize events to refresh ScrollTrigger
//     const handleResize = () => {
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="w-full">
//       <div className="lg:w-[68%] md:w-[100%] mx-0 lg:mx-auto px-[15px]">
//         <h1
//           ref={h1Ref}
//           className={`${inter800.className} text-center text-3xl sm:text-5xl text-blackText xl:mb-[80px] lg:mb-[80px]`}
//         >
//           Services curated for you
//         </h1>

//         <div className="grid grid-cols-2 md:grid-cols-6 w-full ml-0 gap-y-[22px] lg:pb-[70px] pb-[40px] gap-[3rem]">
//           {boxesData.map((list, boxIndex) => (
//             <div
//               key={boxIndex}
//               ref={(el) => (boxesRef.current[boxIndex] = el)}
//               className="on_hover flex items-start flex-row sm:flex-col justify-center w-[170px] h-[160px] gap-[1rem] px-[15px] bg-box_bg py-[4px] bg-gradient-custom rounded-[24px] gradient-hover"
//             >
//               <Image src={list.icon} alt={list.name} loading="lazy" />
//               <p className={`${inter500.className} text-[16px] text-start`}>
//                 {list.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Inter } from "next/font/google";

// Import images
import Accounting from "@/public/LandingPageImages/Accounting 2.png";
import ProductManagement from "@/public/LandingPageImages/productManagement2.png";
import Legal from "@/public/LandingPageImages/legal2.png";
import WebAndMobileDevelopment from "@/public/LandingPageImages/Mobile&web 2.png";
import ArchitecturalDesign from "@/public/LandingPageImages/Architecture2.png";
import Research from "@/public/LandingPageImages/Research2.png";
import WritingAndEditing from "@/public/LandingPageImages/writing&editing2.png";
import StrategyConsulting from "@/public/LandingPageImages/strategy2.png";
import ProjectManagement from "@/public/LandingPageImages/ProjectMangement2.png";
import RiskAnalysis from "@/public/LandingPageImages/Risk2.png";
import DigitalMarketing from "@/public/LandingPageImages/DigitalMarketing 2.png";
import GraphicsDesign from "@/public/LandingPageImages/Graphic2.png";

gsap.registerPlugin(ScrollTrigger);

const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const inter800 = Inter({ subsets: ["latin"], weight: "800" });

const boxesData = [
  { name: "Accounting", icon: Accounting },
  { name: "Product Management", icon: ProductManagement },
  { name: "Legal", icon: Legal },
  { name: "Web & Mobile Development", icon: WebAndMobileDevelopment },
  { name: "Architectural Design", icon: ArchitecturalDesign },
  { name: "Research", icon: Research },
  { name: "Writing & Editing", icon: WritingAndEditing },
  { name: "Strategy Consulting", icon: StrategyConsulting },
  { name: "Project Management", icon: ProjectManagement },
  { name: "Risk Analysis", icon: RiskAnalysis },
  { name: "Digital Marketing", icon: DigitalMarketing },
  { name: "Graphics Design", icon: GraphicsDesign },
];

export default function Service() {
  const h1Ref = useRef(null);
  const boxesRef = useRef([]);
  

  useEffect(() => {
    // GSAP animation for h1 text
    if (h1Ref.current) {
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: h1Ref.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  
    // GSAP timeline for the grid boxes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".grid",
        start: "top 60%", // Trigger the animation when the grid is near the top of the viewport
        end: "top 10%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });
  
    boxesRef.current.forEach((box, index) => {
      tl.fromTo(
        box,
        { opacity: 0 }, // Start at opacity 0
        {
          opacity: 1,
          duration: 5, // Increase duration for a slower fade-in
          delay: index * 1, // Increase stagger delay for a smoother effect
          ease: "power2.out",
        },
        index * 0.5 // Use stagger index for timing
      );
    });
  
    // Cleanup function to kill ScrollTriggers if needed
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  
  

  // useEffect(() => {
  //   // GSAP animation for h1 text
  //   if (h1Ref.current) {
  //     gsap.fromTo(
  //       h1Ref.current,
  //       { opacity: 0, y: 100 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 2,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: h1Ref.current,
  //           start: "top 80%",
  //           end: "top 60%",
  //           scrub: 1,
  //           toggleActions: "play none none reverse",
  //         },
  //       }
  //     );
  //   }

  //   // GSAP timeline for the grid boxes
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".grid",
  //       start: "top 80%",
  //       end: "top 40%",
  //       scrub: 1,
  //       toggleActions: "play none none reverse",
  //     },
  //   });

  //   boxesRef.current.forEach((box, index) => {
  //     tl.fromTo(
  //       box,
  //       { opacity: 0, y: 50 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1.0,
  //         delay: index * 0.1,
  //         ease: "power4.out",
  //       },
  //       index * 0.1
  //     );
  //   });

  //   // Cleanup function to kill ScrollTriggers if needed
  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  useEffect(() => {
    // Handle resize events to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="lg:w-[68%] md:w-[100%] mx-0 lg:mx-auto px-[15px] custome-top">
        <h1
          ref={h1Ref}
          className={`${inter800.className} text-center text-2xl sm:text-4xl lg:text-5xl text-blackText xl:mb-[80px] lg:mb-[80px] mb-[40px] !leading-10`}
        >
          Services curated for you
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 w-full ml-[35px]  md:ml-0 gap-y-[22px] lg:pb-[70px] pb-[40px] gap-[0rem] md:gap-[3rem]">
          {boxesData.map((list, boxIndex) => (
            <div
              key={boxIndex}
              ref={(el) => (boxesRef.current[boxIndex] = el)}
              className="on_hover flex items-start flex-col justify-center w-[120px] h-[140px] sm:w-[170px] sm:h-[160px] gap-[1rem] px-[10px] sm:px-[15px] bg-box_bg py-[4px] bg-gradient-custom rounded-[24px] gradient-hover"
            >
              <Image src={list.icon} alt={list.name} loading="lazy" />
              <p
                className={`${inter500.className} text-[12px] sm:text-[16px] text-start`}
              >
                {list.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
