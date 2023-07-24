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

function copyToClipboard() {
  // Mengambil teks URL yang ingin disalin
  var textToCopy = document.getElementById("urlToCopy").innerText;

  // Membuat elemen sementara untuk menyalin teks ke clipboard
  var tempInput = document.createElement("input");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Memilih teks di dalam elemen input sementara
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Untuk perangkat seluler

  // Menyalin teks ke clipboard
  document.execCommand("copy");

  // Menghapus elemen input sementara
  document.body.removeChild(tempInput);

  alert("URL berhasil disalin ke clipboard: " + textToCopy);
}

const links = document.querySelectorAll(".share a");

function onClick(event) {
  event.preventDefault();

  window.open(
    event.currentTarget.href,
    "Поделиться",
    "width=600,height=500,location=no,menubar=no,toolbar=no"
  );
}

links.forEach((link) => {
  const url = encodeURIComponent(
    window.location.origin + window.location.pathname
  );
  const title = encodeURIComponent(document.title);

  link.href = link.href.replace("{url}", url).replace("{title}", title);

  link.addEventListener("click", onClick);
});

var $temp = $("<input>");
var $url = $(location).attr("href");

$(".clipboard").on("click", function () {
  $("body").append($temp);
  $temp.val($url).select();
  document.execCommand("copy");
  $temp.remove();

  // Menampilkan teks "URL copied" dengan opacity 1
  $("p").text("URL copied!").css("opacity", 1);

  // Menghilangkan teks setelah 3 detik (3000 milidetik)
  setTimeout(function () {
    $("p").css("opacity", 0);
  }, 2000);
});
