import {createMiniatures} from './miniatures.js';
import {getRandomElementsArr,sortObjectsByCommentsLength,debounce} from './utils.js';

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const RANDOM_IMAGES_COUNT = 10;
let imageData = null;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
let selectedFilter = Filters.DEFAULT;

const switchSelectedFilter = (targetFiler) => {
  filtersForm.querySelector(`#${selectedFilter}`).classList.remove('img-filters__button--active');
  selectedFilter = targetFiler;
  filtersForm.querySelector(`#${targetFiler}`).classList.add('img-filters__button--active');
};

const filterDefault = () => {
  if(!imageData){
    return;
  }

  createMiniatures(imageData);

};
const filterRandom = () =>{
  if(!imageData){
    return;
  }
  createMiniatures(getRandomElementsArr(imageData,RANDOM_IMAGES_COUNT));

};
const filterDiscussed = () =>{
  if(!imageData){
    return;
  }
  createMiniatures(sortObjectsByCommentsLength(imageData));

};

const debouncedFilterDefault = debounce(filterDefault,500);
const debouncedFilterRandom = debounce(filterRandom,500);
const debouncedFilterDiscussed = debounce(filterDiscussed,500);

const functionsFilters = {
  'filter-default': function(){
    debouncedFilterDefault();
    switchSelectedFilter(Filters.DEFAULT);
  },
  'filter-random': function(){
    debouncedFilterRandom();
    switchSelectedFilter(Filters.RANDOM);
  },
  'filter-discussed': function(){
    debouncedFilterDiscussed();
    switchSelectedFilter(Filters.DISCUSSED);
  },
};

const onFilterSelect = (evt) => {
  if(evt.target.id){
    const filerId = evt.target.id;

    functionsFilters[filerId]();
  }
};

const initFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  imageData = data;
  filtersForm.addEventListener('click',onFilterSelect);
};

export { initFilters };
