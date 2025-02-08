import React from "react";
import { IoAdd } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="absolute bottom-0 w-full right-0 px-[10px] bg-secondary flex items-center h-[60px]">
      <button className="center w-[50px]">
        <IoAdd size={28} />
      </button>
      <input className="h-[40px] bg-blue-200/20 flex items-center rounded-md" />
    </div>
  );
};

export default Footer;
