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
  });

  socket.on("message", async ({ receiverId, message, chatId }) => {
    try {
      if (!receiverId || !message) {
        return socket.emit("error", "Invalid message or recipient.");
      }
      const status = Array.from(onlineUsers.keys()).includes(receiverId)
        ? "delivered"
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
        console.log("Error saving message:", newMessage);
        return socket.emit("error", "Server not responding.");
      }
      let newChatList;
      if (sendSocketId) {
        const otherUser = await User.findById(receiverId);

        io.to(receiverId).emit("message", newMessage.message);
        newChatList = {
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
      io.to(userId).emit("message", newMessage.message);
      io.to(userId).emit("chatLists", newChatList);
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

  socket.on("messageRead", async ({ chatId, senderId, messageId }) => {
    try {
      console.log("Message received");
      await Message.updateMany(
        { chatId, status: { $ne: "read" } },
        { $set: { status: "read" } }
      );

      io.to(senderId).emit("messageRead", { chatId, messageId });
      console.log("Marked as read as emitted");
    } catch (error) {
      console.error("Error in marking messages as read", error);
    }
  });

  // => Video Call Handlers
  socket.on("videoCallRequest", ({ receiverId, peerId }) => {
    console.log("Video call request");
    io.to(receiverId).emit("videoCallRequest", { peerId, senderId: userId });
  });

  socket.on("videoCallAccept", ({ peerId, senderId }) => {
    const receiverId = userId;
    io.to(receiverId).emit("videoCallAccept", { peerId, senderId });
    io.to(senderId).emit("videoCallAccept", { peerId, senderId });
  });

  // => Disconnection
  socket.on("disconnect", () => {
    if (onlineUsers.has(userId)) {
      console.log(`User Disconnected: ${userId}`);
      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }
  });
};
