import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ selectItmes = [] }) => {
  return (
    <div className="dropdown absolute left-0 w-full text-black bg-gray-100 rounded-lg py-5 shadow-lg"></div>
  );
};

export default Dropdown;
