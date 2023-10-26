import { Graphics } from 'pixi.js';
import Vector from './Vector.js';

export default class Shape extends Graphics {
  constructor(x1, y1, x2, y2, friction, color) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.friction = friction;
    this.color = color
  }

  contains(vector) {
    const containsX = (vector.pos.x >= this.x1 && vector.pos.x <= this.x2);
    const containsY = (vector.pos.y >= this.y1 && vector.pos.y <= this.y2);

    return containsX && containsY;
  }

  init() {
    this.beginFill(this.color);
    this.alpha = 0.25;
    this.drawRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    this.endFill();
  }
}