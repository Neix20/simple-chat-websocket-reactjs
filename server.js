const WebSocket = require('ws');

const dotenv = require('dotenv');

// Load Dotenv Config
dotenv.config();

const ws_port = process.env.WS_PORT || "8080";

const wss = new WebSocket.Server({ port: ws_port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});