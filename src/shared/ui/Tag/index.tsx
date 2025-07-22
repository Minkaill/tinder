import type { ReactNode } from "react";

interface TagProps {
  text: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tag = ({ text, isActive, onClick }: TagProps) => {
  return (
    <div
      className={`flex w-max items-center justify-center border p-4 border-[#B9BFC8] h-8 rounded-full cursor-pointer ${
        isActive ? "bg-[#F0F0F0]" : ""
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {text}
    </div>
  );
};
