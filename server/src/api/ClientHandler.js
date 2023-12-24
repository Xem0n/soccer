import MessageHandlers from "./MessageHandlers.js";

class ClientHandler {
  #game;

  constructor(socket, game) {
    this.socket = socket;
    this.#game = game;

    this.#setupSocketEvents();
  }

  makeMove(x, y) {
    const field = this.#game.board.find(x, y);

    if (!field) return;

    if (this.#game.readyMove(field)) this.#game.acceptMove();
  }

  #setupSocketEvents() {
    this.socket.on("message", (data) => {
      data = JSON.parse(data.toString());

      const handler = MessageHandlers[data.type] ?? MessageHandlers.default;

      handler(this, data.data);
    });
  }
}

export default ClientHandler;
