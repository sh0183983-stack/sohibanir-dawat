# Facebook Posting Automation Preparation

This folder prepares the project for future automatic Facebook publishing without storing secrets in the repository.

## Planned flow

1. Editors add approved posts to `content/facebook-posts.json`.
2. A future GitHub Actions workflow or serverless job reads the queue.
3. The job publishes to the Facebook Graph API using repository secrets.
4. Successful posts are marked externally or moved to an archive file.

## Required future secrets

- `FACEBOOK_PAGE_ID`
- `FACEBOOK_PAGE_ACCESS_TOKEN`

## Content policy

- Verify Quran and Hadith references before publishing.
- Keep Bengali captions concise and respectful.
- Do not commit access tokens, page tokens, app secrets, or personal data.
