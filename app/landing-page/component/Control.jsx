// import Image from "next/image";
// import { Inter } from "next/font/google";
// import { useEffect, useRef, useState } from "react";
// import StarIcon from "@mui/icons-material/Star";
// import top from "@/public/LandingPageImages/Frame 1261154797.png";
// import profile1 from "@/public/LandingPageImages/1267 1.png";
// import profile2 from "@/public/LandingPageImages/161962.png";
// import profile3 from "@/public/LandingPageImages/lbf6oVv6UIlh5TOlXHgsCCtZ9Co.svg.png";
// import profile4 from "@/public/LandingPageImages/pikaso_texttoimage_A-young-Caucasian-woman-with-long-dark-hair-wearin.png";

// const inter800 = Inter({ subsets: ["latin"], weight: "800" });
// const inter500 = Inter({ subsets: ["latin"], weight: "500" });

// const revirwData = [
//   {
//     Description: "Overall [onboarding on Praiki] was pretty straightforward",
//     name: "Michael Aghado",
//     role: "Graphics Designer",
//     rating: 5,
//     icon: top,
//     profile: profile1,
//   },
//   {
//     Description:
//       "Praiki is a great project that would impact the Nigerian community",
//     name: "Nnamdi Chukwudi",
//     role: "Editor",
//     rating: 5,
//     icon: top,
//     profile: profile2,
//   },
//   {
//     Description:
//       "Praiki is building the digital infrastructure for gig workers",
//     name: "Suleiman A.",
//     rating: 5,
//     icon: top,
//     profile: profile3,
//   },
//   {
//     Description:
//       "Praiki transformed how we hire talent. With access to skilled professionals across Africa, our projects are now completed faster and with top-quality results. It’s a game-changer!",
//     name: "StrapLabs Inc",
//     rating: 5,
//     icon: top,
//     profile: profile4,
//   },
//   {
//     Description:
//       "As a freelancer, Praiki has been invaluable. The platform connects me with businesses looking for my skills, helping me land jobs I love while working remotely.",
//     name: "Alimi Esan",
//     role: "Management Consultant",
//     rating: 5,
//     icon: top,
//     profile: profile1,
//   },
//   {
//     Description:
//       "Our business found the perfect mix of talent on Praiki. The flexibility and professionalism of the freelancers are unmatched!",
//     name: "GetFit Club",
//     rating: 5,
//     icon: top,
//     profile: profile2,
//   },
//   {
//     Description:
//       "Praiki makes it easy to find the right professionals for every project. The platform is intuitive, and the results have been outstanding for our company",
//     name: "Ale-Banks Solutions",
//     rating: 5,
//     icon: top,
//     profile: profile3,
//   },
// ];

// const StarRating = ({ rating }) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     stars.push(
//       <StarIcon
//         key={i}
//         style={{ color: i <= rating ? "#FFD700" : "#e4e5e9" }}
//       />
//     );
//   }
//   return <div className="flex">{stars}</div>;
// };

// export default function Control() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const slider = sliderRef.current;

//     // Auto-slide effect every 3 seconds
//     const slideInterval = setInterval(() => {
//       if (slider) {
//         const nextSlide = (currentSlide + 1) % revirwData.length;
//         slider.scrollTo({
//           left: nextSlide * slider.clientWidth,
//           behavior: "smooth",
//         });
//         setCurrentSlide(nextSlide);
//       }
//     }, 3000); // Change slide every 3 seconds

//     // Cleanup function to clear the interval when the component is unmounted
//     return () => clearInterval(slideInterval);
//   }, [currentSlide]);

//   return (
//     <div className="pt-[70px] md:block w-full">
//       <div className="w-auto lg:px-[15px] md:m-auto py-20 overflow-hidden">
//         <div className="font-inter text-[48px] font-[700] leading-[40px] text-center pb-[5%]">
//           Hear from our users
//         </div>

//         {/* Slider container */}
//         <div
//           className="w-full flex overflow-x-auto space-x-4 p-4 scrollbar-hide"
//           ref={sliderRef}
//         >
//           {revirwData.map((list, boxIndex) => (
//             <div
//               key={boxIndex}
//               className="flex-shrink-0 w-[350px] p-[33px_25px] gap-[17px] rounded-[24px] opacity-100 shadow-[0_0_12px_0_rgba(30,114,229,0.1)] bg-white z-10"
//             >
//               <Image
//                 src={list.icon}
//                 alt={list.icon}
//                 className="mt-[-16%] mb-[15%]"
//               />
//               <StarRating rating={list.rating} />
//               <p
//                 className={`${inter500.className} text-[16px] text-start mt-[15px]`}
//               >
//                 {list.Description}
//               </p>
//               <div className="flex mt-[15px]">
//                 <div>
//                   <Image
//                     src={list.profile}
//                     alt={list.profile}
//                     className="mr-[10px]"
//                   />
//                 </div>
//                 <div className="text-[16px]">
//                   <div className={`${inter500.className} bold`}>
//                     {list.name}
//                   </div>
//                   <div>{list.role}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import top from "@/public/LandingPageImages/Frame 1261154797.png";
import profile1 from "@/public/LandingPageImages/1267 1.png";
import profile2 from "@/public/LandingPageImages/161962.png";
import profile3 from "@/public/LandingPageImages/lbf6oVv6UIlh5TOlXHgsCCtZ9Co.svg.png";
import profile4 from "@/public/LandingPageImages/pikaso_texttoimage_A-young-Caucasian-woman-with-long-dark-hair-wearin.png";
import profile5 from "@/public/LandingPageImages/user1567.png";

const inter800 = Inter({ subsets: ["latin"], weight: "800" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });

const revirwData = [
  {
    Description: "Overall [onboarding on FreeLance] was pretty straightforward",
    name: "Michael Aghado",
    role: "Graphics Designer",
    rating: 5,
    icon: top,
    profile: profile5,
  },
  {
    Description:
      "FreeLance is a great project that would impact the Nigerian community",
    name: "Nnamdi Chukwudi",
    role: "Editor",
    rating: 5,
    icon: top,
    profile: profile5,
  },
  {
    Description:
      "FreeLance is building the digital infrastructure for gig workers",
    name: "Suleiman A.",
    rating: 5,
    icon: top,
    profile: profile5,
  },
  {
    Description:
      "FreeLance transformed how we hire talent. With access to skilled professionals across Africa, our projects are now completed faster and with top-quality results. It’s a game-changer!",
    name: "StrapLabs Inc",
    rating: 5,
    icon: top,
    profile: profile5,
  },
  {
    Description:
      "As a freelancer, FreeLance has been invaluable. The platform connects me with businesses looking for my skills, helping me land jobs I love while working remotely.",
    name: "Alimi Esan",
    role: "Management Consultant",
    rating: 5,
    icon: top,
    profile: profile5,
  },
  {
    Description:
      "Our business found the perfect mix of talent on FreeLance. The flexibility and professionalism of the freelancers are unmatched!",
    name: "GetFit Club",
    rating: 5,
    icon: top,
    profile: profile5,
  },
  {
    Description:
      "FreeLance makes it easy to find the right professionals for every project. The platform is intuitive, and the results have been outstanding for our company",
    name: "Ale-Banks Solutions",
    rating: 5,
    icon: top,
    profile: profile5,
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon
        key={i}
        style={{ color: i <= rating ? "#FFD700" : "#e4e5e9" }}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

export default function Control() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Auto-slide effect every 3 seconds
    const slideInterval = setInterval(() => {
      if (slider) {
        const nextSlide = (currentSlide + 1) % revirwData.length;
        slider.scrollTo({
          left: nextSlide * slider.clientWidth,
          behavior: "smooth",
        });
        setCurrentSlide(nextSlide);
      }
    }, 3000); // Change slide every 3 seconds

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="pt-[0px]  md:pt-[70px] md:block w-full">
      <div className="w-auto lg:px-[15px] md:m-auto py-10 md:py-20 overflow-hidden">
        <div className="font-inter text-[32px] sm:text-[48px] font-[700] leading-[40px] text-center pb-[5%]">
          Hear from our users
        </div>

        {/* Slider container */}
        <div
          className="w-full flex overflow-x-auto space-x-4 p-4 scrollbar-hide"
          ref={sliderRef}
        >
          {revirwData.map((list, boxIndex) => (
            <div
              key={boxIndex}
              className="pt-[35px] md:pt-[20px] flex-shrink-0 w-[90%] sm:w-[350px] p-[20px] sm:p-[33px] gap-[17px] rounded-[24px] opacity-100 shadow-[0_0_12px_0_rgba(30,114,229,0.1)] bg-white z-10 mx-auto"
            >
              <Image
                src={list.icon}
                alt={list.icon}
                className="mt-[-12%] mb-[15%]"
              />
              <StarRating rating={list.rating} />
              <p
                className={`${inter500.className} text-[14px] sm:text-[16px] text-start mt-[15px]`}
              >
                {list.Description}
              </p>
              <div className="flex mt-[15px]">
                <div>
                  <Image
                    src={list.profile}
                    alt={list.profile}
                    width={45}
                    height={45}
                    className="mr-[10px]"
                  />
                </div>
                <div className="text-[14px] sm:text-[16px]">
                  <div className={`${inter500.className} bold`}>
                    {list.name}
                  </div>
                  <div>{list.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
