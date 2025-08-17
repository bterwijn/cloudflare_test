Minimal Cloudflare deploy (configured for running from the `public/` directory)

Files added:
- `wrangler.toml` — Wrangler config.
- `package.json` — a convenience script: `npm run deploy` runs `wrangler publish`.

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

Notes

- If you want the config at the repository root, move `wrangler.toml` to the repo root and set `[site].bucket` to `"./public"`.
- This is a minimal setup for static sites using Workers Sites via Wrangler.
