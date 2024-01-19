'use strict';

//Variables
const inputSearch = document.querySelector('.js-search');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const favSection = document.querySelector('.js-favSection');
const resultSection = document.querySelector('.js-resultSection');

let animeSeries = [];
let animeSearch = '';

const addSearchResult = () => {
  resultSection.innerHTML = '';
  for (const anime of animeSeries) {
    const article = document.createElement('article');
    resultSection.appendChild(article);
    const seriesImg = document.createElement('img');
    article.appendChild(seriesImg);
    const seriesTitle = document.createElement('h4');
    article.appendChild(seriesTitle);
    seriesImg.setAttribute('src', anime.images.webp.image_url);
    seriesImg.setAttribute('alt', anime.title);
    const title = document.createTextNode(anime.title);
    seriesTitle.appendChild(title);
  }
};

const chargeDataApi = (event) => {
  event.preventDefault();
  fetch(`${animeSearch}`)
    .then((response) => response.json())
    .then((listSeries) => {
      animeSeries = listSeries.data;
      addSearchResult(animeSeries);
    })
    .catch((error) => console.log('Error', error));
};

searchBtn.addEventListener('click', chargeDataApi);

const handleSearchAnime = () => {
  const userSearch = inputSearch.value.toLowerCase();
  animeSearch = `https://api.jikan.moe/v4/anime?q=${userSearch}`;
  console.log(animeSearch);
};

inputSearch.addEventListener('input', handleSearchAnime);
