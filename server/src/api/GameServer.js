import { Game } from "shared";
import ClientHandler from "./ClientHandler.js";

const PLAYER_LIMIT = 2;

class GameServer {
  #game;
  #clients = [];

  constructor(width, height) {
    this.#game = new Game(width, height);
  }

  canStart() {
    return this.#clients.length === PLAYER_LIMIT;
  }

  start() {
    this.broadcast({ type: "start" });
  }

  stop() {
    this.broadcast({ type: "stop" });
  }

  addClient(socket) {
    if (this.#clients.length >= PLAYER_LIMIT) return false;

    this.#clients.push(new ClientHandler(socket, this.#game));

    socket.on("close", () => {
      this.#clients = this.#clients.filter((c) => c.socket !== socket);

      this.stop();
    });

    if (this.canStart()) this.start();

    return true;
  }

  broadcast(message) {
    this.#clients.forEach((client) => {
      client.socket.send(JSON.stringify(message));
    });
  }
}

export default GameServer;
