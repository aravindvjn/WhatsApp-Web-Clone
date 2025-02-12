import React from "react";
import ProfilePic from "../helper-components/profile-picture";

const SingleStory = () => {
  return (
    <div className="flex gap-2 pl-[12px] items-center ">
      <ProfilePic profilePic="" size={36} />
      <div className="border-b pr-[12px] border-border w-full py-2">
        <p className="text-primaryText text-[14px]">John Doe</p>
        <p className="text-secondaryText text-[12px]">Today at 10:21 AM</p>
      </div>
    </div>
  );
};

export default SingleStory;
