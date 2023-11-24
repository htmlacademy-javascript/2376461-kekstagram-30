import {createMiniatures} from './miniatures.js';
import {initFullScreenPicture} from './fullScreenPicture.js';
import {initUploadImage} from './uploadImage-form.js';
import {getData} from './api.js';
import { initFilters } from './imageFilters';

getData()
  .then((data) => {
    createMiniatures(data);
    initFullScreenPicture(data);
    initFilters(data);
  });

initUploadImage();
