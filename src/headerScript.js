const btnX = document.querySelector(".header__cancel-icon");
const btnSearch = document.querySelector(".header__search-icon");
const headerInput = document.querySelector(".header__input");
const NOIMG_URL = "/src/images/img_noImg.png";

const getSearchValue = () => {
  return headerInput.value;
};

const getDataFromApi = async (title) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=524002e8&t=${title}`
  );
  const jsonData = await response.json();
  return jsonData;
};

const saveStorage = (param) => {
  sessionStorage.setItem("movie", JSON.stringify(param));
};

const getStorage = (key = "movie") => {
  const movieObj = JSON.parse(sessionStorage.getItem(key));
  return movieObj;
};

const searchByTitle = async (title) => {
  // 조건을 더 달아줄 수 없을까?
  if (title.length) {
    const temp = await getDataFromApi(title);
    saveStorage(temp);
  }
};

async function inputValChange(e) {
  const title = headerInput.value;
  //Enter Key Down코드
  if (e.keyCode === 13) {
    temp = await getDataFromApi(title);
    console.log("movieData ->", temp);
    sessionStorage.setItem("movie", JSON.stringify(temp));
  }
}

btnSearch.addEventListener("click", () => {
  headerInput.style.display = "block";

  //toggle
  if (btnX.style.display === "block") {
    btnX.style.display = "none";
    headerInput.value = "";
  } else {
    btnX.style.display = "block";
  }
});

headerInput.addEventListener("focus", () => {
  btnX.style.display = "block";
});

headerInput.addEventListener("focusout", async () => {
  console.log("focus out!!!");
  const movieTitle = headerInput.value;

  //FocusOut 될때마다 데이터 요청. (좋은 방법이 아닌데...)
  searchByTitle(movieTitle);

  headerInput.value = "";
  btnX.style.display = "none";
  headerInput.style.display = "none";
});

btnX.addEventListener("click", () => {
  headerInput.value = "";
  headerInput.blur();
  btnX.style.display = "none";
  headerInput.style.display = "none";
});

btnSearch.addEventListener("click", () => {
  headerInput.style.display = "block";
  headerInput.focus();
});
//여기까지 Header 영역 코드
