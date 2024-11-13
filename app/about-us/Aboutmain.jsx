"use client";
import React, { useEffect, useState } from "react";
import AboutLayout from "./AboutLayout";
import Headersmall from "../help-support/helpcomponent/Headersmall";
import HomePageHeader from "../landing-page/component/HomePageHeader";
import Aboutcenter from "./aboutcomponent/AboutUsHero";
import AboutUsNew from "./aboutcomponent/AboutUsNew";
// import Aboutdemo from "./aboutcomponent/AboutUsSection";
import Aboutdemo from "./aboutcomponent/AboutUsSection copy";
import OurFuture from "./aboutcomponent/AboutUsFuture";
import Ourvision from "./aboutcomponent/AboutUsVisionAndMission";
import Businesses from "./aboutcomponent/AboutUsChoosingPraiki";
import Team from "./aboutcomponent/OurTeam";
import Footer from "../../components/Footer/Footer";

export default function Aboutmain() {
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
    <AboutLayout>
      {!authToken && <HomePageHeader />}
      <Aboutcenter />
      <Aboutdemo />
      <Ourvision />
      <OurFuture />
      <Businesses />
      <Team />
      <Footer />
    </AboutLayout>
  );
}
