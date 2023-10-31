import React from "react";
const HomeScreen = ({ children }) => {
  return (
    <div
      className={`flex flex-row py-[2%] h-[100%] bg-gray-100 gap-[2%] px-[2%]`}>
      {children}
    </div>
  );
};

export default HomeScreen;
