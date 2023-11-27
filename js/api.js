import {errorLoadAlert, errorUploadAlert} from './alert-information.js';

const getData = (url = 'https://30.javascript.pages.academy/kekstagram/data') => fetch(url)
  .then((response) => response.json())
  .catch(() => (errorLoadAlert()));

const postData = (body,onSucess,url = 'https://30.javascript.pages.academy/kekstagram/') => (
  fetch(url,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if(response.ok){
        onSucess();
        return;
      }
      throw new Error();
    })
    .catch(() => {
      errorUploadAlert();
    })
);

export{ getData,postData };
