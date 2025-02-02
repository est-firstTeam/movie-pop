// const body = document.body;
const lightBtn = document.createElement("button");
const title = document.querySelector(".classic__title");

lightBtn.className = "lightBtn";
lightBtn.innerHTML = "light";
document.body.appendChild(lightBtn);

lightBtn.addEventListener("click", function (event) {
  var body = document.querySelector("body");
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    event.target.innerHTML = "Dark mode";
  } else {
    body.classList.add("light");
    event.target.innerHTML = "Light mode";
  }
});
