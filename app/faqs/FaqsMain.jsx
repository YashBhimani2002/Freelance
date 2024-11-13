"use client";
import React, { useEffect, useState } from "react";
import FaqsLayout from "./FaqsLayout";
import Headersmall from "../help-support/helpcomponent/Headersmall";
import FaqsHeroSection from "../faqs/faqscomponent/FaqsHeroSection";
import FaqsClientAndProfessionalSide from "../faqs/faqscomponent/FaqsClientAndProfessionalSide";
import AskAnyQuestions from "../faqs/faqscomponent/AskAnyQuestions";
import Footer from "../../components/Footer/Footer";
import HomePageHeader from "../landing-page/component/HomePageHeader";

function FaqsMain() {
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
      <FaqsLayout>
        {!authToken && <HomePageHeader />}
        <FaqsHeroSection />
        <FaqsClientAndProfessionalSide />
        <AskAnyQuestions />
        <Footer />
      </FaqsLayout>
    </>
  );
}

export default FaqsMain;
