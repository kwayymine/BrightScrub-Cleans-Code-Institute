(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  /* ---- Mobile navigation ---- */
  function setNav(open) {
    if (!navToggle || !mainNav) return;
    mainNav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mainNav && mainNav.classList.contains("open")) {
      setNav(false);
      if (navToggle) navToggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!mainNav || !mainNav.classList.contains("open")) return;
    if (!mainNav.contains(event.target) && !(navToggle && navToggle.contains(event.target))) {
      setNav(false);
    }
  });

  if (mainNav) {
    mainNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });
  }

  /* ---- Header shadow + back to top ---- */
  var backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 10);
      if (backToTop) backToTop.classList.toggle("show", y > 600);
    },
    { passive: true }
  );

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      var open = item.getAttribute("data-open") === "true";
      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.setAttribute("data-open", "false");
        var otherBtn = other.querySelector(".faq-q");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      item.setAttribute("data-open", open ? "false" : "true");
      button.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  /* ---- Prefill service from ?service= query param (contact page) ---- */
  var serviceSelect = document.getElementById("service");
  if (serviceSelect) {
    var params = new URLSearchParams(window.location.search);
    var wantedService = params.get("service");
    if (wantedService) {
      var option = Array.prototype.find.call(serviceSelect.options, function (o) {
        return o.value === wantedService;
      });
      if (option) serviceSelect.value = wantedService;
    }
  }

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll("[data-count]");

  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var isDecimal = el.getAttribute("data-decimal") === "true";

    if (prefersReducedMotion) {
      el.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
      return;
    }

    var duration = 1100;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = isDecimal ? (eased * target).toFixed(1) : Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (counters.length && "IntersectionObserver" in window) {
    var counterObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      counterObs.observe(el);
    });
  }

  /* ---- Gallery lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        lightboxImg.src = item.getAttribute("data-src");
        lightboxImg.alt = item.getAttribute("data-alt") || "Enlarged photo";
        lightbox.showModal();
      });
    });

    var closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        lightbox.close();
      });
    }

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
  }

  /* ---- Quote form (Netlify Forms) ---- */
  var form = document.getElementById("quoteForm");
  if (!form) form = document.querySelector(".quote-form");

  if (form) {
    var submitBtn = document.getElementById("quoteSubmitBtn");
    var feedback = document.getElementById("formFeedback");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var botField = form.querySelector('input[name="bot-field"]');
      if (botField && botField.value) {
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
      }
      if (feedback) {
        feedback.className = "form-feedback";
        feedback.textContent = "";
      }

      var url = form.getAttribute("action") || "/";
      var body = new URLSearchParams(new FormData(form)).toString();

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function (response) {
          if (response.ok) {
            if (feedback) {
              feedback.className = "form-feedback success";
              feedback.textContent = "Thanks - your quote request has been sent. We will be in touch within 24 hours.";
            }
            form.reset();
          } else {
            throw new Error("Request failed with status " + response.status);
          }
        })
        .catch(function () {
          if (feedback) {
            feedback.className = "form-feedback error";
            feedback.innerHTML =
              "Something went wrong sending the form. Please call us on <a href=\"tel:+447722094702\">07722 094702</a> or try again.";
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("is-loading");
          }
        });
    });
  }
})();
