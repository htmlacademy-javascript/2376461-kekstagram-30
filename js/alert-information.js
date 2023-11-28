import { isEscapeKey } from './utils';

const ERROR_SHOWN_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

//вывод сообщения об ошибке загрузки данных, удаляется через ERROR_SHOWN_TIME (5 сек.)
const showErrorLoadAlert = (textAlert = 'Ошибка загрузки данных') => {
  const errorFragment = document.createDocumentFragment();
  const errorNode = errorLoadTemplate.cloneNode(true);

  errorNode.querySelector('.data-error__title').textContent = textAlert;
  errorFragment.append(errorNode);

  document.body.append(errorFragment);
  setTimeout(() => {
    errorNode.remove();
  }, ERROR_SHOWN_TIME);
};

const hideAlert = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  if(!existsElement){
    return;
  }

  existsElement.remove();

  document.removeEventListener('keydown',onEscapeDown);
  document.removeEventListener('click',onClickOutside);
  document.removeEventListener('click',onCloseAlert);
};

function onEscapeDown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideAlert();
  }
}

function onClickOutside (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideAlert();
}

function onCloseAlert () {
  hideAlert();
}

//вывод сообщения об успешной отправке данных
const showSuccessUploadAlert = (textAlert = 'Изображение успешно загружено') => {
  const fragment = document.createDocumentFragment();

  const successNode = successTemplate.cloneNode(true);
  successNode.querySelector('.success__title').textContent = textAlert;

  fragment.append(successNode);

  const successButton = successNode.querySelector('.success__button');

  successButton.addEventListener('click',onCloseAlert);
  document.addEventListener('keydown',onEscapeDown);
  document.addEventListener('click',onClickOutside);

  document.body.append(fragment);
};
//вывод сообщения об ошибке отправки данных
const showErrorUploadAlert = (textAlert = 'Ошибка загрузки файла') => {
  const fragment = document.createDocumentFragment();

  const errorNode = errorUploadTemplate.cloneNode(true);
  errorNode.querySelector('.error__title').textContent = textAlert;

  fragment.append(errorNode);

  const errorButton = errorNode.querySelector('.error__button');

  errorButton.addEventListener('click',onCloseAlert);
  document.addEventListener('keydown',onEscapeDown);
  document.addEventListener('click',onClickOutside);

  document.body.append(fragment);
};

export {
  showErrorLoadAlert,
  showSuccessUploadAlert,
  showErrorUploadAlert,
};
