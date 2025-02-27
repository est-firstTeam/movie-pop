import localApi from "../api/localApi.js";
import { STORE_KEY_BOOKMARK } from "../../constant/constant.js";
import { $, renderMovieGrid } from "../util/helper.js";

export const BookMark = async () => {
  const $bookmarkContent = $(".bookmark__content");
  if (!$bookmarkContent) {
    return;
  }
  const getBookmarkedMovies = (movieData, ids) => {
    return movieData.filter((movie) => ids.includes(movie.imdbID));
  };

  const bookMarkedMovieIds = await localApi.getItems(STORE_KEY_BOOKMARK);
  const lstBookMarkedIds = JSON.parse(bookMarkedMovieIds);

  if (lstBookMarkedIds && lstBookMarkedIds.length !== 0) {
    const response = await fetch("/data/movieData.json");
    const data = await response.json();
    const bookMarkedMovies = getBookmarkedMovies(data, lstBookMarkedIds);
    renderMovieGrid(bookMarkedMovies, $bookmarkContent);
  } else {
    const noResultCard = Object.assign(document.createElement("div"), {
      className: "movie-card-noresult",
      innerHTML: `
      <p class="card-noresult__text">
        There's no bookmarked movies!
      </p>`,
    });
    $bookmarkContent.style = `
    display: flex;
    justify-content: center;
    `;
    $bookmarkContent.appendChild(noResultCard);
  }
};
