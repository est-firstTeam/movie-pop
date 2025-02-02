import { headerScript } from "./header.js";
import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";
import { $ } from "./helper.js";
import renderMoviePoster from "./moviePoster.js";

const articles = $(".recommend__content");
const swiperContainer = $(".new-swiper");
const swiperContainer2 = $(".classic-swiper");

loadHeader().then(() => {
  headerScript();
});

loadFooter();

async function fetchData() {
  try {
    const response = await fetch("./data/movieData.json");
    const data = await response.json();

    const randomMovie = getRandomMovie(data);

    renderRandomMovie(randomMovie);

    renderMovies(data);
    dataRender(data, articles);
  } catch (err) {
    // 디펜시브 코딩 (실패 시 에러메세지 도출)
    console.error("Error!", err);
  }
}

function getRandomMovie(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

function renderRandomMovie(movie) {
  const posterImg = $(".slide__img");
  const detailLink = $(".slide__detailBtn");

  // DOM 업데이트
  posterImg.src = movie.Poster;
  posterImg.alt = `${movie.Title} Poster`;
  detailLink.href = `/src/pages/detail.html?id=${movie.imdbID}`;
}

function renderMovies(data) {
  const newMovies = data.filter((movie) => parseInt(movie.Year) >= "2017");
  const classicMovies = data.filter((movie) => parseInt(movie.Year) < "2017");
  console.log("new", newMovies);
  console.log("classic", classicMovies);

  dataRender2(newMovies, swiperContainer);
  dataRender2(classicMovies, swiperContainer2);
}

function dataRender(data, container) {
  container.innerHTML = data
    .map(
      (movie) => `
              <article class="movie-card">
                  <div class="movie-card__imgcontainer">
                      <a href="/src/pages/detail.html?id=${movie.imdbID}">
                          ${renderMoviePoster(movie.Title, movie.Poster)}
                      </a>
                  </div>
                  <h2 class="movie-title">${movie.Title}</h2>
                  <div class="post-info">
                  <span class="movie-year">${movie.Year}</span> • 
                  <span class="movie-runtime">${movie.Runtime}</span>
                  </div>
              </article>
              `
    )
    .join("");
}
function dataRender2(data, container) {
  container.innerHTML = data
    .map(
      (movie) => `
      <swiper-slide>
        <article class="movie-card__swipe">
          <div class="movie-card__imgcontainer">
              <a 
              class="movie-card__navigate-section"
              href="/src/pages/detail.html?id=${movie.imdbID}">
                  ${renderMoviePoster(movie.Title, movie.Poster)}
              </a>
          </div>
          <h2 class="movie-title">${movie.Title}</h2>
          <div class="post-info">
          <span class="movie-year">${movie.Year}</span> • 
          <span class="movie-runtime">${movie.Runtime}</span>
          </div>
        </article>
      </swiper-slide>
      `
    )
    .join("");
}

fetchData();

const swiperEl = $(".new-swiper");
const swiperEl2 = $(".classic-swiper");

const params = {
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  slidesPerView: "auto",
  spaceBetween: 30,
  breakpoints: {
    769: {
      slidesPerView: 5,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
  },
  navigation: {
    nextEl: ".new__swiper-btn-next",
    prevEl: ".new__swiper-btn-prev",
  },
};

const params2 = {
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  slidesPerView: "auto",
  spaceBetween: 30,

  breakpoints: {
    769: {
      centeredSlides: false,
      slidesPerView: 5,
      slidesPerGroup: 1,
      spaceBetween: 40,
    },
  },
  navigation: {
    nextEl: ".classic__swiper-btn-next",
    prevEl: ".classic__swiper-btn-prev",
  },
};

Object.assign(swiperEl, params);

swiperEl.initialize();

Object.assign(swiperEl2, params2);

swiperEl2.initialize();
