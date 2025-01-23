//아래부터 result 영역 코드
const searchBtn = document.querySelector(".search-bar__btn");
const resultInput = document.querySelector(".search-bar__input");
const resultCard = document.querySelector(".search-result__cards");

//Result 페이지 서치바 버튼 영역
searchBtn.addEventListener("click", () => {
  const temp = getStorage();
  console.log("temp ->", temp);
  resultInput.placeholder = `The result of a search for ${temp.Title}`;
  resultRender(temp);
});

resultInput.addEventListener("focus", () => {
  resultInput.placeholder = "";
});

function resultRender(movie) {
  console.log("movieTitle ->", movie.Title);
  const movieCard = Object.assign(document.createElement("div"), {
    className: "movie-card",
    innerHTML: `
    <div class="movie-cardimgcontainer">
      <img src="${movie.Poster === "N/A" ? NOIMG_URL : movie.Poster}" alt="${
      movie.Title
    }">
    </div>
    <h2 class="movie-title">${movie.Title}</h2>
    <div class="post-info">
      <span class="movie-year">${movie.Year}</span> • 
      <span class="movie-runtime">${movie.Runtime}</span>
    </div>`,
  });

  const noResultCard = Object.assign(document.createElement("div"), {
    className: "movie-card-noresult",
    innerHTML: `
    <h2 class="card-noresult__text">
      There's no "<span>${movie.Title}</span>" but how about these instead?
    </h2>`,
  });

  if (movie.Title === undefined) {
    // document.querySelector(".search-result__title").style.display = "none";
    resultCard.appendChild(noResultCard);
  } else {
    // document.querySelector(".movie-card-noresult").style.display = "none";
    resultCard.appendChild(movieCard);
  }
}
