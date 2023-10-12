export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.add = this.add.bind(this);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  max(max) {
    if (this.x > max) {
      this.x = max;
    }
    if (this.y > max) {
      this.y = max;
    }
    if (this.x < -max) {
      this.x = -max;
    }
    if (this.y < -max) {
      this.y = -max;
    }
  }
}