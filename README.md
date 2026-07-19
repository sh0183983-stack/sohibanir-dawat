# Sohibanir Dawat

A premium production-ready static Islamic website for GitHub Pages, built with HTML, CSS, and JavaScript.

## Features

- World-class Bengali-first Islamic UI with green, white, and gold branding
- Responsive mobile-first navigation, glassmorphism cards, geometric patterns, smooth reveal animations, and dark/light mode
- Bengali and Arabic typography using Hind Siliguri, Amiri, and Noto Naskh Arabic
- Pages for Home, Sahih Bukhari, Sahih Muslim, Quran, Dua, Categories, Search, Daily Hadith, About, Contact, and Privacy Policy
- Scalable content architecture in `assets/js/content.js` with typed collections for hadith, Quran, dua, and articles
- Client-side search across Bengali, Arabic, source, and category fields
- SEO and Open Graph metadata, canonical URLs, sitemap, robots file, manifest, favicon, and PWA service worker
- GitHub Pages compatible with no build step
- Prepared `.github/workflows`, `automation/facebook`, `content/facebook-posts.json`, and `content/schema` for future CI and Facebook automation

## Project structure

```text
.
├── .github/workflows/README.md
├── assets/
│   ├── css/styles.css
│   ├── img/favicon.svg
│   ├── img/og-image.svg
│   └── js/
│       ├── content.js
│       └── main.js
├── automation/facebook/README.md
├── content/
│   ├── facebook-posts.json
│   └── schema/content-schema.json
├── pages/
│   ├── about.html
│   ├── categories.html
│   ├── contact.html
│   ├── daily-hadith.html
│   ├── dua.html
│   ├── privacy.html
│   ├── quran.html
│   ├── sahih-bukhari.html
│   ├── sahih-muslim.html
│   └── search.html
├── index.html
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
└── sw.js
```

## Adding new content

Add new items to the relevant collection in `assets/js/content.js`:

- `SITE_CONTENT.bukhari`
- `SITE_CONTENT.muslim`
- `SITE_CONTENT.quran`
- `SITE_CONTENT.dua`
- `SITE_CONTENT.articles`

Each item should include at least `id`, `title`, `category`, and `text`. Optional fields include `arabic`, `source`, and `featured`.

## Local preview

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

Deploy from the repository root on the current branch. The site requires no package installation or build command.

## Facebook automation roadmap

Future automation should read approved drafts from `content/facebook-posts.json`, publish with the Facebook Graph API, and store credentials only as GitHub Actions secrets. See `automation/facebook/README.md`.
