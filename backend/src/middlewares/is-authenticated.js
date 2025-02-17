import jwt from "jsonwebtoken";

// Authentication middleware for all users
export const isAuthenticated = async (req, res, next) => {
  try {
    // Check if the Authorization header exists and extract the token
    const authHeader = req.header("Authorization");

    if (!authHeader) return res.status(401).json({ message: "Not authenticated" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;

    // If the token is valid, move on to the next middleware or route else return 
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
};
