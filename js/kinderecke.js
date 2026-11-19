/* Kinderecke: Spiele und Wissen sind versteckt und öffnen sich über die Karten oben. */
(function () {
  var bereiche = document.querySelectorAll('.kinder-bereich');
  if (!bereiche.length) return;

  function zeigen(id, scrollen) {
    var ziel = null;
    bereiche.forEach(function (b) {
      var an = b.id === id;
      b.classList.toggle('offen', an);
      if (an) ziel = b;
    });
    try { document.dispatchEvent(new CustomEvent('kinderecke-wechsel', { detail: id })); } catch (e) {}
    document.querySelectorAll('[data-kinder]').forEach(function (k) {
      k.classList.toggle('aktiv', k.getAttribute('data-kinder') === id);
    });
    if (ziel && scrollen) ziel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!ziel && scrollen) {
      var u = document.getElementById('uebersicht');
      if (u) u.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function ausHash(scrollen) { zeigen(location.hash.replace('#', ''), scrollen); }

  window.addEventListener('hashchange', function () { ausHash(true); });
  ausHash(false);
  if (document.querySelector('.kinder-bereich.offen')) {
    setTimeout(function () { ausHash(true); }, 50);
  }
})();
