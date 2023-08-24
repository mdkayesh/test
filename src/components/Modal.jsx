import React from "react";

const Modal = ({ children, className, state, setState }) => {
  const handleClick = () => {
    setState(false);
  };

  return (
    <div
      className={`${
        state ? "visible" : "invisible"
      } modal fixed top-0 left-0 w-full h-screen backdrop-blur-sm px-6 md:px-10 py-10 z-50 bg-[#ffffffab]`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div
          className={`${
            state
              ? "translate-y-0 -translate-x-0 opacity-100"
              : "translate-y-4 -translate-x-4 opacity-0"
          } ${className} transition-all duration-500 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
