/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/common/_common.js":
/*!***************************************!*\
  !*** ./src/scripts/common/_common.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _common; }
/* harmony export */ });
/* harmony import */ var _components_BurgerMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/BurgerMenu.js */ "./src/scripts/components/BurgerMenu.js");
/* harmony import */ var _helpers_getFontSizeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/getFontSizeBody.js */ "./src/scripts/helpers/getFontSizeBody.js");
/* harmony import */ var _components_FocusLock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FocusLock.js */ "./src/scripts/components/FocusLock.js");



function _common() {
  const focusLockBurgerMenu = new _components_FocusLock_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    exception: ['.burger-menu', '.header .burger-trigger'],
    mutationObserver: true,
    disableOnMobileDevice: true
  });
  const burgerMenu = new _components_BurgerMenu_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    body: '.burger-menu__body',
    focusLock: focusLockBurgerMenu,
    breakpoints: {
      // 48rem - 768px
      [(0,_helpers_getFontSizeBody_js__WEBPACK_IMPORTED_MODULE_1__["default"])() * 48]: () => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      }
    }
  });
  focusLockBurgerMenu.init();
  burgerMenu.init();
}

/***/ }),

/***/ "./src/scripts/components/Alert.js":
/*!*****************************************!*\
  !*** ./src/scripts/components/Alert.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Alert; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Alert {
  constructor() {
    let {
      container = null,
      body = null,
      trigger = null,
      animation = null,
      focusLock = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _defineProperty(this, "_isOpen", false);

    _defineProperty(this, "_blockScrollWasAdded", false);

    this._container = document.querySelector(container);
    this._trigger = trigger ? document.querySelector(trigger) : null;
    this._body = body;
    this._animation = animation;
    this._focusLock = focusLock;
  }

  isOpen() {
    return this._isOpen;
  }

  init() {
    this._throwsError();

    this._addsEventListenersTrigger();

    this._closesWindowOnClickOutside();

    this._setsStyleHiding();
  }

  _throwsError() {
    if (!this._body) {
      throw new Error('Field body is required');
    }
  }

  _addsEventListenersTrigger() {
    if (!this._trigger) return;

    this._trigger.addEventListener('pointerup', () => {
      this.toggle();
    });

    this._trigger.addEventListener('keydown', e => {
      if (e.code !== 'Enter') return;
      this.toggle();
    });
  }

  toggle() {
    if (!this.isOpen()) {
      this.open();
      return;
    }

    this.close();
  }

  close() {
    this._isOpen = false;

    this._setsStyleHiding();

    this._switchesClassActiveTrigger();

    this._changesClassActiviteAtWindow();

    this._unblocksFocus();

    this._removesScrollPadding(document.body);

    this._removesScrollPadding(this._container);

    this._switchesBlockScroll();
  }

  _setsStyleHiding() {
    if (this._animation) {
      this._animation.setStyleHiding(this._container);

      return;
    }

    this._container.style.visibility = 'hidden';
    this._container.style.opacity = 0;
  }

  _switchesClassActiveTrigger() {
    if (!this._trigger) return;

    if (this._isOpen) {
      this._trigger.classList.add('active');

      return;
    }

    this._trigger.classList.remove('active');
  }

  _changesClassActiviteAtWindow() {
    if (this._isOpen) {
      this._container.classList.add('active');

      return;
    }

    this._container.classList.remove('active');
  }

  _unblocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.unblocksFocus();
  }

  _switchesBlockScroll() {
    const {
      body
    } = document;

    if (this.isOpen()) {
      if (body.classList.contains('overflow-hidden')) return;
      body.classList.add('overflow-hidden');
      this._blockScrollWasAdded = true;
      return;
    }

    if (!this._blockScrollWasAdded) return;
    body.classList.remove('overflow-hidden');
    this._blockScrollWasAdded = false;
  }

  _removesScrollPadding(element) {
    // eslint-disable-next-line no-param-reassign
    element.style.paddingRight = 0;
  }

  open() {
    this._isOpen = true;

    this._addsPaddingInsteadOfScroll(document.body);

    this._addsPaddingInsteadOfScroll(this._container);

    this._setsStyleVisibility();

    this._switchesBlockScroll();

    this._switchesClassActiveTrigger();

    this._changesClassActiviteAtWindow();

    this._blocksFocus();
  }

  _addsPaddingInsteadOfScroll(element) {
    const padding = `${window.innerWidth - document.body.offsetWidth}px`; // eslint-disable-next-line no-param-reassign

    element.style.paddingRight = padding;
  }

  _setsStyleVisibility() {
    if (this._animation) {
      this._animation.setStyleVisibility(this._container);

      return;
    }

    this._container.style.visibility = 'visible';
    this._container.style.opacity = 1;
  }

  _blocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.blocksFocus();
  }

  _closesWindowOnClickOutside() {
    this._container.addEventListener('pointerdown', e => {
      if (e.target.closest(this._body)) return;
      this.close();
    });
  }

}

/***/ }),

/***/ "./src/scripts/components/BurgerMenu.js":
/*!**********************************************!*\
  !*** ./src/scripts/components/BurgerMenu.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BurgerMenu; }
/* harmony export */ });
/* harmony import */ var _Alert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert.js */ "./src/scripts/components/Alert.js");
/* harmony import */ var _helpers_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/debounce.js */ "./src/scripts/helpers/debounce.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class BurgerMenu extends _Alert_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    let {
      container = null,
      body = null,
      trigger = null,
      breakpoints = null,
      animation = null,
      focusLock = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      container,
      body,
      trigger,
      animation,
      focusLock
    });

    _defineProperty(this, "_currentBreakpoint", void 0);

    this._breakpoints = breakpoints;
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

  init() {
    super.init();

    this._initBreakpointUpdate();
  }

  _initBreakpointUpdate() {
    if (!this._breakpoints) return;

    this._updatesBreakpoint();

    window.addEventListener('resize', (0,_helpers_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this._updatesBreakpoint.bind(this), 400));
  }

  _updatesBreakpoint() {
    const breakpoint = this._getCurrentBreakpoint();

    if (this._currentBreakpoint == breakpoint) return;
    this._currentBreakpoint = breakpoint;

    this._callsFunctionsBreakpoint();
  }

  _getCurrentBreakpoint() {
    const width = window.innerWidth;
    return Object.keys(this._breakpoints).reduce((acc, breakpoint) => {
      if (width >= breakpoint) {
        // eslint-disable-next-line no-param-reassign
        acc = breakpoint;
      }

      return acc;
    }, 0);
  }

  _callsFunctionsBreakpoint() {
    const functionsBreakpoint = this._breakpoints[this._currentBreakpoint];
    if (!functionsBreakpoint) return;

    if (typeof functionsBreakpoint === 'function') {
      functionsBreakpoint();
      return;
    }

    functionsBreakpoint === null || functionsBreakpoint === void 0 ? void 0 : functionsBreakpoint.forEach(func => {
      func();
    });
  }

}

/***/ }),

/***/ "./src/scripts/components/FocusLock.js":
/*!*********************************************!*\
  !*** ./src/scripts/components/FocusLock.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FocusLock; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FocusLock {
  constructor() {
    let {
      exception = false,
      container = 'body',
      mutationObserver = false,
      disableOnMobileDevice = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _defineProperty(this, "_listElementsToBlock", new Set());

    _defineProperty(this, "_listChecksToBlock", [this._checkingForFocus, this._checkingForException.bind(this)]);

    _defineProperty(this, "_isBlockFocus", false);

    _defineProperty(this, "_linkOnMutationObserver", void 0);

    _defineProperty(this, "_listHandlesMutationObserver", {
      childList: this._handlesMutationChildList,
      attributes: this._handlesMutationAttributes
    });

    _defineProperty(this, "_mutationAttributesFlag", false);

    this._exception = exception;
    this._container = container;
    this._mutationObserver = mutationObserver;
    this._disableOnMobileDevice = disableOnMobileDevice;
  }

  isBlockFocus() {
    return this._isBlockFocus;
  }

  init() {
    if (this._disableOnMobileDevice && this._userDeviceIsPhone()) {
      return;
    }

    this._throwsErrors();

    setTimeout(() => {
      this._populatesTheListElementsToBlock(document.querySelectorAll(`${this._container} *`));
    }, 0);

    this._addsMutationObserver();
  }

  _userDeviceIsPhone() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  }

  _throwsErrors() {
    if (this._exception && !Array.isArray(this._exception) && typeof this._exception !== 'string') {
      throw new Error('Exception wrong type');
    }

    if (this._container && typeof this._container !== 'string') {
      throw new Error('Container wrong type');
    }
  }

  _populatesTheListElementsToBlock(listElements) {
    listElements.forEach(element => {
      if (this._checksOneElement(element)) {
        this._addsElementToBlockList(element);
      }
    });
  }

  _addsElementToBlockList(element) {
    this._listElementsToBlock.add(element);

    if (this.isBlockFocus()) {
      this._blocksFocusElement(element);
    }
  }

  _checksOneElement(element) {
    return this._listChecksToBlock.every(func => func(element));
  }

  _checkingForFocus(element) {
    return element.tabIndex === 0;
  }

  _checkingForException(element) {
    if (!this._exception) {
      return true;
    }

    if (!Array.isArray(this._exception)) {
      return !element.closest(this._exception);
    } // eslint-disable-next-line no-restricted-syntax


    for (const exception of this._exception) {
      if (element.closest(exception)) {
        return false;
      }
    }

    return true;
  }

  _blocksFocusElement(element) {
    element === null || element === void 0 ? void 0 : element.setAttribute('tabindex', -1);
  }

  blocksFocus() {
    if (this._disableOnMobileDevice && this._userDeviceIsPhone()) return;

    this._listElementsToBlock.forEach(element => {
      this._blocksFocusElement(element);
    });

    this._isBlockFocus = true;
    this._mutationAttributesFlag = true;
  }

  unblocksFocus() {
    if (this._disableOnMobileDevice && this._userDeviceIsPhone()) return;

    this._listElementsToBlock.forEach(element => {
      this._unblocksFocusElement(element);
    });

    this._isBlockFocus = false;
    setTimeout(() => {
      this._mutationAttributesFlag = false;
    });
  }

  _unblocksFocusElement(element) {
    element === null || element === void 0 ? void 0 : element.setAttribute('tabindex', 0);
  }

  _addsMutationObserver() {
    if (!this._mutationObserver) return;
    this._linkOnMutationObserver = new MutationObserver(this._handlesMutationObserver.bind(this));

    this._linkOnMutationObserver.observe(document.querySelector(this._container), {
      childList: true,
      subtree: true,
      characterData: false,
      attributes: true,
      attributeFilter: ['tabindex']
    });
  }

  _handlesMutationObserver(listMutation) {
    listMutation.forEach(mutation => {
      const {
        type
      } = mutation;

      this._listHandlesMutationObserver[type].call(this, mutation);
    });
  }

  _handlesMutationChildList(mutation) {
    const {
      addedNodes,
      removedNodes
    } = mutation;

    const filteredAddedNodes = this._filtersElementsFromNodes(addedNodes);

    const filteredRemoveNodes = this._filtersElementsFromNodes(removedNodes);

    this._populatesTheListElementsToBlock(filteredAddedNodes);

    this._removesElementsFromBlockList(filteredRemoveNodes);
  }

  _filtersElementsFromNodes(nodes) {
    return Array.from(nodes).filter(node => node.nodeType === 1);
  }

  _removesElementsFromBlockList(listElements) {
    listElements.forEach(element => this._removesElementFromBlockList(element));
  }

  _removesElementFromBlockList(element) {
    this._listElementsToBlock.delete(element);

    if (this.isBlockFocus()) {
      this._unblocksFocusElement(element);
    }
  }

  _handlesMutationAttributes(mutation) {
    if (this._mutationAttributesFlag) return;
    const {
      target
    } = mutation;

    if (this._checksOneElement(target)) {
      this._addsElementToBlockList(target);

      return;
    }

    this._removesElementFromBlockList(target);
  }

  disconnectsMutationObserver() {
    this._linkOnMutationObserver.disconnect();
  }

}

/***/ }),

/***/ "./src/scripts/helpers/debounce.js":
/*!*****************************************!*\
  !*** ./src/scripts/helpers/debounce.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ debounce; }
/* harmony export */ });
function debounce(callback, delay) {
  let timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/***/ }),

/***/ "./src/scripts/helpers/errorHandler.js":
/*!*********************************************!*\
  !*** ./src/scripts/helpers/errorHandler.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ errorHandler; }
/* harmony export */ });
function errorHandler(cb) {
  window.addEventListener('error', error => {
    console.log(error);
  });

  try {
    cb();
  } catch (error) {
    console.log(error);
  }
}

/***/ }),

/***/ "./src/scripts/helpers/getFontSizeBody.js":
/*!************************************************!*\
  !*** ./src/scripts/helpers/getFontSizeBody.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getFontSizeBody; }
/* harmony export */ });
function getFontSizeBody() {
  const stylesBody = window.getComputedStyle(document.body);
  return parseFloat(stylesBody.fontSize) || 16;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************!*\
  !*** ./src/scripts/pages/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_errorHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/errorHandler.js */ "./src/scripts/helpers/errorHandler.js");
/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/_common.js */ "./src/scripts/common/_common.js");


(0,_helpers_errorHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
  (0,_common_common_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map