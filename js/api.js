import {showErrorLoadAlert, showErrorUploadAlert} from './alert-information.js';

const getData = (url = 'https://30.javascript.pages.academy/kekstagram/data') => fetch(url)
  .then((response) => response.json())
  .catch(() => (showErrorLoadAlert()));

const postData = (body,onSuccess,url = 'https://30.javascript.pages.academy/kekstagram/') => (
  fetch(url,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if(response.ok){
        onSuccess();
        return;
      }
      throw new Error();
    })
    .catch(() => {
      showErrorUploadAlert();
    })
);

export{ getData,postData };
