import {createMiniatures} from './miniatures.js';
import {initFullScreenPicture} from './fullScreenPicture.js';
import {initUploadImage} from './uploadImage-form.js';
import {getData} from './api.js';

getData()
  .then((data) => {
    createMiniatures(data);
    initFullScreenPicture(data);
  });

initUploadImage();
