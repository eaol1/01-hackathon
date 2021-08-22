import { Module } from '../core/module';

export class GameModule extends Module {
  #container
  constructor(type, text) {
    super(type, text);
    this.#container = undefined;
  }
  trigger() {

    let time = 0;
    let score = 0;

    function game() {
      const startBtn = document.querySelector('#start'),
        screens = document.querySelectorAll('.screen'),
        timeList = document.querySelector('#time-list'),
        board = document.querySelector('#board');
      startBtn.addEventListener('click', event => {
        event.preventDefault();
        screens[0].classList.add('up');
      });

      timeList.addEventListener('click', event => {
        if (event.target.classList.contains('time-btn')) {
          time = parseInt(event.target.getAttribute('data-time'));
          screens[1].classList.add('up');
          startGame();
        }
      });

      board.addEventListener('click', (event) => {
        if (event.target.classList.contains('circle')) {
          score++;
          event.target.remove();
          createRandomCircle();
        }
      });
    }

    function setTime(value) {
      const timeEl = document.querySelector('#time');
      timeEl.innerHTML = `00:${value}`;
    }

    function startGame() {
      setInterval(decreaseTime, 1000);
      createRandomCircle();
      setTime(time);
    }

    function decreaseTime() {
      if (time === 0) {
        finishGame();
      } else {
        let current = --time;
        if (current < 10) {
          current = `0${current}`;
        }
        setTime(current);
      }
    }

    function finishGame() {
      const timeEl = document.querySelector('#time'),
        board = document.querySelector('#board');
      timeEl.parentNode.classList.add('hide');
      board.innerHTML = `<h1>Cчёт: <span class='primary'>${score}</span></h1>`;
    }

    function createRandomCircle() {
      const circle = document.createElement('div');
      const size = getRandomNumber(10, 60);
      const { width, height } = board.getBoundingClientRect();
      const color = getRandomColor();
      const x = getRandomNumber(0, width - size);
      const y = getRandomNumber(0, height - size);

      circle.classList.add('circle');
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.top = `${y}px`;
      circle.style.left = `${x}px`;

      circle.style.background = color;
      board.append(circle);
    }

    function getRandomNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function getRandomColor() {
      const color = `rgb(${Math.ceil(Math.random() * 255)} ${Math.ceil(Math.random() * 255)} ${Math.ceil(Math.random() * 255)})`;
      return color;
    }


    this.#container = document.createElement('div');
    this.#container.className = 'container';
    this.#container.id = 'container';
    this.#container.innerHTML = `
    <div>
      <div class="screen">
        <h1>Aim Training</h1>
        <a href="#" class="start" id="start">Начать игру</a>
      </div>
      <div class="screen">
        <h1>Выберите время</h1>
        <ul class="time-list" id="time-list">
          <li>
            <button class="time-btn" data-time=${10}>
              10 сек
            </button>
          </li>
          <li>
            <button class="time-btn" data-time=${20}>
              20 сек
            </button>
          </li>
          <li>
            <button class="time-btn" data-time=${30}>
              30 сек
            </button>
          </li>
          <li>
            <button class="time-btn" data-time=${45}>
              45 сек
            </button>
          </li>
        </ul>
      </div>
      <div class="screen">
        <h3>Осталось <span id="time">00:${0}</span></h3>
        <div class="board" id="board" />
      </div>
    </div>`;
    document.body.append(this.#container);
    game();
  }

}