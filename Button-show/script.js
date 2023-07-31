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
