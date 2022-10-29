import Swiper, {
  Pagination, A11y, Keyboard,
} from 'swiper';
import FocusLockSliders from '../components/FocusLockSliders.js';
import debounce from './debounce.js';
import getFontSizeBody from './getFontSizeBody.js';

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
  const { slides } = swiper;
  let activeSlide = slides[swiper.activeIndex];

  slides.forEach((slide) => {
    if (slide === activeSlide) return;

    slide.querySelector('.hero__content').setAttribute('aria-hidden', true);
  });

  swiper.on('slideChange', () => {
    const newActiveSlide = slides[swiper.activeIndex];

    activeSlide.querySelector('.hero__content').setAttribute('aria-hidden', true);

    activeSlide = newActiveSlide;

    activeSlide.querySelector('.hero__content').setAttribute('aria-hidden', false);
  });

  const focusLock = new FocusLockSliders({
    container: swiperWrapper,
    exception: '.swiper-slide-visible',
  });
  focusLock.init();

  swiper.on('slideChange', () => {
    focusLock.updatesFocusLock();
  });
}

function ourBrandsSlider() {
  const slider = '.our-brands-slider';
  let activeSlide = null;
  let slides = null;
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
      init() {
        activeSlide = swiper.slides[swiper.activeIndex];
        slides = swiper.slides;

        slides.forEach((slide) => {
          if (slide === activeSlide) return;

          slide.querySelector('.brand').setAttribute('aria-hidden', true);
        });
      },
      afterInit() {
        swiper.on('breakpoint', (swiperParam, breakpointParams) => {
          const { enabled } = breakpointParams;

          slides.forEach((slide) => {
            if (!enabled) {
              slide.querySelector('.brand').setAttribute('aria-hidden', false);

              return;
            }

            if (slide === activeSlide) return;

            slide.querySelector('.brand').setAttribute('aria-hidden', true);
          });
        });
      },
      slideChange() {
        const newActiveSlide = slides[swiper.activeIndex];

        activeSlide.querySelector('.brand').setAttribute('aria-hidden', true);

        activeSlide = newActiveSlide;

        activeSlide.querySelector('.brand').setAttribute('aria-hidden', false);
      },
    },
  });

  function swiperInitByBreakpoint() {
    const width = window.innerWidth;

    // 36rem - 576px
    if (width >= (getFontSizeBody() * 36)) return;

    swiper.init();
  }

  const wrapperSwiperInitByBreakpoint = debounce(() => {
    if (swiper.initialized) {
      window.removeEventListener('resize', wrapperSwiperInitByBreakpoint);

      return;
    }

    swiperInitByBreakpoint();
  }, 200);

  window.addEventListener('resize', wrapperSwiperInitByBreakpoint);

  swiperInitByBreakpoint();
}

export { heroSlider, ourBrandsSlider };
