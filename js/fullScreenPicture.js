import {isEscapeKey} from './utils.js';
const BIG_PICTURE = document.querySelector('.big-picture');
const PICTURE_LIST = document.querySelector('.pictures');
const CLOSE_BUTTON = document.querySelector('.big-picture__cancel');
const COMMETS_BUTTON = document.querySelector('.comments-loader');
const COMMENTS_TEMPLATE = document.querySelector('#comment').content.querySelector('.social__comment');
const COMMENTS_LIST = document.querySelector('.social__comments');
const SHOWN_COMMENT_COUNT = document.querySelector('.social__comment-shown-count');

const COUNT_STEP = 5;
let currentLength = 0;
let comments = [];

const renderComments = () =>{
  const commentsFragment = document.createDocumentFragment();

  COMMENTS_LIST.textContent = '';

  for (const comment of comments.slice(0,currentLength + COUNT_STEP)) {
    const commentNode = COMMENTS_TEMPLATE.cloneNode(true);
    commentNode.querySelector('img').src = comment.avatar;
    commentNode.querySelector('img').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentNode);
  }
  currentLength += COUNT_STEP;

  if(currentLength < comments.length){
    COMMETS_BUTTON.classList.remove('hidden');
  }else{
    COMMETS_BUTTON.classList.add('hidden');
  }

  COMMENTS_LIST.append(commentsFragment);
  SHOWN_COMMENT_COUNT.textContent = COMMENTS_LIST.children.length;
};

const closeBigPicture = () => {
  BIG_PICTURE.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
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
  comments = data.comments;
  currentLength = 0;

  document.querySelector('.social__comment-count').classList.remove('hidden');

  BIG_PICTURE.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  BIG_PICTURE.querySelector('.big-picture__img img').src = data.url;
  BIG_PICTURE.querySelector('.likes-count').textContent = data.likes;
  BIG_PICTURE.querySelector('.social__caption').textContent = data.description;

  renderComments();

  SHOWN_COMMENT_COUNT.textContent = COMMENTS_LIST.children.length;
  BIG_PICTURE.querySelector('.social__comment-total-count').textContent = data.comments.length;
};

const showBigPicture = (data,evt) =>{
  const id = Number(evt.target.dataset.id);
  if(isNaN(id)){
    return;
  }

  evt.preventDefault();
  const picture = data.find((item) => item.id === id);
  openBigPicture(picture);
  COMMETS_BUTTON.addEventListener('click', renderComments);
};

const initFullScreenPicture = (data) => {
  PICTURE_LIST.addEventListener('click', (evt) => showBigPicture(data,evt));
};

export {initFullScreenPicture};
