window.addEventListener("scroll", function () {
  const header = document.querySelector(".menuNav");
  const sections = document.querySelectorAll("section");

  sections.forEach(function (section) {
    const sectionRect = section.getBoundingClientRect();

    if (
      sectionRect.top < header.offsetHeight &&
      sectionRect.bottom > header.offsetHeight
    ) {
      const bgColor = section.getAttribute("data-bgcolor");
      header.style.backgroundColor = bgColor;
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
});

// Menu - button click to show menu side nav
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".menuNav");
  const searchBox = document.querySelector(".menuMain");
  const closeBtn = document.getElementById("close-btn");

  document.getElementById("search-btn").addEventListener("click", function () {
    searchBox.classList.toggle("open");
    searchBox.focus();
    closeBtn.classList.add("active");
  });
});

document.addEventListener("mousemove", function (event) {
  const posX = event.clientX;
  const posY = event.clientY;
  closeBtn.style.left = posX + "px";
  closeBtn.style.top = posY + "px";
});

// Menu - klik diluar elemen menu side nav akan ketutup
const searchBar = document.querySelector("#search-btn");
const searchForm = document.querySelector(".menuMain");
const closeBtn = document.getElementById("close-btn");

document.addEventListener("click", function (activate) {
  if (
    !searchBar.contains(activate.target) &&
    !searchForm.contains(activate.target)
  ) {
    searchForm.classList.remove("open");
    closeBtn.classList.remove("active");
  }
});
