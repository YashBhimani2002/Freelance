import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mulish } from "next/font/google";
import Image from "next/image";
import about1 from "../../../public/about1.png";
import about2 from "../../../public/about2.png";
import about3 from "../../../public/about3.png";
import about4 from "../../../public/about4.png";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

export default function Businesses() {
  const sectionsRef = useRef([]); // To hold references to each section div

  useEffect(() => {
    // Animate each section when it scrolls into view
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 }, // Start state
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // Trigger animation when top of section hits 80% of the viewport
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="lg:py-[60px] py-[30px] ">
      <div className="w-full px-[15px] mx-auto">
        <div className="flex flex-wrap max-h-fit justify-evenly">
          <div className="px-[15px] w-full ">
            <h3
              className={`${mulish700.className} leading-[56px] font-inter text-center lg:text-[48px] md:text-[38px] text-[22px] text-[#1A202C] md:mb-[60px] mb-[30px]`}
            >
              Millions of businesses
              <br /> Worldwide choose Praiki
            </h3>
          </div>
          <div className="px-[20px] md:px-10 lg:px-20 xl:px-32 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/** Wrap each section in a ref */}
            {[about1, about2, about3, about4].map((image, index) => (
              <div
                key={index}
                ref={(el) => (sectionsRef.current[index] = el)}
                className="w-full px-[15px] text-center md:text-left min-h-full"
              >
                <div className="py-[40px] px-[35px] w-full h-full rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-none shadow-[2px_2px_16px_0px_#00305733]">
                  <div className="flex md:flex-none justify-center md:justify-start items-center md:items-start">
                    <Image
                      src={image}
                      alt=""
                      className="mb-[40px] object-cover"
                    />
                  </div>
                  <h4
                    className={`${mulish700.className} lg:text-[32px] text-[24px] text-[#1A202C] mb-[8px]`}
                  >
                    {index === 0
                      ? "It’s simpler"
                      : index === 1
                      ? "It’s faster"
                      : index === 2
                      ? "Best services"
                      : "Quick & easy search"}
                  </h4>
                  <p
                    className={`${mulish400.className} lg:text-[18px] text-base leading-[22px] text-[#4A5568] mb-0`}
                  >
                    {index === 0
                      ? "Create a free account in a few clicks."
                      : index === 1
                      ? "Queries are resolved in less than an hour."
                      : index === 2
                      ? "Guaranteed access to qualified and verified professionals."
                      : "We have a pool of talent with the expertise to help you take your business to the next level."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
