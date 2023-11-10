import {isEscapeKey} from './utils.js';
import {initValidation} from './validateFields.js';
let pristine;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageEditingModal = document.querySelector('.img-upload__overlay');
const imageEditingClose = document.querySelector('.img-upload__cancel');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const closeImageEditingModal = () => {
  pristine.reset();
  imageEditingModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const onChangeImage = () => {
  imageEditingModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};


const onImageEditingEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditingModal();
  }
};
document.addEventListener('keydown',onImageEditingEscDown);

const onEditingFormSubmit = (evt) =>{
  evt.preventDefault();

  const isFieldsValid = pristine.validate();

  if(isFieldsValid){
  //форма валидна, отправляем
    closeImageEditingModal();
  }else{
  //Форма не валидна, отправка запрещена
  }
};
imageUploadForm.addEventListener('submit',onEditingFormSubmit);

const onFocusStopPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
hashTagField.addEventListener('keydown',onFocusStopPropagation);
descriptionField.addEventListener('keydown',onFocusStopPropagation);

const initUploadImage = () =>{
  imageUploadInput.addEventListener('change', onChangeImage);
  imageEditingClose.addEventListener('click', closeImageEditingModal);
  pristine = initValidation(imageUploadForm,hashTagField,descriptionField);
};
export{initUploadImage};
