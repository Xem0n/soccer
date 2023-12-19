import Board from "./Board";
import Move from "./Move";
import MoveTypes from "./MoveTypes";
import Player from "./Player";

const PLAYERS = {
  black: new Player("Player #1", "#000"),
  red: new Player("Player #2", "#f13"),
};

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = new Board(width, height);
    this.moves = [];

    this.current = this.board.get(Math.floor(this.board.size / 2));
    this.player = PLAYERS.black;

    this.win = false;
    this.onWin = () => {};
  }

  assignDOMToFields(domElements) {
    this.board.assignDOMToFields(domElements);
  }

  canMakeMove(field) {
    if (
      !this.win &&
      this.current !== field &&
      field.isValid &&
      !this.isMoveThroughBorder(field) &&
      this.current.canApproach(field) &&
      !this.isMoveAlreadyDone(field)
    )
      return true;
  }

  isMoveThroughBorder(field) {
    return (
      this.current.isBorder &&
      field.isBorder &&
      (this.current.x === field.x || this.current.y === field.y)
    );
  }

  isMoveAlreadyDone(field) {
    return this.moves.some((move) => move.has(this.current, field));
  }

  canReflect() {
    const field = this.current;

    return field.isBorder || this.isFieldAlreadyUsed(field);
  }

  isFieldAlreadyUsed(field) {
    return this.moves.some(
      (move) => move.has(field) && move.type === MoveTypes.Done,
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

    if (!this.checkWin() && !this.canReflect()) this.switchPlayer();

    lastMove.type = MoveTypes.Done;
  }

  cancelMove() {
    const lastMove = this.moves[this.moves.length - 1];

    if (lastMove && lastMove.type === MoveTypes.Preview) this.moves.pop();
  }

  switchPlayer() {
    this.player = this.player === PLAYERS.black ? PLAYERS.red : PLAYERS.black;
  }

  checkWin() {
    if (!this.current.isWinnable) return false;

    this.win = true;
    this.onWin(this.player);

    return true;
  }
}

export default Game;
