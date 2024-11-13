import React, { useState, useEffect } from 'react';
import { Inter, Mulish } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { contactUs } from "@/app/api/api";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });

export default function Contactform() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    contactReason: "",
    description: "",
    attachments: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    subject: "",
    contactReason: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const allowedExtensions = [
    "docx",
    "rtf",
    "doc",
    "pdf",
    "png",
    "jpg",
    "jpeg",
    "gif",
  ];
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setErrors({
        ...errors,
        attachments:
          "Invalid file type. Valid extensions are: " +
          allowedExtensions.join(", "),
      });
    } else {
      setErrors({ ...errors, attachments: "" });
      setFormData({ ...formData, attachments: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessAlert(false);
    const newErrors = { ...errors };
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.contactReason) {
      newErrors.contactReason = "Contact Reason is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.attachments) {
      newErrors.attachments = "Please upload a file";
    }
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    const formDataToSend = new FormData();
    const initialFormData = {
      email: "",
      subject: "",
      contactReason: "",
      description: "",
      attachments: "",
    };

    const initialErrors = {
      email: "",
      subject: "",
      contactReason: "",
      description: "",
      attachments: "",
    };
    if (!hasErrors) {
      // Create FormData object
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("contactReason", formData.contactReason);
      formDataToSend.append("description", formData.description);

      if (formData.attachments) {
        formDataToSend.append("files", formData.attachments);
      }

      // Submit formDataToSend to your server
    }
    try {
      const response = await contactUs(formDataToSend);
      setFormData(initialFormData);
      setErrors(initialErrors);
      setSuccessAlert(true);
    } catch (error) {
      console.error("Error:", error);
      // Handle error response here...
    }
  };
  useEffect(() => {
    if (successAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
  
      // Clear the timer if the component unmounts or successAlert changes
      return () => clearTimeout(timer);
    }
  }, [successAlert]);
  

  return (
    <div className=" md:py-[80px] py-[50px]">
      <div className=" xl:w-[1140px] lg:w-[960px] md:w-[720px] sm:w-[540px] w-full sm:mx-auto px-[15px]">
        <div className=" md:w-[70%] w-[100%] md:mx-auto">
        {successAlert && (
              <div
                className="w-auto bg-[#d4edda] ml-auto m-10 p-5 text-[#155724] rounded data1"
                style={{ display: successAlert ? "block" : "none" }}
              >
                <button
                  type="button"
                  className="close"
                  onClick={() => setSuccessAlert(false)}
                >
                  ×
                </button>
                <strong id="message_show_success">Thank you for the fill details. We will contact you shortly.</strong>
              </div>
            )}
          <form onSubmit={handleSubmit}>
            <div className="px-[15px]">
              <div className="mb-[16px]">
                <label
                  for="exampleInputEmail1"
                  className={`${inter500.className} block mb-[10px] text-[18px] text-[#2D3748]`}
                >
                  Your Email address<span className="error text-red">*</span>
                </label>
                <input
                  type="text"
                  className="border w-full border-[#ccc] rounded-none mb-[10px] mt-[2px] p-[10px] text-[#2C3E50] tracking-[1px] box-border block focus:outline-none focus:ring focus:border-blue-500 transition duration-150 ease-in-out"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </div>
            <div className="px-[15px]">
              <div className="mb-[16px]">
                <label
                  for="exampleInputEmail1"
                  className={`${inter500.className} block mb-[10px] text-[18px] text-[#2D3748]`}
                >
                  Subject<span className="error text-red">*</span>
                </label>
                <input
                  type="text"
                  className="border w-full border-[#ccc] rounded-none mb-[10px] mt-[2px] p-[10px] text-[#2C3E50] tracking-[1px] box-border block focus:outline-none focus:ring focus:border-blue-500 transition duration-150 ease-in-out"
                  id="subject"
                  name="subject"
                  aria-describedby="emailHelp"
                  placeholder=""
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <div className="error">{errors.subject}</div>
                )}
              </div>
            </div>
            <div className="px-[15px]">
              <div className="mb-[16px]">
                <label
                  for="exampleInputEmail1"
                  className={`${inter500.className} block mb-[10px] text-[18px] text-[#2D3748]`}
                >
                  Contact Reason<span className="error text-red">*</span>
                </label>
                <textarea
                  name="contactReason"
                  id="contactReason"
                  className="h-[100px] border w-full border-[#ccc] rounded-none mb-[10px] mt-[2px] p-[10px] text-[#2C3E50] tracking-[1px] box-border block focus:outline-none focus:ring focus:border-blue-500 transition duration-150 ease-in-out"
                  value={formData.contactReason}
                  onChange={handleChange}
                ></textarea>
                {errors.contactReason && (
                  <div className="error">{errors.contactReason}</div>
                )}
                <p
                  id="emailHelp"
                  className={`${inter400.className} text-[14px] leading-[20px] text-[#718096] mb-[30px]`}
                >
                  What are you reaching out about?
                </p>
              </div>
            </div>
            <div className="px-[15px]">
              <div className="mb-[16px]">
                <label
                  for="exampleInputEmail1"
                  className={`${inter500.className} block mb-[10px] text-[18px] text-[#2D3748]`}
                >
                  Description<span className="error text-red">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="h-[100px] border w-full border-[#ccc] rounded-none mb-[10px] mt-[2px] p-[10px] text-[#2C3E50] tracking-[1px] box-border block focus:outline-none focus:ring focus:border-blue-500 transition duration-150 ease-in-out"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && (
                  <div className="error">{errors.description}</div>
                )}
                <p
                  id="emailHelp"
                  className={`${inter400.className} text-[14px] leading-[20px] text-[#718096] mb-[30px]`}
                >
                  Please enter the details of your request. A member of our
                  support staff will respond as soon as possible.
                </p>
              </div>
            </div>
            <div className="px-[15px]">
              <div className="mb-[16px]">
                <label
                  for="exampleInputEmail1"
                  className={`${inter500.className} block mb-[10px] text-[18px] text-[#2D3748]`}
                >
                  Attachments<span className="error text-red">*</span>
                </label>
                <input
                  type="file"
                  className="border w-full text-[14px]  border-[#ccc] rounded-none mb-[0px] mt-[2px] p-[10px] text-[#2C3E50] tracking-[1px] box-border block focus:outline-none focus:ring focus:border-blue-500 transition duration-150 ease-in-out"
                  id="exampleFormControlFile1"
                  name="attachments"
                  onChange={handleFileChange}
                />
                {errors.attachments && (
                  <div className="error">{errors.attachments}</div>
                )}
                <p
                  id="emailHelp"
                  className={`${inter400.className} mt-[0.25rem] text-[14px] leading-[20px] text-[#718096] mb-[30px]`}
                >
                  Note:Valid extensions are
                  DOCX|RTF|DOC|PDF|PNG|JPG|Jpeg|Jpeg|gif|
                </p>
              </div>
            </div>
            <div className="px-[15px] md:w-auto sm:w-full w-auto">
              <button
                type="submit"
                className={`${inter400.className} mt-[40px] bg-[#286cac] h-[39px] text-center border border-[#2884CC] rounded-[10px]  text-[1rem] py-[0.375rem] px-[0.75rem] text-white hover:text-[#286cac] hover:bg-transparent hover:border-[#286cac]  transition duration-150 ease-in-out focus:text-[#286cac] md:w-auto sm:w-full w-auto focus:bg-transparent focus:border-[#286cac] focus:outline-none focus:ring `}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* detail start*/}
        <div className=" border-t border-[#A6B7F4] mx-auto mt-[100px] pt-[26px]">
          <div
            className={`${mulish400.className}  sm:text-left md:text-right text-[#323232] hover:text-[#286cac] tracking-wide`}
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2  leading-[17px]" />
            <a href="tel:(+234) 807 362 2282">(+234) 807 362 2282</a>
          </div>
        </div>
        {/* detail end */}
      </div>
    </div>
  );
}
