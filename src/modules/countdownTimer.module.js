import { Module } from '../core/module';

export class countdownTimerModule extends Module {
  #container
  constructor(type, text) {
    super(type, text);
    this.#container = undefined;
  }

  trigger() {
    this.#container = document.createElement('div');
    this.#container.className = 'container';
    this.#container.id = 'container';
    this.#creatHTML();
    const btnTimer = document.querySelector(".btn_timer");
    this.btnTimer = btnTimer;
    let hours = undefined;
    let minutes = undefined;
    let seconds = undefined;
    this.btnTimer.addEventListener("click", () => {
      this.#errorTime(false);
      hours =
        +document.querySelector("#hour").value < 0
          ? this.#errorTime(true, "Значение не может быть отрицательным")
          : +document.querySelector("#hour").value;
      if (document.querySelector("#minutes").value < 60) {
        minutes =
          +document.querySelector("#minutes").value < 0
            ? this.#errorTime(true, "Значение не может быть отрицательным")
            : +document.querySelector("#minutes").value;
      } else {
        this.#errorTime(true, "В часе не может быть больше 60 минут!");
      }
      if (document.querySelector("#seconds").value < 60) {
        seconds =
          +document.querySelector("#seconds").value < 0
            ? this.#errorTime(true, "Значение не может быть отрицательным")
            : +document.querySelector("#seconds").value;
      } else {
        this.#errorTime(true, "В минуте не может быть больше 60 секунд!");
      }

      if (
        hours >= 0 &&
        minutes >= 0 &&
        seconds >= 0 &&
        minutes < 60 &&
        seconds < 60
      ) {
        this.#timer(hours, minutes, seconds);
      }
    });
  }

  #creatHTML() {
    this.#container.innerHTML = `
              <div class="container_timer_question">
              <h2>Введите параметры</h2>
              <span class="timer">Часы</span>
              <input type="number" name="hour" id="hour" value="0" max="24" min="0" />
              <span class="timer">Минуты</span>
              <input
                  type="number"
                  name="minutes"
                  id="minutes"
                  value="0"
                  max="60"
                  min="0"
              />
              <span class="timer">Секунды</span>
              <input
                  type="number"
                  name="seconds"
                  id="seconds"
                  value="0"
                  max="60"
                  min="0"
              />
  
              <button class="btn_timer" type="submit">Запустить таймер</button>
              </div>
      `;
    document.body.append(this.#container);
  }
  #errorTime(flag, text) {
    if (flag) {
      this.btnTimer.insertAdjacentHTML(
        "beforebegin",
        `<div class='errorTime'><hr>${text}<hr></div>`
      );
    } else {
      document.querySelectorAll(".errorTime")?.forEach((item) => {
        item.remove();
      });
    }
  }

  #timer(hours, minutes, seconds) {
    this.#container.innerHTML = `
                      <div class="container_timer">
                        <span class="timer">Часа(ов)</span>
                        <span class="hour">${hours}</span>
                        <span class="timer">Минут(ы)</span>
                        <span class="minutes">${minutes}</span>
                        <span class="timer">Секунд(ы)</span>
                        <span class="seconds">${seconds}</span>
                      </div>`;
    document.body.append(this.#container);
    this.#countdown(hours, minutes, seconds);
  }

  #countdown(hours, minutes, seconds) {
    let hourHTML = document.querySelector(".hour");
    let minutesHTML = document.querySelector(".minutes");
    let secondsHTML = document.querySelector(".seconds");
    let total = hours * 3600 + minutes * 60 + seconds;
    let down = setInterval(() => {
      total--;
      hourHTML.textContent = `${Math.trunc(total / 3600)}`;
      minutesHTML.textContent = `${Math.trunc((total / 60) % 60)}`;
      secondsHTML.textContent = `${total % 60}`;
      if (total <= 0) {
        document.querySelector(".container_timer").innerHTML = "Отсчёт окончен";
        clearInterval(down);
        setTimeout(() => {
          document.querySelector(".container_timer").remove();
        }, 2000);
      }
    }, 1000);
  }
}