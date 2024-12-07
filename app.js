const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Broadcast incoming message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
