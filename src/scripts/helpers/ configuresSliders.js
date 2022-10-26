import Swiper, {
  Pagination, A11y, Keyboard,
} from 'swiper';
import FocusLockSliders from '../components/FocusLockSliders.js';

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

export { heroSlider };
