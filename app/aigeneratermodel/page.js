  "use client";

import React from "react";
  const PromptModal = (props) => {
    const {
      isOpen,
      promptVal,
      setPromptVal,
      promptError,
      handleSubmit,
      closePromptModal,
      generating,
      placeholderText
    } = props;
    if (!isOpen) return null;
  
    return (
      <div className="fixed grid content-center top-0 bottom-0 left-0 z-[999999] w-screen h:screen bg-[#59425580] bg-opacity-70">
        <div className="bg-white flex flex-col p-5 m-auto rounded-lg w-[80%] md:w-[60%] sm:w-[60%] lg:w-[40%] slideInFromTop-animate">
          <div className="flex flex-row justify-between">
            <p className="text-purpletacx text-lg font-semibold">
              Enter your prompt
            </p>
            <button onClick={closePromptModal}>
              <svg
                width="15"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8307 15.8346L3.16406 3.16797M15.8307 3.16797L3.16406 15.8346"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex flex-col">
              <textarea
                name="prompt"
                rows={5}
                className="bg-[#eff4fc] rounded-lg py-1.5 px-2 mt-1 text-sm"
                placeholder={placeholderText}
                value={promptVal}
                onChange={(e) => setPromptVal(e.target.value)}
              />
            </div>
          </div>
          {promptError && (
            <p className="text-sm font-medium text-red-500">{promptError}</p>
          )}
          <div className="mt-5 flex flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-1 justify-around">
            <button
              className="bg-btn_bg w-full py-1.5 text-white rounded-lg"
              onClick={handleSubmit}
              disabled={generating}
            >
              {generating ? "Generating..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PromptModal;
  