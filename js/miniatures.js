const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const clearElements = () => {
  const PICTURES = pictureList.querySelectorAll('.picture');
  if(!PICTURES){
    return;
  }
  const arrPictures = Array.from(PICTURES);

  arrPictures.forEach((item) => item.remove());
};

const createMiniatures = (data)=>{
  clearElements();
  if(!data){
    return;
  }
  const picFragment = document.createDocumentFragment();

  data.forEach(({id,url,description,comments,likes}) => {
    const pictureNode = pictureTemplate.cloneNode(true);
    pictureNode.querySelector('.picture__img').dataset.id = id;
    pictureNode.querySelector('.picture__img').src = url;
    pictureNode.querySelector('.picture__img').alt = description;
    pictureNode.querySelector('.picture__comments').textContent = comments.length;
    pictureNode.querySelector('.picture__likes').textContent = likes;
    picFragment.append(pictureNode);
  });

  pictureList.append(picFragment);
};

export {createMiniatures};
