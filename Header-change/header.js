// change side nav color each section scroll
//
// window.addEventListener("scroll", function () {
//   const header = document.querySelector(".menuNav");
//   const sections = document.querySelectorAll("section");

//   sections.forEach(function (section) {
//     const sectionRect = section.getBoundingClientRect();

//     if (
//       sectionRect.top < header.offsetHeight &&
//       sectionRect.bottom > header.offsetHeight
//     ) {
//       const bgColor = section.getAttribute("data-bgcolor");
//       header.style.backgroundColor = bgColor;
//       section.classList.add("active");
//     } else {
//       section.classList.remove("active");
//     }
//   });
// });

// Menu - button click to show menu side nav
document.addEventListener("DOMContentLoaded", function () {
  const menuBar = document.querySelector(".menuMain");
  const closeBtn = document.getElementById("close-btn");
  const toggleMenu = document.querySelector(".toggle-menu");

  document.getElementById("menu-btn").addEventListener("click", function () {
    menuBar.classList.toggle("open");
    menuBar.focus();
    closeBtn.classList.add("active");
    toggleMenu.classList.toggle("active");
  });
});

document.addEventListener("mousemove", function (event) {
  const posX = event.clientX;
  const posY = event.clientY;
  closeBtn.style.left = posX + "px";
  closeBtn.style.top = posY + "px";
});

// Menu - klik diluar elemen menu side nav akan ketutup
const menuBtn = document.querySelector("#menu-btn");
const menuBar = document.querySelector(".menuMain");
const closeBtn = document.getElementById("close-btn");
const toggleMenu = document.querySelector(".toggle-menu");

document.addEventListener("click", function (activate) {
  if (
    !menuBtn.contains(activate.target) &&
    !menuBar.contains(activate.target)
  ) {
    menuBar.classList.remove("open");
    closeBtn.classList.remove("active");
    toggleMenu.classList.remove("active");
  }

  // Remove "active" class from closeBtn
  if (!toggleMenu.classList.contains("active")) {
    closeBtn.classList.remove("active");
  }
});
