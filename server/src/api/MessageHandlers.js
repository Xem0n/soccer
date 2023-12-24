const MessageHandlers = {
  move: (client, data) => {
    client.makeMove(data.x, data.y);
  },
  default: (client, data) => {
    console.log("default", data);
  },
};

export default MessageHandlers;
