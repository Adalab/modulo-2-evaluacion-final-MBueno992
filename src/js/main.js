'use strict';

//Variables
const inputSearch = document.querySelector('.js-search');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const favSection = document.querySelector('.js-favSection');
const resultSection = document.querySelector('.js-resultSection');

let resultSeries = [];
let favSeries = [];
let animeSearch = '';

//Funciones de búsqueda

const addSearchResult = (series, container) => {
  for (const anime of series) {
    const article = document.createElement('article');
    article.setAttribute('class', 'main__result--series js-serie');
    article.setAttribute('id', anime.mal_id);
    container.appendChild(article);
    const seriesImg = document.createElement('img');
    article.appendChild(seriesImg);
    const seriesTitle = document.createElement('h4');
    article.appendChild(seriesTitle);
    seriesImg.setAttribute('src', anime.images.webp.image_url);
    seriesImg.setAttribute('alt', anime.title);
    const title = document.createTextNode(anime.title);
    seriesTitle.appendChild(title);
    if (series === favSeries || series === refresh) {
      article.setAttribute('class', 'main__fav--series');
      const span = document.createElement('span');
      const text = document.createTextNode('X');
      span.setAttribute('class', 'quitList');
      article.appendChild(span);
      span.appendChild(text);
    }
  }
  listenerFavoriteSerie();
  //https://via.placeholder.com/210x295/c1c1c3/666666/?text=TV.
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
  const userSearch = inputSearch.value.toLowerCase();
  animeSearch = `https://api.jikan.moe/v4/anime?q=${userSearch}`;
};

inputSearch.addEventListener('input', handleSearchAnime);

//Funciones de Favoritos

const handleFavoriteSerie = (event) => {
  const serie = event.currentTarget;
  const id = parseInt(event.currentTarget.id);
  const serieIndex = resultSeries.find((fav) => id === fav.mal_id);
  const serieId = favSeries.findIndex((fav) => fav.mal_id === id);
  if (serieId === -1) {
    favSeries.push(serieIndex);
    serie.setAttribute('class', 'main__result--series js-serie favorite');
  }

  favSection.innerHTML = '';
  localStorage.setItem('favSeries', JSON.stringify(favSeries));

  addSearchResult(favSeries, favSection);
};

const listenerFavoriteSerie = () => {
  const serie = document.querySelectorAll('.js-serie');
  serie.forEach((option) =>
    option.addEventListener('click', handleFavoriteSerie)
  );
};

const refresh = JSON.parse(localStorage.getItem('favSeries'));
addSearchResult(refresh, favSection);
