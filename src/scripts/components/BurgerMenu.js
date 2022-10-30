import Alert from './Alert.js';

export default class BurgerMenu extends Alert {
  constructor({
    container = null,
    body = null,
    trigger = null,
    animation = null,
    focusLock = null,
  } = {}) {
    super({
      container, body, trigger, animation, focusLock,
    });
  }

  close() {
    super.close();

    this._changesTextForA11yAtTrigger();
  }

  open() {
    super.open();

    this._changesTextForA11yAtTrigger();
  }

  _changesTextForA11yAtTrigger() {
    if (this.isOpen()) {
      this._trigger.setAttribute('aria-label', 'Закрыть бургер меню');

      return;
    }

    this._trigger.setAttribute('aria-label', 'Открыть бургер меню');
  }
}
