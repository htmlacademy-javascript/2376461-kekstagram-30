import {isEscapeKey} from './utils.js';
import {initValidation} from './validateFields.js';
import {init as initEffects, reset as resetEffects} from './imageEffectEditing.js';
import {initScaleEditing,resetScaleEditing} from './imageScaleEditing.js';
import { sendData } from './api.js';
import {successUploadAlert} from './alertInformation.js';

let pristine;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditingModal = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditingClose = imageUploadForm.querySelector('.img-upload__cancel');
const hashTagField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'отправка...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'опубликовать';
};

const closeImageEditingModal = () => {
  imageUploadForm.reset();

  resetEffects();
  resetScaleEditing();

  unblockSubmitButton();
  document.removeEventListener('keydown',onImageEditingEscDown);
  imageEditingModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};
const sucessUploadImage = () => {
  closeImageEditingModal();
  successUploadAlert();
};

function onImageEditingEscDown (evt){
  const isErrorMessageExists = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && ! isErrorMessageExists) {
    evt.preventDefault();
    closeImageEditingModal();
  }
}

const onChangeImage = () => {
  if(imageUploadInput.value === ''){
    return;
  }

  const reader = new FileReader();
  reader.onload = function (evt) {
    imagePreview.setAttribute('src', evt.target.result);
  };

  imageEditingModal.classList.remove('hidden');

  initScaleEditing();
  document.addEventListener('keydown',onImageEditingEscDown);

  document.querySelector('body').classList.add('modal-open');
};

const submitError = () =>{
  unblockSubmitButton();
};

const onEditingFormSubmit = (evt) =>{
  evt.preventDefault();

  const isFieldsValid = pristine.validate();

  if(isFieldsValid){
    blockSubmitButton();
    const formData = new FormData(imageUploadForm);
    sendData(formData,sucessUploadImage).catch(submitError());
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
  initEffects();
};
export{initUploadImage};
