class Move {
  constructor(from, to, player, type) {
    this.from = from;
    this.to = to;
    this.player = player;
    this.type = type;
  }

  has(field1, field2) {
    if (field2 === undefined) return this.from === field1 || this.to === field1;

    return (
      (this.from === field1 && this.to === field2) ||
      (this.from === field2 && this.to === field1)
    );
  }
}

export default Move;
