import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });

const styles = {
  pagination: {
    "& .MuiPaginationItem-root": {
      margin: 0,
      color: "#2884cc",
    },
    "& .Mui-selected": {
      color: "white !important",
      backgroundColor: "#2884cc !important",
      "&:hover": {
        backgroundColor: "#2884cc !important", // Ensure hover effect remains the same
      },
    },
    // Remove unwanted hover effect
    "& .MuiPaginationItem-root.Mui-selected:hover": {
      backgroundColor: "#2884cc !important",
    },
    "& .MuiPaginationItem-page": {
      borderRadius: 0, // Remove border radius for buttons with count number
    },
  },
};

export default function EndedProjects({ dataLoading, endedProjects }) {
  const calculatePostedTime = (createdAt) => {
    const currentTime = new Date();
    const projectCreatedAt = new Date(createdAt);
    const timeDifference = currentTime - projectCreatedAt;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    return `Posted ${hoursDifference}h ago`;
  };

  //*************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Function to handle page change
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Pagination logic to slice data array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = endedProjects?.slice(startIndex, endIndex);
  const showPagination = endedProjects?.length > itemsPerPage;

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {dataLoading === true ? (
          <Loader />
        ) : (
          <>
            {paginatedData.length > 0 ? (
              paginatedData?.map((projects, indexLists) => (
                <div
                  key={indexLists}
                  className="p-6 my-5 border border-borderBlue rounded-xl"
                >
                  {/* ----------------------- */}
                  <div className="flex justify-between">
                    <h1
                      // onClick={() => router.push(`/projects/${lists.id}`)}
                      className={`${mulish600.className} text-[#000000] text-[21px]  tracking-wide`}
                    >
                      {/* <Link href={`/projects/${projects._id}`} as={`/projects/${projects._id}`} className='cursor-pointer'> */}
                      {`${projects ? projects.job_title : ""}`}
                      {/* </Link> */}
                    </h1>
                    {projects.type === "private" && (
                      <span style={{ color: "green" }}>Private job</span>
                    )}
                  </div>
                  {/* ----------------------- */}

                  <ul className="flex flex-wrap items-center text-black text-sm font-mulish pt-2 pb-[12px]">
                    <li>
                      <strong
                        className={`capitalize ${mulish700.className} text-[#434343] tracking-wide mr-[15px]`}
                      >
                        {projects.budget_type === "Fixed"
                          ? `${projects.budget_type} Price`
                          : projects.budget_type}
                      </strong>
                      {projects.budget_type === "range" ? (
                        <span className="font-normal mr-[15px]">
                          N{projects.budget_from}-N{projects.budget_to}
                        </span>
                      ) : (
                        <span
                          className={`${mulish400.className} mr-[15px]  text-sm`}
                        >
                          N{projects.budget_to}
                        </span>
                      )}
                    </li>
                    <li>
                      <strong
                        className={`capitalize ${mulish700.className} text-[#434343] tracking-wide text-sm`}
                      >
                        Posted:
                      </strong>{" "}
                      <span
                        className={`${mulish400.className} text-sm text-[#434343] tracking-wide `}
                      >
                        {new Date(projects.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </li>
                    <li>
                      <strong
                        className={`capitalize ${mulish700.className} ml-[15px] text-[#434343] tracking-wide text-sm`}
                      >
                        Date Ended:
                      </strong>{" "}
                      <span
                        className={`${mulish400.className} text-sm text-[#434343] tracking-wide `}
                      >
                        {new Date(projects.job_end_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </li>
                  </ul>
                  {/* ----------------------- */}
                  {projects.skillJobData.length > 0 && (
                    <ul
                      className={`flex flex-wrap items-center justify-start gap-2 text-[11px] font-medium my-2 ${inter500.className}`}
                    >
                      {projects.skillJobData.map(
                        (skillJob) =>
                          skillJob.skillData &&
                          skillJob.skillData.name && (
                            <li
                              key={skillJob._id}
                              className="bg-sidbarseleclistcolor text-strongText p-2 rounded-lg shadow shrink-0"
                            >
                              {skillJob.skillData.name}
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="my-0 text-[#ADADAD] font-inter">
                  <div className="p-5 my-0 ">No data found</div>
                </div>
              </>
            )}

            {showPagination && (
              <div className="flex justify-end">
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={Math.ceil(endedProjects?.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handleChange}
                  sx={styles.pagination}
                />
              </div>
            )}
          </>
        )}
      </>
    </ErrorBoundary>
  );
}

// npm install @react-oauth/google
