"use client";
import React from "react";
import { IButtonProps } from "@/src/types";

const Button = ({
  title,
  handleClick,
  btnType,
  color
}: IButtonProps) => {
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
