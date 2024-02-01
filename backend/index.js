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
  cors: { origin: process.env.FRONTEND_URL, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.info(`User connected : ${socket.id}`);
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
