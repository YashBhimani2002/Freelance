"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import { getPaymentMethods } from "@/app/api/api";
import Error  from "../../../error";
import ErrorBoundary  from "../../../ErrorBoundry";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const basic = Inter({ subsets: ["latin"] });
const inter500 = Inter({ subsets: ["latin"], weight: "500" });
const mulish400 = Mulish({ subsets: ["latin"], weight: "400" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });
const mulish600 = Mulish({ subsets: ["latin"], weight: "600" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

function Jobmodal(props) {
  let { isOpen, onClose, handleModalSubmit, selectedPaymentOption } = props;
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    loadgetPaymentMethods();
  }, []);

  const loadgetPaymentMethods = async () => {
    try {
      const response = await getPaymentMethods();
      if (response?.status === 200 || response?.status === 201) {
        setPaymentMethods(response?.data?.data);
      }
    } catch (error) {}
  };

  const handlePaymentChange = (method) => {
    selectedPaymentOption(method);
  };

  return (
    <ErrorBoundary fallback= {<Error/>}>
    <>
    <div
      className={`modal bg-[#0000006e] ${
        isOpen ? "show" : ""
            } fixed left-0 bottom-0 w-full h-full z-999999 overflow-y-scroll flex justify-center items-center scrollbar-custom`}
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered absolute custom-modal-width top-6 bg-white m-3 md:w-180"
        style={{ borderRadius: "20px" }}
      >
        <div className="modal-content">
          <div className="modal-header border-b border-solid border-[#e9ecef] flex ">
            <h5 style={{ marginBottom: "0px" }} className="modal-title w-256">
              Payment Options
            </h5>
            <div
              onClick={onClose}
              className="bg-[#F2F2F2] p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#404040"
              >
                <path
                  d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"
                  fill="#2D3748"
                />
              </svg>
            </div>
          </div>
          <div className="payment-modal-praiki">
            <div className="payment-modal-body-praiki flex flex-wrap">
              {paymentMethods.length > 0 &&
                paymentMethods.map((method, index) => (
                  <div className="payment-radio-option-praiki" key={index}>
                    <input
                      className="payment-method-radio-button-praiki w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
                      type="radio"
                      id={method._id}
                      name="paymentMethod"
                      value={method.payment_method}
                      onChange={() =>
                        handlePaymentChange(method.payment_method)
                      }
                    />
                    <label htmlFor={method._id}>{method.payment_method}</label>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-5 flex align-items-end gap-2  border-t border-solid border-[#e9ecef] p-5">
            <button
              className="payment-add-milestone-praiki"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
    </ErrorBoundary>
  );
}

export default Jobmodal;
