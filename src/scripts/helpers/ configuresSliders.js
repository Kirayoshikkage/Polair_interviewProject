import Swiper, {
  A11y, Keyboard, Navigation,
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
  const nextBtn = `${slider} .swiper-button-next`;
  const prevBtn = `${slider} .swiper-button-prev`;
  const swiperWrapper = document.querySelector(`${slider} .swiper-wrapper`);
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это последний слайд',
      nextSlideMessage: 'Следующий слайд',
      prevSlideMessage: 'Предыдущий слайд',
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
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
  const swiperWrapper = document.querySelector(`${slider} .swiper-wrapper`);
  const nextBtn = `${slider} .swiper-button-next`;
  const prevBtn = `${slider} .swiper-button-prev`;
  const focusLock = new FocusLockSliders({
    container: swiperWrapper,
    exception: '.swiper-slide-visible',
  });
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
    a11y: {
      firstSlideMessage: 'Это первый слайд',
      lastSlideMessage: 'Это последний слайд',
      nextSlideMessage: 'Следующий слайд',
      prevSlideMessage: 'Предыдущий слайд',
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
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

        focusLock.init();
      },
      breakpoint(swiperParam, breakpointParams) {
        if (!swiperParam.initialized) return;

        const { enabled } = breakpointParams;
        const { slides, activeIndex } = swiperParam;

        swiper.setProgress(0);

        slides.forEach((slide) => {
          if (!enabled) {
            slide.querySelector('.brand').setAttribute('aria-hidden', false);

            return;
          }

          if (slide === slides[activeIndex]) return;

          slide.querySelector('.brand').setAttribute('aria-hidden', true);
        });

        setTimeout(() => {
          focusLock.updatesFocusLock();
        }, 200);
      },
      slideChangeTransitionEnd() {
        focusLock.updatesFocusLock();
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
