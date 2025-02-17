import { hashPassword, verifyPassword } from "../helper/hash-password.js";
import UserData from "../models/no-password.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { validateSignupInputs } from "../validation/signup-validation.js";
import xss from "xss";


// Signup route controller
export const signup = async (req, res, next) => {
  try {
    let { username, email, password, displayName } = req.body;

    //sanitizing
    username = xss(username?.toLowerCase().replace(/[^a-z0-9_]/g, ""));
    email = xss(email);
    displayName = xss(displayName);

    const { file } = req;
    let mediaUrl;

    // If a file is uploaded, save it and set the mediaUrl
    if (file) {
      const type = req.file.mimetype;
      mediaUrl = `uploads${req.file.path.split("uploads")[1]}`;
      if (!mediaUrl || !type) {
        return res.status(400).json({ message: "Invalid Request." });
      }
    }

    // Validate the signup inputs
    const isVallid = validateSignupInputs({
      username,
      email,
      password,
    });

    if (!isVallid.success) {
      return res.status(400).json(isVallid.errors);
    }

    // Check if user already exists by email or username
    const existingEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });

    // If user already exists, return error message
    if (existingEmail && existingUserName) {
      return res.status(400).json({ message: "User already exists" });
    } else if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      throw new Error();
    }

    // Create a new user document and save it to the database
    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: mediaUrl,
      displayName: displayName || "Meta User",
    });

    await user.save();

    // Generate and return a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Filtering the data to be returned
    const userData = new UserData(user);

    res
      .status(201)
      .json({ message: "User created successfully", user: userData, token });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
};


// Sign-in route controller
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

    // Verifying the password
    const isMatch = await verifyPassword({
      password,
      hashedPassword: user.password,
    });

    // If not, return error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Generate and return a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Filtering the data to be returned
    const userData = new UserData(user);

    res.json({ message: "Logged in successfully", user: userData, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



// checking if the user exists on not , also getting the user data
export const getUserProfile = async (req, res) => {
  try {

    // Get the current user data by token
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(200).json({ user: null });
    }

    // Filter the data to be returned
    const userData = new UserData(user);

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
