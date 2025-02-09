import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) return res.status(401).json({ message: "Not authenticated" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
};
