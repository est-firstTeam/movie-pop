export const TopBtn = () => {
  const topBtn = document.createElement("button");
  topBtn.className = "common__top-btn";
  topBtn.innerHTML = "▲ <br /> TOP";
  document.body.appendChild(topBtn);

  topBtn.addEventListener("click", () => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });
};
