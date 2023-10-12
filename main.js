import './style.css';
import { Application, Container }from 'pixi.js';
import Shape from './Shape.js';

const app = new Application({
    background: '#1099bb',
    antialias: true,
    resizeTo: window,
});

const dotContainer = new Container();

document.body.appendChild(app.view);

let mouseX = 0;
let mouseY = 0;
let handleMousemove = (event) => {
  mouseX = event.x;
  mouseY = event.y;
  console.log(`mouse position: ${mouseX}:${mouseY}`);
};

document.addEventListener('mousemove', handleMousemove);

// setup will be called once, before draw is called
const setup = () => {
  
    app.stage.addChild(dotContainer);
    const numCols = 1;
    const numRows = 1;
    for (let x = 0; x < numCols; x++) {
      let cX = (window.innerWidth / numCols) * x;
      for (let y = 0; y < numRows; y++) {
        let cY = (window.innerHeight / numRows) * y;
        console.log(cX, cY);

        let dot = new Shape(cX, cY, 10, 0x333333);
        dotContainer.addChild(dot);
      }

    }

    dotContainer.children.forEach((child) => {
        child.init();
    });
}
// draw will be called on every frame
const draw = (delta) => {
  dotContainer.children.forEach((child) => {
    child.move({ delta, mouseX, mouseY});
});
}

setup();
app.ticker.add(draw);