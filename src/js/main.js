'use strict';

//Variables
const inputSearch = document.querySelector('.js-search');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelectorAll('.js-resetBtn');
const favSection = document.querySelector('.js-favSection');
const resultSection = document.querySelector('.js-resultSection');
const resetFavBtn = document.querySelector('.js-resetFav');

let resultSeries = [];
let favSeries = [];
let animeSearch = '';

//Funciones de búsqueda

//Añade en el DOM las series

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

//Carga los datos desde la API
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

//Recoge los datos del input para poder generar el enlace de la API
const handleSearchAnime = () => {
  const userSearch = inputSearch.value;
  animeSearch = `https://api.jikan.moe/v4/anime?q=${userSearch}`;
};

inputSearch.addEventListener('input', handleSearchAnime);

//Funciones de Favoritos

//Añade a favoritos la serie y pinta en resultado la elección
const addFavoriteSerie = (event) => {
  const serie = event.currentTarget;
  const id = parseInt(serie.id);
  const serieIndex = resultSeries.find((fav) => id === fav.mal_id);
  const serieId = favSeries.findIndex((fav) => fav.mal_id === id);
  if (serieId === -1) {
    favSeries.push(serieIndex);
    serie.classList.add('favorite');
  }
  favSection.innerHTML = '';
  localStorage.setItem('favorites', JSON.stringify(favSeries));
  addSearchResult(favSeries, favSection);
};

//Borra la serie clickada en X de favoritos
const handleRemove = (event) => {
  const remove = event.currentTarget;
  const parent = remove.parentNode;
  const idRemove = parseInt(parent.id);
  parent.remove();
  //Elimina el artículo del DOM
};

//Escucha los elementos favoritos, se llama al crearse en el DOM en la función addSearchResult
const listenerFavoriteSerie = () => {
  const serie = document.querySelectorAll('.js-serie');
  serie.forEach((option) => option.addEventListener('click', addFavoriteSerie));
  const remove = document.querySelectorAll('.js-remove');
  remove.forEach((quit) => quit.addEventListener('click', handleRemove));
};

//RESET (elimina también LocalStorage)
const handleReset = (event) => {
  const favBtn = event.currentTarget;
  const removeFav = favBtn.parentNode;
  favSection.innerHTML = '';
  favSeries = [];
  localStorage.removeItem('favorites');
  if (removeFav.id === 'headerContainer') {
    resultSection.innerHTML = '';
    inputSearch.value = '';
  }
};
resetBtn.forEach((reset) => reset.addEventListener('click', handleReset));

//RESET sólo favoritos (elimina LocalStorage)

// const resetFavSection = () => {
//   favSeries = [];
//   localStorage.removeItem('favorites');
//   favSection.innerHTML = '';
// };

// resetFavBtn.addEventListener('click', resetFavSection);

//Al cargar la página,, si hay datos en el LocalStorage los carga, sino muestra mensaje en consola
const refresh = JSON.parse(localStorage.getItem('favorites'));
if (!refresh) {
  console.log('No hay datos en el LocalStorage');
} else {
  addSearchResult(refresh, favSection);
}
