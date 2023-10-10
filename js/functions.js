function checkMaxLength(str,mLength){
  return str.length <= mLength;
}

function isPalindrom(str){
  const normalStr = str.replaceAll(' ','').toLowerCase();
  let revercedStr = '';

  for (let i = normalStr.length - 1; i >= 0; i--) {
    revercedStr += normalStr.at(i);
  }

  return normalStr === revercedStr;
}

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

  return parseInt(result);
}
