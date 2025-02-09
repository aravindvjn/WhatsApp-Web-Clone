import { MessagesTypes } from "../types";
import SingleMessge from "./single-message";

const Chats = ({
  messages,
  user_id,
}: {
  messages: MessagesTypes[];
  user_id: string;
}) => {
  return (
    <div className=" h-full pt-[65px] pb-[75px] overflow-y-scroll scrollbar-hide flex flex-col px-[20px] md:px-[40px]  gap-[10px]">
      {
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <SingleMessge
              user_id={user_id}
              key={message._id}
              messages={message}
            />
          );
        })}
    </div>
  );
};

export default Chats;
