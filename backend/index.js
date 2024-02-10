// Load environment variables from .env file
require("dotenv").config();

const express = require("express");

const app = express();

const http = require("http");

const { Server } = require("socket.io");

const cors = require("cors");

app.use(cors());

app.use(express.json());

const router = require("./src/router");

app.use("/api", router);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.FRONTEND_URL, process.env.LOCAL_NETWORK_URL],
    methods: ["GET", "POST"],
  },
});

const loggedUsers = [];
const sockets = [];
io.on("connection", (socket) => {
  console.info(`User connected : ${socket.id}`);

  socket.on("join", (data) => {
    if (!loggedUsers.find((e) => e.id === data.id)) {
      loggedUsers.push(data);
      sockets.push(socket.id);

      io.emit("user_loggedIn", loggedUsers);
    }
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("user_update", () => {
    io.emit("fetch_users");
  });

  socket.on("disconnect", () => {
    const index = sockets.indexOf(socket.id);
    loggedUsers.splice(index, 1);
    console.info(`${socket.id} logged out`);
    io.emit("user_loggedOut", loggedUsers);
  });
});

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
httpServer
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
