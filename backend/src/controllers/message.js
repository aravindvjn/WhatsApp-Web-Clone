import { Chat } from "../models/chat.js";
import { Message } from "../models/mesage.js";

export const sendMessage = async (req, res) => {
  try {
    const { user } = req;
    let { chatId, message, receiverId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Please provide a message" });
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

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await Message.find({ chatId })
      .limit(10)
      .sort({ timestamp: -1 });

    res.status(200).json(messages.reverse());
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
