/* Event photo viewer: keyboard, touch, loading recovery and cancellable transitions. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.masonry a'));
  if (!links.length) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = 0, busy = false, generation = 0, timer = null, lastFocused = null, overflow = '';
  var dragStart = null, dragDirection = 0, retryIndex = 0;
  var background = [];
  var eventName = document.querySelector('h1').textContent;
  var root = document.createElement('div');
  root.className = 'lightbox';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('data-i18n-aria', 'viewer.title');
  root.innerHTML = '<button type="button" class="lightbox__close" data-i18n-aria="viewer.close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<button type="button" class="lightbox__btn lightbox__btn--prev" data-i18n-aria="viewer.prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
    '<div class="lightbox__stage"><img class="lightbox__img" alt="" draggable="false"/><img class="lightbox__img" alt="" draggable="false"/></div>' +
    '<button type="button" class="lightbox__btn lightbox__btn--next" data-i18n-aria="viewer.next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
    '<div class="lightbox__counter" aria-live="polite" aria-atomic="true"></div>' +
    '<div class="lightbox__error" hidden><p data-i18n="viewer.error"></p><button type="button" class="btn btn--primary" data-i18n="viewer.retry"></button></div>';
  document.body.appendChild(root);
  var stage = root.querySelector('.lightbox__stage');
  var front = stage.children[0], back = stage.children[1];
  var closeBtn = root.querySelector('.lightbox__close');
  var prevBtn = root.querySelector('.lightbox__btn--prev'), nextBtn = root.querySelector('.lightbox__btn--next');
  var counter = root.querySelector('.lightbox__counter'), errorBox = root.querySelector('.lightbox__error');
  function wrap(n) { return (n + links.length) % links.length; }
  function label(n) { return window.LSVZ_I18N.t('viewer.photo', { n: n + 1, total: links.length, event: eventName }); }
  function translate() {
    root.setAttribute('aria-label', window.LSVZ_I18N.t('viewer.title'));
    window.LSVZ_I18N.refresh(root);
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = window.LSVZ_I18N.t(el.dataset.i18n); });
    front.alt = label(current);
    counter.textContent = (current + 1) + ' / ' + links.length;
    counter.setAttribute('aria-label', label(current));
  }
  function reset(img) { img.style.transition = ''; img.style.transform = ''; }
  function cancel() {
    generation++;
    clearTimeout(timer);
    busy = false;
    dragStart = null;
    root.removeAttribute('aria-busy');
    reset(front); reset(back);
    back.style.opacity = '0';
    back.setAttribute('aria-hidden', 'true');
  }
  function preload() {
    if (links.length > 1) { var img = new Image(); img.src = links[wrap(current + 1)].href; }
  }
  function immediate(index) {
    cancel(); current = wrap(index); retryIndex = current;
    errorBox.hidden = true;
    front.style.opacity = '1'; front.removeAttribute('aria-hidden');
    front.src = links[current].href;
    translate();
    preload();
  }
  function failed() {
    if (!root.classList.contains('is-open')) return;
    errorBox.hidden = false;
    root.removeAttribute('aria-busy');
    busy = false;
  }
  front.addEventListener('error', failed);
  back.addEventListener('error', failed);
  function transition(dir) {
    if (busy || !root.classList.contains('is-open')) return;
    if (motion.matches) { immediate(current + dir); return; }
    busy = true; errorBox.hidden = true;
    root.setAttribute('aria-busy', 'true');
    var token = ++generation, target = wrap(current + dir), loader = new Image();
    retryIndex = target;
    loader.onload = function () {
      if (token !== generation) return;
      clearTimeout(timer);
      root.removeAttribute('aria-busy');
      var width = stage.clientWidth;
      reset(back); back.src = loader.src; back.alt = label(target); back.style.opacity = '1';
      back.style.transform = 'translateX(' + (dir * width) + 'px)';
      void back.offsetWidth;
      front.style.transition = back.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
      front.style.transform = 'translateX(' + (-dir * width) + 'px)'; back.style.transform = 'translateX(0)';
      timer = setTimeout(function () {
        if (token !== generation) return;
        var old = front; front = back; back = old;
        reset(front); reset(back); front.removeAttribute('aria-hidden'); back.style.opacity = '0'; back.setAttribute('aria-hidden', 'true');
        current = target; busy = false; translate(); preload();
      }, 320);
    };
    loader.onerror = function () { if (token === generation) { clearTimeout(timer); cancel(); failed(); } };
    timer = setTimeout(function () { if (token === generation) { cancel(); failed(); } }, 12000);
    loader.src = links[target].href;
  }
  function close() {
    if (!root.classList.contains('is-open')) return;
    cancel(); root.classList.remove('is-open');
    document.body.style.overflow = overflow;
    background.forEach(function (entry) { entry.el.inert = entry.inert; });
    background = [];
    if (lastFocused) lastFocused.focus({ preventScroll: true });
  }
  function open(index) {
    lastFocused = document.activeElement;
    overflow = document.body.style.overflow;
    background = Array.prototype.slice.call(document.body.children).filter(function (el) { return el !== root && el.tagName !== 'SCRIPT'; }).map(function (el) { var entry = { el: el, inert: el.inert }; el.inert = true; return entry; });
    root.classList.add('is-open'); document.body.style.overflow = 'hidden';
    immediate(index); closeBtn.focus();
  }
  links.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); open(index);
    });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { transition(-1); });
  nextBtn.addEventListener('click', function () { transition(1); });
  errorBox.querySelector('button').addEventListener('click', function () { immediate(retryIndex); });
  root.addEventListener('click', function (event) { if (event.target === root) close(); });
  root.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); transition(event.key === 'ArrowRight' ? 1 : -1); }
    if (event.key === 'Tab') {
      var buttons = Array.prototype.slice.call(root.querySelectorAll('button')).filter(function (el) { return el.getClientRects().length; });
      var index = buttons.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); buttons[buttons.length - 1].focus(); }
      else if (!event.shiftKey && index === buttons.length - 1) { event.preventDefault(); buttons[0].focus(); }
    }
  });
  stage.addEventListener('pointerdown', function (event) {
    if (busy || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    dragStart = event.clientX; dragDirection = 0;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', function (event) {
    if (dragStart === null || busy) return;
    var dx = event.clientX - dragStart;
    dragDirection = dx < 0 ? 1 : -1;
    if (!motion.matches) front.style.transform = 'translateX(' + dx + 'px)';
  });
  function finishDrag(event) {
    if (dragStart === null) return;
    var distance = event.clientX - dragStart;
    dragStart = null;
    reset(front);
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    if (event.type === 'pointerup' && Math.abs(distance) > Math.max(35, stage.clientWidth * 0.18)) transition(dragDirection);
  }
  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  stage.addEventListener('lostpointercapture', function () { if (dragStart !== null) { dragStart = null; reset(front); } });
  document.addEventListener('lsvz:languagechange', translate);
  document.addEventListener('DOMContentLoaded', translate);
  motion.addEventListener('change', function () { if (root.classList.contains('is-open')) immediate(current); });
})();
