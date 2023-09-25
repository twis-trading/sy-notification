import socketIoClient from "socket.io-client";

const createSocketConnection = (serverUrl) => {
  const socket = socketIoClient(serverUrl);

  socket.on("connect", () => {
    console.log("Socket connected to server.");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected from server.");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error);
  });

  return socket;
};

export default createSocketConnection;
