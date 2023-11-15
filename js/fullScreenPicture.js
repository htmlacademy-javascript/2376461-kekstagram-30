import {isEscapeKey} from './utils.js';
const bigPicture = document.querySelector('.big-picture');
const pictureList = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsButton = document.querySelector('.comments-loader');
const commentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const shownCommentCountElement = document.querySelector('.social__comment-shown-count');

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
  document.querySelector('body').classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

document.addEventListener('keydown', onDocumentKeydown);

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

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

  shownCommentCountElement.textContent = commentsList.children.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = data.comments.length;
};

const showBigPicture = (data,evt) =>{
  const id = Number(evt.target.dataset.id);
  if(isNaN(id)){
    return;
  }

  evt.preventDefault();
  const picture = data.find((item) => item.id === id);
  openBigPicture(picture);
  commentsButton.addEventListener('click', renderComments);
};

const initFullScreenPicture = (data) => {
  pictureList.addEventListener('click', (evt) => showBigPicture(data,evt));
};

export {initFullScreenPicture};
