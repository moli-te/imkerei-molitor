/* Fang die Biene – Kinderecke der Sauerländer Imkerei Molitor
   30 Sekunden: Bienen auf der Blumenwiese antippen, bevor sie wegfliegen.
   Biene = 1 Punkt, goldenes Honigglas = 3 Punkte. */
(function () {
  var wiese = document.getElementById('fang-wiese');
  if (!wiese) return;
  var DAUER = 30;
  var R = wiese.getAttribute('data-wurzel') || '../';
  // Dieselben Fotos wie im Bienen-Memory
  var FOTOS = [
    { name: 'Waldhonig', bild: 'bilder/waldhonig-glas-imkerei-molitor.jpg' },
    { name: 'Heidehonig', bild: 'bilder/heidehonig-glas-imkerei-molitor.jpg' },
    { name: 'Blütenhonig', bild: 'bilder/bluetenhonig-glas-imkerei-molitor.jpg' },
    { name: 'Lindenhonig', bild: 'bilder/lindenhonig-glas-imkerei-molitor.jpg' },
    { name: 'Molitor-Logo', bild: 'bilder/logo-sauerlaender-imkerei-molitor.png', logo: true }
  ];
  FOTOS.forEach(function (f) { var i = new Image(); i.src = R + f.bild; }); // vorladen
  var punkteEl = document.getElementById('fang-punkte');
  var zeitEl = document.getElementById('fang-zeit');
  var rekordEl = document.getElementById('fang-rekord');
  var start = document.getElementById('fang-start');
  var info = document.getElementById('fang-info');
  var status = document.getElementById('fang-status');
  var punkte = 0, rest = DAUER, laeuft = false, uhr = null, nachschub = null, beginn = 0;

  var rekord = 0;
  try { rekord = parseInt(localStorage.getItem('molitor-fangbiene') || '0', 10) || 0; } catch (e) {}
  rekordEl.textContent = rekord;

  // Blumen als Deko (feste Plätze, damit die Wiese ruhig aussieht)
  var BLUMEN = ['🌼', '🌸', '🌻', '🌷', '🌼', '🌸', '🌻', '🌼', '🌷', '🌸', '🌼', '🌻'];
  BLUMEN.forEach(function (b, i) {
    var s = document.createElement('span');
    s.className = 'fang-blume'; s.setAttribute('aria-hidden', 'true'); s.textContent = b;
    s.style.left = (4 + (i * 8.1) % 90) + '%';
    s.style.bottom = (3 + (i * 37) % 22) + '%';
    wiese.appendChild(s);
  });

  function anzeigen() { punkteEl.textContent = punkte; zeitEl.textContent = rest; }

  function tempo() { // wird mit der Zeit etwas schneller
    var t = (Date.now() - beginn) / 1000 / DAUER;
    return { bleibt: 1900 - 700 * t, abstand: 950 - 350 * t };
  }

  function bieneSetzen() {
    if (!laeuft) return;
    if (wiese.querySelectorAll('.fang-ziel:not(.weg):not(.gefangen)').length < 3) {
      var gold = Math.random() < 0.2;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'fang-ziel' + (gold ? ' gold' : '');
      if (gold) {
        var f = FOTOS[Math.floor(Math.random() * FOTOS.length)];
        b.innerHTML = '<img src="' + R + f.bild + '" alt="" width="300" height="300"' + (f.logo ? ' class="ist-logo"' : '') + '>';
        b.setAttribute('aria-label', f.name + ', 3 Punkte');
      } else {
        b.textContent = '🐝';
        b.setAttribute('aria-label', 'Biene, 1 Punkt');
      }
      b.style.left = (6 + Math.random() * 82) + '%';
      b.style.top = (8 + Math.random() * 58) + '%';
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); fangen(b, gold); });
      b.addEventListener('click', function () { fangen(b, gold); });
      wiese.appendChild(b);
      setTimeout(function () {
        if (b.classList.contains('gefangen')) return;
        b.classList.add('weg');
        setTimeout(function () { b.remove(); }, 500);
      }, tempo().bleibt);
    }
    nachschub = setTimeout(bieneSetzen, tempo().abstand);
  }

  function fangen(b, gold) {
    if (!laeuft || b.classList.contains('gefangen') || b.classList.contains('weg')) return;
    b.classList.add('gefangen');
    var p = gold ? 3 : 1;
    punkte += p; anzeigen();
    var plus = document.createElement('span');
    plus.className = 'fang-plus'; plus.setAttribute('aria-hidden', 'true'); plus.textContent = '+' + p;
    plus.style.left = b.style.left; plus.style.top = b.style.top;
    wiese.appendChild(plus);
    status.textContent = (gold ? b.getAttribute('aria-label').replace(', 3 Punkte', '') + '! ' : 'Gefangen! ') + punkte + ' Punkte';
    setTimeout(function () { b.remove(); plus.remove(); }, 600);
  }

  function los() {
    punkte = 0; rest = DAUER; laeuft = true; beginn = Date.now();
    wiese.querySelectorAll('.fang-ziel,.fang-plus').forEach(function (x) { x.remove(); });
    info.hidden = true; wiese.classList.add('aktiv'); anzeigen();
    status.textContent = 'Los geht es! 30 Sekunden.';
    uhr = setInterval(function () {
      rest--; anzeigen();
      if (rest <= 0) ende();
    }, 1000);
    bieneSetzen();
  }

  function ende() {
    laeuft = false; clearInterval(uhr); clearTimeout(nachschub);
    wiese.classList.remove('aktiv');
    wiese.querySelectorAll('.fang-ziel').forEach(function (x) { x.remove(); });
    var neu = punkte > rekord;
    if (neu) { rekord = punkte; rekordEl.textContent = rekord; try { localStorage.setItem('molitor-fangbiene', rekord); } catch (e) {} }
    var text = punkte === 0 ? 'Oh, die Bienen waren schneller! Versuch es gleich nochmal.'
      : '🎉 Toll! Du hast ' + punkte + ' Punkte gesammelt.' + (neu ? ' Neuer Rekord!' : '');
    info.querySelector('p').textContent = text;
    start.textContent = 'Nochmal spielen';
    info.hidden = false;
    status.textContent = text;
    start.focus();
  }

  start.addEventListener('click', los);
  // Kinderecke: anderes Spiel geöffnet -> laufendes Spiel beenden
  document.addEventListener('kinderecke-wechsel', function (e) { if (laeuft && e.detail !== 'fang-die-biene') ende(); });
  anzeigen();
})();
