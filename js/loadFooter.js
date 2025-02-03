export const loadFooter = async () => {
  const $footer = document.querySelector(".footer__wrapper");
  try {
    const response = await fetch("/pages/footer.html");
    const textedFooter = await response.text();
    $footer.innerHTML = textedFooter;
  } catch (e) {
    console.error("footer load error:", e);
  }
};
