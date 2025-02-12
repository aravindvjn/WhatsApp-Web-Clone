import Text from "../../../ui/text";
import { ChatsType } from "../types";
import { useOpenedChat } from "../../../hooks/useOpenedChat";
import { timeAgo } from "../../../utils/helper/time-ago";
import { useModifyQuery } from "../../../utils/helper/inValidateQuery";
import ProfileSvg from "../../../ui/profilesvg";
import { useEffect } from "react";
import ProfilePic from "../../helper-components/profile-picture";

const SingleChat = ({
  _id,
  lastMessage,
  otherUser,
  typingUsers,
  read,
}: ChatsType & { typingUsers: any; read: boolean }) => {
  const { data: openedChat } = useOpenedChat();
  const modifyQuery = useModifyQuery();

  const handleOpenChat = () => {
    modifyQuery({
      key: "opened-chat",
      newValues: {
        _id,
        otherUser,
      },
    });
  };

  const lastMessageTime = lastMessage?.timestamp
    ? timeAgo(lastMessage.timestamp)
    : null;

  const renderTypingIndicator = (chatId: string) => {
    if (typingUsers.includes(chatId)) {
      return <p className="text-[12px] text-green  font-normal">typing...</p>;
    }
    return lastMessage?.text;
  };

  useEffect(() => {
    typingUsers = typingUsers.filter(
      (chatid: string) => chatid !== lastMessage?.chatId
    );
  }, [lastMessage]);

  return (
    <div
      onClick={handleOpenChat}
      className={`flex items-center px-[10px] gap-[10px] hover:bg-secondary cursor-pointer ${
        openedChat?._id === _id ? "bg-secondary" : ""
      }`}
    >
      <div>
        <ProfilePic profilePic={otherUser?.profilePic || ""} size={42} />
      </div>

      <div className="flex py-[15px] w-full border-b border-white/10 gap-[10px] justify-between">
        <div>
          <Text fontWeight="semibold" className="line-clamp-1">
            {otherUser?.displayName || otherUser?.username}
          </Text>
          <p
            className={`text-[11px] line-clamp-1  ${
              lastMessage?.status === "read" || read
                ? "opacity-55"
                : "text-white font-semibold"
            }`}
          >
            {renderTypingIndicator(lastMessage?.chatId || "")}
          </p>
        </div>
        <p className="text-[10px] opacity-55 pr-[5px]">{lastMessageTime}</p>
      </div>
    </div>
  );
};

export default SingleChat;
