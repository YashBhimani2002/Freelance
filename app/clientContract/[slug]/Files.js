import React from "react";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-regular-svg-icons";
import "./style.css";
import { Download } from "@mui/icons-material";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { milstoneData } from "../../api/api";
import { useEffect } from "react";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import { useSocket } from "@/app/socketContext";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const hyperLinkIcon = (
  <svg
    className="mt-1.5 mr-1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 122.88"
    width="12px"
    height="12px"
  >
    <title>hyperlink</title>
    <path d="M60.54,34.07A7.65,7.65,0,0,1,49.72,23.25l13-12.95a35.38,35.38,0,0,1,49.91,0l.07.08a35.37,35.37,0,0,1-.07,49.83l-13,12.95A7.65,7.65,0,0,1,88.81,62.34l13-13a20.08,20.08,0,0,0,0-28.23l-.11-.11a20.08,20.08,0,0,0-28.2.07l-12.95,13Zm14,3.16A7.65,7.65,0,0,1,85.31,48.05L48.05,85.31A7.65,7.65,0,0,1,37.23,74.5L74.5,37.23ZM62.1,89.05A7.65,7.65,0,0,1,72.91,99.87l-12.7,12.71a35.37,35.37,0,0,1-49.76.14l-.28-.27a35.38,35.38,0,0,1,.13-49.78L23,50A7.65,7.65,0,1,1,33.83,60.78L21.12,73.49a20.09,20.09,0,0,0,0,28.25l0,0a20.07,20.07,0,0,0,28.27,0L62.1,89.05Z" />
  </svg>
);

function Files(props) {
  let { myApplicationFilesDetails, mileStoneData, SubmitedWorkeMilstone } =
    props;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const getFileName = (value) => {
    const filePath = value;
    const parts = filePath?.split("/");
    const filename = parts ? parts[parts.length - 1] : undefined;
    const filenameWithExtension = filename;
    const filenameWithoutExtension = filenameWithExtension?.replace(
      /_\d+\./,
      "."
    );
    return filenameWithoutExtension;
  };
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const {socket} = useSocket();

  useEffect(() => {
    // get message from  server when a new message is sent by someone else in real time
    socket.on("milstonChagestatus", async (msg) => {
      try {
        const response = await milstoneData(msg.data.milestone.job_id);
        if (response?.status === 200) {
          if (response?.data?.success == true) {
            mileStoneData = response?.data?.file;
            SubmitedWorkeMilstone = response?.data?.milstone?.filter(
              (milestone) =>
                milestone.status === "2" || milestone.status === "3"
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  }, []);

  const handleDownloadtask = async (filename) => {
    const fileUrl = `${url}/public/uploads/job_attachment/${filename}`;

    // Fetch the image as a blob
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = await getFileName(filename);

    // Append the link to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link from the document body and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const handleDownload = async (filename) => {
    const fileUrl = `${url}${filename}`;

    // Fetch the image as a blob
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = await getFileName(filename);

    // Append the link to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link from the document body and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div className="shadeInAnimation">
          <div className="border-b border-[#a6b7f4] border-b-[2px]">
            <p className={`text-black text-[18px] ${inter600.className}`}>
              Project File{" "}
            </p>
          </div>
          {mileStoneData !== null &&
            mileStoneData.map((milestone, index) => {
              return (
                <div key={index} className="flex mt-4">
                  <FontAwesomeIcon
                    icon={faFileText}
                    className="text-[26px] mr-4"
                  ></FontAwesomeIcon>
                  <div
                    style={{ border: "1px solid #eee" }}
                    className="flex ml-3 py-[2px] px-[10px]"
                  >
                    <a
                      href={url + milestone?.filepath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getFileName(milestone?.fileName)}
                    </a>
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="text-[26px] ml-4 cursor-pointer"
                      onClick={() => handleDownloadtask(milestone?.fileName)}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              );
            })}
        </div>
        <>
          <div className="mt-10 border-b border-[#a6b7f4] border-b-[2px] ">
            <p className={`text-black text-[18px] ${inter600.className}`}>
              Milestone Work Submitted{" "}
            </p>
          </div>
          {SubmitedWorkeMilstone.length > 0 ? (
            <div className="mt-6 flex justify-center items-center flex-1 gap-4 flex-wrap  max-h-[400px] hide-scrollbar">
              {SubmitedWorkeMilstone?.map((item, i) => (
                <div
                  className={`${i > 0 ? "mt-6" : "mt-[10px]"} 
                mr-[10px] ml-[10px] h-[100%] max-h-[299px] rounded-lg w-full shdow_card w-[96%] 
                  ${i + 1 == SubmitedWorkeMilstone.length && "mb-[10px]"}`}
                  key={i}
                >
                  <div className="w-full pt-[10px] pl-[16px] pb-[6px] border-b border-[#a6b7f4] border-b-[1px]">
                    <p
                      className={`text-black text-[18px] ${inter600.className}`}
                    >
                      {`${i + 1} : ${item.milestone_task}`}
                    </p>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap w-full">
                    <div
                      className={`w-full md:w-[50%] ${
                        item?.submit_task_files.length == 1
                          ? "md:h-[120px]"
                          : "md:h-[164px]"
                      } md:max-h-[164px] h-[54px] max-h-[54px] hide-scrollbar m-2.5 md:m-4 rounded-lg border-[1px] border-[#e3e3e3] p-2`}
                    >
                      <p
                        className={`text-black text-[16px] ${inter600.className}`}
                      >
                        Notes{" "}
                      </p>
                      <pre
                        className={`w-full whitespace-pre-wrap overflow-x-auto break-words ${inter400.className}`}
                      >
                        {item.submit_task_description}
                      </pre>
                    </div>
                    {item?.submit_task_files.length != 0 ? (
                      <div className="md:w-[50%] h-[89%] max-h-[164px] hide-scrollbar border-[1px] border-[#e3e3e3] md:mt-4 md:mr-4 md:mb-4 w-[95%] ml-2.5 mb-4 rounded-lg p-2">
                        {item?.submit_task_files.map((filename, index) => {
                          return (
                            <div
                              key={index}
                              className={`flex border-[2px] border-black p-1 rounded-[6px] ${
                                index != 0 && "mt-4"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={faFileText}
                                className="text-[26px] mr-4"
                              ></FontAwesomeIcon>
                              <div className="flex hide-scrollbar w-[86%] h-[27px]">
                                <p>{getFileName(filename)}</p>
                              </div>
                              <FontAwesomeIcon
                                icon={faDownload}
                                className="text-[26px] ml-4 cursor-pointer"
                                onClick={() => handleDownload(filename)}
                              ></FontAwesomeIcon>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="md:w-[50%] h-[164px] flex justify-center items-center max-h-[164px] hide-scrollbar border-[1px] border-[#e3e3e3] md:mt-4 md:mr-4 md:mb-4 w-[95%] ml-2.5 mb-4 rounded-lg p-2">
                        <p
                          className={`text-[20px] text-[#95969b] ${inter600.className}`}
                        >
                          No files found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-[20px] flex justify-center items-center mt-[5px] text-[#95969b] ${inter600.className}`}
            >
              No data found
            </p>
          )}
        </>
      </>
    </ErrorBoundary>
  );
}

export default Files;
