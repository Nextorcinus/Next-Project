class Cursor {
  constructor() {
    (this.el = document.querySelector("[data-cursor]")),
      (this.hovers = document.querySelectorAll("[data-hover]")),
      (this.drags = document.querySelectorAll("[data-drag]")),
      (this.data = {
        mouse: { x: -200, y: -200 },
        current: { x: -200, y: -200 },
        last: { x: -200, y: -200 },
        ease: 0.1,
        dist: 50,
        fx: { diff: 0, acc: 0, velo: 0, scale: 0 },
      }),
      (this.rAF = null),
      (this.targets = null),
      (this.run = this.run.bind(this)),
      (this.mousePos = this.mousePos.bind(this)),
      this.init();
  }
  mousePos(t) {
    (this.data.mouse.x = t.clientX),
      (this.data.mouse.y = t.clientY),
      (this.data.current.x = t.clientX),
      (this.data.current.y = t.clientY);
  }
  run() {
    (this.data.last.x = lerp(
      this.data.last.x,
      this.data.current.x,
      this.data.ease
    )),
      (this.data.last.y = lerp(
        this.data.last.y,
        this.data.current.y,
        this.data.ease
      )),
      (this.data.fx.diff = this.data.current.x - this.data.last.x),
      (this.data.fx.acc = this.data.fx.diff / window.innerWidth),
      (this.data.fx.velo = +this.data.fx.acc);
    let t = 1 - Math.abs(3 * this.data.fx.velo);
    (this.data.fx.scale = 0.7 < t ? t : 0.7),
      (this.el.style.transform = `translate3d(${this.data.last.x}px, ${this.data.last.y}px, 0) scale(${this.data.fx.scale})`),
      this.raf();
  }
  raf() {
    this.rAF = requestAnimationFrame(this.run);
  }
  addListeners() {
    const t = this,
      e = document.querySelector("[data-cursor]");
    this.hovers.forEach(function (n) {
      n.addEventListener("mousemove", t.mousePos, { passive: !0 }),
        n.addEventListener("mouseover", t.mousePos, { passive: !0 }),
        n.addEventListener("mouseover", function () {
          const t = n.getAttribute("data-hover"),
            i = n.getAttribute("data-style"),
            r = n.getAttribute("data-col");
          "None" == t
            ? ((e.querySelector(".cursor_text").innerHTML = " "),
              e.classList.remove("is-active"))
            : ((e.querySelector(".cursor_text").innerHTML = t),
              e.classList.add("is-active")),
            "fill" == i ? e.classList.add("fill") : e.classList.remove("fill"),
            r
              ? (e.querySelector(".circle").style.backgroundColor = r)
              : e.querySelector(".circle").style.removeProperty
              ? e
                  .querySelector(".circle")
                  .style.removeProperty("background-color")
              : e
                  .querySelector(".circle")
                  .style.removeAttribute("background-color");
        }),
        n.addEventListener("mouseout", function () {
          e.classList.remove("is-active"), e.classList.remove("fill");
        });
    }),
      this.drags.forEach(function (t) {
        t.addEventListener("mouseover", function () {
          e.classList.add("is-drag");
        }),
          t.addEventListener("mouseout", function () {
            e.classList.remove("is-drag");
          });
      });
  }
  init() {
    this.addListeners(), this.raf();
  }
  cancel() {
    window.cancelAnimationFrame(this.rAF);
  }
}
function magnet(t) {
  const e = t,
    n = function (t) {
      const e = this.querySelector(".magnet_circle"),
        n = this.querySelector(".magnet_circle_fast"),
        i = this.querySelector(".magnet_arrow"),
        { offsetX: r, offsetY: o } = t,
        { offsetWidth: a, offsetHeight: s } = this,
        l = (r / a) * 18 - 9,
        c = (o / s) * 9 - 3;
      e && (e.style.transform = `translate(${l}px, ${c}px) scale(1.5)`),
        i && (i.style.transform = `translate(${l}px, ${c}px)`),
        n &&
          (n.style.transform = `translate(${1.5 * l + 10}px, ${
            3 * c - 10
          }px) scale(1.5)`),
        "mouseleave" === t.type &&
          (e &&
            ((e.style.transform = ""), (e.style.borderColor = "rgba(#fff,0)")),
          i && (i.style.transform = ""),
          n &&
            ((n.style.transform = ""), (n.style.borderColor = "rgba(#fff,0)")));
    };
  e.forEach((t) => t.addEventListener("mousemove", n)),
    e.forEach((t) => t.addEventListener("mouseleave", n));
}
class MenuHover {
  constructor(t) {
    (this.DOM = { el: t }),
      (this.DOM.menuItems = this.DOM.el.querySelectorAll(".menu__item")),
      (this.animatableProperties = {
        tx: { previous: 0, current: 0, amt: 0.08 },
        ty: { previous: 0, current: 0, amt: 0.08 },
        rotation: { previous: 0, current: 0, amt: 0.08 },
        brightness: { previous: 1, current: 1, amt: 0.08 },
      }),
      (this.menuItems = []),
      [...this.DOM.menuItems].forEach((t, e) =>
        this.menuItems.push(new MenuItem(t, e, this.animatableProperties))
      );
  }
  destroy() {
    for (let t = 0; t < this.menuItems.length; t++) {
      let e = this.menuItems[t];
      e.destroy();
      let n = e.DOM.el.querySelector(".hover-reveal");
      n.parentElement.removeChild(n);
    }
    (this.DOM = { el: void 0 }),
      (this.DOM.menuItems = []),
      (this.menuItems = []);
  }
}
let mousepos = { x: 0, y: 0 },
  mousePosCache = mousepos,
  direction = {
    x: mousePosCache.x - mousepos.x,
    y: mousePosCache.y - mousepos.y,
  };
window.addEventListener("mousemove", (t) => (mousepos = getMousePos(t)));
class MenuItem {
  constructor(t, e, n) {
    (this.DOM = { el: t }),
      (this.inMenuPosition = e),
      (this.animatableProperties = n),
      (this.DOM.textInner = this.DOM.el.querySelector(".menu__item-textinner")),
      this.layout(),
      this.initEvents();
  }
  layout() {
    (this.DOM.reveal = document.createElement("div")),
      (this.DOM.reveal.className = "hover-reveal"),
      (this.DOM.reveal.style.transformOrigin = "0% 0%"),
      (this.DOM.revealInner = document.createElement("div")),
      (this.DOM.revealInner.className = "hover-reveal__inner"),
      (this.DOM.revealImage = document.createElement("div")),
      (this.DOM.revealImage.className = "hover-reveal__img"),
      (this.DOM.revealImage.style.backgroundImage = `url(${this.DOM.el.dataset.img})`),
      this.DOM.revealInner.appendChild(this.DOM.revealImage),
      this.DOM.reveal.appendChild(this.DOM.revealInner),
      this.DOM.el.appendChild(this.DOM.reveal);
  }
  getMouseArea() {
    return this.bounds.el.top + this.bounds.el.height / 2 <=
      window.innerHeight / 2
      ? "up"
      : "down";
  }
  calcBounds() {
    this.bounds = {
      el: this.DOM.el.getBoundingClientRect(),
      reveal: this.DOM.reveal.getBoundingClientRect(),
    };
  }
  initEvents() {
    (this.mouseenterFn = (t) => {
      this.showImage(),
        (this.firstRAFCycle = !0),
        (this.DOM.reveal.style.transformOrigin = "0% 50%"),
        this.loopRender();
    }),
      (this.mouseleaveFn = () => {
        this.stopRendering(), this.hideImage();
      }),
      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn),
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn),
      this.DOM.el.addEventListener("click", this.mouseleaveFn);
  }
  showImage() {
    gsap.killTweensOf(this.DOM.revealInner),
      gsap.killTweensOf(this.DOM.revealImage),
      (this.tl = gsap
        .timeline({
          onStart: () => {
            (this.DOM.reveal.style.opacity =
              this.DOM.revealInner.style.opacity =
                1),
              gsap.set(this.DOM.el, { zIndex: 120 });
          },
        })
        .to(this.DOM.revealInner, 0.6, {
          ease: "Expo.easeOut",
          startAt: { scale: 0.6 },
          scale: 1,
        })
        .to(
          this.DOM.revealImage,
          0.6,
          { ease: "Expo.easeOut", startAt: { scale: 1.4 }, scale: 1 },
          0
        ));
  }
  hideImage() {
    gsap.killTweensOf(this.DOM.revealInner),
      gsap.killTweensOf(this.DOM.revealImage),
      (this.tl = gsap
        .timeline({
          onStart: () => {
            gsap.set(this.DOM.el, { zIndex: 1 });
          },
          onComplete: () => {
            gsap.set(this.DOM.reveal, { opacity: 0 });
          },
        })
        .to(this.DOM.revealInner, 0.4, {
          ease: "Expo.easeOut",
          scale: 0.6,
          opacity: 0,
        })
        .to(
          this.DOM.revealImage,
          0.4,
          { ease: "Expo.easeOut", scale: 1.4 },
          0
        ));
  }
  loopRender() {
    this.requestId ||
      (this.requestId = requestAnimationFrame(() => this.render()));
  }
  stopRendering() {
    this.requestId &&
      (window.cancelAnimationFrame(this.requestId), (this.requestId = void 0));
  }
  render() {
    (this.requestId = void 0),
      this.firstRAFCycle &&
        (this.calcBounds(), (this.mouseArea = this.getMouseArea()));
    const t = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
    (direction = {
      x: mousePosCache.x - mousepos.x,
      y: mousePosCache.y - mousepos.y,
    }),
      (mousePosCache = { x: mousepos.x, y: mousepos.y }),
      (this.animatableProperties.tx.current =
        Math.abs(mousepos.x - this.bounds.el.left) -
        this.bounds.reveal.width / 2),
      (this.animatableProperties.ty.current =
        Math.abs(mousepos.y - this.bounds.el.top) -
        this.bounds.reveal.height / 2),
      (this.animatableProperties.rotation.current = this.firstRAFCycle
        ? 0
        : map(
            t,
            0,
            175,
            0,
            direction.x < 0
              ? "up" === this.mouseArea
                ? 60
                : -60
              : "up" === this.mouseArea
              ? -60
              : 60
          )),
      (this.animatableProperties.brightness.current = this.firstRAFCycle
        ? 1
        : map(t, 0, 100, 1, 8)),
      (this.animatableProperties.tx.previous = this.firstRAFCycle
        ? this.animatableProperties.tx.current
        : lerp(
            this.animatableProperties.tx.previous,
            this.animatableProperties.tx.current,
            this.animatableProperties.tx.amt
          )),
      (this.animatableProperties.ty.previous = this.firstRAFCycle
        ? this.animatableProperties.ty.current
        : lerp(
            this.animatableProperties.ty.previous,
            this.animatableProperties.ty.current,
            this.animatableProperties.ty.amt
          )),
      (this.animatableProperties.rotation.previous = this.firstRAFCycle
        ? this.animatableProperties.rotation.current
        : lerp(
            this.animatableProperties.rotation.previous,
            this.animatableProperties.rotation.current,
            this.animatableProperties.rotation.amt
          )),
      (this.animatableProperties.brightness.previous = this.firstRAFCycle
        ? this.animatableProperties.brightness.current
        : lerp(
            this.animatableProperties.brightness.previous,
            this.animatableProperties.brightness.current,
            this.animatableProperties.brightness.amt
          )),
      gsap.set(this.DOM.reveal, {
        x: this.animatableProperties.tx.previous,
        y: this.animatableProperties.ty.previous,
        rotation: this.animatableProperties.rotation.previous,
        filter: `brightness(${this.animatableProperties.brightness.previous})`,
      }),
      (this.firstRAFCycle = !1),
      this.loopRender();
  }
  destroy() {
    this.DOM.el.removeEventListener("mouseenter", this.mouseenterFn, {
      passive: !0,
    }),
      this.DOM.el.removeEventListener("mouseleave", this.mouseleaveFn, {
        passive: !0,
      }),
      this.DOM.el.removeEventListener("click", this.mouseleaveFn, {
        passive: !0,
      }),
      gsap.killTweensOf(this.DOM.revealInner),
      gsap.killTweensOf(this.DOM.revealImage),
      this.stopRendering(),
      this.hideImage();
  }
}
