const MAXIMUM_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const errorMessages = {};

const validateDescriptionField = (item) => item.length >= 0 && item.length <= MAX_DESCRIPTION_LENGTH;

const getHashTagErrors = () => Object.values(errorMessages).join(' ');

const validateHashTagsField = (value) =>{
  const hashTagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

  const tags = value.trim().split(' ').filter((item) => item !== '').map((tag) => tag.toLowerCase());
  const isValidTag = tags.every((item) => hashTagPattern.test(item));
  const isLengthCorrect = tags.length <= MAXIMUM_HASHTAGS;
  const uniqueTags = new Set(tags);

  const isAllTagsUnical = tags.length === uniqueTags.size;

  if(!isValidTag){
    errorMessages.valid =
      'хэш-тег должен начинается с #, состоять из букв и цифр, и быть длинной до 20 символов.';
    return isValidTag;
  }else{
    errorMessages.valid = '';
  }

  if(!isLengthCorrect){
    errorMessages.length = 'Можно указать не более 5 хеш-тегов.';
    return isLengthCorrect;
  }{
    errorMessages.length = '';
  }

  if(!isAllTagsUnical){
    errorMessages.unicals = 'Хеш теги должны быть уникальны.';
    return isAllTagsUnical;
  }{
    errorMessages.unicals = '';
  }

  return isAllTagsUnical;
};

const initValidation = (form, hashTagField, descriptionField) => {
  form.reset();
  const pristine = new Pristine(form,{
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'field-error',
  });

  pristine.addValidator(
    hashTagField,
    validateHashTagsField,
    getHashTagErrors
  );
  pristine.addValidator(
    descriptionField,
    validateDescriptionField,
    'длина комментария больше 140 символов.'
  );

  return pristine;
};

export {initValidation};
