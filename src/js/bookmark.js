import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";
import { headerScript } from "./header.js";
import localApi from "./localApi.js";
import { STORE_KEY_BOOKMARK } from "../constant/constant.js";
import { dataRender } from "./helper.js";
import { $ } from "./helper.js";

loadHeader().then(() => {
  headerScript();
});

loadFooter();

const getBookmarkedMovies = (movieData, ids) => {
  return movieData.filter((movie) => ids.includes(movie.imdbID));
};

const bookMarkedMovieIds = await localApi.getItems(STORE_KEY_BOOKMARK);
if (bookMarkedMovieIds) {
  const lstBookMarkedIds = JSON.parse(bookMarkedMovieIds);
  console.log(lstBookMarkedIds);

  const response = await fetch("/src/data/movieData.json");
  const data = await response.json();
  console.log(data);
  const bookMarkedMovies = getBookmarkedMovies(data, lstBookMarkedIds);
  dataRender(bookMarkedMovies, $(".bookmark__content"));
}
