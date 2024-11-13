"use client"
import React, { useEffect, useState } from "react";
import PaymentLayout from "./PaymentLayout";
import Headersmall from "../help-support/helpcomponent/Headersmall";
import PaymentDetail from "./paymentcomponent/PaymentDetail"
import Footer from "../../components/Footer/Footer";

function Paymentmain() {
  const [authToken, setAuthToken] = useState('');
  
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
      <PaymentLayout>
        {!authToken && <Headersmall />}
        <PaymentDetail/>
      </PaymentLayout>
      <Footer/>
    </>
  );
}

export default Paymentmain;
