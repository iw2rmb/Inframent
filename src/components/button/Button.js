"use client";
import React from "react";

const Button = ({
  title,
  handleClick,
  btnType,
  color,
  isActive
}) => {
  return (
    <button
      onClick={handleClick}
      className={`px-16 py-3 rounded-full ${!isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
      disabled={isActive}
    >
        
        <p className=''>{title}</p>
    </button>
  );
};

export default Button;
