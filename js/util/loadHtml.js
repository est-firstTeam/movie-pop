export const loadHtml = async (wrapperClass, htmlPath) => {
  const $wrapperEl = document.querySelector(wrapperClass);
  try {
    const response = await fetch(htmlPath);
    const textedHTML = await response.text();
    $wrapperEl.innerHTML = textedHTML;
  } catch (e) {
    console.error("html load error:", e);
  }
};
