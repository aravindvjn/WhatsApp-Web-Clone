import React from "react";
import ProfilePic from "../helper-components/profile-picture";
import { FaArrowDownLong } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
const SingleCall = () => {
  return (
    <div className="flex  pl-3 gap-3 items-center">
      <ProfilePic profilePic="" size={36} />
      <div className="flex w-full justify-between gap-3 pr-3 items-center border-b border-border">
        <div className="w-full py-2 ">
          <p className="text-primaryText line-clamp-1 text-[14px]">
            Aravind CE NSS
          </p>
          <p className="text-secondaryText line-clamp-1 text-[11px] flex items-center gap-1">
            <FaArrowDownLong className="rotate-45 text-green" size={10} />
            Yesturday 11:20 AM
          </p>
        </div>
        <button>
          <MdCall size={20} />
        </button>
      </div>
    </div>
  );
};

export default SingleCall;
