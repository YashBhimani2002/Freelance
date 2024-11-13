import React, { useEffect, useRef } from "react";
import { Mulish } from "next/font/google";
import vision from "../../../public/vision.png";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });

export default function OurVision() {
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const elements = [visionRef.current, missionRef.current, imageRef.current];

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Animation starts when the top of the element is at 80% of the viewport height
            end: "bottom 20%", // Animation ends when the bottom of the element is at 20% of the viewport height
            scrub: 1, // Smooth scrubbing, works when the user scrolls
          },
        }
      );
    });
  }, []);

  return (
    <div className=" lg:py-[100px] md:py-[80px] py-[30px]">
      <div className="xl:w-[1400px] lg:w-[960px] md:w-[720px] sm:w-[540px] w-full  mx-auto px-[15px]">
        <div className="mx-[-15px]  flex flex-wrap md:text-left text-center justify-evenly">
          <div
            className="px-[15px] xl:w-[570px] lg:w-[480px] md:w-[360px] w-full"
            ref={visionRef}
          >
            <div>
              <h3
                className={`${mulish700.className}  lg:text-[58px] md:text-[40px] text-[30px] lg:mb-[30px] mb-[20px] text-[#1A202C] !font-inter`}
              >
                Our Vision
              </h3>
              <p
                className={`${mulish500.className} lg:text-[20px] text-[16px] lg:leading-[40px] leading-[21px] md:mb-[50px] sm:mb-[30px] text-[#4A5568] !font-inter `}
              >
                The prosperity and flourishing of humans have always depended on
                the acquisition, accumulation, use and reuse of learning. We
                want to help sustain a thriving humanity by being the largest
                network of human capital in the world.
              </p>
            </div>
            <div ref={missionRef} className="mt-8 md:mt-0">
              <h3
                className={`${mulish700.className}  lg:text-[58px] md:text-[40px] text-[30px] lg:mb-[30px] mb-[20px] text-[#1A202C] !font-inter`}
              >
                Our Mission
              </h3>
              <p
                className={`${mulish500.className} lg:text-[20px] text-[16px] lg:leading-[40px] leading-[21px] md:mb-[0px] mb-[30px] text-[#4C4C4D] !font-inter`}
              >
                Praiki is committed to fostering human capital growth by removing barriers that hinder productivity for businesses and professionals alike.
              </p>
            </div>
          </div>
          <div
            className="px-[15px] xl:w-[570px] lg:w-[480px] md:w-[360px] w-full"
            ref={imageRef}
          >
            <Image
              src={vision}
              alt=""
              className="w-full object-cover rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
