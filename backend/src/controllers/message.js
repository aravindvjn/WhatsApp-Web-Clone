import { Message } from "../models/mesage.js";

// Get messages for a specific user in a specific chat, sorted by timestamp in descending order, and limit to 24 messages.
export const getMessages = async (req, res) => {
  try {
    const { chatId, pageNo } = req.params;

    const userId = req.user.id;

    const limit = 24;
    const skip = 24 * (parseInt(pageNo) - 1) || 0;

    // Find messages in a specific chat where the user is either the sender or the receiver
    const messages = await Message.find({
      chatId,
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .skip(skip)
      .limit(limit)
      .sort({ timestamp: -1 });

    //Find messages which are not marked as read by the user
    const unReadMessagesIds = [];

    messages.map((message) => {
      if (
        message.status !== "read" &&
        message.senderId.toString() === req.user.id.toString()
      ) {
        message.status = "read";
        unReadMessagesIds.push(message._id);
      }
    });

    // Mark messages as read which are received by the user
    if (unReadMessagesIds.length > 0) {
      await Message.updateMany(
        { _id: { $in: unReadMessagesIds } },
        { $set: { status: "read" } }
      );
    }

    res.status(200).json(messages.reverse());
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
