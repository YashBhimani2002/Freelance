"use client";
import Image from "next/image";
import Link from "next/link";
import praikilogo from "@/public/praiki.svg";
import menu from "@/public/LandingPageImages/menu.png";
import { useState } from "react";
import { Inter } from "next/font/google";
import ".././style1.css";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });

export default function Header1() {
  const userType = '"Client"'; // Define the user type
  const encodedUserType = encodeURIComponent(userType);
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handlePraikiLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="bg-white w-full px-[0px] md:px-[35px] py-[10px] top-0 z-50 border-b border-header_border">
      {/* -------------------nav-header------------- */}
      <div className="flex justify-between md:justify-start items-center relative">
        {/* -----------left (logo)---------- */}
        <div className="w-auto pr-[15px] md:pl-0 pl-6 flex justify-between items-center gap-10 lg:gap-18">
          <a href="/">
            <Image
              onClick={handlePraikiLogoClick}
              className="object-cover  w-[10rem] h-[4rem]"
              src={praikilogo}
              alt="praiki_logo"
            />
          </a>
        </div>

        {/* -----------middle (mobile menu) ---------- */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-14 left-0 w-full bg-white shadow-lg md:hidden z-50 ml-[0px]`}
        >
          <ul className="flex flex-col space-y-4 py-4 px-6 text-black">
            <li>
              <Link href={`/signup?userType=${encodedUserType}`} className={inter700.className}>
                Hire Talent
              </Link>
            </li>
            <li>
              <Link href="/freelance-find-work" className={inter700.className}>
                Find Work
              </Link>
            </li>
            <li>
              <Link className={inter700.className} href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className={inter700.className} href="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* -----------last (mobile buttons)---------- */}
        <div className="flex items-center md:space-x-6">
          <div className="hidden md:flex md:space-x-6">
            <div className="dropdown shrink-0">
              <Link href={`/signup?userType=${encodedUserType}`} className={inter700.className}>
                Hire Talent
              </Link>
              {/* <span className="ml-[10px]">
                <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
              </span>  */}
            </div>
            <div className="find-work shrink-0">
              {" "}
              <Link href="/freelance-find-work" className={inter700.className}>
                Find Work
              </Link>
            </div>
          </div>
          <Link className="hidden md:block" href="/login">
            <div className="login-button">Login</div>
          </Link>
          <Link className="hidden md:block shrink-0" href="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>

          {/* Mobile menu toggle button */}
          <button onClick={handleMenuToggle} className="md:hidden w-16 px-5">
            <Image src={menu} alt="menu" />
          </button>
        </div>
      </div>
    </div>
  );
}
