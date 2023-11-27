import {createMiniatures} from './miniatures.js';
import {initFullScreenPicture} from './full-screen-picture.js';
import {initUploadImage} from './upload-image-form.js';
import {getData} from './api.js';
import { initFilters } from './image-filters.js';

getData()
  .then((data) => {
    createMiniatures(data);
    initFullScreenPicture(data);
    initFilters(data);
  });

initUploadImage();
