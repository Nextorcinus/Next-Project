<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://www.umkm1.v3.ptikt.com/~sjs/gsap3/ScrollTrigger.min.js"></script>
<script src="https://www.umkm1.v3.ptikt.com/~sjs/gsap3/ScrollSmoother.min.js"></script>
<script src="https://www.umkm1.v3.ptikt.com/~sjs/gsap3/SplitText.min.js"></script> 
<script src="https://unpkg.com/split-type"></script>


<script>
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const smoother = ScrollSmoother.create({
    wrapper: '#design',
    content: '#content',
    smooth: 2,
    speed: 0.5,
    smoothTouch: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: false,
    preventDefault: true,
  });



// ==================TEKS & TITLE
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });
  
// Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }
  
  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 } });
    createScrollTrigger($(this), tl);
  });

  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), { rotationX: -90, duration: 0.6, ease: "power2.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, x: "1em", duration: 0.6, ease: "power2.out", stagger: { amount: 0.2 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
    createScrollTrigger($(this), tl);
  });

  
  $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
    createScrollTrigger($(this), tl);
  });

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
  });


  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});



var tlSection1 = gsap.timeline({});
tlSection1.from(".titleH1", { scale:0, duration: 1,stagger: 0.4,})
.to(".titleH1", {opacity:1, duration: 0.7,stagger: 0.25,})
.addLabel("hold1")
.to(".titleH1", {opacity:0, duration: 0.25})
.to(".first, .second, .three", { height: 0, duration: 0.6, stagger: 0.2, ease: "power1.in" })
.addLabel("hold2")
.from(".vps1 .publicsans", {scale:0, opacity:0, duration: 0.5, stagger: 0.5, ease: "power1.in" })
.from(".vps1 .nunito", {y:100, opacity:0, duration: 0.5,  ease: "power4.in" })

const tlSection2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".vps2",
    start: "top 80%",
    end: "center center",
    scrub: true,
    markers:true    
  }
});


tlSection2.to(".imgVPS", {opacity:1, y:-250, duration:0.5})
.to(".textVPS", {y:-200, duration:0.5, stagger: 0.5,})
.to(".tagVPS", {scale:1, opacity:1, ease:"bounce", duration:1, stagger: 0.4,})


//========================== FITUR

    const title = document.querySelector(".lay_345d_102");
    const titleFitur = document.querySelector(".containerFitur");

    tlTitle = new TimelineMax({ 
          scrollTrigger: {
                trigger: titleFitur, 
                start: "top 70%", 
                end: "top 20%",          
                scrub: 1,                
              }
          });

    tlTitle.set(title, {opacity:0, y:100});
    tlTitle.to(title, {opacity:1, y:0, duration:1})



    const listWrapperEl = document.querySelector(".side-scroll-list-wrapper");
    const listEl = document.querySelector(".side-scroll-list");

    gsap.to(listEl, {
      x: () => -(listEl.clientWidth - listWrapperEl.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".side-scroll",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });  
</script>