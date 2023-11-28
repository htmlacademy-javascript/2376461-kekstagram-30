import {isEscapeKey} from './utils.js';

const pictures = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const shownCommentCountElement = bigPicture.querySelector('.social__comment-shown-count');

const commentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const COUNT_STEP = 5;

let currentLength = 0;
let comments = [];

const renderComments = () =>{
  const commentsFragment = document.createDocumentFragment();

  commentsList.textContent = '';

  for (const comment of comments.slice(0,currentLength + COUNT_STEP)) {
    const commentNode = commentsTemplate.cloneNode(true);
    commentNode.querySelector('img').src = comment.avatar;
    commentNode.querySelector('img').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentNode);
  }
  currentLength += COUNT_STEP;

  if(currentLength < comments.length){
    commentsButton.classList.remove('hidden');
  }else{
    commentsButton.classList.add('hidden');
  }

  commentsList.append(commentsFragment);
  shownCommentCountElement.textContent = commentsList.children.length;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.querySelector('body').classList.remove('modal-open');
};

function onDocumentKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (data) => {
  comments = data.comments;
  currentLength = 0;

  document.querySelector('.social__comment-count').classList.remove('hidden');

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  renderComments();

  shownCommentCountElement.textContent = String(commentsList.children.length);
  bigPicture.querySelector('.social__comment-total-count').textContent = String(data.comments.length);
};

const onRenderComments = () => {
  renderComments();
};

const showBigPicture = (data,evt) =>{
  const id = Number(evt.target.dataset.id);
  if(isNaN(id)){
    return;
  }

  evt.preventDefault();
  const picture = data.find((item) => item.id === id);
  openBigPicture(picture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsButton.addEventListener('click', onRenderComments);
};

const initFullScreenPicture = (data) => {
  pictures.addEventListener('click', (evt) => showBigPicture(data,evt));

  closeButton.addEventListener('click', () => {
    closeBigPicture();
  });
};

export {initFullScreenPicture};
