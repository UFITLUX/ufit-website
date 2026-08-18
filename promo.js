// U'Fit — bandeau "reprise des cours" (rentrée). S'auto-masque après le 16/09/2026.
(function () {
  // Ne plus rien afficher à partir du 17 septembre 2026
  if (Date.now() >= Date.parse("2026-09-17T00:00:00")) return;
  if (document.getElementById("ufit-promo")) return;

  var en = (document.documentElement.lang || "fr").toLowerCase().indexOf("en") === 0;
  var a = document.createElement("a");
  a.id = "ufit-promo";
  a.className = "ufit-promo";
  a.href = "https://app.ufit.lu";
  a.setAttribute(
    "aria-label",
    en
      ? "Classes resume Wednesday 16 September — book your free class"
      : "Reprise des cours le mercredi 16 septembre — réservez votre cours gratuit",
  );
  a.innerHTML =
    '<span class="star" aria-hidden="true">✦</span>' +
    '<span class="txt">' +
    (en
      ? "<b>Classes resume Wednesday 16 September</b> — first class free"
      : "<b>Reprise des cours le mercredi 16 septembre</b> — 1<sup>er</sup> cours gratuit") +
    "</span>" +
    '<span class="go">' + (en ? "Book" : "Je réserve") + "</span>";

  var header = document.querySelector("header");
  if (header && header.parentNode) {
    header.parentNode.insertBefore(a, header.nextSibling);
  } else {
    document.body.insertBefore(a, document.body.firstChild);
  }
})();
