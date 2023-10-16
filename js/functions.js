//сравнить длинну троки с максимально возможной
function checkMaxLength(str,mLength){
  return str.length <= mLength;
}
//проверка на палиндром
function isPalindrom(str){
  const normalStr = str.toString().replaceAll(' ','').toLowerCase();
  const revercedStr = normalStr.split("").reverse().join("").toString();

  return normalStr === revercedStr;
}
//получить все числа из строки
function getNumbers(str){
  let result = '';
  let resStr = str.toString();

  for (let i = 0; i < resStr.length; i++) {
    const numInt = parseInt(resStr[i]);

    if (Number.isInteger(numInt)) {
      result += numInt.toString();
    }
  }

  if (result === '') {
    return NaN;
  }

  return Number(result);
}

//console.log(checkMaxLength('проверяемая строка', 18));//true
//console.log(isPalindrom(68.86));//true
//console.log(getNumbers('a1 b2 c3'));//123
