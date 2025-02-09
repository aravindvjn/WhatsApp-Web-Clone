import { Chat } from "../models/chat.js";
import { Message } from "../models/mesage.js";

export const saveMessageToDB = async ({
  user,
  chatId,
  message,
  receiverId,
}) => {
  try {
    if (!message) {
      return { message: "Please provide a message", success: false };
    }
    if (!chatId) {
      if (!receiverId) {
        throw new Error();
      }

      const existingChat = await Chat.findOne({
        participants: { $all: [user.id, receiverId] },
      });

      if (existingChat) {
        chatId = existingChat._id;
      } else {
        const chat = new Chat({
          participants: [user.id, receiverId],
        });

        await chat.save();

        chatId = chat._id;
      }
    }

    const newMessage = new Message({
      chatId: chatId,
      senderId: user.id,
      text: message,
    });

    await newMessage.save();

    await Chat.findByIdAndUpdate(
      chatId,
      { lastMessage: newMessage._id },
      { new: true }
    );

    return { message: newMessage, success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to save message", success: false };
  }
};
