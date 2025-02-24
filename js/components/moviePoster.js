import { NOIMG_URL, NO_DATA_SIGN } from "../../constant/constant.js";

const renderMoviePoster = (movieTitle, posterUrl) => {
  return `
    <img src="${
      posterUrl === NO_DATA_SIGN ? NOIMG_URL : posterUrl
    }" alt="${movieTitle}">
    `;
};
export default renderMoviePoster;
