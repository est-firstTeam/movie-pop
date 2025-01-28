//아래부터 result 영역 코드
import { loadHeader } from "../../js/loadHeader.js";
import {
  headerScript,
  getStorage,
  getDataFromApi,
  saveStorage,
} from "../../headerScript.js";

const resultInput = document.querySelector(".search-bar__input");
const resultCard = document.querySelector(".search-result__cards");
const searchbarForm = document.querySelector(".search-bar-wrapper");
const rcmdContent = document.querySelector(".recommend__content");

loadHeader().then(() => {
  headerScript();
  resultPageInit();
  fetchData();
  console.log("loadheader.....");
});

const resultPageInit = () => {
  const headerInputVal = getStorage("inputVal");
  const headerIcon = document.querySelector(".header__search-icon");
  headerIcon.style.display = "none";

  let movie;
  if (headerInputVal) {
    movie = { title: headerInputVal };
    resultRender(movie);
  } else {
    movie = getStorage();
    resultRender(movie);
    resultInput.placeholder = `The result of a search for ${movie.Title}`;
  }
};

function resultRender(movie) {
  if (movie.Title === undefined) {
    const noResultCard = Object.assign(document.createElement("div"), {
      className: "movie-card-noresult",
      innerHTML: `
      <h2 class="card-noresult__text">
        There's no "<span>${movie.title}</span>" but how about these instead?
      </h2>`,
    });
    resultCard.appendChild(noResultCard);
    sessionStorage.removeItem("inputVal");
  } else {
    const movieCard = Object.assign(document.createElement("div"), {
      className: "movie-card",
      innerHTML: `
      <a class="movie-cardimgcontainer" href="http://localhost:5500/src/pages/detail/detail.html?id=${
        movie.imdbID
      }">
        <img src="${
          movie.Poster === "N/A" ? window.NOIMG_URL : movie.Poster
        }" alt="${movie.Title}">
      </a>
      <h2 class="movie-title">${movie.Title}</h2>
      <div class="post-info">
        <span class="movie-year">${movie.Year}</span> • 
        <span class="movie-runtime">${movie.Runtime}</span>
      </div>`,
    });
    resultCard.appendChild(movieCard);
    sessionStorage.removeItem("movie");
  }
}

function dataRender(data, container) {
  console.log("DataRender.......");
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

async function fetchData() {
  console.log("fetchData......");
  try {
    const response = await fetch("/src/data/movieData.json"); // 미리 저장한 json 파일 fetch
    const data = await response.json();

    dataRender(data, rcmdContent);
  } catch (err) {
    // 디펜시브 코딩 (실패 시 에러메세지 도출)
    console.error("Error!", err);
  }
}

//Result 페이지 서치바 버튼 영역
searchbarForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("here is submit......");
  let jsonObj = await getDataFromApi(resultInput.value);
  console.log("submit.. title ->", resultInput.value);
  saveStorage(jsonObj, resultInput.value);
  // sessionStorage.setItem("movie", JSON.stringify(temp));
  location.href = "http://localhost:5500/src/pages/result/result.html";
});

resultInput.addEventListener("focus", () => {
  resultInput.placeholder = "";
});
