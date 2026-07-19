// U'Fit — menu mobile + lien de nav actif
(function(){
  var b=document.getElementById('burger'), m=document.getElementById('menu');
  if(b&&m){ b.addEventListener('click',function(){m.classList.toggle('open')}); }
  var path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
})();
