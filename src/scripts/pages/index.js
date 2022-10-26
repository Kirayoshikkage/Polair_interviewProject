import errorHandler from '../helpers/errorHandler.js';
import _common from '../common/_common.js';
import { heroSlider } from '../helpers/ configuresSliders.js';

errorHandler(() => {
  _common();

  heroSlider();
});
