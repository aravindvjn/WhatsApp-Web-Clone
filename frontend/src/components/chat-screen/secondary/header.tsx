import { MdAccountCircle } from "react-icons/md";
import Text from "../../../ui/text";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { useOpenedChat } from "../../../hooks/useOpenedChat";


const Header = ({ onlineUsers }: { onlineUsers: string[] }) => {
  
  const { data: openedChat } = useOpenedChat();

  const isOnline = onlineUsers?.includes(openedChat?.otherUser._id || "");

  return (
    <div className="h-[60px] bg-secondary w-full absolute top-0 right-0 flex items-center px-[10px] gap-[10px] z-10 border-b border-border">

      <MdAccountCircle size={40} />{" "}

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
          <FaVideo size={20} />
          <BiSearch size={17} />
          <BsThreeDotsVertical size={17} />
        </div>

      </div>

    </div>
  );
};

export default Header;
