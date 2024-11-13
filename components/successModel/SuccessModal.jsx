// SuccessModal.js

import React, { useEffect } from "react";
import Image from "next/image";
import SuccessGif from "../../public/icons8-success.gif";

const SuccessModal = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-9999">
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="modal w-full max-w-xl  mx-auto overflow-auto z-50 bg-[#eee] shadow-lg py-5">
        <div className="modal-content">
          <div className="relative bg-white">
            <div className="px-5 pt-5 overflow-hidden bg-[#eee]">
              <div className="flex justify-center">
                <Image
                  src={SuccessGif}
                  alt="success"
                  width={80}
                  height={80}
                  className="mix-blend-multiply bg-transparent"
                />
              </div>
              <div className="leading-8 text-center font-bold">{message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
