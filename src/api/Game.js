import Field from "./Field";
import Move from "./Move";
import MoveTypes from "./MoveTypes";

const BLACK = "#000";
const RED = "#f13";

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = this.generateBoard();
    this.moves = [];

    this.current = this.board[Math.floor(this.board.length / 2)];
    this.player = BLACK;
  }

  assignDOMToFields(domElements) {
    this.board.forEach((field, i) => (field.element = domElements[i]));
  }

  canMakeMove(field) {
    if (
      this.current !== field &&
      !this.isMoveThroughBorder(field) &&
      this.isFieldApproachable(field) &&
      !this.isMoveAlreadyDone(field)
    )
      return true;
  }

  isMoveThroughBorder(field) {
    return (
      (this.current.x === 0 && field.x === 0) ||
      (this.current.x === this.width - 1 && field.x === this.width - 1) ||
      (this.current.y === 0 && field.y === 0) ||
      (this.current.y === this.height - 1 && field.y === this.height - 1)
    );
  }

  isFieldApproachable(field) {
    return (
      this.current.x - 1 <= field.x &&
      this.current.x + 1 >= field.x &&
      this.current.y - 1 <= field.y &&
      this.current.y + 1 >= field.y
    );
  }

  isMoveAlreadyDone(field) {
    return this.moves.some(
      (move) =>
        (move.from === this.current && move.to === field) ||
        (move.from === field && move.to === this.current),
    );
  }

  canReflect() {
    const field = this.current;

    return (
      field.x === 0 ||
      field.x === this.width - 1 ||
      field.y === 0 ||
      field.y === this.height - 1 ||
      this.isFieldAlreadyUsed(field)
    );
  }

  isFieldAlreadyUsed(field) {
    return this.moves.some(
      (move) =>
        (move.from === field || move.to === field) &&
        move.type === MoveTypes.Done,
    );
  }

  readyMove(field) {
    if (!this.canMakeMove(field)) return;

    const lastMove = this.moves[this.moves.length - 1];

    if (lastMove && lastMove.type === MoveTypes.Preview) this.moves.pop();

    this.moves.push(
      new Move(this.current, field, this.player, MoveTypes.Preview),
    );
  }

  acceptMove() {
    const lastMove = this.moves[this.moves.length - 1];

    if (
      lastMove === undefined ||
      lastMove.to === this.current ||
      lastMove.type !== MoveTypes.Preview
    )
      return;

    this.current = lastMove.to;

    if (!this.canReflect()) this.switchPlayer();

    lastMove.type = MoveTypes.Done;
  }

  cancelMove() {
    const lastMove = this.moves[this.moves.length - 1];

    if (lastMove && lastMove.type === MoveTypes.Preview) this.moves.pop();
  }

  switchPlayer() {
    this.player = this.player === BLACK ? RED : BLACK;
  }

  generateBoard() {
    const fields = [...Array(this.width * this.height)].map(
      (_, i) => new Field(i, i % this.width, Math.floor(i / this.width)),
    );

    return fields;
  }
}

export default Game;
