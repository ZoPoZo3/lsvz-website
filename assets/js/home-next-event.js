/* The home notice reads the upcoming-events page so event cards stay the
   single source of truth. Past events and an empty calendar produce no notice. */
(function () {
  var note = document.getElementById('next-event-note');
  if (!note) return;

  var title = note.querySelector('.next-event-note__title');
  var poster = note.querySelector('.next-event-note__poster');
  var date = note.querySelector('.next-event-note__date');
  var status = note.querySelector('.next-event-note__status');
  var close = note.querySelector('.next-event-note__close');
  var event = null;
  var dismissalKey = 'lsvz-dismissed-event';

  function todayInZurich() {
    var parts = new Intl.DateTimeFormat('en', {
      timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    return values.year + '-' + values.month + '-' + values.day;
  }

  function translateEvent() {
    if (!event) return;
    status.textContent = window.LSVZ_I18N.t('homeNotice.' + event.availability);
    window.LSVZ_I18N.refresh(note);
  }

  function showAfterIntro() {
    var reveal = function () {
      window.setTimeout(function () {
        if (note.hidden) {
          note.hidden = false;
          window.requestAnimationFrame(function () { note.classList.add('is-visible'); });
        }
      }, 400);
    };
    if (document.body.classList.contains('intro-done')) { reveal(); return; }
    var observer = new window.MutationObserver(function () {
      if (!document.body.classList.contains('intro-done')) return;
      observer.disconnect();
      reveal();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  close.addEventListener('click', function () {
    note.classList.remove('is-visible');
    note.hidden = true;
    if (event) {
      try { window.sessionStorage.setItem(dismissalKey, event.id); } catch (error) { /* Session storage is optional. */ }
    }
  });
  document.addEventListener('lsvz:languagechange', translateEvent);

  window.fetch('events-upcoming.html', { cache: 'no-store' }).then(function (response) {
    if (!response.ok) throw new Error('Upcoming events are unavailable');
    return response.text();
  }).then(function (html) {
    var page = new window.DOMParser().parseFromString(html, 'text/html');
    var now = Date.now();
    var today = todayInZurich();
    var events = Array.prototype.map.call(page.querySelectorAll('.upcoming-events .upcoming-event'), function (card) {
      var time = card.querySelector('time[datetime]');
      var heading = card.querySelector('h2');
      var image = card.querySelector('.upcoming-event__poster img');
      if (!time || !heading || !image) return null;
      var day = time.getAttribute('datetime');
      var ends = card.getAttribute('data-event-end');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || (ends ? Date.parse(ends) <= now : day < today)) return null;
      return {
        id: day + ':' + heading.textContent.trim(),
        day: day,
        start: card.getAttribute('data-event-start') || day,
        title: heading.textContent.trim(),
        poster: image.getAttribute('src'),
        availability: card.querySelector('.upcoming-event__actions a') ? 'tickets' :
          card.querySelector('.upcoming-event__status') ? 'free' : 'soon'
      };
    }).filter(Boolean);
    if (!events.length) return;
    events.sort(function (a, b) { return a.start.localeCompare(b.start); });
    event = events[0];
    try { if (window.sessionStorage.getItem(dismissalKey) === event.id) return; } catch (error) { /* Show the notice anyway. */ }
    title.textContent = event.title;
    poster.src = event.poster;
    date.setAttribute('datetime', event.day);
    date.setAttribute('data-event-date', event.day);
    translateEvent();
    showAfterIntro();
  }).catch(function () { /* Keep the notice hidden if the calendar cannot be read. */ });
})();
