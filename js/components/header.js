import { $ } from "../util/helper.js";

export const headerScript = async () => {
  const $searchWrapper = $(".header__search-wrapper");
  const $openSearchFormBtn = $(".header__open-search-form-btn");
  const $searchForm = $(".header__search-form");
  const $searchInput = $(".header__search-input");
  const $cancelBtn = $(".header__cancel-btn");

  // 검색 폼 오픈
  $openSearchFormBtn.addEventListener("click", () => {
    $searchForm.style.display = "flex";
    $openSearchFormBtn.style.display = "none";
    $searchInput.focus();
  });

  // 취소버튼
  $cancelBtn.addEventListener("click", () => {
    $searchForm.style.display = "none";
    $openSearchFormBtn.style.display = "flex";
  });

  // TODO debouncing 적용
  // 검색 submit
  $searchWrapper.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchValue = $searchInput.value;
    location.href = `/pages/searchResult.html?title=${searchValue}`;
  });
};
