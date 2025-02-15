import { useCurrentUser } from "../../hooks/useCurrentUser";
import { StatusResultsType } from "../../hooks/useStatus";
import ProfilePic from "../helper-components/profile-picture";
import { IoAdd } from "react-icons/io5";
import DetailedStatus from "./detailed-status";
import { useState } from "react";

const MyStatus = ({
  statuses = { userId: "", statuses: [] },
}: {
  statuses: StatusResultsType;
}) => {

  const [showStatus, setShowStatus] = useState<boolean>(false);

  const handleShowStatus = () => {
    setShowStatus((prev) => !prev);
  };

  const { data: currentUser } = useCurrentUser();

  return (
    <div
      onClick={handleShowStatus}
      className="pt-5 cursor-pointer pb-2 px-3 flex items-center gap-2"
    >
      {showStatus && (
        <DetailedStatus
          setShowStatus={setShowStatus}
          statuses={statuses.statuses}
        />
      )}
      <div
        className={`relative ${
          statuses?.statuses?.length > 0
            ? "outline outline-offset-2 outline-2 outline-green rounded-full"
            : ""
        }`}
      >
        <ProfilePic profilePic={currentUser?.profilePic || ""} size={36} />

        <button className="absolute outline outline-[2px] outline-primary -right-[2px] -bottom-[2px] h-4 w-4 rounded-full center bg-green">
          <IoAdd size={13} />
        </button>

      </div>

      <div className="flex flex-col">
        <p className="text-primaryText  text-[12px]">My status</p>
        <p className="text-secondaryText text-[10px]">
          Click to add status update
        </p>
      </div>
      
    </div>
  );
};

export default MyStatus;
