import { Chat } from "../models/chat.js";
import { Message } from "../models/mesage.js";

export const saveMessageToDB = async ({
  user,
  chatId,
  message,
  receiverId,
  status
}) => {
  try {
    
    if (!message) {
      return { message: "Please provide a message", success: false };
    }
    if (!receiverId) {
      throw new Error();
    }

    const newMessage = new Message({
      chatId: chatId,
      senderId: user.id,
      text: message,
      receiverId,
      status:status || 'sent'
    });

    await newMessage.save();

    await Chat.findOneAndUpdate(
      {
        participants: { $all: [user.id, receiverId] },
      },
      { lastMessage: newMessage._id },
      { new: true }
    );

    return { message: newMessage, success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to save message", success: false };
  }
};
