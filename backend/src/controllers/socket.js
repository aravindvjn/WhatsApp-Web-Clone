import { io } from "../index.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { saveMessageToDB } from "../socket/messages.js";

export const socketConnection = (socket) => {
  const user = socket.user;

  console.log(`User Connected: ${socket.id}`);

  socket.join(user.id);

  socket.on("privateMessage", async ({ receiverId, message, chatId }) => {
    try {
      if (!receiverId || !message) {
        return socket.emit("error", "Invalid message or recipient.");
      }

      // Save message to DB
      const newMessage = await saveMessageToDB({
        user,
        receiverId,
        message,
        chatId,
      });

      if(!newMessage.success) {
        socket.emit("error", "Server not responding.");
        return;
      }

      const otherUser = await User.findById(receiverId);

      const newChatList = [{
        _id: newMessage.message.chatId,
        lastMessage: newMessage.message,
        otherUser:
          {
            _id: otherUser._id,
            username: otherUser.username,
            email: otherUser.email,
            profilePic: otherUser.profilePic,
            displayName: otherUser.displayName,
          } || null,
      }]

      io.to(receiverId).to(user.id).emit("chatLists", {
        newChatList,
      });

      console.log(
        `Private message from ${user.id} to ${receiverId}: ${message}`
      );
      
    } catch (error) {
      console.error("Private message error:", error);
      socket.emit("error", "Failed to send private message.");
    }
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
};
