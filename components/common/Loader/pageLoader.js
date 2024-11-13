// PageLoader.js
import React from "react";

const PageLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* You can customize the loader appearance here */}
      <div>Loading...</div>
    </div>
  );
};

export default PageLoader;
