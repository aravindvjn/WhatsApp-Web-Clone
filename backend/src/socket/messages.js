import { Chat } from "../models/chat.js";
import { Message } from "../models/mesage.js";

// Save message to database and notify the receiver
export const saveMessageToDB = async ({
  user,
  chatId,
  message,
  receiverId,
  status,
}) => {
  try {

    if (!message) {
      return { message: "Please provide a message", success: false };
    }
    if (!receiverId) {
      throw new Error();
    }

    // Checking chatId exists, If chatId is not present , its likely a new chat
    if (!chatId) {
      if (!receiverId) {
        throw new Error();
      }
      
      // Checking that its a new chat or not. If yes, then creating a new chat
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

    // Save the new message to the database and update the lastMessage in the chat document.
    const newMessage = new Message({
      chatId: chatId,
      senderId: user.id,
      text: message,
      receiverId,
      status: status || "sent",
    });

    await newMessage.save();

    // Update the lastMessage in the chat
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
