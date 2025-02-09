import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  displayName: { type: String, default: "Meta User" },
  profilePic: { type: String, default: null },
  status: { type: String, default: "Hey there! I am using WhatsApp." },
  lastSeen: { type: Date, default: Date.now },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

export const User = mongoose.model("User", userSchema);
