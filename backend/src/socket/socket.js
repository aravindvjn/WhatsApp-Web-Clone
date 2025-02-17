import { io } from "../index.js";
import { Message } from "../models/mesage.js";
import { User } from "../models/user.js";
import { saveMessageToDB } from "./messages.js";

// Initialize a map to store online users
const onlineUsers = new Map();
export const socketConnection = (socket) => {

  // Get the user from the socket
  const user = socket.user;
  const userId = user.id;

  // Join user to the socket connection
  socket.join(user.id);

  // Listen for the users who are online
  socket.on("online", async () => {
    onlineUsers.set(userId, socket.id);

    //If online, set all messages to delivered
    try {
      await Message.updateMany(
        { receiverId: userId, status: "sent" },
        { $set: { status: "delivered" } }
      );

    } catch (error) {
      console.error("Error updating messages:", error);
    }

    //Emit updated online users details to the client
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });


  // Listen for new messages
  socket.on("message", async ({ receiverId, message, chatId }) => {

    try {

      // Verifying mandatory data
      if (!receiverId || !message) {
        return socket.emit("error", "Invalid message or recipient.");
      }

      // If the receiver is online setting the status as delivered
      const status = Array.from(onlineUsers.keys()).includes(receiverId)
        ? "delivered"
        : "sent";

      // Saving the new message to database
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

      // Check receiver is online. If yes, emit the message and updated chatList to the user, else do nothing.
      const sendSocketId = onlineUsers.get(receiverId);

      if (sendSocketId) {
        const otherUser = await User.findById(receiverId);

        io.to(receiverId).emit("message", newMessage.message);

        // Formatting the chatList
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

      //Emiting back to the sender
      io.to(userId).emit("message", newMessage.message);
      io.to(userId).emit("chatLists", newChatList);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  });


  // Listening for Typing events. If happening, then emit it to the client
  socket.on("typing", ({ receiverId, chatId }) => {
    io.to(receiverId).emit("typing", {
      chatId,
    });
  });


  // Listening for typing stopping events. If happening, then emit it to the client
  socket.on("stoppedTyping", ({ chatId, receiverId }) => {
    io.to(receiverId).emit("stoppedTyping", {
      chatId,
    });
  });


  // Listening for the newly read messages, and saving it in db and emiting to the user
  socket.on("messageRead", async ({ chatId, senderId, messageId }) => {
    try {

      // Saving it in db
      await Message.updateMany(
        { chatId, status: { $ne: "read" } },
        { $set: { status: "read" } }
      );

      // If the sender is online, emit it to the client
      const isSenderOnline = onlineUsers.get(senderId);

      if(isSenderOnline){
        io.to(senderId).emit("messageRead", { chatId, messageId });
      }
      
    } catch (error) {
      console.error("Error in marking messages as read", error);
    }
  });


  // Listening for video call requests and sending it to the client
  socket.on("videoCallRequest", ({ receiverId, peerId }) => {
    console.log("Video call request");
    io.to(receiverId).emit("videoCallRequest", { peerId, senderId: userId });
  });

  // Listening for the accepting event of video call and sending it to the client
  socket.on("videoCallAccept", ({ peerId, senderId }) => {
    const receiverId = userId;
    io.to(receiverId).emit("videoCallAccept", { peerId, senderId });
    io.to(senderId).emit("videoCallAccept", { peerId, senderId });
  });

  // Disconnecting
  socket.on("disconnect", () => {

    // Remove user from the online users
    if (onlineUsers.has(userId)) {
      console.log(`User Disconnected: ${userId}`);
      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }
    
  });
};
