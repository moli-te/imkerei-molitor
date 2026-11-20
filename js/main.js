/* Sauerländer Imkerei Molitor – Skript für alle Seiten */

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
    var tempo = parseFloat(v.getAttribute('data-tempo'));
    if (tempo > 0) { v.defaultPlaybackRate = tempo; v.playbackRate = tempo; }
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

/* Untermenü „E-Shop“: per Tippen auf ▾ öffnen und schließen */
(function () {
  document.querySelectorAll('.nav-gruppe').forEach(function (g) {
    var knopf = g.querySelector('.nav-auf');
    if (!knopf) return;
    function setzen(auf) { g.classList.toggle('offen', auf); knopf.setAttribute('aria-expanded', auf ? 'true' : 'false'); }
    knopf.addEventListener('click', function (e) { e.stopPropagation(); setzen(!g.classList.contains('offen')); });
    document.addEventListener('click', function (e) { if (!g.contains(e.target)) setzen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && g.classList.contains('offen')) { setzen(false); knopf.focus(); } });
    g.querySelectorAll('.untermenue a').forEach(function (a) { a.addEventListener('click', function () { setzen(false); }); });
  });
})();
