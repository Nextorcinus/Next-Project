const jsBody = document.querySelector(".jsbody");
const jsScroll = document.querySelector(".js-scroll");
const height = jsScroll.getBoundingClientRect().height - 1;
const speed = 0.04;

var offset = 0;

jsBody.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speed;

  var scroll = "translateY(-" + offset + "px) translateZ(0)";
  jsScroll.style.transform = scroll;

  requestAnimationFrame(smoothScroll);
}

smoothScroll();
