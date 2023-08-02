const reservasiBtn = document.querySelector("#reservasi");
const hideBtn = document.querySelector("#hidebtn");
const widgetEl = document.querySelector(".widget");

// Mengatur perilaku saat tombol reservasi di-klik
reservasiBtn.addEventListener("click", function () {
  // Hilangkan tombol reservasi dan munculkan tombol hidebtn
  reservasiBtn.classList.add("hidden");
  hideBtn.classList.remove("hidden");

  // Tambahkan kelas "nih" pada elemen widget
  widgetEl.classList.add("widgetactive");
});

// Mengatur perilaku saat tombol hidebtn di-klik
hideBtn.addEventListener("click", function () {
  // Hilangkan tombol hidebtn dan munculkan tombol reservasi
  hideBtn.classList.add("hidden");
  reservasiBtn.classList.remove("hidden");

  // Hapus kelas "nih" dari elemen widget
  widgetEl.classList.remove("widgetactive");
});

var okb_slideshow_preview = ".lay_598_47";
var okb_slideshow = ".lay_598_46";

function okb_slideshow_resize() {
  var target_slideshow = $(okb_slideshow);
  var target_slideshow_outerHeight = target_slideshow.outerHeight(true);
  console.log("Slideshow Outer Height:", target_slideshow_outerHeight);

  var target_slideshow_preview = $(okb_slideshow_preview);
  var target_slideshow_preview_height = target_slideshow_preview.height();

  if (target_slideshow_preview_height < 100) {
    setTimeout(okb_slideshow_resize, 250);
  } else {
    target_slideshow.height(target_slideshow_preview_height);
    target_slideshow
      .find("> div.no_global_anim")
      .height(target_slideshow_preview_height);
  }
}

$(document).ready(function () {
  okb_slideshow_resize();
});

$(window).on("load resize", function () {
  okb_slideshow_resize();
});
