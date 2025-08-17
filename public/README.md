Minimal Cloudflare deploy (configured for running from the `public/` directory)

Files added:
- `wrangler.toml` — Wrangler config.
- `package.json` — a convenience script: `npm run deploy` runs `wrangler publish`.
 - `package.json` — a convenience script: `npm run deploy` runs `wrangler deploy`.

Quick start

1. Install Wrangler (if not installed):

```bash
npm install -g wrangler
```

2. Login to Cloudflare from the CLI:

```bash
wrangler login
```

3. Edit `wrangler.toml` and replace `REPLACE_WITH_ACCOUNT_ID` with your Cloudflare account ID.

4. From the `public/` directory, deploy:

```bash
npm install    # optional if you added deps later
npm run deploy
```

5. Run locally for testing

If you want to run the Worker + site locally then from the project root you can run:

```bash
wrangler dev --cwd public --local
```

