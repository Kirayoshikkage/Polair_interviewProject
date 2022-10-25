import BurgerMenu from '../components/BurgerMenu.js';
import getFontSizeBody from '../helpers/getFontSizeBody.js';
import FocusLock from '../components/FocusLock.js';

export default function _common() {
  const focusLockBurgerMenu = new FocusLock({
    exception: ['.burger-menu', '.header .burger-trigger'],
    mutationObserver: true,
    disableOnMobileDevice: true,
  });
  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    body: '.burger-menu__body',
    focusLock: focusLockBurgerMenu,
    breakpoints: {
      // 48rem - 768px
      [getFontSizeBody() * 48]: () => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      },
    },
  });

  focusLockBurgerMenu.init();
  burgerMenu.init();
}
