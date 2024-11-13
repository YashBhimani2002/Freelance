import Image from "next/image";
import fileImage from "../../../public/images/logo/fileImage.png";
import { milstoneData } from "../../api/api";
import { useEffect, useState } from "react";
import Error from "../../error";
import ErrorBoundary from "../../ErrorBoundry";
import { FiDownload } from "react-icons/fi"; // Import the download icon from react-icons

const fileIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1"
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
  >
    <path
      d="M5.29058 13.3344C4.02673 13.3344 2.88731 12.5731 2.40358 11.4055C1.91984 10.2379 2.18703 8.89383 3.08058 8.00001L4.40683 6.67376L5.29058 7.55751L3.96495 8.88314C3.49124 9.35685 3.30623 10.0473 3.47962 10.6944C3.65301 11.3415 4.15846 11.8469 4.80556 12.0203C5.45266 12.1937 6.14311 12.0087 6.61683 11.535L7.94245 10.2094L8.8262 11.0938L7.50058 12.4194C6.91562 13.0072 6.11986 13.3367 5.29058 13.3344ZM5.73245 10.6513L4.8487 9.76751L9.26808 5.34814L10.1518 6.23189L5.73308 10.6506L5.73245 10.6513ZM10.5943 9.32564L9.70995 8.44189L11.0356 7.11626C11.5157 6.64397 11.7057 5.95043 11.5332 5.29938C11.3608 4.64832 10.8523 4.13979 10.2013 3.96717C9.55032 3.79454 8.85673 3.98434 8.38433 4.46439L7.05808 5.79001L6.17433 4.90626L7.50058 3.58001C8.7225 2.36874 10.6937 2.37306 11.9103 3.58967C13.1269 4.80628 13.1312 6.77746 11.92 7.99939L10.5943 9.32501V9.32564Z"
      fill="#52619A"
    />
  </svg>
);

const Files = ({ contract }) => {
  const jobId = contract?.job_id;
  const [fileVal, setFileVal] = useState([]);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const getFileName = (value) => {
    const filePath = value;
    const parts = filePath.split("/");
    const filename = parts[parts.length - 1];
    const filenameWithExtension = filename;
    const filenameWithoutExtension = filenameWithExtension.replace(
      /_\d+\./,
      "."
    );
    return filenameWithoutExtension;
  };
  const handleDownload = async (filename) => {
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

  const getMilstonData = async () => {
    try {
      const respons = await milstoneData(jobId);
      if (respons?.status == 200) {
        setFileVal(respons.data.file);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (jobId) {
      getMilstonData();
    }
  }, [jobId]);

  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        <div>
          {fileVal.filepath !== false && fileVal.length > 0 ? (
            fileVal.map((file, index) =>
              file.filepath !== false ? (
                <div
                  className="flex mb-3 ml-4 items-center justify-start gap-3"
                  key={index}
                >
                  <Image
                    src={fileImage}
                    alt="alt"
                    width={50}
                    height={50}
                    className="bg-[#43434330] rounded-[4px] p-2"
                  />
                  <button
                    onClick={() => handleDownload(file?.fileName)}
                    className=" overflow-x-auto flex border p-2 border-[#eee] rounded-md bg-white border-solid border-1 font-inter font-semibold text-base text-[#2D3748]"
                  >
                    <span className="flex gap-1 justify-center shrink">
                      {fileIcon}
                      <span className="text-[12px] md:text-[16px] w-auto ">
                        {getFileName(file?.fileName)}
                      </span>
                      <div className="mt-1">
                        <FiDownload /> {/* Download icon */}
                      </div>
                    </span>
                  </button>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex ml-4 items-center justify-start gap-3"
                >
                  No attachment found
                </div>
              )
            )
          ) : (
            <div className="flex ml-4 items-center justify-start gap-3">
              No attachment found
            </div>
          )}
        </div>
      </>
    </ErrorBoundary>
  );
};

export default Files;
