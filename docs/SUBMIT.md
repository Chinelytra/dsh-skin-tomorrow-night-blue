# Submitting this plugin to the DSH plugin market

This repository already satisfies the [awesome-dsh-plugin contributing
rules](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/blob/main/contributing.md)
except for one automatic check: **the GitHub repository must be at least one day
old when the listing PR is opened** (the CI verifies the repository age to filter
out repos created minutes before a submission).

Checklist, and where this repo stands:

| Requirement | Status |
| --- | --- |
| `package.json` declares `dsh.bundle` (+ `cordis.patch.yml`) | ✅ `dsh.bundle.patch = ./cordis.patch.yml`, `dsh.client.platform = web` |
| Repository contains real, working code | ✅ host half + browser bundle + offline verification + CI |
| Repository is at least 1 day old | ⏳ created 2026-11-08, submit on/after 2026-11-09 |
| Topic `dsh-plugin` on the repository | ✅ set via `PUT /repos/Chinelytra/dsh-skin-tomorrow-night-blue/topics` |
| Description states what the plugin does, no superlatives | ✅ |
| One PR adds at most one entry file | ✅ `data/plugins/Chinelytra__dsh-skin-tomorrow-night-blue.yml` |
| Prebuilt install experience | ✅ release tarball, version-free asset name for `releases/latest/download/` |

## Steps (after the 1-day mark)

1. Fork and branch off the registry repository:

   ```sh
   gh repo fork awesome-dsh-plugin/awesome-dsh-plugin --clone
   cd awesome-dsh-plugin
   git checkout -b add-chinelytra-dsh-skin-tomorrow-night-blue
   ```

2. Copy this repository's `docs/market-entry.yml` to
   `data/plugins/Chinelytra__dsh-skin-tomorrow-night-blue.yml`:

   ```sh
   cp /path/to/dsh-skin-tomorrow-night-blue/docs/market-entry.yml \
      data/plugins/Chinelytra__dsh-skin-tomorrow-night-blue.yml
   ```

3. Commit and push:

   ```sh
   git add data/plugins/Chinelytra__dsh-skin-tomorrow-night-blue.yml
   git commit -m "Add Chinelytra/dsh-skin-tomorrow-night-blue"
   git push -u origin add-chinelytra-dsh-skin-tomorrow-night-blue
   ```

4. Open the PR against `awesome-dsh-plugin/awesome-dsh-plugin:main` with the
   title `Add Chinelytra/dsh-skin-tomorrow-night-blue` and this body:

   > Adds `Chinelytra/dsh-skin-tomorrow-night-blue` — a Tomorrow Night Blue
   > skin for the DSH Web GUI (category: `theme`).
   >
   > - `package.json` declares `dsh.bundle.patch` (`cordis.patch.yml`) and
   >   `dsh.client` (web platform).
   > - Host half injects the palette into served `index.html` via
   >   `webserver/index-inject`; browser half ships a standard
   >   `__ModuleLoader__` bundle that overrides 113 `--dsw-alias-*` tokens and 11
   >   Shiki syntax roles.
   > - Prebuilt release tarball:
   >   `releases/latest/download/dsh-skin-tomorrow-night-blue.tgz`.
   > - Offline verification (`node verify.mjs`) and CI are in the repo.
   > - Topic `dsh-plugin` is set on the repository.

5. Wait for CI; a maintainer reads the repository and merges. The two generated
   READMEs are rebuilt by them — do not edit them by hand.

## Why one day

The age check is automated and is not a quality judgement: it filters
submissions for repositories created minutes before the PR. Just submit the day
after the repository went public.
