# Lax Technologies — Site vitrine

Site statique HTML/CSS/JS prêt pour [GitHub Pages](https://pages.github.com/).

## Contenu

- `index.html` — Accueil
- `about.html`, `services.html`, `produits.html`, `realisation.html`, `contact.html`, `prix.html`
- Pages détails projets (`details-*.html`)
- `assets/` — CSS, JS, images, polices

## Héberger sur GitHub Pages

1. Poussez ce dépôt sur GitHub.
2. Dans le dépôt : **Settings → Pages**.
3. Source : **Deploy from a branch**.
4. Branch : `main` (ou `master`), dossier `/ (root)`.
5. Enregistrez — le site sera disponible sur `https://<user>.github.io/<repo>/`.

## Prévisualiser en local

Ouvrez `index.html` dans le navigateur, ou lancez un serveur simple :

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Puis ouvrez http://localhost:8000
