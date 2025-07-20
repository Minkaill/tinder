import type { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <ToastContainer position="bottom-center" autoClose={3000} />
  </>
);

export const useToast = () => {
  const show = (msg: string) => toast(msg);
  return { show };
};
