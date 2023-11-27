import {isEscapeKey} from './utils.js';
import {initValidation} from './validate-fields.js';
import {init as initEffects, reset as resetEffects} from './image-effect-editing.js';
import {initScaleEditing,resetScaleEditing} from './image-scale-editing.js';
import { postData } from './api.js';
import {successUploadAlert} from './alert-information.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg'];
let pristine;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditingModal = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditingClose = imageUploadForm.querySelector('.img-upload__cancel');
const hashTagField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');
const effectsPreview = imageUploadForm.querySelectorAll('.effects__preview');

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
  pristine.reset();

  resetEffects();
  resetScaleEditing();


  document.removeEventListener('keydown',onImageEditingEscDown);
  imageEditingModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};
const sucessUploadImage = () => {
  closeImageEditingModal();
  successUploadAlert();
  unblockSubmitButton();
};

function onImageEditingEscDown (evt){
  const isErrorMessageExists = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && ! isErrorMessageExists) {
    evt.preventDefault();
    closeImageEditingModal();
  }
}

const isValidType = (file) =>{
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onChangeImage = () => {
  const file = imageUploadInput.files[0];
  if(!file || !isValidType(file)){
    return;
  }
  imagePreview.src = URL.createObjectURL(file); // Создаем Blob URL

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${imagePreview.src})`;
  });

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
    postData(formData,sucessUploadImage).catch(() => submitError());
  }
};

imageUploadForm.addEventListener('submit',(evt) => onEditingFormSubmit(evt));

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
