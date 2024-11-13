"use client"
import React from "react";
import Headersmall from "../help-support/helpcomponent/Headersmall";
import PolicyLayout from "./PolicyLayout"
import Policybox from  './policycomopnent/PolicySection'
import Footer from ".././../components/Footer/Footer"

function Paymentmain() {
  return (
    <>
      <PolicyLayout>
        <Headersmall />
         <Policybox/>
         <Footer/>
      </PolicyLayout>
    </>
  );
}

export default Paymentmain;