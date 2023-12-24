import { WebSocketServer } from "ws";
import { parseArgs } from "node:util";
import GameServer from "./api/GameServer.js";

const DEFAULT_PORT = 6969;
const DEFAULT_WIDTH = 13;
const DEFAULT_HEIGHT = 17;

let {
  values: { port, width, height },
} = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
    },
    width: {
      type: "string",
      short: "w",
    },
    height: {
      type: "string",
      short: "h",
    },
  },
});

port = Number(port);

const wss = new WebSocketServer({
  port: isNaN(port) ? DEFAULT_PORT : port,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024,
  },
});

const gameServer = new GameServer(DEFAULT_WIDTH, DEFAULT_HEIGHT);

wss.on("connection", (ws) => {
  if (!gameServer.addClient(ws)) {
    ws.close();
    return;
  }
});
