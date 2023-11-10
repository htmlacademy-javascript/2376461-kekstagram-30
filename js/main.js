import {createAllDescriptions} from './data.js';
import {createMiniatures} from './miniatures.js';
import {initFullScreenPicture} from './fullScreenPicture.js';
import {uploadingImage} from './uploadImage-form.js';

const dataPictures = createAllDescriptions(25);

createMiniatures(dataPictures);
initFullScreenPicture(dataPictures);
uploadingImage();
