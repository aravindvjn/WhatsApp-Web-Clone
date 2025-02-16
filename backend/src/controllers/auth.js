import { hashPassword, verifyPassword } from "../helper/hash-password.js";
import UserData from "../models/no-password.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { sanitizeObject } from "../utils/sanitize-object.js";
import { validateSignupInputs } from "../validation/signup-validation.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, displayName } = sanitizeObject(req.body);

    const { file } = req;
    let mediaUrl;

    if (file) {
      const type = req.file.mimetype;
      mediaUrl = `uploads${req.file.path.split("uploads")[1]}`;
      if (!mediaUrl || !type) {
        return res.status(400).json({ message: "Invalid Request." });
      }
    }

    const isVallid = validateSignupInputs({
      username,
      email,
      password,
    });

    if(!isVallid.success){
      return res.status(400).json(isVallid.errors);
    }
    
    const existingEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });

    if (existingEmail && existingUserName) {
      return res.status(400).json({ message: "User already exists" });
    } else if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      throw new Error();
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: mediaUrl,
      displayName: displayName || "Meta User",
    });

    await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const userData = new UserData(user);

    res
      .status(201)
      .json({ message: "User created successfully", user: userData, token });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isMatch = await verifyPassword({
      password,
      hashedPassword: user.password,
    });

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = new UserData(user);
    console.log(userData);

    res.json({ message: "Logged in successfully", user: userData, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(200).json({ user: null });
    }
    const userData = new UserData(user);

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
