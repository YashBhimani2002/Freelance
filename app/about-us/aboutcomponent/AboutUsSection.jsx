import React, { useEffect, useRef } from "react";
import aboutimg from "../../.././public/pexels-tima-miroshnichenko-5702419 1.png";
import { Mulish } from "next/font/google";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

export default function Aboutdemo() {
  const textRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    const elements = [textRef.current, imagesRef.current];

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
            end: "bottom 50%", // Animation ends when the bottom of the element is at 20% of the viewport height
            scrub: 1, // Smooth scrubbing, works when the user scrolls
          },
        }
      );
    });
  }, []);

  return (
    <div className="box-border py-16">
      <div className="w-full mx-auto px-[20px] md:px-10 lg:px-20 xl:px-32">
        {/* Image and Text Wrapper */}
        <div className="w-full relative">
          {/* Floating Image */}
          <div
            className="w-full md:w-[400px] lg:w-[550px] md:float-left mr-8"
            ref={imagesRef}
          >
            <Image
              src={aboutimg}
              alt="About Image"
              className="w-full object-cover rounded-[20px]"
            />
          </div>

          <p
            className={`${mulish400.className} text-[#1A202C] text-[16px] leading-[28px] text-justify mt-8 md:mt-0`}
            ref={textRef}
          >
            Praiki was borne out of the need to solve a pressing problem in
            Nigeria’s employment industry: that of matching skill to
            opportunity. The idea was conceived by Ronke Bankole who shared this
            vision with Tobi Lawson and they became co-partners.
            <br />
            <br />
            As employers of labour in a developing economy, we noticed that
            accessing quality professionals by businesses in the informal sector
            of the economy is basically a lemon’s market. And the big firms
            capture most of the value while raising cost for everyone else. So,
            we developed a personalised method to connect employers of labour
            with needed professionals at affordable rates, hassle-free. At the
            time, there were technological bottlenecks to integrate some aspects
            of our solution into a scalable, intuitive, and efficient
            end-product. However, we continued to research and reinvent. As
            such, a minimum viable product ‘Gigpro’ was created and the feedback
            received, coupled with some fortuitous changes in the technological
            landscape birthed Praiki.
            <br />
            <br />
            The inspiration has always been about growing human capital in an
            economy sprawling with self-starters. We aim to level the playing
            field by removing the frictions that prevent businesses and
            professionals from growing and raising their productivity.
            <br />
            <br />
            No one anticipated the scale of covid19. The entire global economy
            was mired in uncertainties. Now is the time to go digital, work
            remotely, raise productivity, generate revenue and own your future.
            Our solution is an integrated marketplace that lowers the cost of
            search/access and gives businesses access to quality professional
            services at a price point they can afford.
          </p>
        </div>
      </div>
    </div>
  );
}




  // const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     setScrollPosition(scrollY);
  //   };

  //   // Add scroll event listener
  //   window.addEventListener("scroll", handleScroll);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);



    // <div className="box-border py-20">
    //   <div className="xl:w-full lg:w-[960px] md:w-[720px] sm:w-[540px] w-full mx-auto  md:px-[15px] px-[20px]">
    //     <div className="mx-[-15px]  flex flex-wrap md:gap-0 gap-5 justify-evenly">
    //       <div className=" xl:w-[570px] lg:w-[480px] md:w-[360px] sm:w-[540px] w-full px-[15px] flex items-baseline justify-center mt-[5%] md:mt-[1%]">
    //         <div
    //           className="w-full"
    //           style={{
    //             transform: `translateY(${scrollPosition * -0.3}px)`,
    //           }}
    //         >
    //           <Image
    //             src={aboutimg}
    //             alt=""
    //             className="w-full object-cover rounded-[20px]"
    //           />
    //         </div>
    //       </div>
    //       <div className=" xl:w-[650px] lg:w-[480px] md:w-[360px] sm:w-[540px] w-full px-[15px]">
    //         <p
    //           className={`${mulish400.className} text-[Inter]  text-[#1A202C] text-[16px] leading-[28px] mb-0 text-justify`}
    //           style={{
    //             transform: `translateY(${scrollPosition * -0.3}px)`,
    //           }}
    //         >
    //           Praiki was borne out of the need to solve a pressing problem in
    //           Nigeria’s employment industry: that of matching skill to
    //           opportunity. The idea was conceived by Ronke Bankole who shared
    //           this vision with Tobi Lawson and they became co-partners.
    //           <br />
    //           <br />
    //           As employers of labour in a developing economy, we noticed that
    //           accessing quality professionals by businesses in the informal
    //           sector of the economy is basically a lemon’s market. And the big
    //           firms capture most of the value while raising cost for everyone
    //           else. So, we developed a personalised method to connect employers
    //           of labour with needed professionals at affordable rates,
    //           hassle-free. At the time, there were technological bottlenecks to
    //           integrate some aspects of our solution into a scalable, intuitive,
    //           and efficient end-product. However, we continued to research and
    //           reinvent. As such, a minimum viable product ‘Gigpro’ was created
    //           and the feedback received, coupled with some fortuitous changes in
    //           the technological landscape birthed Praiki.
    //           <br />
    //           <br />
    //         </p>
    //       </div>
    //       <div
    //         className="px-[15px] xl:px-[70px] text-justify"
    //         style={{
    //           transform: `translateY(${scrollPosition * -0.3}px)`,
    //         }}
    //       >
    //         The inspiration has always been about growing human capital in an
    //         economy sprawling with self-starters. We aim to level the playing
    //         field by removing the frictions that prevent businesses and
    //         professionals from growing and raising their productivity. <br />
    //         <br />
    //         No one anticipated the scale of covid19. The entire global economy
    //         was mired in uncertainties. Now is the time to go digital, work
    //         remotely, raise productivity, generate revenue and own your future.
    //         Our solution is an integrated marketplace that lowers the cost of
    //         search/access and gives businesses access to quality professional
    //         services at a price point they can afford. <br />
    //       </div>
    //     </div>
    //   </div>
    // </div>