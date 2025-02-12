import { useCurrentUser } from "../../hooks/useCurrentUser";
import ProfilePic from "../helper-components/profile-picture";
import { IoAdd } from "react-icons/io5";

const MyStatus = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="pt-5 pb-2 px-3 flex items-center gap-2">
      <div className="relative">
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
