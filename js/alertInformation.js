import { isEscapeKey } from './utils';

const ERROR_SHOWN_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorUpluadTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

//вывод сообщения об ошибке загрузки данных, удаляется через ERROR_SHOWN_TIME (5 сек.)
const errorLoadAlert = (textAlert = 'Упс... Произошла ошибка!') => {
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
  existsElement.remove();

  document.removeEventListener('keydown',onEscapeDown);
  document.removeEventListener('click',handleClickOutside);
};

function onEscapeDown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideAlert();
  }
}

function handleClickOutside (evt,inner) {
  if (!inner.contains(evt.target)) {
    hideAlert();
  }
}

const handleCloseAlert = () => {
  hideAlert();
};

//вывод сообщения об успешной отправке данных
const successUploadAlert = (textAlert = 'Изображение успешно загружено') => {
  const fragment = document.createDocumentFragment();

  const successNode = successTemplate.cloneNode(true);
  successNode.querySelector('.success__title').textContent = textAlert;

  fragment.append(successNode);

  const successButton = successNode.querySelector('.success__button');
  const successInner = successNode.querySelector('.success__inner');
  successButton.addEventListener('click',() => handleCloseAlert());
  document.addEventListener('keydown',onEscapeDown);
  document.addEventListener('click',(evt) => handleClickOutside(evt,successInner),{once: true});

  document.body.append(fragment);
};
//вывод сообщения об ошибке отправки данных
const errorUploadAlert = (textAlert = 'Ошибка загрузки файла') => {
  const fragment = document.createDocumentFragment();

  const errorNode = errorUpluadTemplate.cloneNode(true);
  errorNode.querySelector('.error__title').textContent = textAlert;

  fragment.append(errorNode);

  const errorButton = errorNode.querySelector('.error__button');
  const errorInner = errorNode.querySelector('.error__inner');
  errorButton.addEventListener('click',() => handleCloseAlert());
  document.addEventListener('keydown',onEscapeDown);
  document.addEventListener('click',(evt) => handleClickOutside(evt,errorInner),{once: true});

  document.body.append(fragment);
};

export {
  errorLoadAlert,
  successUploadAlert,
  errorUploadAlert,
};
