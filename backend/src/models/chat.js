import mongoose  from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], 
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, 
    unreadCount: { type: Map, of: Number, default: {} }, 
    createdAt: { type: Date, default: Date.now },
  });
  
export const Chat = mongoose.model("Chat", chatSchema);
  