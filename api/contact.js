// Reçoit les soumissions des formulaires du site et envoie l'email via Resend
// depuis bonjour@ufit.lu (domaine authentifié) vers ufitlux@gmail.com.
// Remplace Web3Forms (meilleure délivrabilité, plus de spam).

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO = "ufitlux@gmail.com";
const FROM = "U'Fit <bonjour@ufit.lu>";
const REPLY_FALLBACK = "ufitlux@gmail.com";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function respond(req, res, next, ok) {
  const wantsJson = (req.headers.accept || "").includes("application/json");
  if (wantsJson) {
    res.status(200).json({ success: ok });
    return;
  }
  res.statusCode = 303;
  res.setHeader("Location", next || "/merci.html");
  res.end();
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const b = req.body && typeof req.body === "object" ? req.body : {};
  const next = (b._next && String(b._next)) || "/merci.html";

  // Anti-spam 1 : champ piège rempli => on fait comme si tout allait bien
  if (b.botcheck) {
    respond(req, res, next, true);
    return;
  }

  // Anti-spam 2 : contenu suspect (spam russe = cyrillique, pubs casino/crypto,
  // ou plusieurs liens). Un client/partenaire légitime (collab, entreprise) peut
  // très bien envoyer UN lien vers son site — on ne bloque pas sur ça seul.
  const allText = Object.keys(b)
    .map((k) => (Array.isArray(b[k]) ? b[k].join(" ") : String(b[k] ?? "")))
    .join(" \n ");
  const nom = String(b.Nom || b.nom || "").trim().toLowerCase();
  const prenom = String(b.Prénom || b.Prenom || b.prénom || b.prenom || "")
    .trim()
    .toLowerCase();
  const looksLikeSpam =
    /[Ѐ-ӿ]/.test(allText) || // cyrillique
    /\[url|\[\/url\]|\bhref\s*=|\bBTC\b|\bcrypto\b|\bcasino\b|\bbetting\b|\bgambl(?:e|ing)\b|\bpoker\b|\bslot\s*machine|\bjackpot\b|\bsportsbook\b|\bwager/i.test(
      allText,
    ) || // pubs casino/crypto (peu importe le nombre de liens)
    (allText.match(/https?:\/\//gi) || []).length >= 2 || // 2+ liens = spam
    (nom && nom === prenom && /https?:\/\//i.test(allText)); // nom=prenom + lien : signal de bot
  if (looksLikeSpam) {
    // On répond "ok" pour ne pas signaler au bot qu'il est filtré, mais on n'envoie rien.
    respond(req, res, next, true);
    return;
  }

  const subject = (b.subject || "Nouveau message — site U'Fit").toString();
  const replyTo =
    b.Email || b.email || b.contact_email || b.replyto || b["E-mail"] || "";

  const skip = new Set([
    "access_key",
    "botcheck",
    "subject",
    "from_name",
    "_next",
    "_json",
    "replyto",
  ]);
  const rows = Object.keys(b)
    .filter((k) => !skip.has(k))
    .map((k) => {
      const raw = Array.isArray(b[k]) ? b[k].join(", ") : b[k] ?? "";
      return `<tr><td style="padding:6px 14px 6px 0;color:#8a857b;vertical-align:top"><strong>${esc(
        k,
      )}</strong></td><td style="padding:6px 0">${esc(String(raw)).replace(
        /\n/g,
        "<br>",
      )}</td></tr>`;
    })
    .join("");

  const html = `<div style="font-family:Helvetica,Arial,sans-serif;color:#2b2b2b;max-width:560px">
    <h2 style="color:#8B1A2A;margin:0 0 14px">${esc(subject)}</h2>
    <table style="font-size:15px;line-height:1.5">${rows}</table>
    <p style="margin-top:18px;font-size:12px;color:#a8a8a8">Envoyé depuis le formulaire de ufit.lu.</p>
  </div>`;

  if (!RESEND_API_KEY) {
    res.status(500).json({
      success: false,
      message: "Email non configuré (RESEND_API_KEY manquant).",
    });
    return;
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: replyTo || REPLY_FALLBACK,
        subject,
        html,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ success: false, message: "Envoi refusé", detail });
      return;
    }
  } catch (e) {
    res.status(502).json({ success: false, message: "Erreur d'envoi." });
    return;
  }

  respond(req, res, next, true);
};
