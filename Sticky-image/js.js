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
