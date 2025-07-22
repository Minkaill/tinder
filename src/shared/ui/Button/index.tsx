import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  disabled,
  onClick,
  width,
  height,
  type,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[22px] cursor-pointer btn-gradient text-[19px] font-bold w-full h-[44px] text-white ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      style={{ width, height }}
      type={type || "button"}
    >
      {children}
    </button>
  );
};
