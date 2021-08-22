import './styles.css';

import { ContextMenu } from './menu';
import { AudioModule } from './modules/audio.module';
import { BackgroundModule } from './modules/background.module';
import { ClicksModule } from './modules/clicks.module';
import { countdownTimerModule } from './modules/countdownTimer.module';
import { GameModule } from './modules/game.module';
import { MessageModule } from './modules/messageModule.module';
import { ShapeModule } from './modules/shape.module';
import { WeatherModule } from './modules/weather.module';

const contextMenu = new ContextMenu('#menu');

// Подключаем модули
const modules = [
  { module: new countdownTimerModule('CountdownTimerModule', 'Таймер отсчета'), description: 'Модуль "Таймер отсчета" позволяет задавать параметры таймера в часах, минутах и  секундах. Указанные параметры запускаются в виде блока с таймером обратного отсчета на странице. По истечении времени отсчета блок с таймером удаляется со страницы и отображается сообщение о завершении таймера.' },
  { module: new BackgroundModule('BackgroundModule', 'Поменять цвет фона страницы'), description: 'Модуль "Поменять цвет фона страницы" в контекстном меню сменяет скучный белый фон страницы на динамически меняющиеся цвета, при использовании технологии градиентов.' },
  { module: new WeatherModule('WeatherModule', 'Прогноз погоды'), description: 'Модуль "Прогноз погоды" показывает погоду в Вашем городе, Вам всего лишь необходимо ввести в поле название Вашего города.' },
  { module: new GameModule('GameModule', 'Игра'), description: 'Отличная игра на реакцию, чтобы отвлечься от рутины ).' },
  { module: new MessageModule('MessageModule', 'Случайное сообщение'), description: 'Модуль показывает на странице случайную цитату на английском языке. Цитата удаляется со страницы через 10 секунд.' },
  { module: new AudioModule('AudioModule', 'Случайная мелодия'), description: 'Модуль "Случайная мелодия" воспроизводит случайную аудио дорожку.' },
  { module: new ClicksModule('ClicksModule', 'Аналитика кликов'), description: 'Модуль "Аналитика кликов" запускает таймер обратного отсчёта, выставленного на 3 секунды и считает сколько кликов мышкой вы успеете сделать за это короткое время.' },
  { module: new ShapeModule('ShapeModule', 'Случайная фигура'), description: 'Модуль "Случайная фигура" случайным образом создаёт треугольник, квадрат или круг, случайного размера и случайного цвета. Случайно буквально всё.' },
];

// Вызываем пункт меню
const menu = document.querySelector('#menu');
menu.addEventListener('click', e => {
  for (let i in modules) {
    if (e.target.dataset.type == modules[i].module.type) {
      // Удаляем предыдущий файл со стилями модуля
      document.querySelector('#moduleStyle')?.remove();
      document.body.append()
      // Добавляем файл со стилями модуля
      const moduleStyles = document.createElement('link');
      moduleStyles.href = `/src/modules/styles/${modules[i].module.type}.css`;
      moduleStyles.setAttribute('rel', 'stylesheet');
      moduleStyles.id = 'moduleStyle';
      document.head.append(moduleStyles);

      // Очищаем контейнер
      const container = document.querySelector('#container');
      container?.remove();

      // Запускаем выбранный в контекстном меню модуль
      setTimeout(() => { modules[i].module.trigger() }, 0);
      contextMenu.close();
    }
  }
});

// Добавляем пункты контекстного меню
for (let i in modules) {
  contextMenu.add(modules[i].module.toHTML());
};

// Вызываем контекстное меню
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  const x = e.x;
  const y = e.y;
  contextMenu.open(x, y);
});

const container = document.createElement('div');
container.className = 'container';
container.id = 'container';
container.innerHTML = `<h1>Представляем Вам модули, которые мы добавили в наше приложение:</h1>`;
const ul = document.createElement('ul');
ul.className = 'module-list';

const moduleList = [];
for (let object of modules) {
  moduleList.push(`<li><b>${object.module.type} (${object.module.text})</b><br>${object.description}</li>`);
}
ul.innerHTML = moduleList.join('');
const p = document.createElement('p');
p.innerHTML = '<b>Ознакомиться с работой модулей Вы можете выбрав их из контекстного меню.</b>';

container.append(ul, p);
document.body.append(container);

const moduleStyles = document.createElement('link');
moduleStyles.href = `/src/modules/styles/style.css`;
moduleStyles.setAttribute('rel', 'stylesheet');
moduleStyles.id = 'moduleStyle';
document.head.append(moduleStyles);