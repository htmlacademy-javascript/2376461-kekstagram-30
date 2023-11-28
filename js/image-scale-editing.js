import {getNumbers} from './utils.js';

const scaleSmallerControl = document.querySelector('.scale__control--smaller');
const scaleBiggerControl = document.querySelector('.scale__control--bigger');
const scaleValueControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const SCALE_COUNT_STEP = 25;

const upScaleImage = () => {
  const scale = getNumbers(scaleValueControl.value);
  if(scale >= 100){
    return;
  }
  scaleValueControl.value = `${scale + SCALE_COUNT_STEP}%`;
  imagePreview.style.transform = `scale(${(scale + SCALE_COUNT_STEP) / 100})`;
};
const downScaleImage = () =>{
  const scale = getNumbers(scaleValueControl.value);
  if(scale <= 25){
    return;
  }
  scaleValueControl.value = `${scale - SCALE_COUNT_STEP}%`;
  imagePreview.style.transform = `scale(${(scale - SCALE_COUNT_STEP) / 100})`;
};

const onPLusButtonDown = ()=>{
  upScaleImage();
};
const onMinusButtonDown = ()=>{
  downScaleImage();
};

const initScaleEditing = () =>{
  scaleSmallerControl.addEventListener('click',onMinusButtonDown);
  scaleBiggerControl.addEventListener('click',onPLusButtonDown);
};
const resetScaleEditing = () =>{
  scaleSmallerControl.removeEventListener('click',onMinusButtonDown);
  scaleBiggerControl.removeEventListener('click',onPLusButtonDown);
  scaleValueControl.value = '100%';
  imagePreview.style.scale = 1;
};

export {initScaleEditing,resetScaleEditing};
