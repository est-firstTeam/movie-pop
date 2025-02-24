//아래부터 result 영역 코드
import {
  headerScript,
  getStorage,
  getDataFromApi,
  saveStorage,
} from "./header.js";
// import { $, showLoading } from "../helper.js";
import { $, showLoading } from "../util/helper.js";
import { loadHtml } from "../util/loadHtml.js";
import renderMoviePoster from "./moviePoster.js";
import { renderMovieGrid } from "../util/helper.js";
import { showMask, hideMask } from "../util/helper.js";
import { TopBtn } from "./topBtn.js";
import { LightMode } from "./lightMode.js";
export const SearchResult = async () => {
  const resultInput = $(".search-bar__input");
  const resultCard = $(".search-result__cards");
  const searchbarForm = $(".search-bar-wrapper");
  const rcmdContent = $(".recommend__content");
  const loadingWrapper = $(".loading__wrapper");
  // const $header = ".header__wrapper";
  // const headerUrl = "/pages/header.html";
  // const $footer = ".footer__wrapper";
  // const footerUrl = "/pages/footer.html";

  // loadHtml($header, headerUrl).then(() => {
  //   headerScript();
  //   resultPageInit();
  //   fetchData();
  // });

  // loadHtml($footer, footerUrl);
  // TopBtn();
  // LightMode();

  resultPageInit();
  fetchData();

  const resultPageInit = () => {
    const headerIcon = $(".header__search-btn");
    const headerInputVal = getStorage("inputVal");
    headerIcon.style.display = "none";

    let movie;
    if (headerInputVal) {
      movie = { title: headerInputVal };
      resultRender(movie);
    } else {
      movie = getStorage();
      resultRender(movie);
      resultInput.placeholder = `The result of a search for ${movie.Title}`;
    }
  };

  function resultRender(movie) {
    if (movie.Title === undefined) {
      const noResultCard = Object.assign(document.createElement("div"), {
        className: "movie-card-noresult",
        innerHTML: `
        <h2 class="card-noresult__text">
          There's no "<span>${movie.title}</span>" but how about these instead?
        </h2>`,
      });
      resultCard.appendChild(noResultCard);
      sessionStorage.removeItem("inputVal");
    } else {
      const movieCard = Object.assign(document.createElement("div"), {
        className: "movie-card",
        innerHTML: `
        <div class="movie-card__imgcontainer">
          <a href="/pages/detail.html?id=${movie.imdbID}">
          ${renderMoviePoster(movie.Title, movie.Poster)}
          </a>
        </div>
        <h2 class="movie-title">${movie.Title}</h2>
        <div class="post-info">
          <span class="movie-year">${movie.Year}</span>
          <span class="movie-runtime">${movie.Runtime}</span>
        </div>`,
      });
      resultCard.appendChild(movieCard);
    }
  }

  async function fetchData() {
    try {
      const response = await fetch("/data/movieData.json"); // 미리 저장한 json 파일 fetch
      const data = await response.json();

      const recommendMovies = data.filter(
        (movie) => parseFloat(movie.imdbRating) >= 8.0
      );
      renderMovieGrid(recommendMovies, rcmdContent);
    } catch (err) {
      // 디펜시브 코딩 (실패 시 에러메세지 도출)
      console.error("Error!", err);
    }
  }

  //Result 페이지 서치바 버튼 영역
  searchbarForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMask(loadingWrapper);
    let jsonObj = await getDataFromApi(resultInput.value);
    saveStorage(jsonObj, resultInput.value);
    hideMask(loadingWrapper);
    location.href = "/pages/searchResult.html";
  });

  resultInput.addEventListener("focus", () => {
    resultInput.placeholder = "";
  });
};
