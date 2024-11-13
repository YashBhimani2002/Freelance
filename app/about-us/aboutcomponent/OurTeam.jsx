import React, { useEffect, useRef } from "react";
import { Mulish } from "next/font/google";
import team1 from "../../../public/team1.png";
import team2 from "../../../public/team2.png";
import team3 from "../../../public/team3.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

export default function Team() {
  const teamSectionRef = useRef(null);
  const teamRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const teamElements = teamRefs.current;

    gsap.fromTo(
      teamElements,
      { opacity: 0, y: 50 }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, // Adds delay between each team member's animation
        scrollTrigger: {
          trigger: teamSectionRef.current, // Element that triggers the animation
          start: "top center", // Animation starts when the top of the section hits the center of the viewport
          end: "bottom center", // Animation ends when the bottom of the section hits the center of the viewport
          toggleActions: "play none none none", // Plays animation on entering the viewport
        },
      }
    );
  }, []);

  return (
    <div
      ref={teamSectionRef}
      className="lg:py-[60px] py-[30px]  bg-[#E9F1FF73]"
    >
      <div className="mx-auto w-full">
        <h4
          className={`${mulish700.className} text-center md:text-[58px] text-[38px] text-[#1A202C] md:mb-[60px] mb-[30px] font-mulish`}
        >
          Our Team
        </h4>
        <div className="flex flex-col items-center sm:flex-row justify-around space-y-4 sm:space-y-0">
          {[team1, team2, team3].map((teamMember, index) => (
            <div
              key={index}
              ref={(el) => (teamRefs.current[index] = el)} // Assign refs dynamically
              // className="w-full"
            >
              <div className="text-center w-full space-y-4">
                <div className="flex justify-center items-center">
                  <Image
                    src={teamMember}
                    alt=""
                    className="object-cover h-[150px] w-[150px] rounded-[50%]"
                  />
                </div>
                <h3
                  className={`${mulish700.className} lg:text-[28px] text-[20px] text-[#434343] font-mulish`}
                >
                  {/* Replace with dynamic content */}
                  {["Ronke Bankole", "Tobi Lawson", "Tunrayo Fabunmi"][index]}
                </h3>
                <span
                  className={`${mulish400.className} text-[19px] text-[#7E8082]`}
                >
                  {/* Replace with dynamic content */}
                  {["CEO", "COO", "CTO"][index]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
