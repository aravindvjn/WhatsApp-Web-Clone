import { Status } from "../models/status.js";
import { Chat } from "../models/chat.js";

// Create a new status
export const createStatus = async (req, res) => {
  try {
    // Validate the request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { text } = req.body;
    const type = req.file.mimetype;
    let mediaUrl = `uploads${req.file.path.split("uploads")[1]}`;

    if (!mediaUrl || !type) {
      return res.status(400).json({ message: "Invalid Request." });
    }

    // Create a new document and save it in the database
    const status = new Status({
      mediaUrl,
      type,
      userId: req.user.id,
      text,
    });

    await status.save();

    res.status(201).json(status);
  } catch (error) {
    console.error("Error in creating a status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update views of a status
export const updateViews = async (req, res) => {
  try {
    const { statusId } = req.params;
    const userId = req.user._id;

    const status = await Status.findById(statusId);
    if (!status) {
      return res.status(404).json({ message: "Status not found." });
    }

    // Check if the user has already viewed the status
    const hasViewed = status.views.some((view) => view.userId.equals(userId));

    //if already viewed then do nothing
    if (hasViewed) {
      return;
    }

    // If not viewed, add a new view with the current timestamp
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

// Get all statuses which are associated with a user ( shows the status of users who have a chat with the user )
export const getStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ participants: userId }).select(
      "participants"
    );

    const chatUserIds = chats.flatMap((chat) => chat.participants);

    const statuses = await Status.find({
      userId: { $in: chatUserIds },
    })
      .populate("userId", "_id displayName profilePic username")
      .sort({ createdAt: -1 });

    // Formatting the structure, Output structure with will be of array of objects with sorted status with userId as a key
    const sortedStatuses = Object.entries(
      statuses.reduce((accum, status) => {
        const userId = status.userId._id;

        if (!accum[userId]) {
          accum[userId] = [];
        }

        accum[userId].push(status);
        return accum;
      }, {})
    ).map(([userId, statuses]) => ({ userId, statuses }));

    res.status(200).json(sortedStatuses || []);
  } catch (error) {
    console.error("Error in getting statuses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
