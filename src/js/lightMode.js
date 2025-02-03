const lightBtn = document.createElement("button");

lightBtn.className = "lightBtn";
// lightBtn.innerHTML = "Light mode";
document.body.appendChild(lightBtn);
lightBtn.style.width = "50px";
lightBtn.style.height = "50px";
lightBtn.style.backgroundImage = "url('/src/images/ico-darkmode.svg')";
lightBtn.style.backgroundPosition = "center";
lightBtn.style.backgroundRepeat = "no-repeat";
lightBtn.style.border = "1px solid #141414";
lightBtn.style.cursor = "pointer";

lightBtn.addEventListener("click", function (event) {
  var body = document.querySelector("body");
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    lightBtn.style.backgroundImage = "url('/src/images/ico-lightmode.svg')";
  } else {
    body.classList.add("light");
    lightBtn.style.backgroundImage = "url('/src/images/ico-darkmode.svg')";
  }
});
