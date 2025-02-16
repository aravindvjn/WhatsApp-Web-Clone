import express from "express";
import { Server } from "socket.io";
import { connectDB } from "./utils/db.js";
import { socketConnection } from "./socket/socket.js";
import cors from "cors";
import { routes } from "./routes/index.js";
import { isAuthenticated } from "./middlewares/is-authenticated.js";
import { createServer } from "http";
import { isAuthenticatedBySocket } from "./middlewares/socket.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("/auth", routes.authRoutes);

app.use(isAuthenticated);

app.use("/users", routes.usersRoutes);

app.use("/chat", routes.chatRoutes);

app.use("/message", routes.messageRoutes);

app.use("/api/status", routes.statusRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.use(isAuthenticatedBySocket);

io.on("connection", socketConnection);
