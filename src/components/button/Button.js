"use client";
import React from "react";

const Button = ({
  title,
  handleClick,
  btnType,
  color
}) => {
  return (
    <button
      disabled={false}
      onClick={handleClick}
      className={`border px-16 py-3 rounded-full hover:bg-white hover:border ${color}`}
    >
        
        <p className=''>{title}</p>
    </button>
  );
};

export default Button;
