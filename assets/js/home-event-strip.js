/* On phones use native scrolling; on desktop retain the existing slow drift. */
(function () {
  var EVENTS = [
    { slug: 'lsvz-x-mapz-padel-tournament', name: 'LSVZ x MAPZ Padel Tournament', date: '2026-04-25' },
    { slug: 'ski-weekend-vol-3', name: 'Ski-Weekend [Vol.3]', date: '2026-03-27', end: '2026-03-29' },
    { slug: 'delirio-vol-2', name: 'Delirio [Vol.2]', date: '2026-03-20' },
    { slug: 'white-party', name: 'White Party', date: '2025-04-04' },
    { slug: 'papaya-vol-8', name: 'Papaya [Vol.8]', date: '2025-03-07' },
    { slug: 'halloween-party', name: 'Halloween Party', date: '2024-10-31' }
  ];
  function init() {
    var root = document.querySelector('.event-teaser__viewport');
    if (!root) return;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
    var track = document.createElement('div'); track.className = 'event-teaser__track'; root.appendChild(track);
    for (var copy = 0; copy < 4; copy++) {
      EVENTS.forEach(function (item) {
        var link = document.createElement('a'); link.className = 'event-teaser__item'; link.href = 'events-past/' + item.slug + '.html';
        if (copy) { link.dataset.clone = ''; link.setAttribute('aria-hidden','true'); link.tabIndex = -1; }
        var img = document.createElement('img'); img.src = 'assets/img/optimized/events-past/' + item.slug + '/cover-480.webp'; img.alt = item.name; img.loading = 'lazy'; img.decoding = 'async'; img.width = 480; img.height = 600; img.draggable = false;
        var caption = document.createElement('span'); caption.className = 'event-teaser__caption';
        var date = document.createElement('span'); date.className = 'event-teaser__date'; date.dataset.eventDate = item.date; date.dataset.dateShort = 'true'; if (item.end) date.dataset.eventEnd = item.end;
        var name = document.createElement('span'); name.className = 'event-teaser__name'; name.textContent = item.name;
        caption.append(date,name);link.append(img,caption);track.append(link);
      });
    }
    window.LSVZ_I18N.refresh(root);
    var control = document.querySelector('[data-strip-pause]');
    var manualPause = false, hover = false, focused = false, visible = true, offset = 0, width = 1, last = null, raf = null;
    function nativeMode() { return !mouse.matches || motion.matches || focused; }
    function measure() { var tile = track.querySelector('.event-teaser__item'); width = EVENTS.length * (tile.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap)); }
    function label() { if (control) { control.textContent = window.LSVZ_I18N.t(manualPause ? 'motion.play' : 'motion.pause'); control.setAttribute('aria-pressed',String(manualPause)); control.hidden = !mouse.matches || motion.matches; } }
    function frame(ts) {
      var dt = last === null ? 0 : Math.min((ts-last)/1000,0.05); last = ts;
      offset = (offset + dt * 26) % width;
      track.style.transform = 'translate3d(' + (offset-width) + 'px,0,0)';
      raf = requestAnimationFrame(frame);
    }
    function sync() {
      cancelAnimationFrame(raf);last = null;
      root.classList.toggle('is-static',nativeMode());label();measure();
      if (nativeMode()) track.style.transform = '';
      else if (visible && !document.hidden && !manualPause && !hover) raf = requestAnimationFrame(frame);
    }
    root.addEventListener('pointerenter',function () { if (mouse.matches) { hover = true;sync(); } });
    root.addEventListener('pointerleave',function () { hover = false;sync(); });
    root.addEventListener('focusin',function (event) { focused = true;sync(); event.target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'}); });
    root.addEventListener('focusout',function (event) { if (!root.contains(event.relatedTarget)) { focused = false;root.scrollLeft = 0;sync(); } });
    if (control) control.addEventListener('click',function () { manualPause = !manualPause;sync(); });
    document.addEventListener('visibilitychange',sync);document.addEventListener('lsvz:languagechange',label);
    motion.addEventListener('change',sync);mouse.addEventListener('change',sync);window.addEventListener('resize',sync);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting;sync(); }).observe(root);
    sync();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
