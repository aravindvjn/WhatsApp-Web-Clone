import React from "react";
import ProfilePic from "../helper-components/profile-picture";
import { UserType } from "../chat-screen/types";
import { useModifyQuery } from "../../utils/helper/inValidateQuery";

const SingleUser = (otherUser: UserType) => {
  const { _id, displayName, username, profilePic } = otherUser;
  const modifyQuery = useModifyQuery();

  //Handle open chat when clicked on a chat
  const handleOpenChat = () => {
    modifyQuery({
      key: "opened-chat",
      newValues: {
        _id:'',
        otherUser,
      },
    });
  };
  return (
    <div key={_id} onClick={handleOpenChat} className="items-center pl-3 flex gap-2 cursor-pointer ">
      <ProfilePic profilePic={profilePic} size={40} />
      <div className="text-[12px] flex flex-col border-b  py-3 border-border w-full">
        <p className="font-semibold">{displayName}</p>
        <p className="text-secondaryText">@{username}</p>
      </div>
    </div>
  );
};

export default SingleUser;
