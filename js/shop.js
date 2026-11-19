/* Sauerländer Imkerei Molitor – E-Shop: Produktfenster, Warenkorb und Kasse (nur auf e-shop/index.html)
   Schulprojekt: Es wird nichts gesendet. Versand 4,90 € unter 39 € (Beispielwert). */
(function(){
  var GRATIS_AB = 39, VERSAND = 4.90; // Versand 4,90 € unter 39 € (Beispielwert Schulprojekt)
  var B = '../bilder/';
  var HONIG = '250-g-Glas 4,99 € (19,96 €/kg) · 500-g-Glas im Hofladen 8,99 € (17,98 €/kg)';
  var HONIG2 = '250-g-Glas 5,99 € (23,96 €/kg) · 500-g-Glas im Hofladen 10,99 € (21,98 €/kg)';
  var ALK = 'Enthält Alkohol, Abgabe ab 18 Jahren';
  var SETS = 'Bestellschluss für Weihnachten: 21.12.2026';
  var P = {
    'linde':{n:'Lindenhonig',l:'Honig',img:'lindenhonig-glas-imkerei-molitor.jpg',w:622,h:622,p:5.99,ab:1,b:'Hell, mild und mit frischer Note aus der Lindenblüte.',d:HONIG2},
    'bluete':{n:'Blütenhonig',l:'Honig',img:'bluetenhonig-glas-imkerei-molitor.jpg',w:622,h:622,p:4.99,ab:1,b:'Blumig und fein, aus Wildblumen und Wiesen rund um die Imkerei.',d:HONIG},
    'heide':{n:'Heidehonig',l:'Honig',img:'heidehonig-glas-imkerei-molitor.jpg',w:622,h:622,p:5.99,ab:1,b:'Cremig und herb, mit dem typischen Aroma der Heideblüte.',d:HONIG2},
    'wald':{n:'Waldhonig',l:'Honig',img:'waldhonig-glas-imkerei-molitor.jpg',w:622,h:622,p:4.99,ab:1,b:'Dunkel und würzig, aus der Waldtracht im Sauerländer Wald.',d:HONIG},
    'met':{n:'Met – Honigwein',l:'Met',img:'met-honigwein-imkerei-molitor.jpg',w:1254,h:1254,p:10.99,alk:1,b:'Traditioneller Honigwein aus eigenem Honig, kalt oder sanft erwärmt als heißer Met.',d:'750 ml · 11 % vol',x:ALK},
    'zimt':{n:'Zimt Met',l:'Winter-Met-Mix',img:'winter-met-mix-imkerei-molitor.jpg',w:1536,h:1024,p:11.99,alk:1,b:'Unser Honigwein mit Zimt – warm und würzig, besonders gut als heißer Met.',d:'750 ml · 11,5 % vol',x:ALK},
    'bratapfel':{n:'Bratäpfel Met',l:'Winter-Met-Mix',img:'winter-met-mix-imkerei-molitor.jpg',w:1536,h:1024,p:11.99,alk:1,b:'Honigwein mit Apfel und Winterwürze – schmeckt nach Bratapfel aus dem Ofen.',d:'750 ml · 11,5 % vol',x:ALK},
    'vikinger':{n:'Vikinger Blut',l:'Winter-Met-Mix',img:'winter-met-mix-imkerei-molitor.jpg',w:1536,h:1024,p:11.99,alk:1,b:'Roter Honigwein mit Kirsche – fruchtig, kräftig und tiefrot.',d:'750 ml · 11,5 % vol',x:ALK},
    'wintermix':{n:'Set Winter-Met-Mix',l:'Set',img:'winter-met-mix-imkerei-molitor.jpg',w:1536,h:1024,p:28.90,alk:1,b:'Alle drei zusammen: Zimt Met, Bratäpfel Met und Vikinger Blut – das Geschenk für große Bergliebhaber.',d:'3 × 750 ml · je 11,5 % vol',x:ALK},
    'k-sonne':{n:'Sonnenblumen-Kerze',l:'Bienenwachskerzen',img:'kerze-sonnenblume-imkerei-molitor.jpg',w:600,h:600,p:13.99,b:'Flache Blüte aus reinem Bienenwachs, schön auf dem Tisch oder im Adventskranz.',d:'ca. 10 cm Durchmesser · 100 % Bienenwachs aus eigener Imkerei (Beispielwerte)'},
    'k-korb':{n:'Bienenkorb-Kerze',l:'Bienenwachskerzen',img:'kerze-bienenkorb-imkerei-molitor.jpg',w:600,h:600,p:14.99,b:'Kleiner Bienenkorb mit Biene – der Klassiker aus unserer Imkerei.',d:'ca. 9 cm hoch · 100 % Bienenwachs aus eigener Imkerei (Beispielwerte)'},
    'k-wabe':{n:'Waben-Kerze mit Biene',l:'Bienenwachskerzen',img:'kerze-wabe-biene-imkerei-molitor.jpg',w:600,h:600,p:14.99,b:'Wabenform mit Biene, mit leichtem Honigduft beim Brennen.',d:'ca. 10 cm hoch · 100 % Bienenwachs aus eigener Imkerei (Beispielwerte)'},
    'k-tanne':{n:'Tannenbaum-Kerze',l:'Bienenwachskerzen',img:'kerze-tannenbaum-imkerei-molitor.jpg',w:600,h:600,p:15.99,b:'Tannenbaum aus Bienenwachs – passt zum Sauerländer Wald und zu Weihnachten.',d:'ca. 13 cm hoch · 100 % Bienenwachs aus eigener Imkerei (Beispielwerte)'},
    'k-stumpen':{n:'Waben-Stumpenkerze',l:'Bienenwachskerzen',img:'kerze-wabenstumpen-imkerei-molitor.jpg',w:600,h:600,p:17.99,b:'Große Stumpenkerze mit Wabenmuster, Biene und Molitor-Anhänger – brennt lange.',d:'ca. 15 cm hoch · 100 % Bienenwachs aus eigener Imkerei (Beispielwerte)'},
    'set-wm':{n:'Set „Waldhonig & Met“',l:'Weihnachtsset',img:'geschenkset-waldhonig-met-imkerei-molitor.jpg',w:1536,h:1024,p:24.90,alk:1,b:'500 g Waldhonig und eine Flasche Imkerei Molitor Met (750 ml, 11 % vol).',d:SETS,x:ALK},
    'set-trio':{n:'Set „Honig-Trio“',l:'Weihnachtsset',img:'geschenkset-honig-trio-imkerei-molitor.jpg',w:764,h:514,p:29.90,b:'Je 500 g Waldhonig, Heidehonig und Blütenhonig.',d:SETS,x:'Ohne Alkohol'},
    'set-advent':{n:'Set „Advent“',l:'Weihnachtsset',img:'geschenkset-advent-imkerei-molitor.jpg',w:772,h:512,p:26.90,b:'2 Bienenwachskerzen (je 200 g) und 500 g Blütenhonig.',d:SETS,x:'Ohne Alkohol'}
  };
  function eur(v){return v.toLocaleString('de-DE',{style:'currency',currency:'EUR'})}
  var korb = {};
  try{ korb = JSON.parse(localStorage.getItem('molitor-korb')||'{}')||{}; }catch(e){ korb = {}; }
  function speichern(){ try{ localStorage.setItem('molitor-korb',JSON.stringify(korb)); }catch(e){} }
  function zwischen(){ var s=0; for(var k in korb){ if(P[k]) s+=P[k].p*korb[k]; } return Math.round(s*100)/100; }
  function anzahl(){ var a=0; for(var k in korb) a+=korb[k]; return a; }
  function lieferart(){ var r=document.querySelector('input[name=lieferung]:checked'); return r?r.value:'versand'; }
  function versand(){ var z=zwischen(); if(lieferart()==='abholung'||z===0||z>=GRATIS_AB) return 0; return VERSAND; }
  function hatAlk(){ for(var k in korb){ if(P[k]&&P[k].alk) return true; } return false; }
  function fortschritt(el){
    if(!el) return; var z=zwischen();
    if(z===0){ el.innerHTML='Gratis Lieferung ab '+eur(GRATIS_AB)+' Bestellwert.'; return; }
    if(z>=GRATIS_AB){ el.innerHTML='<b style="color:var(--logo-gold)">✓ Ihre Lieferung ist gratis.</b><div class="leiste"><span style="width:100%"></span></div>'; return; }
    el.innerHTML='Noch <b style="color:var(--ink)">'+eur(GRATIS_AB-z)+'</b> bis zur gratis Lieferung.<div class="leiste"><span style="width:'+Math.round(z/GRATIS_AB*100)+'%"></span></div>';
  }
  document.querySelectorAll('[data-versandpreis]').forEach(function(e){ e.textContent=eur(VERSAND); });

  function zeichnen(){
    var liste=document.getElementById('korbliste'), z=zwischen(), a=anzahl();
    var knopf=document.getElementById('korbknopf');
    // Warenkorb & Kasse nur zeigen, wenn etwas im Korb liegt (oder gerade bestellt wurde)
    var sektion=document.getElementById('bestellen'), danke=document.getElementById('danke');
    sektion.hidden = a===0 && danke.hidden; sektion.querySelector('.kasse').hidden = a===0;
    knopf.hidden = a===0; knopf.querySelector('[data-anzahl]').textContent=a; knopf.querySelector('[data-summe]').textContent=eur(z);
    if(a===0){ liste.innerHTML='<p style="color:var(--muted);margin-top:8px">Noch leer – klicken Sie oben auf ein Produkt.</p>'; document.getElementById('summe').hidden=true; }
    else{
      var h=''; for(var k in korb){ var q=P[k]; if(!q) continue;
        h+='<div class="korb-zeile"><img src="'+B+q.img+'" alt=""><div><b>'+q.n+'</b><div class="klein">'+korb[k]+' × '+eur(q.p)+(q.ab?' (kleinste Größe)':'')+'</div><button type="button" class="entfernen" data-weg="'+k+'">Entfernen</button></div><b>'+eur(q.p*korb[k])+'</b></div>'; }
      liste.innerHTML=h; document.getElementById('summe').hidden=false;
      var v=versand();
      document.querySelector('[data-zwischen]').textContent=eur(z);
      document.querySelector('[data-liefer]').textContent= lieferart()==='abholung' ? 'Abholung · 0,00 €' : (v===0?'Versand gratis':eur(v));
      document.querySelector('[data-gesamt]').textContent=eur(z+v);
    }
    fortschritt(document.getElementById('fortschritt-korb'));
    fortschritt(document.getElementById('fortschritt-pf'));
    document.getElementById('alterzeile').hidden=!hatAlk();
  }
  document.getElementById('korbliste').addEventListener('click',function(e){ var k=e.target.getAttribute('data-weg'); if(k){ delete korb[k]; speichern(); zeichnen(); } });
  document.getElementById('korbknopf').addEventListener('click',function(){ document.getElementById('bestellen').scrollIntoView({behavior:'smooth'}); });

  // Produktfenster
  var dlg=document.getElementById('pfenster'), aktuell=null, mengeEl=document.getElementById('pf-menge');
  function menge(){ var m=parseInt(mengeEl.value,10); if(!(m>0)) m=1; if(m>50) m=50; return m; }
  function mengeZeigen(){ mengeEl.value=menge(); document.getElementById('pf-zeilensumme').textContent='= '+eur(P[aktuell].p*menge()); }
  function oeffnen(id){
    var q=P[id]; if(!q) return; aktuell=id;
    var img=document.getElementById('pf-img'); img.src=B+q.img; img.width=q.w; img.height=q.h; img.alt=q.n+' – Sauerländer Imkerei Molitor';
    document.getElementById('pf-label').textContent=q.l;
    document.getElementById('pf-titel').textContent=q.n;
    document.getElementById('pf-beschr').textContent=q.b;
    document.getElementById('pf-details').textContent=q.d||'';
    document.getElementById('pf-preis').textContent=(q.ab?'ab ':'')+eur(q.p);
    document.getElementById('pf-hinweis').textContent=(q.x?q.x+' · ':'')+'Preis inkl. MwSt.';
    document.getElementById('pf-ok').textContent='';
    mengeEl.value=1; mengeZeigen(); fortschritt(document.getElementById('fortschritt-pf'));
    if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open','');
  }
  function schliessen(){ if(dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  function hinein(){ document.getElementById('danke').hidden=true; korb[aktuell]=(korb[aktuell]||0)+menge(); speichern(); zeichnen(); }
  document.querySelectorAll('[data-p]').forEach(function(el){
    if(el.tagName==='IMG'){ el.setAttribute('role','button'); el.setAttribute('tabindex','0'); el.setAttribute('title','Vergrößern und bestellen');
      el.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); oeffnen(el.getAttribute('data-p')); } }); }
    el.addEventListener('click',function(){ oeffnen(el.getAttribute('data-p')); });
  });
  dlg.querySelector('[data-zu]').addEventListener('click',schliessen);
  dlg.addEventListener('click',function(e){ if(e.target===dlg) schliessen(); });
  dlg.querySelector('[data-minus]').addEventListener('click',function(){ mengeEl.value=Math.max(1,menge()-1); mengeZeigen(); });
  dlg.querySelector('[data-plus]').addEventListener('click',function(){ mengeEl.value=menge()+1; mengeZeigen(); });
  mengeEl.addEventListener('input',function(){ if(mengeEl.value!=='') mengeZeigen(); });
  document.getElementById('pf-korb').addEventListener('click',function(){ hinein(); document.getElementById('pf-ok').textContent='✓ '+menge()+' × '+P[aktuell].n+' liegt im Warenkorb.'; });
  document.getElementById('pf-jetzt').addEventListener('click',function(){ hinein(); schliessen(); document.getElementById('bestellen').scrollIntoView({behavior:'smooth'}); });

  // Kasse
  var form=document.getElementById('kasse');
  function lieferUmschalten(){
    var ab=lieferart()==='abholung';
    form.querySelectorAll('.nur-versand').forEach(function(l){ l.hidden=ab; l.querySelectorAll('input,textarea').forEach(function(i){ if(i.name==='strasse'||i.name==='plz'||i.name==='ort') i.required=!ab; }); });
    form.querySelectorAll('.nur-abholung').forEach(function(l){ l.hidden=!ab; });
    form.abholtag.required=ab;
    var z=form.querySelector('input[name=zahlung]:checked');
    if(!z || z.closest('label').hidden){ form.querySelector(ab?'input[value=bar]':'input[value=ueberweisung]').checked=true; }
    zeichnen();
  }
  form.querySelectorAll('input[name=lieferung]').forEach(function(r){ r.addEventListener('change',lieferUmschalten); });
  try{ var heute=new Date(); form.abholtag.min=heute.toISOString().slice(0,10); }catch(e){}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=document.getElementById('fehler'); f.hidden=true;
    if(anzahl()===0){ f.textContent='Ihr Warenkorb ist leer. Bitte wählen Sie zuerst ein Produkt.'; f.hidden=false; return; }
    if(hatAlk() && !form.alter.checked){ f.textContent='Bitte bestätigen Sie, dass Sie mindestens 18 Jahre alt sind.'; f.hidden=false; form.alter.focus(); return; }
    if(!form.checkValidity()){ var erstes=form.querySelector(':invalid'); f.textContent='Bitte füllen Sie alle Pflichtfelder (*) richtig aus.'; f.hidden=false; if(erstes) erstes.focus(); return; }
    var z=zwischen(), v=versand(), ab=lieferart()==='abholung';
    var zeilen=''; for(var k in korb){ if(P[k]) zeilen+='<li>'+korb[k]+' × '+P[k].n+' – '+eur(P[k].p*korb[k])+'</li>'; }
    var d=document.getElementById('danke');
    d.innerHTML='<span class="label">Beispiel-Bestätigung</span><h3 style="margin-top:6px">Danke, '+form.vorname.value.replace(/[<>&"]/g,'')+'! So sähe Ihre Bestellung aus:</h3><ul style="margin:10px 0 0;padding-left:1.2rem">'+zeilen+'</ul><p style="margin-top:10px"><b>Gesamt: '+eur(z+v)+'</b> · '+(ab?'Abholung im Hofladen Winterberg':(v===0?'Versand gratis':'Versand '+eur(v)))+'</p><p style="margin-top:8px;color:var(--muted);font-size:.9rem">Schulprojekt: Diese Bestellung wurde nicht gesendet, es wurden keine Daten gespeichert.</p>';
    d.hidden=false; korb={}; speichern(); form.reset(); lieferUmschalten(); d.scrollIntoView({behavior:'smooth',block:'center'});
  });
  lieferUmschalten();
})();
