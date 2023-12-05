console.clear();
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#design",
  content: "#content",
  smooth: true,
  speed: 0,
  smoothTouch: true,
  normalizeScroll: true,
  ignoreMobileResize: true,
  effects: true,
  preventDefault: true,
});

const section1 = document.querySelector(".section1");
const section3 = document.querySelector(".section3");

// Animasi "section1" berubah warna ketika mencapai "section2"
gsap.to(".section1, .text", {
  scrollTrigger: {
    trigger: ".section2",
    start: "center 90%",
    end: "bottom -=200",
    toggleActions: "play reverse play reverse",
  },
  backgroundColor: "#F0FF3D",
  color: "#000",
});

// Pin "section1" sampai mencapai "section3"
ScrollTrigger.create({
  trigger: ".section1",
  start: "top top",
  endTrigger: ".section3",
  end: "bottom top",
  pin: true,
  pinSpacing: false,
});

let paraTexts = new SplitText(".text2", {
  type: "words",
  wordsClass: "para-word",
});

let pl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section3",
    pin: ".section3",
    scrub: true,
    ease: "power2.inOut",
    start: "top top",
    end: "+=" + window.innerWidth,
    markers: {
      startColor: "pink",
      endColor: "red",
      indent: 200,
    },
  },
});

pl.to(".section3", {
  duration: 100,
  x: "0%",
  ease: "sine",
});

pl.from(paraTexts.words, { opacity: 0.05, stagger: 1 });
