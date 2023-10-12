import { Graphics } from 'pixi.js';
import Vector from './Vector.js';

export default class Shape extends Graphics {
  constructor(x, y, radius, color) {
    super();
    this.pos = new Vector(x, y);
    console.log('position: ', this.pos, this.pos.message);
    this.radius = radius;
    this.color = color;
    this.momentum = new Vector(0.0, 0.0);
  }

  followMouse(mouseX, mouseY) {
    let diff = new Vector(mouseX - this.pos.x, mouseY - this.pos.y);
    diff.mult(0.001);

    this.momentum.add(diff);
    this.momentum.max(5.0);
    console.log('momentum: ', this.momentum.x, this.momentum.y);
    // diff.normalize();
    // diff.mult(this.momentum);
    this.pos.add(this.momentum);
  }

  move({ delta, mouseX, mouseY }) {
    this.followMouse(mouseX, mouseY);

    this.x = this.pos.x;
    this.y = this.pos.y;

    //this.checkBounds();
  }

  checkBounds() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0;
    }
    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0;
    }
  }

  init() {
    this.beginFill(this.color);
    this.drawCircle(this.x, this.y, this.radius);
    this.endFill();
  }
}