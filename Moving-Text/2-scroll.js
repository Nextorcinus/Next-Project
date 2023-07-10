

<script>
// animasi line double text
function handleMarquee() {
  const marquee1 = document.querySelector(".marquee1");
  const marquee2 = document.querySelector(".marquee2");
  let speed = 4;
  let lastScrollPos = 0;
  let timer;
  let isPaused = false;
  let isVisible = false;

  const container1 = marquee1.querySelector(".inner1");
  const content1 = marquee1.querySelector(".inner1 > *");
  const elWidth1 = content1.offsetWidth;
  let clone1 = content1.cloneNode(true);
  container1.appendChild(clone1);
  let progress1 = 1;

  function loop1() {
    progress1 = progress1 - speed;
    if (progress1 <= elWidth1 * -1) {
      progress1 = 0;
    }
    container1.style.transform = "translateX(" + progress1 + "px)";
    container1.style.transform += "skewX(" + speed * 0.9 + "deg)";
    if (!isPaused) {
      window.requestAnimationFrame(loop1);
    }
  }

  const container2 = marquee2.querySelector(".inner2");
  const content2 = marquee2.querySelector(".inner2 > *");
  const elWidth2 = content2.offsetWidth;
  let clone2 = content2.cloneNode(true);
  container2.appendChild(clone2);
  let progress2 = elWidth2 * -1;

  function loop2() {
    progress2 = progress2 + speed;
    if (progress2 >= 1) {
      progress2 = elWidth2 * -1;
    }
    container2.style.transform = "translateX(" + progress2 + "px)";
    container2.style.transform += "skewX(" + speed * 0.9 + "deg)";
    if (!isPaused) {
      window.requestAnimationFrame(loop2);
    }
  }

  function pauseAnimation() {
    isPaused = true;
  }

  function resumeAnimation() {
    isPaused = false;
    if (isVisible) {
      window.requestAnimationFrame(loop1);
      window.requestAnimationFrame(loop2);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          resumeAnimation();
        } else {
          isVisible = false;
          pauseAnimation();
        }
      });
    },
    { threshold: 0.1 } // Ubah threshold sesuai kebutuhan Anda
  );

  observer.observe(marquee1);
  observer.observe(marquee2);

  window.addEventListener("scroll", function () {
    const maxScrollValue = 30;
    const newScrollPos = window.scrollY;
    let scrollValue = newScrollPos - lastScrollPos;
    if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
    else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;
    speed = scrollValue;
    clearTimeout(timer);
    timer = setTimeout(handleSpeedClear, 10);

    const scrollDirection = newScrollPos > lastScrollPos ? "down" : "up";
    if (scrollDirection === "up") {
      container1.style.transform = "translateX(0)";
      container1.style.transform += "skewX(0)";

      container2.style.transform = "translateX(" + progress2 + "px)";
      container2.style.transform += "skewX(" + speed * 0.9 + "deg)";
    }

    lastScrollPos = newScrollPos;
  });

  function handleSpeedClear() {
    speed = 1;
  }

  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(handleSpeedClear, 10);
  });
}

handleMarquee();


</script>