"use client";
import React, { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    window.location.href = "/findwork";
  }, []);

  // You can return JSX here if needed
  return null; // or whatever you want to render
}

export default MyComponent;
