"use client";
import React, { useEffect, useState } from "react";
import HelpLayout from "./HelpLayout";
import Headersmall from "./helpcomponent/Headersmall";
import Helpcenter from "./helpcomponent/Helpcenter";
import Helpcard from "./helpcomponent/HelpSupportCards";
import Smalldetail from "./helpcomponent/HelpSupportEmailDetails";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import HomePageHeader from "../landing-page/component/HomePageHeader";

function Helpmain1() {
  const [authToken, setAuthToken] = useState("");
  const getAuthTokenFromCookie = () => {
    const cookieArray = document.cookie.split("; ");
    for (const cookie of cookieArray) {
      const [key, value] = cookie.split("=");
      if (key === "authToken") {
        return value;
      }
    }
    return null;
  };
  useEffect(() => {
    const authTokenFromCookie = getAuthTokenFromCookie();
    setAuthToken(authTokenFromCookie);
  }, []);
  return (
    <>
      <HelpLayout>
        {!authToken && <HomePageHeader />}
        {/* <Headersmall/> */}
        <Helpcenter />
        <Helpcard />
        <Smalldetail />
        <Footer />
      </HelpLayout>
    </>
  );
}

export default Helpmain1;
