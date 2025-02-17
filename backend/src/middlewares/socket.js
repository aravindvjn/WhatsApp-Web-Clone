import jwt from "jsonwebtoken"; 


// middleware for socket.io authentication
export const isAuthenticatedBySocket = (socket, next) => {
    const token = socket.handshake.auth.token;
  
    if (!token) {
      return next(new Error("Authentication error"));
    }
  
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // If the token is valid, attach the decoded user data to the socket
      socket.user = decoded; 
      socket.currentChat = socket;

      next(); 

    } catch (err) {
      next(new Error("Invalid token"));
    }
  }