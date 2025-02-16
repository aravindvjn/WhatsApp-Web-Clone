import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = { _id: { $ne: req.user.id } };

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ username: regex }, { displayName: regex }];
    }

    const allUsers = await User.find(query, "displayName username email profilePic _id");

    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
