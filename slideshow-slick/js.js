$(document).ready(function () {
  const carousel = $(".carousel");
  const prevBtn = $(".carousel-prev");
  const nextBtn = $(".carousel-next");
  const carouselItems = $(".carousel-item");
  let itemWidth = carouselItems.eq(0).width();
  let currentIndex = 0;
  let isAnimating = false;
  let intervalId = null;

  function setCarouselWidth() {
    itemWidth = carouselItems.eq(0).width();
    const offset = -currentIndex * itemWidth;
    carousel.css("transition", "none");
    carousel.css("transform", `translateX(${offset}px)`);
  }

  $(window).on("load resize", setCarouselWidth);

  function updateCarousel() {
    isAnimating = true;
    const offset = -currentIndex * itemWidth;
    carousel.css("transition", "transform 0.3s ease");
    carousel.css("transform", `translateX(${offset}px)`);
    setTimeout(function () {
      isAnimating = false;
    }, 300);
  }

  function autoSlide() {
    if (!isAnimating) {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarousel();
    }
  }

  // Fungsi untuk memulai interval otomatis saat halaman dimuat
  function startAutoSlide() {
    intervalId = setInterval(autoSlide, 3000);
  }

  // Fungsi untuk menghentikan interval otomatis saat digunakan fitur touch
  function pauseAutoSlide() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null; // Menetapkan intervalId menjadi null untuk menunjukkan bahwa interval telah dihentikan
    }
  }

  carousel.on("touchstart mousedown", function () {
    pauseAutoSlide();
  });

  carousel.on("touchend mouseup", function () {
    if (!intervalId) {
      startAutoSlide();
    }
  });

  nextBtn.on("click", function (event) {
    event.preventDefault();
    if (!isAnimating) {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarousel();
      pauseAutoSlide(); // Menghentikan interval saat tombol next diklik
      startAutoSlide(); // Memulai interval kembali setelah tombol next diklik
    }
  });

  prevBtn.on("click", function (event) {
    event.preventDefault();
    if (!isAnimating) {
      currentIndex =
        (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      updateCarousel();
      pauseAutoSlide(); // Menghentikan interval saat tombol prev diklik
      startAutoSlide(); // Memulai interval kembali setelah tombol prev diklik
    }
  });

  // Memulai interval otomatis saat halaman dimuat
  startAutoSlide();
});
