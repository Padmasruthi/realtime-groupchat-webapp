const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

/* ===============================
   SOCKET.IO GROUP LOGIC
================================= */

let joinedUsers = [];

io.on("connection", (socket) => {
  console.log("⚡ User Connected:", socket.id);

  socket.on("join_general", (user) => {
    socket.join("general");

    console.log("User joining:", user.name);

    const alreadyJoined = joinedUsers.find(
      (u) => u.userId === user.id
    );

    if (!alreadyJoined) {
      joinedUsers.push({
        userId: user.id,
        name: user.name,
        socketId: socket.id,
      });
    }

    console.log("Total Joined:", joinedUsers.length);

    io.to("general").emit("group_status", {
      count: joinedUsers.length,
      users: joinedUsers,
      active: joinedUsers.length === 3,
    });
  });

  socket.on("send_message", (data) => {
    if (joinedUsers.length === 3) {
      io.to("general").emit("receive_message", data);
    }
  });

  socket.on("disconnect", () => {
    joinedUsers = joinedUsers.filter(
      (u) => u.socketId !== socket.id
    );

    io.emit("group_status", {
      count: joinedUsers.length,
      users: joinedUsers,
      active: joinedUsers.length === 3,
    });

    console.log("❌ User Disconnected:", socket.id);
  });
});

/* ===============================
   SERVER START
================================= */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});