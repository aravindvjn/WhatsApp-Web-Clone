import jwt from "jsonwebtoken"; 


export const isAuthenticatedBySocket = (socket, next) => {
    const token = socket.handshake.auth.token;
  
    if (!token) {
      return next(new Error("Authentication error"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      socket.user = decoded; 
      socket.currentChat = socket
      next(); 
    } catch (err) {
      next(new Error("Invalid token"));
    }
  }