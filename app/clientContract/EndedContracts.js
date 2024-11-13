import React from "react";
import Link from "next/link";
import "./style.css";

function EndedContracts(props) {
  const { allContract } = props;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    allContract !== null && allContract.length!=0 ?
    allContract.map((contract) => {
      if (contract.type === "ended") {
        return (
          <div key={contract.id} className="client-contract-show-job-contener">
            <div className="flex ">
              <div className="mr-[40px]">
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
                    {contract.professional_data[0].first_name}{" "}
                    {contract.professional_data[0].last_name}
                  </p>
                  <p
                    className="text-black font-mulish font-[600] text-[21px] leading-7"
                    style={{ cursor: "pointer" }}
                  >
                    {contract.jobs_data[0]?.job_title}
                  </p>
                </div>
                <div>{/* <h5>Test</h5> */}</div>
                <div className="flex flex-wrap gap-8 mt-3">
                  <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                    {/* {contract.jobs_data[0]?.budget_type} {' '} Price */}
                    {contract.jobs_data[0].budget_type === "Fixed"
                      ? "Fixed Price"
                      : "Range"}
                  </p>
                  <span className="flex">
                    <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                      Budget:{" "}
                    </p>
                    <p className="text-[#434343] font-mulish font-[400] text-[14px] ml-1">
                      {" "}
                      {contract.jobs_data[0].budget_type === "Fixed"
                        ? `N${contract.jobs_data[0].budget_to}`
                        : `N${contract.jobs_data[0].budget_from}-N${contract.jobs_data[0].budget_to}`}
                    </p>
                  </span>
                  <span className="flex">
                    <p className="text-[#434343] font-mulish font-[700] text-[14px]">
                      Date Ended:{" "}
                    </p>
                    <p className="text-[#434343] font-mulish font-[400] text-[14px] ml-1">
                      {" "}
                      {new Date(contract.end_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </span>
                </div>
              </div>
              <div className="ml-auto mt-auto mb-auto mr-[0px]">
                <p className="contract-ended-in-my-contract-syn">Ended</p>
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
    }) : <div className="p-5 my-0 text-black text-center">No data found</div>
  );
}

export default EndedContracts;
