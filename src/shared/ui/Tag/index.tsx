import type { ReactNode } from "react";

interface TagProps {
  text: ReactNode;
  isActive?: boolean;
  isPreview?: boolean;
  onClick?: () => void;
}

export const Tag = ({ text, isActive, isPreview, onClick }: TagProps) => {
  return (
    <div
      className={`flex w-max items-center justify-center border p-4 border-[#B9BFC8] h-8 rounded-full cursor-pointer ${
        isPreview
          ? "bg-[#505965CC] pointer-events-none"
          : isActive
          ? "bg-[#F0F0F0]"
          : ""
      }`}
      onClick={isPreview ? undefined : onClick}
      role={isPreview ? undefined : "button"}
      tabIndex={isPreview ? undefined : 0}
    >
      {text}
    </div>
  );
};
