/* LSVZ — Drift wall for the Past Events hero.
   A hand-rolled, framework-free reimplementation of the react-bits DriftWall
   idea: looping columns of photos drifting in 3D, pausing and surfacing a
   caption on hover/focus. Adapted here to sit inside a sticky stage — as the
   visitor scrolls the stage stays pinned while a scrim dims the wall and the
   section's title/lede fade in on top of it; past that point hover-pause is
   disabled and the wall just drifts as a backdrop. */

(function () {
  var EVENTS = [
    { slug: "bqm-tardeo", name: "BQM Tardeo", date: "25 Sep 2026" },
    { slug: "lsvz-x-mapz-padel-tournament", name: "LSVZ x MAPZ Padel Tournament", date: "25 Apr 2026" },
    { slug: "ski-weekend-vol-3", name: "Ski-Weekend [Vol.3]", date: "27-29 Mar 2026" },
    { slug: "delirio-vol-2", name: "Delirio [Vol.2]", date: "20 Mar 2026" },
    { slug: "futsal-tournier", name: "Futsal Tournier", date: "15 Mar 2026" },
    { slug: "a-kilometer-for-science", name: "A Kilometer for Science", date: "16 Oct 2025" },
    { slug: "delirio-vol-1", name: "Delirio [Vol.1]", date: "10 Oct 2025" },
    { slug: "vibora-vol-1", name: "Víbora [Vol.1]", date: "12 Apr 2025" },
    { slug: "white-party", name: "White Party", date: "4 Apr 2025" },
    { slug: "ski-weekend-vol-2", name: "Ski-Weekend [Vol.2]", date: "16 Mar 2025" },
    { slug: "papaya-vol-8", name: "Papaya [Vol.8]", date: "7 Mar 2025" },
    { slug: "christmas-dinner", name: "Christmas Dinner", date: "13 Dec 2024" },
    { slug: "papaya-vol-7", name: "Papaya [Vol.7]", date: "29 Nov 2024" },
    { slug: "padel-tournament-vol-2", name: "Padel Tournament [Vol.2]", date: "16 Nov 2024" },
    { slug: "halloween-party", name: "Halloween Party", date: "31 Oct 2024" },
    { slug: "papaya-vol-6", name: "Papaya [Vol.6]", date: "11 Oct 2024" },
    { slug: "padel-tournament", name: "Padel Tournament", date: "14 May 2024" },
    { slug: "papaya-vol-5", name: "Papaya [Vol.5]", date: "15 Mar 2024" },
    { slug: "papaya-vol-4", name: "Papaya [Vol.4]", date: "20 Oct 2023" },
    { slug: "menage-a-quatre", name: "Ménage à Quatre", date: "11 May 2023" }
  ].map(function (e) {
    return {
      image: "assets/img/optimized/events-past/" + e.slug + "/cover-480.webp",
      title: e.name,
      date: e.date
    };
  });

  var prefersReducedMotion = function () {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  /* Touch has no sustained hover: a scrolling finger can fire pointerenter
     on tiles it merely passes over, pausing/unpausing the wall and flashing
     captions as you scroll past it. Simplest fix is to just not wire up the
     hover-pause on touch — the wall drifts continuously there instead, which
     reads fine as an ambient background. Desktop's hover-to-pause is
     unaffected. */
  var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function columnFactor(index, variance) {
    var pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
    return 1 + variance * pseudo;
  }

  function shuffle(arr) {
    var out = arr.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      var j = Math.floor(Math.abs(seed) * (i + 1));
      var tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function initDriftWall(root) {
    var rootStyle = getComputedStyle(root);
    var tileW = parseFloat(rootStyle.getPropertyValue("--dw-tile-w")) || 150;
    var tileH = parseFloat(rootStyle.getPropertyValue("--dw-tile-h")) || 200;
    var tileGap = parseFloat(rootStyle.getPropertyValue("--dw-gap")) || 16;

    // Enough columns to comfortably fill the viewport width (plus one extra
    // so the radial mask fades real tiles at the edges, not empty space).
    var neededColumns = Math.ceil(window.innerWidth / (tileW + tileGap)) + 1;

    var options = {
      columns: Math.max(3, Math.min(10, neededColumns)),
      tileUnit: tileH + tileGap, // read from CSS so mobile's smaller tiles keep the loop math correct
      speed: 20,
      variance: 0.45
    };

    var reduced = prefersReducedMotion();
    var columns = [];
    for (var c = 0; c < options.columns; c++) columns.push([]);
    shuffle(EVENTS).forEach(function (item, i) {
      columns[i % options.columns].push(item);
    });

    var plane = document.createElement("div");
    plane.className = "drift-wall__plane";
    root.appendChild(plane);

    var trackEls = [];
    var offsets = [];
    var velocities = [];
    var baseVelocities = [];
    var copyHeights = [];

    columns.forEach(function (colItems, c) {
      var colEl = document.createElement("div");
      colEl.className = "drift-wall__col";
      var trackEl = document.createElement("div");
      trackEl.className = "drift-wall__track";

      var unit = options.tileUnit;
      var copyHeight = Math.max(unit, colItems.length * unit);
      var copies = Math.max(3, Math.ceil((window.innerHeight * 1.6) / copyHeight) + 1);

      for (var copy = 0; copy < copies; copy++) {
        colItems.forEach(function (item, itemIndex) {
          var id = c + "-" + copy + "-" + itemIndex;
          var tile = document.createElement("div");
          tile.className = "drift-wall__tile";
          tile.setAttribute("data-tile-id", id);
          tile.setAttribute("data-col", String(c));
          tile.setAttribute("tabindex", "-1");
          tile.setAttribute("role", "img");
          tile.setAttribute("aria-label", item.title + ", " + item.date);

          var inner = document.createElement("span");
          inner.className = "drift-wall__inner";

          var img = document.createElement("img");
          img.src = item.image;
          img.alt = "";
          img.loading = "lazy";
          img.decoding = "async";
          img.draggable = false;

          var overlay = document.createElement("span");
          overlay.className = "drift-wall__overlay";
          overlay.setAttribute("aria-hidden", "true");

          var caption = document.createElement("span");
          caption.className = "drift-wall__caption";
          var dateEl = document.createElement("span");
          dateEl.className = "drift-wall__date";
          dateEl.textContent = item.date;
          var nameEl = document.createElement("span");
          nameEl.className = "drift-wall__name";
          nameEl.textContent = item.title;
          caption.appendChild(dateEl);
          caption.appendChild(nameEl);

          inner.appendChild(img);
          inner.appendChild(overlay);
          inner.appendChild(caption);
          tile.appendChild(inner);
          trackEl.appendChild(tile);

          // Per-tile listeners, not a delegated pointermove + elementFromPoint
          // hit-test: the tiles drift continuously, so by the time a delegated
          // handler re-resolves "what's under this coordinate" the answer has
          // already moved on. Letting the browser's own hit-testing drive
          // enter/leave on each tile is what actually stays in sync.
          if (canHover) {
            tile.addEventListener("pointerenter", function () {
              if (!backgroundMode) setActive(tile, c);
            });
            tile.addEventListener("pointerleave", function () {
              if (activeTile === tile) clearActive();
            });
          }
          tile.addEventListener("focus", function () {
            if (!backgroundMode) setActive(tile, c);
          });
          tile.addEventListener("blur", function () {
            if (activeTile === tile) clearActive();
          });
        });
      }

      colEl.appendChild(trackEl);
      plane.appendChild(colEl);
      trackEls.push(trackEl);
      copyHeights.push(copyHeight);
      offsets.push(copyHeight * ((c * 0.37) % 1));
      velocities.push(0);

      var dirSign = c % 2 === 0 ? 1 : -1;
      baseVelocities.push(options.speed * columnFactor(c, options.variance) * dirSign);
    });

    var backgroundMode = false;
    var hoveredCol = -1;
    var activeTile = null;

    function setActive(tile, col) {
      if (activeTile === tile) return;
      if (activeTile) activeTile.classList.remove("is-active");
      activeTile = tile;
      hoveredCol = col;
      if (tile) tile.classList.add("is-active");
    }

    function clearActive() {
      setActive(null, -1);
    }

    // Safety net: if the pointer leaves the wall entirely between two tiles
    // (or off an edge) without a clean per-tile pointerleave, this clears it.
    if (canHover) {
      root.addEventListener("pointerleave", clearActive);
    }

    var rafId = null;
    var lastTs = null, visible = true;
    function syncAnimation() {
      cancelAnimationFrame(rafId); lastTs = null;
      if (!reduced && visible && !document.hidden) rafId = requestAnimationFrame(tick);
    }
    document.addEventListener('visibilitychange', syncAnimation);
    document.addEventListener('lsvz:languagechange', syncAnimation);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (event) { reduced = event.matches; syncAnimation(); });
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; syncAnimation(); }).observe(root);

    function tick(ts) {
      if (lastTs === null) lastTs = ts;
      var dt = Math.min(0.05, Math.max(0, ts - lastTs) / 1000);
      lastTs = ts;

      if (!reduced) {
        for (var c = 0; c < trackEls.length; c++) {
          var paused = !backgroundMode && hoveredCol === c;
          var target = paused ? 0 : baseVelocities[c];
          var ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocities[c] += (target - velocities[c]) * ease;
          var next = offsets[c] + velocities[c] * dt;
          var h = copyHeights[c];
          next = ((next % h) + h) % h;
          offsets[c] = next;
          trackEls[c].style.transform = "translate3d(0, " + -next + "px, 0)";
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    if (!reduced) {
      rafId = requestAnimationFrame(tick);
    }

    return {
      setBackgroundMode: function (on) {
        if (backgroundMode === on) return;
        backgroundMode = on;
        if (on) clearActive();
      },
      destroy: function () {
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }

  function initDriftHero() {
    var hero = document.querySelector(".drift-hero");
    if (!hero) return;
    var wallRoot = hero.querySelector(".drift-wall");
    var track = hero.querySelector(".drift-hero__track");
    var scrim = hero.querySelector(".drift-hero__scrim");
    var content = hero.querySelector(".drift-hero__content");
    var hint = hero.querySelector(".drift-hero__hint");
    if (!wallRoot || !track) return;

    var wall = initDriftWall(wallRoot);
    if (hint) {
      var hintReady = false;
      function syncHint() {
        hint.classList.toggle("is-visible", hintReady && window.scrollY < 16);
      }
      window.addEventListener("scroll", syncHint, { passive: true });
      window.setTimeout(function () {
        hintReady = true;
        syncHint();
      }, 2500);
    }
    var reduced = prefersReducedMotion();
    if (reduced) return;

    var ticking = false;

    function update() {
      ticking = false;
      var rect = track.getBoundingClientRect();
      var trackHeight = track.offsetHeight - window.innerHeight;
      var scrolled = -rect.top;
      var progress = trackHeight > 0 ? Math.min(1, Math.max(0, scrolled / trackHeight)) : 0;
      var fadeProgress = Math.min(1, progress / 0.35);

      if (scrim) scrim.style.opacity = String(fadeProgress);
      if (content) {
        content.style.opacity = String(fadeProgress);
        content.style.transform = "translateY(" + (22 * (1 - fadeProgress)) + "px)";
      }
      wall.setBackgroundMode(progress > 0.03);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDriftHero);
  } else {
    initDriftHero();
  }
})();
