const articles = document.querySelector(".recommend__content");

document.addEventListener("DOMContentLoaded", function () {
  async function fetchData() {
    try {
      const response = await fetch("./data/movieData.json"); // 미리 저장한 json 파일 fetch
      const data = await response.json();
      dataRender(data, articles);
    } catch (err) {
      // 디펜시브 코딩 (실패 시 에러메세지 도출)
      console.error("Error!", err);
    }
  }

  function dataRender(data, container) {
    container.innerHTML = data
      .map(
        (movie) => `
              <article class="movie-card">
                  <div class="movie-card__imgcontainer">
                      <a href="/src/pages/detail/detail.html?id=${movie.imdbID}">
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
  fetchData();
});
