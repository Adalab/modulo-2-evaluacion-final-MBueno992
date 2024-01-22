'use strict';

//Variables
const inputSearch = document.querySelector('.js-search');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelectorAll('.js-resetBtn');
const favSection = document.querySelector('.js-favSection');
const resultSection = document.querySelector('.js-resultSection');

let resultSeries = [];
let favSeries = [];
let animeSearch = '';

const addSearchResult = (series, container) => {
  container.innerHTML = '';
  for (const anime of series) {
    const article = document.createElement('article');
    article.setAttribute('class', 'result__section--series js-serie');
    article.setAttribute('id', anime.mal_id);
    container.appendChild(article);
    const seriesImg = document.createElement('img');
    article.appendChild(seriesImg);
    if (
      anime.images.webp.image_url ===
      `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
    ) {
      seriesImg.setAttribute(
        'src',
        `https://placehold.co/210x295/c1c1c3/666666/?text=Imagen+no+encontrada`
      );
    } else {
      seriesImg.setAttribute('src', anime.images.webp.image_url);
    }
    seriesImg.setAttribute('alt', anime.title);
    const seriesTitle = document.createElement('h4');
    article.appendChild(seriesTitle);
    const title = document.createTextNode(anime.title);
    seriesTitle.appendChild(title);
    const isFavorite = favSeries.findIndex(
      (fav) => fav.mal_id === anime.mal_id
    );
    if (isFavorite !== -1) {
      article.classList.add('favorite');
    }
    if (series === favSeries || series === refresh) {
      article.setAttribute('class', 'fav__section--series');
      const span = document.createElement('span');
      const text = document.createTextNode('X');
      span.setAttribute('class', 'quitList js-remove');
      article.appendChild(span);
      span.appendChild(text);
    }
  }
  listenerFavoriteSerie();
};

const chargeDataApi = (event) => {
  event.preventDefault();
  fetch(`${animeSearch}`)
    .then((response) => response.json())
    .then((listSeries) => {
      resultSeries = listSeries.data;
      addSearchResult(resultSeries, resultSection);
    })
    .catch((error) => console.log('Error', error));
};

searchBtn.addEventListener('click', chargeDataApi);

const handleSearchAnime = () => {
  const userSearch = inputSearch.value;
  animeSearch = `https://api.jikan.moe/v4/anime?q=${userSearch}`;
};

inputSearch.addEventListener('input', handleSearchAnime);

const addFavoriteSerie = (event) => {
  const id = parseInt(event.currentTarget.id);
  const serieIndex = resultSeries.find((fav) => id === fav.mal_id);
  const serieId = favSeries.findIndex((fav) => fav.mal_id === id);
  if (serieId === -1) {
    favSeries.push(serieIndex);
  } else {
    favSeries.splice(serieId, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favSeries));
  addSearchResult(favSeries, favSection);
  addSearchResult(resultSeries, resultSection);
};

const handleRemove = (event) => {
  const parent = event.currentTarget.parentNode;
  const idRemove = parseInt(parent.id);
  const removeArray = favSeries.findIndex(
    (indexRemove) => indexRemove.mal_id === idRemove
  );
  favSeries.splice(removeArray, 1);
  localStorage.setItem('favorites', JSON.stringify(favSeries));
  addSearchResult(favSeries, favSection);
  addSearchResult(resultSeries, resultSection);
};

const listenerFavoriteSerie = () => {
  const serie = document.querySelectorAll('.js-serie');
  serie.forEach((option) => option.addEventListener('click', addFavoriteSerie));
  const remove = document.querySelectorAll('.js-remove');
  remove.forEach((quit) => quit.addEventListener('click', handleRemove));
};

const handleReset = (event) => {
  const favBtn = event.currentTarget;
  const removeFav = favBtn.parentNode;
  favSection.innerHTML = '';
  favSeries = [];
  localStorage.removeItem('favorites');
  addSearchResult(resultSeries, resultSection);
  if (removeFav.id === 'headerContainer') {
    resultSection.innerHTML = '';
    inputSearch.value = '';
  }
};
resetBtn.forEach((reset) => reset.addEventListener('click', handleReset));

const refresh = JSON.parse(localStorage.getItem('favorites'));
if (!refresh) {
  console.log('No hay datos en el LocalStorage');
} else {
  favSeries = [...refresh];
  addSearchResult(refresh, favSection);
}
