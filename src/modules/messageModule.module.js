import { Module } from '../core/module';
import { random } from '../utils';

export class MessageModule extends Module {
  #container;
  #messageArray;
  constructor(type, text) {
    super(type, text);
    this.#messageArray = [
      "Everyone has one’s own path.",
      "Music is the soul of language.",
      "Remember who you are.",
      "It’s better to bum out than to fade away.",
      "Life is a journey.",
      "All we need is love.",
      "Only my dream keeps me alive.",
      "I will get everything I want.",
      "If you want to be somebody, somebody really special, be yourself.",
      "Never look back.",
    ];
    this.#container = undefined;
  }
  trigger() {
    this.#container = document.createElement("div");
    this.#container.className = "randomMessage";
    this.#container.id = "container";
    let i = random(0, this.#messageArray.length - 1);
    this.#container.textContent = `${this.#messageArray[i]}`;
    document.body.append(this.#container);

    setTimeout(() => {
      document.querySelector(".randomMessage")?.remove();
    }, 10000);
  }
}
