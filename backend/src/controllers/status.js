import { Status } from "../models/status.js";

export const createStatus = async (req, res) => {
  try {
    const { mediaUrl, type, text } = req.body;

    if (!mediaUrl || !type) {
      return res.status(400).json({ message: "Invalid Request." });
    }
    const status = new Status({
      mediaUrl,
      type,
      userId: req.user._id,
      text,
    });
    if (!status) {
      throw new Error();
    }
    await status.save();

    res.status(201).json(status);
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
    const statuses = await Status.find({
      userId: { $ne: req.user.id }
    })
    .populate("userId", "_id displayName profilePic username") 
    .sort({ createdAt: -1 });

    res.status(200).json(statuses || []);
  } catch (error) {
    console.error("Error in getting statuses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

