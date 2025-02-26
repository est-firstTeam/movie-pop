import { $, showMask, hideMask } from "../util/helper.js";
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
  const searchWord = params.get("title");
  $searchBarInput.placeholder = `The result of a search for ${searchWord}`;

  $searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchValue = $searchBarInput.value;
    search(searchValue);
  });

  const search = async (word) => {
    try {
      showMask(loadingWrapper);

      const { movies, totalResults } = await fetchMoviesByTitle(word);

      if (movies) {
        $searchResultMovies.style.display = "grid";
        $searchResultMovies.innerHTML = movies
          .map(
            (movie) => `
        <div class="movie-card">
            <div class="movie-card__imgcontainer">
              <a href="/pages/detail.html?id=${movie.imdbID}">
              ${renderMoviePoster(movie.Title, movie.Poster)}
              </a>
            </div>
            <h2 class="movie-title">${movie.Title}</h2>
            <div class="post-info">
              <span class="movie-year">${movie.Year}</span>
              <span class="movie-runtime">${movie.Runtime}</span>
            </div>
        </div>
        `
          )
          .join("");
      } else {
        $searchResultMovies.style.display = "flex";
        $searchResultMovies.style.justifyContent = "center";
        $searchResultMovies.innerHTML = `
        <h2 class="card-noresult__text">
          There's no "<span>${word}</span>"...
        </h2>`;
      }
    } catch (error) {
      console.log(error);
      $searchResultWrapper.innerHTML = `<p class="error-message">영화 정보를 불러오는 데 실패했습니다.</p>`;
    } finally {
      hideMask(loadingWrapper);
    }
  };
  search(searchWord);
};
