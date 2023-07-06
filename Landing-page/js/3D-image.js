$(".js-tilt").tilt({
  glare: true,
  maxGlare: 0.75,
  scale: 0.9,
});

const tilt = $(".js-tilt").tilt();
tilt.on("change", function (e, transforms) {});
