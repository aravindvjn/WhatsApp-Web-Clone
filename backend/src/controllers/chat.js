import { Chat } from "../models/chat.js";

export const getChats = async (req, res) => {
  try {
    const { user } = req;

    const chats = await Chat.find({ participants: user.id })
      .populate("participants", "username displayName profilePic _id")
      .populate("lastMessage")
      .exec();

    if (!chats.length) {
      return res.status(200).json([]);
    }

    const formattedChats = chats.map((chat) => {
      const otherUser = chat.participants.find(
        (participant) => participant._id.toString() !== user.id.toString()
      );

      return {
        _id: chat._id,
        lastMessage: chat.lastMessage || null,
        otherUser:
          {
            _id: otherUser._id,
            username: otherUser.username,
            email: otherUser.email,
            profilePic: otherUser.profilePic,
            displayName: otherUser.displayName,
          } || null,
      };
    });

    res.status(200).json(formattedChats || []);
  } catch (error) {
    
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};
