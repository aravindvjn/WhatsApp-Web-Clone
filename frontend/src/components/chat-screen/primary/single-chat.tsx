import Text from "../../../ui/text";
import { ChatsType } from "../types";
import { useOpenedChat } from "../../../hooks/useOpenedChat";
import { timeAgo } from "../../../utils/helper/time-ago";
import { useModifyQuery } from "../../../utils/helper/inValidateQuery";
import ProfileSvg from "../../../ui/profilesvg";

const SingleChat = ({
  _id,
  lastMessage,
  otherUser,
  typingUsers,
}: ChatsType & { typingUsers: any }) => {
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
    if (typingUsers[chatId]?.length > 0) {
      return <p className="text-[12px] text-gray-500">is typing...</p>;
    }
    return lastMessage?.text;
  };

  return (
    <div
      onClick={handleOpenChat}
      className={`flex items-center px-[10px] gap-[10px] hover:bg-secondary cursor-pointer ${
        openedChat?._id === _id ? "bg-secondary" : ""
      }`}
    >
      <div>
        <div
          style={{ backgroundColor: "gray" }}
          className=" rounded-full w-[42px] h-[42px]"
        >
          {otherUser?.profilePic ? (
            <img
              src={otherUser?.profilePic}
              alt="profile"
              className="w-[42px] h-[42px] rounded-full aspect-square object-cover"
            />
          ) : (
            <ProfileSvg size={42} />
          )}
        </div>
      </div>

      <div className="flex py-[15px] w-full border-b border-white/10 gap-[10px] justify-between">
        <div>
          <Text fontWeight="semibold" className="line-clamp-1">
            {otherUser?.displayName || otherUser?.username}
          </Text>
          <p
            className={`text-[11px] line-clamp-1  ${
              lastMessage?.status !== "read"
                ? "text-white font-semibold"
                : "opacity-55"
            }`}
          >
            {renderTypingIndicator(lastMessage?.chatId || '')}
          </p>
        </div>
        <p className="text-[10px] opacity-55 pr-[5px]">{lastMessageTime}</p>
      </div>
    </div>
  );
};

export default SingleChat;
