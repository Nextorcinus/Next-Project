document.addEventListener("DOMContentLoaded", function () {
  var cursors = document.querySelectorAll(".follow-img");

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;

    cursors.forEach(function (cursor) {
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    });
  });
});
