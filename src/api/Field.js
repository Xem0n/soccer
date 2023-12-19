class Field {
  constructor(id, x, y, isBorder = false, isValid = true, isWinnable = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isBorder = isBorder;
    this.isValid = isValid;
    this.isWinnable = isWinnable;
    this.element = undefined;
  }

  canApproach(field) {
    return Math.abs(this.x - field.x) <= 1 && Math.abs(this.y - field.y) <= 1;
  }
}

export default Field;
