import React, { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";

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
import Image from "next/image";
import profilePicture from "./../../public/images/user/profile_picture.webp";
import { Mulish } from "next/font/google";

const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

function ActiveContracts(props) {
  const { allContract } = props;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeDataCount, setActiveDataCount] = useState(0);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  useEffect(() => {
    let filterData = [];
    filterData = allContract?.filter((contract) => {
      return contract.type === "active";
    });
    setActiveDataCount(filterData?.length);
  }, [allContract]);
  let filterData = [];
  filterData = allContract?.filter((contract) => {
    return contract.type === "active";
  });

  const sortedContracts = filterData;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedContracts?.slice(startIndex, endIndex);
  const showPagination = sortedContracts?.length > itemsPerPage;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div>
          {paginatedData?.length > 0 ? (
            paginatedData?.map((contract, index) => {
              if (contract.type === "active") {
                return (
                  <div
                    key={index}
                    className="client-contract-show-job-contener"
                  >
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
                      <div className="flex">
                        <div className="mr-4 md:mr-8 lg:mr-[35px] xl:mr-[40px]">
                          <img
                            className="rounded-full h-[120px] w-[120px]"
                            src={
                              contract?.professional_data[0]?.avatar
                                ? `${url}/public/uploads/profile_attachments/${contract?.professional_data[0]?.avatar}`
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            } // Ensure userData?.avatar is the filename
                            alt="User"
                            onError={(e) => {
                              const target = e.target;
                              target.src =
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                            }}
                          />
                        </div>
                        <div className="client-contract-item">
                          <div className="mb-2">
                            <p
                              className="text-black font-mulish font-[600] text-[21px] leading-7"
                              style={{ cursor: "pointer" }}
                            >
                              {contract.professional_data[0]?.first_name}{" "}
                              {contract.professional_data[0]?.last_name}
                            </p>
                            <p
                              className="text-black font-mulish font-[600] text-[21px] leading-7"
                              style={{ cursor: "pointer" }}
                            >
                              {contract.jobs_data[0]?.job_title}
                            </p>
                          </div>
                          <div>{/* */}</div>
                          <div className="flex flex-wrap gap-2 mt-3 md:gap-2 flex-col xl:flex-row xl:gap-8">
                            <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                              {contract.jobs_data[0].budget_type === "Fixed"
                                ? "Fixed Price"
                                : "Range"}
                            </p>
                            <span className="flex">
                              <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                                Budget:{" "}
                              </p>
                              <p className="text-[#434343] font-mulish font-[400] text-[14px] ml-1">
                                {contract.jobs_data[0].budget_type === "Fixed"
                                  ? `N${contract.jobs_data[0].budget_to}`
                                  : `N${contract.jobs_data[0].budget_from}-N${contract.jobs_data[0].budget_to}`}
                              </p>
                            </span>
                            <span className="flex">
                              <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                                Date started:{" "}
                              </p>
                              <p className="text-[#434343] font-mulish font-[400] text-[14px] ml-1">
                                {" "}
                                {formatDate(contract.updatedAt)}
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-auto lg:mt-5 xl:mt-auto m-auto mr-2 ">
                        <Link
                          href={`/clientContract/${contract._id}`}
                          className="client-contract-view-btn rounded-[10px] px-4 py-2 text-white bg-[#286CAC] hover:bg-white hover:border-[#286cac] hover:text-[#286cac]"
                        >
                          View Contract
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <>
              <div className="my-0 text-[#ADADAD] font-inter">
                <div className="p-5 my-0 text-black text-center">No data found</div>
              </div>
            </>
          )}

          {showPagination && activeDataCount >= 5 ? (
            <div className="flex justify-end mt-3">
              <Pagination
                variant="outlined"
                shape="rounded"
                color="primary"
                count={Math.ceil(sortedContracts?.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChange}
                sx={styles.pagination}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </ErrorBoundary>
  );
}

export default ActiveContracts;
