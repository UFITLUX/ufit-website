// U'Fit — menu mobile + lien de nav actif
(function(){
  var b=document.getElementById('burger'), m=document.getElementById('menu');
  if(b&&m){ b.addEventListener('click',function(){m.classList.toggle('open')}); }
  var path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
})();

// U'Fit — piège temporel anti-bot
// On mesure le temps entre l'ouverture de la page et l'envoi du formulaire, et on
// le dépose dans un champ caché « _t » (en millisecondes) au moment de l'envoi —
// donc ça marche aussi pour les formulaires générés en JavaScript. Le serveur
// (api/contact.js) rejette les envois trop rapides : un humain ne remplit pas ces
// formulaires en moins de 5 secondes, un bot si.
(function(){
  var t0 = Date.now();
  window.ufitElapsed = function(){ return Date.now() - t0; };
  document.addEventListener('submit', function(e){
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    var el = f.querySelector('input[name="_t"]');
    if (!el) {
      el = document.createElement('input');
      el.type = 'hidden';
      el.name = '_t';
      f.appendChild(el);
    }
    el.value = String(window.ufitElapsed());
  }, true);
})();
