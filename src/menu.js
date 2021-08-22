import { Menu } from './core/menu';

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);

    document.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        this.close()
      }
    })
  }

  open(x, y) {
    const menu = this.el;
    menu.classList.add('open');
    const { width, height } = menu.getBoundingClientRect()

    if ((window.innerWidth - x) < width) {
      menu.style.left = `${window.innerWidth - width}px`;
    } else {
      menu.style.left = `${x}px`;
    }

    if ((window.innerHeight - y) < height) {
      menu.style.top = `${window.innerHeight - height}px`;
    } else {
      menu.style.top = `${y}px`;
    }
  }

  close() {
    this.el.classList.remove('open');
  }

  add(el) {
    this.el.innerHTML += el;
  }

}