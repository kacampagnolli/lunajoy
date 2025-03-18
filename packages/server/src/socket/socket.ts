import { Server } from "socket.io";

let io: Server | null = null;

export const setSocketInstance = (socketInstance: Server) => {
  io = socketInstance;
};

export const getSocketInstance = (): Server => {
  if (!io) {
    throw new Error("Socket instance has not been initialized.");
  }
  return io;
};
