import { MouseEventHandler } from "react";

export interface IButtonProps {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: string;
  color: string;
  
}

export interface IInputProps {
  placeholder: string;
  type: "text" | "password";
  label?: string;
}