import React, { useEffect, useState } from "react";
import ProfilePic from "../helper-components/profile-picture";
import { StatusType } from "../../hooks/useStatus";
import formatTimestamp from "../../utils/helper/formateTimeStamp";

import DetailedStatus from "./detailed-status";
import { getImageUrl } from "../../utils/helper/getImageUrl";

const SingleStory = ({
  userId,
  mediaUrl,
  createdAt,
  statuses,
}: StatusType & {
  statuses: StatusType[];
}) => {
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const handleShowStatus = () => {
    setShowStatus((prev) => !prev);
  };

  return (
    <div
      onClick={handleShowStatus}
      className="flex cursor-pointer gap-2 pl-[12px] items-center "
    >
      {showStatus && (
        <DetailedStatus setShowStatus={setShowStatus} statuses={statuses} />
      )}
      <div className="border border-white rounded-full">
        <ProfilePic
          profilePic={getImageUrl(mediaUrl) || userId.profilePic || ""}
          size={36}
        />
      </div>

      <div className="border-b pr-[12px] border-border w-full py-2">
        <p className="text-primaryText text-[14px]">
          {userId.displayName || userId.username}
        </p>
        <p className="text-secondaryText text-[12px]">
          {formatTimestamp(createdAt)}
        </p>
      </div>
      
    </div>
  );
};

export default SingleStory;
