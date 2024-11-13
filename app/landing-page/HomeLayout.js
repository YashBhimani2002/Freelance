// HomeLayout.js
import React from 'react';

const HomeLayout = ({ children }) => {
  return <div className="min-h-screen overflow-hidden scrollbar-custom">{children}</div>;
};

export default HomeLayout;