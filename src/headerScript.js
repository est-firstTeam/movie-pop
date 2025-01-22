const btnX = document.querySelector(".header__cancel-icon");
const btnSearch = document.querySelector(".header__search-icon");
const input = document.querySelector(".header__input");

input.addEventListener("focus", () => {
  btnX.style.display = "block";
  btnSearch.addEventListener("click", () => {
    console.log("clicked!!");
  });
});

input.addEventListener("blur", () => {
  btnX.style.display = "none";
});

btnSearch.addEventListener("click", () => {
  input.style.display = "block";
  input.focus();
});

function inputValChange(e) {
  const title = input.value;
  console.log("text ->", title);

  if (e.keyCode === 13) console.log("Enter!!!");
}
