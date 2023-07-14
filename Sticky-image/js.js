window.addEventListener("DOMContentLoaded", function () {
  var bapaknyaList = document.querySelectorAll(".bapaknya");

  for (var i = 0; i < bapaknyaList.length; i++) {
    var bapaknya = bapaknyaList[i];
    var container = bapaknya.querySelector(".container");
    var image = bapaknya.querySelector(".image");
    var text = bapaknya.querySelector(".text");

    container.addEventListener("scroll", handleScroll(container, image, text));
  }
});

function handleScroll(container, image, text) {
  return function () {
    var containerTop = container.getBoundingClientRect().top;
    var imageTop = image.getBoundingClientRect().top;
    var textBottom = text.getBoundingClientRect().bottom;

    if (imageTop <= containerTop) {
      image.style.position = "fixed";
      image.style.top = "0";
      text.style.overflowY = "scroll";
    } else if (imageTop >= textBottom) {
      image.style.position = "static";
      text.style.overflowY = "auto";
    }
  };
}
