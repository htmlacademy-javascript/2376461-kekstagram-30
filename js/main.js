const DESCRIPTIONS_COUNT = 25;
const LIKE_MIN_COUNT = 25;
const LIKE_MAX_COUNT = 200;
const COMMENTS_MIN_COUNT = 1;
const COMMENTS_MAX_COUNT = 20;
const AVATARS_COUNT = 6;
const PHOTOS_COUNT = 6;
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
const ALL_DESCRIPTIONS = [
  'Красивый закат над океаном',
  'Уютный камин в зимнем доме',
  'Зеленые холмы и цветущие поля',
  'Романтический ужин на террасе',
  'Путешествие по водопадам и джунглям',
  'Атмосферный вечерний городский пейзаж',
  'Мягкий песок и теплое солнце на пляже',
  'Величественные снежные горы',
  'Играющие дети на широкой лужайке',
  'Загадочный лес с туманом и светлячками'];
const ALL_NAMES = ['Анна', 'Иван', 'Мария', 'Александр', 'Екатерина', 'Алексей', 'Ольга', 'Дмитрий', 'Наталья', 'Сергей'];

const getId = () => {
  let count = 0;

  return () => {
    count++;
    return count;
  };
}

//получить случайный элемент из массива
const getRandomElementFromArr = (arr) => arr[getRandomNumber(0,arr.length - 1)];
//создать сообщение
const createMessage = (arr) => Array.from({length: getRandomNumber(1,2)}, () => getRandomElementFromArr(arr)).join();

const generateDescriptionId = getId();//генератор уникального ид описания
const generateCommentId = getId();//генератор уникального ид комментария

//создать комментарий
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(0,AVATARS_COUNT)}.jpg`,
  message: createMessage(ALL_COMMENTS),
  name: getRandomElementFromArr(ALL_NAMES)
});
//создать описание
const createDescription = () => ({
  id: generateDescriptionId(),
  url: `photos/${getRandomNumber(0,PHOTOS_COUNT)}.jpg`,
  description: getRandomElementFromArr(ALL_DESCRIPTIONS),
  likes: getRandomNumber(LIKE_MIN_COUNT,LIKE_MAX_COUNT),
  comments:Array.from({ length: getRandomNumber(COMMENTS_MIN_COUNT,COMMENTS_MAX_COUNT) }, createComment)
});

const createAllDescriptions = (descriptionCount) => Array.from({ length: descriptionCount }, createDescription);

console.log(createAllDescriptions(DESCRIPTIONS_COUNT));
