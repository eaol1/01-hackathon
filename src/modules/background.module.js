import { Module } from '../core/module';
import { random } from '../utils';

export class BackgroundModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    function getRandomColor() {
      return random(0, 256);
    }
    document.body.animate(
      [
        {
          background: `linear-gradient(90deg, rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()}) 0%, rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}) 179.25%)`,
        },
        {
          background: `linear-gradient(90deg, rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()}) 0%, rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}) 179.25%)`,
        },
        {
          background: `linear-gradient(90deg, rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()}) 0%, rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}) 179.25%)`,
        },
      ],
      {
        duration: 4000,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
  }
}
