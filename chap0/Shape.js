import { Graphics } from 'pixi.js'
import { createNoise2D } from 'simplex-noise'
import Vector from './Vector.js'

export default class Shape extends Graphics {
  constructor(x, y, radius, color) {
    super()
    this.pos = new Vector(x, y)
    console.log('position: ', this.pos)
    this.radius = radius
    this.color = color
    this.acceleration = new Vector(0.01, 0.01)
    this.vel = new Vector(0.01, 0.01)
    this.noise = createNoise2D()
  }

  move({ delta, timeElapsed }) {
    // console.log('noise: ', this.noise(1, timeElapsed), timeElapsed)
    const xChange = this.noise(1, timeElapsed * 0.01)
    const yChange = this.noise(1, timeElapsed * 0.01 + 5000)
    this.pos.x += xChange
    this.pos.y += yChange
    this.x = this.pos.x
    this.y = this.pos.y

    this.checkBounds()
  }

  checkBounds() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0
    }
    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0
    }
  }

  init() {
    this.beginFill(this.color)
    this.drawCircle(this.x, this.y, this.radius)
    this.endFill()
  }
}
