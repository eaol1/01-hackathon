import { Module } from '../core/module';
import { random } from '../utils';

export class ShapeModule extends Module {
  #container;

  constructor(type, text) {
    super(type, text);
    this.#container = undefined;
  }

  trigger() {
    this.#container = document.createElement("div");
    this.#container.className = "container";
    this.#container.id = "container";

    let index = Math.floor(Math.random() * 3);
    if (index === 0) {
      this.#createRandomCircle();
    } else if (index === 1) {
      this.#createRandomSquare();
    } else if (index === 2) {
      this.#createRandomTriangle();
    }
    document.body.append(this.#container);
  }

  #createRandomSquare() {
    const heightClient = document.documentElement.clientHeight;
    const widthClient = document.documentElement.clientWidth;
    const size = random(10, 100);
    const x = random(0, widthClient - size);
    const y = random(0, heightClient - size);
    let color = this.#getRandomColor();

    const canvas = document.createElement("canvas");
    canvas.height = heightClient;
    canvas.width = widthClient;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);

    this.#container.append(canvas);
    console.log(this.#container);
  }

  #createRandomTriangle() {
    const heightClient = document.documentElement.clientHeight;
    const widthClient = document.documentElement.clientWidth;
    const size = random(10, 100);
    const safesizeY = Math.ceil((size * Math.sqrt(2)) / 2);
    const safesizeX = Math.ceil((size * 2) / Math.sqrt(2));
    const x = random(0, widthClient - safesizeX);
    const y = random(0, heightClient - size);

    const x1 = Math.floor(x + safesizeX / 2);
    const y1 = Math.floor(y - safesizeY);
    const x2 = Math.floor(x + safesizeX);
    const y2 = y;
    let color = this.#getRandomColor();

    const canvas = document.createElement("canvas");
    canvas.height = heightClient;
    canvas.width = widthClient;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.fill();

    this.#container.append(canvas);
    console.log(this.#container);
  }

  #createRandomCircle() {
    const circle = document.createElement("div");
    const size = random(10, 100);
    const heightClient = document.documentElement.clientHeight;
    const widthClient = document.documentElement.clientWidth;
    console.log(heightClient, widthClient, size);
    const x = random(0, widthClient - size);
    const y = random(0, heightClient - size);

    this.#setColor(circle);

    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    this.#container.append(circle);
    console.log(document.body);
  }

  #setColor(element) {
    const color = this.#getRandomColor();
    element.style.background = color;
  }

  #getRandomColor() {
    function getRandomColor() {
      return random(0, 256);
    }
    const color = `rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()})`;
    return color;
  }
}
