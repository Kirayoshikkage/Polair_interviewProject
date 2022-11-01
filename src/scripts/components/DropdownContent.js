import debounce from '../helpers/debounce.js';

export default class DropdownContent {
  constructor(container, {
    apiAnimation = null,
    focusLock = null,
  } = {}) {
    this._container = document.querySelector(container);
    this._trigger = this._container.querySelector('.dropdown-content__trigger');
    this._body = this._container.querySelector('.dropdown-content__body');
    this._content = this._container.querySelector('.dropdown-content__content');

    this._apiAnimation = apiAnimation;
    this._focusLock = focusLock;

    this.init();
  }

  _isOpen = false;

  isOpen() {
    return this._isOpen;
  }

  init() {
    this.close();

    this._setsEventListenersTrigger();

    this._closesOnClickOutsideDropdownContent();

    this._initUpdate();
  }

  close() {
    this._isOpen = false;

    this._setsStyleHiding();

    this._removesClassActiviteAtContainer();

    this._unblocksFocus();

    this._changesExpandedStateTrigger();
  }

  _setsStyleHiding() {
    if (this._apiAnimation) {
      this._apiAnimation.setsStyleHiding(this._container);

      return;
    }

    this._body.style.display = 'none';
  }

  _removesClassActiviteAtContainer() {
    this._container.classList.remove('active');
  }

  _unblocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.unblocksFocus();
  }

  _changesExpandedStateTrigger() {
    this._trigger.setAttribute('aria-expanded', this._isOpen);
  }

  _setsEventListenersTrigger() {
    this._trigger.addEventListener('pointerup', this._toggle.bind(this));

    this._trigger.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter') return;

      this._toggle();
    });
  }

  _toggle() {
    if (this._isOpen) {
      this.close();

      return;
    }

    this.open();
  }

  open() {
    this._isOpen = true;

    this._setsStyleVisibility();

    this._addsClassActiviteContainer();

    this._blocksFocus();

    this._changesExpandedStateTrigger();
  }

  _setsStyleVisibility() {
    if (this._apiAnimation) {
      this._apiAnimation.setsStyleVisibility(this._container);

      return;
    }

    this._body.style.display = 'block';
  }

  _addsClassActiviteContainer() {
    this._container.classList.add('active');
  }

  _blocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.blocksFocus();
  }

  _closesOnClickOutsideDropdownContent() {
    document.addEventListener('pointerup', (e) => {
      if (!this.isOpen()) return;

      const { target } = e;

      if (
        target.closest('.dropdown-content')
        && target.closest('.dropdown-content') === this._container
      ) return;

      this.close();
    });
  }

  _initUpdate() {
    const update = debounce(() => {
      this._update();
    }, 500);

    window.addEventListener('resize', update);
  }

  _update() {
    if (!this.isOpen()) return;

    this._setsStyleVisibility();
  }
}
