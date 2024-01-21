'use strict';

//Variables
const inputSearch = document.querySelector('.js-search');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const favSection = document.querySelector('.js-favSection');
const resultSection = document.querySelector('.js-resultSection');
const resetFav = document.querySelector('.js-resetFav');

let resultSeries = [];
let favSeries = [];
let animeSearch = '';

//Funciones de búsqueda

const addSearchResult = (series, container) => {
  for (const anime of series) {
    const article = document.createElement('article');
    article.setAttribute('class', 'result__section--series js-serie');
    article.setAttribute('id', anime.mal_id);
    container.appendChild(article);
    const seriesImg = document.createElement('img');
    article.appendChild(seriesImg);
    const seriesTitle = document.createElement('h4');
    article.appendChild(seriesTitle);
    if (
      anime.images.webp.image_url ===
      `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
    ) {
      seriesImg.setAttribute(
        'src',
        `https://placehold.co/210x295/c1c1c3/666666/?text=Imagen\n+no+encontrada`
      );
    } else {
      seriesImg.setAttribute('src', anime.images.webp.image_url);
    }
    seriesImg.setAttribute('alt', anime.title);
    const title = document.createTextNode(anime.title);
    seriesTitle.appendChild(title);
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
      resultSection.innerHTML = '';
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

//Funciones de Favoritos

const handleFavoriteSerie = (event) => {
  const serie = event.currentTarget;
  const id = parseInt(serie.id);
  const serieIndex = resultSeries.find((fav) => id === fav.mal_id);
  const serieId = favSeries.findIndex((fav) => fav.mal_id === id);
  if (serieId === -1) {
    favSeries.push(serieIndex);
    serie.setAttribute('class', 'result__section--series js-serie favorite');
  }
  favSection.innerHTML = '';
  localStorage.setItem('favorites', JSON.stringify(favSeries));
  addSearchResult(favSeries, favSection);
};

const handleRemove = (event) => {
  const remove = event.currentTarget;
  const parent = remove.parentNode;
  const idRemove = parseInt(parent.id);
  parent.remove(); //Elimina el artículo del DOM

  const newRefresh = refresh.filter((item) => item.mal_id !== idRemove);
  localStorage.setItem('favorites', JSON.stringify(newRefresh));
};

//Escucha los elementos favoritos, se llama al crearse en el DOM en la función addSearchResult
const listenerFavoriteSerie = () => {
  const serie = document.querySelectorAll('.js-serie');
  serie.forEach((option) =>
    option.addEventListener('click', handleFavoriteSerie)
  );
  const remove = document.querySelectorAll('.js-remove');
  remove.forEach((quit) => quit.addEventListener('click', handleRemove));
};

const refresh = JSON.parse(localStorage.getItem('favorites'));
addSearchResult(refresh, favSection);

//RESET (elimina también LocalStorage)
const handleReset = () => {
  resultSection.innerHTML = '';
  favSection.innerHTML = '';
  inputSearch.value = '';
  localStorage.removeItem('favorites');
};
resetBtn.addEventListener('click', handleReset);
