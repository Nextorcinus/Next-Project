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

// Event Listener Ngambil URL Target
document.addEventListener("DOMContentLoaded", function () {
  const compartilheLinks = document.querySelectorAll(".compartilhe a");
  const clipboardButton = document.querySelector(".clipboard");
  const messageElement = document.querySelector("p");

  // Fungsi untuk menggantikan placeholder dalam atribut href
  function updateShareLinks() {
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);

    compartilheLinks.forEach((link) => {
      link.href = link.href
        .replace("{url}", currentUrl)
        .replace("{title}", currentTitle);
    });
  }

  // Event listener untuk tombol copy
  clipboardButton.addEventListener("click", function () {
    const tempInput = document.createElement("input");
    const currentUrl = window.location.href;

    document.body.appendChild(tempInput);
    tempInput.value = currentUrl;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Menampilkan pesan "URL copied" dengan opacity 1
    messageElement.textContent = "URL copied!";
    messageElement.style.opacity = 1;

    // Menghilangkan pesan setelah 3 detik (3000 milidetik)
    setTimeout(function () {
      messageElement.style.opacity = 0;
    }, 2000);
  });

  // Panggil fungsi untuk menggantikan placeholder saat halaman dimuat
  updateShareLinks();
});

links.forEach((link) => {
  const url = encodeURIComponent(
    window.location.origin + window.location.pathname
  );
  const title = encodeURIComponent(document.title);

  link.href = link.href.replace("{url}", url).replace("{title}", title);

  link.addEventListener("click", onClick);
});
