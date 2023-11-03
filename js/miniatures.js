const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const PICTURE_LIST = document.querySelector('.pictures');

const createMiniatures = (data)=>{
  const picFragment = document.createDocumentFragment();

  data.forEach(({id,url,description,comments,likes}) => {
    const pictureNode = PICTURE_TEMPLATE.cloneNode(true);
    pictureNode.querySelector('.picture__img').dataset.id = id;
    pictureNode.querySelector('.picture__img').src = url;
    pictureNode.querySelector('.picture__img').alt = description;
    pictureNode.querySelector('.picture__comments').textContent = comments.length;
    pictureNode.querySelector('.picture__likes').textContent = likes;
    picFragment.append(pictureNode);
  });
  PICTURE_LIST.append(picFragment);
};

export {createMiniatures};
