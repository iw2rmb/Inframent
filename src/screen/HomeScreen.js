import React, { useEffect, useState } from "react";
const HomeScreen = ({ children }) => {
  return (
    <div
      className={`flex flex-row py-5 h-[100%] bg-gray-100 gap-[5%] px-[2%]`}>
      {children}
    </div>
  );
};

export default HomeScreen;
