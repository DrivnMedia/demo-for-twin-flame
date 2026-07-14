/* Twin Flames Hot Pilates and Sculpt — shared behavior */
(function () {
  "use strict";

  // reveal styles only apply when JS runs (no-JS users see everything)
  document.documentElement.classList.add("js");

  // mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  // header border on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // scroll-in reveals (skipped for reduced motion)
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealed = document.querySelectorAll(".reveal");
  var revealAll = function () {
    revealed.forEach(function (el) { el.classList.add("is-visible"); });
  };
  if (revealed.length && "IntersectionObserver" in window && !reduced) {
    var ioFired = false;
    var io = new IntersectionObserver(
      function (entries) {
        ioFired = true;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealed.forEach(function (el) { io.observe(el); });
    // a working observer reports initial state immediately; if it never
    // does, the environment can't run it — show everything instead
    setTimeout(function () {
      if (!ioFired) {
        io.disconnect();
        revealAll();
      }
    }, 1200);
  } else {
    revealAll();
  }

  // hero embers: sparse glowing dots drifting up from the coal glow
  var hero = document.querySelector(".hero");
  if (hero && !reduced) {
    var layer = document.createElement("div");
    layer.className = "embers";
    layer.setAttribute("aria-hidden", "true");
    var COUNT = 18;
    for (var i = 0; i < COUNT; i++) {
      var e = document.createElement("span");
      e.className = "ember";
      e.style.setProperty("--x", (2 + Math.random() * 96).toFixed(1) + "%");
      e.style.setProperty("--s", (2 + Math.random() * 3).toFixed(1) + "px");
      var dur = 9 + Math.random() * 9;
      e.style.setProperty("--dur", dur.toFixed(1) + "s");
      // negative delay starts each ember mid-flight so the effect is live on load
      e.style.setProperty("--delay", "-" + (Math.random() * dur).toFixed(1) + "s");
      e.style.setProperty("--o", (0.25 + Math.random() * 0.45).toFixed(2));
      e.style.setProperty("--drift", ((Math.random() - 0.5) * 70).toFixed(0) + "px");
      e.style.setProperty("--rise", "-" + (260 + Math.random() * 320).toFixed(0) + "px");
      layer.appendChild(e);
    }
    hero.appendChild(layer);
  }

  // footer year
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
