import BurgerMenu from '../components/BurgerMenu.js';
import Breakpoints from '../components/Breakpoints.js';
import getFontSizeBody from '../helpers/getFontSizeBody.js';
import FocusLock from '../components/FocusLock.js';
import Accordion from '../components/Accordion.js';
import DropDownAnimation from '../components/DropDownAnimation.js';
import DropdownContent from '../components/DropdownContent.js';

export default function _common() {
  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    body: '.burger-menu__body',
    focusLock: new FocusLock({
      exception: ['.burger-menu', '.header .burger-trigger'],
      mutationObserver: true,
      disableOnMobileDevice: true,
    }),
  });
  const footerSupportsDropdownContent = new DropdownContent('.footer-supports-dropdown-content', {
    apiAnimation: new DropDownAnimation(),
    focusLock: new FocusLock({
      exception: ['.footer-supports-dropdown-content'],
      mutationObserver: true,
      disableOnMobileDevice: true,
    }),
  });
  const footerProductsDropdownContent = new DropdownContent('.footer-products-dropdown-content', {
    apiAnimation: new DropDownAnimation(),
    focusLock: new FocusLock({
      exception: ['.footer-products-dropdown-content'],
      mutationObserver: true,
      disableOnMobileDevice: true,
    }),
  });
  const footerAccordion = new Accordion('.footer__accordion', {
    apiAnimation: new DropDownAnimation(),
  });
  const breakpoints = new Breakpoints({
    minWidth: {
      // 48rem - 768px
      [getFontSizeBody() * 48]: () => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      },
      // 62rem - 992px
      [getFontSizeBody() * 62]: () => {
        footerAccordion.resetsProgress();

        footerAccordion.enabled = false;
      },
    },
    maxWidth: {
      // 61.99rem ~ 991.98px
      [getFontSizeBody() * 61.99]: () => {
        if (!footerAccordion.isInit()) {
          footerAccordion.init();

          return;
        }

        footerAccordion.enabled = true;
      },
    },
  });
}
