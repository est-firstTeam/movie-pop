import { $, showLoading, finishLoading } from "../util/helper.js";
import { fetchMoviesByTitle } from "../api/api.js";
import renderMoviePoster from "./moviePoster.js";

export const SearchResult = async () => {
  const loadingWrapper = $(".loading__wrapper");
  const $searchResultWrapper = $(".search__result-wrapper");
  const $searchBarInput = $(".search__searchbar-input");
  const $searchResultMovies = $(".search__result-movies");
  const $searchForm = $(".search__form");

  if (
    !loadingWrapper ||
    !$searchResultWrapper ||
    !$searchBarInput ||
    !$searchResultMovies ||
    !$searchForm
  ) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const titleValue = params.get("title");
  const searchWord = titleValue ? titleValue : $searchBarInput; // 쿼리파람 또는 input의 검색어
  $searchBarInput.placeholder = `The result of a search for ${searchWord}`;

  $searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchValue = $searchBarInput.value;
    search(searchValue);
  });

  let currentPage = 1; // 현재 페이지
  let isFetching = false; // 데이터를 가져오는지 확인중
  let hasMore = true; // 데이터가 더 있는지 확인하는 변수

  document.body.addEventListener("scroll", () => {
    if (isFetching || !hasMore) {
      return;
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const word =
        $searchBarInput.value.length > 0 ? $searchBarInput.value : searchWord;
      search(word, false, true);
    }
  });

  const search = async (
    word,
    needToShowLoading = "true",
    isInfinityScrollMode = "false"
  ) => {
    try {
      isFetching = true;
      if (needToShowLoading) {
        showLoading();
      }

      const { movies } = await fetchMoviesByTitle(word, "", currentPage);
      isFetching = false;
      console.log(movies);
      if (movies) {
        $searchResultMovies.style.display = "grid";
        $searchResultMovies.innerHTML += movies
          .map(
            (movie) =>
              `
        <div class="movie-card">
            <div class="movie-card__imgcontainer">
              <a href="/pages/detail.html?id=${movie.imdbID}">
              ${renderMoviePoster(movie.Title, movie.Poster)}
              </a>
            </div>
            <h2 class="movie-title">${movie.Title}</h2>
            <div class="post-info">
              <span class="movie-year">${movie.Year}</span>
            </div>
        </div>
        `
          )
          .join("");
        currentPage++;
      } else {
        if (isInfinityScrollMode) {
          hasMore = false;
        } else {
          $searchResultMovies.style.display = "flex";
          $searchResultMovies.style.justifyContent = "center";
          $searchResultMovies.innerHTML = `
          <h2 class="card-noresult__text">
            There's no "<span>${word}</span>"...
          </h2>`;
          console.log("end!!!!!!");
        }
      }
    } catch (error) {
      $searchResultWrapper.innerHTML = `<p class="error-message">영화 정보를 불러오는 데 실패했습니다.</p>`;
    } finally {
      if (needToShowLoading) {
        finishLoading();
      }
    }
  };
  search(searchWord);
};
