import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";
import { headerScript } from "./header.js";
import localApi from "./localApi.js";
import { STORE_KEY_BOOKMARK } from "../constant/constant.js";
import { renderMovieGrid } from "./helper.js";
import { $ } from "./helper.js";

loadHeader().then(() => {
  headerScript();
});

loadFooter();

const getBookmarkedMovies = (movieData, ids) => {
  return movieData.filter((movie) => ids.includes(movie.imdbID));
};

const bookMarkedMovieIds = await localApi.getItems(STORE_KEY_BOOKMARK);
const lstBookMarkedIds = JSON.parse(bookMarkedMovieIds);

if (lstBookMarkedIds.length !== 0) {
  const response = await fetch("/src/data/movieData.json");
  const data = await response.json();
  const bookMarkedMovies = getBookmarkedMovies(data, lstBookMarkedIds);
  renderMovieGrid(bookMarkedMovies, $(".bookmark__content"));
} else {
  const noResultCard = Object.assign(document.createElement("div"), {
    className: "movie-card-noresult",
    innerHTML: `
    <p class="card-noresult__text">
      There's no bookmarked movies!
    </p>`,
  });
  $(".bookmark__content").style = `
  display: flex;
  justify-content: center;
  `;
  $(".bookmark__content").appendChild(noResultCard);
}
