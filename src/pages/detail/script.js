const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const $container = document.querySelector('.container');
document.addEventListener('DOMContentLoaded', () => {
  console.log(id);
});