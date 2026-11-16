(function () {
  "use strict";

  /* ---------- Settings you can edit ---------- */
  // 1. Create a free form at https://formspree.io, then paste its ID here (looks like "xyzabcde").
  var FORMSPREE_ID = "YOUR_FORM_ID";
  // 2. Used as a fallback if Formspree isn't set up yet.
  var FALLBACK_EMAIL = "you@example.com";

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("themeToggle");
  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#14121f" : "#fff7ec");
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menuToggle");
  var menu = document.getElementById("menu");
  menuBtn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Scroll reveal ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = "status " + (type || "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get("name") || "").toString().trim();
    var email = (data.get("email") || "").toString().trim();
    var message = (data.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setStatus("Please fill in all three fields.", "err");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("That email address doesn't look right.", "err");
      return;
    }

    // Fallback: open the visitor's email app until Formspree is configured
    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      var subject = encodeURIComponent("Portfolio message from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + subject + "&body=" + body;
      setStatus("Opening your email app…", "ok");
      return;
    }

    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    setStatus("Sending…");

    fetch("https://formspree.io/f/" + FORMSPREE_ID, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("Thanks! Your message is on its way. 🎉", "ok");
        } else {
          throw new Error("bad response");
        }
      })
      .catch(function () {
        setStatus("Something went wrong. Please email me directly instead.", "err");
      })
      .finally(function () { btn.disabled = false; });
  });
})();
