class Field {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.element = undefined;
  }

  canApproach(field) {
    return (
      this.x - 1 <= field.x &&
      this.x + 1 >= field.x &&
      this.y - 1 <= field.y &&
      this.y + 1 >= field.y
    );
  }
}

export default Field;
