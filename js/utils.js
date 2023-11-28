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
//проверка нажата ли клавиша Esc, возвращает true/false
const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const getRandomElementsArr = (arr,count) => {
  const baseArray = arr.slice();
  const result = [];

  for(let i = 0;i < count; i++){
    const index = getRandomNumber(0,baseArray.length - 1);
    result.push(baseArray.splice(index,1)[0]);
  }

  return result;
};

const sortObjectsByCommentsLength = (arr) => arr.slice().sort((a,b) => b.comments.length - a.comments.length);

export{
  getNumbers,
  getRandomElementFromArr,
  getRandomNumber,
  getId,
  isEscapeKey,
  debounce,
  getRandomElementsArr,
  sortObjectsByCommentsLength
};
