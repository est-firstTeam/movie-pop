export const TopBtn = () => {
  const topBtn = document.createElement("button");
  topBtn.className = "topBtn";
  topBtn.innerHTML = "▲ <br /> TOP";
  document.body.appendChild(topBtn);

  topBtn.addEventListener("click", () => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("click");
  });

  document.body.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

}

