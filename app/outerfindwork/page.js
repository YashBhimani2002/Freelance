"use client"
import React, { useState } from "react";
import Headersmall from "../help-support/helpcomponent/Headersmall";
import FilterSidebar from "./filtersidebar/page";
import Footer from "@/components/Footer/Footer";


const OuterFindWork = ()=>{
    const [filterStatus, setFilterStatus] = useState(true);
    const [subFilterStatus, setSubFilterStatus] = useState({
      category: true,
      experience_level: true,
      budget: true,
      rating: true,
    });
    const [selectedFilter, setSelectedFilter] = useState({
      category: [],
      experience_level: [],
      budget: [],
      rating: [],
    });
    const [sidebarStatus,setSidebarStatus]=useState(false);
    return (
      <>
        <Headersmall />
        <FilterSidebar
          filterStatus={filterStatus}
          subFilterStatus={subFilterStatus}
          selectedFilter={selectedFilter}
          sidebarStatus={sidebarStatus}
          setFilterStatus={setFilterStatus}
          setSubFilterStatus={setSubFilterStatus}
          setSelectedFilter={setSelectedFilter}
          setSidebarStatus={setSidebarStatus}
        />
        <Footer/>
      </>
    );
}
export default OuterFindWork;