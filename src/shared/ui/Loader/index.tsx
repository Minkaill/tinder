import cs from "./index.module.css";

export const Loader = () => {
  return (
    <div className="w-screen h-screen absolute left-0 top-0 flex items-center justify-center">
      <div className={cs.loader}></div>
    </div>
  );
};
