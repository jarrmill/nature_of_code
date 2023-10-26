import { Graphics } from 'pixi.js';
import Vector from './Vector.js';

export default class Shape extends Graphics {
  constructor(x, y, radius, color) {
    super();
    this.pos = new Vector(x, y);
    this.radius = radius;
    this.color = color;
    this.acceleration = new Vector(0.00, 0.00);
    this.gravity = 0.00;
    this.vel = new Vector(0.00, 0.00);
  }


  addForce(vector) {

    this.x = this.pos.x;
    this.y = this.pos.y;

    this.acceleration.add(vector);
    if (this.acceleration.x < 0.001 && this.acceleration.x > -.001) {
        this.acceleration.x = 0;
    }
    if (this.acceleration.y < 0.001 && this.acceleration.y > -.001) {
        this.acceleration.y = 0;
    }
    this.vel.add(this.acceleration);
    this.vel.limit(10);


    this.pos.add(this.vel);

    this.checkBounds();
  }

  addFriction(vector) {
    if (Math.abs(this.acceleration.x) < .001 && Math.abs(this.acceleration.x) > 0) {
        return;
    }

    let xFactor;
    const isXPos = this.vel.x > 0;
    const isYPos = this.vel.y > 0;
    if (isXPos) {
        xFactor = vector.x * -1;
    } else if (this.vel.x == 0) {
        xFactor = 0;
    } else {
        xFactor = vector.x;
    }

    // logic to stop X from changing direction entirely
    const xNowNeg = isXPos && this.acceleration.x - xFactor < 0;
    const xNowPos = !isXPos && this.acceleration.x - xFactor > 0;

    if (xNowNeg || xNowPos) {
        xFactor = 0;
    }

    let yFactor;
    if (isYPos) {
        yFactor = vector.y * -1;
    } else if (this.vel.y == 0) {
        yFactor = 0;
    } else {
        yFactor = vector.y;
    }

    // logic to stop Y from changing direction entirely
    const yNowNeg = isYPos && this.acceleration.y - yFactor < 0;
    const yNowPos = !isYPos && this.acceleration.y - yFactor > 0;

    if (yNowNeg || yNowPos) {
        yFactor = 0;
    }
    this.acceleration.add(new Vector(xFactor, yFactor));
    this.vel.add(new Vector(xFactor, yFactor));
  }

  addGravity() {
    this.gravity += 0.01;
    this.gravity = Math.min(this.gravity, .05);
    this.vel.add(new Vector(0, this.gravity));
  }

  checkBounds() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0;
    }
    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0;
    }
    if (this.pos.x < 0) {
        this.pos.x = window.innerWidth;
      }
      if (this.pos.y < 0 ) {
        this.pos.y = window.innerHeight;
      }
  }

  init() {
    this.beginFill(this.color);
    this.drawCircle(this.x, this.y, this.radius);
    this.endFill();
  }
}