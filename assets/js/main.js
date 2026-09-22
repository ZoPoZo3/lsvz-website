/* LSVZ — nav toggle, scroll reveals, hero tile parallax */

(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* True on anything driven by a mouse/trackpad; false on touch (and coarse
     pointers generally). Mouse-only flourishes — magnetic buttons, 3D tilt,
     the scroll-expand hero's lerp smoothing — are gated on this rather than
     screen width, since it's the input model that breaks on touch, not the
     viewport size. Desktop behavior is untouched either way. */
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Mobile nav ------------------------------------------------------------ */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (navToggle && nav) {
    var mobileNav = window.matchMedia('(max-width: 1100px)');
    var navBackground = document.querySelectorAll('main, .site-footer');
    var previousOverflow = '';
    var header = document.querySelector('.site-header');
    if (header) new ResizeObserver(function () { document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px'); }).observe(header);
    // Created here rather than in each page's markup: a dimmed backdrop
    // behind the open drawer, so there's a visual gap between "menu" and
    // "page", and tapping outside the panel closes it like it would on any
    // native mobile menu.
    var navScrim = document.createElement("div");
    navScrim.className = "nav-scrim";
    document.body.appendChild(navScrim);

    var closeNav = function () {
      var wasOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      navScrim.classList.remove("is-open");
      if (wasOpen) document.body.style.overflow = previousOverflow;
      nav.inert = mobileNav.matches;
      navBackground.forEach(function (el) { el.inert = false; });
      if (wasOpen && mobileNav.matches) navToggle.focus();
    };

    var openNav = function () {
      previousOverflow = document.body.style.overflow;
      nav.inert = false;
      navBackground.forEach(function (el) { el.inert = true; });
      navToggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      navScrim.classList.add("is-open");
      document.body.style.overflow = "hidden";
      nav.querySelector('a').focus();
    };

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeNav();
      } else {
        openNav();
      }
    });

    navScrim.addEventListener("click", closeNav);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeNav();
      }
      if (e.key === 'Tab' && navToggle.getAttribute('aria-expanded') === 'true') {
        var targets = Array.prototype.slice.call(nav.querySelectorAll('a, button')).filter(function (el) { return el.getClientRects().length; });
        targets.push(navToggle);
        var index = targets.indexOf(document.activeElement);
        if (e.shiftKey && index <= 0) { e.preventDefault(); navToggle.focus(); }
        else if (!e.shiftKey && (index === targets.length - 1 || index < 0)) { e.preventDefault(); targets[0].focus(); }
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    mobileNav.addEventListener('change', closeNav);
    closeNav();
  }

  /* Scroll reveals ---------------------------------------------------------- */
  var revealSingles = document.querySelectorAll(".reveal");
  /* Any reveal-group can end up taller than the viewport once it has enough
     items — a masonry photo wall, but also a long card grid like Past
     Events as more events get added. Triggering the fade off the GROUP
     being 15% visible then leaves the top items, already on screen,
     sitting blank until you've scrolled well past them. Every item is
     observed and faded in on its own instead, the moment it individually
     enters view. */
  var groupItems = document.querySelectorAll(".reveal-group .reveal-item");
  var io = null;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealSingles.forEach(function (el) {
      el.classList.add("is-visible");
    });
    groupItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var groups = document.querySelectorAll(".reveal-group:not(.masonry)");
    groups.forEach(function (group) {
      group.querySelectorAll(".reveal-item").forEach(function (item, i) {
        item.style.transitionDelay = Math.min(i * 70, 420) + "ms";
      });
    });

    io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealSingles.forEach(function (el) {
      io.observe(el);
    });
    groupItems.forEach(function (el) {
      io.observe(el);
    });
  }

  /* Word-split reveal (plain-text headings only) -------------------------------
     Runs on DOMContentLoaded, after i18n.js's own DOMContentLoaded listener
     (registered first, in script order) has already swapped in translated
     text — otherwise i18n's textContent assignment would wipe the spans. */
  document.addEventListener("DOMContentLoaded", function () {
    var splitEls = document.querySelectorAll("[data-split-words]");
    function splitHeadings() { splitEls.forEach(function (el) {
      var words = el.textContent.split(/(\s+)/);
      el.textContent = "";
      words.forEach(function (w, i) {
        if (w.trim() === "") {
          el.appendChild(document.createTextNode(w));
          return;
        }
        var span = document.createElement("span");
        span.className = "split-word";
        span.textContent = w;
        span.style.transitionDelay = Math.min(i * 35, 300) + "ms";
        el.appendChild(span);
      });
      if (io) {
        io.observe(el);
      } else {
        el.classList.add("is-visible");
      }
    }); }
    splitHeadings();
    document.addEventListener('lsvz:languagechange', splitHeadings);

    /* Scroll-linked word reveal (the history quote) -----------------------
       Unlike [data-split-words] above, this doesn't fire once and finish —
       it stays tied to scroll position the whole time the quote is
       crossing the viewport, so how many words are lit up tracks how far
       the visitor has scrolled rather than a fixed timer. Same
       after-i18n timing requirement as the word-split reveal, and the
       same reason: swapping in translated text would wipe these spans. */
    var scrollWordEls = document.querySelectorAll("[data-scroll-words]");
    scrollWordEls.forEach(function (el) {
      var wordSpans = [];
      function splitQuote() {
      var words = el.textContent.split(/(\s+)/);
      el.textContent = "";
      wordSpans = [];
      words.forEach(function (w) {
        if (w.trim() === "") {
          el.appendChild(document.createTextNode(w));
          return;
        }
        var span = document.createElement("span");
        span.className = "scroll-word";
        span.textContent = w;
        el.appendChild(span);
        wordSpans.push(span);
      });
      }
      splitQuote();

      if (reduceMotion || !wordSpans.length) {
        wordSpans.forEach(function (span) {
          span.classList.add("is-visible");
        });
        return;
      }

      var ticking = false;
      var update = function () {
        var rect = el.getBoundingClientRect();
        // Starts lighting up once the quote is 85% of the way up the
        // viewport (just below the fold) and finishes by the time it
        // reaches 35% — a window sized to the paragraph's own height so
        // scrolling through it corresponds to reading through it.
        var start = window.innerHeight * 0.85;
        var end = window.innerHeight * 0.35;
        var progress = (start - rect.top) / (start - end);
        progress = Math.max(0, Math.min(1, progress));
        var revealCount = Math.round(progress * wordSpans.length);
        wordSpans.forEach(function (span, i) {
          span.classList.toggle("is-visible", i < revealCount);
        });
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        function () {
          if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
          }
        },
        { passive: true }
      );
      window.addEventListener("resize", update);
      document.addEventListener('lsvz:languagechange', function () { splitQuote(); update(); });
      update();
    });
  });

  /* Magnetic buttons + click spark -------------------------------------------
     The magnetic pull only makes sense with a real mouse — on touch, a tap
     can fire one synthetic mousemove without a matching mouseleave, leaving
     the button stuck mid-shift, so it's skipped there entirely. The click
     spark isn't hover-dependent (fires on tap fine) and runs everywhere. */
  if (!reduceMotion && canHover) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.25;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  if (!reduceMotion) {
    document.querySelectorAll(".btn--primary").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var originX = e.clientX;
        var originY = e.clientY;
        for (var i = 0; i < 8; i++) {
          var spark = document.createElement("span");
          spark.className = "click-spark";
          var angle = (i / 8) * Math.PI * 2;
          spark.style.setProperty("--dx", Math.cos(angle) * 28 + "px");
          spark.style.setProperty("--dy", Math.sin(angle) * 28 + "px");
          spark.style.left = originX + "px";
          spark.style.top = originY + "px";
          document.body.appendChild(spark);
          spark.addEventListener("animationend", function () {
            this.remove();
          });
        }
      });
    });
  }

  /* 3D tilt + glare on cards --------------------------------------------------- */
  function addTilt(selector) {
    /* Same stuck-transform risk as the magnetic buttons above: a tap can
       leave a card permanently skewed since mouseleave may never follow. */
    if (reduceMotion || !canHover) return;
    document.querySelectorAll(selector).forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(700px) rotateX(" + (py * -7) + "deg) rotateY(" + (px * 7) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }
  addTilt(".event-card");
  addTilt(".gallery-grid .tile-frame");
  addTilt(".staff-card .placeholder-photo");

  /* Header shrink shadow on scroll -------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Vertical history timeline: expandable nodes + scroll-drawn line ----------- */
  document.querySelectorAll(".timeline-v__node").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });

  /* The line is drawn as three independently-measured segments (main list,
     quote-section crossing, epilogue lead-in) so it can change color where
     it crosses the red quote band while still reading as one continuous
     thread. The epilogue segment's length isn't fixed — it's sized to reach
     the vertical centre of the "A new chapter" heading (which carries the
     line's end dot as a ::before), wherever that ends up sitting once the
     epilogue's own responsive layout has settled: the eyebrow line above it
     can wrap differently per language and width. */
  var epConnector = document.querySelector(".history-epilogue-section .timeline-v__connector");
  var epTitle = document.querySelector(".history-epilogue__content .history-heading");

  /* Summed layout offsets rather than getBoundingClientRect: the epilogue
     block is translated while its reveal animation runs, which would skew
     any rect-based reading and leave the line the wrong length until the
     animation finished. offsetTop reports untransformed layout position, so
     the very first measurement is already the final one. */
  var offsetTopWithin = function (el, ancestor) {
    var y = 0;
    while (el && el !== ancestor) {
      y += el.offsetTop;
      el = el.offsetParent;
    }
    return y;
  };

  var sizeEpilogueConnector = function () {
    if (!epConnector || !epTitle) return;
    var section = epConnector.parentElement;
    var h = offsetTopWithin(epTitle, section) + epTitle.offsetHeight / 2;
    epConnector.style.height = Math.max(0, h) + "px";
  };

  var timelineSegments = [
    { track: document.querySelector(".timeline-v__track"), fill: document.querySelector(".timeline-v__progress") },
    {
      track: document.querySelector(".history-quote-section .timeline-v__connector"),
      fill: document.querySelector(".history-quote-section .timeline-v__connector-fill")
    },
    { track: epConnector, fill: epConnector ? epConnector.querySelector(".timeline-v__connector-fill") : null }
  ].filter(function (seg) {
    return seg.track && seg.fill;
  });

  if (timelineSegments.length) {
    var tlTicking = false;
    var updateTimelineProgress = function () {
      var viewpoint = window.innerHeight * 0.7;
      timelineSegments.forEach(function (seg) {
        var rect = seg.track.getBoundingClientRect();
        var pct = rect.height ? (viewpoint - rect.top) / rect.height : 0;
        pct = Math.max(0, Math.min(1, pct));
        seg.fill.style.height = pct * 100 + "%";
      });
      tlTicking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!tlTicking) {
          requestAnimationFrame(updateTimelineProgress);
          tlTicking = true;
        }
      },
      { passive: true }
    );
    var remeasure = function () {
      sizeEpilogueConnector();
      updateTimelineProgress();
    };
    window.addEventListener("resize", remeasure);
    document.addEventListener('lsvz:languagechange', remeasure);
    if (document.fonts) document.fonts.ready.then(remeasure);
    // The epilogue photo is lazy-loaded, so the first measurement above
    // runs against a layout that still has no image in it — without this,
    // the line keeps the taller height it measured and visibly overshoots
    // its end dot once the photo arrives and everything shifts up.
    var epImg = document.querySelector(".history-epilogue__media");
    if (epImg && epImg.tagName === "IMG" && !epImg.complete) {
      epImg.addEventListener("load", remeasure);
      epImg.addEventListener("error", remeasure);
    }
    window.addEventListener("load", remeasure);
    // The epilogue's own reveal shifts it 24px as it fades in; re-measure
    // once that settles so the dot lands on the title's final position.
    var epBlock = document.querySelector(".history-epilogue");
    if (epBlock) epBlock.addEventListener("transitionend", remeasure);
    remeasure();
  }

  /* Home hero ------------------------------------------------------------------
     Both the cover photo's drift and the whole opening sequence (brand mark
     in, veil lifting, header arriving) are CSS animations in pages.css, so
     they complete on their own even if this file never runs. The JS here is
     only the two things CSS can't do: cutting the intro short when the
     visitor is already interacting, and hiding the scroll arrow once they've
     actually scrolled. */
  var heroHint = document.querySelector(".home-hero .hero__scroll-hint");
  if (heroHint) {
    var syncHint = function () {
      heroHint.classList.toggle("is-hidden", window.scrollY > 40);
    };
    window.addEventListener("scroll", syncHint, { passive: true });
    syncHint();
  }

  if (document.body.classList.contains("has-intro")) {
    var introSkipped = false;
    var endIntro = function () {
      if (introSkipped) return;
      introSkipped = true;
      document.body.classList.add("intro-done");
    };

    // Anything that says "I'm here and I want to get on with it" — but not
    // before the intro has had a moment to be seen. Without the grace
    // period a stray event around load (a leftover click, an automated
    // one) cuts the intro off before its first frame.
    var armSkip = function () {
      ["wheel", "touchstart", "pointerdown", "keydown"].forEach(function (evt) {
        window.addEventListener(evt, endIntro, { passive: true, once: true });
      });
      window.addEventListener(
        "scroll",
        function () {
          if (window.scrollY > 4) endIntro();
        },
        { passive: true }
      );
    };
    setTimeout(armSkip, 900);

    // Belt and braces: mark the intro finished once its CSS timeline is up,
    // so .intro-done is the single source of truth for "page is live".
    setTimeout(endIntro, canHover ? 3700 : 1900);
  }

  /* Count-up stats --------------------------------------------------------------
     Runs off whatever text the element already holds, which by this point is
     i18n's translated value (i18n.js registers its DOMContentLoaded handler
     first, so it has already swapped the text in) — the digits are the same
     in every language, only any suffix differs. Years count up from a couple
     of decades back; plain totals count from zero. */
  var counters = document.querySelectorAll("[data-count-up]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var runCount = function (el) {
      var raw = el.textContent.trim();
      var match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      var target = parseInt(match[1], 10);
      var suffix = match[2];
      var from = target >= 1000 ? target - 24 : 0;
      var duration = 1600;
      var start = null;

      var step = function (ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / duration);
        // easeOutCubic. Deliberately gentler than the easing used elsewhere
        // on the site: a sharper curve hits ~90% of the target in the first
        // third, so the digits barely appear to climb at all.
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(from + (target - from) * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          runCount(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) {
      countObserver.observe(el);
    });
  }
})();
