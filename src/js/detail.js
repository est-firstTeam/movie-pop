import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";
import { headerScript } from "./header.js";
import { $, finishLoading, showLoading } from "./helper.js";
import { fetchMoviesById } from "./api.js";
import renderMoviePoster from "./moviePoster.js";
import { NO_DATA_SIGN } from "../constant/constant.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

loadHeader().then(() => {
  headerScript();
});

loadFooter();

$(".btn-goback").addEventListener("click", () => {
  history.back();
});

const renderMovieInfo = (title, value) => {
  return `
    <div>
      <span class="info__sub-title">${title}:</span>
      <span class="info__sub-desc">${value || NO_DATA_SIGN}</span>
    </div>
  `;
};

const renderGeners = (genres) => {
  return (
    genres
      ?.split(", ")
      .map((genre) => {
        return `
        <div class="genre__item">
        ${genre}
        </div>
        `;
      })
      .join("") || NO_DATA_SIGN
  );
};

try {
  showLoading();
  const movie = await fetchMoviesById(id);
  if (!movie) {
    throw new Error(
      "유효하지 않은 영화 ID이거나 데이터를 불러오지 못했습니다."
    );
  }
  const detailElement = `
      <section class="detail__movie-info">
      <div class="img__wrapper">
      ${renderMoviePoster(movie.Title, movie.Poster)}
       </div>
        <div class="detail__movie-info-inner">
        <h1>${movie.Title}</h1>
        <h2>${movie.Plot}</h2>
        <div class="info__sub-area">
          <span class="detail__genre-area">${renderGeners(movie.Genre)}
          </span>
          <span class="info__time-area">
            <span>
              <span class="info__sub-title">Released</span>
              <span class="info__sub-desc">${movie.Released}</span>
            </span>
            <span>
              <span class="info__sub-title">Runtime</span>
              <span class="info__sub-desc">${movie.Runtime}</span>
            </span>
          </span>
        </div>
  
        <hr class="horizontal"/>
        <div class="detail_movie-info-container">
        ${renderMovieInfo("Rated", movie.Rated)}
        ${renderMovieInfo("imdbRating", `⭐️ ${movie.imdbRating}`)}
        ${renderMovieInfo("Director", movie.Director)}
        ${renderMovieInfo("Writer", movie.Writer)}
        ${renderMovieInfo("Actors", movie.Actors)}
        ${renderMovieInfo("BoxOffice", movie.BoxOffice)}
        ${renderMovieInfo("Awards", movie.Awards)}
        </div>
  </div>
      </section>
  `;
  $(".detail__movie-info-wrapper").innerHTML = detailElement;
} catch (error) {
  finishLoading();
  console.error(error);
  $(
    ".detail__movie-info-wrapper"
  ).innerHTML = `<p class="error-message">영화 정보를 불러오는 데 실패했습니다.</p>`;
} finally {
  finishLoading();
}
