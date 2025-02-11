import express from "express";
import { Server } from "socket.io";
import { connectDB } from "./utils/db.js";
import { socketConnection } from "./socket/socket.js";
import cors from "cors";
import { routes } from "./routes/index.js";
import { isAuthenticated } from "./middlewares/is-authenticated.js";
import { createServer } from "http";
import { isAuthenticatedBySocket } from "./middlewares/socket.js";

const app = express();

const PORT = 3000;
connectDB();

const server = createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(express.json());

//Routes
app.use("/auth", routes.authRoutes);

app.use(isAuthenticated);

app.use("/users", routes.usersRoutes);

app.use("/chat", routes.chatRoutes);

app.use("/message", routes.messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.use(isAuthenticatedBySocket);

io.on("connection", socketConnection);
