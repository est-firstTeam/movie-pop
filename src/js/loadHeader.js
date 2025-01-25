export const loadHeader = async () => {
  const $header = document.querySelector(".header__wrapper");
  try {
    const response = await fetch("/src/header.html");
    const textedHeader = await response.text();
    $header.innerHTML = textedHeader;
  } catch (e) {
    console.error("header load error:", e);
  }
};
