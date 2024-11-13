"use client";
import React from "react";
import Hero1 from "./component/hero";
import Header1 from "./component/HomePageHeader";
import HomeLayout from "./HomeLayout";
import Client1 from "./component/Findingclient";
import Services from "./component/Services";
import Opprtunities from "./component/Opprtunities";
import Control from "./component/Control";
import Hiring from "./component/Hiring";
import Footer from "@/components/Footer/Footer";

function Home1() {
  return (
    <>
      <HomeLayout>
        <Header1 />
        <Hero1 />
        <Services />
        <Client1 />
        <Opprtunities />
        <Control />
        <Hiring />
        <Footer />
      </HomeLayout>
    </>
  );
}

export default Home1;
