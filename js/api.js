import {errorLoadAlert, errorUploadAlert} from './alertInformation.js';

const errorText = {
  load: 'Ошибка загрузки данных',
  send: 'Ошибка отправки данных',
};

const getData = (url = 'https://30.javascript.pages.academy/kekstagram/data') => fetch(url)
  .then((response) => response.json())
  .catch(() => (errorLoadAlert(errorText.load)));

const sendData = (body,onSucess,url = 'https://30.javascript.pages.academy/kekstagram') => fetch(url,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if(response.ok){
      onSucess();
    }else{
      throw new Error();
    }
  })
  .catch(() => {
    errorUploadAlert();
  });

export{ getData,sendData };
