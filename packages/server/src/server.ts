/// <reference path="./types/express.d.ts" />

import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { setSocketInstance } from "./socket/socket";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setSocketInstance(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
