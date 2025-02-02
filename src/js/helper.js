export const $ = (selector) => {
  return document.querySelector(selector);
};

// 로딩 애니메이션 로드
export const setLoading = bodymovin.loadAnimation({
  container: $(".loading"), // 필수, 애니메이션 들어가는 곳
  path: "/src/assets/loading.json", // 필수(url 또는 json파일 다운로드 경로)
  renderer: "svg", // 필수
  loop: true, // 반복재생
  autoplay: false, // 자동재생
});

export function dataRender(data, container) {
  container.innerHTML = data
    .map(
      (movie) => `
              <article class="movie-card">
                  <div class="movie-card__imgcontainer">
                      <a href="/src/pages/detail.html?id=${movie.imdbID}">
                          <img src="${movie.Poster}" alt="${movie.Title}">
                      </a>
                  </div>
                  <h2 class="movie-title">${movie.Title}</h2>
                  <div class="post-info">
                  <span class="movie-year">${movie.Year}</span> • 
                  <span class="movie-runtime">${movie.Runtime}</span>
                  </div>
              </article>
              `
    )
    .join("");
}
