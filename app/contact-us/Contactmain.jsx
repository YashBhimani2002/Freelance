"use client";
import React, { useEffect, useState } from "react";
import ContactLayout from "./ContactLayout";
import Headersmall from "../help-support/helpcomponent/Headersmall";
import Contactcenter from "./contactcomponent/ContactUsHero";
import Contactform from "./contactcomponent/ContactUsform";
import Footer from "../../components/Footer/Footer";
import HomePageHeader from "../landing-page/component/HomePageHeader";

export default function Contactmain() {
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
    <ContactLayout>
      {!authToken && <HomePageHeader />}
      <Contactcenter />
      <Contactform />
      <Footer />
    </ContactLayout>
  );
}
