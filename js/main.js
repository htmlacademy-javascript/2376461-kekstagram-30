//получить случайное число
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const ALL_COMMENTS = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const ALL_NAMES = ['Анна', 'Иван', 'Мария', 'Александр', 'Екатерина', 'Алексей', 'Ольга', 'Дмитрий', 'Наталья', 'Сергей'];
const ALL_DESCRIPTIONS = ['случайное описание 1','случайное описание 2','случайное описание 3'];

const getId = () => {
  let count = 0;

  return () => {
    count++;
    return count;
  };
}

//получить случайный элемент из массива
const getRandomElementFromArr = (arr) => arr[getRandomNumber(0,arr.length - 1)];

const generateDescriptionId = getId();//генератор уникального ид описания
const generateCommentId = getId();//генератор уникального ид комментария

//создать комментарий
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(0,6)}.jpg`,
  message: getRandomElementFromArr(ALL_COMMENTS),
  name: getRandomElementFromArr(ALL_NAMES)
});
//создать описание
const createDescription = () => ({
  id: generateDescriptionId(),
  url: `photos/${getRandomNumber(0,6)}.jpg`,
  description: getRandomElementFromArr(ALL_DESCRIPTIONS),
  likes: getRandomNumber(15,200),
  comments:Array.from({ length: getRandomNumber(1,25) }, createComment)
});

const createAllDescriptions = (descriptionCount) => Array.from({ length: descriptionCount }, createDescription);

console.log(createAllDescriptions(25));
