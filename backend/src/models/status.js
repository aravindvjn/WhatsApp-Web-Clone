import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaUrl: { type: String, required: true },
    type: {
      type: String,
      enum: ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mkv","text"],
      required: true,
    },
    text: { type: String, default: "" },
    views: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, default: Date.now() },
      },
    ],
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

export const Status = mongoose.model("Status", statusSchema);
