/* Sauerländer Imkerei Molitor – Skript für alle Seiten: Hamburger-Menü öffnen und schließen */
(function () {
  var knopf = document.querySelector('.burger');
  var panel = document.getElementById('menuepanel');
  if (!knopf || !panel) return;
  function setzen(auf) {
    panel.hidden = !auf;
    document.documentElement.classList.toggle('menue-offen', auf);
    knopf.setAttribute('aria-expanded', auf ? 'true' : 'false');
    knopf.setAttribute('aria-label', auf ? 'Menü schließen' : 'Menü öffnen');
  }
  knopf.addEventListener('click', function () { setzen(knopf.getAttribute('aria-expanded') !== 'true'); });
  panel.addEventListener('click', function (e) { if (e.target.closest('a') || e.target === panel) setzen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { setzen(false); knopf.focus(); }
  });
})();

/* Video erst laden, wenn die Seite fertig ist und das Video sichtbar wird.
   Bei Datensparmodus oder "weniger Bewegung" bleibt das Vorschaubild stehen. */
(function () {
  var videos = document.querySelectorAll('video[data-spaet]');
  if (!videos.length) return;
  var sparen = (navigator.connection && navigator.connection.saveData) ||
    (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (sparen) return;
  function starten(v) {
    if (v.dataset.gestartet) return;
    v.dataset.gestartet = '1';
    v.preload = 'auto';
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  window.addEventListener('load', function () {
    videos.forEach(function (v) {
      if (!('IntersectionObserver' in window)) { starten(v); return; }
      var io = new IntersectionObserver(function (eintraege) {
        eintraege.forEach(function (e) { if (e.isIntersecting) { starten(v); io.disconnect(); } });
      }, { rootMargin: '200px' });
      io.observe(v);
    });
  });
})();
