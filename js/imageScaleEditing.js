import {getNumbers} from './utils.js';

const scaleSmalerContol = document.querySelector('.scale__control--smaller');
const scaleBiggerContol = document.querySelector('.scale__control--bigger');
const scaleValueContol = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const SCALE_COUNT_STEP = 25;

const upScaleImage = () => {
  const scale = getNumbers(scaleValueContol.value);
  if(scale >= 100){
    return;
  }
  scaleValueContol.value = `${scale + SCALE_COUNT_STEP}%`;
  imagePreview.style.scale = (scale + SCALE_COUNT_STEP) / 100;
};
const downScaleImage = () =>{
  const scale = getNumbers(scaleValueContol.value);
  if(scale <= 25){
    return;
  }
  scaleValueContol.value = `${scale - SCALE_COUNT_STEP}%`;
  imagePreview.style.scale = (scale - SCALE_COUNT_STEP) / 100;
};

const onPLusButtonDown = ()=>{
  upScaleImage();
};
const onMinusButtonDown = ()=>{
  downScaleImage();
};

const initScaleEditing = () =>{
  scaleSmalerContol.addEventListener('click',onMinusButtonDown);
  scaleBiggerContol.addEventListener('click',onPLusButtonDown);
};
const resetScaleEditing = () =>{
  scaleSmalerContol.removeEventListener('click',onMinusButtonDown);
  scaleBiggerContol.removeEventListener('click',onPLusButtonDown);
  scaleValueContol.value = '100%';
  imagePreview.style.scale = 1;
};

export {initScaleEditing,resetScaleEditing};
