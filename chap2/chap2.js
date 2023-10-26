import '../style.css';
import { Application, Container }from 'pixi.js';
import Shape from './Shape.js';
import Vector from './Vector';
import FrictionArea from './FrictionArea';

const app = new Application({
    background: '#aaeeaa',
    antialias: true,
    resizeTo: window,
});

const dotContainer = new Container();
const frictionAreaContainer = new Container();

document.body.appendChild(app.view);

let vertical = 0;
let horizontal = 0;

const handleKeyDown = (event) => {
    const multiplier = 0.3;
    console.log('Hi!!');
    switch (event.key) {
        case "ArrowLeft":
            horizontal = -1 * multiplier;
            break;
        case "ArrowRight":
            horizontal = 1 * multiplier;
            break;
        case "ArrowUp":
            vertical = -1 * multiplier;
            break;
        case "ArrowDown":
            vertical = 1 * multiplier;
            break;
    }
}

document.addEventListener('keydown', handleKeyDown);

// setup will be called once, before draw is called
const setup = () => {
  
    // set up dots
    app.stage.addChild(dotContainer);

    let dot = new Shape(50, 50, 10, 0x333333);
    dotContainer.addChild(dot);

    dotContainer.children.forEach((child) => {
        child.init();
    });

    // set up friction areas
    app.stage.addChild(frictionAreaContainer);
    const bodyFriction = new FrictionArea(0, 0, window.innerWidth, window.innerHeight, .01, 0xeeeeee);
    frictionAreaContainer.addChild(bodyFriction);

    // const smallFriction = new FrictionArea(200, 200, 500, 500, .05, 0xee3333);
    // frictionAreaContainer.addChild(smallFriction);

    frictionAreaContainer.children.forEach((child) => {
        child.init();
    })
    
}
// draw will be called on every frame
const draw = (delta) => {
  dotContainer.children.forEach((child) => {
    child.addForce(new Vector(horizontal, vertical));
    child.addGravity();
    console.log('Acc: ', child.acceleration.x, child.acceleration.y, ' Vel: ', child.vel.x, child.vel.y);

    frictionAreaContainer.children.forEach((area) => {
        if (area.contains(child)) {
            child.addFriction(new Vector(area.friction, area.friction));
        }
    })
  });
  vertical = 0;
  horizontal = 0;
}

setup();
app.ticker.add(draw);