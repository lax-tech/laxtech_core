(function () {
  var root = document.documentElement;
  var themeBtns = document.querySelectorAll("[data-lt-theme]");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setTheme(next, persist) {
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    if (next === "dark") {
      root.style.backgroundColor = "#08080a";
      root.style.color = "#f2f2f4";
    } else {
      root.style.backgroundColor = "";
      root.style.color = "";
    }
    if (persist !== false) {
      try { localStorage.setItem("lt-theme", next); } catch (err) {}
    }
    themeBtns.forEach(function (btn) {
      var dark = next === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Activer le mode clair" : "Activer le mode sombre");
    });
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", next === "dark" ? "#08080a" : "#ffffff");
  }

  setTheme(currentTheme(), false);

  themeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  });

  try {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (localStorage.getItem("lt-theme")) return;
      setTheme(e.matches ? "dark" : "light", false);
    });
  } catch (err) {}

  var preloader = document.getElementById("preloader");
  var header = document.getElementById("header-sticky");
  var drawer = document.getElementById("lt-drawer");
  var overlay = document.getElementById("lt-overlay");
  var openBtns = document.querySelectorAll(".tp-menu-bar");
  var closeBtns = document.querySelectorAll(".close-btn");
  var scrollBtn = document.querySelector(".scroll-top");
  var track = document.getElementById("cases-track");
  var heroImg = document.querySelector(".tp-hero__thumb3 > img");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready() {
    document.body.classList.add("is-ready");
    if (!preloader) return;
    preloader.classList.add("is-done");
    preloader.setAttribute("aria-hidden", "true");
    window.setTimeout(function () {
      preloader.style.display = "none";
    }, 750);
  }

  if (document.readyState === "complete") {
    setTimeout(ready, reduce ? 0 : 420);
  } else {
    window.addEventListener("load", function () {
      setTimeout(ready, reduce ? 0 : 420);
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || 0;
      if (header) header.classList.toggle("lt-scrolled", y > 12);
      if (scrollBtn) {
        var show = y > 420;
        scrollBtn.classList.toggle("opacity-100", show);
        scrollBtn.classList.toggle("pointer-events-auto", show);
      }
      ticking = false;
    });
  }, { passive: true });

  function setDrawer(open) {
    if (drawer) drawer.classList.toggle("is-open", open);
    if (overlay) overlay.classList.toggle("is-open", open);
    document.body.classList.toggle("overflow-hidden", open);
    openBtns.forEach(function (btn) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (open && closeBtns[0]) closeBtns[0].focus();
  }

  if (drawer) {
    var page = (window.location.pathname.split("/").pop() || "index.html");
    drawer.querySelectorAll(".mobile-menu a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href === page || ((page === "" || page === "/") && href === "index.html")) {
        a.setAttribute("aria-current", "page");
        a.classList.add("bg-white/10");
      }
    });
  }

  openBtns.forEach(function (btn) {
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "lt-drawer");
    btn.addEventListener("click", function () { setDrawer(true); });
  });
  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () { setDrawer(false); });
  });
  if (overlay) overlay.addEventListener("click", function () { setDrawer(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setDrawer(false);
  });

  document.querySelectorAll(".scroll-to-target, .scroll-to-target-2").forEach(function (btn) {
    if (btn.matches("button") && !btn.getAttribute("aria-label")) {
      btn.setAttribute("aria-label", "Retour en haut");
    }
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-target") || "html");
      if (target) target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  function scrollCases(dir) {
    if (!track) return;
    track.scrollBy({
      left: dir * Math.min(300, track.clientWidth * 0.72),
      behavior: reduce ? "auto" : "smooth"
    });
  }

  document.querySelectorAll(".tp-case-nav-prev").forEach(function (btn) {
    btn.addEventListener("click", function () { scrollCases(-1); });
  });
  document.querySelectorAll(".tp-case-nav-next").forEach(function (btn) {
    btn.addEventListener("click", function () { scrollCases(1); });
  });

  var revealGroups = [
    ".cta-item",
    ".service-item-three",
    ".tp-service-item",
    ".tp-testimonial-item",
    ".partner-logo-item",
    ".tp-slider-exp-item",
    ".tp-case-item.group",
    ".counter-item",
    ".lt-price-row",
    ".lt-contact-form"
  ];

  revealGroups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add("lt-reveal");
      el.style.setProperty("--d", (i % 8) * 55 + "ms");
    });
  });

  var ai = document.getElementById("lax-ai");
  if (ai) {
    if (!reduce) {
      ai.addEventListener("pointermove", function (e) {
        var r = ai.getBoundingClientRect();
        ai.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        ai.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      }, { passive: true });
    }

    var swap = ai.querySelector(".lt-ai-swap");
    if (swap && !reduce) {
      var words = (swap.getAttribute("data-words") || "").split(",").filter(Boolean);
      var wi = 0;
      window.setInterval(function () {
        swap.classList.add("is-out");
        window.setTimeout(function () {
          wi = (wi + 1) % words.length;
          swap.textContent = words[wi];
          swap.classList.remove("is-out");
        }, 280);
      }, 2200);
    }
  }

  [".ab-inner-content", ".tp-case-title-box", ".section-header", ".cta-section-box", ".tp-slider-exprience", "#lax-ai"].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("lt-reveal");
    });
  });

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll(".lt-reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".lt-reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  if (!reduce && heroImg) {
    var heroArea = document.querySelector(".tp-hero-area");
    window.addEventListener("mousemove", function (e) {
      if (!heroArea) return;
      var rect = heroArea.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      var x = (e.clientX / window.innerWidth - 0.5) * 8;
      var y = (e.clientY / window.innerHeight - 0.5) * 6;
      heroImg.style.transform = "translate(" + x + "px, " + y + "px) scale(1.02)";
      heroImg.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
    }, { passive: true });
  }

  document.querySelectorAll("[data-lt-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = form.querySelector('[name="name"], [name="last_name"]');
      var emailEl = form.querySelector('[name="email"]');
      var msgEl = form.querySelector('[name="message"]');
      var name = nameEl ? nameEl.value.trim() : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var message = msgEl ? msgEl.value.trim() : "";
      var status = form.querySelector(".lt-form-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "lt-form-status mt-3 text-sm";
        status.setAttribute("role", "status");
        form.appendChild(status);
      }
      if (!name || !email || !message) {
        status.textContent = "Merci de renseigner votre nom, votre e-mail et un message.";
        status.classList.add("text-brand");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Merci d’indiquer une adresse e-mail valide.";
        status.classList.add("text-brand");
        return;
      }
      var body = "Nom : " + name + "\nE-mail : " + email + "\n\n" + message;
      var mailto = "mailto:contact@laxtech.pro?subject=" + encodeURIComponent("Message depuis laxtech.pro — " + name) + "&body=" + encodeURIComponent(body);
      var wa = "https://wa.me/243810843164?text=" + encodeURIComponent("Bonjour Lax Technologies,\n\nJe suis " + name + " (" + email + ").\n\n" + message);
      status.classList.remove("text-brand");
      status.innerHTML = 'Votre messagerie va s’ouvrir. Si ce n’est pas le cas, <a class="font-semibold text-ink underline underline-offset-2 hover:text-brand" href="' + wa + '" target="_blank" rel="noopener">envoyez le même message sur WhatsApp</a>.';
      window.location.href = mailto;
    });
  });

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (!target) return;
    if (reduce) {
      el.textContent = target;
      return;
    }
    var started = false;
    function run() {
      if (started) return;
      started = true;
      var start = performance.now();
      function tick(now) {
        var t = Math.min(1, (now - start) / 1200);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run();
          cio.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      cio.observe(el);
    } else {
      run();
    }
  });
})();
