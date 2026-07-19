# সহীহ বাণীর দাওয়াত

A production-ready static Islamic website for GitHub Pages, built with HTML, CSS, and JavaScript.

## Features

- Modern Bengali-first Islamic design with green, white, and gold branding
- Mobile-first responsive navigation and cards
- Home, Hadith, Quran, Articles, Categories, Search, About, Contact, and Privacy Policy pages
- Dark mode with local preference persistence
- Bengali and Arabic typography support
- Client-side search across Hadith, Quran, and article content
- SEO and Open Graph meta tags on every page
- Root `index.html` for GitHub Pages with no build step
- Prepared `automation/facebook` and `content/facebook-posts.json` structure for future Facebook posting automation

## Project structure

```text
.
├── assets/
│   ├── css/styles.css
│   ├── img/favicon.svg
│   └── js/
│       ├── content.js
│       └── main.js
├── automation/facebook/README.md
├── content/facebook-posts.json
├── pages/
│   ├── about.html
│   ├── articles.html
│   ├── categories.html
│   ├── contact.html
│   ├── hadith.html
│   ├── privacy.html
│   └── quran.html
└── index.html
```

## Local Preview

Open `index.html` directly in a browser or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

Deploy from the repository root on the current branch. The site requires no package installation or build command.

## Facebook automation roadmap

Future automation should read approved drafts from `content/facebook-posts.json`, publish with the Facebook Graph API, and store credentials only as CI or hosting secrets. See `automation/facebook/README.md`.
