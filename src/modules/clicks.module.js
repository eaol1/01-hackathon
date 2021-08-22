import { Module } from '../core/module';

export class ClicksModule extends Module {
  #container;
  #time;
  #score;
  constructor(type, text) {
    super(type, text);
    this.#container = undefined;
  }

  trigger() {
    this.#time = 3;
    this.#score = 0;
    this.#container = document.createElement("div");
    this.#container.className = "container";
    this.#container.id = "container";
    this.#container.innerHTML = `<h2>Для аналитики кликов,<br>пожалуйста, кликайте по экрану</h2>`;
    const divClicks = document.createElement("span");
    divClicks.className = "container_clicks_count";
    divClicks.textContent = `${this.#time}`;

    this.#countClicks();
    let countDown = setInterval(() => {
      this.#time--;
      if (this.#time < 1) {
        let result = this.#score;
        divClicks.textContent = "Отсчёт закончен";
        setTimeout(() => {
          divClicks.textContent = `Ваш счёт: ${result}`;
        }, 1500);
        clearInterval(countDown);
      } else {
        divClicks.textContent = `${this.#time}`;
      }
    }, 1000);
    this.#container.append(divClicks);
    document.body.append(this.#container);
  }

  #countClicks() {
    document.body.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const { target } = event;
      if (target === document.body) {
        this.#score++;
        console.log(this.#score);
      }
    });
  }
}
