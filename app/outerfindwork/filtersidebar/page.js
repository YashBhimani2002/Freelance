"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FindJob from "../findjob/page";
import { getCategories } from "@/app/api/api";
import Loader from "@/components/common/Loader";


const FilterSidebar = (props) => {
  const {
    filterStatus,
    subFilterStatus,
    selectedFilter,
    sidebarStatus,
    setFilterStatus,
    setSubFilterStatus,
    setSelectedFilter,
    setSidebarStatus,
  } = props;
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  // const findStringFromArray = (value: String) => {
  //   return selectedFilter.find((item) => item == value);
  // };
  // const toggleFilter = (str: string) => {
  //   if (findStringFromArray(str)) {
  //     // If the string is found, remove it from the array
  //     let newSelectedFilter: string[] = selectedFilter.filter(
  //       (item) => item !== str
  //     );
  //     setSelectedFilter(newSelectedFilter);
  //   } else {
  //     // If the string is not found, add it to the array
  //     setSelectedFilter([...selectedFilter, str]);
  //   }
  // };

  const findStringFromArray = (
    filterType,
    value
  ) => {
    return selectedFilter[filterType].includes(value);
  };

  const toggleFilter = (filterType, value) => {
    setSelectedFilter((prevState) => {
      const currentFilters = prevState[filterType];

      // Check if the filter value is already selected
      if (currentFilters.includes(value)) {
        // If the value is found, remove it
        return {
          ...prevState,
          [filterType]: currentFilters.filter((item) => item !== value),
        };
      } else {
        // If the value is not found, add it
        return {
          ...prevState,
          [filterType]: [...currentFilters, value],
        };
      }
    });
  };

  const fetchData = async () => {
    try {
      setLoadingCategories(true);
      const response = await getCategories();
      // Assuming the response data is an array of items
      if (response) {
        if (response.status == 200) {
          setCategories(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingCategories(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loadingCategories){
    return (
      <div className="flex flex-1 flex-col p-3 lg:p-10 gap-3 items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-row h-[100vh]">
      <aside
        className={`z-1 ${sidebarStatus ? "flex" : "hidden"
          } lg:flex h-[100vh] lg:!h-full absolute top-auto flex-col overflow-y-scroll lg:overflow-y-hidden bg-white duration-300 ease-linear lg:relative lg:translate-x-0 translate-x-0 w-screen md:w-80 shadow-[1px_1px_44px_-24px_rgba(0,0,0,0.5)]`}
      >
        {/* <div
          className={`${
            sidebarStatus ? "flex" : "hidden"
          } items-end justify-end pt-5 pr-5 lg:hidden`}
          onClick={() => setSidebarStatus(false)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div> */}

        <div className="mt-8 ml-10 ">
          <div className="gap-4 flex flex-col">
            <div
              className="flex flex-1 gap-2 items-center w-[14.938rem] cursor-pointer"
            // onClick={() => setFilterStatus(!filterStatus)}
            >
              {/* <div>
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9999 14.3936C17.9999 14.5711 17.9288 14.7413 17.8022 14.8668C17.6756 14.9923 17.504 15.0628 17.3249 15.0628H12.735C12.5846 15.6186 12.2535 16.1097 11.793 16.4599C11.3325 16.8102 10.7684 17 10.188 17C9.60757 17 9.04339 16.8102 8.58289 16.4599C8.12239 16.1097 7.79131 15.6186 7.64097 15.0628H0.674998C0.495977 15.0628 0.324289 14.9923 0.197702 14.8668C0.0711155 14.7413 0 14.5711 0 14.3936C0 14.2161 0.0711155 14.0459 0.197702 13.9204C0.324289 13.7949 0.495977 13.7244 0.674998 13.7244H7.64097C7.79131 13.1686 8.12239 12.6775 8.58289 12.3272C9.04339 11.977 9.60757 11.7871 10.188 11.7871C10.7684 11.7871 11.3325 11.977 11.793 12.3272C12.2535 12.6775 12.5846 13.1686 12.735 13.7244H17.3249C17.504 13.7244 17.6756 13.7949 17.8022 13.9204C17.9288 14.0459 17.9999 14.2161 17.9999 14.3936ZM17.9999 2.60643C17.9999 2.78391 17.9288 2.95413 17.8022 3.07963C17.6756 3.20514 17.504 3.27564 17.3249 3.27564H15.1199C14.9696 3.83143 14.6385 4.32252 14.178 4.67276C13.7175 5.02301 13.1534 5.21285 12.573 5.21285C11.9926 5.21285 11.4284 5.02301 10.9679 4.67276C10.5074 4.32252 10.1763 3.83143 10.026 3.27564H0.674998C0.586356 3.27564 0.498582 3.25833 0.416687 3.2247C0.334793 3.19107 0.260381 3.14178 0.197702 3.07963C0.135023 3.01749 0.0853029 2.94372 0.0513811 2.86252C0.0174593 2.78133 0 2.69431 0 2.60643C0 2.51854 0.0174593 2.43152 0.0513811 2.35033C0.0853029 2.26913 0.135023 2.19536 0.197702 2.13322C0.260381 2.07108 0.334793 2.02178 0.416687 1.98815C0.498582 1.95452 0.586356 1.93721 0.674998 1.93721H10.026C10.1763 1.38142 10.5074 0.890336 10.9679 0.540088C11.4284 0.189841 11.9926 0 12.573 0C13.1534 0 13.7175 0.189841 14.178 0.540088C14.6385 0.890336 14.9696 1.38142 15.1199 1.93721H17.3249C17.4139 1.93601 17.5022 1.9525 17.5847 1.9857C17.6671 2.01891 17.742 2.06816 17.8049 2.13054C17.8679 2.19293 17.9175 2.26718 17.951 2.34891C17.9845 2.43065 18.0012 2.51821 17.9999 2.60643ZM17.9999 8.49554C18.0012 8.58375 17.9845 8.67132 17.951 8.75305C17.9175 8.83479 17.8679 8.90904 17.8049 8.97142C17.742 9.03381 17.6671 9.08305 17.5847 9.11626C17.5022 9.14947 17.4139 9.16596 17.3249 9.16476H6.79498C6.64464 9.72054 6.31356 10.2116 5.85306 10.5619C5.39256 10.9121 4.82838 11.102 4.24799 11.102C3.66759 11.102 3.10341 10.9121 2.64291 10.5619C2.18242 10.2116 1.85133 9.72054 1.70099 9.16476H0.674998C0.495977 9.16476 0.324289 9.09425 0.197702 8.96875C0.0711155 8.84325 0 8.67303 0 8.49554C0 8.31805 0.0711155 8.14783 0.197702 8.02233C0.324289 7.89683 0.495977 7.82632 0.674998 7.82632H1.70099C1.85133 7.27054 2.18242 6.77945 2.64291 6.4292C3.10341 6.07895 3.66759 5.88911 4.24799 5.88911C4.82838 5.88911 5.39256 6.07895 5.85306 6.4292C6.31356 6.77945 6.64464 7.27054 6.79498 7.82632H17.3249C17.504 7.82632 17.6756 7.89683 17.8022 8.02233C17.9288 8.14783 17.9999 8.31805 17.9999 8.49554Z"
                    fill="black"
                  />
                </svg>
              </div> */}
              <div className="flex flex-1 items-center">
                <div className="flex w-full text-[20px] font-bold">Filters</div>
                <div
                  className={`items-end ${sidebarStatus ? "flex" : "hidden"
                    } lg:hidden`}
                  onClick={() => setSidebarStatus(false)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
            </div>
            <div
              className={` ${filterStatus ? "flex flex-col gap-5 lg:h-[86vh] lg:overflow-y-scroll scrollbar-custom" : "hidden"
                }`}
            >
              <div className="w-[14.875rem] h-auto flex flex-col gap-1">
                <div
                  className={`mb-1 flex flex-1 items-center w-[10.813] cursor-pointer py-1 px-2 border-[1px] border-grashad shadow-1 rounded-md ${subFilterStatus.category && " bg-box_bg"}`}
                  onClick={() =>
                    setSubFilterStatus((prev) => ({
                      ...prev,
                      category: !prev.category,
                    }))
                  }
                >
                  <div className="flex w-full text-[18px]">Category</div>
                  <div className={`flex items-end  ${subFilterStatus.category == false && "rotate-180"
                    }`}>{downArrowSvg}</div>
                </div>
                {subFilterStatus.category && (
                  <>
                    {loadingCategories ? (
                      <div className="flex items-center justify-center">
                        <div>Loading...</div>
                      </div>
                    ) : (
                      categories.map((cItem, cindex) => (
                        <div
                          className="flex w-[14rem] flex-1 items-start gap-4 ml-[0.6rem] cursor-pointer"
                          key={cindex}
                          onClick={() =>
                            toggleFilter("category", cItem?.name)
                          }
                        >
                          <div>
                            <button
                              className={`flex w-[14px] h-[13px] rounded-[2.8px] mt-[0.36rem] ${findStringFromArray("category", cItem?.name)
                                ? "border-[#1068AD]"
                                : "border-black"
                                }  border-[1px] justify-center items-center`}

                            >
                              {findStringFromArray("category", cItem?.name) &&
                                rightSvg}
                            </button>
                          </div>
                          <div className="flex w-full text-[16px]">
                            {cItem?.name}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
              <div className="w-[14.875rem] h-auto">
                <div
                  className={`mb-1 flex flex-1 items-center w-[10.813] cursor-pointer py-1 px-2 border-[1px] border-grashad shadow-1 rounded-md ${subFilterStatus.experience_level && " bg-box_bg"}`}
                  onClick={() =>
                    setSubFilterStatus((prev) => ({
                      ...prev,
                      experience_level: !prev.experience_level,
                    }))
                  }
                >
                  <div className="flex w-full text-[18px]">
                    Experience Level
                  </div>
                  <div className={`flex items-end  ${subFilterStatus.experience_level == false && "rotate-180"
                    }`}>{downArrowSvg}</div>
                </div>
                {subFilterStatus.experience_level && (
                  <div className="ml-[0.6rem]">
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer" onClick={() =>
                      toggleFilter("experience_level", "Expert")
                    }>
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("experience_level", "Expert")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}

                      >
                        {findStringFromArray("experience_level", "Expert") &&
                          rightSvg}
                      </button>
                      <div className="flex w-full text-[16px]">Expert</div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer" onClick={() =>
                      toggleFilter("experience_level", "Intermediate")
                    }>
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray(
                          "experience_level",
                          "Intermediate"
                        )
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}

                      >
                        {findStringFromArray(
                          "experience_level",
                          "Intermediate"
                        ) && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px]">
                        Intermediate
                      </div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer" onClick={() =>
                      toggleFilter("experience_level", "Beginner")
                    }>
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("experience_level", "Beginner")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}

                      >
                        {findStringFromArray("experience_level", "Beginner") &&
                          rightSvg}
                      </button>
                      <div className="flex w-full text-[16px]">Beginner</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-[14.875rem] h-auto">
                <div
                  className={`mb-1 flex flex-1 items-center w-[10.813] cursor-pointer py-1 px-2 border-[1px] border-grashad shadow-1 rounded-md ${subFilterStatus.budget && " bg-box_bg"}`}
                  onClick={() =>
                    setSubFilterStatus((prev) => ({
                      ...prev,
                      budget: !prev.budget,
                    }))
                  }
                >
                  <div className="flex w-full text-[18px]">Budget</div>
                  <div className={`flex items-end  ${subFilterStatus.budget == false && "rotate-180"
                    }`}>{downArrowSvg}</div>
                </div>
                {subFilterStatus.budget && (
                  <div className="ml-[0.6rem]">
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("budget", "Fixed Price")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("budget", "Fixed Price")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("budget", "Fixed Price") &&
                          rightSvg}
                      </button>
                      <div className="flex w-full text-[16px]">Fixed Price</div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("budget", "Hourly")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("budget", "Hourly")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("budget", "Hourly") && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px]">Hourly</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-[14.875rem] h-auto">
                <div
                  className={`mb-1 flex flex-1 items-center w-[10.813] cursor-pointer py-1 px-2 border-[1px] border-grashad shadow-1 rounded-md ${subFilterStatus.rating && " bg-box_bg"}`}
                  onClick={() =>
                    setSubFilterStatus((prev) => ({
                      ...prev,
                      rating: !prev.rating,
                    }))
                  }
                >
                  <div className="flex w-full text-[18px]">Rating</div>
                  <div className={`flex items-end  ${subFilterStatus.rating == false && "rotate-180"
                    }`}>{downArrowSvg}</div>
                </div>
                {subFilterStatus.rating && (
                  <div className="ml-[0.6rem]">
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("rating", "5 STAR")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("rating", "5 STAR")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("rating", "5 STAR") && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px] items-center gap-1">
                        5{" "}
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index}>{startSvg}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("rating", "4 STAR")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("rating", "4 STAR")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("rating", "4 STAR") && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px] items-center gap-1">
                        4{" "}
                        {Array.from({ length: 4 }).map((_, index) => (
                          <span key={index}>{startSvg}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("rating", "3 STAR")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("rating", "3 STAR")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("rating", "3 STAR") && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px] items-center gap-1">
                        3{" "}
                        {Array.from({ length: 3 }).map((_, index) => (
                          <span key={index}>{startSvg}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("rating", "2 STAR")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("rating", "2 STAR")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("rating", "2 STAR") && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px] items-center gap-1">
                        2{" "}
                        {Array.from({ length: 2 }).map((_, index) => (
                          <span key={index}>{startSvg}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-[14rem] flex-1 items-center gap-4 cursor-pointer"
                      onClick={() => toggleFilter("rating", "1 STAR")}
                    >
                      <button
                        className={`flex w-[14px] h-[14px] rounded-[2.8px] ${findStringFromArray("rating", "1 STAR")
                          ? "border-[#1068AD]"
                          : "border-black"
                          }  border-[1px] justify-center items-center`}
                      >
                        {findStringFromArray("rating", "1 STAR") && rightSvg}
                      </button>
                      <div className="flex w-full text-[16px] items-center gap-1">
                        1 <span>{startSvg}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div
        className={`w-auto h-auto mt-4 rounded-tr-[6px] rounded-br-[6px] bg-sidebarTextColor p-3 ${sidebarStatus ? "hidden" : "absolute "
          } lg:hidden`}
        onClick={() => setSidebarStatus(true)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9999 14.3936C17.9999 14.5711 17.9288 14.7413 17.8022 14.8668C17.6756 14.9923 17.504 15.0628 17.3249 15.0628H12.735C12.5846 15.6186 12.2535 16.1097 11.793 16.4599C11.3325 16.8102 10.7684 17 10.188 17C9.60757 17 9.04339 16.8102 8.58289 16.4599C8.12239 16.1097 7.79131 15.6186 7.64097 15.0628H0.674998C0.495977 15.0628 0.324289 14.9923 0.197702 14.8668C0.0711155 14.7413 0 14.5711 0 14.3936C0 14.2161 0.0711155 14.0459 0.197702 13.9204C0.324289 13.7949 0.495977 13.7244 0.674998 13.7244H7.64097C7.79131 13.1686 8.12239 12.6775 8.58289 12.3272C9.04339 11.977 9.60757 11.7871 10.188 11.7871C10.7684 11.7871 11.3325 11.977 11.793 12.3272C12.2535 12.6775 12.5846 13.1686 12.735 13.7244H17.3249C17.504 13.7244 17.6756 13.7949 17.8022 13.9204C17.9288 14.0459 17.9999 14.2161 17.9999 14.3936ZM17.9999 2.60643C17.9999 2.78391 17.9288 2.95413 17.8022 3.07963C17.6756 3.20514 17.504 3.27564 17.3249 3.27564H15.1199C14.9696 3.83143 14.6385 4.32252 14.178 4.67276C13.7175 5.02301 13.1534 5.21285 12.573 5.21285C11.9926 5.21285 11.4284 5.02301 10.9679 4.67276C10.5074 4.32252 10.1763 3.83143 10.026 3.27564H0.674998C0.586356 3.27564 0.498582 3.25833 0.416687 3.2247C0.334793 3.19107 0.260381 3.14178 0.197702 3.07963C0.135023 3.01749 0.0853029 2.94372 0.0513811 2.86252C0.0174593 2.78133 0 2.69431 0 2.60643C0 2.51854 0.0174593 2.43152 0.0513811 2.35033C0.0853029 2.26913 0.135023 2.19536 0.197702 2.13322C0.260381 2.07108 0.334793 2.02178 0.416687 1.98815C0.498582 1.95452 0.586356 1.93721 0.674998 1.93721H10.026C10.1763 1.38142 10.5074 0.890336 10.9679 0.540088C11.4284 0.189841 11.9926 0 12.573 0C13.1534 0 13.7175 0.189841 14.178 0.540088C14.6385 0.890336 14.9696 1.38142 15.1199 1.93721H17.3249C17.4139 1.93601 17.5022 1.9525 17.5847 1.9857C17.6671 2.01891 17.742 2.06816 17.8049 2.13054C17.8679 2.19293 17.9175 2.26718 17.951 2.34891C17.9845 2.43065 18.0012 2.51821 17.9999 2.60643ZM17.9999 8.49554C18.0012 8.58375 17.9845 8.67132 17.951 8.75305C17.9175 8.83479 17.8679 8.90904 17.8049 8.97142C17.742 9.03381 17.6671 9.08305 17.5847 9.11626C17.5022 9.14947 17.4139 9.16596 17.3249 9.16476H6.79498C6.64464 9.72054 6.31356 10.2116 5.85306 10.5619C5.39256 10.9121 4.82838 11.102 4.24799 11.102C3.66759 11.102 3.10341 10.9121 2.64291 10.5619C2.18242 10.2116 1.85133 9.72054 1.70099 9.16476H0.674998C0.495977 9.16476 0.324289 9.09425 0.197702 8.96875C0.0711155 8.84325 0 8.67303 0 8.49554C0 8.31805 0.0711155 8.14783 0.197702 8.02233C0.324289 7.89683 0.495977 7.82632 0.674998 7.82632H1.70099C1.85133 7.27054 2.18242 6.77945 2.64291 6.4292C3.10341 6.07895 3.66759 5.88911 4.24799 5.88911C4.82838 5.88911 5.39256 6.07895 5.85306 6.4292C6.31356 6.77945 6.64464 7.27054 6.79498 7.82632H17.3249C17.504 7.82632 17.6756 7.89683 17.8022 8.02233C17.9288 8.14783 17.9999 8.31805 17.9999 8.49554Z"
            fill="white"
          />
        </svg>
      </div>
      <FindJob
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sidebarStatus={sidebarStatus}
      />
    </div>
  );
};

export default FilterSidebar;

const downArrowSvg = (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683418 12.0976 1.31658 11.7071 1.70711L6.70711 6.70711C6.31658 7.09763 5.68342 7.09763 5.29289 6.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579Z"
      fill="black"
    />
  </svg>
);

const rightSvg = (
  <svg
    width="9"
    height="7"
    viewBox="0 0 9 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 4.40909C1 4.40909 1.75 4.40909 2.75 6C2.75 6 5.5295 1.83318 8 1"
      stroke="#1068AD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const startSvg = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.3595 12.2379C9.90111 12.5644 6.95957 10.4945 6.3962 10.49C5.83283 10.4855 2.85817 12.5078 2.40509 12.1739C1.952 11.84 3.01719 8.41076 2.84744 7.87511C2.67768 7.33946 -0.170364 5.14332 0.00803994 4.61045C0.186483 4.07759 3.78634 4.02809 4.24478 3.70156C4.70321 3.37506 5.9177 -0.00450566 6.48111 4.51014e-06C7.04445 0.00455389 8.20407 3.40322 8.65716 3.73709C9.11025 4.07092 12.7089 4.17838 12.8787 4.71403C13.0484 5.24968 10.1652 7.3997 9.98681 7.93256C9.8084 8.46543 10.818 11.9114 10.3595 12.2379Z"
      fill="url(#paint0_linear_4737_13164)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4737_13164"
        x1="1.64939e-05"
        y1="6.13642"
        x2="12.8859"
        y2="6.13642"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FCD635" />
        <stop offset="1" stop-color="#F7A928" />
      </linearGradient>
    </defs>
  </svg>
);
