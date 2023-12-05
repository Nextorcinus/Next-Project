<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://www.umkm1.v3.ptikt.com/~sjs/gsap3/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/CSSRulePlugin.min.js"></script>
<script src="https://www.umkm1.v3.ptikt.com/~sjs/gsap3/ScrollSmoother.min.js"></script>
<script src="https://www.umkm1.v3.ptikt.com/~sjs/gsap3/SplitText.min.js"></script> 
<script src="https://unpkg.com/split-type"></script>


<script>
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CSSRulePlugin);


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

// ==================Section Menu

$(document).ready(function(){
    var menuOpen = false; 

    
    $(document).on('click', '.menuNav', function(){
        $('.menuNav').toggleClass('active');
        menuOpen = !menuOpen; 
        if (menuOpen) {
            tlMenu.play();
        } else {
            tlMenu.reverse();
        }
    });

 
    $(document).on('click', '.linkMenu', function(){
        tlMenu.reverse();
        $('.menuNav').toggleClass('active');
        menuOpen = false;
    });

   
    $(document).on('click', '.close-menu', function(){
        tlMenu.reverse();
        $('.menuNav').removeClass('active');
        menuOpen = false; 
    });


    var tlMenu = new TimelineMax();

    tlMenu.to(".main-nav", 0.5, {left: '66px', ease: Expo.easeInOut});   
    tlMenu.staggerFrom(".logo", 0.2, {x: -100, opacity: 0, ease:"elastic.out"});
    tlMenu.staggerFrom(".main-nav .lay_345d_80  .linkMenu", 0.2, {x: -100, opacity: 0, duration:5}, 0.2);
     tlMenu.staggerFrom(".alamat", 0.4, {scale: 0.5, opacity: 0}, 0.1);
    tlMenu.reverse();
});




document.addEventListener("DOMContentLoaded", function() {
  
  var openingBefore = CSSRulePlugin.getRule(".opening::before");
  var openingAfter = CSSRulePlugin.getRule(".opening::after");


  var gateAnimation = gsap.timeline({ defaults: { duration: 1.3 } });

  gateAnimation.to(".textOpening", { opacity: 1 });
  gateAnimation.to(".textOpening", { delay: 0.5, opacity: 0 });


  gateAnimation.to(
    openingBefore,
    { cssRule: { scaleY: 0 }, transformOrigin: "top" },
    ">-.5" 
  );


  gateAnimation.to(
    openingAfter,
    { cssRule: { scaleY: 0 }, transformOrigin: "bottom" },
    "<"
  );

}); 


    // Animasi ScrollTrigger untuk elemen textVPS (pin elemen)
    ScrollTrigger.create({
      trigger: ".vps2",
      start: "top center",
      end: "center center",
      scrub: true,
    });


function createVPSAnimation() {
    const imgVPS = document.querySelector(".imgVPS");
    const textVPS = document.querySelector(".textVPS");
    const titleVPS = document.querySelector(".titleVPS");
    const tagVPS = document.querySelector(".tagVPS");

    const displayVPS2 = document.querySelectorAll(".vps2");
    displayVPS2.forEach( (element) => {
    tlMain = new TimelineMax({ 
      scrollTrigger: {
            trigger: '.vps2', 
            start: "top 70%", 
            end: "bottom bottom", 
            scrub: 1,
            // markers:true,
          }
      });

  tlMain.set(tagVPS, {opacity:0, scale:0.3})
  tlMain.set(tagVPS, {opacity:0, scale:0.3,})
  tlMain.set(textVPS, {y:150, opacity:0})       

  tlMain
    .to(imgVPS, {
      y: -100,
      scale:1,
      opacity:1,
      ease:"ease",
      duration: 2,
    }, '0.5')
    .to(textVPS, {
      y:"-50",
      opacity:1,
      duration:5,
     })
    .to(tagVPS, {
      scale:1,
      opacity:1,
      ease:"bounce",
      duration:3,
     })

  }); 
}

   function createScrollTrigger() {
            ScrollTrigger.create({
                trigger: ".alasan",
                start: "top center",
                end: "80% 80%",
                pin: ".alasanVPS",
                scrub: true,
            });
        }

        // Cek lebar tampilan saat halaman dimuat dan setel ScrollTrigger sesuai kebutuhan
        if (window.innerWidth >= 768) {
            createScrollTrigger();
            createVPSAnimation();
        }

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
        end: () => `+=${listEl.clientWidth - listWrapperEl.clientWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });  

//========================== PILIHAN VPS

  const titleR = document.querySelector(".lay_345d_105");
  const pilihan = document.querySelector(".lay_345d_104");

        pilihanVPS = new TimelineMax({ 
          scrollTrigger: {
                trigger:pilihan, 
                start: "top 70%", 
                end: "top 20%",          
                scrub: 1,                
              }
          });

    pilihanVPS.set(titleR, {opacity:0, y:100});
    pilihanVPS.to(titleR, {opacity:1, y:0, duration:1})





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












//========================== TENTANG KAMI    
    const textAbout = document.querySelector(".lay_345d_113");
    const imgAbout = document.querySelector(".imgAbout");

    tkMain = new TimelineMax({ 
          scrollTrigger: {
                trigger: '.tentangKami', 
                start: "top 70%", 
                end: "top 20%", 
          
                scrub: 1,
                
              }
          });


      tkMain.set(textAbout, { x: -200, opacity: 0 });
      tkMain.set(imgAbout, { x: 200, opacity: 0 });

      tkMain.to(textAbout, {
        x: 0,
            opacity:1,
            duration: 2,
          }, '0.5')
        tkMain.to(imgAbout, {
        x: 0,
            opacity:1,
            duration: 2,
          }, '0.5'); 
        

  

</script>
