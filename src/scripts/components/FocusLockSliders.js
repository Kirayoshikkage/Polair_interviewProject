export default class FocusLockSliders {
  constructor({ container = null, exception = null } = {}) {
    this._elements = container.querySelectorAll('*');
    this._exception = exception;
  }

  _listElementsToBlock = new Set();

  init() {
    this._populatesTheListElementsToBlock();

    this.updatesFocusLock();
  }

  _populatesTheListElementsToBlock() {
    this._elements.forEach((element) => this._addsElementToBlockList(element));
  }

  _addsElementToBlockList(element) {
    if (!this._elementIsFocusable(element)) return;

    this._listElementsToBlock.add(element);
  }

  _elementIsFocusable(element) {
    return element.tabIndex == 0;
  }

  updatesFocusLock() {
    this._listElementsToBlock.forEach((element) => this._changesAtElementFocusLock(element));
  }

  _changesAtElementFocusLock(element) {
    if (element.closest(this._exception)) {
      if (!this._getTabIndexElement(element)) return;

      this._unblocksFocusElement(element);

      return;
    }

    if (this._getTabIndexElement(element)) return;

    this._blocksFocusElement(element);
  }

  _getTabIndexElement(element) {
    return Number(element.getAttribute('tabindex'));
  }

  _unblocksFocusElement(element) {
    element?.setAttribute('tabindex', 0);
  }

  _blocksFocusElement(element) {
    element?.setAttribute('tabindex', -1);
  }
}
