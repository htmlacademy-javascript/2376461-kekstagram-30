//получить случайное число
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//обьект описания
const photoDescription = {
id: 0,
url: '',
description: '',
likes: 0,
comments: [],
};
//обьект комментария
const comment = {
  id: 0,
  avatar: '',
  message: '',
  name: ''
};

const allComments = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const allNames = ['Анна', 'Иван', 'Мария', 'Александр', 'Екатерина', 'Алексей', 'Ольга', 'Дмитрий', 'Наталья', 'Сергей'];
const allDescriptions = ['случайное описание 1','случайное описание 2','случайное описание 3'];

//получить уникальный ID, который не будет повторяться
function getUniqueId (min = 0,max){
let listId = [];

return function (){
  let currentId = getRandomNumber(min,max);

  while(listId.includes(currentId)){
    currentId = getRandomNumber(min,max);
  }

  listId.push(currentId);
  return currentId;
}
}
//создать ссылку на картинку
function crateImgLink(id){
  return 'photos/' + id + '.jpg';
}
//создать ссылку на avatar
function crateAvatarLink(id){
  return 'img/avatar-' + id + '.jpg';
}
//получить случайный элемент из массива
function getRandomElementFromArr(arr){
return arr[getRandomNumber(0,arr.length-1)];
}

const generateDescriptionId = getUniqueId(1,25);//генератор уникального ид описания
const generateCommentId = getUniqueId(1,25);//генератор уникального ид комментария

//создать комментарий
function createComment(){
return {
  id: generateCommentId(0,30),
  avatar: crateAvatarLink(getRandomNumber(0,6)),
  message: getRandomElementFromArr(allComments),
  name: getRandomElementFromArr(allNames)
};
}
//создать описание
function createDescription(){
  return{
    id: generateDescriptionId(),
    url: crateImgLink(getRandomNumber(0,6)),
    description: getRandomElementFromArr(allDescriptions),
    likes: getRandomNumber(15,200),
    comments:Array.from({ length: 4 }, createComment)
  };
}
function createAllDescriptions(descriptionCount){
  return Array.from({ length: descriptionCount }, createDescription);
}
console.log(createAllDescriptions(4));
