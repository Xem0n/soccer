import { useEffect, useRef, useState } from "react";
import Game from "../api/Game";
import MoveTypes from "../api/MoveTypes";
import Field from "./Field";
import styles from "./Soccer.module.css";

const WIDTH = 9;
const HEIGHT = 13;

const GREY = "#bbb";

const game = new Game(WIDTH, HEIGHT);

function Soccer() {
  const [moves, setMoves] = useState([]);
  const fieldRefs = useRef([]);

  const getColor = (move) => move.type === MoveTypes.Preview ? GREY : move.color;

  const updateMoves = () =>
    setMoves(
      game.moves.map((move, i) => (
        <line
          key={i}
          x1={getX(move.from.element)}
          y1={getY(move.from.element)}
          x2={getX(move.to.element)}
          y2={getY(move.to.element)}
          stroke={getColor(move)}
          strokeWidth="4px"
        />
      )),
    );

  const ready = (field) => {
    game.readyMove(field);
    updateMoves();
  };

  const cancel = () => {
    game.cancelMove();
    updateMoves();
  };

  const accept = () => {
    game.acceptMove();
    updateMoves();
  };

  const fields = game.board.map((field, i) => (
    <Field
      key={i}
      divRef={(el) => (fieldRefs.current[i] = el)}
      ready={() => ready(field)}
      cancel={cancel}
      accept={accept}
    />
  ));

  const getX = (element) =>
    element.offsetLeft + parseInt(getComputedStyle(element).width) / 2;
  const getY = (element) =>
    element.offsetTop + parseInt(getComputedStyle(element).height) / 2;

  useEffect(() => {
    game.assignDOMToFields(fieldRefs.current);
    updateMoves();

    return () => {
      game.assignDOMToFields([]);
      setMoves([]);
    };
  }, []);

  return (
    <div
      className={styles.Soccer}
      style={{ gridTemplateColumns: `repeat(${WIDTH}, 1fr)` }}
    >
      {fields}

      <svg>{moves}</svg>
    </div>
  );
}

export default Soccer;
