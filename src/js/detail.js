import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";
import { headerScript } from "./header.js";
import { $, setLoading } from "./helper.js";
import { fetchMoviesById } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

loadHeader().then(() => {
  headerScript();
});

loadFooter();

$(".btn-goback").addEventListener("click", () => {
  history.back();
});

document.addEventListener("DOMContentLoaded", async () => {
  setLoading.play();
  const data = await fetchMoviesById(id);
  console.log(id);
  console.log(data);
  const geners = data.Genre.split(", ")
    .map((genre) => {
      return `
      <div class="genre__item">
      ${genre}
      </div>
      `;
    })
    .join("");
  const detailElement = `
    <section class="detail__movie-info">
    <div class="img__wrapper">
      <img src=${data.Poster} />
      </div>
      <div class="detail__movie-info-inner">
      <h1>${data.Title}</h1>
      <h2>${data.Plot}</h2>
      <div class="info__sub-area">
        <span class="detail__genre-area">${geners}
        </span>
        <span class="info__time-area">
          <span>
            <span class="info__sub-title">Released</span>
            <span class="info__sub-desc">${data.Released}</span>
          </span>
          <span>
            <span class="info__sub-title">Released</span>
            <span class="info__sub-desc">${data.Runtime}</span>
          </span>
        </span>
      </div>

      <hr class="horizontal"/>
      <div class="detail_movie-info-container">
      <div>
        <span class="info__sub-title">Rated:</span>
        <span class="info__sub-desc">${data.Rated}</span>
      </div>

      <div>
        <span class="info__sub-title">imdbRating:</span>
        <span class="info__sub-desc">⭐️ ${data.imdbRating}</span>
      </div>

      <div>
        <span class="info__sub-title">Director:</span>
        <span class="info__sub-desc">${data.Director}</span>
      </div>

      <div>
        <span class="info__sub-title">Writer:</span>
        <span class="info__sub-desc">${data.Writer}</span>
      </div>

      <div>
        <span class="info__sub-title">Actors:</span>
        <span class="info__sub-desc">${data.Actors}</span>
      </div>

      <div>
        <span class="info__sub-title">BoxOffice:</span>
        <span class="info__sub-desc">${data.BoxOffice}</span>
      </div>

      <div>
        <span class="info__sub-title">Awards:</span>
        <span class="info__sub-desc">${data.Awards}</span>
      </div>
      </div>
</div>
    </section>

`;
  setLoading.destroy();
  $(".detail__movie-info-wrapper").innerHTML = detailElement;
});
