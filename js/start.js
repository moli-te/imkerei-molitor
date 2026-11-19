/* Startseite: Effekte im Stil von dwell.au – Hero wird beim Scrollen dunkel,
   Abschnitte blenden ein, Wortpaare fahren von den Seiten herein, Leiste unten erscheint. */
(function () {
  var html = document.documentElement;
  html.classList.remove('ohne-js'); html.classList.add('mit-js');
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.dw-hero'), leiste = document.querySelector('.dw-leiste');
  function scrollen() {
    if (!hero) return;
    var h = hero.offsetHeight, y = window.scrollY - hero.offsetTop;
    var f = Math.min(1, Math.max(0, y / (h * 0.8)));
    if (!ruhig) hero.style.setProperty('--f', f.toFixed(3));
    if (leiste) leiste.classList.toggle('da', window.scrollY > hero.offsetTop + h * 0.7);
  }
  window.addEventListener('scroll', scrollen, { passive: true });
  window.addEventListener('resize', scrollen);
  scrollen();
  var ziele = document.querySelectorAll('.dw-zeige, .dw-paar');
  if (!('IntersectionObserver' in window) || ruhig) { ziele.forEach(function (z) { z.classList.add('sichtbar'); }); return; }
  var beob = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('sichtbar'); beob.unobserve(e.target); } });
  }, { threshold: 0.18 });
  ziele.forEach(function (z) { beob.observe(z); });
})();