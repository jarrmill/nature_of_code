import { Graphics } from 'pixi.js';
import Vector from './Vector.js';
import { easeOutCubic, easeInCubic } from './utils.js';

export default class Shape extends Graphics {
  constructor(x, y, radius, color) {
    super();
    this.pos = new Vector(x, y);
    console.log('position: ', this.pos);
    this.radius = radius;
    this.color = color;
    this.acceleration = new Vector(0.01, 0.01);
    this.vel = new Vector(0.01, 0.01);
    console.log('This: ', this);
  }

  followMouse = (mouseX, mouseY) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let mouse = new Vector(mouseX, mouseY);
    let dir = new Vector(this.pos.x, this.pos.y);

    dir.sub(mouse);

    // when closer the ball is to the mouse, the closer to 0.00 this will be. Farther is closer to 1
    let normalizedDiff = new Vector(easeOutCubic(Math.abs(dir.x / windowWidth)) * -1, easeOutCubic(Math.abs(dir.y / windowHeight)) * -1);

    dir.normalize();
    dir.multVector(normalizedDiff);

    this.acceleration.set(dir);

    this.vel.add(this.acceleration);
    this.vel.limit(10);


    this.pos.add(this.vel);
  }

  move({ mouseX, mouseY }) {
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