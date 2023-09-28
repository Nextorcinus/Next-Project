console.clear();
gsap.registerPlugin(SplitText, ScrollTrigger);

let panels = gsap.utils.toArray(".container .panel");

let panelTween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: () => "+=" + (panels.length - 1) * window.innerWidth,
    markers: {
      startColor: "purple",
      endColor: "fuchsia",
      fontSize: "3rem",
    },
    pin: true,
    scrub: 2,
  },
});

const split = new SplitText(".wrapper span", {
  type: "chars",
  charsClass: "char",
});

const tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#textSection", // Ganti dengan ID yang sesuai
      start: "20% top",
      end: "bottom center",
      pin: true,
      scrub: 0.75,
      markers: true,
    },
  })
  .from(".char", {
    opacity: 0,
    y: 50,
    stagger: 0.1,
  });
