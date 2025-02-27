import { $, finishLoading, showLoading } from "../util/helper.js";
import { fetchMoviesById } from "../api/api.js";
import renderMoviePoster from "./moviePoster.js";
import { NO_DATA_SIGN } from "../../constant/constant.js";
import localApi from "../api/localApi.js";
import { STORE_KEY_BOOKMARK } from "../../constant/constant.js";
import config from "../../config/config.js";
export const initKakao = () => {
  try {
    Kakao.init(config.KAKAO_API_KEY);
  } catch (e) {
    return;
  }
};
export const Detail = async () => {

  const loadingWrapper = $(".loading__wrapper");
  const detailMovieInfoWrapper = $(".detail__movie-info-wrapper");

  if (
    !loadingWrapper ||
    !detailMovieInfoWrapper
  ) {
    return;
  }

  initKakao();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const shareBtn = $(".detail__share-btn");
  let movie; // 영화 전역 데이터

  if (!shareBtn) {
    return;
  }

  shareBtn.addEventListener("click", () => {
    var currentURL = window.location.href;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `I recommend you "${movie.Title}"`,
        description: movie.Plot.slice(0, 200) + "...",
        imageUrl: movie.Poster,
        link: {
          mobileWebUrl: currentURL,
          webUrl: currentURL,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: currentURL,
            webUrl: currentURL,
          },
        },
      ],
      installTalk: true, // 카카오톡 미설치 시 설치 경로이동
    });
  });

  $(".detail__goback-btn").addEventListener("click", () => {
    history.back();
  });

  $(".detail__bookmark-btn").addEventListener("click", async () => {
    const bookMarkedMovieIds = await localApi.getItems(STORE_KEY_BOOKMARK);

    if (bookMarkedMovieIds) {
      const lstBookMarkedIds = JSON.parse(bookMarkedMovieIds);
      const isBookMarked = lstBookMarkedIds.includes(id);
      isBookMarked
        ? removeBookmark(lstBookMarkedIds)
        : setBookmark([...lstBookMarkedIds, id]);
    } else {
      setBookmark([id]);
    }

    renderBookmarkStatus();
  });

  const renderBookmarkStatus = async () => {
    const bookMarkedMovieIds = await localApi.getItems(STORE_KEY_BOOKMARK);

    if (bookMarkedMovieIds) {
      const lstBookMarkedIds = JSON.parse(bookMarkedMovieIds);
      const isBookMarked = lstBookMarkedIds.includes(id);
      if (isBookMarked) {
        $(".detail__bookmark-btn").classList.remove("not-bookmarked");
        $(".detail__bookmark-btn").classList.add("bookmarked");
      } else {
        $(".detail__bookmark-btn").classList.remove("bookmarked");
        $(".detail__bookmark-btn").classList.add("not-bookmarked");
      }
    }
  };
  renderBookmarkStatus();

  const removeBookmark = (ids) => {
    const deletedBookMarkedIds = ids.filter((movieId) => movieId !== id);
    setBookmark([...deletedBookMarkedIds]);
  };

  const setBookmark = (ids) => {
    localApi.setItem(STORE_KEY_BOOKMARK, JSON.stringify(ids));
  };

  const renderMovieInfo = (title, value) => {
    return `
      <li>
        <span class="info__sub-title">${title}:</span>
        <span class="info__sub-desc">${value || NO_DATA_SIGN}</span>
      </li>
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
    movie = await fetchMoviesById(id);
    if (!movie) {
      throw new Error(
        "유효하지 않은 영화 ID이거나 데이터를 불러오지 못했습니다."
      );
    }
    const detailElement = `
        <article class="detail__movie-info">
        <div class="img__wrapper">
        ${renderMoviePoster(movie.Title, movie.Poster)}
         </div>
          <div class="detail__movie-info-inner">
          <h2>${movie.Title}</h2>
          <p>${movie.Plot}</p>
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
          <ul class="detail_movie-info-container">
          ${renderMovieInfo("Rated", movie.Rated)}
          ${renderMovieInfo("imdbRating", `⭐️ ${movie.imdbRating}`)}
          ${renderMovieInfo("Director", movie.Director)}
          ${renderMovieInfo("Writer", movie.Writer)}
          ${renderMovieInfo("Actors", movie.Actors)}
          ${renderMovieInfo("BoxOffice", movie.BoxOffice)}
          ${renderMovieInfo("Awards", movie.Awards)}
          </ul>
    </div>
        </article>
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
};
