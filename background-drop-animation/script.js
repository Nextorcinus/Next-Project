gsap.registerPlugin(ScrollTrigger);

gsap.from(".box-2", {
  y: 650,
  scrollTrigger: {
    trigger: document.querySelector(".section"),
    start: "top 50%",
    end: "right 70%",
    scrub: 1,
    toggleActions: "play none none none",
  },
});

gsap.to(".box-1", {
  y: 560,
  scrollTrigger: {
    trigger: document.querySelector(".section"),
    start: "top 50%",
    end: "center 90%",
    scrub: 1,
    toggleActions: "play none none none",
  },
});

console.clear();

const items = gsap.utils.toArray(".item");
let currentItem = null;

items.forEach((e, i) => {
  const content = e.querySelector(".content");
  const t = gsap.to(content, {
    height: "auto",
    paused: true,
  });

  e._accordionTween = t;

  e.addEventListener("click", () => {
    if (currentItem !== null) {
      items[currentItem].classList.toggle("active");
      if (currentItem === i) {
        currentItem = null;
        return t.reverse();
      }
      items[currentItem]._accordionTween.reverse();
    }
    e.classList.toggle("active");
    t.play();
    currentItem = i;
  });
});
