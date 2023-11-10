import {isEscapeKey} from './utils.js';
import {initValidation} from './validateFields.js';
let pristie;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageEditingModal = document.querySelector('.img-upload__overlay');
const imageEditingClose = document.querySelector('.img-upload__cancel');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const closeImageEditingModal = () => {
  imageUploadInput.value = '';
  hashTagField.value = '';
  descriptionField.value = '';

  imageEditingModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};
imageEditingClose.addEventListener('click', closeImageEditingModal);

const onChangeFormInput = () => {
  imageEditingModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  pristie = initValidation(imageUploadForm,hashTagField,descriptionField);
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

  const isFieldsValid = pristie.validate();

  if(isFieldsValid){
  //форма влидна, отправляем
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

const uploadingImage = () =>{
  imageUploadInput.addEventListener('change', onChangeFormInput);
};
export{uploadingImage};
