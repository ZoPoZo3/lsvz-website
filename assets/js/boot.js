/* Apply the saved language before CSS paints; storage may be unavailable. */
(function () {
  document.documentElement.classList.add('js');
  try {
    var lang = localStorage.getItem('lsvz-lang');
    if (lang === 'en' || lang === 'es' || lang === 'de') document.documentElement.lang = lang;
  } catch (error) { /* Private browsing still gets the default language. */ }
})();
