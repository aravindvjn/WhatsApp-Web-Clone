import formatTimestamp from "../../../utils/helper/formateTimeStamp";
import { MessagesTypes } from "../types";

const SingleMessge = ({
  messages,
  user_id,
}: {
  messages: MessagesTypes;
  user_id: string;
}) => {
  return (
    <div
      className={`rounded-lg w-fit flex gap-3 max-w-2/3 max-w-[400px] text-[12px] md:text-[13px] py-[5px] px-[10px] ${
        messages.senderId === user_id || !messages.senderId
          ? "bg-mychat self-end rounded-tr-none"
          : "rounded-tl-none self-start bg-secondary"
      }`}
    >
      <p>{messages.text}</p>
      <span className="text-[10px] opacity-25 self-end">
        {formatTimestamp(messages.timestamp)}
      </span>
    </div>
  );
};

export default SingleMessge;
