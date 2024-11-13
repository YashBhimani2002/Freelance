import React, { useState, useEffect } from "react";
import { Inter, Mulish } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { getFAQsWithStatus } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress";

const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });

export default function ClientQuestions() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const fetchFAQsWithStatus = async () => {
      try {
        const response = await getFAQsWithStatus(1);
        if (response?.status === 200) {
          const clientFaqs = response?.data.faqs.filter(
            (faq) => faq.faq_type === "client"
          );
          setFaqs(clientFaqs);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching FAQs with status:", error);
        setLoading(false);
      }
    };

    fetchFAQsWithStatus();
  }, []);

  return (
    <div className="md:px-0 px-[20px]">
      <div className="lg:w-[70%] mx-auto">
        {loading ? (
          <div className="flex justify-center items-start h-screen">
            <CircularProgress />
          </div>
        ) : (
          <div className="">
            {faqs.map((item, index) => (
              <div key={index} className="">
                <div
                  className={`flex justify-between items-start cursor-pointer bg-[#E9F1FF66] mb-[30px] md:py-[12px] md:px-[20px] p-[20px] ${
                    openIndex === index ? "underline" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                  onMouseEnter={(e) =>
                    e.currentTarget.classList.add("hover:underline")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.remove("hover:underline")
                  }
                >
                  <p
                    className={`${mulish600.className} md:py-[6px] md:pl-[12px] md:text-[27px] text-[17px] text-[#4C4C4D]`}
                  >
                    {item.faq_question}
                  </p>
                  <FontAwesomeIcon
                    className="md:mt-3 mt-1 md:pl-[60px] pl-[20px] md:text-[27px] text-[17px]"
                    icon={openIndex === index ? faMinus : faPlus}
                    size="xl"
                    style={{ color: "#4C4C4D" }}
                  />
                </div>
                {openIndex === index && (
                  <div className="mb-[30px] p-[20px] overflow-hidden transition-max-height duration-500 ease-in-out">
                    <p
                      className={`${inter400.className} text-base text-[#ADADAD] tracking-wide`}
                    >
                      {item.faq_desc}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
