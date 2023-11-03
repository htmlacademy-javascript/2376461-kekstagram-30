import {createAllDescriptions} from './data.js';
import {createMiniatures} from './miniatures.js';
import {initFullScreenPicture} from './fullScreenPicture.js';

const DATA_PICTURES = createAllDescriptions(25);
createMiniatures(DATA_PICTURES);
initFullScreenPicture(DATA_PICTURES);
