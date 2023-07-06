(function ($) {
  "use strict";

  // PRE LOADER
  $(window).load(function () {
    $(".preloader").fadeOut(1000); // set duration in brackets
  });

  // MENU
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  // PARALLAX EFFECT
  $.stellar({
    horizontalScrolling: false,
  });

  // ABOUT SLIDER
  $(".owl-carousel").owlCarousel({
    animateOut: "fadeOut",
    items: 1,
    loop: true,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
  });

  // SMOOTHSCROLL
  $(function () {
    $(".custom-navbar a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });
})(jQuery);

// SCROLLING MOVING TEXT
function handleMarquee() {
  const marquee = document.querySelectorAll(".marquee");
  let speed = 4;
  let lastScrollPos = 0;
  let timer;
  marquee.forEach(function (el) {
    const container = el.querySelector(".inner");
    const content = el.querySelector(".inner > *");
    //Get total width
    const elWidth = content.offsetWidth;
    //Duplicate content
    let clone = content.cloneNode(true);
    container.appendChild(clone);
    let progress = 1;
    function loop() {
      progress = progress - speed;
      if (progress <= elWidth * -1) {
        progress = 0;
      }
      container.style.transform = "translateX(" + progress + "px)";
      container.style.transform += "skewX(" + speed * 0.9 + "deg)";
      window.requestAnimationFrame(loop);
    }
    loop();
  });
  window.addEventListener("scroll", function () {
    const maxScrollValue = 30;
    const newScrollPos = window.scrollY;
    let scrollValue = newScrollPos - lastScrollPos;
    if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
    else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;
    speed = scrollValue;
    clearTimeout(timer);
    timer = setTimeout(handleSpeedClear, 10);

    const marquee = document.querySelector(".marquee");
    const container = marquee.querySelector(".inner");
    const scrollDirection = newScrollPos > lastScrollPos ? "down" : "up";
    if (scrollDirection === "up") {
      container.style.transform = "translateX(0)";
      container.style.transform += "skewX(0)";
    }

    lastScrollPos = newScrollPos;
  });
  function handleSpeedClear() {
    speed = 1;
  }
}
handleMarquee();
