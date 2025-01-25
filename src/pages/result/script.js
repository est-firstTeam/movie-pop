//아래부터 result 영역 코드
import { loadHeader } from "../../js/loadHeader.js";
import {
  headerScript,
  getStorage,
  getDataFromApi,
  saveStorage,
} from "../../headerScript.js";

const searchBtn = document.querySelector(".search-bar__btn");
const resultInput = document.querySelector(".search-bar__input");
const resultCard = document.querySelector(".search-result__cards");
const searchbarForm = document.querySelector(".search-bar-wrapper");

loadHeader().then(() => {
  headerScript();
  resultPageInit();
});

const resultPageInit = () => {
  const headerInputVal = getStorage("inputVal");
  const headerIcon = document.querySelector(".header__search-icon");
  headerIcon.style.visibility = "hidden";

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
      <div class="movie-cardimgcontainer">
        <img src="${
          movie.Poster === "N/A" ? window.NOIMG_URL : movie.Poster
        }" alt="${movie.Title}">
      </div>
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
