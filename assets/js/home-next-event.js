/* The home notice reads the upcoming-events page so event cards stay the
   single source of truth. Past events and an empty calendar produce no notice. */
(function () {
  var note = document.getElementById('next-event-note');
  if (!note) return;

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
  if ('IntersectionObserver' in window) {
    var visibility = new window.IntersectionObserver(function (entries) {
      note.classList.toggle('is-offscreen', !entries[0].isIntersecting);
    });
    visibility.observe(note);
  }
  document.addEventListener('visibilitychange', function () {
    note.classList.toggle('is-paused', document.hidden);
  });

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
      if (!time || !heading) return null;
      var day = time.getAttribute('datetime');
      var ends = card.getAttribute('data-event-end');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || (ends ? Date.parse(ends) <= now : day < today)) return null;
      return {
        id: day + ':' + heading.textContent.trim(),
        day: day,
        start: card.getAttribute('data-event-start') || day,
        title: heading.textContent.trim()
      };
    }).filter(Boolean);
    if (!events.length) return;
    events.sort(function (a, b) { return a.start.localeCompare(b.start); });
    event = events[0];
    try { if (window.sessionStorage.getItem(dismissalKey) === event.id) return; } catch (error) { /* Show the notice anyway. */ }
    note.dataset.eventId = event.id;
    showAfterIntro();
  }).catch(function () { /* Keep the notice hidden if the calendar cannot be read. */ });
})();
