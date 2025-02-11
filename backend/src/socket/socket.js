import { io } from "../index.js";
import { Message } from "../models/mesage.js";
import { User } from "../models/user.js";
import { saveMessageToDB } from "./messages.js";

const onlineUsers = new Map();
export const socketConnection = (socket) => {
  const user = socket.user;
  const userId = user.id;

  global.chatSocket = socket;
  socket.join(user.id);
  
  socket.on("online", async () => {
    onlineUsers.set(userId, socket.id);

    try {
      await Message.updateMany(
        { receiverId: userId, status: "sent" },
        { $set: { status: "delivered" } }
      );
    } catch (error) {
      console.error("Error updating messages:", error);
    }

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    io.emit("online");
  });

  socket.on("message", async ({ receiverId, message, chatId }) => {
    try {
      if (!receiverId || !message) {
        return socket.emit("error", "Invalid message or recipient.");
      }
      const status = Array.from(onlineUsers.keys()).includes(receiverId)
        ? `delivered`
        : "sent";
      const sendSocketId = onlineUsers.get(receiverId);
      const newMessage = await saveMessageToDB({
        user,
        receiverId,
        message,
        chatId,
        status,
      });
      if (!newMessage.success) {
        return socket.emit("error", "Server not responding.");
      }
      if (sendSocketId) {
        const otherUser = await User.findById(receiverId);

        io.to(receiverId).emit("message", newMessage.message);
        const newChatList = {
          _id: newMessage.message.chatId,
          lastMessage: newMessage.message,
          otherUser: otherUser
            ? {
                _id: otherUser._id,
                username: otherUser.username,
                email: otherUser.email,
                profilePic: otherUser.profilePic,
                displayName: otherUser.displayName,
              }
            : null,
        };

        io.to(receiverId).emit("chatLists", newChatList);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("typing", ({ receiverId, chatId }) => {

    io.to(receiverId).emit("typing", {
      chatId,
    });
  });

  socket.on("stoppedTyping", ({ chatId, receiverId }) => {
      io.to(receiverId).emit("stoppedTyping", {
        chatId,
      });
  });

  socket.on("messageDelivered", ({ messageId }) => {
    try {
      const message = Message.findByIdAndUpdate(messageId, {
        status: "delivered",
      });
      if (!message) {
        return console.error("Message not found to mark as delivered");
      }
      io.to(message.senderId).emit("messageDelivered", messageId);
    } catch (error) {
      console.error("Error in marking message as delivered", error);
    }
  });

  socket.on("messageRead", ({ messageId }) => {
    try {
      const message = Message.findByIdAndUpdate(messageId, {
        status: "read",
      });

      io.to(message.senderId).emit("messageRead", messageId);
    } catch (error) {
      console.error("Error in marking message as delivered", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    onlineUsers.delete(userId);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
};
