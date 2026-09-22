/* LSVZ analytics: Google Analytics loads only after explicit consent. */
(function () {
  'use strict';

  var measurementId = 'G-NPHL6ZSTTR';
  var consentKey = 'lsvz-analytics-consent';
  var localHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  var choice;

  try { choice = localStorage.getItem(consentKey); } catch (error) { choice = null; }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  function loadAnalytics() {
    if (localHost || document.querySelector('script[data-lsvz-analytics]')) return;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      anonymize_ip: true
    });
    var script = document.createElement('script');
    script.async = true;
    script.dataset.lsvzAnalytics = 'true';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function save(value) {
    try { localStorage.setItem(consentKey, value); } catch (error) { /* Choice remains valid for this page. */ }
    var banner = document.querySelector('.privacy-banner');
    if (banner) banner.remove();
    if (value === 'accepted') loadAnalytics();
  }

  function copy() {
    var language = 'es';
    try { language = localStorage.getItem('lsvz-lang') || document.documentElement.lang || 'es'; } catch (error) { /* Spanish fallback. */ }
    var messages = {
      es: {
        title: 'Tu privacidad',
        body: 'Usamos Google Analytics para conocer las visitas y mejorar la web. Solo se activa si aceptas.',
        accept: 'Aceptar estadísticas',
        reject: 'Rechazar',
        details: 'Más información'
      },
      en: {
        title: 'Your privacy',
        body: 'We use Google Analytics to understand visits and improve the website. It only loads if you accept.',
        accept: 'Accept analytics',
        reject: 'Reject',
        details: 'Learn more'
      },
      de: {
        title: 'Deine Privatsphäre',
        body: 'Wir verwenden Google Analytics, um Besuche zu verstehen und die Website zu verbessern. Es wird nur mit deiner Zustimmung geladen.',
        accept: 'Statistik akzeptieren',
        reject: 'Ablehnen',
        details: 'Mehr erfahren'
      }
    };
    return messages[language] || messages.es;
  }

  function showBanner() {
    if (document.querySelector('.privacy-banner')) return;
    var text = copy();
    var banner = document.createElement('section');
    banner.className = 'privacy-banner';
    banner.setAttribute('aria-label', text.title);
    banner.innerHTML = '<div class="privacy-banner__copy"><strong></strong><p></p><a></a></div><div class="privacy-banner__actions"><button class="btn btn--ghost" type="button" data-consent="rejected"></button><button class="btn btn--primary" type="button" data-consent="accepted"></button></div>';
    banner.querySelector('strong').textContent = text.title;
    banner.querySelector('p').textContent = text.body;
    var details = banner.querySelector('a');
    details.textContent = text.details;
    details.href = window.location.pathname.indexOf('/events-past/') !== -1 ? '../privacy.html' : 'privacy.html';
    banner.querySelector('[data-consent="rejected"]').textContent = text.reject;
    banner.querySelector('[data-consent="accepted"]').textContent = text.accept;
    banner.addEventListener('click', function (event) {
      var value = event.target.getAttribute('data-consent');
      if (value) save(value);
    });
    document.body.appendChild(banner);
  }

  var settings = document.getElementById('privacy-settings');
  if (settings) {
    settings.addEventListener('click', function () {
      try { localStorage.removeItem(consentKey); } catch (error) { /* The banner still opens. */ }
      showBanner();
    });
  }

  if (choice === 'accepted') loadAnalytics();
  else if (choice !== 'rejected' && !localHost) showBanner();
})();
