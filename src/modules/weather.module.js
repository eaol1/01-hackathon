import { Module } from '../core/module';

export class WeatherModule extends Module {
  #API_KEY
  #form
  #data
  #weatherObj
  constructor(type, text) {
    super(type, text);
    this.#API_KEY = 'bac6fa435e78fb1f8cd0aac8cb75c179';
    this.form = undefined;
    this.#data = undefined;
    this.#weatherObj = {
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined
    };
  }

  #setAttributes(element, attributes) {
    Object.keys(attributes).forEach(name => {
      element.setAttribute(name, attributes[name]);
    })
  }

  #createForm() {
    this.#form = document.createElement('form');
    this.#form.className = 'weather-form';
    const input = document.createElement('input');
    this.#setAttributes(input, {
      placeholder: "Укажите ваш город",
      type: "text",
      name: "city"
    });
    const button = document.createElement('button');
    this.#setAttributes(button, {
      class: "btn",
      type: "submit",
    });
    button.innerText = 'Получить погоду';
    this.#form.append(input, button);
    this.#form.addEventListener('submit', this.#gettingWeather);
    return this.#form;
  }

  #gettingWeather = async (e) => {
    e.preventDefault();
    try {
      const city = e.target.city.value;
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.#API_KEY}&units=metric&lang=ru`);
        if (!api_url.ok) {
          throw new Error('Город не найден!');
        }
        this.#data = await api_url.json();
        const date = new Date(this.#data.sys.sunset);
        const formatSunset = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        this.#weatherObj = {
          temp: this.#data.main.temp,
          city: this.#data.name,
          country: this.#data.sys.country,
          pressure: this.#data.main.pressure,
          sunset: formatSunset,
          error: this.#data.message
        }

        const weather = this.#showWeather();
        const info = document.querySelector('.weather-info');
        info?.remove();

        const container = document.querySelector('.weather-container');
        container.append(weather);
      }
    } catch (e) {
      console.error(e);
      this.#weatherObj = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Вы не ввели, либо не корректно указали название города"
      }

      const weather = this.#showWeather();
      const info = document.querySelector('.weather-info');
      info?.remove();

      const container = document.querySelector('.weather-container');
      container.append(weather);
    }
  }

  #showWeather() {
    const weatherBox = document.createElement('div');
    weatherBox.className = 'weather-info';
    const data = `
      <div>
        <p>Местоположение: ${this.#weatherObj.city}, ${this.#weatherObj.country}</p>
        <p>Температура: ${this.#weatherObj.temp}°C</p>
        <p>Давление: ${this.#weatherObj.pressure} hPa</p>
        <p>Заход солнца: ${this.#weatherObj.sunset}</p>
      </div>`;
    const error = `<p className="error">${this.#weatherObj.error}</p>`;
    weatherBox.innerHTML = this.#weatherObj.city ? data : error;

    return weatherBox;
  }

  trigger() {
    const container = document.createElement('div');
    container.className = 'weather-container';
    container.id = 'container';
    const leftBlock = document.createElement('div');
    const header = document.createElement('h2')
    header.textContent = 'Погодное приложение';
    const description = document.createElement('p');
    description.innerText = 'Узнайте погоду в ваше городе!';
    const form = this.#createForm();
    leftBlock.append(header, description, form);
    container.append(leftBlock);
    document.body.append(container);
  }
}
