import { MdAccountCircle } from "react-icons/md";
import Text from "../../../ui/text";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useOpenedChat } from "../../../hooks/useOpenedChat";
import VideoCall from "../../video-call/video-call";
import ProfilePic from "../../helper-components/profile-picture";

const Header = ({
  onlineUsers,
  roomId,
}: {
  onlineUsers: string[];
  roomId: string;
}) => {
  const { data: openedChat } = useOpenedChat();

  const isOnline = onlineUsers?.includes(openedChat?.otherUser._id || "");

  const receiverId = openedChat?.otherUser._id;

  return (
    <div className="h-[60px] bg-secondary w-full absolute top-0 right-0 flex items-center px-[10px] gap-[10px] z-10 border-b border-border">
      <div>
        <ProfilePic
          profilePic={openedChat?.otherUser.profilePic || ""}
          size={36}
        />
      </div>
      <div className="flex py-[10px] w-full gap-[10px] justify-between items-center">
        <div>
          <Text fontWeight="semibold" className="line-clamp-1">
            {openedChat?.otherUser.displayName}
          </Text>
          <p className={`text-[9px] ${isOnline ? "" : "opacity-60"}`}>
            {isOnline ? "online" : "offline"}
          </p>
        </div>

        <div className="flex items-center sm:gap-[30px] pr-[20px] text-secondaryText">
          {receiverId && <VideoCall receiverId={receiverId} />}
          <BiSearch size={17} />
          <BsThreeDotsVertical size={17} />
        </div>
      </div>
    </div>
  );
};

export default Header;
