import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
