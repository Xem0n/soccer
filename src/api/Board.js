import Field from "./Field";

const GOAL_WIDTH = 1;

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.center = Math.floor(this.width / 2);
    this.fields = this.generate();
    this.size = this.fields.length;
  }

  get(index) {
    return index === undefined ? this.fields : this.fields[index];
  }

  generate() {
    const fields = [...Array(this.width * this.height)].map((_, i) => {
      const x = i % this.width;
      const y = Math.floor(i / this.width);

      const isValid = this.isValid(x, y);
      let isBorder = false;
      let isWinnable = false;

      if (isValid) {
        isBorder = this.isBorder(x, y);
        isWinnable = this.isWinnable(x, y);
      }

      return new Field(i, x, y, isBorder, isValid, isWinnable);
    });

    return fields;
  }

  isValid(x, y) {
    if (y !== 0 && y !== this.height - 1) return true;

    return Math.abs(x - this.center) <= GOAL_WIDTH;
  }

  isBorder(x, y) {
    if (x === this.center && (y <= 1 || y >= this.height - 2)) return false;

    return (
      x === 0 ||
      x === this.width - 1 ||
      y === 0 ||
      y === this.height - 1 ||
      y === 1 ||
      y === this.height - 2
    );
  }

  isWinnable(x, y) {
    if (y !== 0 && y !== this.height - 1) return false;

    return Math.abs(x - this.center) <= GOAL_WIDTH;
  }

  assignDOMToFields(domElements) {
    this.fields.forEach((field, i) => (field.element = domElements[i]));
  }
}

export default Board;
