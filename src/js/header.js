window.NOIMG_URL = "/src/images/img_noImg.png";
import { $ } from "./helper.js";

export const getStorage = (key = "movie") => {
  let movieObj;
  if (key === "movie") {
    movieObj = JSON.parse(sessionStorage.getItem(key));
  } else {
    movieObj = sessionStorage.getItem(key);
  }
  return movieObj;
};

export const saveStorage = (jsonObj, movieTitle) => {
  if (jsonObj.Response === "False") {
    sessionStorage.setItem("inputVal", movieTitle);
  } else {
    sessionStorage.setItem("movie", JSON.stringify(jsonObj));
  }
};

export const getDataFromApi = async (title) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=524002e8&t=${title}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export const headerScript = () => {
  const btnX = $(".header__cancel-icon");
  const searchIcon = $(".header__search-icon");
  const btnSearch = $(".header__search-btn");
  const headerInput = $(".header__input");
  const inputForm = $(".header__search");

  const showElements = () => {
    headerInput.style.display = "block";
    btnX.style.display = "block";
    btnSearch.style.visibility = "visible";
    searchIcon.style.display = "none";
  };
  const hideElements = () => {
    headerInput.value = "";
    headerInput.style.display = "none";
    btnX.style.display = "none";
    btnSearch.style.visibility = "hidden";
  };

  inputForm.addEventListener("submit", async (event) => {
    //실행순서 바꾸지 말기.
    event.preventDefault();
    let jsonObj = await getDataFromApi(headerInput.value);
    saveStorage(jsonObj, headerInput.value);
    setTimeout(() => {
      hideElements();
      searchIcon.style.display = "block";
    }, 10);
    location.href = "http://localhost:5500/src/pages/searchResult.html";
  });

  searchIcon.addEventListener("click", () => {
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
    showElements();
  });

  headerInput.addEventListener("focusout", () => {
    setTimeout(() => {
      hideElements();
    }, 100);
    setTimeout(() => {
      searchIcon.style.display = "block";
    }, 300);
  });

  btnSearch.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    console.log(e);
  });

  searchIcon.addEventListener("click", () => {
    headerInput.style.display = "block";
    headerInput.focus();
  });

  btnX.addEventListener("click", (e) => {
    console.log("btn X!!");
    e.stopImmediatePropagation();
  });
};
