import Swiper, {
  Pagination, A11y, Keyboard,
} from 'swiper';
import FocusLockSliders from '../components/FocusLockSliders.js';
import getFontSizeBody from './getFontSizeBody.js';
import Breakpoints from '../components/Breakpoints.js';

function blocksHiddenElementsFromScreenreader(swiper, selectorContent) {
  const { slides, activeIndex } = swiper;
  let activeSlide = slides[activeIndex];

  slides.forEach((slide) => {
    if (slide === activeSlide) return;

    slide.querySelector(selectorContent).setAttribute('aria-hidden', true);
  });

  swiper.on('slideChange', () => {
    const newActiveSlide = slides[swiper.activeIndex];

    activeSlide.querySelector(selectorContent).setAttribute('aria-hidden', true);

    activeSlide = newActiveSlide;

    activeSlide.querySelector(selectorContent).setAttribute('aria-hidden', false);
  });
}

function heroSlider() {
  const slider = '.hero-swiper';
  const swiperWrapper = document.querySelector(`${slider} .swiper-wrapper`);
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Pagination, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это последний слайд',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
    watchSlidesProgress: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
    },
  });

  blocksHiddenElementsFromScreenreader(swiper, '.hero__content');

  // Focus Lock

  const focusLock = new FocusLockSliders({
    container: swiperWrapper,
    exception: '.swiper-slide-visible',
  });
  focusLock.init();

  swiper.on('slideChangeTransitionEnd', () => {
    focusLock.updatesFocusLock();
  });
}

function ourBrandsSlider() {
  const slider = '.our-brands-slider';
  const swiper = new Swiper(slider, {
    modules: [Pagination, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это последний слайд',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
    watchSlidesProgress: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
    },
    init: false,
    breakpoints: {
      0: {
        enabled: true,
      },
      // 36rem - 576px
      [getFontSizeBody() * 36]: {
        enabled: false,
      },
    },
    on: {
      afterInit() {
        blocksHiddenElementsFromScreenreader(swiper, '.brand');
      },
      breakpoint(swiperParam, breakpointParams) {
        if (!swiperParam.initialized) return;

        const { enabled } = breakpointParams;
        const { slides, activeIndex } = swiperParam;

        slides.forEach((slide) => {
          if (!enabled) {
            slide.querySelector('.brand').setAttribute('aria-hidden', false);

            return;
          }

          if (slide === slides[activeIndex]) return;

          slide.querySelector('.brand').setAttribute('aria-hidden', true);
        });
      },
    },
  });
  const breakpoints = new Breakpoints({
    maxWidth: {
      // 35.99rem - 575.98px
      [getFontSizeBody() * 35.99]: () => {
        if (!swiper.initialized) {
          swiper.init();
        }
      },
    },
  });
  breakpoints.init();
}

export { heroSlider, ourBrandsSlider };
