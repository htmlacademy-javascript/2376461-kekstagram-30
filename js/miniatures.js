import {createAllDescriptions} from './data.js';

const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const PICTURE_LIST = document.querySelector('.pictures');

const picData = createAllDescriptions(25);
const picFragment = document.createDocumentFragment();

for(let i = 0;i <= picData.length - 1; i++){
  let picNode = PICTURE_TEMPLATE.cloneNode(true);
  picNode.querySelector('.picture__img').src = picData[i].url;
  picNode.querySelector('.picture__img').alt = picData[i].description;
  picNode.querySelector('.picture__comments').textContent = picData[i].comments.length;
  picNode.querySelector('.picture__likes').textContent = picData[i].likes;
  picFragment.append(picNode);
}
PICTURE_LIST.append(picFragment);
