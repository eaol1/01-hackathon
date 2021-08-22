import { Module } from '../core/module';
import { random } from '../utils';

export class AudioModule extends Module {
  #container;
  #audioArray;
  constructor(type, text) {
    super(type, text);
    this.#audioArray = [
      "../src/audio/Audio1.mp3",
      "../src/audio/Audio2.mp3",
      "../src/audio/Audio3.mp3",
      "../src/audio/Audio4.mp3",
      "../src/audio/Audio5.mp3",
    ];
    this.#container = undefined;
  }

  trigger() {
    this.#container = document.createElement("div");
    this.#container.className = "randomAudio";
    this.#container.id = "container";
    let i = random(0, this.#audioArray.length - 1);
    const audio = new Audio();
    audio.setAttribute('controls', 'controls');
    audio.preload = "auto";
    audio.src = `${this.#audioArray[i]}`;
    audio.autoplay = true;
    this.#container.innerHTML = `
    <style>
      body {
        background-color: darkcyan;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      audio {
        box-shadow: 2px 2px 10px rgba(0,0,0,.3);
        border-radius: 30px;
      }
    </style>`;
    this.#container.append(audio);
    document.body.append(this.#container);
    return true;
  }
}
