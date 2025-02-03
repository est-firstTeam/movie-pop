const lightBtn = document.createElement("button");

lightBtn.className = "lightBtn";
document.body.appendChild(lightBtn);
lightBtn.style.width = "50px";
lightBtn.style.height = "50px";
lightBtn.style.backgroundImage = "url('/images/ico-darkmode.svg')";
lightBtn.style.backgroundPosition = "center";
lightBtn.style.backgroundRepeat = "no-repeat";
lightBtn.style.border = "1px solid #141414";
lightBtn.style.cursor = "pointer";

function applyTheme() {
  const body = document.querySelector("body");
  const isLightMode = localStorage.getItem("theme") === "light";

  if (isLightMode) {
    body.classList.add("light");
    lightBtn.style.backgroundImage = "url('/images/ico-darkmode.svg')";
  } else {
    body.classList.remove("light");
    lightBtn.style.backgroundImage = "url('/images/ico-lightmode.svg')";
  }
}

applyTheme();

lightBtn.addEventListener("click", () => {
  var body = document.querySelector("body");
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    lightBtn.style.backgroundImage = "url('/images/ico-lightmode.svg')";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light");
    lightBtn.style.backgroundImage = "url('/images/ico-darkmode.svg')";
    localStorage.setItem("theme", "light");
  }
});
