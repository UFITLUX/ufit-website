# SEO / référencement — U'Fit (nouveau site)

## ✅ Fait (dans les pages)

- **Titres uniques** + **meta descriptions** par page, `lang="fr"`
- **Structure sémantique** : un seul `H1` par page, `H2`/`H3` hiérarchisés
- **Responsive mobile-first** (Google indexe le mobile en priorité)
- **URL canonique** sur chaque page (pointe vers `https://ufit.lu/...`)
  → empêche le staging Vercel d'être indexé comme contenu dupliqué
- **Open Graph + Twitter Card** sur chaque page (aperçu propre au partage WhatsApp / Facebook / Instagram)
- **Favicon** (`/assets/favicon.svg`)
- **Données structurées Schema.org (JSON-LD)** :
  - `DanceSchool` (nom, adresse, téléphone, email, horaires des cours, zone desservie) sur toutes les pages principales
  - `FAQPage` sur l'accueil (peut générer des résultats enrichis Google)
  - `TheaterEvent` ×2 sur la page Spectacles (Cabaret des Rêves : 26 sept. Aumetz, 3 oct. Terville)
- **robots.txt** préparé avec **autorisation explicite des robots IA**
  (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot)
- **sitemap.xml** préparé (9 pages)

## ⏳ À faire au moment de la mise en ligne sur ufit.lu

1. **Déplacer `robots.txt` et `sitemap.xml` à la racine** du domaine
   (ils ne fonctionnent QUE depuis `https://ufit.lu/robots.txt` et `/sitemap.xml`)
2. **Vérifier les URLs canoniques** : elles supposent des pages à la racine
   (`https://ufit.lu/cours-adultes.html`). Si on passe en URLs propres
   (`/cours-adultes` sans `.html`), il faut mettre à jour canonical + og:url + sitemap.
3. **Google Search Console** : ajouter le domaine, soumettre le sitemap
4. **Bing Webmaster Tools** : idem (alimente aussi ChatGPT/Copilot)
5. **Google Business Profile** : la fiche Google avec les avis — c'est le **n°1 du référencement local**.
   À compléter/soigner (photos, horaires, description, réponses aux avis).

## ⏳ Restant côté contenu / technique

- **Optimiser le poids des images** (les photos ufit.lu font 200–600 Ko)
  → nécessite un outil de compression ; gain direct sur la vitesse (critère Google)
- **Vidéo du hero** : compresser (l'export Canva 1080p faisait 22 Mo — viser < 3 Mo)
- **Vrais avis Google** à intégrer dans la section témoignages (+ balise `Review`/`AggregateRating`
  possible ensuite, mais uniquement avec de VRAIS avis)
- **Réseaux sociaux** : ajouter les vraies URLs Instagram/Facebook/YouTube
  (dans le footer ET dans le `sameAs` du JSON-LD — non renseigné pour l'instant afin de ne rien inventer)
- **Bio de Bikey** (page À propos)

## Mots-clés visés (local, Luxembourg)

- cours de danse Luxembourg · cours de danse adultes Luxembourg
- Broadway Jazz Luxembourg · cabaret Luxembourg
- danse de mariage Luxembourg · ouverture de bal Luxembourg
- spectacle danse Luxembourg · team building danse Luxembourg
