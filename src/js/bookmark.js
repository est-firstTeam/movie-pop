import localApi from "./localApi.js";
import { STORE_KEY_BOOKMARK } from "../constant/constant.js";
import { dataRender } from "./helper.js";

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
  console.log("%o", bookMarkedMovies);
  dataRender(bookMarkedMovies, $(".bookmark__content"));
}
