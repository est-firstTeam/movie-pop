import { BookMark } from "./components/bookmark.js";
import { Detail } from "./components/detail.js";
import { headerScript } from "./components/header.js";
import { Main } from "./components/main.js";
import { SearchResult } from "./components/searchResult.js";
import { loadHtml } from "./util/loadHtml.js";
import { LightMode } from "./components/lightMode.js";
import { TopBtn } from "./components/topBtn.js";

const init = async () => {
  LightMode();
  TopBtn();

  BookMark();
  Detail();
  Main();
  SearchResult();
};

(async () => {
  await loadHtml(".header__wrapper", "/pages/header.html");
  await loadHtml(".footer__wrapper", "/pages/footer.html");
  headerScript();
  await init();
})();
