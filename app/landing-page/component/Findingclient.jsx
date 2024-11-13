// import client from "@/public/LandingPageImages/client.jpg";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Accounting from "@/public/LandingPageImages/Frame 1261154863.png";
// import Accounting2 from "@/public/LandingPageImages/Frame 1261154864.png";
// import Accounting3 from "@/public/LandingPageImages/Frame 1261154865.png";

// import { Inter } from "next/font/google";

// const inter800 = Inter({ subsets: ["latin"], weight: "800" });
// const inter600 = Inter({ subsets: ["latin"], weight: "600" });
// const inter400 = Inter({ subsets: ["latin"], weight: "400" });

// const Fileicon = [{ icon: Accounting }];
// const Fileicon2 = [{ icon: Accounting2 }];
// const Fileicon3 = [{ icon: Accounting3 }];

// const listClient = [
//   {
//     heading: "Vetted Professionals",
//     description:
//       "Connect to our network of vetted independent professionals with proven expertise.",
//   },
// ];

// const listClient2 = [
//   {
//     heading: "Dedicated Support",
//     description:
//       "We support you throughout your project to help match you to the right professionals and ensure project success.",
//   },
// ];

// const listClient3 = [
//   {
//     heading: "Advanced Tools",
//     description:
//       "Improve your project success and overall productivity with our unique suite of tools for price negotiation, contract and deliverables.",
//   },
// ];

// export default function Client() {
//   const router = useRouter();
//   const handleStartProject = () => {
//     router.push("/signup/Client");
//   };
//   const iconSrc = Fileicon[0].icon;
//   const iconSrc2 = Fileicon2[0].icon;
//   const iconSrc3 = Fileicon3[0].icon;

//   return (
//     <div className=" w-full">
//       <div className="w-fit-content flex flex-col md:flex-row  font-Inter pt-[40px] md:px-[0px] px-[10px] md:pt-[70px] mx-auto ">
//         <div className="w-6/6  xl:w-[570px] lg:w-[480px] md:w-[360px]  xl:pr-[15px] lg:pr-[15px] md:pr-[15px] pr-[15px]">
//           <div
//             className={`${inter600.className} text-blue text-base text-[16px] custome_font sm:mb-[7px] mb-[10px]`}
//           >
//             Clients
//           </div>
//           <h2
//             className={`${inter800.className}  md:w-[447px] lg:mb-[35px] md:mb-[30px] text-2xl lg:leading-[52px] leading-7 sm:leading-[40px] sm:text-4xl md:text-[35px] lg:text-5xl font-bold text-blackText `}
//           >
//             Finding talented professionals has never been easier
//           </h2>
//         </div>

//         <div className="flex flex-col w-[416px]">
//           <div className="hidden sm:block w-full   md:w-[416px]  xl:mt-[150px] lg:mt-[150px] md:mt-[150px] sm:mt-[60px]">
//             <Image
//               className="w-full rounded-[8px]"
//               src={client}
//               alt="client_image"
//             />
//           </div>
//           {listClient.map((item, listIndex) => (
//             <li key={listIndex} className="flex gap-3 flex-col mt-[10px]">
//               <Image src={iconSrc} />
//               <div>
//                 <h3
//                   className={`${inter800.className} text-xl md:text-[25px] lg:text-xl  text-blackText2 mb-[8px]`}
//                 >
//                   {item.heading}
//                 </h3>
//                 <p
//                   className={`${inter400.className} w-[282px]  text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
//                 >
//                   {item.description}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </div>
//       </div>

//       <div className="w-fit-content flex flex-col md:flex-row  font-Inter md:px-[0px] px-[10px] mx-auto mt-[-7.5%] ">
//         <div className="w-6/6  xl:w-[570px] lg:w-[480px] md:w-[360px]  xl:px-[15px] lg:px-[15px] md:px-[15px] px-[15px]">
//           <div className="flex flex-col w-[416px]">
//             <div className="hidden sm:block w-full   md:w-[416px]">
//               <Image
//                 className="w-full rounded-[8px]"
//                 src={client}
//                 alt="client_image"
//               />
//             </div>
//             {listClient2.map((item, listIndex) => (
//               <li key={listIndex} className="flex gap-3 flex-col mt-[10px]">
//                 <Image src={iconSrc} />
//                 <div>
//                   <h3
//                     className={`${inter800.className} text-xl md:text-[25px] lg:text-xl  text-blackText2 mb-[8px]`}
//                   >
//                     {item.heading}
//                   </h3>
//                   <p
//                     className={`${inter400.className} w-[282px]  text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
//                   >
//                     {item.description}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col w-[416px]"></div>
//       </div>
//       <div className="w-fit-content  flex flex-col md:flex-row  font-Inter   md:px-[0px] px-[10px] mx-auto mt-[-13%]">
//         <div className="w-6/6  xl:w-[570px] lg:w-[480px] md:w-[360px]  xl:pr-[15px] lg:pr-[15px] md:pr-[15px] pr-[15px]">
//           <div
//             className={`${inter600.className} text-blue text-base text-[16px] custome_font sm:mb-[7px] mb-[10px]`}
//           >
//             {""}
//           </div>
//         </div>

//         <div className="flex flex-col w-[416px]">
//           <div className="hidden sm:block w-full   md:w-[416px]">
//             <Image
//               className="w-full rounded-[8px]"
//               src={client}
//               alt="client_image"
//             />
//           </div>
//           {listClient3.map((item, listIndex) => (
//             <li key={listIndex} className="flex gap-3 flex-col mt-[10px]">
//               <Image src={iconSrc3} />
//               <div>
//                 <h3
//                   className={`${inter800.className} text-xl md:text-[25px] lg:text-xl   text-blackText2 mb-[8px]`}
//                 >
//                   {item.heading}
//                 </h3>
//                 <p
//                   className={`${inter400.className} w-[380px]  text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
//                 >
//                   {item.description}
//                 </p>
//               </div>
//             </li>
//           ))}
//           <div className="flex justify-center md:justify-start items-center ">
//             <button
//               onClick={handleStartProject}
//               className={`${inter600.className} w-[416px] custome-bl text-lg py-3 px-3 text-white rounded-[10px] hover:bg-transparent  hover:text-blue transition-colors duration-300 ease-in-out`}
//             >
//               Start a Project
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import client from "@/public/Woman working in office Illustration.jpg";
import client2 from "@/public/3279765.jpg";
import client3 from "@/public/Hire L2_L3 Support Engineers - Find Top Talent Now.jpg";
// import tempImage from "@/public/LandingPageImages/tempImage.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Accounting from "@/public/LandingPageImages/Frame 1261154863.png";
import Accounting2 from "@/public/LandingPageImages/Frame 1261154864.png";
import Accounting3 from "@/public/LandingPageImages/Frame 1261154865.png";
import { Inter } from "next/font/google";

const inter800 = Inter({ subsets: ["latin"], weight: "800" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

const Fileicon = [{ icon: Accounting }];
const Fileicon2 = [{ icon: Accounting2 }];
const Fileicon3 = [{ icon: Accounting3 }];

const listClient = [
  {
    heading: "Vetted Professionals",
    description:
      "Connect to our network of vetted independent professionals with proven expertise.",
  },
];

const listClient2 = [
  {
    heading: "Dedicated Support",
    description:
      "We support you throughout your project to help match you to the right professionals and ensure project success.",
  },
];

const listClient3 = [
  {
    heading: "Advanced Tools",
    description:
      "Improve your project success and overall productivity with our unique suite of tools for price negotiation, contract and deliverables.",
  },
];

export default function Client() {
  const router = useRouter();
  const handleStartProject = () => {
    // router.push("/signup");
    router.push(`/signup?userType=${encodeURIComponent('"Client"')}`);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".fade-up",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fade-up",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".slide-left",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".slide-left",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".slide-right",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".slide-right",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      }
    );

    // Ensure the listClient3 section gets animated with fade-up effect
    gsap.fromTo(
      ".fade-up-client3",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fade-up-client3",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      ".fade-up-client2",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fade-up-client2",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      ".fade-up-client1",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fade-up-client1",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  const iconSrc = Fileicon[0].icon;
  const iconSrc2 = Fileicon2[0].icon;
  const iconSrc3 = Fileicon3[0].icon;

  return (
    <div className="w-full px-0 md:px-10 xl:px-34">
      <div className="px-5 md:px-0 w-full xl:w-[570px] lg:w-[480px] md:w-[360px] xl:pr-[15px] lg:pr-[15px] md:pr-[15px] pr-[15px] fade-up">
        <div
          className={`${inter600.className} text-blue text-base text-[16px] sm:mb-[7px] mb-[10px] !italic`}
        >
          Clients
        </div>
        <h2
          className={`${inter700.className} md:w-[447px] lg:mb-[35px] md:mb-[30px] text-2xl lg:leading-[56px] leading-7 sm:leading-[40px] sm:text-4xl md:text-[35px] lg:text-5xl font-bold text-blackText fade-up`}
        >
          Finding talented professionals has never been easier
        </h2>
      </div>
      <div className="flex w-full gap-10 lg:gap-18">
        {/* Left Side */}
        <div className="hidden md:flex items-center w-full">
          <div className="flex flex-col w-full h-auto">
            <div className="w-full lg:w-auto h-auto fade-up-client2">
              <Image
                className="w-full lg:w-auto h-auto lg:h-[761px] rounded-[8px]"
                src={client2}
                alt="client_image"
              />
            </div>
            {listClient2.map((item, listIndex) => (
              <li
                key={listIndex}
                className="flex gap-3 flex-col mt-[20px] slide-right"
              >
                <Image src={iconSrc2} alt="Icon" />
                <div>
                  <h3
                    className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className={`${inter400.className} w-full md:w-[282px] text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </div>
        {/* Right Side  */}
        <div className="w-full space-y-10 md:space-y-35 lg:space-y-46 mt-10 md:mt-0">
          <div className="flex flex-col w-full">
            <div className="ml-auto w-[80%] md:w-full fade-up-client1">
              <Image
                className="w-full rounded-s-[8px] md:rounded-[8px]"
                src={client}
                alt="client_image"
              />
            </div>
            {listClient.map((item, listIndex) => (
              <li
                key={listIndex}
                className="px-5 md:px-0 flex gap-3 flex-col mt-[20px] slide-left"
              >
                <Image src={iconSrc} alt="Icon" />
                <div>
                  <h3
                    className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className={`${inter400.className} w-full text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </div>
          <div className="block md:hidden">
          <div className="w-full flex flex-col">
            <div className="mr-auto w-[80%] md:w-full fade-up-client2">
              <Image
                className="w-full rounded-e-[8px] md:rounded-[8px]"
                src={client2}
                alt="client_image"
              />
            </div>
            {listClient2.map((item, listIndex) => (
              <li
                key={listIndex}
                className="px-5 md:px-0 flex gap-3 flex-col mt-[20px] slide-right"
              >
                <Image src={iconSrc2} alt="Icon" />
                <div>
                  <h3
                    className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className={`${inter400.className} w-full md:w-[282px] text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="ml-auto w-[80%] md:w-full fade-up-client3">
              <Image
                className="ml-auto w-full rounded-s-[8px] md:rounded-[8px]"
                src={client3}
                alt="client_image"
              />
            </div>
            {listClient3.map((item, listIndex) => (
              <li
                key={listIndex}
                className="px-5 md:px-0 flex gap-3 flex-col mt-[20px] slide-left" // add fade-up-client3 class
              >
                <Image src={iconSrc3} alt="Icon" />
                <div>
                  <h3
                    className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className={`${inter400.className} w-full text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
            <div className="px-5 md:px-0 flex justify-center md:justify-start items-center my-5 md:my-0 slide-left">
              <button
                onClick={handleStartProject}
                className={`${inter600.className} w-full custome-bl text-lg py-3 px-3 text-white rounded-[6px] hover:bg-transparent hover:text-blue border border-transparent hover:border-blue transition-colors duration-300 ease-in-out`}
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






{/* <div className="w-full">
<div className="w-fit flex flex-col md:flex-row font-Inter pt-[40px] md:px-[0px] px-[10px] md:pt-[70px] mx-auto gap-10 mb-0 sm:mb-[120px] md:mb-[0px]">
  <div className="w-full xl:w-[570px] lg:w-[480px] md:w-[360px] xl:pr-[15px] lg:pr-[15px] md:pr-[15px] pl-2 sm:pl-5 lg:pl-0 pr-[15px] fade-up">
    <div
      className={`${inter600.className} text-blue text-base text-[16px] sm:mb-[7px] mb-[10px] !italic`}
    >
      Clients
    </div>
    <h2
      className={`${inter700.className} md:w-[447px] lg:mb-[35px] md:mb-[30px] text-2xl lg:leading-[56px] leading-7 sm:leading-[40px] sm:text-4xl md:text-[35px] lg:text-5xl font-bold text-blackText fade-up`}
    >
      Finding talented professionals has never been easier
    </h2>
  </div>

  <div className="flex flex-col w-full md:w-[416px] px-[15px] md:px-0">
    <div className="w-full md:w-[350px] lg:w-[416px] xl:mt-[150px] lg:mt-[150px] md:mt-[150px] sm:mt-[60px] slide-left">
      <Image
        className="ml-auto w-[85%] sm:w-[70%] md:w-full rounded-[8px]"
        src={client}
        alt="client_image"
      />
    </div>
    {listClient.map((item, listIndex) => (
      <li
        key={listIndex}
        className="flex gap-3 flex-col mt-[20px] slide-left"
      >
        <Image src={iconSrc} alt="Icon" />
        <div>
          <h3
            className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
          >
            {item.heading}
          </h3>
          <p
            className={`${inter400.className} w-full md:w-[282px] text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
          >
            {item.description}
          </p>
        </div>
      </li>
    ))}
  </div>
</div>

<div className="w-fit flex flex-col md:flex-row font-Inter md:px-[0px] px-[10px] mx-auto mt-5 md:mt-[-12.5%] gap-10">
  <div className="w-full xl:w-[570px] lg:w-[480px] md:w-[360px] xl:px-[15px] lg:px-[15px] md:px-[15px] px-[15px] slide-right">
    <div className="flex flex-col w-full md:w-[416px]">
      <div className="w-full md:w-[350px] lg:w-[416px]">
        <Image
          className="w-[85%] sm:w-[70%] md:w-full h-auto lg:h-[312px] rounded-[8px]"
          src={client2}
          alt="client_image"
        />
      </div>
      {listClient2.map((item, listIndex) => (
        <li
          key={listIndex}
          className="flex gap-3 flex-col mt-[20px] slide-right"
        >
          <Image src={iconSrc2} alt="Icon" />
          <div>
            <h3
              className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
            >
              {item.heading}
            </h3>
            <p
              className={`${inter400.className} w-full md:w-[282px] text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
            >
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </div>
  </div>

  <div className="hidden sm:flex flex-col w-full md:w-[416px]"></div>
</div>
<div className="w-fit flex flex-col md:flex-row font-Inter md:px-[0px] px-[20px] mx-auto mt-5 md:mt-[-13%] gap-10">
  <div className="hidden sm:block w-full xl:w-[570px] lg:w-[480px] md:w-[360px] xl:pr-[15px] lg:pr-[15px] md:pr-[15px] pr-[15px] fade-up">
    <div
      className={`${inter600.className} text-blue text-base text-[16px] sm:mb-[7px] mb-[10px]`}
    >
      {""}
    </div>
  </div>

  <div className="flex flex-col w-full md:w-[416px]">
    <div className=" w-full md:w-[350px] lg:w-[416px]">
      <Image
        className="ml-auto w-[85%] sm:w-[70%] md:w-full rounded-[8px]"
        src={client3}
        alt="client_image"
      />
    </div>
    {listClient3.map((item, listIndex) => (
      <li
        key={listIndex}
        className="flex gap-3 flex-col mt-[20px] slide-left" // add fade-up-client3 class
      >
        <Image src={iconSrc3} alt="Icon" />
        <div>
          <h3
            className={`${inter800.className} text-xl md:text-[25px] lg:text-xl text-blackText2 mb-[8px]`}
          >
            {item.heading}
          </h3>
          <p
            className={`${inter400.className} w-full md:w-[380px] text-greytext lg:text-base md:text-[15px] sm:text-lg font-normal md:mb-[20px] lg:mb-[40px]`}
          >
            {item.description}
          </p>
        </div>
      </li>
    ))}
    <div className="flex justify-center md:justify-start items-center my-5 md:my-0">
      <button
        onClick={handleStartProject}
        className={`${inter600.className} w-full md:w-[416px] custome-bl text-lg py-3 px-3 text-white rounded-[6px] hover:bg-transparent hover:text-blue border border-transparent hover:border-blue transition-colors duration-300 ease-in-out`}
      >
        Start a Project
      </button>
    </div>
  </div>
</div>
</div> */}