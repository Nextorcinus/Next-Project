$(document).ready(function () {
  $(window)
    .scroll(function () {
      let o = $(window),
        i = $("body"),
        t = $(".section"),
        footer = $("footer"),
        footerTop = footer.position().top;
      let s = o.scrollTop() + o.height() / 3;
      let container = $(".lay_3843_400");
      let containerTop = container.offset().top;

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

          if (containerTop <= o.scrollTop()) {
            $(".section-img-inner").css({
              position: "fixed",
              width: "40%",
            });
          } else {
            $(".section-img-inner").css({
              position: "relative",
              width: "100%",
            });
          }
        }
      });

      if (o.scrollTop() + o.height() >= footerTop) {
        $(".section").removeClass("active");
      }
    })
    .scroll();
});
