$(window)
  .scroll(function () {
    let o = $(window),
      i = $("body"),
      t = $(".section"),
      s = o.scrollTop() + o.height() / 3;
    t.each(function () {
      if (
        $(this).position().top <= s &&
        $(this).position().top + $(this).height() > s
      ) {
        i.removeClass(function (o, i) {
          return i.replace(/(^|\s)color-\s+/g, "").trim();
        });
        $(".section").removeClass("active");
        $(this).addClass("active");
      }
    });
  })
  .scroll();

// Mendapatkan elemen .section-img-inner dan footer
const sectionImgInner = document.querySelector(".section-img-inner");
const footer = document.querySelector("footer");

// Menghitung jarak antara elemen .section-img-inner dan footer
const distance =
  footer.offsetTop - sectionImgInner.offsetTop - sectionImgInner.offsetHeight;

// Memantau perubahan posisi scroll
window.addEventListener("scroll", function () {
  // Mendapatkan posisi scroll vertikal
  const scrollPosition = window.pageYOffset;

  // Memeriksa apakah bagian bottom .section-img-inner bertemu dengan footer
  if (scrollPosition > distance) {
    // Mengubah posisi elemen .section-img-inner menjadi relative
    sectionImgInner.style.position = "relative";
  } else {
    // Mengubah posisi elemen .section-img-inner menjadi fixed
    sectionImgInner.style.position = "fixed";
  }
});
