import {isEscapeKey} from './utils.js';
const BIG_PICTURE = document.querySelector('.big-picture');
const PICTURE_LIST = document.querySelector('.pictures');
const CLOSE_BUTTON = document.querySelector('.big-picture__cancel');
const COMMENTS_TEMPLATE = document.querySelector('#comment').content.querySelector('.social__comment');
const COMMENTS_LIST = document.querySelector('.social__comments');

let picturesData = null;

const renderComments = (arrComments) =>{
  const commentsFragment = document.createDocumentFragment();

  COMMENTS_LIST.textContent = '';

  arrComments.forEach((item) => {
    const commentNode = COMMENTS_TEMPLATE.cloneNode(true);
    commentNode.querySelector('img').src = item.avatar;
    commentNode.querySelector('img').alt = item.name;
    commentNode.querySelector('.social__text').textContent = item.message;
    commentsFragment.append(commentNode);
  });
  COMMENTS_LIST.append(commentsFragment);
};

const closeBigPicture = () => {

  BIG_PICTURE.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};
document.addEventListener('keydown', onDocumentKeydown);

CLOSE_BUTTON.addEventListener('click', () => {
  closeBigPicture();
});

const openBigPicture = (data) => {

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  BIG_PICTURE.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  BIG_PICTURE.querySelector('.big-picture__img img').src = data.url;
  BIG_PICTURE.querySelector('.likes-count').textContent = data.likes;
  BIG_PICTURE.querySelector('.social__caption').textContent = data.description;
  BIG_PICTURE.querySelector('.social__comment-shown-count').textContent = data.comments.length;
  BIG_PICTURE.querySelector('.social__comment-total-count').textContent = data.comments.length;

  renderComments(data.comments);
};

const showBigPicture = (evt) =>{
  evt.preventDefault();
  const picture = picturesData.find((item) => item.id === Number(evt.target.dataset.id));
  openBigPicture(picture);
};

const initFullScreenPicture = (data) => {
  PICTURE_LIST.addEventListener('click', showBigPicture);
  picturesData = data;
};

export {initFullScreenPicture};
