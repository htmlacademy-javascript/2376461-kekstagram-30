import {createAllDescriptions} from './data.js';
import {createMiniatures} from './miniatures.js';
import {initFullScreenPicture} from './fullScreenPicture.js';
import {initUploadImage} from './uploadImage-form.js';

const dataPictures = createAllDescriptions(25);

createMiniatures(dataPictures);
initFullScreenPicture(dataPictures);
initUploadImage();
