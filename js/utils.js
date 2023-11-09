//сравнить длинну троки с максимально возможной
const checkMaxLength = (str,mLength) => str.length <= mLength;
//проверка на палиндром
const isPalindrom = (str) => {
  const normalStr = str.toString().replaceAll(' ','').toLowerCase();
  const revercedStr = normalStr.split('').reverse().join('').toString();

  return normalStr === revercedStr;
};
//получить все числа из строки
const getNumbers = (str) =>{
  let result = '';
  const resStr = str.toString();

  for (let i = 0; i < resStr.length; i++) {
    const numInt = Number(resStr[i]);

    if (Number.isInteger(numInt)) {
      result += numInt.toString();
    }
  }

  if (result === '') {
    return NaN;
  }

  return Number(result);
};
//получить случайное число
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//получить случайный элемент из массива
const getRandomElementFromArr = (arr) => arr[getRandomNumber(0,arr.length - 1)];
//возвращает уникальный id
const getId = () => {
  let count = 0;

  return () => {
    count++;
    return count;
  };
};
const isEscapeKey = (evt) => evt.key === 'Escape';

export{checkMaxLength,isPalindrom,getNumbers,getRandomElementFromArr,getRandomNumber,getId,isEscapeKey};
