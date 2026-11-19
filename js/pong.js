/* Honig-Pong – Kinderecke der Sauerländer Imkerei Molitor
   Grundlage: index_Version2.html (Pong mit Logo-Ball), angepasst für die Website. */
(function () {
  var canvas = document.getElementById('pong-feld');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var R = canvas.getAttribute('data-wurzel') || '';
  var info = document.getElementById('pong-info');
  var infoText = document.getElementById('pong-info-text');
  var startKnopf = document.getElementById('pong-start');
  var status = document.getElementById('pong-status');

  var W = canvas.width, H = canvas.height;
  var SCHLAEGER_B = 14, SCHLAEGER_H = 96;
  var BALL = 80;
  var SPIELER_TEMPO = 420, COMPUTER_TEMPO = 290;
  var START_TEMPO = 300, MAX_TEMPO = 620;
  var ZIEL = 5;

  var logo = new Image();
  logo.src = R + 'bilder/logo-sauerlaender-imkerei-molitor.png';
  logo.onload = function () { if (!laeuft) zeichnen(); };

  var spieler = { x: 30, y: (H - SCHLAEGER_H) / 2, punkte: 0 };
  var computer = { x: W - 30 - SCHLAEGER_B, y: (H - SCHLAEGER_H) / 2, punkte: 0 };
  var ball = { x: W / 2, y: H / 2, vx: START_TEMPO, vy: 160, winkel: 0 };
  var tasten = { hoch: false, runter: false };
  var steuerung = 'zeiger';
  var laeuft = false, gestartet = false, letzte = 0, pauseBis = 0;

  function ballZurueck(richtung) {
    ball.x = W / 2; ball.y = H / 2;
    ball.vx = START_TEMPO * richtung;
    ball.vy = (Math.random() * 220 - 110) || 90;
    ball.winkel = 0;
    pauseBis = performance.now() + 700;
  }

  function spielerNach(y) { spieler.y = Math.max(0, Math.min(H - SCHLAEGER_H, y)); }

  function zeigerBewegt(e) {
    if (!laeuft) return;
    steuerung = 'zeiger';
    var r = canvas.getBoundingClientRect();
    spielerNach((e.clientY - r.top) * (H / r.height) - SCHLAEGER_H / 2);
  }
  canvas.addEventListener('pointermove', zeigerBewegt);
  canvas.addEventListener('pointerdown', zeigerBewegt);

  // Pfeiltasten nur abfangen, während gespielt wird – sonst scrollt die Seite normal
  window.addEventListener('keydown', function (e) {
    if (!laeuft) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      steuerung = 'tasten';
      if (e.key === 'ArrowUp') tasten.hoch = true; else tasten.runter = true;
    }
  });
  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowUp') tasten.hoch = false;
    if (e.key === 'ArrowDown') tasten.runter = false;
  });
  window.addEventListener('blur', function () { tasten.hoch = tasten.runter = false; });
  document.addEventListener('visibilitychange', function () { if (document.hidden) letzte = 0; });

  function abprallen(s) {
    var mitte = s.y + SCHLAEGER_H / 2;
    var treffer = Math.max(-1, Math.min(1, (ball.y - mitte) / (SCHLAEGER_H / 2)));
    var tempo = Math.min(MAX_TEMPO, Math.abs(ball.vx) * 1.06);
    ball.vx = s === spieler ? tempo : -tempo;
    ball.vy = treffer * 300;
    ball.x = s === spieler ? spieler.x + SCHLAEGER_B + BALL / 2 : computer.x - BALL / 2;
  }

  function bewegen(dt, jetzt) {
    if (steuerung === 'tasten') {
      spielerNach(spieler.y + (Number(tasten.runter) - Number(tasten.hoch)) * SPIELER_TEMPO * dt);
    }
    var diff = (ball.y - SCHLAEGER_H / 2) - computer.y;
    computer.y = Math.max(0, Math.min(H - SCHLAEGER_H,
      computer.y + Math.max(-COMPUTER_TEMPO * dt, Math.min(COMPUTER_TEMPO * dt, diff))));

    if (jetzt < pauseBis) return;

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    ball.winkel += 1.4 * dt * Math.sign(ball.vx);

    if (ball.y - BALL / 2 <= 0) { ball.y = BALL / 2; ball.vy = Math.abs(ball.vy); }
    else if (ball.y + BALL / 2 >= H) { ball.y = H - BALL / 2; ball.vy = -Math.abs(ball.vy); }

    if (ball.vx < 0 && ball.x - BALL / 2 <= spieler.x + SCHLAEGER_B && ball.x + BALL / 2 >= spieler.x &&
        ball.y + BALL / 2 >= spieler.y && ball.y - BALL / 2 <= spieler.y + SCHLAEGER_H) abprallen(spieler);
    if (ball.vx > 0 && ball.x + BALL / 2 >= computer.x && ball.x - BALL / 2 <= computer.x + SCHLAEGER_B &&
        ball.y + BALL / 2 >= computer.y && ball.y - BALL / 2 <= computer.y + SCHLAEGER_H) abprallen(computer);

    if (ball.x + BALL / 2 < 0) { computer.punkte++; punktGemacht(1); }
    else if (ball.x - BALL / 2 > W) { spieler.punkte++; punktGemacht(-1); }
  }

  function punktGemacht(richtung) {
    status.textContent = 'Spielstand: Du ' + spieler.punkte + ', Computer ' + computer.punkte + '.';
    if (spieler.punkte >= ZIEL || computer.punkte >= ZIEL) { ende(); return; }
    ballZurueck(richtung);
  }

  function schlaeger(s, farbe) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 10;
    ctx.fillStyle = farbe;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(s.x, s.y, SCHLAEGER_B, SCHLAEGER_H, 7); else ctx.rect(s.x, s.y, SCHLAEGER_B, SCHLAEGER_H);
    ctx.fill();
    ctx.restore();
  }

  function ballZeichnen() {
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.rotate(ball.winkel);
    ctx.beginPath(); ctx.arc(0, 0, BALL / 2, 0, Math.PI * 2); ctx.clip();
    if (logo.complete && logo.naturalWidth) ctx.drawImage(logo, -BALL / 2, -BALL / 2, BALL, BALL);
    else { ctx.fillStyle = '#d4a04d'; ctx.fillRect(-BALL / 2, -BALL / 2, BALL, BALL); }
    ctx.restore();
    ctx.beginPath(); ctx.arc(ball.x, ball.y, BALL / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,.92)'; ctx.lineWidth = 3; ctx.stroke();
  }

  function zeichnen() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; ctx.setLineDash([10, 12]);
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([]);

    ctx.save();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 8;
    ctx.font = 'bold 48px system-ui, sans-serif';
    ctx.fillText(spieler.punkte, W / 2 - 60, 65);
    ctx.fillText(computer.punkte, W / 2 + 60, 65);
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('DU', W / 2 - 60, 90);
    ctx.fillText('COMPUTER', W / 2 + 60, 90);
    ctx.restore();

    schlaeger(spieler, '#e6b450');
    schlaeger(computer, '#ffffff');
    if (gestartet) ballZeichnen();
  }

  function schleife(t) {
    if (!laeuft) return;
    var dt = Math.min((t - letzte) / 1000 || 0, 0.03);
    letzte = t;
    bewegen(dt, t);
    zeichnen();
    if (laeuft) requestAnimationFrame(schleife);
  }

  function start() {
    spieler.punkte = computer.punkte = 0;
    spieler.y = computer.y = (H - SCHLAEGER_H) / 2;
    ballZurueck(Math.random() < 0.5 ? -1 : 1);
    info.hidden = true;
    gestartet = true;
    canvas.classList.add('spielt');
    laeuft = true; letzte = 0;
    status.textContent = 'Das Spiel läuft. Wer zuerst ' + ZIEL + ' Punkte hat, gewinnt.';
    canvas.focus({ preventScroll: true });
    requestAnimationFrame(schleife);
  }

  function ende() {
    laeuft = false;
    canvas.classList.remove('spielt');
    tasten.hoch = tasten.runter = false;
    zeichnen();
    var gewonnen = spieler.punkte > computer.punkte;
    infoText.textContent = gewonnen
      ? '🎉 Super! Du hast ' + spieler.punkte + ' : ' + computer.punkte + ' gewonnen!'
      : '🐝 Knapp! Der Computer hat ' + computer.punkte + ' : ' + spieler.punkte + ' gewonnen. Versuch es nochmal!';
    status.textContent = infoText.textContent;
    startKnopf.textContent = 'Nochmal spielen';
    info.hidden = false;
  }

  startKnopf.addEventListener('click', start);
  // Kinderecke: anderes Spiel geöffnet -> laufendes Spiel anhalten
  document.addEventListener('kinderecke-wechsel', function (e) {
    if (!laeuft || e.detail === 'honig-pong') return;
    laeuft = false;
    canvas.classList.remove('spielt');
    tasten.hoch = tasten.runter = false;
    infoText.textContent = 'Spiel beendet. Möchtest du nochmal spielen?';
    startKnopf.textContent = 'Nochmal spielen';
    info.hidden = false;
  });
  zeichnen();
})();
