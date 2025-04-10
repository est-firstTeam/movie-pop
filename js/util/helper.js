import renderMoviePoster from "../components/moviePoster.js";

export const $ = (selector) => {
  return document.querySelector(selector);
};

// 로딩 애니메이션 로드
export const setLoading = bodymovin.loadAnimation({
  container: $(".loading"), // 필수, 애니메이션 들어가는 곳
  path: "/assets/loading.json", // 필수(url 또는 json파일 다운로드 경로)
  renderer: "svg", // 필수
  loop: true, // 반복재생
  autoplay: false, // 자동재생
});

// 로딩 시작
export const startLoading = () => {
  $(".loading").style.display = "block";
  setLoading.play();
};

// 로딩 끝
export const endLoading = () => {
  setLoading.stop();
  $(".loading").style.display = "none";
};

export function renderMovieGrid(data, container) {
  container.innerHTML = data
    .map(
      (movie) => `
              <article class="movie-card">
                  <div class="movie-card__imgcontainer">
                      <a href="/pages/detail.html?id=${movie.imdbID}">
                          ${renderMoviePoster(movie.Title, movie.Poster)}
                      </a>
                  </div>
                  <h2 class="movie-title">${movie.Title}</h2>
                  <div class="post-info">
                  <span class="movie-year">${movie.Year}</span>
                  <span class="movie-runtime">${movie.Runtime}</span>
                  <span class="movie-rating">${movie.imdbRating}</span>
                  </div>
              </article>
              `
    )
    .join("");
}

export const showLoading = () => {
  const $loadingWrapper = $(".loading__wrapper");
  if (!$loadingWrapper) {
    return;
  }

  $loadingWrapper.style.display = "block";

  const windowWidth = window.document.body.clientWidth;
  const windowHeight = window.document.body.clientHeight;

  $loadingWrapper.style.width = `${windowWidth}px`;
  $loadingWrapper.style.height = `${windowHeight}px`;
  $loadingWrapper.style.display = "flex";

  startLoading();
};

export const finishLoading = () => {
  const $loadingWrapper = $(".loading__wrapper");
  if (!$loadingWrapper) {
    return;
  }

  endLoading();
  $loadingWrapper.style.display = "none";
};
