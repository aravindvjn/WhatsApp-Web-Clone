import { Status } from "../models/status.js";
import { Chat } from "../models/chat.js";

export const createStatus = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { text } = req.body;
    const type = req.file.mimetype;
    const mediaUrl = req.file.path;
    console.log("media",mediaUrl, type);
    if (!mediaUrl || !type) {
      return res.status(400).json({ message: "Invalid Request." });
    }
    console.log("media",mediaUrl, type);
    const status = new Status({
      mediaUrl,
      type,
      userId: req.user.id,
      text,
    });

    await status.save();

    res.status(201).json(status);
    console.log(status);
  } catch (error) {
    console.error("Error in creating a status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateViews = async (req, res) => {
  try {
    const { statusId } = req.params;
    const userId = req.user._id;

    const status = await Status.findById(statusId);
    if (!status) {
      return res.status(404).json({ message: "Status not found." });
    }

    const hasViewed = status.views.some((view) => view.userId.equals(userId));

    if (hasViewed) {
      return;
    }

    const updatedStatus = await Status.findByIdAndUpdate(
      statusId,
      {
        $push: {
          views: {
            userId,
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedStatus);
  } catch (error) {
    console.error("Error in updating status views:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ participants: userId }).select(
      "participants"
    );

    const chatUserIds = chats.flatMap((chat) =>
      chat.participants.filter((id) => id.toString() !== userId)
    );

    const statuses = await Status.find({
      userId: { $in: chatUserIds },
    })
      .populate("userId", "_id displayName profilePic username")
      .sort({ createdAt: -1 });

    res.status(200).json(statuses || []);
  } catch (error) {
    console.error("Error in getting statuses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
