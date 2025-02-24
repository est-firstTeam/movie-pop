import localApi from "../api/localApi.js";
import { STORE_KEY_BOOKMARK } from "../../constant/constant.js";
import { $, renderMovieGrid } from "../util/helper.js";

// const $header = ".header__wrapper";
// const headerUrl = "/pages/header.html";
// const $footer = ".footer__wrapper";
// const footerUrl = "/pages/footer.html";

// loadHtml($header, headerUrl).then(() => {
//   headerScript();
// });

// loadHtml($footer, footerUrl);
// LightMode();

export const BookMark = async () => {
  const getBookmarkedMovies = (movieData, ids) => {
    return movieData.filter((movie) => ids.includes(movie.imdbID));
  };

  const bookMarkedMovieIds = await localApi.getItems(STORE_KEY_BOOKMARK);
  const lstBookMarkedIds = JSON.parse(bookMarkedMovieIds);

  if (lstBookMarkedIds && lstBookMarkedIds.length !== 0) {
    const response = await fetch("/data/movieData.json");
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
};
