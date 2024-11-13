"use client";

import React from "react";
import "./styles.css";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter700 = Inter({ subsets: ["latin"], weight: "700" });

const InReview = (props) => {
  let { milestones, allMilestone, milestonePayment } = props;
  // Function to calculate total amount for a specific status
  const calculateTotalAmount = (milestones) => {
    let totalAmount = 0;
    if (milestones) {
      milestones.forEach((milestone) => {
        totalAmount += milestone.milestone_price;
      });
    }
    return totalAmount;
  };

  // Function to group milestones by project ID
  const groupMilestonesByProject = () => {
    const groupedMilestones = {};
    milestones.forEach((milestone) => {
      if (!groupedMilestones[milestone.job_id._id]) {
        groupedMilestones[milestone.job_id._id] = [];
      }
      groupedMilestones[milestone.job_id._id].push(milestone);
    });
    return groupedMilestones;
  };

  // Function to calculate total number of milestones for a specific job ID
  const calculateTotalMilestonesForJob = (jobId) => {
    const milestonesForJob = allMilestone.filter(
      (milestone) => milestone.job_id._id === jobId
    );
    return milestonesForJob.length;
  };

  // Group milestones by project
  const groupedMilestones = groupMilestonesByProject();


  return (
    <>
      <div className="main-over-tab">
        <div className="table-responsive overflow-x-auto">
          <table
            className="table w-full min-w-max"
            style={{ marginBottom: "16px" }}
          >
            <thead>
              <tr className={`${inter700.className} font-700`}>
                <th scope="col">PROJECT</th>
                <th scope="col">MILESTONES REVIEW</th>
                <th scope="col">FEES</th>
                <th scope="col">AMOUNT BILLED</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedMilestones).map((projectId) => {
                const projectMilestones = groupedMilestones[projectId];

                projectMilestones.sort((a, b) => {
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  return dateA - dateB;
                });


                const totalMilestonesForJob =
                  calculateTotalMilestonesForJob(projectId);

                const lastMilestone =
                  projectMilestones[projectMilestones.length - 1];

                // Store the status of the last milestone in another variable
                const lastStatus = lastMilestone.status;

                // Calculate total amount for the project
                const totalAmountForProject = projectMilestones.reduce(
                  (accumulator, milestone) => {
                    return accumulator + milestone.milestone_price;
                  },
                  0
                );

                const fee = Math.floor(totalAmountForProject * 0.1);

                return lastStatus != 2 ? (
                  <></>
                ) : (
                  <tr key={projectId} className="border-t border-[#eee]">
                    <td
                      className={`p-[12px] text-left text-[#2D3748] text-sm ${inter400.className}`}
                    >
                      {projectMilestones[0].job_id.job_title}
                    </td>
                    <td
                      className={`p-[12px] text-center text-[#2D3748] text-sm ${inter400.className}`}
                    >{`${projectMilestones.length}/${totalMilestonesForJob}`}</td>
                    <td
                      className={`p-[12px] text-center text-[#2D3748] text-sm ${inter400.className}`}
                    >
                      N{fee}
                    </td>
                    <td
                      className={`p-[12px] text-right text-[#2D3748] text-sm ${inter400.className}`}
                    >
                      N{totalAmountForProject}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="6">&nbsp;</td>
              </tr>

              <tr className={`${inter700.className} font-700`}>
                <th scope="col">TOTAL</th>
                <th colSpan={5} scope="col">
                  N{calculateTotalAmount(milestonePayment)}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InReview;
