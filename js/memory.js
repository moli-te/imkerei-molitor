/* Bienen-Memory – Kinderecke der Sauerländer Imkerei Molitor
   6 Paare: 4 Honigsorten, unser Honigglas und das Logo. */
(function () {
  var feld = document.getElementById('memory-feld');
  if (!feld) return;
  var R = feld.getAttribute('data-wurzel') || '../';
  var MOTIVE = [
    { id: 'wald',   name: 'Waldhonig',   bild: 'bilder/waldhonig-glas-imkerei-molitor.jpg' },
    { id: 'heide',  name: 'Heidehonig',  bild: 'bilder/heidehonig-glas-imkerei-molitor.jpg' },
    { id: 'bluete', name: 'Blütenhonig', bild: 'bilder/bluetenhonig-glas-imkerei-molitor.jpg' },
    { id: 'linde',  name: 'Lindenhonig', bild: 'bilder/lindenhonig-glas-imkerei-molitor.jpg' },
    { id: 'glas',   name: 'Unser Honig', bild: 'bilder/honig-glas-imkerei-molitor.jpg' },
    { id: 'logo',   name: 'Imkerei Molitor', bild: 'bilder/logo-sauerlaender-imkerei-molitor.png', logo: true }
  ];
  var zuegeEl = document.getElementById('memory-zuege');
  var paareEl = document.getElementById('memory-paare');
  var status = document.getElementById('memory-status');
  var sieg = document.getElementById('memory-sieg');
  var offen = [], gesperrt = false, zuege = 0, paare = 0;

  function mischen(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function anzeigen() { zuegeEl.textContent = zuege; paareEl.textContent = paare + ' / ' + MOTIVE.length; }

  function neu() {
    offen = []; gesperrt = false; zuege = 0; paare = 0;
    sieg.hidden = true; feld.innerHTML = '';
    mischen(MOTIVE.concat(MOTIVE)).forEach(function (m, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mem-karte' + (m.logo ? ' mem-logo' : '');
      b.dataset.id = m.id;
      b.setAttribute('aria-label', 'Karte ' + (i + 1) + ', verdeckt');
      b.innerHTML = '<span class="mem-innen"><span class="mem-rueck" aria-hidden="true">🐝</span>' +
        '<span class="mem-vorne"><img src="' + R + m.bild + '" alt="" width="300" height="300"><span>' + m.name + '</span></span></span>';
      b.addEventListener('click', function () { umdrehen(b, m, i); });
      feld.appendChild(b);
    });
    anzeigen();
    status.textContent = 'Neues Spiel: Finde alle 6 Paare!';
  }

  function umdrehen(b, m, i) {
    if (gesperrt || b.classList.contains('auf')) return;
    b.classList.add('auf');
    b.setAttribute('aria-label', 'Karte ' + (i + 1) + ': ' + m.name);
    offen.push(b);
    status.textContent = m.name;
    if (offen.length < 2) return;
    zuege++;
    var a = offen[0], c = offen[1];
    if (a.dataset.id === c.dataset.id) {
      paare++; offen = [];
      a.classList.add('paar'); c.classList.add('paar');
      a.disabled = c.disabled = true;
      status.textContent = 'Super, ein Paar: ' + m.name + '!';
      anzeigen();
      if (paare === MOTIVE.length) gewonnen();
    } else {
      gesperrt = true;
      anzeigen();
      setTimeout(function () {
        [a, c].forEach(function (k) {
          k.classList.remove('auf');
          k.setAttribute('aria-label', k.getAttribute('aria-label').replace(/:.*$/, ', verdeckt'));
        });
        offen = []; gesperrt = false;
        status.textContent = 'Leider kein Paar – probier es nochmal.';
      }, 1000);
    }
  }

  function gewonnen() {
    document.getElementById('memory-ergebnis').textContent = zuege;
    sieg.hidden = false;
    status.textContent = 'Geschafft! Alle Paare in ' + zuege + ' Zügen gefunden.';
  }

  document.getElementById('memory-neu').addEventListener('click', neu);
  document.getElementById('memory-nochmal').addEventListener('click', function () { neu(); feld.querySelector('button').focus(); });
  neu();
})();
