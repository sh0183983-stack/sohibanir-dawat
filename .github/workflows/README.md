# Future GitHub Actions

This directory is reserved for future automation without changing the site architecture.

Planned workflows:

- `deploy-pages.yml`: publish the static site to GitHub Pages.
- `facebook-posting.yml`: read approved posts from `content/facebook-posts.json` and publish through the Facebook Graph API using repository secrets.
- `content-quality.yml`: validate content schema, links, sitemap, and required metadata.

Do not commit secrets. Use GitHub repository secrets for tokens and page IDs.
