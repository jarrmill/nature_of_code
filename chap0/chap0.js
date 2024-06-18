import '../style.css'
import { Application, Container } from 'pixi.js'
import Shape from './Shape.js'

const app = new Application({
  background: '#aaeeaa',
  antialias: true,
  resizeTo: window
})

let timeElapsed = 0

const dotContainer = new Container()

document.body.appendChild(app.view)

// setup will be called once, before draw is called
const setup = () => {
  app.stage.addChild(dotContainer)
  let dot = new Shape(
    window.innerWidth / 2,
    window.innerHeight / 2,
    10,
    0x333333
  )
  dotContainer.addChild(dot)

  dot.init()
  //   dotContainer.children.forEach((child) => {
  //     child.init()
  //   })
}
// draw will be called on every frame
const draw = (delta) => {
  dotContainer.children.forEach((child) => {
    child.move({ delta, timeElapsed })
    timeElapsed += 1
  })
}

setup()
app.ticker.add(draw)
